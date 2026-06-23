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
      ]
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
      ]
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
