# AI ESG Copilot Platform 第三輪優化項目

本文件記錄第三輪參考同類型 ESG / carbon accounting 產品後，新增到靜態 MVP 的功能。此輪重點是補齊法規任務、產品碳足跡、碳價財務化、氣候風險、公用事業帳單、設備資產、不確定性與同業比較。

## 本次已完成

| # | 優化項目 | 對應畫面 | 已加入內容 |
|---|---|---|---|
| 1 | CBAM / CSRD / SBTi 法規任務中心 | Compliance | 新增 CSRD、CBAM、SBTi、CDP 任務進度、期限與風險狀態。 |
| 2 | 產品碳足跡 PCF / 產品設計模組 | PCF Designer | 新增 Notebook BOM 元件、碳排、替代材料與減碳變化。 |
| 3 | 排放係數資料庫版本管理 | PCF Designer | 新增排放係數來源、版本、到期日與過期風險。 |
| 4 | 任務收件匣 / Inbox | Compliance | 新增待補件、待審核、待確認、待評估的集中任務清單。 |
| 5 | 氣候風險：實體風險 / 轉型風險 | Climate Risk | 新增淹水、缺水、碳費、客戶揭露要求等風險。 |
| 6 | 內部碳價 / Carbon Fee | Carbon Price | 新增 NTD 1,500 / tonCO2e 的部門碳預算與超標碳費估算。 |
| 7 | 公用事業帳單分析 | Utilities | 新增電費、需量費、天然氣帳單異常與節費潛力。 |
| 8 | 資產生命週期管理 | Assets | 新增空壓機、SMT 烤箱、太陽能逆變器的年齡、效率、ROI 與汰換風險。 |
| 9 | 不確定性 / 信賴區間 | Benchmark | 新增產品碳足跡、Scope 2、Scope 3 的估算範圍與可信度。 |
| 10 | 同業 benchmark / peer comparison | Benchmark | 新增碳強度、綠電比例、廢棄物回收率與同業比較。 |

## 新增介面

- Compliance
- PCF Designer
- Carbon Price
- Climate Risk
- Utilities
- Assets
- Benchmark

以上介面皆延續中英切換架構。

## 後續建議

1. 將 Compliance Hub 接上真實法規框架、任務期限與文件附件。
2. 將 PCF Designer 接上 BOM、材料資料庫與供應商排放係數。
3. 將排放係數版本管理獨立成 emission factor library，支援國家、年度、來源與審核流程。
4. 將 Carbon Price 接上財務系統，讓碳成本能回寫產品毛利與部門預算。
5. 將 Climate Risk 加入地理位置、廠區座標、情境年份與財務衝擊。
6. 將 Utilities 接入帳單 OCR、尖離峰電價與契約容量最佳化。
7. 將 Assets 接入設備維修紀錄、能效曲線與汰換投資試算。
8. 將 Benchmark 接入外部同業資料或內部多廠比較。

## 驗收重點

- 使用者能從 Compliance 看到法規任務與待辦。
- 使用者能從 PCF Designer 看到 BOM 層級與替代材料減碳效果。
- 使用者能從 Carbon Price 理解碳排如何轉成財務風險。
- 使用者能從 Climate Risk 看出廠區與產品面臨的氣候風險。
- 使用者能從 Utilities 和 Assets 找到節費與設備汰換機會。
- 使用者能從 Benchmark 判斷數據可信度與同業位置。
