const products = [
  { name: "PCB", carbon: 1.2, target: 1.0 },
  { name: "Notebook", carbon: 1.45, target: 1.1 },
  { name: "Server", carbon: 0.8, target: 1.0 }
];

const energy = [
  { key: "electricity", value: 250000, unit: "kWh", change: 18 },
  { key: "naturalGas", value: 5000, unit: "m3", change: 12 },
  { key: "steam", value: 820, unit: "ton", change: 4 },
  { key: "renewableEnergy", value: 20, unit: "%", change: -12 }
];

const optimizationData = {
  dataSources: [
    { key: "ERP", freshness: "08:30", completeness: 98, issues: 2, status: "normal" },
    { key: "MES", freshness: "08:25", completeness: 94, issues: 5, status: "warning" },
    { key: "EMS", freshness: "08:31", completeness: 99, issues: 1, status: "normal" },
    { key: "Excel", freshness: "Yesterday", completeness: 82, issues: 18, status: "warning" },
    { key: "PDF", freshness: "2026/06/21", completeness: 76, issues: 9, status: "warning" }
  ],
  suppliers: [
    { name: "GreenBoard Materials", category: "Raw materials", emissions: 420, risk: "critical", action: "Request primary activity data" },
    { name: "Formosa Logistics", category: "Transport", emissions: 180, risk: "warning", action: "Switch route and fuel mix" },
    { name: "EverPack", category: "Packaging", emissions: 96, risk: "normal", action: "Maintain quarterly evidence" },
    { name: "Precision Metals", category: "Components", emissions: 240, risk: "critical", action: "Start supplier reduction plan" }
  ],
  projects: [
    { name: "SMT standby optimization", owner: "Manufacturing", due: "2026Q3", reduction: "5%", cost: "Low", progress: 65, status: "In progress" },
    { name: "Air compressor replacement", owner: "Facility", due: "2026Q4", reduction: "8%", cost: "Medium", progress: 35, status: "Approved" },
    { name: "Renewable energy procurement", owner: "ESG Office", due: "2026Q4", reduction: "12%", cost: "Medium", progress: 48, status: "In progress" },
    { name: "Night oven shutdown", owner: "Manufacturing", due: "2026Q3", reduction: "3%", cost: "Low", progress: 80, status: "Verifying" }
  ],
  scenarios: [
    { key: "renewablePower", value: 35, min: 20, max: 80, impact: 0.42 },
    { key: "productionGrowth", value: 8, min: -10, max: 25, impact: -0.28 },
    { key: "compressorEfficiency", value: 12, min: 0, max: 30, impact: 0.35 }
  ],
  macc: [
    { key: "nightOven", reduction: 75, cost: 900, rank: 1 },
    { key: "smtStandby", reduction: 130, cost: 1200, rank: 2 },
    { key: "renewablePpa", reduction: 310, cost: 1800, rank: 3 },
    { key: "compressorUpgrade", reduction: 205, cost: 2600, rank: 4 }
  ],
  assurance: [
    { key: "sourceEvidence", owner: "ESG Specialist", status: "reviewing" },
    { key: "calculationWorkbook", owner: "Finance", status: "ready" },
    { key: "supplierStatements", owner: "Procurement", status: "missing" },
    { key: "boardApproval", owner: "Executive", status: "pending" }
  ],
  organization: [
    { level: 1, key: "company", carbon: 3250 },
    { level: 2, key: "factoryA", carbon: 1720 },
    { level: 3, key: "smtLine", carbon: 820 },
    { level: 4, key: "notebook", carbon: 1.45 },
    { level: 2, key: "factoryB", carbon: 1530 },
    { level: 3, key: "assemblyLine", carbon: 610 }
  ],
  travelFleet: [
    { key: "fleetDiesel", activity: "48,000 km", carbon: 38, status: "warning" },
    { key: "businessFlights", activity: "126 trips", carbon: 92, status: "critical" },
    { key: "commuteSurvey", activity: "82%", carbon: 24, status: "normal" }
  ],
  waterWaste: [
    { key: "waterWithdrawal", value: "18,500 m3", status: "normal" },
    { key: "wasteRecycle", value: "64%", status: "warning" },
    { key: "hazardousWaste", value: "12 ton", status: "critical" }
  ],
  supplierPortal: [
    { name: "GreenBoard Materials", due: "2026/06/30", completion: 45, status: "missing" },
    { name: "Precision Metals", due: "2026/07/05", completion: 62, status: "reviewing" },
    { name: "EverPack", due: "2026/07/12", completion: 100, status: "ready" },
    { name: "Formosa Logistics", due: "2026/07/01", completion: 30, status: "pending" }
  ],
  compliance: [
    { key: "CSRD", due: "2026Q4", progress: 62, status: "warning" },
    { key: "CBAM", due: "2026Q3", progress: 38, status: "critical" },
    { key: "SBTi", due: "2027Q1", progress: 54, status: "warning" },
    { key: "CDP", due: "2026Q4", progress: 78, status: "normal" }
  ],
  inbox: [
    { key: "supplierEvidence", owner: "Procurement", due: "2026/07/01", status: "critical" },
    { key: "factorReview", owner: "ESG Office", due: "2026/07/05", status: "warning" },
    { key: "carbonBudget", owner: "Finance", due: "2026/07/08", status: "warning" },
    { key: "assetRoi", owner: "Facility", due: "2026/07/12", status: "normal" }
  ],
  pcf: [
    { key: "mainboard", carbon: 0.42, alternative: "lowCarbonLaminate", delta: "-12%" },
    { key: "battery", carbon: 0.31, alternative: "recycledAluminum", delta: "-8%" },
    { key: "packaging", carbon: 0.09, alternative: "fiberPackaging", delta: "-18%" },
    { key: "assembly", carbon: 0.63, alternative: "renewablePower", delta: "-15%" }
  ],
  factors: [
    { key: "taiwanGrid2026", source: "MOENV", version: "v1.2", expires: "2026/12/31", status: "normal" },
    { key: "naturalGas2025", source: "GHG Protocol", version: "v3.1", expires: "2026/08/31", status: "warning" },
    { key: "diesel2024", source: "IPCC", version: "v2.9", expires: "2026/06/30", status: "critical" }
  ],
  carbonBudgets: [
    { key: "manufacturing", budget: 1450, actual: 1510 },
    { key: "facility", budget: 980, actual: 910 },
    { key: "procurement", budget: 620, actual: 710 },
    { key: "logistics", budget: 280, actual: 246 }
  ],
  climateRisks: [
    { key: "flood", type: "physical", impact: "high", exposure: "Factory A" },
    { key: "waterStress", type: "physical", impact: "medium", exposure: "Factory B" },
    { key: "carbonTax", type: "transition", impact: "high", exposure: "Notebook" },
    { key: "customerDisclosure", type: "transition", impact: "medium", exposure: "Scope 3 suppliers" }
  ],
  utilities: [
    { key: "electricityBill", amount: 4280000, anomaly: "+14%", saving: 320000 },
    { key: "demandCharge", amount: 860000, anomaly: "+22%", saving: 180000 },
    { key: "gasBill", amount: 730000, anomaly: "+9%", saving: 64000 }
  ],
  assets: [
    { key: "compressorA", age: 9, efficiency: 62, roi: "2.8y", status: "critical" },
    { key: "smtOven", age: 6, efficiency: 74, roi: "3.4y", status: "warning" },
    { key: "solarInverter", age: 3, efficiency: 91, roi: "healthy", status: "normal" }
  ],
  uncertainty: [
    { key: "notebookPcf", value: "1.45 ± 0.12 kgCO2e", confidence: "medium" },
    { key: "scope3Materials", value: "650 ± 86 tonCO2e", confidence: "low" },
    { key: "scope2Electricity", value: "1,740 ± 24 tonCO2e", confidence: "high" }
  ],
  benchmarks: [
    { key: "notebookIntensity", current: "1.45", peer: "1.22", rank: "P75" },
    { key: "renewableRatio", current: "20%", peer: "34%", rank: "Below median" },
    { key: "wasteRecycle", current: "64%", peer: "72%", rank: "P60" }
  ],
  onboarding: [
    { key: "companyProfile", progress: 100 },
    { key: "industrySetup", progress: 100 },
    { key: "dataSourcesSetup", progress: 72 },
    { key: "frameworkSelection", progress: 80 },
    { key: "supplierScope", progress: 45 }
  ],
  roleHome: [
    { key: "executive", focus: "riskAndValue", metric: "5 alerts" },
    { key: "esg", focus: "assuranceReady", metric: "82%" },
    { key: "facility", focus: "energyActions", metric: "4 tasks" },
    { key: "procurement", focus: "supplierFollowup", metric: "3 overdue" }
  ],
  connectors: [
    { key: "ERP", status: "connected" },
    { key: "MES", status: "connected" },
    { key: "EMS", status: "connected" },
    { key: "PowerBI", status: "connected" },
    { key: "Excel", status: "reviewing" },
    { key: "UtilityBills", status: "pending" },
    { key: "LINE", status: "connected" },
    { key: "Email", status: "pending" }
  ],
  importSteps: ["selectSource", "uploadFile", "mapFields", "validateErrors", "finishImport"],
  notifications: [
    { key: "supplierLate", level: "critical" },
    { key: "factorExpiring", level: "warning" },
    { key: "carbonOverTarget", level: "critical" },
    { key: "evidenceMissing", level: "warning" },
    { key: "reportReady", level: "normal" }
  ],
  aiTrust: [
    { key: "confidence", value: "78%" },
    { key: "sourcesUsed", value: "6" },
    { key: "missingData", value: "2" },
    { key: "nextBestAction", value: "supplierEvidence" }
  ],
  mobileTasks: [
    { key: "meterReading", value: "250,000 kWh", status: "ready" },
    { key: "photoEvidence", value: "3 files", status: "reviewing" },
    { key: "actionConfirm", value: "SMT standby", status: "pending" }
  ],
  exports: ["PDF", "Word", "Excel", "PowerBI", "XBRL", "BoardDeck"],
  demoTour: ["dashboardTour", "scenarioTour", "supplierTour", "reportTour", "valueTour"],
  adminSettings: [
    { key: "usersRoles", value: "18 users" },
    { key: "approvalFlow", value: "3 steps" },
    { key: "retentionPolicy", value: "7 years" },
    { key: "auditLogs", value: "1,284 events" }
  ],
  academy: ["ISO14064", "CBAM", "CSRD", "SBTi", "GHGProtocol", "Scope3"],
  valueMetrics: [
    { key: "reportHoursSaved", value: "120h" },
    { key: "carbonFeeAvoided", value: "NTD 225,000" },
    { key: "energySaving", value: "NTD 564,000" },
    { key: "supplierResponse", value: "78%" }
  ],
  expertReviews: [
    { key: "carbonModel", reviewer: "Carbon Accountant", due: "2026/07/10", status: "reviewing" },
    { key: "supplierPack", reviewer: "Supply Chain Advisor", due: "2026/07/12", status: "pending" },
    { key: "disclosureDraft", reviewer: "Policy Expert", due: "2026/07/15", status: "ready" }
  ],
  regulations: [
    { key: "CSRD", region: "EU", effective: "2026", action: "doubleMateriality", status: "warning" },
    { key: "CBAM", region: "EU", effective: "2026Q3", action: "supplierEmbeddedCarbon", status: "critical" },
    { key: "SECClimate", region: "US", effective: "TBD", action: "monitorRule", status: "warning" },
    { key: "TaiwanCarbonFee", region: "TW", effective: "2026", action: "carbonFeeBudget", status: "normal" }
  ],
  evidenceLibrary: [
    { key: "utilityBill", version: "v3", owner: "Facility", status: "ready", expires: "2026/12/31" },
    { key: "supplierDeclaration", version: "v1", owner: "Procurement", status: "missing", expires: "2026/07/01" },
    { key: "calculationWorkbook", version: "v2", owner: "ESG Office", status: "reviewing", expires: "2026/09/30" }
  ],
  reportVersions: [
    { key: "v1", editor: "Amy", change: "baselineDraft", status: "archived" },
    { key: "v2", editor: "Ben", change: "supplierEvidenceAdded", status: "reviewing" },
    { key: "submitted", editor: "CFO", change: "boardPackReady", status: "ready" }
  ],
  comments: [
    { author: "Executive", key: "clarifyCarbonFee", status: "pending" },
    { author: "Facility", key: "attachMeterPhoto", status: "ready" },
    { author: "Procurement", key: "supplierDelayNote", status: "reviewing" }
  ],
  apis: [
    { key: "emissionsApi", endpoint: "/api/emissions", schedule: "hourly", status: "normal" },
    { key: "supplierApi", endpoint: "/api/suppliers", schedule: "daily", status: "warning" },
    { key: "reportApi", endpoint: "/api/reports", schedule: "manual", status: "normal" }
  ],
  pipelines: [
    { key: "erpSync", uptime: "99.9%", status: "normal" },
    { key: "emsSync", uptime: "98.2%", status: "warning" },
    { key: "ragIndex", uptime: "100%", status: "normal" },
    { key: "aiService", uptime: "99.4%", status: "normal" }
  ],
  tenants: [
    { name: "Taiwan Smart Manufacturing", plan: "Enterprise", isolation: "Dedicated schema", status: "normal" },
    { name: "Green Food Co.", plan: "Professional", isolation: "Shared cluster", status: "normal" },
    { name: "Metal Works Ltd.", plan: "Starter", isolation: "Shared cluster", status: "warning" }
  ],
  packages: [
    { key: "Starter", suppliers: 20, ai: 100, frameworks: 2 },
    { key: "Professional", suppliers: 100, ai: 1000, frameworks: 6 },
    { key: "Enterprise", suppliers: 500, ai: 10000, frameworks: 12 }
  ],
  quickScan: [
    { key: "industry", value: "Electronics" },
    { key: "electricity", value: "250,000 kWh" },
    { key: "gas", value: "5,000 m3" },
    { key: "estimatedCarbon", value: "3,250 tonCO2e" },
    { key: "estimatedValue", value: "NTD 1.2M" }
  ],
  industryTemplates: [
    { key: "electronics", kpi: "PCF, SMT energy, Scope 3 materials" },
    { key: "food", kpi: "Cold chain, steam, packaging waste" },
    { key: "plastics", kpi: "Resin, electricity, scrap rate" },
    { key: "metal", kpi: "Heat treatment, gas, recycled content" }
  ],
  trustCenter: [
    { key: "SOC2", status: "planned" },
    { key: "ISO27001", status: "ready" },
    { key: "encryption", status: "ready" },
    { key: "backup", status: "ready" },
    { key: "auditRetention", status: "reviewing" }
  ]
};

