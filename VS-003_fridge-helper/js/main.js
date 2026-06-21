var currentTab = "fridge";

document.addEventListener("DOMContentLoaded", function () {
  CanvasUI.init("food-canvas");
  CanvasUI.render(getFoods());
  initModal();
  initLocationManager();
  initTabNavigation();
  initCategorySwitch();
  initAutoCart();
  initShoppingTab();
  initSettingsPage();
  updateStatsBar(getFoods());
  initNotifier();
  registerSW();
});

// --- Tab Navigation ---

function initTabNavigation() {
  document.querySelectorAll("#bottom-nav .nav-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(this.dataset.tab);
    });
  });
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab-page").forEach(function (p) { p.classList.add("hidden"); });
  document.getElementById("tab-" + tab).classList.remove("hidden");

  document.querySelectorAll("#bottom-nav .nav-tab").forEach(function (b) { b.classList.remove("active"); });
  document.querySelector('[data-tab="' + tab + '"]').classList.add("active");

  var stats = document.getElementById("stats-bar");
  var fab = document.getElementById("fab");

  if (tab === "fridge") {
    stats.classList.remove("hidden");
    fab.classList.remove("hidden");
    CanvasUI.resize();
  } else if (tab === "shopping") {
    stats.classList.add("hidden");
    fab.classList.add("hidden");
    renderShoppingTab();
  } else {
    stats.classList.add("hidden");
    fab.classList.add("hidden");
  }
}

// --- Stats Bar ---

function updateStatsBar(foods) {
  var activeFoods = foods.filter(function (f) { return !f.finished; });
  var urgent = 0;
  activeFoods.forEach(function (f) {
    var days = calculateRemainingDays(f.expireDate);
    if (days <= 2) urgent++;
  });
  var safe = activeFoods.length - urgent;

  document.getElementById("stat-total").textContent = activeFoods.length;
  document.getElementById("stat-urgent").textContent = urgent;
  document.getElementById("stat-safe").textContent = safe;

  var statsBar = document.getElementById("stats-bar");
  if (activeFoods.length === 0) statsBar.classList.add("hidden");
  else statsBar.classList.remove("hidden");
}

// --- Add Food Modal ---

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

  // Natural language date parsing
  expireDateInput.addEventListener("blur", function () {
    var parsed = parseNaturalDate(expireDateInput.value);
    if (parsed) expireDateInput.value = parsed;
  });

  document.getElementById("modal-cancel").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });

  function closeModal() {
    overlay.classList.add("hidden");
    form.reset();
    updateExpireDate();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var food = createFoodItem(
      formData.get("name"), formData.get("category"), formData.get("location"),
      parseInt(formData.get("quantity"), 10), formData.get("unitType")
    );
    food.expireDate = formData.get("expireDate");
    addFood(food);
    recordHistory("ADD", food, null);
    closeModal();
    CanvasUI.render(getFoods());
    updateStatsBar(getFoods());
  });
}

// --- Location Manager ---

function initLocationManager() {
  var locOverlay = document.getElementById("location-modal-overlay");
  var locList = document.getElementById("location-list");
  var newLocInput = document.getElementById("new-location-input");
  var addLocBtn = document.getElementById("add-location-btn");

  function openLocationManager() {
    locOverlay.classList.remove("hidden");
    renderLocationList();
  }

  document.getElementById("location-modal-close").addEventListener("click", function () { locOverlay.classList.add("hidden"); });
  locOverlay.addEventListener("click", function (e) { if (e.target === locOverlay) locOverlay.classList.add("hidden"); });

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
    getLocations().forEach(function (loc) {
      var li = document.createElement("li");
      li.className = "flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2";
      var span = document.createElement("span");
      span.className = "text-sm text-[#1D1D1F]";
      span.textContent = loc;
      li.appendChild(span);
      var delBtn = document.createElement("button");
      delBtn.className = "text-gray-400 text-xs hover:text-red-400";
      delBtn.textContent = "\u2715";
      delBtn.addEventListener("click", function () {
        deleteLocation(loc);
        renderLocationList();
        populateLocationSelect(document.getElementById("location-select"));
      });
      li.appendChild(delBtn);
      locList.appendChild(li);
    });
  }

  // Wire up settings page button
  document.getElementById("btn-manage-locations").addEventListener("click", openLocationManager);
}

