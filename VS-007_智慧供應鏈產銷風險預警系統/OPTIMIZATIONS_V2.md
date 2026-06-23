# AI ESG Copilot Platform 第二輪優化項目

本文件記錄第二輪參考同類型產品後，新增到靜態 MVP 的產品能力。此輪重點是讓平台從「監控與報告」再往「決策模擬、確信準備、揭露協作、供應商填報」延伸。

## 本次已完成

| # | 優化項目 | 對應畫面 | 已加入內容 |
|---|---|---|---|
| 1 | 情境模擬 / What-if Analysis | Scenario | 新增綠電比例、產量變化、空壓機效率滑桿，並即時計算預估年度減碳。 |
| 2 | 邊際減碳成本 MACC | Scenario | 新增各減碳方案的年度減碳量與 NTD / tonCO2e 成本排序。 |
| 3 | 第三方確信 / Assurance Readiness | Assurance | 新增佐證文件、計算底稿、供應商聲明、主管核准等查核狀態。 |
| 4 | ESG 報告編輯器 | Disclosure | 新增治理、策略、風險管理、指標與目標四段式 disclosure builder。 |
| 5 | 組織層級 / 廠區 / 產品線 Roll-up | Organization | 新增公司、廠區、產線、產品層級碳排彙總。 |
| 6 | 資料標籤與資料血緣細化 | Disclosure | 新增 Scope、產品、廠區、季度、auditable、forecast 等資料標籤。 |
| 7 | 交通 / 商旅 / 車隊排放 | Operations | 新增柴油車隊、商務航班、員工通勤調查排放。 |
| 8 | 水質 / 廢棄物細節 | Operations | 新增取水量、廢棄物回收率、有害廢棄物監控。 |
| 9 | 供應商資料收集 Portal | Supplier Portal | 新增供應商填報進度、截止日、缺件與審查狀態。 |
| 10 | 自然語言資料查詢更像 Copilot | Copilot | 新增常見問題 prompt library，支援管理者查詢用電、Scope 3、ROI、佐證狀態與供應商催繳。 |

## 新增介面

- Scenario
- Disclosure
- Assurance
- Organization
- Operations
- Supplier Portal
- Copilot

以上介面皆延續中英切換架構。

## 後續建議

1. 將 Scenario 模型改成真正的計算公式與資料來源，而不是前端 mock 估算。
2. 將 MACC 加入 CAPEX、OPEX、年限、折現率與回收期。
3. 將 Disclosure Builder 改為可編輯欄位，並支援 reviewer 留言與版本控制。
4. 將 Assurance Checklist 串接檔案上傳、簽核紀錄與第三方查核人員欄位。
5. 將 Supplier Portal 拆成供應商登入頁與企業端管理頁。
6. 將 Copilot prompt 連接真實 RAG / SQL 查詢結果，並保留回答來源。

## 驗收重點

- 使用者能調整情境參數並看到減碳估算。
- 使用者能比較減碳方案的成本效率。
- 使用者能看出哪些稽核佐證尚未就緒。
- 使用者能用報告編輯器理解 ESG disclosure 的段落結構。
- 使用者能從組織層級追到產品層級碳排。
- 使用者能追蹤供應商填報狀態與催繳優先順序。
