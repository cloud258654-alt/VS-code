var FoodState = {
  SAFE: "SAFE",
  WARNING: "WARNING",
  URGENT: "URGENT",
  EXPIRED: "EXPIRED",
  COMPLETED: "COMPLETED",
};

FoodState.compute = function (food) {
  if (food.finished) return FoodState.COMPLETED;
  var days = calculateRemainingDays(food.expireDate);
  if (days < 0) return FoodState.EXPIRED;
  if (days <= 2) return FoodState.URGENT;
  if (days <= 5) return FoodState.WARNING;
  return FoodState.SAFE;
};

FoodState.color = function (state) {
  var map = {};
  map[FoodState.EXPIRED] = "#FF3B30";
  map[FoodState.URGENT] = "#FF3B30";
  map[FoodState.WARNING] = "#FF9500";
  map[FoodState.SAFE] = "#34C759";
  map[FoodState.COMPLETED] = "#86868B";
  return map[state] || "#86868B";
};

FoodState.sortOrder = function (state) {
  var map = {};
  map[FoodState.EXPIRED] = 0;
  map[FoodState.URGENT] = 1;
  map[FoodState.WARNING] = 2;
  map[FoodState.SAFE] = 3;
  map[FoodState.COMPLETED] = 4;
  return map[state] || 99;
};

FoodState.label = function (state) {
  var map = {};
  map[FoodState.EXPIRED] = "已過期";
  map[FoodState.URGENT] = "快過期";
  map[FoodState.WARNING] = "快吃我";
  map[FoodState.SAFE] = "安全";
  map[FoodState.COMPLETED] = "已完食";
  return map[state] || "";
};
