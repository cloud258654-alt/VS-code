var CanvasUI = {};

CanvasUI.dpr = 1;
CanvasUI.canvas = null;
CanvasUI.ctx = null;
CanvasUI.width = 0;
CanvasUI.height = 0;
CanvasUI.foods = [];
CanvasUI.animCards = [];
CanvasUI.rafId = 0;
CanvasUI.needRedraw = true;
CanvasUI.cardLayouts = [];
CanvasUI.progressAnims = {};
CanvasUI.bannerMsg = "";
CanvasUI.sortMode = "expiry";
CanvasUI.activeCategory = "food";
CanvasUI.crossFade = 1;
CanvasUI.crossFadeTarget = 1;
CanvasUI.swipeStartX = 0;
CanvasUI.swipeStartY = 0;
CanvasUI.swipeLayout = null;
CanvasUI.swipeOffset = 0;

CanvasUI.COLORS = {
  bg: "#F2F2F7",
  card: "rgba(255,255,255,0.72)",
  cardBorder: "rgba(255,255,255,0.9)",
  text: "#1D1D1F",
  sub: "#86868B",
  line: "#E5E5EA",
  red: "#FF3B30",
  orange: "#FF9500",
  green: "#34C759",
  blue: "#007AFF",
  btnBg: "rgba(255,255,255,0.5)",
  btnClearBg: "rgba(255,59,48,0.10)",
  btnClearText: "#FF3B30",
};

CanvasUI.ICONS = {
  meat: "\uD83E\uDD69", dairy: "\uD83E\uDD5B", vegetable: "\uD83E\uDD66", fruit: "\uD83C\uDF4E", frozen: "\u2744\uFE0F", pantry: "\uD83C\uDFE0",
};

CanvasUI.SECTION_LABELS = {
  urgent: "救命呀",
  warning: "快吃我",
  safe: "安全唷",
  completed: "已完食",
};

CanvasUI.SECTION_COLORS = {
  urgent: "#FF3B30",
  warning: "#FF9500",
  safe: "#34C759",
  completed: "#86868B",
};

CanvasUI.CONSUMABLE_LABELS = {
  replace: "立刻更換",
  attention: "壽命將盡",
  healthy: "運作良好",
  backups: "庫存備品",
};

CanvasUI.init = function (canvasId) {
  CanvasUI.canvas = document.getElementById(canvasId);
  CanvasUI.ctx = CanvasUI.canvas.getContext("2d");
  CanvasUI.dpr = window.devicePixelRatio || 1;

  CanvasUI.canvas.addEventListener("click", CanvasUI.onClick);
  CanvasUI.canvas.addEventListener("touchstart", CanvasUI.onTouchStart, { passive: false });
  CanvasUI.canvas.addEventListener("touchmove", CanvasUI.onTouchMove, { passive: false });
  CanvasUI.canvas.addEventListener("touchend", CanvasUI.onTouchEnd);

  CanvasUI.resize();
  window.addEventListener("resize", CanvasUI.resize);
  CanvasUI.animationLoop();
};

CanvasUI.resize = function () {
  var w = CanvasUI.canvas.parentElement.clientWidth;
  CanvasUI.width = w;
  CanvasUI.canvas.style.width = w + "px";
  CanvasUI.canvas.width = w * CanvasUI.dpr;
  CanvasUI.ctx.setTransform(CanvasUI.dpr, 0, 0, CanvasUI.dpr, 0, 0);
  if (CanvasUI.foods.length) CanvasUI.computeLayout();
  CanvasUI.needRedraw = true;
};

CanvasUI.render = function (foods) {
  CanvasUI.foods = foods;
  CanvasUI.crossFade = 0.3;
  CanvasUI.crossFadeTarget = 1;
  CanvasUI.computeLayout();
  CanvasUI.needRedraw = true;
  updateAutoCartBadge(foods);
};

CanvasUI.sortByName = function (items) {
  return items.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
};

function updateAutoCartBadge(foods) {
  var btn = document.getElementById("auto-cart-btn");
  var badge = document.getElementById("auto-cart-badge");
  if (!btn || !badge) return;
  var finished = foods.filter(function (f) {
    return (f.itemType || "food") === "consumable" && f.finished && f.purchaseInfo && f.purchaseInfo.purchaseUrl;
  });
  if (finished.length > 0) {
    btn.classList.remove("hidden");
    badge.textContent = finished.length;
    badge.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
    badge.classList.add("hidden");
  }
}

