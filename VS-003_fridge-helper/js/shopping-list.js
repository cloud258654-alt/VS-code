var SHOPPING_KEY = "fridge-shopping";

function getShoppingList() {
  var data = localStorage.getItem(SHOPPING_KEY);
  return data ? JSON.parse(data) : [];
}

function saveShoppingList(list) {
  localStorage.setItem(SHOPPING_KEY, JSON.stringify(list));
}

function addToShoppingList(name, source) {
  var list = getShoppingList();
  var exists = list.some(function (item) { return item.name === name && !item.completed; });
  if (exists) return null;
  var item = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
    name: name,
    addedDate: new Date().toISOString().slice(0, 10),
    completed: false,
    source: source || "manual",
  };
  list.push(item);
  saveShoppingList(list);
  return item;
}

function removeFromShoppingList(id) {
  var list = getShoppingList();
  var idx = list.findIndex(function (item) { return item.id === id; });
  if (idx === -1) return;
  list.splice(idx, 1);
  saveShoppingList(list);
}

function toggleShoppingItem(id) {
  var list = getShoppingList();
  var item = list.find(function (item) { return item.id === id; });
  if (!item) return;
  item.completed = !item.completed;
  saveShoppingList(list);
}

function clearCompletedShopping() {
  var list = getShoppingList();
  var remaining = list.filter(function (item) { return !item.completed; });
  saveShoppingList(remaining);
}

function getShoppingCount() {
  return getShoppingList().filter(function (item) { return !item.completed; }).length;
}
