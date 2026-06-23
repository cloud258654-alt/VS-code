# AI ESG Copilot Platform 第五輪優化項目

本文件記錄第五輪參考國外 ESG / carbon accounting SaaS 後，新增到靜態 MVP 的正式產品營運能力。此輪重點是讓平台更接近可被企業採購、導入、稽核與長期營運的 SaaS。

## 本次已完成

| # | 優化項目 | 對應畫面 | 已加入內容 |
|---|---|---|---|
| 1 | Customer Success / 專家協作入口 | Expert | 新增碳排模型、供應商資料包、揭露報告草稿的顧問審閱狀態。 |
| 2 | Regulation Tracker 法規追蹤器 | Reg Tracker | 新增 CSRD、CBAM、SEC Climate、台灣碳費的地區、生效日與行動要求。 |
| 3 | Evidence Library 佐證資料庫 | Evidence | 新增公用事業帳單、供應商聲明、計算底稿的版本、負責人、狀態與到期日。 |
| 4 | Report Version Control | Review | 新增 v1、v2、submitted 報告版本與修改摘要。 |
| 5 | Comment / Review 協作留言 | Review | 新增主管、廠務、採購的留言與回覆狀態。 |
| 6 | Data Contract / API 管理 | API Health | 新增排放資料 API、供應商 API、報告 API 的 endpoint、排程與狀態。 |
| 7 | Multi-entity / Multi-tenant SaaS 管理 | Tenants | 新增多企業租戶、方案、資料隔離與健康狀態。 |
| 8 | Pricing / Package 頁面 | Pricing | 新增 Starter、Professional、Enterprise 方案差異。 |
| 9 | Status / Data Pipeline Health | API Health | 新增 ERP sync、EMS sync、RAG index、AI service 健康度。 |
| 10 | Personal / Enterprise Carbon Scanner | Quick Scan | 新增快速估算輸入與初估碳排、導入價值。 |
| 11 | Industry Templates 更完整 | Templates | 新增電子業、食品業、塑膠業、金屬加工模板 KPI。 |
| 12 | Trust Center / Security Page | Trust | 新增 SOC2、ISO27001、資料加密、備份、稽核留存狀態。 |

## 新增介面

- Expert
- Reg Tracker
- Evidence
- Review
- API Health
- Tenants
- Pricing
- Quick Scan
- Templates
- Trust

以上介面皆延續中英切換架構。

## 後續建議

1. 將 Expert Review 串接外部顧問帳號、留言、簽核與報告批註。
2. 將 Regulation Tracker 接上法規資料來源與變更通知。
3. 將 Evidence Library 接上檔案上傳、版本差異與權限控管。
4. 將 Report Version Control 接上可編輯 Disclosure Builder。
5. 將 API Health 接上真實同步紀錄、錯誤 log 與 retry。
6. 將 Tenant 管理接上實際資料隔離與方案權限。
7. 將 Pricing 與 Quick Scan 做成對外網站可用的 lead generation flow。
8. 將 Trust Center 補上實際安全政策、DPA、備份與稽核文件下載。

## 驗收重點

- 使用者能集中管理專家審閱、法規更新與佐證文件。
- 使用者能追蹤報告版本與協作留言。
- 管理者能看到 API、資料管線與租戶狀態。
- 潛在客戶能理解方案差異與快速估算價值。
- 企業採購與資安能從 Trust Center 看到信任訊號。
