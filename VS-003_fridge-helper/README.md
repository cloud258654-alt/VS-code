# 🍏 冰箱保衛戰 — Fridge-Guard Kawaii Pro

Apple Canvas Edition · PWA 智慧冰箱管理系統

---

## 設計理念

```
買進 → 提醒 → 消耗 → 完食 → 成就感 → 減少浪費
```

目標：零食物浪費、極簡操作、Apple 等級流暢動畫。

---

## 資訊圖表

### 🧠 系統架構流程圖

```
┌─────────────────────────────────────────────────────────┐
│                       User (手機 / 桌面)                   │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│         index.html            │
│  ┌─────────────────────────┐ │
│  │    Canvas (canvas-ui.js) │ │  ← Apple Canvas 2x Retina
│  │  ┌─────┐ ┌─────┐ ┌────┐ │ │     Spring Physics 動畫
│  │  │🚨救命│ │🐱快吃│ │🎀安│ │ │     粒子特效 ❤️✨💠
│  │  │  呀  │ │  我  │ │ 全 │ │ │
│  │  └─────┘ └─────┘ └────┘ │ │
│  │  ┌─────────────────────┐ │ │
│  │  │     ✔ 已完食         │ │ │
│  │  └─────────────────────┘ │ │
│  └─────────────────────────┘ │
└──────────────┬───────────────┘
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│ main.js│ │engine.js│ │state.js│
│ 總指揮  │ │ 到期計算│ │ 狀態機  │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    ▼          ▼          ▼
┌──────────────────────────────────┐
│          storage.js               │
│  ┌───────────┐ ┌───────────────┐ │
│  │LocalStorage│ │ 位置管理       │ │
│  │(foods)     │ │(locations)    │ │
│  └───────────┘ └───────────────┘ │
└──────────────────────────────────┘
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌──────────┐
│history │ │metric  │ │notifier  │
│ 時間軸  │ │ 分析   │ │ 推播通知  │
└────────┘ └────────┘ └──────────┘
    │
    ▼
┌────────┐
│undo.js │  ← 5 秒復原
└────────┘

         ┌──────────────┐
         │   sw.js      │  ← PWA 離線快取
         │Service Worker│
         └──────────────┘
```

### 🔄 食物生命週期狀態機

```
  🛒 新增食材
      │
      ▼
  ┌─────────┐
  │  SAFE   │  > 5 天   🟢 #34C759  薄荷綠
  │  安全   │
  └────┬────┘
       │ 天數減少
       ▼
  ┌─────────┐
  │ WARNING │  3~5 天   🟠 #FF9500  琥珀橘
  │ 快吃我  │
  └────┬────┘
       │ 天數減少
       ▼
  ┌─────────┐
  │ URGENT  │  0~2 天   🔴 #FF3B30  警示紅
  │ 快過期  │
  └────┬────┘
       │ 天數 < 0
       ▼
  ┌─────────┐
  │ EXPIRED │  < 0 天   🔴 #FF3B30  警示紅
  │ 已過期  │
  └────┬────┘
       │ 點擊「吃 1 個」或「全吃完」
       ▼
  ┌───────────┐
  │ CONSUMING │  逐步扣除
  │  消耗中   │
  └─────┬─────┘
        │ quantity ≤ 0
        ▼
  ┌───────────┐
  │ COMPLETED │  finished=true   ⚫ #86868B
  │  已完食   │  ← 5 秒內可復原
  └───────────┘
```

### 📊 消耗引擎

```
  食材卡片
  ┌──────────────────────────────────┐
  │ 🥛 鮮奶                           │
  │ 750 / 1000 ml                    │
  │ ████████████░░░░ 75%             │
  │                                  │
  │       ┌─────────┐ ┌───────────┐  │
  │       │ 用一點  │ │  全吃完   │  │
  │       └────┬────┘ └─────┬─────┘  │
  └────────────┼────────────┼────────┘
               │            │
     ┌─────────┘            └─────────┐
     ▼                                ▼
  彈出用量輸入                    saveUndoSnapshot()
  ┌──────────┐                   recordHistory()
  │ 50  ml ✓│                   triggerHeartParticles()
  └──────────┘                   showUndoToast()
     │                                │
     ▼                                ▼
  consumeFood(id,50)             clearFood(id)
     │                                │
     ├─ qty>0 → 更新進度條             └─ 卡片彈簧動畫淡出
     └─ qty=0 → 移至已完食                → 5s Toast [復原]
```