const dictionaries = {
  zh: {
    locale: "zh-TW",
    htmlLang: "zh-Hant",
    heroTitle: "智慧碳排與能耗風險預警暨 AI 決策平台",
    exportReport: "產生稽核報告",
    refreshTitle: "重新計算預警",
    moduleNav: "系統模組",
    dataHubTitle: "資料治理與匯入狀態",
    dataHubBadge: "5 個來源",
    auditTrailTitle: "稽核軌跡",
    needsReviewBadge: "2 筆待確認",
    roleTitle: "角色與權限",
    roleBadge: "3 種角色",
    dataQualityTitle: "資料品質檢查",
    qualityBadge: "需補件",
    calculationTitle: "排放係數與計算模型",
    lineageTitle: "計算透明度",
    traceableBadge: "可追溯",
    frameworkTitle: "報告框架映射",
    frameworkBadge: "6 個框架",
    sourceTitle: "AI 回答引用來源",
    sourcedBadge: "附來源",
    supplyChainTitle: "Scope 3 供應鏈風險",
    supplierRiskBadge: "2 家高風險",
    actionPlanTitle: "減碳專案追蹤",
    projectBadge: "4 個專案",
    workflowTitle: "異常處理 Workflow",
    workflowBadge: "處理中",
    esgMetricsTitle: "延伸 ESG 指標",
    metricsBadge: "E / S / G",
    scenarioTitle: "情境模擬 / What-if Analysis",
    scenarioBadge: "即時計算",
    maccTitle: "邊際減碳成本 MACC",
    maccBadge: "成本排序",
    disclosureTitle: "ESG 報告編輯器",
    draftBadge: "AI 草稿",
    dataTagTitle: "資料標籤與血緣",
    tagBadge: "可重用資料",
    assuranceTitle: "第三方確信準備",
    assuranceBadge: "查核中",
    organizationTitle: "組織層級 Roll-up",
    rollupBadge: "公司 / 廠區 / 產線 / 產品",
    travelTitle: "交通 / 商旅 / 車隊排放",
    fleetBadge: "營運排放",
    waterWasteTitle: "水質 / 廢棄物細節",
    waterWasteBadge: "需監控",
    supplierPortalTitle: "供應商資料收集 Portal",
    supplierPortalBadge: "3 件逾期",
    copilotTitle: "自然語言資料查詢",
    copilotBadge: "常見問題",
    complianceTitle: "法規任務中心",
    complianceBadge: "3 項進行中",
    inboxTitle: "任務收件匣",
    inboxBadge: "5 件待處理",
    pcfTitle: "產品碳足跡 PCF Designer",
    pcfBadge: "BOM 階層",
    factorTitle: "排放係數版本管理",
    factorBadge: "1 筆即將過期",
    carbonPriceTitle: "內部碳價與碳預算",
    carbonPriceBadge: "NTD 1,500 / tonCO2e",
    climateRiskTitle: "氣候風險洞察",
    climateRiskBadge: "實體 / 轉型風險",
    utilityTitle: "公用事業帳單分析",
    utilityBadge: "費用異常",
    assetTitle: "資產生命週期管理",
    assetBadge: "設備汰換 ROI",
    uncertaintyTitle: "不確定性與信賴區間",
    uncertaintyBadge: "估算風險",
    benchmarkTitle: "同業 Benchmark",
    benchmarkBadge: "Peer Comparison",
    onboardingTitle: "首次導入精靈",
    onboardingBadge: "5 步完成",
    roleHomeTitle: "角色化首頁",
    roleHomeBadge: "4 種角色",
    connectorTitle: "整合市場 / Connector Hub",
    connectorBadge: "8 個連接器",
    importWizardTitle: "資料匯入 Wizard",
    importWizardBadge: "欄位驗證",
    notificationTitle: "通知中心",
    notificationBadge: "5 則重要通知",
    aiTrustTitle: "AI 可信度面板",
    aiTrustBadge: "缺漏提示",
    mobileFieldTitle: "行動版現場填報",
    mobileFieldBadge: "現場任務",
    exportCenterTitle: "報告輸出中心",
    exportCenterBadge: "6 種格式",
    demoTourTitle: "網站式產品導覽",
    demoTourBadge: "Demo Mode",
    adminTitle: "安全、權限、稽核設定",
    adminBadge: "內控設定",
    academyTitle: "學習中心 / Regulation Academy",
    academyBadge: "知識庫",
    valueTitle: "ROI / 商業價值頁",
    valueBadge: "導入效益",
    expertReviewTitle: "專家協作入口",
    expertReviewBadge: "顧問審閱",
    regTrackerTitle: "法規追蹤器",
    regTrackerBadge: "更新監控",
    evidenceTitle: "佐證資料庫",
    evidenceBadge: "文件治理",
    versionTitle: "報告版本控制",
    versionBadge: "版本差異",
    commentTitle: "協作留言",
    commentBadge: "待回覆",
    apiTitle: "Data Contract / API 管理",
    apiBadge: "同步契約",
    pipelineTitle: "資料管線健康狀態",
    pipelineBadge: "服務監控",
    tenantTitle: "Multi-entity / Multi-tenant 管理",
    tenantBadge: "資料隔離",
    pricingTitle: "Pricing / Package",
    pricingBadge: "產品方案",
    quickScanTitle: "快速碳排估算",
    quickScanBadge: "Quick Estimate",
    templateTitle: "產業模板",
    templateBadge: "預設 KPI",
    trustTitle: "Trust Center / Security",
    trustBadge: "企業信任",
    totalCarbon: "總碳排",
    totalCarbonHint: "較目標 +8%，需要處理",
    scope1Hint: "天然氣、柴油、LPG",
    scope2Hint: "台電用電",
    scope3Hint: "原料、運輸、包裝、廢棄物",
    productCarbonTitle: "產品碳排強度",
    twoOverTarget: "2 項超標",
    carbonTrendTitle: "碳排趨勢",
    risingTrend: "連續上升",
    trendChartLabel: "碳排趨勢圖",
    energyTitle: "能源管理",
    realtimeMonitor: "即時監控",
    alertTitle: "異常預警",
    recommendationTitle: "AI 減碳建議",
    estimatedReduction: "預估 -22%",
    ragTitle: "RAG ESG 知識庫",
    ragPlaceholder: "搜尋 ISO、SOP、稽核案例",
    managerQa: "主管問答",
    questionInput: "輸入問題",
    send: "送出",
    normal: "正常",
    overTarget: "超標",
    dataFreshness: "更新時間",
    completeness: "完整率",
    issueCount: "異常筆數",
    owner: "負責單位",
    due: "期限",
    reduction: "減碳",
    cost: "成本",
    progress: "進度",
    status: "狀態",
    risk: "風險",
    action: "處置",
    alertCount: (count) => `${count} 則`,
    productAlertTitle: (name) => `${name} 碳排超標`,
    productAlertText: (over) => `Carbon > Target，超標 ${over}%。`,
    electricityAlertTitle: "用電較去年同期增加",
    electricityAlertText: (change) => `Electricity 增加 ${change}%，觸發 Warning。`,
    trendAlertTitle: "碳排趨勢連續三個月上升",
    trendAlertText: "Carbon Trend 觸發 Critical。",
    months: ["3月", "4月", "5月", "6月"],
    energyNames: {
      electricity: "Electricity",
      naturalGas: "Natural Gas",
      steam: "Steam",
      renewableEnergy: "Renewable Energy"
    },
    optimization: {
      yesterday: "昨天",
      risks: { critical: "高風險", warning: "中風險", normal: "正常" },
      costs: { Low: "低", Medium: "中" },
      statuses: { "In progress": "處理中", Approved: "已核准", Verifying: "驗證中" },
      suppliers: {
        "Raw materials": "原料",
        Transport: "運輸",
        Packaging: "包裝",
        Components: "零組件",
        "Request primary activity data": "要求供應商提供一手活動數據",
        "Switch route and fuel mix": "調整路線與燃料組合",
        "Maintain quarterly evidence": "維持季度佐證資料",
        "Start supplier reduction plan": "啟動供應商減碳計畫"
      },
      projects: {
        "SMT standby optimization": "SMT 待機節能",
        "Air compressor replacement": "空壓機汰換",
        "Renewable energy procurement": "綠電採購",
        "Night oven shutdown": "夜間關閉烤箱",
        Manufacturing: "製造部",
        Facility: "廠務部",
        "ESG Office": "ESG 辦公室"
      },
      auditTrail: [
        ["EMS 用電係數更新", "ESG 專員 Amy 已套用 2026 台電排放係數 v1.2。"],
        ["Notebook 碳排重算", "系統依 MES 產量與 EMS 用電完成重新計算。"],
        ["Excel 佐證缺漏", "採購原料批次缺少供應商排放聲明，待補件。"]
      ],
      roles: [
        ["主管", "查看 KPI、核准報告、追蹤改善進度。"],
        ["ESG 專員", "維護係數、確認資料品質、產出稽核報告。"],
        ["廠務 / 製造", "處理異常、回填改善措施與佐證。"]
      ],
      qualityChecks: [
        ["資料完整率", "Excel 與 PDF 文件仍需補齊供應商聲明。"],
        ["單位一致性", "能源單位已統一為 kWh / m3 / ton。"],
        ["異常偵測", "MES 產量與 EMS 用電存在 5 筆高耗能異常。"]
      ],
      calculationModels: [
        ["Scope 1", "天然氣 m3 x 排放係數 2.05 kgCO2e/m3。"],
        ["Scope 2", "台電用電 kWh x 2026 區域電力係數。"],
        ["Product Carbon", "產品碳排 = 製程能源 / 產量 + BOM 原料係數。"]
      ],
      lineage: ["ERP 訂單與 BOM", "MES 產量與工時", "EMS 能源資料", "排放係數版本", "產品碳排結果"],
      frameworks: ["ISO14064", "ISO14067", "GHG Protocol", "TCFD", "ISSB", "SBTi"],
      sources: [
        ["資料表", "EMS.energy_usage 2026/06/23 08:31"],
        ["文件", "減碳SOP 第 4.2 節：空壓系統優化"],
        ["標準", "ISO14064-1：組織層級盤查與報告"]
      ],
      workflows: [
        ["偵測", "Notebook 觸發 RED ALERT。"],
        ["指派", "系統指派製造部與廠務部處理。"],
        ["改善", "SMT 待機節能與空壓系統優化執行中。"],
        ["驗證", "ESG 專員待確認 2026Q4 減碳成效。"]
      ],
      esgMetrics: [
        ["Environmental", "水資源、廢棄物、再生能源比例、產品碳足跡。"],
        ["Social", "供應商合規、職安事件、教育訓練時數。"],
        ["Governance", "稽核缺失、政策簽核、資料權限與內控紀錄。"]
      ],
      scenarioLabels: {
        renewablePower: "綠電比例",
        productionGrowth: "產量變化",
        compressorEfficiency: "空壓機效率改善",
        result: "預估年度減碳",
        ton: "tonCO2e"
      },
      maccLabels: {
        nightOven: "夜間關閉烤箱",
        smtStandby: "SMT 待機節能",
        renewablePpa: "綠電 PPA",
        compressorUpgrade: "空壓機升級",
        costPerTon: "NTD / tonCO2e",
        annualReduction: "年度減碳"
      },
      assuranceLabels: {
        sourceEvidence: "來源佐證文件",
        calculationWorkbook: "計算工作底稿",
        supplierStatements: "供應商排放聲明",
        boardApproval: "董事會 / 主管核准",
        ESGSpecialist: "ESG 專員",
        Finance: "財務部",
        Procurement: "採購部",
        Executive: "主管",
        reviewing: "審查中",
        ready: "已就緒",
        missing: "缺漏",
        pending: "待核准"
      },
      organizationLabels: {
        company: "台灣智慧製造公司",
        factoryA: "A 廠",
        smtLine: "SMT 產線",
        notebook: "Notebook 產品",
        factoryB: "B 廠",
        assemblyLine: "組裝產線"
      },
      operationsLabels: {
        fleetDiesel: "柴油車隊",
        businessFlights: "商務航班",
        commuteSurvey: "員工通勤調查",
        waterWithdrawal: "取水量",
        wasteRecycle: "廢棄物回收率",
        hazardousWaste: "有害廢棄物"
      },
      disclosureSections: [
        ["治理", "AI 草稿已建立，待主管審閱。", "引用：ESG 政策、稽核軌跡"],
        ["策略", "說明供應鏈碳風險與減碳路線。", "引用：Action Plan、Scenario"],
        ["風險管理", "列出 Notebook 超標與 Scope 3 高風險供應商。", "引用：Supply Chain"],
        ["指標與目標", "整理 Scope 1/2/3、能源、水、廢棄物指標。", "引用：Dashboard、ESG Metrics"]
      ],
      dataTags: ["Scope2", "Notebook", "Factory A", "2026Q2", "auditable", "energy", "supplier", "forecast"],
      supplierPortalStatuses: {
        reviewing: "審查中",
        ready: "已完成",
        missing: "逾期缺件",
        pending: "待填報"
      },
      copilotPrompts: [
        "哪個廠區本月用電最高？",
        "Scope 3 熱點在哪？",
        "哪個減碳專案 ROI 最好？",
        "哪些佐證文件還沒準備好？",
        "如果綠電提高到 50%，年度碳排會降多少？",
        "哪些供應商需要優先催繳？"
      ],
      complianceLabels: {
        CSRD: "CSRD 永續揭露",
        CBAM: "CBAM 碳邊境調整",
        SBTi: "SBTi 目標設定",
        CDP: "CDP 問卷揭露",
        supplierEvidence: "供應商佐證催繳",
        factorReview: "排放係數年度審查",
        carbonBudget: "部門碳預算確認",
        assetRoi: "設備汰換 ROI 評估"
      },
      pcfLabels: {
        mainboard: "主機板",
        battery: "電池模組",
        packaging: "包裝材料",
        assembly: "組裝製程",
        lowCarbonLaminate: "低碳基板",
        recycledAluminum: "再生鋁材",
        fiberPackaging: "纖維包材",
        renewablePower: "綠電製程",
        alternative: "替代方案",
        change: "變化"
      },
      factorLabels: {
        taiwanGrid2026: "台灣電力係數 2026",
        naturalGas2025: "天然氣係數 2025",
        diesel2024: "柴油係數 2024",
        version: "版本",
        expires: "到期日"
      },
      carbonPriceLabels: {
        manufacturing: "製造部",
        facility: "廠務部",
        procurement: "採購部",
        logistics: "物流部",
        budget: "碳預算",
        actual: "實際排放",
        fee: "超標碳費"
      },
      climateRiskLabels: {
        flood: "淹水風險",
        waterStress: "缺水風險",
        carbonTax: "碳費上升",
        customerDisclosure: "客戶揭露要求",
        physical: "實體風險",
        transition: "轉型風險",
        high: "高",
        medium: "中"
      },
      utilityLabels: {
        electricityBill: "電費帳單",
        demandCharge: "契約容量 / 需量費",
        gasBill: "天然氣帳單",
        amount: "金額",
        anomaly: "異常",
        saving: "節費潛力"
      },
      assetLabels: {
        compressorA: "A 空壓機",
        smtOven: "SMT 烤箱",
        solarInverter: "太陽能逆變器",
        age: "年齡",
        efficiency: "效率",
        roi: "回收期",
        healthy: "健康"
      },
      uncertaintyLabels: {
        notebookPcf: "Notebook 產品碳足跡",
        scope3Materials: "Scope 3 原料排放",
        scope2Electricity: "Scope 2 用電排放",
        high: "高可信",
        medium: "估算",
        low: "低可信"
      },
      benchmarkLabels: {
        notebookIntensity: "Notebook 碳強度",
        renewableRatio: "綠電比例",
        wasteRecycle: "廢棄物回收率",
        current: "目前",
        peer: "同業",
        rank: "排名"
      },
      productUxLabels: {
        companyProfile: "公司資料",
        industrySetup: "產業與產品設定",
        dataSourcesSetup: "資料來源連接",
        frameworkSelection: "報告框架選擇",
        supplierScope: "供應商範圍設定",
        executive: "主管",
        esg: "ESG 專員",
        facility: "廠務",
        procurement: "採購",
        riskAndValue: "風險與商業價值",
        assuranceReady: "確信準備度",
        energyActions: "能源改善任務",
        supplierFollowup: "供應商催繳",
        connected: "已連接",
        reviewing: "審查中",
        pending: "待設定",
        selectSource: "選擇資料來源",
        uploadFile: "上傳檔案",
        mapFields: "欄位對應",
        validateErrors: "驗證錯誤",
        finishImport: "完成匯入",
        supplierLate: "供應商填報逾期",
        factorExpiring: "排放係數即將過期",
        carbonOverTarget: "碳排超標",
        evidenceMissing: "佐證文件缺漏",
        reportReady: "稽核報告可輸出",
        confidence: "回答信心",
        sourcesUsed: "引用來源",
        missingData: "缺漏資料",
        nextBestAction: "建議下一步",
        supplierEvidence: "催繳供應商佐證",
        meterReading: "設備讀數",
        photoEvidence: "照片佐證",
        actionConfirm: "改善措施確認",
        ready: "已完成",
        dashboardTour: "Dashboard 風險總覽",
        scenarioTour: "Scenario 減碳模擬",
        supplierTour: "Supplier Portal 催繳",
        reportTour: "Disclosure 報告產出",
        valueTour: "Value Dashboard 效益",
        usersRoles: "使用者與角色",
        approvalFlow: "簽核流程",
        retentionPolicy: "資料留存",
        auditLogs: "稽核紀錄",
        GHGProtocol: "GHG Protocol",
        Scope3: "Scope 3",
        reportHoursSaved: "節省報告工時",
        carbonFeeAvoided: "避免碳費",
        energySaving: "節能節費",
        supplierResponse: "供應商回覆率"
      },
      saasLabels: {
        carbonModel: "碳排計算模型",
        supplierPack: "供應商資料包",
        disclosureDraft: "揭露報告草稿",
        doubleMateriality: "完成雙重重大性盤點",
        supplierEmbeddedCarbon: "蒐集供應商內含碳",
        monitorRule: "追蹤法規最終版本",
        carbonFeeBudget: "建立碳費預算",
        utilityBill: "公用事業帳單",
        supplierDeclaration: "供應商排放聲明",
        calculationWorkbook: "計算工作底稿",
        baselineDraft: "建立初版基準年草稿",
        supplierEvidenceAdded: "新增供應商佐證",
        boardPackReady: "董事會版本完成",
        archived: "已封存",
        clarifyCarbonFee: "請補充碳費財務衝擊說明",
        attachMeterPhoto: "已補上電表照片佐證",
        supplierDelayNote: "供應商延遲原因待確認",
        emissionsApi: "排放資料 API",
        supplierApi: "供應商 API",
        reportApi: "報告 API",
        erpSync: "ERP 同步",
        emsSync: "EMS 同步",
        ragIndex: "RAG 索引",
        aiService: "AI 服務",
        industry: "產業",
        electricity: "用電量",
        gas: "天然氣",
        estimatedCarbon: "初估碳排",
        estimatedValue: "導入價值",
        electronics: "電子業",
        food: "食品業",
        plastics: "塑膠業",
        metal: "金屬加工",
        encryption: "資料加密",
        backup: "備份與復原",
        auditRetention: "稽核紀錄留存",
        planned: "規劃中",
        endpoint: "端點",
        schedule: "排程",
        region: "地區",
        effective: "生效日",
        reviewer: "審閱者",
        version: "版本",
        uploadedBy: "負責人",
        packageLimit: "方案限制",
        suppliers: "供應商",
        frameworks: "框架",
        aiQuota: "AI 次數"
      }
    },
    agentSteps: [
      ["Step 1 讀取資料", "ERP / MES / EMS：Notebook、50,000 pcs、250,000 kWh、天然氣 5000 m3"],
      ["Step 2 計算碳排", "Carbon 1.45 kgCO2e，Target 1.1，Over 31%"],
      ["Step 3 Root Cause", "SMT 用電 +18%、天然氣 +12%、綠電比例下降至 20%"],
      ["Step 4 RAG Search", "查詢 ISO14064、ISO14067、SOP、稽核案例"],
      ["Step 5 產生建議", "彙整可執行改善措施與預估減碳效果"]
    ],
    recommendations: [
      { title: "SMT 待機節能", impact: "減少 5%", detail: "排程閒置超過 15 分鐘自動降載。" },
      { title: "更換空壓機", impact: "減少 8%", detail: "優先處理高耗能且低效率設備。" },
      { title: "提高綠電比例", impact: "減少 12%", detail: "將綠電比例由 20% 拉回目標水準。" },
      { title: "夜間關閉烤箱", impact: "減少 3%", detail: "依 MES 工單自動產生關機時段。" }
    ],
    knowledge: [
      { type: "International Standard", title: "ISO14064-1", text: "組織層級溫室氣體盤查與報告要求。" },
      { type: "International Standard", title: "ISO14067", text: "產品碳足跡量化與揭露原則。" },
      { type: "International Standard", title: "ISO50001", text: "能源管理系統與持續改善。" },
      { type: "International Standard", title: "GHG Protocol", text: "Scope 1、Scope 2、Scope 3 盤查框架。" },
      { type: "Internal Document", title: "減碳SOP", text: "設備節能、綠電導入、空壓系統優化程序。" },
      { type: "Internal Document", title: "稽核程序", text: "異常說明、原因、改善措施與責任部門確認。" },
      { type: "Industry Template", title: "電子業", text: "SMT、空壓機、烤箱與產線待機能源最佳實務。" },
      { type: "Industry Template", title: "金屬加工", text: "尖峰用電、設備工時與熱處理能耗模板。" },
      { type: "Industry Template", title: "食品業", text: "冷鏈、蒸氣、包裝與廢棄物排放模板。" }
    ],
    defaultQuestion: "Notebook 為什麼超標？",
    fallbackAnswer: "目前 v1.0 原型支援 Notebook 超標、ISO、SOP 與稽核報告查詢。",
    answer: `碳排：1.45 kgCO2e
目標：1.1 kgCO2e
超標：31%

原因：
1. SMT 耗電增加
2. 天然氣增加
3. 綠電比例下降

依據：ISO14064、ISO14067

建議：設備節能、綠電導入、空壓機優化
預估減碳：22%`,
    reportText: `ESG Audit Report

日期：2026/06/23
產品：Notebook
異常：碳排超標 31%
依據：ISO14064、ISO14067、減碳SOP

原因：
1. SMT 耗電增加 18%
2. 天然氣增加 12%
3. 綠電比例下降至 20%

改善：
1. 設備節能
2. 空壓系統優化
3. 綠電導入
4. 夜間關閉烤箱

預估：減少 22%
完成期限：2026Q4
責任部門：製造部、廠務部、ESG 辦公室`
  },
  en: {
    locale: "en-US",
    htmlLang: "en",
    heroTitle: "AI Carbon and Energy Risk Warning Decision Platform",
    exportReport: "Generate Audit Report",
    refreshTitle: "Recalculate alerts",
    moduleNav: "System modules",
    dataHubTitle: "Data Governance and Ingestion Status",
    dataHubBadge: "5 sources",
    auditTrailTitle: "Audit Trail",
    needsReviewBadge: "2 pending review",
    roleTitle: "Roles and Permissions",
    roleBadge: "3 roles",
    dataQualityTitle: "Data Quality Checks",
    qualityBadge: "Evidence needed",
    calculationTitle: "Emission Factors and Calculation Model",
    lineageTitle: "Calculation Transparency",
    traceableBadge: "Traceable",
    frameworkTitle: "Reporting Framework Mapping",
    frameworkBadge: "6 frameworks",
    sourceTitle: "AI Answer Sources",
    sourcedBadge: "Sourced",
    supplyChainTitle: "Scope 3 Supply Chain Risk",
    supplierRiskBadge: "2 high-risk suppliers",
    actionPlanTitle: "Reduction Project Tracking",
    projectBadge: "4 projects",
    workflowTitle: "Exception Workflow",
    workflowBadge: "In progress",
    esgMetricsTitle: "Extended ESG Metrics",
    metricsBadge: "E / S / G",
    scenarioTitle: "Scenario Simulator / What-if Analysis",
    scenarioBadge: "Live estimate",
    maccTitle: "Marginal Abatement Cost Curve",
    maccBadge: "Cost ranking",
    disclosureTitle: "ESG Disclosure Builder",
    draftBadge: "AI draft",
    dataTagTitle: "Data Tags and Lineage",
    tagBadge: "Reusable data",
    assuranceTitle: "Third-party Assurance Readiness",
    assuranceBadge: "Under review",
    organizationTitle: "Organization Roll-up",
    rollupBadge: "Company / Site / Line / Product",
    travelTitle: "Travel / Business Trip / Fleet Emissions",
    fleetBadge: "Operational emissions",
    waterWasteTitle: "Water Quality / Waste Details",
    waterWasteBadge: "Needs monitoring",
    supplierPortalTitle: "Supplier Data Collection Portal",
    supplierPortalBadge: "3 overdue",
    copilotTitle: "Natural Language Data Query",
    copilotBadge: "Prompt library",
    complianceTitle: "Compliance Task Center",
    complianceBadge: "3 in progress",
    inboxTitle: "Task Inbox",
    inboxBadge: "5 pending",
    pcfTitle: "Product Carbon Footprint Designer",
    pcfBadge: "BOM hierarchy",
    factorTitle: "Emission Factor Version Control",
    factorBadge: "1 expiring soon",
    carbonPriceTitle: "Internal Carbon Price and Budget",
    carbonPriceBadge: "NTD 1,500 / tonCO2e",
    climateRiskTitle: "Climate Risk Insights",
    climateRiskBadge: "Physical / transition risks",
    utilityTitle: "Utility Bill Analytics",
    utilityBadge: "Cost anomalies",
    assetTitle: "Asset Lifecycle Management",
    assetBadge: "Replacement ROI",
    uncertaintyTitle: "Uncertainty and Confidence Interval",
    uncertaintyBadge: "Estimation risk",
    benchmarkTitle: "Peer Benchmark",
    benchmarkBadge: "Peer Comparison",
    onboardingTitle: "Onboarding Wizard",
    onboardingBadge: "5-step setup",
    roleHomeTitle: "Role-based Home",
    roleHomeBadge: "4 roles",
    connectorTitle: "Connector Hub",
    connectorBadge: "8 connectors",
    importWizardTitle: "Data Import Wizard",
    importWizardBadge: "Field validation",
    notificationTitle: "Notification Center",
    notificationBadge: "5 important alerts",
    aiTrustTitle: "AI Trust Panel",
    aiTrustBadge: "Missing data hints",
    mobileFieldTitle: "Mobile Field Reporting",
    mobileFieldBadge: "Field tasks",
    exportCenterTitle: "Report Export Center",
    exportCenterBadge: "6 formats",
    demoTourTitle: "Product Demo Tour",
    demoTourBadge: "Demo Mode",
    adminTitle: "Security, Permission, and Audit Settings",
    adminBadge: "Control settings",
    academyTitle: "Regulation Academy",
    academyBadge: "Learning hub",
    valueTitle: "ROI / Business Value Dashboard",
    valueBadge: "Business impact",
    expertReviewTitle: "Expert Review Portal",
    expertReviewBadge: "Advisor review",
    regTrackerTitle: "Regulation Tracker",
    regTrackerBadge: "Update monitoring",
    evidenceTitle: "Evidence Library",
    evidenceBadge: "Document governance",
    versionTitle: "Report Version Control",
    versionBadge: "Version diff",
    commentTitle: "Collaboration Comments",
    commentBadge: "Needs reply",
    apiTitle: "Data Contract / API Management",
    apiBadge: "Sync contract",
    pipelineTitle: "Data Pipeline Health",
    pipelineBadge: "Service monitoring",
    tenantTitle: "Multi-entity / Multi-tenant Management",
    tenantBadge: "Data isolation",
    pricingTitle: "Pricing / Package",
    pricingBadge: "Product plans",
    quickScanTitle: "Quick Carbon Estimate",
    quickScanBadge: "Quick Estimate",
    templateTitle: "Industry Templates",
    templateBadge: "Default KPI",
    trustTitle: "Trust Center / Security",
    trustBadge: "Enterprise trust",
    totalCarbon: "Total Carbon",
    totalCarbonHint: "+8% above target, action required",
    scope1Hint: "Natural gas, diesel, LPG",
    scope2Hint: "Grid electricity",
    scope3Hint: "Materials, logistics, packaging, waste",
    productCarbonTitle: "Product Carbon Intensity",
    twoOverTarget: "2 over target",
    carbonTrendTitle: "Carbon Trend",
    risingTrend: "Rising trend",
    trendChartLabel: "Carbon trend chart",
    energyTitle: "Energy Management",
    realtimeMonitor: "Live monitoring",
    alertTitle: "Risk Alerts",
    recommendationTitle: "AI Reduction Suggestions",
    estimatedReduction: "Estimated -22%",
    ragTitle: "RAG ESG Knowledge Base",
    ragPlaceholder: "Search ISO, SOP, audit cases",
    managerQa: "Manager Q&A",
    questionInput: "Enter a question",
    send: "Send",
    normal: "Normal",
    overTarget: "Over",
    dataFreshness: "Updated",
    completeness: "Completeness",
    issueCount: "Issues",
    owner: "Owner",
    due: "Due",
    reduction: "Reduction",
    cost: "Cost",
    progress: "Progress",
    status: "Status",
    risk: "Risk",
    action: "Action",
    alertCount: (count) => `${count} alerts`,
    productAlertTitle: (name) => `${name} carbon is over target`,
    productAlertText: (over) => `Carbon > Target, ${over}% over.`,
    electricityAlertTitle: "Electricity increased YoY",
    electricityAlertText: (change) => `Electricity increased ${change}%, triggering Warning.`,
    trendAlertTitle: "Carbon trend rose for three consecutive months",
    trendAlertText: "Carbon Trend triggered Critical.",
    months: ["Mar", "Apr", "May", "Jun"],
    energyNames: {
      electricity: "Electricity",
      naturalGas: "Natural Gas",
      steam: "Steam",
      renewableEnergy: "Renewable Energy"
    },
    optimization: {
      yesterday: "Yesterday",
      risks: { critical: "High risk", warning: "Medium risk", normal: "Normal" },
      costs: { Low: "Low", Medium: "Medium" },
      statuses: { "In progress": "In progress", Approved: "Approved", Verifying: "Verifying" },
      suppliers: {
        "Raw materials": "Raw materials",
        Transport: "Transport",
        Packaging: "Packaging",
        Components: "Components",
        "Request primary activity data": "Request primary activity data",
        "Switch route and fuel mix": "Switch route and fuel mix",
        "Maintain quarterly evidence": "Maintain quarterly evidence",
        "Start supplier reduction plan": "Start supplier reduction plan"
      },
      projects: {
        "SMT standby optimization": "SMT standby optimization",
        "Air compressor replacement": "Air compressor replacement",
        "Renewable energy procurement": "Renewable energy procurement",
        "Night oven shutdown": "Night oven shutdown",
        Manufacturing: "Manufacturing",
        Facility: "Facility",
        "ESG Office": "ESG Office"
      },
      auditTrail: [
        ["EMS emission factor updated", "ESG specialist Amy applied the 2026 grid emission factor v1.2."],
        ["Notebook carbon recalculated", "The system recalculated using MES production and EMS electricity data."],
        ["Excel evidence gap", "Supplier emission statements are missing for purchase material batches."]
      ],
      roles: [
        ["Executive", "View KPI, approve reports, and track improvement progress."],
        ["ESG Specialist", "Maintain factors, validate data quality, and generate audit reports."],
        ["Facility / Manufacturing", "Handle exceptions, update actions, and attach evidence."]
      ],
      qualityChecks: [
        ["Data completeness", "Excel and PDF evidence still need supplier statements."],
        ["Unit consistency", "Energy units are normalized to kWh / m3 / ton."],
        ["Anomaly detection", "MES output and EMS electricity show 5 high-consumption exceptions."]
      ],
      calculationModels: [
        ["Scope 1", "Natural gas m3 x emission factor 2.05 kgCO2e/m3."],
        ["Scope 2", "Grid electricity kWh x 2026 regional electricity factor."],
        ["Product Carbon", "Product carbon = process energy / output + BOM material factors."]
      ],
      lineage: ["ERP orders and BOM", "MES output and equipment hours", "EMS energy data", "Emission factor version", "Product carbon result"],
      frameworks: ["ISO14064", "ISO14067", "GHG Protocol", "TCFD", "ISSB", "SBTi"],
      sources: [
        ["Data table", "EMS.energy_usage 2026/06/23 08:31"],
        ["Document", "Carbon Reduction SOP section 4.2: air system optimization"],
        ["Standard", "ISO14064-1: organization-level inventory and reporting"]
      ],
      workflows: [
        ["Detect", "Notebook triggered RED ALERT."],
        ["Assign", "The system assigned Manufacturing and Facility teams."],
        ["Improve", "SMT standby saving and air system optimization are in progress."],
        ["Verify", "ESG specialist will confirm 2026Q4 reduction impact."]
      ],
      esgMetrics: [
        ["Environmental", "Water, waste, renewable energy ratio, and product carbon footprint."],
        ["Social", "Supplier compliance, safety incidents, and training hours."],
        ["Governance", "Audit findings, policy approvals, data permissions, and internal controls."]
      ],
      scenarioLabels: {
        renewablePower: "Renewable power ratio",
        productionGrowth: "Production change",
        compressorEfficiency: "Compressor efficiency gain",
        result: "Estimated annual reduction",
        ton: "tonCO2e"
      },
      maccLabels: {
        nightOven: "Night oven shutdown",
        smtStandby: "SMT standby saving",
        renewablePpa: "Renewable PPA",
        compressorUpgrade: "Compressor upgrade",
        costPerTon: "NTD / tonCO2e",
        annualReduction: "Annual reduction"
      },
      assuranceLabels: {
        sourceEvidence: "Source evidence files",
        calculationWorkbook: "Calculation workbook",
        supplierStatements: "Supplier emission statements",
        boardApproval: "Board / executive approval",
        ESGSpecialist: "ESG Specialist",
        Finance: "Finance",
        Procurement: "Procurement",
        Executive: "Executive",
        reviewing: "Reviewing",
        ready: "Ready",
        missing: "Missing",
        pending: "Pending"
      },
      organizationLabels: {
        company: "Taiwan Smart Manufacturing Co.",
        factoryA: "Factory A",
        smtLine: "SMT Line",
        notebook: "Notebook Product",
        factoryB: "Factory B",
        assemblyLine: "Assembly Line"
      },
      operationsLabels: {
        fleetDiesel: "Diesel fleet",
        businessFlights: "Business flights",
        commuteSurvey: "Employee commute survey",
        waterWithdrawal: "Water withdrawal",
        wasteRecycle: "Waste recycling rate",
        hazardousWaste: "Hazardous waste"
      },
      disclosureSections: [
        ["Governance", "AI draft created, pending executive review.", "Source: ESG policy, audit trail"],
        ["Strategy", "Explain supply chain carbon risk and reduction roadmap.", "Source: Action Plan, Scenario"],
        ["Risk Management", "List Notebook exceptions and high-risk Scope 3 suppliers.", "Source: Supply Chain"],
        ["Metrics and Targets", "Summarize Scope 1/2/3, energy, water, and waste metrics.", "Source: Dashboard, ESG Metrics"]
      ],
      dataTags: ["Scope2", "Notebook", "Factory A", "2026Q2", "auditable", "energy", "supplier", "forecast"],
      supplierPortalStatuses: {
        reviewing: "Reviewing",
        ready: "Complete",
        missing: "Overdue",
        pending: "Pending"
      },
      copilotPrompts: [
        "Which site used the most electricity this month?",
        "Where are the Scope 3 hotspots?",
        "Which reduction project has the best ROI?",
        "Which evidence files are not ready?",
        "If renewable power rises to 50%, how much annual carbon falls?",
        "Which suppliers should be reminded first?"
      ],
      complianceLabels: {
        CSRD: "CSRD sustainability disclosure",
        CBAM: "CBAM carbon border adjustment",
        SBTi: "SBTi target setting",
        CDP: "CDP questionnaire disclosure",
        supplierEvidence: "Supplier evidence follow-up",
        factorReview: "Annual emission factor review",
        carbonBudget: "Department carbon budget confirmation",
        assetRoi: "Asset replacement ROI assessment"
      },
      pcfLabels: {
        mainboard: "Mainboard",
        battery: "Battery module",
        packaging: "Packaging material",
        assembly: "Assembly process",
        lowCarbonLaminate: "Low-carbon laminate",
        recycledAluminum: "Recycled aluminum",
        fiberPackaging: "Fiber packaging",
        renewablePower: "Renewable-powered process",
        alternative: "Alternative",
        change: "Change"
      },
      factorLabels: {
        taiwanGrid2026: "Taiwan grid factor 2026",
        naturalGas2025: "Natural gas factor 2025",
        diesel2024: "Diesel factor 2024",
        version: "Version",
        expires: "Expires"
      },
      carbonPriceLabels: {
        manufacturing: "Manufacturing",
        facility: "Facility",
        procurement: "Procurement",
        logistics: "Logistics",
        budget: "Carbon budget",
        actual: "Actual emissions",
        fee: "Over-budget fee"
      },
      climateRiskLabels: {
        flood: "Flood risk",
        waterStress: "Water stress",
        carbonTax: "Carbon fee increase",
        customerDisclosure: "Customer disclosure demand",
        physical: "Physical risk",
        transition: "Transition risk",
        high: "High",
        medium: "Medium"
      },
      utilityLabels: {
        electricityBill: "Electricity bill",
        demandCharge: "Demand charge",
        gasBill: "Natural gas bill",
        amount: "Amount",
        anomaly: "Anomaly",
        saving: "Saving potential"
      },
      assetLabels: {
        compressorA: "Compressor A",
        smtOven: "SMT oven",
        solarInverter: "Solar inverter",
        age: "Age",
        efficiency: "Efficiency",
        roi: "Payback",
        healthy: "Healthy"
      },
      uncertaintyLabels: {
        notebookPcf: "Notebook product carbon footprint",
        scope3Materials: "Scope 3 material emissions",
        scope2Electricity: "Scope 2 electricity emissions",
        high: "High confidence",
        medium: "Estimated",
        low: "Low confidence"
      },
      benchmarkLabels: {
        notebookIntensity: "Notebook carbon intensity",
        renewableRatio: "Renewable power ratio",
        wasteRecycle: "Waste recycling rate",
        current: "Current",
        peer: "Peer",
        rank: "Rank"
      },
      productUxLabels: {
        companyProfile: "Company profile",
        industrySetup: "Industry and product setup",
        dataSourcesSetup: "Data source connection",
        frameworkSelection: "Reporting framework selection",
        supplierScope: "Supplier scope setup",
        executive: "Executive",
        esg: "ESG Specialist",
        facility: "Facility",
        procurement: "Procurement",
        riskAndValue: "Risk and business value",
        assuranceReady: "Assurance readiness",
        energyActions: "Energy action tasks",
        supplierFollowup: "Supplier follow-up",
        connected: "Connected",
        reviewing: "Reviewing",
        pending: "Pending setup",
        selectSource: "Select source",
        uploadFile: "Upload file",
        mapFields: "Map fields",
        validateErrors: "Validate errors",
        finishImport: "Finish import",
        supplierLate: "Supplier submission overdue",
        factorExpiring: "Emission factor expiring soon",
        carbonOverTarget: "Carbon over target",
        evidenceMissing: "Evidence missing",
        reportReady: "Audit report ready",
        confidence: "Answer confidence",
        sourcesUsed: "Sources used",
        missingData: "Missing data",
        nextBestAction: "Next best action",
        supplierEvidence: "Follow up supplier evidence",
        meterReading: "Meter reading",
        photoEvidence: "Photo evidence",
        actionConfirm: "Action confirmation",
        ready: "Ready",
        dashboardTour: "Dashboard risk overview",
        scenarioTour: "Scenario reduction simulation",
        supplierTour: "Supplier Portal follow-up",
        reportTour: "Disclosure report output",
        valueTour: "Value Dashboard impact",
        usersRoles: "Users and roles",
        approvalFlow: "Approval flow",
        retentionPolicy: "Data retention",
        auditLogs: "Audit logs",
        GHGProtocol: "GHG Protocol",
        Scope3: "Scope 3",
        reportHoursSaved: "Report hours saved",
        carbonFeeAvoided: "Carbon fee avoided",
        energySaving: "Energy cost saved",
        supplierResponse: "Supplier response rate"
      },
      saasLabels: {
        carbonModel: "Carbon calculation model",
        supplierPack: "Supplier data pack",
        disclosureDraft: "Disclosure report draft",
        doubleMateriality: "Complete double materiality assessment",
        supplierEmbeddedCarbon: "Collect supplier embedded carbon",
        monitorRule: "Monitor final regulation",
        carbonFeeBudget: "Build carbon fee budget",
        utilityBill: "Utility bill",
        supplierDeclaration: "Supplier emission statement",
        calculationWorkbook: "Calculation workbook",
        baselineDraft: "Create baseline year draft",
        supplierEvidenceAdded: "Add supplier evidence",
        boardPackReady: "Board pack ready",
        archived: "Archived",
        clarifyCarbonFee: "Add carbon fee financial impact",
        attachMeterPhoto: "Meter photo evidence attached",
        supplierDelayNote: "Supplier delay reason pending",
        emissionsApi: "Emissions API",
        supplierApi: "Supplier API",
        reportApi: "Report API",
        erpSync: "ERP sync",
        emsSync: "EMS sync",
        ragIndex: "RAG index",
        aiService: "AI service",
        industry: "Industry",
        electricity: "Electricity",
        gas: "Natural gas",
        estimatedCarbon: "Estimated carbon",
        estimatedValue: "Implementation value",
        electronics: "Electronics",
        food: "Food",
        plastics: "Plastics",
        metal: "Metal processing",
        encryption: "Data encryption",
        backup: "Backup and recovery",
        auditRetention: "Audit log retention",
        planned: "Planned",
        endpoint: "Endpoint",
        schedule: "Schedule",
        region: "Region",
        effective: "Effective",
        reviewer: "Reviewer",
        version: "Version",
        uploadedBy: "Owner",
        packageLimit: "Package limits",
        suppliers: "Suppliers",
        frameworks: "Frameworks",
        aiQuota: "AI quota"
      }
    },
    agentSteps: [
      ["Step 1 Read data", "ERP / MES / EMS: Notebook, 50,000 pcs, 250,000 kWh, natural gas 5000 m3"],
      ["Step 2 Calculate carbon", "Carbon 1.45 kgCO2e, Target 1.1, Over 31%"],
      ["Step 3 Root Cause", "SMT electricity +18%, natural gas +12%, renewable energy ratio down to 20%"],
      ["Step 4 RAG Search", "Search ISO14064, ISO14067, SOP, audit cases"],
      ["Step 5 Generate suggestions", "Summarize actionable measures and estimated reduction impact"]
    ],
    recommendations: [
      { title: "SMT standby power saving", impact: "Reduce 5%", detail: "Auto downshift when production is idle for more than 15 minutes." },
      { title: "Replace air compressor", impact: "Reduce 8%", detail: "Prioritize high-energy, low-efficiency equipment." },
      { title: "Increase renewable energy ratio", impact: "Reduce 12%", detail: "Restore renewable energy from 20% to the target level." },
      { title: "Shut down ovens at night", impact: "Reduce 3%", detail: "Generate shutdown windows from MES work orders." }
    ],
    knowledge: [
      { type: "International Standard", title: "ISO14064-1", text: "Requirements for organization-level GHG inventory and reporting." },
      { type: "International Standard", title: "ISO14067", text: "Principles for product carbon footprint quantification and disclosure." },
      { type: "International Standard", title: "ISO50001", text: "Energy management system and continuous improvement." },
      { type: "International Standard", title: "GHG Protocol", text: "Framework for Scope 1, Scope 2, and Scope 3 accounting." },
      { type: "Internal Document", title: "Carbon Reduction SOP", text: "Equipment saving, renewable energy adoption, and air system optimization." },
      { type: "Internal Document", title: "Audit Procedure", text: "Exception description, root cause, corrective actions, and owner confirmation." },
      { type: "Industry Template", title: "Electronics", text: "Best practices for SMT, compressors, ovens, and production standby energy." },
      { type: "Industry Template", title: "Metal Processing", text: "Templates for peak power, equipment hours, and heat-treatment energy." },
      { type: "Industry Template", title: "Food", text: "Templates for cold chain, steam, packaging, and waste emissions." }
    ],
    defaultQuestion: "Why is Notebook over target?",
    fallbackAnswer: "The v1.0 prototype supports Notebook alerts, ISO, SOP, and audit report queries.",
    answer: `Carbon: 1.45 kgCO2e
Target: 1.1 kgCO2e
Over target: 31%

Root causes:
1. SMT electricity increased
2. Natural gas increased
3. Renewable energy ratio declined

References: ISO14064, ISO14067

Suggestions: equipment saving, renewable energy adoption, air compressor optimization
Estimated reduction: 22%`,
    reportText: `ESG Audit Report

Date: 2026/06/23
Product: Notebook
Exception: Carbon is 31% over target
References: ISO14064, ISO14067, Carbon Reduction SOP

Root Causes:
1. SMT electricity increased 18%
2. Natural gas increased 12%
3. Renewable energy ratio dropped to 20%

Actions:
1. Equipment energy saving
2. Air system optimization
3. Renewable energy adoption
4. Shut down ovens at night

Estimate: Reduce 22%
Due Date: 2026Q4
Owners: Manufacturing, Facility, ESG Office`
  }
};