CanvasUI.computeLayout = function () {
  var allItems = CanvasUI.foods;
  var isConsumable = CanvasUI.activeCategory === "consumable";

  // Filter by itemType
  var filtered = allItems.filter(function (f) {
    if (isConsumable) return (f.itemType || "food") === "consumable";
    return (f.itemType || "food") === "food";
  });

  var sections;
  if (isConsumable) {
    // Consumable categorization
    var replaceNow = [];
    var attention = [];
    var healthy = [];
    var backups = [];
    filtered.forEach(function (item) {
      if (item.finished) { backups.push(item); return; }
      if (item.unitType === "days") {
        var remaining = item.quantity;
        var threshold = item.alertThreshold || 14;
        if (remaining <= 0) replaceNow.push(item);
        else if (remaining <= threshold) attention.push(item);
        else healthy.push(item);
      } else {
        // x unit type: count-based
        var threshold = item.alertThreshold || 3;
        if (item.quantity <= 0) replaceNow.push(item);
        else if (item.quantity <= threshold) attention.push(item);
        else healthy.push(item);
      }
    });
    var sortFn = function (a, b) { return a.name.localeCompare(b.name); };
    sections = [
      { key: "replace", items: replaceNow.sort(sortFn) },
      { key: "attention", items: attention.sort(sortFn) },
      { key: "healthy", items: healthy.sort(sortFn) },
      { key: "backups", items: backups.sort(sortFn) },
    ];
  } else {
    // Food categorization (original logic)
    var lists = getCategorizedLists(filtered);
    var urgent = lists.expired.concat(lists.danger).sort(function (a, b) {
      return a.expireDate.localeCompare(b.expireDate);
    });
    sections = [
      { key: "urgent", items: CanvasUI.sortMode === "expiry" ? urgent : CanvasUI.sortByName(urgent) },
      { key: "warning", items: CanvasUI.sortMode === "expiry" ? lists.warning : CanvasUI.sortByName(lists.warning) },
      { key: "safe", items: CanvasUI.sortMode === "expiry" ? lists.safe : CanvasUI.sortByName(lists.safe) },
      { key: "completed", items: CanvasUI.sortMode === "expiry" ? lists.completed : CanvasUI.sortByName(lists.completed) },
    ];
  }

  var w = CanvasUI.width;
  var pad = 16;
  var cardW = w - pad * 2;
  var cardH = 108;
  var sectionHeaderH = 46;
  var gap = 10;
  var y = 8;

  CanvasUI.bannerMsg = lists.danger.length > 0 ? "今天有 " + lists.danger.length + " 項食材快過期囉！" : "";
  if (CanvasUI.bannerMsg) y += 30;

  CanvasUI.cardLayouts = [];

  sections.forEach(function (sec) {
    CanvasUI.cardLayouts.push({ isHeader: true, section: sec.key, y: y, count: sec.items.length });
    y += sectionHeaderH;
    sec.items.forEach(function (food) {
      var layout = {
        food: food,
        section: sec.key,
        x: pad,
        y: y,
        w: cardW,
        h: cardH,
        btnA: null,
        btnB: null,
      };
      if (!food.finished) {
        layout.btnA = { x: cardW - 114, y: y + cardH - 44, w: 52, h: 38, type: "consume" };
        layout.btnB = { x: cardW - 56, y: y + cardH - 44, w: 48, h: 38, type: "clear" };
      } else {
        layout.btnRestore = { x: cardW - 56, y: y + cardH / 2 - 16, w: 44, h: 32, type: "restore" };
      }
      CanvasUI.cardLayouts.push(layout);
      y += cardH + gap;
    });
    y += 8;
  });

  CanvasUI.height = y + 80;
  CanvasUI.canvas.style.height = CanvasUI.height + "px";
  CanvasUI.canvas.height = CanvasUI.height * CanvasUI.dpr;
  CanvasUI.ctx.setTransform(CanvasUI.dpr, 0, 0, CanvasUI.dpr, 0, 0);

  CanvasUI.animCards = CanvasUI.animCards.filter(function (ac) {
    return !CanvasUI.foods.some(function (f) { return f.id === ac.id && !f.finished; });
  });
};

