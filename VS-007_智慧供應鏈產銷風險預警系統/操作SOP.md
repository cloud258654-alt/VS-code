# AI ESG Copilot Platform 操作 SOP

適用對象：第一次接觸本系統的新手使用者  
系統版本：v1.0 MVP + 產品化優化整合版  
使用方式：開啟 `index.html` 即可操作靜態展示版

---

# 一、使用前準備

## 1. 開啟系統

1. 進入專案資料夾。
2. 使用瀏覽器開啟 `index.html`。
3. 進入後會看到主畫面 Dashboard。

## 2. 切換語言

右上角有語言切換：

- `中`：繁體中文
- `EN`：英文

新手建議先使用中文介面。

## 3. 認識主畫面

系統左側是功能選單，右側是主要內容區。

常用模組：

- `Dashboard`：看碳排與風險總覽
- `Data Hub`：看資料來源與資料品質
- `Calculation`：看碳排如何計算
- `AI Agent`：看 AI 如何分析超標原因
- `Action Plan`：看減碳任務進度
- `Supplier Portal`：看供應商填報狀態
- `Disclosure` / `Audit Report`：看報告內容
- `Notifications`：看重要提醒

---

# 二、建議新手操作順序

第一次使用時，建議依照以下順序熟悉系統：

1. `Onboarding`
2. `Dashboard`
3. `Data Hub`
4. `Calculation`
5. `AI Agent`
6. `Action Plan`
7. `Supplier Portal`
8. `Disclosure`
9. `Audit Report`
10. `Value`

---

# 三、基本操作 SOP

## Step 1：完成導入設定

進入 `Onboarding`。

確認 5 個導入步驟：

1. 公司資料
2. 產業與產品設定
3. 資料來源連接
4. 報告框架選擇
5. 供應商範圍設定

目的：讓使用者理解系統需要哪些基本資料。

---

## Step 2：查看 ESG 與碳排總覽

進入 `Dashboard`。

重點查看：

- 總碳排
- Scope 1
- Scope 2
- Scope 3
- 產品碳排強度
- 碳排趨勢
- 能源管理
- 異常預警

若看到紅色或黃色標籤，代表該項目需要注意。

---

## Step 3：確認資料來源是否可信

進入 `Data Hub`。

檢查：

- ERP / MES / EMS / Excel / PDF 是否有資料
- 更新時間是否正常
- 資料完整率是否偏低
- 異常筆數是否過多
- 是否有稽核軌跡

判斷原則：

- 完整率越高越好
- 異常筆數越少越好
- 資料有更新時間與稽核紀錄，可信度較高

---

## Step 4：理解碳排如何計算

進入 `Calculation`。

重點查看：

- Scope 1 計算模型
- Scope 2 計算模型
- Product Carbon 計算模型
- 計算透明度
- 報告框架映射
- AI 回答引用來源

目的：確認碳排數字不是黑盒，而是可追溯到資料來源、公式與係數。

---

## Step 5：查看 AI 超標原因分析

進入 `AI Agent`。

查看 Notebook 超標分析流程：

1. 讀取 ERP / MES / EMS
2. 計算產品碳排
3. 分析 Root Cause
4. 查詢 ISO / SOP / 稽核案例
5. 產生減碳建議

新手重點：先看 AI 找出的超標原因，再看建議措施。

---

## Step 6：追蹤減碳任務

進入 `Action Plan`。

檢查：

- 專案名稱
- 負責部門
- 完成期限
- 預估減碳效果
- 成本
- 進度
- 異常處理 workflow

建議處理順序：

1. 先處理高風險或紅色狀態
2. 再處理快到期任務
3. 最後追蹤一般改善項目

---

## Step 7：查看供應商資料填報

進入 `Supplier Portal`。

查看：

- 供應商名稱
- 填報截止日
- 完成率
- 狀態

若狀態為逾期、缺件或待填報，採購或 ESG 人員應優先催繳。

---

## Step 8：使用 Scenario 做減碳模擬

進入 `Scenario`。

可調整：

- 綠電比例
- 產量變化
- 空壓機效率改善

系統會顯示預估年度減碳量。

用途：幫助主管比較不同改善方案的效果。

---

## Step 9：查看報告與揭露內容

進入 `Disclosure`。

查看報告段落：

- 治理
- 策略
- 風險管理
- 指標與目標

再進入 `Audit Report` 查看自動產生的稽核報告。

報告內容通常包含：

- 日期
- 產品
- 異常
- 依據
- 原因
- 改善措施
- 預估減碳
- 完成期限
- 責任部門

---

## Step 10：查看通知與待辦

進入 `Notifications`。

確認：

- 供應商是否逾期
- 排放係數是否即將過期
- 是否有碳排超標
- 是否缺少佐證文件
- 報告是否可輸出

再進入 `Compliance` 或 `Review` 查看詳細任務。

---

# 四、常見角色操作方式

## 1. 主管

建議查看：

- `Dashboard`
- `Role Home`
- `Scenario`
- `Carbon Price`
- `Value`
- `Audit Report`

主管重點：

- 是否超標
- 風險在哪裡
- 花多少錢可改善
- 報告是否可送出

---

## 2. ESG 專員

建議查看：

