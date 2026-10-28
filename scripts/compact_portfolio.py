"""Produce the approved compact download while retaining every page, link and attachment."""
import fitz, pathlib, io, zipfile, posixpath, sys, json, hashlib
from PIL import Image
from lxml import etree as ET

def optimize_office(data):
    z=zipfile.ZipFile(io.BytesIO(data)); changes={}; names={}
    for inf in z.infolist():
        if '/media/' not in inf.filename or inf.file_size<100000: continue
        raw=z.read(inf)
        try:
            im=Image.open(io.BytesIO(raw)); im.load()
        except Exception: continue
        if im.format not in ('PNG','JPEG'): continue
        opaque=im.mode not in ('RGBA','LA','P') or im.convert('RGBA').getextrema()[3]==(255,255)
        b=io.BytesIO()
        if opaque:
            im.convert('RGB').save(b,'JPEG',quality=85,optimize=True,subsampling=0)
            newname=posixpath.splitext(inf.filename)[0]+'_compressed.jpg'
        else:
            im.save(b,'PNG',optimize=True); newname=inf.filename
        if len(b.getvalue())<len(raw)*.9:
            changes[inf.filename]=b.getvalue(); names[inf.filename]=newname
    output=io.BytesIO()
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as zz:
        for inf in z.infolist():
            raw=changes.get(inf.filename,z.read(inf))
            if inf.filename.endswith('.rels'):
                root=ET.fromstring(raw)
                base=posixpath.dirname(posixpath.dirname(inf.filename))
                for el in root:
                    if el.get('TargetMode')=='External': continue
                    target=el.get('Target',''); resolved=posixpath.normpath(posixpath.join(base,target))
                    if resolved in names: el.set('Target',posixpath.relpath(names[resolved],base))
                raw=ET.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            if inf.filename=='[Content_Types].xml':
                root=ET.fromstring(raw); ns='{http://schemas.openxmlformats.org/package/2006/content-types}'
                if not any(x.get('Extension')=='jpg' for x in root):
                    el=ET.SubElement(root,ns+'Default'); el.set('Extension','jpg'); el.set('ContentType','image/jpeg')
                for el in root:
                    old=el.get('PartName','').lstrip('/')
                    if old in names: el.set('PartName','/'+names[old]); el.set('ContentType','image/jpeg')
                raw=ET.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            zz.writestr(names.get(inf.filename,inf.filename),raw)
    result=output.getvalue()
    # Validate all internal relationship targets after image renaming.
    check=zipfile.ZipFile(io.BytesIO(result)); files=set(check.namelist())
    assert check.testzip() is None
    for name in files:
        if not name.endswith('.rels'): continue
        base=posixpath.dirname(posixpath.dirname(name))
        for el in ET.fromstring(check.read(name)):
            if el.get('TargetMode')=='External': continue
            resolved=posixpath.normpath(posixpath.join(base,el.get('Target',''))).lstrip('/')
            assert resolved in files,(name,resolved)
    return result if len(result)<len(data) else data

def compress_pdf_images(d,quality=85):
    done=set()
    for pg in d:
        for info in pg.get_images(full=True):
            xref,smask=info[:2]
            if xref in done: continue
            done.add(xref)
            item=d.extract_image(xref)
            if not item or len(item['image'])<100000: continue
            try:
                im=Image.open(io.BytesIO(item['image'])).convert('RGB')
                b=io.BytesIO(); im.save(b,'JPEG',quality=quality,optimize=True,subsampling=0)
                if len(b.getvalue())<len(item['image'])*.8:
                    d.update_stream(xref,b.getvalue(),compress=False)
                    d.xref_set_key(xref,'Filter','/DCTDecode')
                    d.xref_set_key(xref,'DecodeParms','null')
                    d.xref_set_key(xref,'Decode','null')
                    d.xref_set_key(xref,'ColorSpace','/DeviceRGB')
                    d.xref_set_key(xref,'BitsPerComponent','8')
            except Exception as exc: print('image skipped',xref,str(exc),flush=True)

def optimize_pdf(data):
    d=fitz.open(stream=data,filetype='pdf')
    texts=[p.get_text() for p in d]; links=[len(p.get_links()) for p in d]
    compress_pdf_images(d)
    result=d.tobytes(garbage=4,deflate=True,use_objstms=1)
    c=fitz.open(stream=result,filetype='pdf')
    assert texts==[p.get_text() for p in c]
    assert links==[len(p.get_links()) for p in c]
    return result if len(result)<len(data) else data

def remove_embedded_ppt_fonts(data):
    source=zipfile.ZipFile(io.BytesIO(data))
    removed={n for n in source.namelist() if n.startswith('ppt/fonts/')}
    output=io.BytesIO()
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as target:
        for info in source.infolist():
            if info.filename in removed: continue
            raw=source.read(info)
            if info.filename=='ppt/presentation.xml':
                root=ET.fromstring(raw)
                for element in list(root):
                    if ET.QName(element).localname=='embeddedFontLst': root.remove(element)
                raw=ET.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            elif info.filename=='ppt/_rels/presentation.xml.rels':
                root=ET.fromstring(raw)
                for element in list(root):
                    if element.get('Type','').endswith('/font'): root.remove(element)
                raw=ET.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            elif info.filename=='[Content_Types].xml':
                root=ET.fromstring(raw)
                for element in list(root):
                    if element.get('Extension')=='fntdata' or element.get('PartName','').lstrip('/') in removed:
                        root.remove(element)
                raw=ET.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            target.writestr(info.filename,raw)
    result=output.getvalue()
    assert zipfile.ZipFile(io.BytesIO(result)).testzip() is None
    return result

def link_targets(doc):
    return [[{k:v for k,v in link.items() if k not in ('xref','id')}
             for link in page.get_links()] for page in doc]

def compact(path):
    path=pathlib.Path(path)
    d=fitz.open(path)
    texts=[p.get_text() for p in d]
    links=link_targets(d)
    names=d.embfile_names()
    for i in range(d.embfile_count()):
        info=d.embfile_info(i); raw=d.embfile_get(i); name=info['filename']
        if name.endswith(('.pptx','.docx','.xlsx')): result=optimize_office(raw)
        elif name.endswith('.pdf'): result=optimize_pdf(raw)
        else: result=raw
        if name=='A12_hollywood-1.pptx': result=remove_embedded_ppt_fonts(result)
        if result!=raw:
            xref=d.embfile_upd(i)
            d.update_stream(xref,result)
            d.xref_set_key(xref,'Params/Size',str(len(result)))
            d.xref_set_key(xref,'DL',str(len(result)))
    compress_pdf_images(d,quality=90)
    temp=path.with_name(path.stem+'.compact.pdf')
    d.save(temp,garbage=4,deflate=True,use_objstms=1)
    d.close()
    with fitz.open(temp) as check:
        assert len(check)==42
        assert check.embfile_count()==24
        assert check.embfile_names()==names
        assert [p.get_text() for p in check]==texts
        assert link_targets(check)==links
        assert sum(len(p.get_links()) for p in check)==175
        for i in range(check.embfile_count()):
            filename=check.embfile_info(i)['filename']
            if filename.endswith(('.pptx','.docx','.xlsx')):
                assert zipfile.ZipFile(io.BytesIO(check.embfile_get(i))).testzip() is None
    assert temp.stat().st_size<50_000_000
    temp.replace(path)
    result={'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),
            'pages':42,'embedded_files':24,'links':175,'edition':'compact-20261029'}
    path.with_suffix('.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print('Compact portfolio verified: '+json.dumps(result),flush=True)

if __name__=='__main__':
    compact(sys.argv[1])