CanvasUI.draw = function () {
  var ctx = CanvasUI.ctx;
  var w = CanvasUI.width;
  ctx.clearRect(0, 0, w, CanvasUI.height);

  // Cross-fade animation
  CanvasUI.crossFade += (CanvasUI.crossFadeTarget - CanvasUI.crossFade) * 0.15;
  if (Math.abs(CanvasUI.crossFadeTarget - CanvasUI.crossFade) < 0.002) CanvasUI.crossFade = CanvasUI.crossFadeTarget;

  ctx.globalAlpha = CanvasUI.crossFade;

  // Empty state
  if (CanvasUI.cardLayouts.length === 0 || CanvasUI.foods.length === 0) {
    CanvasUI.drawEmptyState(ctx, w);
    return;
  }

  // Sort toggle button
  ctx.save();
  var sortText = CanvasUI.sortMode === "expiry" ? "\u2191 \u5230\u671F\u65E5" : "\u2191 \u540D\u7A31";
  ctx.font = "14px -apple-system, sans-serif";
  var sortW = ctx.measureText(sortText).width + 20;
  var sortX = w - sortW - 16;
  var sortY = 4;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 0.5;
  CanvasUI.roundRect(ctx, sortX, sortY, sortW, 32, 16);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(sortText, sortX + sortW / 2, sortY + 11);
  ctx.restore();
  CanvasUI.sortBtnRect = { x: sortX, y: sortY, w: sortW, h: 32 };

  // Banner
  if (CanvasUI.bannerMsg) {
    ctx.save();
    ctx.fillStyle = "rgba(255,59,48,0.06)";
    CanvasUI.roundRect(ctx, 16, 4, w - 32, 26, 8);
    ctx.fill();
    ctx.fillStyle = CanvasUI.COLORS.red;
    ctx.font = "12px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(CanvasUI.bannerMsg, w / 2, 18);
    ctx.restore();
  }

  CanvasUI.cardLayouts.forEach(function (layout) {
    if (layout.isHeader) {
      CanvasUI.drawSectionHeader(ctx, layout);
    } else {
      // Apply swipe offset
      if (CanvasUI.swipeLayout === layout && CanvasUI.swipeOffset !== 0) {
        ctx.save();
        ctx.translate(CanvasUI.swipeOffset, 0);
        ctx.globalAlpha = 1 - Math.abs(CanvasUI.swipeOffset) / 200;
        CanvasUI.drawCard(ctx, layout);
        ctx.restore();

        // Swipe hint background
        if (CanvasUI.swipeOffset > 30) {
          ctx.fillStyle = "rgba(52,199,89,0.15)";
          CanvasUI.roundRect(ctx, layout.x, layout.y, layout.w, layout.h, 18);
          ctx.fill();
        } else if (CanvasUI.swipeOffset < -30) {
          ctx.fillStyle = "rgba(255,59,48,0.15)";
          CanvasUI.roundRect(ctx, layout.x, layout.y, layout.w, layout.h, 18);
          ctx.fill();
        }
      } else {
        CanvasUI.drawCard(ctx, layout);
      }
    }
  });

  CanvasUI.animCards.forEach(function (ac) {
    CanvasUI.drawSpringCard(ctx, ac);
  });

  if (typeof updateStatsBar === "function") updateStatsBar(CanvasUI.foods);
};