let currentLang = "zh";

function t(key) {
  return dictionaries[currentLang][key];
}

function formatNumber(value) {
  return new Intl.NumberFormat(t("locale")).format(value);
}

function applyStaticTranslations() {
  const dictionary = dictionaries[currentLang];
  document.documentElement.lang = dictionary.htmlLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    element.textContent = typeof value === "function" ? value() : value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = dictionary[element.dataset.i18nPlaceholder];
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = dictionary[element.dataset.i18nTitle];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAriaLabel]);
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
  });
}

function renderProducts() {
  const table = document.querySelector("#productTable");
  table.innerHTML = products.map((product) => {
    const over = product.carbon > product.target;
    const percent = Math.min((product.carbon / product.target) * 72, 100);
    return `<div class="product-row">
      <div>
        <strong>${product.name}</strong>
        <div class="bar"><span style="width:${percent}%"></span></div>
      </div>
      <span>${product.carbon}</span>
      <span>${product.target}</span>
      <span class="status ${over ? "critical" : "normal"}">${over ? t("overTarget") : t("normal")}</span>
    </div>`;
  }).join("");
}

function renderEnergy() {
  const list = document.querySelector("#energyList");
  list.innerHTML = energy.map((item) => {
    const risky = item.key !== "renewableEnergy" && item.change > 10;
    const renewableDrop = item.key === "renewableEnergy" && item.change < 0;
    return `<div class="energy-row">
      <strong>${t("energyNames")[item.key]}</strong>
      <span>${formatNumber(item.value)}</span>
      <span>${item.unit}</span>
      <span class="status ${risky || renewableDrop ? "warning" : "normal"}">${item.change > 0 ? "+" : ""}${item.change}%</span>
    </div>`;
  }).join("");
}