---

## 功能特色

| 模組 | 功能 | 技術 |
|------|------|------|
| `canvas-ui.js` | Canvas 渲染引擎 | Retina 2x, Spring Physics, roundRect |
| `model.js` | 多單位系統 | x / ml / g / %, originalQuantity |
| `storage.js` | 雙按鈕消耗 + 自訂位置 | consumeFood / clearFood, getLocations |
| `state.js` | Apple 三色狀態機 | SAFE→WARNING→URGENT→EXPIRED→COMPLETED |
| `history.js` | Git-commit 時間軸 | 500 筆上限, 按 foodId 查詢 |
| `animation.js` | 粒子特效 | ❤️ + ✨ + 💠 隨機噴發 |
| `undo.js` | 5 秒復原 Toast | 快照還原, 黑底藍字 UI |
| `notifier.js` | 到期推播 | Notification API, 30min 週期 |
| `metric.js` | 分析儀表板 | savingRate, wasteItems, topFoods |
| `sw.js` | PWA 離線 | Cache-First Strategy, 版本自動清理 |

---

## Live Demo

```bash
cd fridge-helper
python -m http.server 3000
```

```
┌──────────────────────────────────────────┐
│                                          │
│     http://localhost:3000                 │
│                                          │
│     本機開啟瀏覽器即可使用                  │
│                                          │
│     ── 手機連線 ──                        │
│                                          │
│     1. 手機與電腦連接同一 WiFi             │
│     2. 開啟 http://192.168.x.x:3000       │
│     3. iOS: 分享 → 加入主畫面              │
│     4. Android: 選單 → 安裝應用程式        │
│                                          │
└──────────────────────────────────────────┘
```

---

## 資料模型

```js
{
  id:           "uuid",
  name:         "高鮮鮮奶",
  category:     "dairy",
  addedDate:    "2026-06-20",
  expireDate:   "2026-06-27",
  quantity:     750,
  originalQuantity: 1000,
  unitType:     "ml",
  location:     "🥛 冷藏",
  finished:     false
}
```

---

## 快速使用

1. 點右下角 **＋** 新增食材
2. 選擇類別、單位、存放位置
3. Canvas 卡片自動分類：
   - 🚨 救命呀（已過期 / 快過期）
   - 🐱 快吃我（3-5 天）
   - 🎀 安全唷（> 5 天）
   - ✔ 已完食
4. 點「吃 1 個 / 用一點 / 用 10%」逐次消耗
5. 點「全吃完」直接歸零（5 秒內可復原）

---

## 專案結構

```
VS-003_fridge-helper/
├── index.html          # 主頁面 (Canvas + Modal)
├── styles.css          # 樣式 (Apple 灰底 #F5F5F7)
├── manifest.json       # PWA 設定
├── sw.js               # Service Worker
├── README.md           # 本文件
│
├── js/
│   ├── constants.js    # CATEGORY_DEFAULT_DAYS
│   ├── model.js        # createFoodItem(name,cat,loc,qty,unit)
│   ├── storage.js      # getFoods/saveFoods/consumeFood/clearFood
│   ├── engine.js       # calculateRemainingDays/getCategorizedLists
│   ├── state.js        # FoodState.compute/color/sortOrder/label
│   ├── history.js      # recordHistory/getHistory/getFoodHistory
│   ├── metric.js       # getMetrics (savingRate, wasteItems)
│   ├── animation.js    # playJellyAnimation/triggerHeartParticles
│   ├── undo.js         # saveUndoSnapshot/showUndoToast/performUndo
│   ├── notifier.js     # initNotifier/checkAndNotify
│   ├── ui.js           # populateLocationSelect/CATEGORY_LABELS
│   ├── canvas-ui.js    # CanvasUI: init/render/draw/hitTest/spring
│   └── main.js         # DOMContentLoaded 總指揮官
│
└── Task_*.md           # 開發任務文件 (01-13)
```
