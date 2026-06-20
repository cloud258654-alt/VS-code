var NOTIFIER_GRANTED = false;
var NOTIFIER_LAST_CHECK = 0;
var NOTIFIER_INTERVAL = 60000 * 30;

function initNotifier() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    NOTIFIER_GRANTED = true;
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (perm) {
      NOTIFIER_GRANTED = perm === "granted";
      if (NOTIFIER_GRANTED) checkAndNotify();
    });
  }
  if (NOTIFIER_GRANTED) checkAndNotify();
}

function notify(title, body) {
  if (!NOTIFIER_GRANTED) return;
  new Notification(title, { body: body, icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><text y='56' font-size='56'>❄️</text></svg>", tag: "fridge-reminder" });
}

function checkAndNotify() {
  var now = Date.now();
  if (now - NOTIFIER_LAST_CHECK < NOTIFIER_INTERVAL) return;
  NOTIFIER_LAST_CHECK = now;

  var foods = getFoods();
  var urgent = [];
  foods.forEach(function (food) {
    if (food.finished) return;
    var days = calculateRemainingDays(food.expireDate);
    if (days <= 0) urgent.push(food.name + " 已過期");
    else if (days <= 2) urgent.push(food.name + " " + days + " 天後到期");
  });

  if (urgent.length === 1) {
    notify("冰箱警報 🚨", urgent[0]);
  } else if (urgent.length > 1) {
    notify("冰箱警報 🚨", urgent.length + " 項食材快過期了！" + urgent[0] + "…");
  }
}

setInterval(checkAndNotify, NOTIFIER_INTERVAL);