function buildAlerts() {
  const alerts = [];
  products.forEach((product) => {
    if (product.carbon > product.target) {
      const over = Math.round(((product.carbon - product.target) / product.target) * 100);
      alerts.push({ level: "critical", title: t("productAlertTitle")(product.name), text: t("productAlertText")(over) });
    }
  });

  const electricity = energy.find((item) => item.key === "electricity");
  if (electricity.change > 10) {
    alerts.push({ level: "warning", title: t("electricityAlertTitle"), text: t("electricityAlertText")(electricity.change) });
  }

  alerts.push({ level: "critical", title: t("trendAlertTitle"), text: t("trendAlertText") });
  return alerts;
}

function renderAlerts() {
  const alerts = buildAlerts();
  document.querySelector("#alertCount").textContent = t("alertCount")(alerts.length);
  document.querySelector("#alertList").innerHTML = alerts.map((alert) => `<div class="alert-item ${alert.level}">
    <strong>${alert.title}</strong>
    <p class="muted">${alert.text}</p>
  </div>`).join("");
}

function renderTrendChart() {
  const canvas = document.querySelector("#trendChart");
  const context = canvas.getContext("2d");
  const values = [2820, 2910, 3040, 3250];
  const labels = t("months");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const max = 3400;
  const min = 2600;

  context.clearRect(0, 0, width, height);
  context.strokeStyle = "#d9e1dc";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(padding, height - padding);
  context.lineTo(width - padding, height - padding);
  context.stroke();

  const points = values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1);
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    return { x, y, value, label: labels[index] };
  });

  context.strokeStyle = "#147a55";
  context.lineWidth = 4;
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.stroke();

  points.forEach((point) => {
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#bd342d";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(point.x, point.y, 7, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.fillStyle = "#66736c";
    context.font = "14px Segoe UI";
    context.fillText(point.label, point.x - 12, height - 12);
    context.fillText(point.value, point.x - 18, point.y - 14);
  });
}

