// Walmart: original group materials and the author’s stated contribution.
const WALMART_PROJECT = {
  "id": "bmt5101-walmart",
  "title": "Walmart周销售：门店表现与相对稳定性",
  "en": "Walmart Weekly Sales · Store Performance & Relative Stability",
  "category": "研究与数据分析",
  "kind": "小组项目",
  "course": "NUS · BMT5101 · Group Project",
  "stage": "硕士课程项目 · NUS",
  "summary": "Crazy Tuesday小组基于45家匿名门店、143周及6,435条门店周度记录，对2010年2月至2012年10月的销售数据进行探索性分析。项目结合数据校验、时间与季节模式、门店差异及节假日标签比较，区分销售水平与相对波动，并讨论历史样本和描述性方法的解释边界。",
  "topics": [
    "Python",
    "门店比较",
    "变异系数（CV）",
    "探索性数据分析",
    "团队协作"
  ],
  "role": "负责展示第6–7页的门店销售表现与相对稳定性分析：比较门店平均周销售额及头尾差距，利用变异系数（CV）和全样本散点图考察销售领先与相对稳定性之间的关系，说明两者应分别评价。同时承担项目协调工作，包括组织任务分配、推进小组进度、汇总各部分成果，以及协调展示和文档的整体格式与呈现。完整Notebook与展示为小组共同成果，涵盖其他成员负责的数据校验、时间模式及节假日分析。",
  "thumb": "assets/walmart-cover.jpg",
  "page": 10,
  "files": [
    {
      "source": "BMT5101_CrazyTuesday_Walmart Weekly Sales Analysis.pdf",
      "label": "小组展示 · 10页",
      "id": "bmt5101-walmart-1",
      "ext": "PDF",
      "bytes": 9531983,
      "previewType": "pdf",
      "url": "assets/walmart-weekly-sales.pdf",
      "preview": "assets/walmart-weekly-sales.pdf"
    },
    {
      "source": "BMT5101_CrazyTuesday_Walmart Weekly Sales Analysis.ipynb",
      "label": "完整分析Notebook · 代码与已有输出",
      "id": "bmt5101-walmart-2",
      "ext": "IPYNB",
      "bytes": 992458,
      "previewType": "notebook",
      "url": "assets/walmart-weekly-sales.ipynb",
      "preview": "https://github.com/yuzzd0330/yuzzd0330.github.io/blob/main/site/assets/walmart-weekly-sales.ipynb"
    }
  ],
  "story": [
    {
      "heading": "门店销售额相差多少？",
      "body": "在45家门店中，最高与最低平均周销售额之比为8.11倍。Store 20约为2.108百万原始销售值，Store 33约为0.260百万。头尾排名呈现规模差异，但缺少门店面积、位置、成本等信息，不能据此直接判断盈利或管理质量。"
    },
    {
      "heading": "销售领先，也意味着相对稳定吗？",
      "body": "采用CV＝样本标准差／平均值衡量相对波动。销售额前五与CV最低的五家门店没有重合；45家门店的平均销售额与CV相关系数为0.137。两种比较支持分别评价销售水平与相对波动，不构成显著性或因果结论。"
    },
    {
      "heading": "从分工到共同交付",
      "body": "围绕负责的分析内容，与其他模块保持数据和口径衔接；同时组织分工、跟进进度、汇总成果并统一格式。小组最终交付完整Notebook和10页展示，保留代码、已有输出、数据来源说明和研究限制。"
    }
  ]
};
const WALMART_PROJECT_EN = {
  "title": "Walmart Weekly Sales: Store Performance & Relative Stability",
  "summary": "Crazy Tuesday analysed 6,435 store-week observations covering 45 anonymous stores and 143 weeks from February 2010 to October 2012. The exploratory study combines data validation, time and seasonal patterns, store comparisons and holiday-label analysis, distinguishing sales levels from relative variability and recognising the limits of historical, descriptive evidence.",
  "role": "I prepared the store sales performance and relative-stability analysis presented on slides 6–7. I compared average weekly sales and the highest-to-lowest gap, and used the coefficient of variation (CV) and a full-sample scatterplot to examine whether sales leaders also had low relative variability. I also coordinated task allocation, followed up progress, consolidated the team’s contributions and aligned the formatting and presentation of the final deliverables. The complete Notebook and slide deck are team outputs that also cover other members’ data-validation, time-pattern and holiday analyses.",
  "story": [
    [
      "How large is the sales gap?",
      "The highest-to-lowest store mean ratio is 8.11. Store 20 averages approximately 2.108 million in reported sales value, compared with 0.260 million for Store 33. Rankings describe sales levels; absent store size, location and cost information prevent direct conclusions about profitability or management quality."
    ],
    [
      "Do sales leaders also have low relative variability?",
      "CV is sample SD divided by the mean. The top-five sales group and lowest-five CV group have no shared stores, while the mean–CV correlation across 45 stores is 0.137. These descriptive comparisons support assessing sales levels and relative variability separately; they do not establish statistical significance or causality."
    ],
    [
      "Coordinating a shared delivery",
      "I aligned my analysis with the shared data and definitions, coordinated task allocation and progress, consolidated the contributions and helped unify formatting. The team delivered a complete Notebook and a 10-slide presentation, retaining code, saved outputs, data-provenance notes and study limitations."
    ]
  ]
};
PROJECT_META[WALMART_PROJECT.id] = {
  "teaser": "比较45家门店的销售规模与相对波动，结合代码、图表及团队协调完成交付。",
  "tools": [
    "Python",
    "pandas",
    "Matplotlib"
  ],
  "methods": [
    "探索性数据分析",
    "门店比较",
    "可视化"
  ],
  "evidence": [
    {
      "image": "assets/walmart-store-gap.jpg",
      "title": "8.11倍：门店平均销售额的头尾差距",
      "body": "在45家门店中，最高与最低平均周销售额之比为8.11倍。Store 20约为2.108百万原始销售值，Store 33约为0.260百万。头尾排名呈现规模差异，但缺少门店面积、位置、成本等信息，不能据此直接判断盈利或管理质量。",
      "source": "小组展示第6页；Notebook C.2–C.3。对应本人负责的门店比较分析。",
      "file": 0
    },
    {
      "image": "assets/walmart-sales-cv.jpg",
      "title": "销售水平与相对波动，需要分别评价",
      "body": "采用CV＝样本标准差／平均值衡量相对波动。销售额前五与CV最低的五家门店没有重合；45家门店的平均销售额与CV相关系数为0.137。两种比较支持分别评价销售水平与相对波动，不构成显著性或因果结论。",
      "source": "小组展示第7页；Notebook C.2、C.4。CV使用样本标准差。",
      "file": 0
    }
  ]
};
PORTFOLIO_PROJECT_EN[WALMART_PROJECT.id] = WALMART_PROJECT_EN;
Object.assign(PORTFOLIO_DICTIONARY, {
  "Walmart周销售：门店表现与相对稳定性": "Walmart Weekly Sales: Store Performance & Relative Stability",
  "Crazy Tuesday小组基于45家匿名门店、143周及6,435条门店周度记录，对2010年2月至2012年10月的销售数据进行探索性分析。项目结合数据校验、时间与季节模式、门店差异及节假日标签比较，区分销售水平与相对波动，并讨论历史样本和描述性方法的解释边界。": "Crazy Tuesday analysed 6,435 store-week observations covering 45 anonymous stores and 143 weeks from February 2010 to October 2012. The exploratory study combines data validation, time and seasonal patterns, store comparisons and holiday-label analysis, distinguishing sales levels from relative variability and recognising the limits of historical, descriptive evidence.",
  "负责展示第6–7页的门店销售表现与相对稳定性分析：比较门店平均周销售额及头尾差距，利用变异系数（CV）和全样本散点图考察销售领先与相对稳定性之间的关系，说明两者应分别评价。同时承担项目协调工作，包括组织任务分配、推进小组进度、汇总各部分成果，以及协调展示和文档的整体格式与呈现。完整Notebook与展示为小组共同成果，涵盖其他成员负责的数据校验、时间模式及节假日分析。": "I prepared the store sales performance and relative-stability analysis presented on slides 6–7. I compared average weekly sales and the highest-to-lowest gap, and used the coefficient of variation (CV) and a full-sample scatterplot to examine whether sales leaders also had low relative variability. I also coordinated task allocation, followed up progress, consolidated the team’s contributions and aligned the formatting and presentation of the final deliverables. The complete Notebook and slide deck are team outputs that also cover other members’ data-validation, time-pattern and holiday analyses.",
  "比较45家门店的销售规模与相对波动，结合代码、图表及团队协调完成交付。": "Comparing sales levels and relative variability across 45 stores, supported by code, visual evidence and coordinated team delivery.",
  "变异系数（CV）": "Coefficient of variation (CV)",
  "探索性数据分析": "Exploratory data analysis",
  "门店比较": "Store comparison",
  "团队协作": "Team collaboration",
  "小组展示 · 10页": "Group presentation · 10 slides",
  "完整分析Notebook · 代码与已有输出": "Complete analysis Notebook · code and saved outputs",
  "8.11倍：门店平均销售额的头尾差距": "8.11-fold: the gap between highest and lowest mean store sales",
  "销售水平与相对波动，需要分别评价": "Assess sales levels and relative variability separately",
  "小组展示第6页；Notebook C.2–C.3。对应本人负责的门店比较分析。": "Group presentation, slide 6; Notebook C.2–C.3. My store-comparison analysis.",
  "小组展示第7页；Notebook C.2、C.4。CV使用样本标准差。": "Group presentation, slide 7; Notebook C.2 and C.4. CV uses sample SD.",
  "Walmart周销售：门店表现与相对稳定性材料节选": "Walmart project material excerpt",
  "门店销售额相差多少？": "How large is the sales gap?",
  "在45家门店中，最高与最低平均周销售额之比为8.11倍。Store 20约为2.108百万原始销售值，Store 33约为0.260百万。头尾排名呈现规模差异，但缺少门店面积、位置、成本等信息，不能据此直接判断盈利或管理质量。": "The highest-to-lowest store mean ratio is 8.11. Store 20 averages approximately 2.108 million in reported sales value, compared with 0.260 million for Store 33. Rankings describe sales levels; absent store size, location and cost information prevent direct conclusions about profitability or management quality.",
  "销售领先，也意味着相对稳定吗？": "Do sales leaders also have low relative variability?",
  "采用CV＝样本标准差／平均值衡量相对波动。销售额前五与CV最低的五家门店没有重合；45家门店的平均销售额与CV相关系数为0.137。两种比较支持分别评价销售水平与相对波动，不构成显著性或因果结论。": "CV is sample SD divided by the mean. The top-five sales group and lowest-five CV group have no shared stores, while the mean–CV correlation across 45 stores is 0.137. These descriptive comparisons support assessing sales levels and relative variability separately; they do not establish statistical significance or causality.",
  "从分工到共同交付": "Coordinating a shared delivery",
  "围绕负责的分析内容，与其他模块保持数据和口径衔接；同时组织分工、跟进进度、汇总成果并统一格式。小组最终交付完整Notebook和10页展示，保留代码、已有输出、数据来源说明和研究限制。": "I aligned my analysis with the shared data and definitions, coordinated task allocation and progress, consolidated the contributions and helped unify formatting. The team delivered a complete Notebook and a 10-slide presentation, retaining code, saved outputs, data-provenance notes and study limitations."
});
if (!PROJECTS.some(project => project.id === WALMART_PROJECT.id)) PROJECTS.unshift(WALMART_PROJECT);
// Read the original Notebook through GitHub’s native viewer; no derived HTML export is published.
const walmartPreviousOpenPreview = openPreview;
openPreview = function(project, file) {
  if (file.id !== 'bmt5101-walmart-2') return walmartPreviousOpenPreview(project, file);
  currentFile = file;
  $('#viewer-title').textContent = project.title + ' · ' + file.label;
  $('#viewer-subtitle').textContent = 'IPYNB · ' + size(file.bytes);
  const open = $('#open-file'); open.hidden = false; open.href = file.preview;
  $('#preview-body').innerHTML = `<div style="max-width:650px;margin:60px auto;padding:28px;line-height:1.8"><h2>完整Notebook源文件</h2><p>可在GitHub阅读原始Notebook中的代码和已有输出，或下载源文件后用Jupyter打开。</p><p><a href="${file.preview}" target="_blank" rel="noopener">在GitHub阅读Notebook ↗</a></p><p><a href="${file.url}" download="${file.source}">下载原始Notebook</a></p></div>`;
  $('#viewer').showModal();
};
Object.assign(PORTFOLIO_DICTIONARY, {
  '完整Notebook源文件':'Original complete Notebook',
  '可在GitHub阅读原始Notebook中的代码和已有输出，或下载源文件后用Jupyter打开。':'Read the original Notebook’s code and saved outputs on GitHub, or download the source file and open it in Jupyter.',
  '在GitHub阅读Notebook ↗':'Read Notebook on GitHub ↗',
  '下载原始Notebook':'Download original Notebook'
});
render();
applyPortfolioLanguage();
