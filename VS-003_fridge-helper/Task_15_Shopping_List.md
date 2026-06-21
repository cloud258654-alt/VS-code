任務目標：新增購物清單引擎。食材歸零完食後自動加入待購清單，亦可手動增刪管理。

---

## 1. 建立 `js/shopping-list.js`（購物清單引擎）

- `getShoppingList()`：從 LocalStorage 讀取購物清單陣列，無則回傳空陣列
- `addToShoppingList(name, source)`：新增品項（source: "auto" | "manual"），避免同名重複
- `removeFromShoppingList(id)`：依據 UUID 刪除該品項
- `toggleShoppingItem(id)`：切換 `completed` 狀態（勾選/取消）
- `clearCompletedShopping()`：刪除所有 `completed: true` 的項目
- 資料結構：
  ```js
  { id: "uuid", name: "鮮奶", addedDate: "2026-06-20", completed: false, source: "auto" }
  ```

## 2. 修改 `index.html`

- Header 右側新增「🛒」購物清單按鈕
- 新增購物清單 Modal（與現有 Modal 同層級）：
  - 列表顯示所有品項，每項附帶勾選框 + 刪除鈕
  - 底部：輸入框 +「加入」按鈕（手動新增）
  - 「清除已購買」按鈕

## 3. 修改 `js/canvas-ui.js`

- `doClear` 與 `doConsume`（歸零時）：呼叫 `addToShoppingList(food.name, "auto")`
- 避免重複加入（同名已存在則跳過）

## 4. 修改 `js/main.js`

- `DOMContentLoaded` 初始化購物清單 Modal 事件綁定
- 綁定 Header「🛒」按鈕開啟 Modal
- 綁定 Modal 內部所有互動事件

## 5. 驗證

- 點擊任一食材「全吃完」→ 打開購物清單 → 該食材自動出現在清單中
- 手動加入「雞蛋」→ 清單出現「雞蛋 (手動)」
- 勾選「已購買」→ 狀態切換 →「清除已購買」→ 該項目消失
