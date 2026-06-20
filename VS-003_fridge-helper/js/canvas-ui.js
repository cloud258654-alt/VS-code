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

CanvasUI.COLORS = {
  bg: "#F5F5F7",
  card: "#FFFFFF",
  text: "#1D1D1F",
  sub: "#86868B",
  line: "#E5E5EA",
  red: "#FF3B30",
  orange: "#FF9500",
  green: "#34C759",
  blue: "#007AFF",
  btnBg: "rgba(0,0,0,0.04)",
  btnHover: "rgba(0,0,0,0.08)",
  btnClearBg: "rgba(255,59,48,0.08)",
  btnClearText: "#FF3B30",
  shadow: "rgba(0,0,0,0.04)",
};

CanvasUI.SECTION_LABELS = {
  urgent: "🚨 救命呀 (已過期/快過期)",
  warning: "🐱 快吃我",
  safe: "🎀 安全唷",
  completed: "✔ 已完食",
};

CanvasUI.SECTION_COLORS = {
  urgent: "#FF3B30",
  warning: "#FF9500",
  safe: "#34C759",
  completed: "#86868B",
};

CanvasUI.init = function (canvasId) {
  CanvasUI.canvas = document.getElementById(canvasId);
  CanvasUI.ctx = CanvasUI.canvas.getContext("2d");
  CanvasUI.dpr = window.devicePixelRatio || 1;

  CanvasUI.canvas.addEventListener("click", CanvasUI.onClick);
  CanvasUI.canvas.addEventListener("touchstart", CanvasUI.onTouch, { passive: false });

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
  CanvasUI.computeLayout();
  CanvasUI.needRedraw = true;
};

CanvasUI.computeLayout = function () {
  var lists = getCategorizedLists(CanvasUI.foods);
  var urgent = lists.expired.concat(lists.danger).sort(function (a, b) {
    return a.expireDate.localeCompare(b.expireDate);
  });

  var sections = [
    { key: "urgent", items: urgent },
    { key: "warning", items: lists.warning },
    { key: "safe", items: lists.safe },
    { key: "completed", items: lists.completed },
  ];

  var w = CanvasUI.width;
  var pad = 16;
  var cardW = w - pad * 2;
  var cardH = 76;
  var sectionHeaderH = 44;
  var gap = 6;
  var y = 4;

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
        layout.btnA = { x: cardW - 120, y: y + cardH / 2 - 10, w: 56, h: 20, type: "consume" };
        layout.btnB = { x: cardW - 58, y: y + cardH / 2 - 10, w: 50, h: 20, type: "clear" };
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

  // Banner
  if (CanvasUI.bannerMsg) {
    ctx.save();
    ctx.fillStyle = "rgba(255,59,48,0.06)";
    CanvasUI.roundRect(ctx, 16, 0, w - 32, 26, 8);
    ctx.fill();
    ctx.fillStyle = CanvasUI.COLORS.red;
    ctx.font = "12px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(CanvasUI.bannerMsg, w / 2, 14);
    ctx.restore();
  }

  CanvasUI.cardLayouts.forEach(function (layout) {
    if (layout.isHeader) {
      CanvasUI.drawSectionHeader(ctx, layout);
    } else {
      CanvasUI.drawCard(ctx, layout);
    }
  });

  CanvasUI.animCards.forEach(function (ac) {
    CanvasUI.drawSpringCard(ctx, ac);
  });
};

CanvasUI.drawSectionHeader = function (ctx, layout) {
  var secColor = CanvasUI.SECTION_COLORS[layout.section] || CanvasUI.COLORS.line;
  var title = CanvasUI.SECTION_LABELS[layout.section] || "";
  var fullTitle = title + (layout.count ? " (" + layout.count + ")" : "");

  ctx.save();
  ctx.fillStyle = CanvasUI.COLORS.text;
  ctx.font = "600 16px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(fullTitle, 20, layout.y + 28);

  // Thin accent line
  ctx.fillStyle = secColor;
  ctx.fillRect(20, layout.y + 38, 24, 2);
  ctx.restore();
};