CanvasUI.drawSectionHeader = function (ctx, layout) {
  var secColor = CanvasUI.SECTION_COLORS[layout.section] || CanvasUI.COLORS.line;
  var isConsumable = CanvasUI.activeCategory === "consumable";
  var title;
  if (isConsumable) {
    title = CanvasUI.CONSUMABLE_LABELS[layout.section] || layout.section;
  } else {
    title = CanvasUI.SECTION_LABELS[layout.section] || "";
  }
  var fullTitle = title + (layout.count ? " · " + layout.count : "");

  ctx.save();
  ctx.fillStyle = CanvasUI.COLORS.text;
  ctx.font = "600 17px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(fullTitle, 20, layout.y + 22);

  ctx.fillStyle = secColor;
  ctx.beginPath();
  ctx.arc(20, layout.y + 22, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

CanvasUI.drawCard = function (ctx, layout) {
  var food = layout.food;
  var isConsumable = (food.itemType || "food") === "consumable";
  if (isConsumable) { CanvasUI.drawConsumableCard(ctx, layout); return; }
  var x = layout.x;
  var y = layout.y;
  var cw = layout.w;
  var ch = layout.h;
  var unitType = food.unitType || "x";
  var secColor = CanvasUI.SECTION_COLORS[layout.section] || CanvasUI.COLORS.line;
  var catIcon = CanvasUI.ICONS[food.category] || "\uD83C\uDF4E";

  ctx.save();

  // Card background with glass shadow
  ctx.shadowColor = "rgba(0,0,0,0.06)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = CanvasUI.COLORS.card;
  CanvasUI.roundRect(ctx, x, y, cw, ch, 20);
  ctx.fill();
  // Inner border for glass effect
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = CanvasUI.COLORS.cardBorder;
  ctx.lineWidth = 0.5;
  CanvasUI.roundRect(ctx, x, y, cw, ch, 20);
  ctx.stroke();

  // Left accent dot with glow
  if (layout.section !== "completed") {
    var glow = ctx.createRadialGradient(x + 14, y + ch / 2, 1, x + 14, y + ch / 2, 8);
    glow.addColorStop(0, secColor);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x + 14, y + ch / 2, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Category icon
  ctx.font = "30px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(catIcon, x + 46, y + ch / 2);

  var leftX = x + 72;
  var rightEdge = food.finished ? cw - 16 : cw - 128;

  // Food name
  ctx.textAlign = "left";
  ctx.fillStyle = food.finished ? CanvasUI.COLORS.sub : CanvasUI.COLORS.text;
  ctx.font = "600 20px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textBaseline = "top";
  CanvasUI.clipText(ctx, food.name, rightEdge - leftX, leftX, y + 16);

  // Subtitle: quantity + location
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.font = "15px -apple-system, sans-serif";
  var subText = "";
  if (unitType === "x") {
    subText = food.quantity > 1 ? "x" + food.quantity : "";
  } else {
    var oq = food.originalQuantity || food.quantity;
    var ul = unitType === "ml" ? "ml" : unitType === "g" ? "g" : "%";
    subText = food.quantity + " / " + oq + " " + ul;
  }
  if (subText) {
    ctx.fillText(subText, leftX, y + 42);
  }

  // Location
  ctx.fillText(food.location, leftX, y + 64);

  // Progress bar
  if (!food.finished && unitType !== "x" && unitType !== "%") {
    var oq = food.originalQuantity || food.quantity;
    var progKey = food.id;
    if (CanvasUI.progressAnims[progKey] === undefined) {
      CanvasUI.progressAnims[progKey] = food.quantity / oq;
    }
    var target = food.quantity / oq;
    var current = CanvasUI.progressAnims[progKey];
    current += (target - current) * 0.15;
    if (Math.abs(target - current) < 0.001) current = target;
    CanvasUI.progressAnims[progKey] = current;
    var barW = rightEdge - leftX;
    var barY = y + ch - 10;
    var barH = 4;
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    CanvasUI.roundRect(ctx, leftX, barY, barW, barH, 2);
    ctx.fill();
    ctx.fillStyle = secColor;
    CanvasUI.roundRect(ctx, leftX, barY, barW * current, barH, 2);
    ctx.fill();

    // Progress percentage text
    ctx.fillStyle = CanvasUI.COLORS.sub;
    ctx.font = "12px -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(current * 100) + "%", leftX + barW, barY - 4);
    ctx.textAlign = "left";
  }

  // Days badge
  if (!food.finished) {
    var days = calculateRemainingDays(food.expireDate);
    var badgeText;
    if (days < 0) badgeText = "\u5DF2\u904E\u671F";
    else if (days === 0) badgeText = "\u4ECA\u5929\u5230\u671F";
    else badgeText = days + "\u5929\u5F8C";
    var metric = ctx.measureText(badgeText);
    var badgeW = metric.width + 16;
    var badgeH = 22;
    var badgeX = x + cw - badgeW - 12;
    var badgeY = y + 12;

    ctx.fillStyle = days <= 2 ? "rgba(255,59,48,0.10)" : days <= 5 ? "rgba(255,149,0,0.10)" : "rgba(52,199,89,0.10)";
    CanvasUI.roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
    ctx.fill();
    ctx.fillStyle = days <= 2 ? "#FF3B30" : days <= 5 ? "#FF9500" : "#34C759";
    ctx.font = "600 13px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2);
  }

  // Buttons
  ctx.textAlign = "center";
  if (!food.finished && layout.btnA && layout.btnB) {
    // Consume button
    ctx.fillStyle = CanvasUI.COLORS.btnBg;
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 0.5;
    CanvasUI.roundRect(ctx, layout.btnA.x, layout.btnA.y, layout.btnA.w, layout.btnA.h, 19);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = CanvasUI.COLORS.blue;
    ctx.font = "20px -apple-system, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText("\u2212", layout.btnA.x + layout.btnA.w / 2, layout.btnA.y + layout.btnA.h / 2);

    // Clear button
    ctx.fillStyle = CanvasUI.COLORS.btnClearBg;
    ctx.strokeStyle = "rgba(255,59,48,0.15)";
    CanvasUI.roundRect(ctx, layout.btnB.x, layout.btnB.y, layout.btnB.w, layout.btnB.h, 19);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = CanvasUI.COLORS.btnClearText;
    ctx.font = "20px -apple-system, sans-serif";
    ctx.fillText("\u2713", layout.btnB.x + layout.btnB.w / 2, layout.btnB.y + layout.btnB.h / 2);
  }

  // Restore button for completed
  if (food.finished && layout.btnRestore) {
    ctx.fillStyle = "rgba(0,122,255,0.10)";
    ctx.strokeStyle = "rgba(0,122,255,0.15)";
    ctx.lineWidth = 0.5;
    CanvasUI.roundRect(ctx, layout.btnRestore.x, layout.btnRestore.y, layout.btnRestore.w, layout.btnRestore.h, 16);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = CanvasUI.COLORS.blue;
    ctx.font = "20px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\u21A9", layout.btnRestore.x + layout.btnRestore.w / 2, layout.btnRestore.y + layout.btnRestore.h / 2);
  }

  ctx.restore();
};

CanvasUI.drawConsumableCard = function (ctx, layout) {
  var item = layout.food;
  var x = layout.x, y = layout.y, cw = layout.w, ch = layout.h;
  var isBackup = item.finished;
  var isDays = item.unitType === "days";
  var secColor = CanvasUI.SECTION_COLORS[layout.section] || CanvasUI.COLORS.line;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.06)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = CanvasUI.COLORS.card;
  CanvasUI.roundRect(ctx, x, y, cw, ch, 20);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = CanvasUI.COLORS.cardBorder;
  ctx.lineWidth = 0.5;
  CanvasUI.roundRect(ctx, x, y, cw, ch, 20);
  ctx.stroke();

  var glow = ctx.createRadialGradient(x + 14, y + ch / 2, 1, x + 14, y + ch / 2, 8);
  glow.addColorStop(0, secColor);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x + 14, y + ch / 2, 8, 0, Math.PI * 2);
  ctx.fill();

  // Icon
  ctx.font = "30px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("\u2699\uFE0F", x + 46, y + ch / 2);

  var leftX = x + 72;
  var rightEdge = cw - (isBackup ? 16 : 128);

  // Name
  ctx.textAlign = "left";
  ctx.fillStyle = isBackup ? CanvasUI.COLORS.sub : CanvasUI.COLORS.text;
  ctx.font = "600 20px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textBaseline = "top";
  CanvasUI.clipText(ctx, item.name, rightEdge - leftX, leftX, y + 16);

  // Status info
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.font = "15px -apple-system, sans-serif";
  if (isDays) {
    ctx.fillText("剩餘 " + item.quantity + " / " + (item.originalQuantity || item.quantity) + " 天", leftX, y + 42);
    ctx.fillText("預警門檻：" + (item.alertThreshold || 14) + " 天", leftX, y + 64);
  } else {
    ctx.fillText("備品 x" + item.quantity, leftX, y + 42);
    ctx.fillText("低於 " + (item.alertThreshold || 3) + " 提醒", leftX, y + 64);
  }

  // Location
  ctx.fillText(item.location, leftX, y + 82);

  // Progress bar for days type
  if (!isBackup && isDays) {
    var oq = item.originalQuantity || item.quantity;
    var barW = rightEdge - leftX;
    var barY = y + ch - 8;
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    CanvasUI.roundRect(ctx, leftX, barY, barW, 4, 2);
    ctx.fill();
    ctx.fillStyle = secColor;
    CanvasUI.roundRect(ctx, leftX, barY, barW * (item.quantity / oq), 4, 2);
    ctx.fill();
  }

  // Buttons
  ctx.textAlign = "center";
  if (!isBackup && layout.btnA && layout.btnB) {
    ctx.fillStyle = CanvasUI.COLORS.btnBg;
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 0.5;
    CanvasUI.roundRect(ctx, layout.btnA.x, layout.btnA.y, layout.btnA.w, layout.btnA.h, 19);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = CanvasUI.COLORS.blue;
    ctx.font = "20px -apple-system, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText("\u2212", layout.btnA.x + layout.btnA.w / 2, layout.btnA.y + layout.btnA.h / 2);

    ctx.fillStyle = CanvasUI.COLORS.btnClearBg;
    ctx.strokeStyle = "rgba(255,59,48,0.15)";
    CanvasUI.roundRect(ctx, layout.btnB.x, layout.btnB.y, layout.btnB.w, layout.btnB.h, 19);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = CanvasUI.COLORS.btnClearText;
    ctx.fillText("\u2713", layout.btnB.x + layout.btnB.w / 2, layout.btnB.y + layout.btnB.h / 2);
  }

  // Auto-cart indicator
  if (item.automation && item.automation.autoCart && item.purchaseInfo && item.purchaseInfo.purchaseUrl) {
    ctx.fillStyle = "rgba(0,122,255,0.08)";
    ctx.font = "12px -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("🛒 自動採購", x + cw - 16, y + 16);
  }

  ctx.restore();
};

