var UNDO_TIMEOUT = null;
var UNDO_SNAPSHOT = null;

function saveUndoSnapshot(foodItem) {
  UNDO_SNAPSHOT = {
    id: foodItem.id,
    name: foodItem.name,
    quantity: foodItem.quantity,
    originalQuantity: foodItem.originalQuantity,
    unitType: foodItem.unitType,
    finished: foodItem.finished,
    category: foodItem.category,
    addedDate: foodItem.addedDate,
    expireDate: foodItem.expireDate,
    location: foodItem.location,
  };
}

function showUndoToast(name) {
  var existing = document.getElementById("undo-toast");
  if (existing) existing.remove();

  clearTimeout(UNDO_TIMEOUT);

  var toast = document.createElement("div");
  toast.id = "undo-toast";
  toast.className = "fixed bottom-24 left-4 right-4 max-w-md mx-auto bg-[#1D1D1F] text-white rounded-2xl px-5 py-3 shadow-xl z-[80] flex items-center justify-between";
  toast.style.fontFamily = "-apple-system, sans-serif";

  var msg = document.createElement("span");
  msg.className = "text-sm";
  msg.textContent = name + " 已完食";

  var undoBtn = document.createElement("button");
  undoBtn.className = "text-[#007AFF] text-sm font-semibold ml-3 shrink-0";
  undoBtn.textContent = "復原";

  toast.appendChild(msg);
  toast.appendChild(undoBtn);
  document.body.appendChild(toast);

  undoBtn.addEventListener("click", function () {
    performUndo();
    toast.remove();
  });

  UNDO_TIMEOUT = setTimeout(function () {
    toast.remove();
    UNDO_SNAPSHOT = null;
  }, 5000);
}

function performUndo() {
  if (!UNDO_SNAPSHOT) return;
  var snap = UNDO_SNAPSHOT;
  UNDO_SNAPSHOT = null;
  clearTimeout(UNDO_TIMEOUT);

  var foods = getFoods();
  var existing = foods.find(function (f) { return f.id === snap.id; });
  if (existing) {
    // Restore in-place
    existing.finished = false;
    existing.quantity = snap.quantity;
    saveFoods(foods);
  } else {
    // Re-add the deleted item
    foods.push({
      id: snap.id,
      name: snap.name,
      category: snap.category,
      addedDate: snap.addedDate,
      expireDate: snap.expireDate,
      quantity: snap.quantity,
      originalQuantity: snap.originalQuantity,
      unitType: snap.unitType,
      location: snap.location,
      finished: false,
    });
    saveFoods(foods);
  }
  CanvasUI.render(getFoods());
}

function hasUndoSnapshot() { return UNDO_SNAPSHOT !== null; }