function renderAgent() {
  document.querySelector("#agentFlow").innerHTML = t("agentSteps").map(([title, text]) => `<div class="agent-step">
    <strong>${title}</strong>
    <span class="muted">${text}</span>
  </div>`).join("");

  document.querySelector("#recommendations").innerHTML = t("recommendations").map((item) => `<div class="recommendation">
    <strong>${item.title}</strong>
    <span class="status normal">${item.impact}</span>
    <p class="muted">${item.detail}</p>
  </div>`).join("");
}

function renderKnowledge(filter = "") {
  const keyword = filter.trim().toLowerCase();
  const filtered = t("knowledge").filter((item) => {
    return `${item.type} ${item.title} ${item.text}`.toLowerCase().includes(keyword);
  });

  document.querySelector("#knowledgeGrid").innerHTML = filtered.map((item) => `<article class="knowledge-item">
    <span class="muted">${item.type}</span>
    <strong>${item.title}</strong>
    <p>${item.text}</p>
  </article>`).join("");
}

function translateOptimization(value, group) {
  return t("optimization")[group]?.[value] || value;
}

function renderDataHub() {
  document.querySelector("#dataSourceList").innerHTML = optimizationData.dataSources.map((source) => {
    const freshness = source.freshness === "Yesterday" ? t("optimization").yesterday : source.freshness;
    return `<div class="ops-row">
      <div>
        <strong>${source.key}</strong>
        <p class="muted">${t("dataFreshness")}: ${freshness}</p>
      </div>
      <span>${t("completeness")}: ${source.completeness}%</span>
      <span>${t("issueCount")}: ${source.issues}</span>
      <span class="status ${source.status}">${t("optimization").risks[source.status]}</span>
    </div>`;
  }).join("");

  document.querySelector("#auditTrailList").innerHTML = t("optimization").auditTrail.map(([title, text]) => `<div class="timeline-item">
    <strong>${title}</strong>
    <p class="muted">${text}</p>
  </div>`).join("");

  document.querySelector("#roleGrid").innerHTML = t("optimization").roles.map(([role, text]) => `<article class="knowledge-item">
    <strong>${role}</strong>
    <p>${text}</p>
  </article>`).join("");

  document.querySelector("#qualityList").innerHTML = t("optimization").qualityChecks.map(([title, text]) => `<div class="alert-item warning">
    <strong>${title}</strong>
    <p class="muted">${text}</p>
  </div>`).join("");
}

