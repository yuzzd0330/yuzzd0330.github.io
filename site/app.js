const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const CATEGORIES = ['全部项目','财务与商业分析','审计与舞弊识别','研究与数据分析'];
const CATEGORY_COPY = {
 '全部项目':{eyebrow:'ACADEMIC WORK & PROFESSIONAL INTERESTS',lines:['收录本科与硕士阶段的毕业项目、企业咨询、科研与课程成果。','从财务与商业分析到舞弊识别，这些材料呈现我的研究方法与专业判断，也记录了沿着问题逐步深入的过程。']},
 '财务与商业分析':{eyebrow:'FINANCIAL & BUSINESS ANALYSIS',lines:['围绕企业经营、绩效管理与投资决策展开的分析项目。','结合财务报表、行业背景与制度环境，考察经营表现、资本配置与长期价值之间的联系。']},
 '审计与舞弊识别':{eyebrow:'AUDIT, EVIDENCE & ACCOUNTING FRAUD',lines:['以会计质量、舞弊风险与审计证据为核心的案例与研究。','从异常识别到事实核查，关注证据如何支持判断，以及结论应止于何处。']},
 '研究与数据分析':{eyebrow:'RESEARCH & DATA ANALYSIS',lines:['以数据处理、文献计量与可视化为方法的研究尝试。','保留从资料筛选到结果解释的完整过程，并审视方法选择、信息边界与分析局限。']}
};
const CAT_ICONS = ['grid','chart','shield','search'];
let category='全部项目', query='', kind='all', stage='all', tool='all', method='all', view='grid', currentProject=null, currentFile=null, toastTimer;
try{view=localStorage.getItem('archiveView')==='list'?'list':'grid'}catch{}
function size(bytes){return bytes>=1048576?(bytes/1048576).toFixed(1)+' MB':Math.max(1,Math.round(bytes/1024))+' KB'}
function toast(message,stay=false){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');if(!stay)toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500)}
function projectStage(p){return p.stage?.startsWith('硕士')?'master':'bachelor'}
function stageLabel(){return stage==='master'?'研究生项目':stage==='bachelor'?'本科成果':''}
function renderNav(){
 $('.owner').classList.toggle('active',location.hash==='#about');
 document.querySelectorAll('[data-stage]').forEach(b=>{
  const selected=stage===b.dataset.stage&&location.hash!=='#about';
  b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));
  b.querySelector('.stage-count').textContent=PROJECTS.filter(p=>projectStage(p)===b.dataset.stage).length;
  b.onclick=()=>{stage=stage===b.dataset.stage?'all':b.dataset.stage;query='';$('#search').value='';if(location.hash)location.hash='';else render();};
 });
 $('#categories').innerHTML=CATEGORIES.map((c,i)=>`<button class="nav-item ${category===c&&location.hash!=='#about'?'active':''}" data-category="${c}" ${category===c?'aria-current="page"':''}>${icon(CAT_ICONS[i])}<span>${c}</span><span class="count">${c==='全部项目'?PROJECTS.length:PROJECTS.filter(p=>p.category===c).length}</span></button>`).join('');
 $('#categories').querySelectorAll('button').forEach(b=>b.onclick=()=>{category=b.dataset.category;if(category==='全部项目'){stage='all';tool='all';method='all';kind='all';}query='';$('#search').value='';if(location.hash)location.hash='';else render();renderNav()});
}
function matches(p){const m=projectMeta(p);return(tool==='all'||m.tools.includes(tool))&&(method==='all'||m.methods.includes(method))&&(stage==='all'||projectStage(p)===stage)&&(category==='全部项目'||p.category===category)&&(kind==='all'||p.kind===kind)&&(!query||[p.title,p.en,p.course,p.summary,p.role,...m.tools,...m.methods,...p.topics,...p.files.map(f=>f.source)].join(' ').toLowerCase().includes(query.toLowerCase()))}
function card(p){return `<button class="project" data-project="${p.id}" aria-label="打开项目：${esc(p.title)}"><div class="project-art"><div class="paper-stack"><span class="paper-back paper-third" aria-hidden="true"></span><span class="paper-back paper-second" aria-hidden="true"></span><img src="${p.thumb}" alt="${esc(p.title)}材料节选" loading="lazy"></div><span class="kind-badge ${p.fyp?'fyp-badge':''}">${p.fyp?'FYP · 毕业项目':p.kind}</span><span class="art-num">${String(PROJECTS.indexOf(p)+1).padStart(2,'0')} / ARCHIVE</span></div><div class="project-content"><div class="course">${esc(p.course)}</div><h3>${esc(p.title)}</h3><p class="project-desc">${esc(projectMeta(p).teaser||p.summary)}</p><div class="tags">${p.topics.slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="project-bottom"><span class="folder-name">${icon('folder')}${p.files.length} 份材料</span>${icon('arrow')}</div></div></button>`}
function render(){
 if(location.hash==='#about'){currentProject=null;renderNav();$('#top-current').textContent='关于我';renderProfile();return}
 const id=location.hash.replace('#project/','');currentProject=PROJECTS.find(p=>p.id===id)||null;
 renderNav();$('#top-current').textContent=currentProject?'项目文件夹':[category,stageLabel()].filter(Boolean).join(' · ');
 if(currentProject){renderDetail(currentProject);return}
 const list=PROJECTS.filter(matches);
 const copy=CATEGORY_COPY[category];
 const hasFilters=category!=='全部项目'||stage!=='all'||kind!=='all'||tool!=='all'||method!=='all'||!!query;
 const toolOptions=[...new Set(PROJECTS.flatMap(p=>projectMeta(p).tools))].sort();
 const methodOptions=[...new Set(PROJECTS.flatMap(p=>projectMeta(p).methods))].sort();
 $('#main').innerHTML=`<div class="intro"><div><div class="eyebrow">${copy.eyebrow}</div><h1>${category==='全部项目'?(stageLabel()||'项目档案'):category+(stageLabel()?' · '+stageLabel():'')}</h1><p>${copy.lines.map(line=>esc(line)).join('<br>')}</p></div><div class="archive-stamp">COLLECTION<strong>01—${String(PROJECTS.length).padStart(2,'0')}</strong>BACHELOR & MASTER</div></div>${!hasFilters?contactActions():''}<div class="stats"><div class="stat"><div class="stat-icon">${icon('folder')}</div><div><strong>${list.length}</strong><span>${hasFilters?'已筛选项目':'项目文件夹'}</span></div></div><div class="stat"><div class="stat-icon">${icon('file')}</div><div><strong>${list.reduce((n,p)=>n+p.files.length,0)}</strong><span>原始材料</span></div></div><div class="stat"><div class="stat-icon">${icon('chart')}</div><div><strong>${String(new Set(list.map(p=>p.category)).size).padStart(2,'0')}</strong><span>主题方向</span></div></div></div>${!hasFilters?featuredProjects():''}<div class="filter-bar" aria-label="工具与方法筛选"><label>工具<select id="tool-filter"><option value="all">全部工具</option>${toolOptions.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></label><label>方法<select id="method-filter"><option value="all">全部方法</option>${methodOptions.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></label>${hasFilters?'<button id="clear-filters">清除全部筛选</button>':'<span class="filter-hint">按项目实际使用的工具与分析方法查找</span>'}</div><div class="toolbar"><h2>${query?'搜索结果':'项目文件夹'}<span>${list.length} 个项目</span></h2><div class="controls"><select id="kind-filter" aria-label="筛选个人或小组项目"><option value="all">全部类型</option><option value="个人项目">个人项目</option><option value="小组项目">小组项目</option></select><div class="view-toggle"><button id="grid-view" class="${view==='grid'?'selected':''}" aria-label="网格视图" aria-pressed="${view==='grid'}">${icon('grid')}</button><button id="list-view" class="${view==='list'?'selected':''}" aria-label="列表视图" aria-pressed="${view==='list'}">${icon('list')}</button></div></div></div><p class="order-note">展示顺序：硕士课程项目、本科毕业项目、企业咨询与科研、专业课程项目；兼顾学习阶段、相关性与完成时间。</p><section class="projects ${view==='list'?'list':''}" aria-label="项目文件夹">${list.length?list.map(card).join(''):`<div class="empty-state">${icon('search')}<h3>没有找到匹配的项目</h3><p>试试“ESG”“Python”或课程编号。</p><button id="reset-search">清除筛选</button></div>`}</section>`;
 $('#tool-filter').value=tool;$('#tool-filter').onchange=e=>{tool=e.target.value;render()};
 $('#method-filter').value=method;$('#method-filter').onchange=e=>{method=e.target.value;render()};
 if($('#clear-filters'))$('#clear-filters').onclick=resetFilters;
 $('#kind-filter').value=kind;$('#kind-filter').onchange=e=>{kind=e.target.value;render()};
 $('#grid-view').onclick=()=>setView('grid');$('#list-view').onclick=()=>setView('list');
 $('#main').querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>{location.hash='project/'+b.dataset.project;window.scrollTo(0,0)});
 if($('#reset-search'))$('#reset-search').onclick=resetFilters;
}
function resetFilters(){query='';kind='all';stage='all';tool='all';method='all';category='全部项目';$('#search').value='';render()}
function setView(v){view=v;try{localStorage.setItem('archiveView',v)}catch{}render()}
function renderDetail(p){
 $('#main').innerHTML=`<div class="breadcrumb"><button id="all-back">全部项目</button><span>/</span><button id="category-back">${esc(p.category)}</button><span>/</span><span>${esc(p.title)}</span></div><div class="detail-title"><div class="detail-folder">${icon('folder')}</div><div><h1>${esc(p.title)}</h1><p>${esc(p.en)}</p></div></div><div class="detail-layout"><div class="detail-main"><section class="detail-overview">${p.fyp?`<div class="fyp-banner"><strong>FINAL YEAR PROJECT</strong><span>会计学本科毕业项目 · ${p.id==='sinopec'?'Case A':'Case B'} · 独立完成</span></div>`:''}<h2>项目概览</h2><p>${esc(p.summary)}</p><div class="tags">${p.topics.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="project-methods">${projectMeta(p).tools.length?`<p><strong>工具</strong>${projectMeta(p).tools.map(t=>esc(t)).join(' · ')}</p>`:''}<p><strong>方法</strong>${projectMeta(p).methods.map(t=>esc(t)).join(' · ')}</p></div><div class="contribution"><h2>${p.kind==='个人项目'?'完成方式':'我的参与'}</h2><p>${esc(p.role)}</p></div></section>${evidenceSection(p)}${p.story?`<section class="project-story" aria-label="项目分析过程与成果">${p.story.map((part,i)=>`<div class="story-part"><span class="story-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(part.heading)}</h2><p>${esc(part.body)}</p></div></div>`).join('')}</section>`:''}<div class="materials-header"><h2>项目材料</h2><span>${p.files.length} 份原始文件</span></div>${p.files.map((f,i)=>`<div class="file-row"><div class="file-type ${f.ext.toLowerCase()}">${f.ext}</div><div class="file-info"><strong>${esc(f.label)}</strong><small>${esc(f.source)} · ${size(f.bytes)}</small></div><div class="file-actions"><button data-preview="${i}">预览${f.previewType==='pdf'&&f.ext!=='PDF'?' PDF':''}</button><button class="icon-btn" data-download="${i}" aria-label="下载${esc(f.label)}">${icon('download')}</button></div></div>`).join('')}<button id="back-btn" class="back-btn">${icon('back')}返回项目目录</button></div><aside class="detail-side"><img src="${p.thumb}" alt="项目材料节选"><div><h3>档案信息</h3><div class="meta-row"><span>分类</span><strong>${esc(p.category)}</strong></div><div class="meta-row"><span>形式</span><strong>${p.kind}</strong></div><div class="meta-row"><span>项目来源</span><strong>${esc(p.course)}</strong></div><div class="meta-row"><span>阶段</span><strong>${esc(p.stage||'本科课程项目')}</strong></div><p class="detail-note">展示内容依据上传材料整理。原始文件保留原文；PDF 预览由原文件转换，部分字体或排版可能与原件略有差异。</p></div></aside></div>`;
 $('#all-back').onclick=()=>{category='全部项目';stage='all';tool='all';method='all';kind='all';location.hash=''};$('#category-back').onclick=()=>{category=p.category;location.hash=''};$('#back-btn').onclick=()=>{location.hash=''};
 $('#main').querySelectorAll('[data-evidence-preview]').forEach(b=>b.onclick=()=>openPreview(p,p.files[+b.dataset.evidencePreview]));
 $('#main').querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>openPreview(p,p.files[+b.dataset.preview]));
 $('#main').querySelectorAll('[data-download]').forEach(b=>b.onclick=()=>download(p.files[+b.dataset.download]));
}
function openPreview(p,f){
 currentFile=f;$('#viewer-title').textContent=p.title+' · '+f.label;$('#viewer-subtitle').textContent=f.ext+' · '+size(f.bytes)+(f.previewType==='pdf'&&f.ext!=='PDF'?' · PDF 转换预览':'');
 const a=$('#open-file');a.hidden=!f.preview;a.href=f.preview||'#';
 if(f.previewType==='table'){
  $('#preview-body').innerHTML=`<div class="table-preview"><p>${esc(f.tableNote)}</p><select id="sheet-select" aria-label="选择工作表">${f.tables.map((t,i)=>`<option value="${i}">${esc(t.name)}</option>`).join('')}</select><div class="table-scroll" id="table-content"></div></div>`;
  const table=i=>{const t=f.tables[i];$('#table-content').innerHTML=`<table><thead><tr>${t.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`};table(0);$('#sheet-select').onchange=e=>table(+e.target.value);
 }else if(f.previewType==='image'){
  $('#preview-body').innerHTML=`<div class="image-preview"><img src="${f.preview}" alt="${esc(f.label)}"></div>`;
 }else $('#preview-body').innerHTML=`<iframe title="${esc(f.label)}预览" src="${f.preview}${f.previewType==='pdf'?'#view=FitH':''}" ${f.previewType==='html'?'sandbox=""':''}></iframe>`;
 $('#viewer').showModal();
}
async function download(f){
 if(f.parts){
  toast('正在准备原始 PPTX，请稍候…',true);
  try{
   const buffers=[];for(const part of f.parts){const r=await fetch(part);if(!r.ok)throw Error('文件读取失败');buffers.push(await r.arrayBuffer())}
   const blob=new Blob(buffers,{type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=f.source;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);toast('已准备好原始文件下载');
  }catch{toast('下载暂未完成，请稍后重试。')}
 }else{const a=document.createElement('a');a.href=f.url;a.download=f.source;document.body.appendChild(a);a.click();a.remove()}
}
$('#close-viewer').onclick=()=>$('#viewer').close();$('#viewer').addEventListener('close',()=>{$('#preview-body').innerHTML='';currentFile=null});$('#download-viewer').onclick=()=>currentFile&&download(currentFile);
$('#viewer').addEventListener('click',e=>{if(e.target===$('#viewer')){const r=$('#viewer').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#viewer').close()}});
$('#search').addEventListener('input',e=>{query=e.target.value;if(location.hash)history.replaceState(null,'',location.pathname+location.search);render()});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#viewer').open){e.preventDefault();$('#search').focus()}});
render();

