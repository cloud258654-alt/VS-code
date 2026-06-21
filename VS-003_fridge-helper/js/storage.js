const STORAGE_KEY = "fridge-foods";

function getFoods() {
  var data = localStorage.getItem(STORAGE_KEY);
  var foods = data ? JSON.parse(data) : [];
  var migrated = false;
  foods.forEach(function (f) {
    if (f.unitType === undefined) { f.unitType = "x"; migrated = true; }
    if (f.originalQuantity === undefined) { f.originalQuantity = f.quantity || 1; migrated = true; }
  });
  if (migrated) saveFoods(foods);
  return foods;
}

function saveFoods(foods) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

function addFood(food) {
  const foods = getFoods();
  foods.push(food);
  saveFoods(foods);
}

function consumeFood(id, amount) {
  var foods = getFoods();
  var item = foods.find(function (f) { return f.id === id; });
  if (!item) return null;

  var unitType = item.unitType || "x";
  if (amount === undefined) {
    if (unitType === "%") amount = 10;
    else amount = 1;
  }

  item.quantity -= amount;
  if (item.quantity <= 0) {
    item.quantity = 0;
    item.finished = true;
  }
  saveFoods(foods);
  return item;
}

function clearFood(id) {
  var foods = getFoods();
  var item = foods.find(function (f) { return f.id === id; });
  if (!item) return null;
  item.quantity = 0;
  item.finished = true;
  saveFoods(foods);
  return item;
}

function restoreFood(id) {
  var foods = getFoods();
  var item = foods.find(function (f) { return f.id === id; });
  if (!item) return null;
  item.finished = false;
  item.quantity = item.originalQuantity || item.quantity || 1;
  saveFoods(foods);
  return item;
}

var LOCATIONS_KEY = "fridge-locations";
var DEFAULT_LOCATIONS = ["🥛 冷藏", "❄ 冷凍庫", "🏠 常溫", "🪵 乾糧櫃", "🌶 調味架"];

function getLocations() {
  var data = localStorage.getItem(LOCATIONS_KEY);
  if (data) return JSON.parse(data);
  saveLocations(DEFAULT_LOCATIONS);
  return DEFAULT_LOCATIONS.slice();
}

function saveLocations(list) {
  localStorage.setItem(LOCATIONS_KEY, JSON.stringify(list));
}

function addLocation(locName) {
  var list = getLocations();
  if (list.indexOf(locName) === -1) {
    list.push(locName);
    saveLocations(list);
  }
}

function deleteLocation(locName) {
  var list = getLocations();
  var idx = list.indexOf(locName);
  if (idx !== -1) {
    list.splice(idx, 1);
    saveLocations(list);
  }
}