function renderCalculation() {
  document.querySelector("#calculationModelList").innerHTML = t("optimization").calculationModels.map(([title, text]) => `<div class="agent-step">
    <strong>${title}</strong>
    <span class="muted">${text}</span>
  </div>`).join("");

  document.querySelector("#lineageFlow").innerHTML = t("optimization").lineage.map((item, index) => `<div class="lineage-step">
    <span>${index + 1}</span>
    <strong>${item}</strong>
  </div>`).join("");

  document.querySelector("#frameworkGrid").innerHTML = t("optimization").frameworks.map((framework) => `<div class="framework-pill">${framework}</div>`).join("");

  document.querySelector("#sourceList").innerHTML = t("optimization").sources.map(([type, detail]) => `<div class="source-item">
    <strong>${type}</strong>
    <p class="muted">${detail}</p>
  </div>`).join("");
}

function renderSupplyChain() {
  document.querySelector("#supplierList").innerHTML = optimizationData.suppliers.map((supplier) => `<div class="supplier-row">
    <div>
      <strong>${supplier.name}</strong>
      <p class="muted">${translateOptimization(supplier.category, "suppliers")}</p>
    </div>
    <span>${supplier.emissions} tonCO2e</span>
    <span class="status ${supplier.risk}">${t("optimization").risks[supplier.risk]}</span>
    <span>${translateOptimization(supplier.action, "suppliers")}</span>
  </div>`).join("");
}

