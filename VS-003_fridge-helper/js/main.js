document.addEventListener("DOMContentLoaded", function () {
  CanvasUI.init("food-canvas");
  CanvasUI.render(getFoods());
  initModal();
  initLocationManager();
  initNotifier();
  registerSW();
});

function initModal() {
  var overlay = document.getElementById("modal-overlay");
  var form = document.getElementById("add-food-form");
  var categorySelect = document.getElementById("category-select");
  var expireDateInput = document.getElementById("expire-date-input");

  Object.keys(CATEGORY_DEFAULT_DAYS).forEach(function (key) {
    var option = document.createElement("option");
    option.value = key;
    option.textContent = CATEGORY_LABELS[key];
    categorySelect.appendChild(option);
  });

  function updateExpireDate() {
    var cat = categorySelect.value;
    var days = CATEGORY_DEFAULT_DAYS[cat] || 9999;
    var date = new Date();
    date.setDate(date.getDate() + days);
    expireDateInput.value = date.toISOString().slice(0, 10);
  }

  updateExpireDate();

  categorySelect.addEventListener("change", updateExpireDate);

  var unitTypeSelect = document.getElementById("unit-type-select");
  var unitLabel = document.getElementById("unit-label");
  unitTypeSelect.addEventListener("change", function () {
    unitLabel.textContent = unitTypeSelect.value === "%" ? "%" : unitTypeSelect.value;
  });

  document.getElementById("fab").addEventListener("click", function () {
    populateLocationSelect(document.getElementById("location-select"));
    overlay.classList.remove("hidden");
    updateExpireDate();
    unitLabel.textContent = unitTypeSelect.value === "%" ? "%" : unitTypeSelect.value;
  });

  document.getElementById("modal-cancel").addEventListener("click", closeModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  function closeModal() {
    overlay.classList.add("hidden");
    form.reset();
    updateExpireDate();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var food = createFoodItem(
      formData.get("name"),
      formData.get("category"),
      formData.get("location"),
      parseInt(formData.get("quantity"), 10),
      formData.get("unitType")
    );
    food.expireDate = formData.get("expireDate");
    addFood(food);
    recordHistory("ADD", food, null);
    closeModal();
    CanvasUI.render(getFoods());
  });
}

function initLocationManager() {
  var locOverlay = document.getElementById("location-modal-overlay");
  var locList = document.getElementById("location-list");
  var newLocInput = document.getElementById("new-location-input");
  var addLocBtn = document.getElementById("add-location-btn");

  document.getElementById("manage-locations-btn").addEventListener("click", function () {
    locOverlay.classList.remove("hidden");
    renderLocationList();
  });

  document.getElementById("location-modal-close").addEventListener("click", function () {
    locOverlay.classList.add("hidden");
  });

  locOverlay.addEventListener("click", function (e) {
    if (e.target === locOverlay) locOverlay.classList.add("hidden");
  });

  addLocBtn.addEventListener("click", function () {
    var name = newLocInput.value.trim();
    if (!name) return;
    addLocation(name);
    newLocInput.value = "";
    renderLocationList();
    populateLocationSelect(document.getElementById("location-select"));
  });

  function renderLocationList() {
    locList.innerHTML = "";
    var locations = getLocations();
    locations.forEach(function (loc) {
      var li = document.createElement("li");
      li.className = "flex items-center justify-between bg-pink-50 rounded-xl px-3 py-2";
      var span = document.createElement("span");
      span.className = "text-sm text-gray-700";
      span.textContent = loc;
      li.appendChild(span);
      var delBtn = document.createElement("button");
      delBtn.className = "text-red-400 text-xs hover:text-red-600";
      delBtn.textContent = "❌ 刪除";
      delBtn.addEventListener("click", function () {
        deleteLocation(loc);
        renderLocationList();
        populateLocationSelect(document.getElementById("location-select"));
      });
      li.appendChild(delBtn);
      locList.appendChild(li);
    });
  }
}

function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      console.log("SW registered:", reg.scope);
    }).catch(function (err) {
      console.log("SW failed:", err);
    });
  }
}