CanvasUI.drawSpringCard = function (ctx, ac) {
  ctx.save();
  ctx.globalAlpha = ac.opacity || 1;
  ctx.translate(0, ac.springY || 0);
  ctx.scale(ac.scale || 1, ac.scale || 1);

  ctx.fillStyle = CanvasUI.COLORS.card;
  CanvasUI.roundRect(ctx, 16, ac.origY || 200, CanvasUI.width - 32, 108, 20);
  ctx.fill();
  ctx.restore();
};

CanvasUI.drawEmptyState = function (ctx, w) {
  var cy = 180;
  ctx.save();

  // Fridge icon
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  var fx = w / 2 - 36;
  var fy = cy - 60;
  CanvasUI.roundRect(ctx, fx, fy, 72, 80, 16);
  ctx.fill();
  ctx.stroke();

  // Freezer line
  ctx.beginPath();
  ctx.moveTo(fx + 6, fy + 28);
  ctx.lineTo(fx + 66, fy + 28);
  ctx.stroke();

  // Handle
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  CanvasUI.roundRect(ctx, fx + 56, fy + 36, 5, 22, 3);
  ctx.fill();

  // Text
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.font = "600 20px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("\u51B0\u7BB1\u7A7A\u7A7A\u5982\u4E5F\uFF5E", w / 2, cy + 36);

  ctx.font = "16px -apple-system, sans-serif";
  ctx.fillStyle = "#C7C7CC";
  ctx.fillText("\u9EDE\u4E0B\u65B9 \uFF0B \u958B\u59CB\u8A18\u9304\u98DF\u6750\u5427", w / 2, cy + 66);

  ctx.restore();
};