// --- Shopping Tab (inline) ---

function initShoppingTab() {
  document.getElementById("shop-add-inline").addEventListener("click", function () {
    var name = document.getElementById("shop-input-inline").value.trim();
    if (!name) return;
    addToShoppingList(name, "manual");
    document.getElementById("shop-input-inline").value = "";
    renderShoppingTab();
  });

  document.getElementById("shop-clear-inline").addEventListener("click", function () {
    clearCompletedShopping();
    renderShoppingTab();
  });
}

function renderShoppingTab() {
  var list = document.getElementById("shop-list-inline");
  var clearBtn = document.getElementById("shop-clear-inline");
  list.innerHTML = "";
  var items = getShoppingList();
  var hasCompleted = false;

  items.forEach(function (item) {
    if (item.completed) hasCompleted = true;
    var li = document.createElement("li");
    li.className = "flex items-center gap-3 glass-card rounded-2xl px-4 py-3";

    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = item.completed;
    cb.className = "w-6 h-6 accent-[#34C759] shrink-0 rounded";
    cb.addEventListener("change", function () {
      toggleShoppingItem(item.id);
      renderShoppingTab();
      updateShoppingBadge();
    });

    var div = document.createElement("div");
    div.className = "flex-1 min-w-0";
    var nameSpan = document.createElement("div");
    nameSpan.className = "text-base text-[#1D1D1F]" + (item.completed ? " line-through text-gray-400" : "");
    nameSpan.textContent = item.name;
    div.appendChild(nameSpan);
    var srcSpan = document.createElement("div");
    srcSpan.className = "text-sm text-[#86868B]";
    srcSpan.textContent = item.source === "auto" ? "用完自動加入" : "手動加入";
    div.appendChild(srcSpan);

    var delBtn = document.createElement("button");
    delBtn.className = "text-gray-300 hover:text-red-400 shrink-0 text-xl";
    delBtn.textContent = "\u2715";
    delBtn.addEventListener("click", function () {
      removeFromShoppingList(item.id);
      renderShoppingTab();
      updateShoppingBadge();
    });

    li.appendChild(cb);
    li.appendChild(div);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  clearBtn.classList.toggle("hidden", !hasCompleted);
  updateShoppingBadge();
}

// --- Settings Page ---

function initSettingsPage() {
  document.getElementById("btn-clear-data").addEventListener("click", function () {
    if (confirm("確定要清除所有食材與購物清單嗎？此操作無法復原。")) {
      localStorage.removeItem("fridge-foods");
      localStorage.removeItem("fridge-shopping");
      localStorage.removeItem("fridge-history");
      CanvasUI.render([]);
      updateStatsBar([]);
      renderShoppingTab();
      switchTab("fridge");
    }
  });

  document.getElementById("btn-export-data").addEventListener("click", function () {
    var data = {
      foods: getFoods(),
      shopping: getShoppingList(),
      history: getHistory(),
      locations: getLocations(),
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "fridge-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("btn-import-data").addEventListener("click", function () {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", function () {
      var file = input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          if (data.foods) saveFoods(data.foods);
          if (data.shopping) saveShoppingList(data.shopping);
          if (data.locations) saveLocations(data.locations);
          CanvasUI.render(getFoods());
          updateStatsBar(getFoods());
          alert("資料匯入成功！");
        } catch (err) {
          alert("檔案格式錯誤，無法匯入。");
        }
      };
      reader.readAsText(file);
    });
    input.click();
  });
}

// --- Shopping Badge ---

