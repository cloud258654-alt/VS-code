任務目標：字體全面放大（3~80 歲友善）+ 毛玻璃精緻質感 + 觸控友善 Apple HIG 標準。

---

## 1. 字體放大（Canvas + HTML）

| 元素 | 舊 | 新 |
|------|----|----|
| 卡片名稱 | 15px | 20px bold |
| 數量/單位 | 12px | 15px |
| 到期標籤 | 10px | 13px |
| 區塊標題 | 13px | 17px |
| 按鈕圖示 | 14px | 20px |
| 類別圖示 | 22px | 30px |
| 排序按鈕 | 11px | 14px |
| Header | 18px | 24px |
| Stats 數字 | 20px | 30px |
| Stats 標籤 | 11px | 14px |
| 導航 | 10px | 13px |
| Modal 標籤 | 12px | 14px |
| Modal 輸入 | 14px | 16px |
| FAB | 56px | 64px |
| 設定頁 | 15px | 17px |
| 購物 | 14px | 16px |

## 2. 毛玻璃質感

- 卡片背景：`rgba(255,255,255,0.72)` + 內框
- 陰影加大：`blur:16` + 彩暈
- 按鈕：毛玻璃底 + 微邊框
- 狀態圓點：漸層光暈 radial gradient
- Header / Nav / Modal：`bg-white/60` + 強 blur

## 3. 觸控友善

- 互動元素最小 44x44px
- 按鈕放大至 52x38
- 設定頁行高 48px
- Modal 按鈕 50px 高