// --- Interaction ---

CanvasUI.onClick = function (e) {
  var rect = CanvasUI.canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  // Sort button
  var sb = CanvasUI.sortBtnRect;
  if (sb && x >= sb.x && x <= sb.x + sb.w && y >= sb.y && y <= sb.y + sb.h) {
    CanvasUI.sortMode = CanvasUI.sortMode === "expiry" ? "name" : "expiry";
    CanvasUI.computeLayout();
    CanvasUI.needRedraw = true;
    return;
  }

  CanvasUI.handlePointer(x, y);
};

CanvasUI.onTouch = function (e) {};

CanvasUI.onTouchStart = function (e) {
  var rect = CanvasUI.canvas.getBoundingClientRect();
  var touch = e.touches[0];
  CanvasUI.swipeStartX = touch.clientX - rect.left;
  CanvasUI.swipeStartY = touch.clientY - rect.top;
  CanvasUI.swipeLayout = CanvasUI.hitTest(CanvasUI.swipeStartX, CanvasUI.swipeStartY);
  CanvasUI.swipeOffset = 0;
};

CanvasUI.onTouchMove = function (e) {
  if (!CanvasUI.swipeLayout) return;
  var rect = CanvasUI.canvas.getBoundingClientRect();
  var touch = e.touches[0];
  var dx = touch.clientX - rect.left - CanvasUI.swipeStartX;
  var dy = touch.clientY - rect.top - CanvasUI.swipeStartY;

  // Only track horizontal swipes
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
    e.preventDefault();
    CanvasUI.swipeOffset = dx;
    CanvasUI.needRedraw = true;
  }
};

