function createFoodItem(name, category, location, quantity, unitType, opts) {
  var id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  var addedDate = new Date().toISOString().slice(0, 10);
  var days = CATEGORY_DEFAULT_DAYS[category] || 9999;
  var expire = new Date();
  expire.setDate(expire.getDate() + days);
  var expireDate = expire.toISOString().slice(0, 10);
  var qty = quantity || 1;
  opts = opts || {};

  return {
    id: id,
    name: name,
    category: category,
    addedDate: addedDate,
    expireDate: expireDate,
    quantity: qty,
    originalQuantity: qty,
    unitType: unitType || "x",
    location: location,
    finished: false,
    itemType: opts.itemType || "food",
    alertThreshold: opts.alertThreshold || null,
    automation: opts.automation || null,
    purchaseInfo: opts.purchaseInfo || null,
  };
}