- `Data Hub`
- `Calculation`
- `RAG Knowledge`
- `Disclosure`
- `Assurance`
- `Evidence`
- `Review`

ESG 專員重點：

- 資料是否完整
- 計算是否正確
- 佐證是否齊全
- 報告是否符合框架

---

## 3. 廠務 / 製造

建議查看：

- `Energy Dashboard`
- `Operations`
- `Assets`
- `Mobile Field`
- `Action Plan`

廠務重點：

- 用電是否異常
- 設備效率是否偏低
- 改善任務是否完成
- 是否已補上現場佐證

---

## 4. 採購

建議查看：

- `Supply Chain`
- `Supplier Portal`
- `Evidence`
- `Notifications`

採購重點：

- 哪些供應商高風險
- 哪些供應商未填報
- 哪些文件缺漏
- 是否需要催繳

---

# 五、報告輸出 SOP

## 1. 檢查資料

先確認：

- `Data Hub` 資料完整率
- `Calculation` 計算模型
- `Evidence` 佐證資料
- `Assurance` 查核狀態

## 2. 檢查報告

進入：

- `Disclosure`
- `Audit Report`
- `Review`

確認版本、留言與審核狀態。

## 3. 輸出報告

進入 `Export Center`。

可選格式：

- PDF
- Word
- Excel
- Power BI
- XBRL
- Board Deck

MVP 目前為展示介面，尚未真正產生檔案。

---

# 六、AI 問答 SOP

## 1. 使用 LINE Assistant

進入 `LINE Assistant`。

可輸入：

```text
Notebook 為什麼超標？
```

系統會回覆：

- 碳排
- 目標
- 超標比例
- 原因
- 依據
- 建議
- 預估減碳

## 2. 使用 Copilot Prompt

進入 `Copilot`。

可參考常見問題：

- 哪個廠區本月用電最高？
- Scope 3 熱點在哪？
- 哪個減碳專案 ROI 最好？
- 哪些佐證文件還沒準備好？
- 如果綠電提高到 50%，年度碳排會降多少？

---

# 七、管理者設定 SOP

## 1. 權限與稽核

進入 `Admin`。

查看：

- 使用者與角色
- 簽核流程
- 資料留存
- 稽核紀錄

## 2. 租戶與方案

進入：

- `Tenants`
- `Pricing`

查看：

- 公司租戶
- 方案等級
- 資料隔離狀態
- 供應商數量
- AI 次數
- 支援框架數

## 3. Trust Center

進入 `Trust`。

查看：

- SOC2
- ISO27001
- 資料加密
- 備份
- 稽核紀錄留存

---

# 八、新手常見問題

## Q1：我一開始應該先看哪裡？

先看 `Dashboard`，再看 `Data Hub` 和 `AI Agent`。

## Q2：紅色標籤代表什麼？

通常代表高風險、超標、逾期或缺件，應優先處理。

## Q3：黃色標籤代表什麼？

通常代表需要注意、審查中或即將到期。

## Q4：目前系統會真的連接 ERP / MES / EMS 嗎？

目前 MVP 是靜態展示版，資料為 mock data。正式版才會接真實資料來源。

## Q5：目前能真的輸出 PDF 或 Word 嗎？

目前只展示 Export Center 介面，尚未實作實際檔案輸出。

## Q6：AI 回答是否可以直接當作正式稽核依據？

不建議。AI 回答應搭配引用來源、佐證文件與 ESG 專員審核後使用。

---

# 九、每日使用建議

每日例行檢查：

1. 查看 `Dashboard` 是否有新異常。
2. 查看 `Notifications` 是否有重要通知。
3. 查看 `Data Hub` 是否有資料缺漏。
4. 查看 `Supplier Portal` 是否有供應商逾期。
5. 查看 `Action Plan` 是否有快到期任務。

每週例行檢查：

1. 檢查 `Scenario` 與 `MACC`。
2. 檢查 `Evidence` 與 `Assurance`。
3. 檢查 `Compliance` 法規任務。
4. 檢查 `Value` 導入效益。

每月例行檢查：

1. 產出 `Audit Report`。
2. 更新 `Disclosure`。
3. 檢查 `Carbon Price`。
4. 檢查 `Benchmark`。
5. 檢查 `Trust` 與 `API Health`。

---

# 十、學習路線

新手建議依照以下順序學習：

1. 了解 ESG、Scope 1 / 2 / 3 與產品碳足跡。
2. 熟悉 Dashboard 與 Data Hub。
3. 理解 Calculation 與排放係數。
4. 學會看 AI Agent 分析。
5. 學會追蹤 Action Plan。
6. 學會管理 Supplier Portal。
7. 學會檢查 Evidence 與 Assurance。
8. 學會輸出 Audit Report。
9. 進一步理解 Scenario、MACC、Carbon Price。
10. 最後學習 Admin、Tenants、Trust 與 SaaS 管理。

---

# 十一、注意事項

- 本 MVP 目前為靜態展示版，不會真正寫入資料庫。
- 所有數字與資料皆為示範用 mock data。
- 若要進入正式使用，需串接後端、資料庫、RAG、權限與實際報告輸出。
- 新手操作時，建議先理解流程，不要只看單一數字。
- 正式 ESG 報告仍需由 ESG 專員、主管與第三方查核單位確認。
