# AI ESG Copilot Platform 優化項目紀錄

本文件整理參考同類型 ESG / carbon accounting / sustainability platform 後，已加入 v1.0 靜態 MVP 的優化項目。

## 本次已完成

| # | 優化項目 | 對應畫面 | 已加入內容 |
|---|---|---|---|
| 1 | 資料治理與稽核軌跡 | Data Hub | 新增資料來源狀態、更新時間、完整率、異常筆數、稽核軌跡。 |
| 2 | 資料匯入流程 | Data Hub | 新增 ERP / MES / EMS / Excel / PDF 匯入健康度與缺漏提示。 |
| 3 | 排放係數與計算模型 | Calculation | 新增 Scope 1、Scope 2、Product Carbon 計算模型與係數邏輯展示。 |
| 4 | Scope 3 / 供應鏈模組 | Supply Chain | 新增供應商、類別、排放量、風險等級與建議處置。 |
| 5 | 目標管理與減碳專案追蹤 | Action Plan | 新增減碳專案、負責部門、期限、成本、預估減碳與進度。 |
| 6 | 報告框架選擇 | Calculation | 新增 ISO14064、ISO14067、GHG Protocol、TCFD、ISSB、SBTi 框架映射。 |
| 7 | AI 回答引用來源 | Calculation | 新增資料表、SOP 文件與 ISO 標準來源展示。 |
| 8 | 異常處理 workflow | Action Plan | 新增偵測、指派、改善、驗證流程。 |
| 9 | 權限角色 | Data Hub | 新增主管、ESG 專員、廠務 / 製造角色與職責。 |
| 10 | 延伸 ESG 指標 | ESG Metrics | 新增 Environmental、Social、Governance 指標方向。 |

## 新增介面

- Data Hub
- Calculation
- Supply Chain
- Action Plan
- ESG Metrics

以上介面皆支援中英切換，並與既有 Dashboard、AI Agent、RAG、LINE Assistant、Audit Report 保持同一個靜態前端架構。

## 後續建議

1. 將 mock data 拆成 JSON 或 API 回傳格式。
2. 建立後端資料模型：data_sources、emission_factors、suppliers、reduction_projects、audit_events。
3. 補資料上傳與驗證流程，先支援 Excel / CSV。
4. 將 AI 回答來源改為真實 RAG 檢索結果。
5. 將稽核報告輸出成 PDF / Word。

## 驗收重點

- 使用者能從 Data Hub 看到資料是否可信。
- 使用者能從 Calculation 理解碳排數字如何被計算。
- 使用者能從 Supply Chain 看出 Scope 3 高風險供應商。
- 使用者能從 Action Plan 追蹤 AI 建議是否被執行。
- 使用者能從 ESG Metrics 看出平台未來可延伸到碳以外的 ESG 指標。
