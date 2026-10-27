// Project discovery and selected evidence, grounded in the archived materials.
const PORTFOLIO_CONTACT = {email:'michelle_0330@163.com',resume:'assets/jingwei-liu-resume-public.pdf'};
const FEATURED_IDS = ['sinopec','kangdexin','python-finance','tourism-consulting'];
const PROJECT_META = {
 'sinopec':{teaser:'结合五年财务数据与 ESG 证据，评价中石化经营表现与转型压力。',tools:['Excel'],methods:['财务比率','同业比较','ESG 分析'],focus:'财务与 ESG 综合判断',evidence:[
  {image:'assets/highlights/sinopec-profitability.png',title:'盈利改善能否持续？',body:'中石化的 ROA、ROE 在 2021 年回升后逐步走弱。与中海油对照后，需要进一步结合炼化与上游业务结构解释差异，而非仅按比率高低评价企业。',source:'个人 FYP 报告，第 8 页，Figure 2；配套 Excel 保留计算过程。',file:0},
  {image:'assets/highlights/sinopec-emissions.png',title:'把排放变化放在同一基期下比较',body:'以 2020 年为 100，中石化的 Scope 1、2 排放指数在 2024 年为 98.25，中海油为 136.88。这呈现了变化路径的差异，不能替代对绝对排放规模和业务结构的判断。',source:'个人 FYP 报告，第 16 页，Figure 6。',file:0}
 ]},
 'greentech':{teaser:'比较财务审计与 ESG 有限保证，讨论证据要求和审计技术的适用边界。',tools:[],methods:['审计与鉴证','案例研究','文献研究']},
 'tourism-consulting':{teaser:'比较巴厘岛与日本白马的住宿扩张机会，将经营潜力与产权约束联系起来。',tools:[],methods:['跨市场比较','投资分析','制度分析'],focus:'跨市场投资与制度约束',evidence:[
  {type:'comparison',title:'同一投资问题，两种经营与持有逻辑',columns:['比较维度','巴厘岛','日本白马'],rows:[['住宿发展','侧重短期租赁与现金流','侧重四季运营与度假区扩张'],['产权安排','原报告讨论租赁持有及续期风险','原报告讨论永久产权及资产持有稳定性'],['投资含义','需关注客流、持有期限与融资约束','需权衡长期资产价值、投入规模与季节性']],body:'住宿经营模式与产权安排需要一起评价：较高的短期收益未必带来更灵活的长期持有和融资条件。以上按原报告研究情境整理，展示我负责的住宿扩张及产权分析思路。',source:'小组咨询报告，第 4—5、9—10 页；对应本人负责的住宿发展与产权分析。',file:0}
 ]},
 'surf':{teaser:'从监管案例和财务异常出发，结合舞弊三角解释跨行业风险线索。',tools:['Python','Excel'],methods:['监管案例研究','舞弊识别','财务分析']},
 'xinyan':{teaser:'以应收、现金流和成本指标交叉检验新研控股案例中的舞弊线索。',tools:[],methods:['财务比率','舞弊识别','案例研究']},
 'kangdexin':{teaser:'结合异常指标、复杂资金路径与证监会处罚，区分舞弊线索和已认定事实。',tools:[],methods:['财务比率','监管案例研究','舞弊识别'],focus:'舞弊线索与监管证据',evidence:[
  {image:'assets/highlights/kangdexin-complex.png',title:'异常增长是一条线索，仍需核对资金去向',body:'图中其他应收款在 2018 年出现显著增长。我在复杂舞弊模式部分结合回收效率与资金路径讨论其含义，并将其作为补充预警信号，与监管已认定事实分别处理。',source:'小组报告，第 9 页（正文页码 5），Figure 5；本人负责的复杂舞弊模式部分。',file:0}
 ]},
 'python-finance':{teaser:'用 pandas 串联财务数据处理、指标计算与趋势可视化，保留代码和输出。',tools:['Python','pandas','Matplotlib'],methods:['数据处理','财务比率','可视化'],focus:'可检查的财务数据流程',evidence:[
  {image:'assets/highlights/python-roa.png',title:'从计算步骤到年度趋势',body:'Notebook 将公司年度数据筛选、平均余额处理与指标计算连接起来，再输出 ROA 趋势。图表用于定位变化年份，具体原因仍需回到原始数据和企业背景核查。',source:'个人 Notebook 中保留的原始输出；本次未重新运行计算。',file:0},
  {image:'assets/highlights/python-growth.png',title:'把现金流增长与利润增长放在一起看',body:'将经营现金流与净利润的增长趋势放在同一视图中，便于观察两者是否同步。差异用于提出后续分析问题，不能单独据此认定盈余质量或舞弊。',source:'个人 Notebook 中保留的原始输出；本次未重新运行计算。',file:0}
 ]},
 'digital-audit':{teaser:'研究数字化审计的应用条件，并从伦理、责任和职业判断角度审视挑战。',tools:[],methods:['文献研究','审计与鉴证','伦理分析']},
 'auto-esg':{teaser:'比较大众、宝马与丰田的财务及 ESG 风险，检视披露与行动的一致性。',tools:[],methods:['同业比较','ESG 分析','披露分析']},
 'huazhu':{teaser:'以华住案例分析战略、绩效与激励，讨论所有权如何影响管理者行为。',tools:[],methods:['管理会计','案例研究','激励机制分析']},
 'capital-capacity':{teaser:'评价可持续产品线的资金承受能力，将财务分析转化为管理建议。',tools:[],methods:['财务分析','投资分析','ESG 分析']},
 'bibliometric':{teaser:'基于 255 篇文献，以文献计量和知识图谱梳理盈余管理与自愿披露研究。',tools:['Bibliometrix','VOSviewer'],methods:['文献计量','可视化','文献研究']},
 'hollywood':{teaser:'联系资本市场动机与会计政策，讨论 Hollywood Bowl 的会计质量及盈余管理伦理。',tools:[],methods:['案例研究','会计质量分析','伦理分析']},
 'hilton-lotus':{teaser:'通过指标计算与背景解读，比较 Hilton Food Group 与莲花健康的财务表现。',tools:[],methods:['财务比率','跨市场比较','财务分析']},
 'bmt5100-cxmt':{teaser:'结合存货减值、DRAM 周期与同业证据，形成有条件的投资者评价。',tools:[],methods:['存货计量','同业比较','投资分析'],evidence:[
  {image:'assets/highlights/cxmt-investor.png',title:'减值压力改善，需要区分年度损失与期末准备',body:'年度减值损失与期末准备比例同时下降，为压力缓解提供支持，但两者衡量的内容不同。投资者评价还需结合存货规模、在产品占比，以及价格与成本改善能否持续。',source:'小组展示，第 26 页；本人负责的 Part 6 投资者评价。',file:0}
 ]}
};
function projectMeta(p){return PROJECT_META[p.id]||{tools:[],methods:[]}}
function contactActions(){return `<div class="contact-actions"><a class="contact-primary" href="${PORTFOLIO_CONTACT.resume}" download="刘婧玮_审计简历_公开版.pdf">${icon('download')}下载简历<span>PDF · 公开版</span></a><a href="mailto:${PORTFOLIO_CONTACT.email}">联系我<span>${PORTFOLIO_CONTACT.email}</span></a><a href="#about">关于我 ${icon('arrow')}</a></div>`}
function featuredProjects(){return `<section class="featured-section" aria-labelledby="featured-title"><div class="section-heading"><div><div class="eyebrow">SELECTED WORK</div><h2 id="featured-title">精选项目</h2></div><p>从四种分析路径，了解我的工作。</p></div><div class="featured-grid">${FEATURED_IDS.map((id,i)=>{const p=PROJECTS.find(p=>p.id===id);if(!p)return '';const m=projectMeta(p);return `<a class="featured-card" href="#project/${p.id}"><span class="featured-index">0${i+1}</span><div><span class="featured-focus">${esc(m.focus)}</span><h3>${esc(p.title)}</h3><p>${esc(m.teaser)}</p></div>${icon('arrow')}</a>`}).join('')}</div></section>`}
function evidenceSection(p){const items=projectMeta(p).evidence;if(!items?.length)return '';return `<section class="evidence-section" aria-labelledby="evidence-title"><div class="section-heading"><div><div class="eyebrow">A CLOSER LOOK</div><h2 id="evidence-title">关键图表与分析</h2></div></div>${items.map(e=>`<figure class="evidence-item">${e.type==='comparison'?`<div class="evidence-table-wrap"><table class="evidence-table"><caption>${esc(e.title)}</caption><thead><tr>${e.columns.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${e.rows.map(r=>`<tr>${r.map((v,i)=>i===0?`<th scope="row">${esc(v)}</th>`:`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:`<a class="evidence-image" href="${e.image}" target="_blank" rel="noopener" aria-label="查看原图：${esc(e.title)}"><img src="${e.image}" alt="${esc(e.title)}" loading="lazy"></a>`}<figcaption><h3>${esc(e.title)}</h3><p>${esc(e.body)}</p><small>${esc(e.source)}</small><button class="evidence-source" data-evidence-preview="${e.file}">打开完整材料 ${icon('arrow')}</button></figcaption></figure>`).join('')}</section>`}
