function getMetrics() {
  var history = getHistory();
  var foods = getFoods();

  var stats = { totalAdded: 0, totalFinished: 0, totalWasted: 0, topFoods: {}, wasteItems: {} };

  var seenAdd = {};
  history.forEach(function (h) {
    if (h.action === "ADD" && !seenAdd[h.foodId]) {
      stats.totalAdded++;
      seenAdd[h.foodId] = true;
    }
  });

  foods.forEach(function (food) {
    if (food.finished) stats.totalFinished++;
  });

  history.forEach(function (h) {
    if (h.action === "CLEAR") {
      stats.totalWasted++;
      if (!stats.wasteItems[h.name]) stats.wasteItems[h.name] = 0;
      stats.wasteItems[h.name]++;
    }
    if (h.action === "CONSUME" && h.amount) {
      if (!stats.topFoods[h.name]) stats.topFoods[h.name] = 0;
      stats.topFoods[h.name] += h.amount;
    }
  });

  stats.savingRate = stats.totalAdded > 0 ? Math.round((stats.totalFinished / stats.totalAdded) * 100) : 100;

  return stats;
}