function renderActionPlan() {
  document.querySelector("#projectList").innerHTML = optimizationData.projects.map((project) => `<div class="project-row">
    <div>
      <strong>${translateOptimization(project.name, "projects")}</strong>
      <p class="muted">${t("owner")}: ${translateOptimization(project.owner, "projects")} · ${t("due")}: ${project.due}</p>
      <div class="bar"><span style="width:${project.progress}%"></span></div>
    </div>
    <span>${t("reduction")}: ${project.reduction}</span>
    <span>${t("cost")}: ${translateOptimization(project.cost, "costs")}</span>
    <span class="status normal">${translateOptimization(project.status, "statuses")}</span>
  </div>`).join("");

  document.querySelector("#workflowList").innerHTML = t("optimization").workflows.map(([stage, text]) => `<div class="timeline-item">
    <strong>${stage}</strong>
    <p class="muted">${text}</p>
  </div>`).join("");
}

function renderEsgMetrics() {
  document.querySelector("#metricExtensionGrid").innerHTML = t("optimization").esgMetrics.map(([title, text]) => `<article class="metric-extension">
    <strong>${title}</strong>
    <p>${text}</p>
  </article>`).join("");
}

function renderScenario() {
  const labels = t("optimization").scenarioLabels;
  const totalReduction = optimizationData.scenarios.reduce((sum, item) => {
    return sum + item.value * item.impact;
  }, 0);

  document.querySelector("#scenarioControls").innerHTML = optimizationData.scenarios.map((item) => `<label class="scenario-control">
    <span>${labels[item.key]}</span>
    <input type="range" min="${item.min}" max="${item.max}" value="${item.value}" data-scenario="${item.key}">
    <strong>${item.value}%</strong>
  </label>`).join("") + `<div class="scenario-result">
    <span>${labels.result}</span>
    <strong>${Math.round(totalReduction * 10)} ${labels.ton}</strong>
  </div>`;

  document.querySelectorAll("[data-scenario]").forEach((slider) => {
    slider.addEventListener("input", (event) => {
      const target = optimizationData.scenarios.find((item) => item.key === event.target.dataset.scenario);
      target.value = Number(event.target.value);
      renderScenario();
    });
  });
}

function renderMacc() {
  const labels = t("optimization").maccLabels;
  document.querySelector("#maccList").innerHTML = optimizationData.macc.map((item) => `<div class="macc-row">
    <div>
      <strong>${item.rank}. ${labels[item.key]}</strong>
      <p class="muted">${labels.annualReduction}: ${item.reduction} tonCO2e</p>
    </div>
    <span>${labels.costPerTon}</span>
    <strong>${formatNumber(item.cost)}</strong>
  </div>`).join("");
}

function renderDisclosure() {
  document.querySelector("#disclosureList").innerHTML = t("optimization").disclosureSections.map(([title, draft, source]) => `<article class="disclosure-section">
    <strong>${title}</strong>
    <p>${draft}</p>
    <span class="muted">${source}</span>
  </article>`).join("");

  document.querySelector("#dataTagGrid").innerHTML = t("optimization").dataTags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("");
}

function renderAssurance() {
  const labels = t("optimization").assuranceLabels;
  document.querySelector("#assuranceList").innerHTML = optimizationData.assurance.map((item) => {
    const statusClass = item.status === "ready" ? "normal" : item.status === "missing" ? "critical" : "warning";
    return `<div class="assurance-row">
      <div>
        <strong>${labels[item.key]}</strong>
        <p class="muted">${t("owner")}: ${labels[item.owner.replace(/\s/g, "")] || item.owner}</p>
      </div>
      <span class="status ${statusClass}">${labels[item.status]}</span>
    </div>`;
  }).join("");
}

function renderOrganization() {
  const labels = t("optimization").organizationLabels;
  document.querySelector("#orgTree").innerHTML = optimizationData.organization.map((item) => `<div class="org-row level-${item.level}">
    <strong>${labels[item.key]}</strong>
    <span>${item.carbon} tonCO2e</span>
  </div>`).join("");
}

function renderOperations() {
  const labels = t("optimization").operationsLabels;
  document.querySelector("#travelFleetList").innerHTML = optimizationData.travelFleet.map((item) => `<div class="ops-card">
    <strong>${labels[item.key]}</strong>
    <span>${item.activity}</span>
    <span>${item.carbon} tonCO2e</span>
    <span class="status ${item.status}">${t("optimization").risks[item.status]}</span>
  </div>`).join("");

  document.querySelector("#waterWasteList").innerHTML = optimizationData.waterWaste.map((item) => `<div class="ops-card">
    <strong>${labels[item.key]}</strong>
    <span>${item.value}</span>
    <span class="status ${item.status}">${t("optimization").risks[item.status]}</span>
  </div>`).join("");
}

function renderSupplierPortal() {
  const statuses = t("optimization").supplierPortalStatuses;
  document.querySelector("#supplierPortalList").innerHTML = optimizationData.supplierPortal.map((supplier) => {
    const statusClass = supplier.status === "ready" ? "normal" : supplier.status === "missing" ? "critical" : "warning";
    return `<div class="supplier-portal-row">
      <div>
        <strong>${supplier.name}</strong>
        <p class="muted">${t("due")}: ${supplier.due}</p>
        <div class="bar"><span style="width:${supplier.completion}%"></span></div>
      </div>
      <span>${supplier.completion}%</span>
      <span class="status ${statusClass}">${statuses[supplier.status]}</span>
    </div>`;
  }).join("");
}

function renderCopilotPrompts() {
  document.querySelector("#copilotPromptGrid").innerHTML = t("optimization").copilotPrompts.map((prompt) => `<button class="prompt-button" type="button">${prompt}</button>`).join("");
}

function renderCompliance() {
  const labels = t("optimization").complianceLabels;
  document.querySelector("#complianceList").innerHTML = optimizationData.compliance.map((item) => `<div class="project-row">
    <div>
      <strong>${labels[item.key]}</strong>
      <p class="muted">${t("due")}: ${item.due}</p>
      <div class="bar"><span style="width:${item.progress}%"></span></div>
    </div>
    <span>${t("progress")}: ${item.progress}%</span>
    <span class="status ${item.status}">${t("optimization").risks[item.status]}</span>
  </div>`).join("");

  document.querySelector("#inboxList").innerHTML = optimizationData.inbox.map((task) => `<div class="assurance-row">
    <div>
      <strong>${labels[task.key]}</strong>
      <p class="muted">${t("owner")}: ${translateOptimization(task.owner, "projects")} · ${t("due")}: ${task.due}</p>
    </div>
    <span class="status ${task.status}">${t("optimization").risks[task.status]}</span>
  </div>`).join("");
}

function renderPcfAndFactors() {
  const pcfLabels = t("optimization").pcfLabels;
  document.querySelector("#pcfList").innerHTML = optimizationData.pcf.map((item) => `<div class="pcf-row">
    <div>
      <strong>${pcfLabels[item.key]}</strong>
      <p class="muted">${pcfLabels.alternative}: ${pcfLabels[item.alternative]}</p>
    </div>
    <span>${item.carbon} kgCO2e</span>
    <span class="status normal">${pcfLabels.change}: ${item.delta}</span>
  </div>`).join("");

  const factorLabels = t("optimization").factorLabels;
  document.querySelector("#factorList").innerHTML = optimizationData.factors.map((factor) => `<div class="factor-row">
    <div>
      <strong>${factorLabels[factor.key]}</strong>
      <p class="muted">${factor.source} · ${factorLabels.version}: ${factor.version}</p>
    </div>
    <span>${factorLabels.expires}: ${factor.expires}</span>
    <span class="status ${factor.status}">${t("optimization").risks[factor.status]}</span>
  </div>`).join("");
}

function renderCarbonPricing() {
  const labels = t("optimization").carbonPriceLabels;
  const carbonFee = 1500;
  document.querySelector("#carbonPriceList").innerHTML = optimizationData.carbonBudgets.map((item) => {
    const over = Math.max(item.actual - item.budget, 0);
    const fee = over * carbonFee;
    const status = over > 0 ? "critical" : "normal";
    return `<div class="carbon-price-row">
      <div>
        <strong>${labels[item.key]}</strong>
        <p class="muted">${labels.budget}: ${item.budget} tonCO2e</p>
      </div>
      <span>${labels.actual}: ${item.actual} tonCO2e</span>
      <span>${labels.fee}: NTD ${formatNumber(fee)}</span>
      <span class="status ${status}">${over > 0 ? t("overTarget") : t("normal")}</span>
    </div>`;
  }).join("");
}

function renderClimateRisk() {
  const labels = t("optimization").climateRiskLabels;
  document.querySelector("#climateRiskList").innerHTML = optimizationData.climateRisks.map((risk) => `<div class="risk-row">
    <div>
      <strong>${labels[risk.key]}</strong>
      <p class="muted">${labels[risk.type]} · ${risk.exposure}</p>
    </div>
    <span class="status ${risk.impact === "high" ? "critical" : "warning"}">${labels[risk.impact]}</span>
  </div>`).join("");
}

function renderUtilities() {
  const labels = t("optimization").utilityLabels;
  document.querySelector("#utilityList").innerHTML = optimizationData.utilities.map((item) => `<div class="utility-row">
    <div>
      <strong>${labels[item.key]}</strong>
      <p class="muted">${labels.amount}: NTD ${formatNumber(item.amount)}</p>
    </div>
    <span>${labels.anomaly}: ${item.anomaly}</span>
    <span>${labels.saving}: NTD ${formatNumber(item.saving)}</span>
  </div>`).join("");
}

function renderAssets() {
  const labels = t("optimization").assetLabels;
  document.querySelector("#assetList").innerHTML = optimizationData.assets.map((asset) => `<div class="asset-row">
    <div>
      <strong>${labels[asset.key]}</strong>
      <p class="muted">${labels.age}: ${asset.age} · ${labels.efficiency}: ${asset.efficiency}%</p>
    </div>
    <span>${labels.roi}: ${labels[asset.roi] || asset.roi}</span>
    <span class="status ${asset.status}">${t("optimization").risks[asset.status]}</span>
  </div>`).join("");
}

function renderBenchmark() {
  const uncertaintyLabels = t("optimization").uncertaintyLabels;
  document.querySelector("#uncertaintyList").innerHTML = optimizationData.uncertainty.map((item) => `<div class="uncertainty-row">
    <div>
      <strong>${uncertaintyLabels[item.key]}</strong>
      <p class="muted">${item.value}</p>
    </div>
    <span class="status ${item.confidence === "high" ? "normal" : item.confidence === "medium" ? "warning" : "critical"}">${uncertaintyLabels[item.confidence]}</span>
  </div>`).join("");

  const benchmarkLabels = t("optimization").benchmarkLabels;
  document.querySelector("#benchmarkList").innerHTML = optimizationData.benchmarks.map((item) => `<div class="benchmark-row">
    <div>
      <strong>${benchmarkLabels[item.key]}</strong>
      <p class="muted">${benchmarkLabels.current}: ${item.current} · ${benchmarkLabels.peer}: ${item.peer}</p>
    </div>
    <span>${benchmarkLabels.rank}: ${item.rank}</span>
  </div>`).join("");
}

