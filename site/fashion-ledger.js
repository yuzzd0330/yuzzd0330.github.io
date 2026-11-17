const fashionLedger = {
  id: 'bmt5100-fashion-ledger',
  title: '迅销与 Inditex：服装零售的存货周转',
  en: 'The Fashion Ledger · Inventory Efficiency',
  category: '财务与商业分析',
  kind: '小组项目',
  course: 'NUS · BMT5100 · Group Assignment 2',
  stage: '硕士课程项目 · NUS',
  summary: '小组以财经杂志 The Fashion Ledger 的形式，对比优衣库母公司迅销和 Zara 母公司 Inditex 的经营模式及财务表现。分析以 FY2021–FY2025 的集团合并报表为基础，涵盖存货估值与周转、盈利能力及门店扩张等议题。',
  role: '我负责 M4 存货效率分析，对应小组杂志第 14–15 页。我从两家公司的合并报表整理营业收入、销售成本与期末存货，在 Excel 建立五年计算表，并撰写章节底稿。分析追踪存货周转率、存货周转天数及期末存货占营收比，结合管理层披露解释迅销 FY2022 的库存积压及此后的恢复。',
  thumb: 'assets/fashion-ledger-inventory.jpg',
  page: 2,
  topics: ['存货周转', '财务报表分析', 'Excel'],
  files: [
    {
      source: 'M4_Inventory_Efficiency_Analysis.docx',
      label: '个人分析底稿 · 校正版',
      id: 'bmt5100-fashion-ledger-word',
      ext: 'DOCX',
      bytes: 208090,
      url: 'assets/m4-inventory-analysis.docx'
    },
    {
      source: 'M4_Inventory_Efficiency_Calculations_Revised.xlsx',
      label: '个人五年测算表 · Excel',
      id: 'bmt5100-fashion-ledger-excel',
      ext: 'XLSX',
      bytes: 19838,
      url: 'assets/m4-inventory-calculations.xlsx'
    }
  ],
  story: [
    {
      heading: 'FY2022，迅销的存货为什么周转变慢？',
      body: '迅销期末存货同比增加 23.1%，同期营收增长 7.9%。周转率降至 2.48 次，周转天数升至 146.9 天。管理层披露，疫情期间生产和物流受扰，集团提高了备货水平，但部分畅销商品仍然缺货。'
    },
    {
      heading: 'FY2025，两家公司的差距还有多大？',
      body: 'Inditex 在五个财年均录得更高的存货周转率。FY2025，Inditex 与迅销的周转率分别为 5.07 次和 3.19 次，周转天数分别为 72.0 天和 114.4 天，期末存货占营收比分别为 8.2% 和 15.0%。迅销的周转天数较 FY2022 缩短约 32.5 天。'
    },
    {
      heading: '怎样读这三项指标？',
      body: '以销售成本除以期初与期末存货的平均值计算周转率，再用 365 除以周转率计算周转天数。用期末存货除以全年营收衡量存货规模。解读时结合集团财年截止日、商品结构、折扣、缺货和存货减值披露。'
    }
  ]
};

const fashionLedgerEnglish = {
  title: 'Fast Retailing and Inditex: Inventory Turnover in Fashion Retail',
  summary: 'The team produced The Fashion Ledger, a financial magazine comparing the operating models and financial performance of Fast Retailing, parent of UNIQLO, and Inditex, parent of Zara. The project draws on FY2021–FY2025 consolidated financial statements and covers inventory valuation and turnover, profitability, and store expansion.',
  role: 'I was responsible for M4, the inventory efficiency analysis on pages 14–15 of the group magazine. I compiled revenue, cost of sales, and closing inventory from the consolidated statements, built a five-year Excel schedule, and wrote the section draft. I tracked inventory turnover, days inventory outstanding (DIO), and closing inventory relative to revenue, using management disclosures to interpret Fast Retailing’s FY2022 stock build-up and subsequent recovery.',
  story: [
    ['What slowed Fast Retailing’s inventory turnover in FY2022?', 'Closing inventory rose 23.1% year on year while revenue grew 7.9%. Turnover fell to 2.48 times and DIO rose to 146.9 days. Management reported that pandemic-era production and logistics disruptions prompted higher stock levels, even as some popular products remained unavailable.'],
    ['How large was the gap in FY2025?', 'Inditex recorded higher inventory turnover in all five fiscal years. In FY2025, turnover was 5.07 times at Inditex and 3.19 at Fast Retailing. DIO was 72.0 and 114.4 days, respectively, and closing inventory was 8.2% and 15.0% of revenue. Fast Retailing had cut DIO by about 32.5 days since FY2022.'],
    ['How should the three metrics be read?', 'Divide cost of sales by average opening and closing inventory to calculate turnover, and divide 365 by turnover to calculate DIO. Divide closing inventory by annual revenue to assess stock intensity. Interpret the ratios alongside group fiscal year ends, product mix, markdowns, stock availability, and inventory write-down disclosures.']
  ]
};

const fashionLedgerMeta = {
  teaser: '追踪 FY2021–FY2025 的存货周转，拆解迅销 FY2022 的库存积压及此后的恢复。',
  tools: ['Excel'],
  methods: ['财务比率分析', '同业比较']
};
PROJECT_META[fashionLedger.id] = fashionLedgerMeta;
PORTFOLIO_PROJECT_EN[fashionLedger.id] = fashionLedgerEnglish;
Object.assign(PORTFOLIO_DICTIONARY, {
  [fashionLedger.title]: fashionLedgerEnglish.title,
  ['打开项目：' + fashionLedger.title]: 'Open project: ' + fashionLedgerEnglish.title,
  [fashionLedger.title + '材料节选']: 'Inventory efficiency project cover',
  [fashionLedger.summary]: fashionLedgerEnglish.summary,
  [fashionLedger.role]: fashionLedgerEnglish.role,
  [fashionLedgerMeta.teaser]: 'A five-year turnover comparison tracing Fast Retailing’s FY2022 stock build-up and subsequent recovery.',
  '存货周转': 'Inventory turnover',
  '财务报表分析': 'Financial statement analysis',
  '财务比率分析': 'Financial ratio analysis',
  '同业比较': 'Peer comparison',
  '项目介绍': 'Project overview',
  '个人分析底稿 · 校正版': 'Individual analysis · corrected version',
  '个人五年测算表 · Excel': 'Individual five-year calculation workbook · Excel'
});
fashionLedger.story.forEach(({heading, body}, i) => {
  PORTFOLIO_DICTIONARY[heading] = fashionLedgerEnglish.story[i][0];
  PORTFOLIO_DICTIONARY[body] = fashionLedgerEnglish.story[i][1];
});
PROJECTS.unshift(fashionLedger);
render();
applyPortfolioLanguage();