CanvasUI.onTouchEnd = function () {
  var layout = CanvasUI.swipeLayout;
  var dx = CanvasUI.swipeOffset;

  if (layout && Math.abs(dx) > 60) {
    if (typeof navigator.vibrate === "function") navigator.vibrate(10);
    if (dx > 0) {
      // Swipe right → consume
      var unitType = layout.food.unitType || "x";
      if (unitType === "ml" || unitType === "g") {
        CanvasUI.showAmountPopup(layout, function (amount) {
          CanvasUI.doConsume(layout, amount);
        });
      } else {
        CanvasUI.doConsume(layout, undefined);
      }
    } else {
      // Swipe left → clear
      CanvasUI.doClear(layout);
    }
  }

  CanvasUI.swipeLayout = null;
  CanvasUI.swipeOffset = 0;
  CanvasUI.needRedraw = true;
};

CanvasUI.handlePointer = function (x, y) {
  var layout = CanvasUI.hitTest(x, y);
  if (!layout) return;

  // Restore button for completed
  if (layout.food.finished && layout.btnRestore && CanvasUI.hitBtn(x, y, layout.btnRestore)) {
    restoreFood(layout.food.id);
    CanvasUI.render(getFoods());
    if (typeof updateStatsBar === "function") updateStatsBar(getFoods());
    return;
  }

  if (layout.food.finished) return;

  var btnA = layout.btnA;
  var btnB = layout.btnB;

  if (btnA && CanvasUI.hitBtn(x, y, btnA)) {
    if (typeof navigator.vibrate === "function") navigator.vibrate(10);
    var unitType = layout.food.unitType || "x";
    if (unitType === "ml" || unitType === "g") {
      CanvasUI.showAmountPopup(layout, function (amount) {
        CanvasUI.doConsume(layout, amount);
      });
    } else {
      CanvasUI.doConsume(layout, undefined);
    }
    return;
  }

  if (btnB && CanvasUI.hitBtn(x, y, btnB)) {
    if (typeof navigator.vibrate === "function") navigator.vibrate(10);
    CanvasUI.doClear(layout);
  }
};

CanvasUI.hitTest = function (x, y) {
  for (var i = 0; i < CanvasUI.cardLayouts.length; i++) {
    var lo = CanvasUI.cardLayouts[i];
    if (lo.isHeader) continue;
    if (x >= lo.x && x <= lo.x + lo.w && y >= lo.y && y <= lo.y + lo.h) {
      return lo;
    }
  }
  return null;
};

CanvasUI.hitBtn = function (x, y, btn) {
  return x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h;
};

CanvasUI.doConsume = function (layout, amount) {
  var snap = JSON.parse(JSON.stringify(layout.food));
  var item = consumeFood(layout.food.id, amount);
  if (!item) return;
  triggerHeartParticles(CanvasUI.canvas);

  recordHistory("CONSUME", snap, { amount: amount || (item.unitType === "%" ? 10 : 1) });

  if (item.finished) {
    addToShoppingList(item.name, "auto");
    CanvasUI.removeCard(layout);
  } else {
    layout.food = item;
    CanvasUI.needRedraw = true;
  }
};