function renderProductUx() {
  const labels = t("optimization").productUxLabels;

  document.querySelector("#onboardingList").innerHTML = optimizationData.onboarding.map((step, index) => `<div class="product-row-wide">
    <div>
      <strong>${index + 1}. ${labels[step.key]}</strong>
      <div class="bar"><span style="width:${step.progress}%"></span></div>
    </div>
    <span>${t("progress")}: ${step.progress}%</span>
  </div>`).join("");

  document.querySelector("#roleHomeGrid").innerHTML = optimizationData.roleHome.map((role) => `<article class="metric-extension">
    <strong>${labels[role.key]}</strong>
    <p>${labels[role.focus]}</p>
    <span class="status normal">${role.metric}</span>
  </article>`).join("");

  document.querySelector("#connectorGrid").innerHTML = optimizationData.connectors.map((connector) => `<article class="connector-card">
    <strong>${connector.key}</strong>
    <span class="status ${connector.status === "connected" ? "normal" : connector.status === "reviewing" ? "warning" : "critical"}">${labels[connector.status]}</span>
  </article>`).join("");

  document.querySelector("#importWizardList").innerHTML = optimizationData.importSteps.map((step, index) => `<div class="lineage-step">
    <span>${index + 1}</span>
    <strong>${labels[step]}</strong>
  </div>`).join("");

  document.querySelector("#notificationList").innerHTML = optimizationData.notifications.map((notice) => `<div class="alert-item ${notice.level}">
    <strong>${labels[notice.key]}</strong>
    <p class="muted">${t("status")}: ${t("optimization").risks[notice.level]}</p>
  </div>`).join("");

  document.querySelector("#aiTrustList").innerHTML = optimizationData.aiTrust.map((item) => `<div class="source-item">
    <strong>${labels[item.key]}</strong>
    <p class="muted">${labels[item.value] || item.value}</p>
  </div>`).join("");

  document.querySelector("#mobileFieldList").innerHTML = optimizationData.mobileTasks.map((task) => `<div class="mobile-task">
    <strong>${labels[task.key]}</strong>
    <span>${task.value}</span>
    <span class="status ${task.status === "ready" ? "normal" : task.status === "reviewing" ? "warning" : "critical"}">${labels[task.status]}</span>
  </div>`).join("");

  document.querySelector("#exportGrid").innerHTML = optimizationData.exports.map((format) => `<button class="export-tile" type="button">${format}</button>`).join("");

  document.querySelector("#demoTourList").innerHTML = optimizationData.demoTour.map((step, index) => `<div class="timeline-item">
    <strong>${index + 1}. ${labels[step]}</strong>
  </div>`).join("");

  document.querySelector("#adminGrid").innerHTML = optimizationData.adminSettings.map((setting) => `<article class="knowledge-item">
    <strong>${labels[setting.key]}</strong>
    <p>${setting.value}</p>
  </article>`).join("");

  document.querySelector("#academyGrid").innerHTML = optimizationData.academy.map((topic) => `<article class="knowledge-item">
    <strong>${labels[topic] || topic}</strong>
    <p>${topic === "CBAM" || topic === "CSRD" ? t("complianceTitle") : t("ragTitle")}</p>
  </article>`).join("");

  document.querySelector("#valueGrid").innerHTML = optimizationData.valueMetrics.map((metric) => `<article class="metric-card">
    <span>${labels[metric.key]}</span>
    <strong>${metric.value}</strong>
  </article>`).join("");
}

function renderSaasOps() {
  const labels = t("optimization").saasLabels;

  document.querySelector("#expertReviewList").innerHTML = optimizationData.expertReviews.map((item) => `<div class="saas-row">
    <div>
      <strong>${labels[item.key]}</strong>
      <p class="muted">${labels.reviewer}: ${item.reviewer} · ${t("due")}: ${item.due}</p>
    </div>
    <span class="status ${item.status === "ready" ? "normal" : item.status === "reviewing" ? "warning" : "critical"}">${t("optimization").supplierPortalStatuses[item.status] || labels[item.status] || item.status}</span>
  </div>`).join("");

  document.querySelector("#regTrackerList").innerHTML = optimizationData.regulations.map((item) => `<div class="saas-row">
    <div>
      <strong>${item.key}</strong>
      <p class="muted">${labels.region}: ${item.region} · ${labels.effective}: ${item.effective}</p>
    </div>
    <span>${labels[item.action]}</span>
    <span class="status ${item.status}">${t("optimization").risks[item.status]}</span>
  </div>`).join("");

  document.querySelector("#evidenceList").innerHTML = optimizationData.evidenceLibrary.map((item) => `<div class="saas-row">
    <div>
      <strong>${labels[item.key]}</strong>
      <p class="muted">${labels.version}: ${item.version} · ${labels.uploadedBy}: ${translateOptimization(item.owner, "projects")}</p>
    </div>
    <span>${t("due")}: ${item.expires}</span>
    <span class="status ${item.status === "ready" ? "normal" : item.status === "missing" ? "critical" : "warning"}">${t("optimization").supplierPortalStatuses[item.status]}</span>
  </div>`).join("");

  document.querySelector("#versionList").innerHTML = optimizationData.reportVersions.map((item) => `<div class="timeline-item">
    <strong>${item.key}</strong>
    <p class="muted">${item.editor} · ${labels[item.change]}</p>
    <span class="status ${item.status === "ready" ? "normal" : item.status === "reviewing" ? "warning" : "normal"}">${labels[item.status] || t("optimization").supplierPortalStatuses[item.status]}</span>
  </div>`).join("");

  document.querySelector("#commentList").innerHTML = optimizationData.comments.map((item) => `<div class="source-item">
    <strong>${item.author}</strong>
    <p class="muted">${labels[item.key]}</p>
    <span class="status ${item.status === "ready" ? "normal" : item.status === "reviewing" ? "warning" : "critical"}">${t("optimization").supplierPortalStatuses[item.status]}</span>
  </div>`).join("");

  document.querySelector("#apiList").innerHTML = optimizationData.apis.map((api) => `<div class="saas-row">
    <div>
      <strong>${labels[api.key]}</strong>
      <p class="muted">${labels.endpoint}: ${api.endpoint}</p>
    </div>
    <span>${labels.schedule}: ${api.schedule}</span>
    <span class="status ${api.status}">${t("optimization").risks[api.status]}</span>
  </div>`).join("");

  document.querySelector("#pipelineList").innerHTML = optimizationData.pipelines.map((pipe) => `<div class="saas-row">
    <div>
      <strong>${labels[pipe.key]}</strong>
      <p class="muted">Uptime: ${pipe.uptime}</p>
    </div>
    <span class="status ${pipe.status}">${t("optimization").risks[pipe.status]}</span>
  </div>`).join("");

  document.querySelector("#tenantList").innerHTML = optimizationData.tenants.map((tenant) => `<div class="saas-row">
    <div>
      <strong>${tenant.name}</strong>
      <p class="muted">${tenant.plan} · ${tenant.isolation}</p>
    </div>
    <span class="status ${tenant.status}">${t("optimization").risks[tenant.status]}</span>
  </div>`).join("");

  document.querySelector("#pricingGrid").innerHTML = optimizationData.packages.map((plan) => `<article class="pricing-card">
    <strong>${plan.key}</strong>
    <p>${labels.suppliers}: ${plan.suppliers}</p>
    <p>${labels.aiQuota}: ${formatNumber(plan.ai)}</p>
    <p>${labels.frameworks}: ${plan.frameworks}</p>
  </article>`).join("");

  document.querySelector("#quickScanGrid").innerHTML = optimizationData.quickScan.map((item) => `<article class="knowledge-item">
    <strong>${labels[item.key]}</strong>
    <p>${item.value}</p>
  </article>`).join("");

  document.querySelector("#templateGrid").innerHTML = optimizationData.industryTemplates.map((template) => `<article class="knowledge-item">
    <strong>${labels[template.key]}</strong>
    <p>${template.kpi}</p>
  </article>`).join("");

  document.querySelector("#trustGrid").innerHTML = optimizationData.trustCenter.map((item) => `<article class="connector-card">
    <strong>${labels[item.key] || item.key}</strong>
    <span class="status ${item.status === "ready" ? "normal" : item.status === "reviewing" ? "warning" : "critical"}">${labels[item.status] || t("optimization").supplierPortalStatuses[item.status]}</span>
  </article>`).join("");
}

function addMessage(text, role = "assistant") {
  const log = document.querySelector("#chatLog");
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.textContent = text;
  log.appendChild(message);
  log.scrollTop = log.scrollHeight;
}

function resetChat() {
  const input = document.querySelector("#chatInput");
  const log = document.querySelector("#chatLog");
  input.value = t("defaultQuestion");
  log.innerHTML = "";
  addMessage(t("defaultQuestion"), "user");
  addMessage(answerQuestion(t("defaultQuestion")));
}

function answerQuestion(question) {
  const normalized = question.toLowerCase();
  if (normalized.includes("notebook") || question.includes("超標") || normalized.includes("over")) {
    return t("answer");
  }
  return t("fallbackAnswer");
}

function renderAll() {
  applyStaticTranslations();
  renderProducts();
  renderEnergy();
  renderAlerts();
  renderTrendChart();
  renderAgent();
  renderKnowledge(document.querySelector("#ragSearch").value);
  renderDataHub();
  renderCalculation();
  renderSupplyChain();
  renderActionPlan();
  renderEsgMetrics();
  renderScenario();
  renderMacc();
  renderDisclosure();
  renderAssurance();
  renderOrganization();
  renderOperations();
  renderSupplierPortal();
  renderCopilotPrompts();
  renderCompliance();
  renderPcfAndFactors();
  renderCarbonPricing();
  renderClimateRisk();
  renderUtilities();
  renderAssets();
  renderBenchmark();
  renderProductUx();
  renderSaasOps();
  document.querySelector("#auditReport").textContent = t("reportText");
}

function switchLanguage(lang) {
  currentLang = lang;
  document.querySelector("#ragSearch").value = "";
  renderAll();
  resetChat();
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("is-active"));
      document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
      button.classList.add("is-active");
      document.querySelector(`#${button.dataset.view}`).classList.add("is-active");
    });
  });
}

function bindControls() {
  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.lang !== currentLang) switchLanguage(button.dataset.lang);
    });
  });

  document.querySelector("#ragSearch").addEventListener("input", (event) => {
    renderKnowledge(event.target.value);
  });

  document.querySelector("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#chatInput");
    addMessage(input.value, "user");
    addMessage(answerQuestion(input.value));
  });

  document.querySelector("#refreshButton").addEventListener("click", () => {
    renderAlerts();
    renderTrendChart();
  });

  document.querySelector("#exportButton").addEventListener("click", () => {
    document.querySelector('[data-view="report"]').click();
  });
}

function init() {
  renderAll();
  resetChat();
  bindNavigation();
  bindControls();
}

init();
