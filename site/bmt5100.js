// BMT5100 project and PDF reader; existing portfolio projects are unchanged.
PROJECTS.unshift({"id":"bmt5100-cxmt","title":"长鑫存储：存货减值与投资者判断","en":"CXMT · Inventory Impairment & Investor Evaluation","category":"审计与舞弊识别","kind":"小组项目","course":"NUS · BMT5100 · Preparing Financial Statements","stage":"硕士课程项目 · NUS","summary":"以长鑫存储为案例，结合 DRAM 周期、存货成本与可变现净值、审计关键事项及 SK hynix 同业比较，评价存货减值下降的经济依据与剩余不确定性。","topics":["NUS 硕士项目","存货减值","可变现净值（NRV）","审计判断","同业比较"],"files":[{"source":"BMT5100-Project1-Group7-CXMT.pdf","label":"完整小组展示 · 30 页（网页版）","id":"bmt5100-cxmt-1","ext":"PDF","bytes":9909638,"previewType":"pdf","parts":["assets/bmt5100-cxmt.part00","assets/bmt5100-cxmt.part01","assets/bmt5100-cxmt.part02","assets/bmt5100-cxmt.part03","assets/bmt5100-cxmt.part04","assets/bmt5100-cxmt.part05","assets/bmt5100-cxmt.part06","assets/bmt5100-cxmt.part07","assets/bmt5100-cxmt.part08","assets/bmt5100-cxmt.part09","assets/bmt5100-cxmt.part10","assets/bmt5100-cxmt.part11","assets/bmt5100-cxmt.part12","assets/bmt5100-cxmt.part13","assets/bmt5100-cxmt.part14","assets/bmt5100-cxmt.part15","assets/bmt5100-cxmt.part16","assets/bmt5100-cxmt.part17","assets/bmt5100-cxmt.part18","assets/bmt5100-cxmt.part19","assets/bmt5100-cxmt.part20","assets/bmt5100-cxmt.part21","assets/bmt5100-cxmt.part22"]}],"role":"小组共同完成长鑫存储分析；我负责 Part 6 投资者评价，围绕支持减值改善的证据、剩余不确定性及投资者判断展开分析。完整 PDF 包含其他组员负责的内容。","page":30,"thumb":"assets/nus-logo.png","story":[{"heading":"从存货计量追溯经营风险","body":"小组以存货减值为切入点，将 DRAM 价格周期、技术迭代与制造成本联系到存货成本和可变现净值，解释减值如何影响财务报表，并区分减值转回与存货出售后的准备转销。"},{"heading":"将改善证据与剩余不确定性分开考察","body":"在负责的投资者评价部分，我结合年度减值损失、期末准备比例、存货规模及在产品占比，讨论减值压力缓解的经济依据；进一步区分周期性价格回升与成本、效率和产品结构带来的改善。"},{"heading":"形成有条件的投资者判断","body":"展示形成审慎乐观的存货风险判断，同时保留对价格、成本、技术及管理层估计的关注。后续检验重点是：当 DRAM 价格走弱时，较低单位成本和产品结构改善能否持续。该分析针对存货风险，不构成买卖建议。"}]});
const bmt5100OriginalOpenPreview = openPreview;
const bmt5100OriginalDownload = download;
let bmt5100PdfPromise;
async function bmt5100CompletePdf(file) {
 if (!bmt5100PdfPromise) bmt5100PdfPromise = (async () => {
  toast('正在加载完整 PDF…', true);
  const buffers = await Promise.all(file.parts.map(async part => {
   const response = await fetch(part);
   if (!response.ok) throw Error('PDF 文件读取失败');
   return response.arrayBuffer();
  }));
  const pdf = new Blob(buffers, {type:'application/pdf'});
  if (pdf.size !== 9909638) throw Error('PDF 文件大小校验失败');
  const digest = await crypto.subtle.digest('SHA-256', await pdf.arrayBuffer());
  const hash = Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2,'0')).join('');
  if (hash !== 'a4e715455a7b927ba745a6894d8349b4333fdf6be2a67a4e0e7d4ec774c2a730') throw Error('PDF 完整性校验失败');
  const url = URL.createObjectURL(pdf);
  toast('完整 PDF 已加载');
  return {...file, parts:undefined, url, preview:url};
 })().catch(error => { bmt5100PdfPromise = undefined; toast('PDF 加载暂未完成，请重试。'); throw error; });
 return bmt5100PdfPromise;
}
openPreview = async function(project, file) {
 if (file.id !== 'bmt5100-cxmt-1') return bmt5100OriginalOpenPreview(project, file);
 try { bmt5100OriginalOpenPreview(project, await bmt5100CompletePdf(file)); } catch {}
};
download = async function(file) {
 if (file.id !== 'bmt5100-cxmt-1' || !file.parts) return bmt5100OriginalDownload(file);
 try { bmt5100OriginalDownload(await bmt5100CompletePdf(file)); } catch {}
};
render();