CanvasUI.doClear = function (layout) {
  saveUndoSnapshot(layout.food);
  clearFood(layout.food.id);
  recordHistory("CLEAR", layout.food, null);
  triggerHeartParticles(CanvasUI.canvas);
  addToShoppingList(layout.food.name, "auto");
  showUndoToast(layout.food.name);
  CanvasUI.removeCard(layout);
};

CanvasUI.removeCard = function (layout) {
  var origY = layout.y;
  CanvasUI.animCards.push({
    id: layout.food.id,
    origY: origY,
    springY: 0,
    springVel: 0,
    scale: 1,
    opacity: 1,
  });

  setTimeout(function () {
    CanvasUI.render(getFoods());
  }, 500);
};

CanvasUI.showAmountPopup = function (layout, callback) {
  var existing = document.querySelector(".amount-popup");
  if (existing) existing.remove();

  var rect = CanvasUI.canvas.getBoundingClientRect();
  var bx = rect.left + layout.btnA.x + layout.btnA.w / 2;
  var by = rect.top + layout.btnA.y + layout.btnA.h;

  var popup = document.createElement("div");
  popup.className = "amount-popup fixed bg-white rounded-2xl p-2.5 shadow-lg z-[70] flex items-center gap-2";
  popup.style.left = Math.max(8, bx - 60) + "px";
  popup.style.top = (by + 4) + "px";
  popup.style.border = "0.5px solid rgba(0,0,0,0.08)";
  popup.style.fontFamily = "-apple-system, sans-serif";

  var unitType = layout.food.unitType || "ml";
  var preset = unitType === "ml" ? 50 : 100;
  var input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.value = preset;
  input.style.cssText = "width:56px;border:0.5px solid rgba(0,0,0,0.1);border-radius:10px;padding:4px 6px;font-size:13px;text-align:center;outline:none;font-family:-apple-system,sans-serif";

  var unitSpan = document.createElement("span");
  unitSpan.style.cssText = "font-size:12px;color:#86868B;font-family:-apple-system,sans-serif";
  unitSpan.textContent = unitType;

  var confirmBtn = document.createElement("button");
  confirmBtn.style.cssText = "width:24px;height:24px;border-radius:50%;background:#007AFF;color:#fff;font-size:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center";
  confirmBtn.textContent = "\u2713";

  popup.appendChild(input);
  popup.appendChild(unitSpan);
  popup.appendChild(confirmBtn);
  document.body.appendChild(popup);

  function closePopup() {
    popup.remove();
    document.removeEventListener("click", outsideClick);
  }

  confirmBtn.addEventListener("click", function () {
    var val = parseInt(input.value, 10);
    if (val > 0) { callback(val); closePopup(); }
  });

  var outsideClick = function (ev) {
    if (!popup.contains(ev.target)) closePopup();
  };
  setTimeout(function () { document.addEventListener("click", outsideClick); }, 0);
};

// --- Animation Loop ---

CanvasUI.animationLoop = function () {
  CanvasUI.animCards.forEach(function (ac) {
    var force = -0.012 * ac.springY - 0.26 * ac.springVel;
    ac.springVel += force;
    ac.springY += ac.springVel;
    ac.opacity = Math.max(0, 1 - ac.springY / 60);
    ac.scale = Math.max(0.9, 1 - ac.springY / 300);
  });

  CanvasUI.animCards = CanvasUI.animCards.filter(function (ac) {
    return ac.opacity > 0.01;
  });

  if (CanvasUI.needRedraw || CanvasUI.animCards.length > 0) {
    CanvasUI.draw();
    CanvasUI.needRedraw = false;
  }

  CanvasUI.rafId = requestAnimationFrame(CanvasUI.animationLoop);
};

// --- Drawing Utilities ---

CanvasUI.roundRect = function (ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
};

CanvasUI.clipText = function (ctx, text, maxW, x, y) {
  var measured = ctx.measureText(text);
  if (measured.width <= maxW) {
    ctx.fillText(text, x, y);
    return;
  }
  var trimmed = text;
  while (ctx.measureText(trimmed + "\u2026").width > maxW && trimmed.length > 0) {
    trimmed = trimmed.slice(0, -1);
  }
  ctx.fillText(trimmed + "\u2026", x, y);
};