CanvasUI.drawCard = function (ctx, layout) {
  var food = layout.food;
  var x = layout.x;
  var y = layout.y;
  var cw = layout.w;
  var ch = layout.h;
  var unitType = food.unitType || "x";
  var secColor = CanvasUI.SECTION_COLORS[layout.section] || CanvasUI.COLORS.line;

  ctx.save();

  // Card background with subtle shadow
  ctx.shadowColor = "rgba(0,0,0,0.04)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = CanvasUI.COLORS.card;
  CanvasUI.roundRect(ctx, x, y, cw, ch, 16);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Left accent line
  if (layout.section !== "completed") {
    ctx.fillStyle = secColor;
    CanvasUI.roundRect(ctx, x + 6, y + 18, 3, ch - 36, 2);
    ctx.fill();
  }

  var leftX = x + (layout.section === "completed" ? 18 : 18);

  // Food name
  ctx.fillStyle = food.finished ? CanvasUI.COLORS.sub : CanvasUI.COLORS.text;
  ctx.font = "600 15px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textBaseline = "top";
  var maxTextW = cw - (food.finished ? 28 : 142);
  CanvasUI.clipText(ctx, food.name, maxTextW, leftX, y + 12);

  // Quantity / unit info
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.font = "12px -apple-system, sans-serif";
  var qtyText = "";
  var unitLabel = unitType === "ml" ? " ml" : unitType === "g" ? " g" : unitType === "%" ? " %" : "";
  if (unitType === "x") {
    qtyText = food.quantity > 1 ? "x" + food.quantity : "";
  } else {
    var oq = food.originalQuantity || food.quantity;
    qtyText = food.quantity + " / " + oq + unitLabel;
  }
  if (qtyText) ctx.fillText(qtyText, leftX, y + 32);

  // Location
  ctx.fillStyle = CanvasUI.COLORS.sub;
  ctx.fillText(food.location, leftX, y + 48);

  // Progress bar for non-x, non-completed
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
    CanvasUI.drawProgressBar(ctx, leftX, y + ch - 6, maxTextW, 3, current, secColor);
  }

  // Days badge
  if (!food.finished) {
    var days = calculateRemainingDays(food.expireDate);
    var badgeText;
    if (days < 0) badgeText = "\u5DF2\u904E\u671F " + Math.abs(days) + "\u5929";
    else if (days === 0) badgeText = "\u4ECA\u5929\u5230\u671F";
    else badgeText = days + "\u5929\u5F8C\u5230\u671F";
    CanvasUI.drawBadge(ctx, badgeText, days, leftX, y + ch - 24);
  }

  // Buttons
  if (!food.finished && layout.btnA && layout.btnB) {
    var btnAY = layout.btnA.y;
    var btnBY = layout.btnB.y;

    // Consume button
    var consumeText;
    if (unitType === "x") consumeText = "\u5403 1 \u500B";
    else if (unitType === "%") consumeText = "\u7528 10%";
    else consumeText = "\u7528\u4E00\u9EDE";
    CanvasUI.drawBtn(ctx, layout.btnA.x, btnAY, layout.btnA.w, layout.btnA.h, consumeText, false);

    // Clear button
    CanvasUI.drawBtn(ctx, layout.btnB.x, btnBY, layout.btnB.w, layout.btnB.h, "\u5168\u5403\u5B8C", true);
  }

  ctx.restore();
};

CanvasUI.drawBtn = function (ctx, x, y, w, h, text, isClear) {
  ctx.save();
  ctx.fillStyle = isClear ? CanvasUI.COLORS.btnClearBg : CanvasUI.COLORS.btnBg;
  CanvasUI.roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = isClear ? CanvasUI.COLORS.btnClearText : CanvasUI.COLORS.blue;
  ctx.font = "11px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + w / 2, y + h / 2);
  ctx.restore();
};

CanvasUI.drawBadge = function (ctx, text, days, x, y) {
  ctx.save();
  var metric = ctx.measureText(text);
  var badgeW = metric.width + 14;
  var badgeH = 18;

  if (days < 0) {
    ctx.strokeStyle = "rgba(255,59,48,0.2)";
    ctx.fillStyle = "rgba(255,59,48,0.08)";
  } else if (days <= 2) {
    ctx.strokeStyle = "rgba(255,59,48,0.2)";
    ctx.fillStyle = "rgba(255,59,48,0.08)";
  } else if (days <= 5) {
    ctx.strokeStyle = "rgba(255,149,0,0.2)";
    ctx.fillStyle = "rgba(255,149,0,0.08)";
  } else {
    ctx.strokeStyle = "rgba(52,199,89,0.2)";
    ctx.fillStyle = "rgba(52,199,89,0.08)";
  }

  CanvasUI.roundRect(ctx, x, y, badgeW, badgeH, badgeH / 2);
  ctx.fill();
  ctx.lineWidth = 0.5;
  CanvasUI.roundRect(ctx, x, y, badgeW, badgeH, badgeH / 2);
  ctx.stroke();

  ctx.fillStyle = days < 0 ? "#FF3B30" : days <= 2 ? "#FF3B30" : days <= 5 ? "#FF9500" : "#34C759";
  ctx.font = "10px -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 7, y + badgeH / 2);
  ctx.restore();
};

CanvasUI.drawProgressBar = function (ctx, x, y, w, h, progress, color) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  CanvasUI.roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();

  ctx.fillStyle = color || CanvasUI.COLORS.green;
  CanvasUI.roundRect(ctx, x, y, w * Math.max(0, Math.min(1, progress)), h, h / 2);
  ctx.fill();
  ctx.restore();
};

CanvasUI.drawSpringCard = function (ctx, ac) {
  ctx.save();
  ctx.globalAlpha = ac.opacity || 1;
  ctx.translate(0, ac.springY || 0);
  ctx.scale(ac.scale || 1, ac.scale || 1);

  ctx.fillStyle = CanvasUI.COLORS.card;
  CanvasUI.roundRect(ctx, 16, ac.origY || 200, CanvasUI.width - 32, 76, 16);
  ctx.fill();
  ctx.restore();
};

// --- Interaction ---

CanvasUI.onClick = function (e) {
  var rect = CanvasUI.canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  CanvasUI.handlePointer(x, y);
};

CanvasUI.onTouch = function (e) {
  e.preventDefault();
  var rect = CanvasUI.canvas.getBoundingClientRect();
  var touch = e.touches[0];
  var x = touch.clientX - rect.left;
  var y = touch.clientY - rect.top;
  CanvasUI.handlePointer(x, y);
};

CanvasUI.handlePointer = function (x, y) {
  var layout = CanvasUI.hitTest(x, y);
  if (!layout || layout.food.finished) return;

  var btnA = layout.btnA;
  var btnB = layout.btnB;

  if (btnA && CanvasUI.hitBtn(x, y, btnA)) {
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
