var HISTORY_KEY = "fridge-history";

function recordHistory(action, foodItem, details) {
  var history = getHistory();
  history.push({
    timestamp: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    action: action,
    foodId: foodItem.id,
    name: foodItem.name,
    category: foodItem.category,
    unitType: foodItem.unitType || "x",
    amount: details ? details.amount : null,
    remainingQty: foodItem.quantity,
    originalQty: foodItem.originalQuantity || foodItem.quantity,
  });
  if (history.length > 500) history = history.slice(-500);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getHistory() {
  var data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

function getFoodHistory(foodId) {
  return getHistory().filter(function (h) { return h.foodId === foodId; });
}

function getHistoryStats() {
  var history = getHistory();
  var stats = { purchased: 0, consumed: 0, wasted: 0, items: {} };
  history.forEach(function (h) {
    if (h.action === "ADD") stats.purchased++;
    if (h.action === "CONSUME") stats.consumed++;
    if (h.action === "CLEAR") {
      stats.wasted++;
      if (!stats.items[h.name]) stats.items[h.name] = 0;
      stats.items[h.name]++;
    }
  });
  return stats;
}
