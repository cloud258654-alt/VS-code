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

const dictionaries = {
  zh: {
    locale: "zh-TW",
    htmlLang: "zh-Hant",
    heroTitle: "智慧碳排與能耗風險預警暨 AI 決策平台",
    exportReport: "產生稽核報告",
    refreshTitle: "重新計算預警",
    moduleNav: "系統模組",
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
