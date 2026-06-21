任務目標：全面重構 UI 引擎與資料模型，將 App 升級為全屋智慧生活管家（Home Operations Hub）。引入 Apple 官網風格的 Canvas 2x 渲染技術，新增「居家耗材管理」大項目，並實作自動化採購與物聯網聯動的閉環邏輯。

請對現有專案執行以下史詩級重構：

1. 核心大項目分流與頂部導覽列：
   - 在 `index.html` 頂部新增 Apple 經典的微陰影動態膠囊切換鈕 (Tab Switch)：`[ 🍏 智慧冰箱 ]` 與 `[ ⚙️ 居家耗材 ]`。
   - 點擊切換時，整個網頁不重整，而是通知 Canvas 繪製引擎進行水平滑順淡入淡出（Cross-fade）切換。

2. 全面升級為 Apple Canvas 渲染引擎 (`js/canvas-ui.js`)：
   - 建立 `js/canvas-ui.js`，全面接管主畫面的動態無縫渲染。
   - 支援 Retina 螢幕的 2x 高解析度縮放優化 (`window.devicePixelRatio`)，確保文字與 1px 的極細線條絕對銳利。
   - 移除原有的卡通風粗邊框，改用純淨蘋果淺灰背景 (#F5F5F7) 與純白 (#FFFFFF) 卡片，文字使用現代黑灰色 (#1D1D1F)。
   - 動效升級：食材/耗材卡片移出或完食時，全面採用「彈簧物理公式 (Spring Physics)」計算位移，帶有 iOS 系統級的物理慣性與緩動。

3. 資料模型升級與耗材欄位映射 (`js/model.js`)：
   - 擴充工廠函數，加入 `itemType`: 'food' | 'consumable'。
   - 當 `itemType === 'consumable'` (耗材) 時，支援單位 `unitType: 'days'` (壽命天數倒數) 或 `'x'` (備品個數)。
   - 新增 `alertThreshold` (預警門檻，如剩 15 天) 欄位。
   - 新增 `automation` 物件（內含 `autoCart: true`, `preferredPlatform: 'shopee'`）與 `purchaseInfo`（內含精準型號 `modelNumber` 與 `purchaseUrl`）。

4. 耗材專屬的狀態分區渲染：
   - 當切換到「居家耗材」大項目時，Canvas 渲染四大極簡科技感區塊：
     - 🚨 立刻更換 (Replace Now)：壽命歸零或備品用盡（Apple 警示紅 #FF3B30 的 1px 微光外框）。
     - ⚠️ 壽命將盡 (Attention)：低於預警門檻（琥珀橘 #FF9500 提示）。
     - 🟢 運作良好 (Healthy)：狀態極佳，進度條顯示穩定的森林綠 (#34C759)。
     - 📦 庫存備品 (Backups)：記錄囤積的耗材數量。

5. 智慧採購與自動化閉環聯動 (`js/storage.js` & `js/ui.js`)：
   - 當耗材或食材的數量歸零時，卡片會觸發 Canvas 晶瑩水滴粒子特效，像被吸入一樣縮小並滑入右下角的 **「🛒 自動採購膠囊鈕」**。
   - 點擊採購膠囊時，Canvas 彈出半透明磨砂玻璃對話框，顯示：「已為您比價並將最佳型號加入購物車」，並提供一個精緻的 `[ 一鍵前往結帳 ]` 導購連結按鈕，點擊後跳轉至 `purchaseUrl`。

請確保原本的 LocalStorage 持久化、自訂存放位置、多單位扣除邏輯完全保留並完美向上相容，純粹用 Canvas 與更宏大的資料結構將產品拉升至頂級商業提案水準。