任務目標：5 項 UX 細節優化，拉近與 NoWaste / FoodShiner 的使用體驗差距。

---

## 1. 滑動手勢 (Swipe Gestures)

- **檔案**：`js/canvas-ui.js`
- **功能**：
  - 右滑 (swipe right)：觸發消耗（等同點擊 `−`）
  - 左滑 (swipe left)：觸發完食（等同點擊 `✓`）
  - ml/g 類型右滑 → 彈出用量輸入
  - 滑動過程中卡片跟隨手指位移，超過閾值 (60px) 後觸發
  - 未達閾值則彈回原位

## 2. 已完食「重新加入冰箱」

- **檔案**：`js/canvas-ui.js` + `js/storage.js`
- **功能**：
  - `storage.js` 新增 `restoreFood(id)`：將 finished 改回 false，quantity 恢復為 originalQuantity
  - 已完食卡片右側加入「🔄」按鈕以重新加入
- **流程**：點擊 → finished=false, quantity=originalQuantity → 刷新 Canvas

## 3. 到期日自然語言解析

- **檔案**：`js/main.js`
- **功能**：到期日 input 支援輸入：
  - 「明天」→ 今日 + 1
  - 「後天」→ 今日 + 2
  - 「3天後」→ 今日 + N
  - 「下週三」→ 下一個星期三
  - 「6/25」→ 直接解析日期
- **實作**：input blur 時解析，解析成功則填入對應日期

## 4. 排序切換

- **檔案**：`js/canvas-ui.js`
- **功能**：冰箱 Tab 頂部 Stats Bar 下方加入排序列
  - 「到期日 ↑」（預設，快過期在前）
  - 「名稱 A→Z」
  - 點擊切換，Canvas 重新排列

## 5. 觸覺回饋 (Haptic Feedback)

- **檔案**：`js/canvas-ui.js`
- **功能**：點擊消耗/完食按鈕時呼叫 `navigator.vibrate(10)`（10ms 短震動）
- **相容**：Android 支援、iOS 不支援（無影響）