function updateShoppingBadge() {
  var count = getShoppingCount();
  var badge = document.getElementById("nav-shop-badge");
  if (count > 0) {
    badge.textContent = count > 99 ? "99+" : count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// --- Service Worker ---

function parseNaturalDate(input) {
  if (!input || typeof input !== "string") return null;
  var s = input.trim();
  if (!s) return null;

  // Direct date format: YYYY-MM-DD or MM/DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{1,2}\/\d{1,2}$/.test(s)) {
    var parts = s.split("/");
    var now = new Date();
    var m = parseInt(parts[0], 10);
    var d = parseInt(parts[1], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      var year = now.getFullYear();
      if (m < now.getMonth() + 1 || (m === now.getMonth() + 1 && d < now.getDate())) year++;
      return year + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    }
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Chinese natural language
  if (s === "明天" || s === "明日") {
    var d = new Date(today); d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  if (s === "後天" || s === "後日") {
    var d = new Date(today); d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  }
  if (s === "今天" || s === "今日") {
    return today.toISOString().slice(0, 10);
  }

  // N天後 / N days
  var match = s.match(/^(\d+)\s*天[後后]$/);
  if (match) {
    var d = new Date(today); d.setDate(d.getDate() + parseInt(match[1], 10));
    return d.toISOString().slice(0, 10);
  }

  // Weekday: 下週X / 下周X
  var weekMap = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "日": 0, "天": 0 };
  match = s.match(/^下[週周]([一二三四五六日天])$/);
  if (match) {
    var targetDay = weekMap[match[1]];
    var d = new Date(today);
    var currentDay = d.getDay();
    var daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    d.setDate(d.getDate() + daysUntil);
    return d.toISOString().slice(0, 10);
  }

  // English: tomorrow, today, N days
  if (s.toLowerCase() === "tomorrow") {
    var d = new Date(today); d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }
  if (s.toLowerCase() === "today") return today.toISOString().slice(0, 10);
  match = s.match(/^(\d+)\s*days?$/i);
  if (match) {
    var d = new Date(today); d.setDate(d.getDate() + parseInt(match[1], 10));
    return d.toISOString().slice(0, 10);
  }

  return null;
}

function initCategorySwitch() {
  var foodBtn = document.getElementById("tab-food-btn");
  var consBtn = document.getElementById("tab-consumable-btn");
  var statsBar = document.getElementById("stats-bar");

  foodBtn.addEventListener("click", function () {
    foodBtn.classList.add("active");
    consBtn.classList.remove("active");
    CanvasUI.activeCategory = "food";
    statsBar.classList.remove("hidden");
    CanvasUI.render(getFoods());
  });

  consBtn.addEventListener("click", function () {
    consBtn.classList.add("active");
    foodBtn.classList.remove("active");
    CanvasUI.activeCategory = "consumable";
    statsBar.classList.add("hidden");
    CanvasUI.render(getFoods());
  });
}

function initAutoCart() {
  var cartBtn = document.getElementById("auto-cart-btn");
  var badge = document.getElementById("auto-cart-badge");
  var overlay = document.getElementById("purchase-overlay");
  var list = document.getElementById("purchase-list");

  document.getElementById("purchase-close").addEventListener("click", function () {
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.classList.add("hidden");
  });

  document.getElementById("purchase-go").addEventListener("click", function () {
    // Go to first item's purchase URL
    var items = getFoods().filter(function (f) {
      return (f.itemType || "food") === "consumable" && f.finished && f.purchaseInfo && f.purchaseInfo.purchaseUrl;
    });
    if (items.length > 0) {
      window.open(items[0].purchaseInfo.purchaseUrl, "_blank");
    }
    overlay.classList.add("hidden");
  });

  cartBtn.addEventListener("click", function () {
    renderCartList();
    overlay.classList.remove("hidden");
  });

  function renderCartList() {
    list.innerHTML = "";
    var finished = getFoods().filter(function (f) {
      return (f.itemType || "food") === "consumable" && f.finished && f.purchaseInfo;
    });
    if (finished.length === 0) {
      var li = document.createElement("li");
      li.className = "text-sm text-[#86868B] text-center py-4";
      li.textContent = "尚無待採購項目";
      list.appendChild(li);
    }
    finished.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2";
      var span = document.createElement("span");
      span.className = "flex-1 text-sm text-[#1D1D1F]";
      span.textContent = item.name + (item.purchaseInfo.modelNumber ? " (" + item.purchaseInfo.modelNumber + ")" : "");
      li.appendChild(span);
      list.appendChild(li);
    });
    badge.textContent = finished.length || "0";
    badge.classList.toggle("hidden", finished.length === 0);
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
