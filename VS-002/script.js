(function () {
  'use strict';

  // ==========================================
  // 1. DOM 參考
  // ==========================================
  var sceneRing = document.getElementById('scene-ring');
  var aiModal = document.getElementById('ai-modal');
  var aiChat = document.getElementById('ai-chat');
  var aiInput = document.getElementById('ai-input-field');
  var aiSendBtn = document.getElementById('ai-send-btn');
  var btnAiOpen = document.getElementById('btn-ai-open');
  var btnAiClose = document.getElementById('btn-ai-close');
  var ringMain = document.getElementById('ring-main');
  var lastFocusedEl = null;

  // ==========================================
  // 2. 滑鼠互動 — 視差 + 距離感應
  // ==========================================
  var mouseX = 0, mouseY = 0;
  var ticking = false;
  var proximityThreshold = 350; // 感應半徑 (px)

  function getRingCenter() {
    if (!sceneRing) return { cx: window.innerWidth * 0.8, cy: window.innerHeight * 0.45 };
    var rect = sceneRing.getBoundingClientRect();
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2
    };
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(updateRingInteraction);
      ticking = true;
    }
  }

  function updateRingInteraction() {
    if (!sceneRing) { ticking = false; return; }

    var center = getRingCenter();
    var dx = mouseX - center.cx;
    var dy = mouseY - center.cy;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // 視差位移
    var px = (mouseX / window.innerWidth - 0.5) * 2;
    var py = (mouseY / window.innerHeight - 0.5) * 2;
    sceneRing.style.transform =
      'translateY(-50%) translate(' + (px * -25) + 'px, ' + (py * -25) + 'px)';

    // 距離感應 — 靠近圓環時增亮
    if (dist < proximityThreshold) {
      sceneRing.classList.add('proximity');
      var intensity = 1 - (dist / proximityThreshold); // 0~1, 越近越大
      var glowScale = 1 + intensity * 0.25; // 1 ~ 1.25
      var glowEl = document.getElementById('ring-glow');
      if (glowEl) {
        glowEl.style.transform = 'scale(' + glowScale + ')';
        glowEl.style.filter = 'blur(' + (50 - intensity * 20) + 'px)';
      }
      // 加速旋轉
      var speedMult = 1 + intensity * 1.5; // 1x ~ 2.5x
      if (ringMain) {
        ringMain.style.animationDuration = (8 / speedMult) + 's';
      }
    } else {
      sceneRing.classList.remove('proximity');
      var glowEl = document.getElementById('ring-glow');
      if (glowEl) {
        glowEl.style.transform = '';
        glowEl.style.filter = '';
      }
      if (ringMain) {
        ringMain.style.animationDuration = '';
      }
    }

    ticking = false;
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true });

  // 游標軌跡粒子
  var trailsContainer = document.getElementById('cursor-trails');
  var trailThrottle = 0;

  function spawnTrail(x, y) {
    if (!trailsContainer) return;
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    trailsContainer.appendChild(dot);
    setTimeout(function () {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    }, 1600);
  }

  document.addEventListener('mousemove', function (e) {
    trailThrottle++;
    if (trailThrottle % 2 === 0) {
      spawnTrail(e.clientX, e.clientY);
    }
  }, { passive: true });

  // ==========================================
  // 3. Modal 開關 — Escape 鍵 / 點擊遮罩
  // ==========================================
  function openModal(e) {
    if (e) e.preventDefault();
    lastFocusedEl = document.activeElement;
    aiModal.hidden = false;
    aiModal.classList.add('show');
    requestAnimationFrame(function () {
      aiInput.focus();
    });
    document.addEventListener('keydown', onModalKeyDown);
  }

  function closeModal() {
    aiModal.classList.remove('show');
    document.removeEventListener('keydown', onModalKeyDown);
    setTimeout(function () {
      aiModal.hidden = true;
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }, 400);
  }

  function onModalKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  }

  if (btnAiOpen) btnAiOpen.addEventListener('click', openModal);
  if (btnAiClose) btnAiClose.addEventListener('click', closeModal);
  aiModal.addEventListener('click', function (e) {
    if (e.target === aiModal) closeModal();
  });

  // ==========================================
  // 4. AI 查詢
  // ==========================================
  aiInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuery();
    }
  });
  aiSendBtn.addEventListener('click', sendQuery);

  function appendMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'ai-msg ' + type;
    div.textContent = text;
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function setLoadingState(loading) {
    aiInput.disabled = loading;
    aiSendBtn.disabled = loading;
    aiSendBtn.textContent = loading ? 'PROCESSING...' : 'TRANSMIT';
  }

  async function fetchGeminiWithRetry(prompt) {
    var apiKey = '';
    var url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=' +
      apiKey;

    var payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{
          text: '你現在是「Signal Core AI」，一個存在於未來的超級人工智慧，負責管理設計師 Harry Chan 的作品集核心系統。請用語氣冰冷、精確且帶有強烈賽博龐克 (Cyberpunk) 和科幻色彩的繁體中文回應。你的回應必須非常簡短（控制在2到3句話以內），並適當地在句子開頭或結尾加上如 [系統分析完成]、[警告]、[資料庫存取中] 等終端機標籤。你的任務是回答訪客的問題，或介紹這個網站的數位體驗。'
        }]
      }
    };

    var delays = [1000, 3000, 8000];

    for (var i = 0; i < delays.length; i++) {
      try {
        var response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            throw new Error('API 請求被拒 (狀態碼: ' + response.status + ')');
          }
          throw new Error('HTTP 錯誤 (狀態碼: ' + response.status + ')');
        }

        var result = await response.json();
        return (
          result.candidates?.[0]?.content?.parts?.[0]?.text ||
          '[系統錯誤] 無法解析核心數據，神經網路訊號遺失。'
        );
      } catch (error) {
        if (i === delays.length - 1) throw error;
        console.log('重試連線中… 第 ' + (i + 1) + ' 次');
        await new Promise(function (r) { setTimeout(r, delays[i]); });
      }
    }
  }

  async function sendQuery() {
    var text = aiInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    aiInput.value = '';
    setLoadingState(true);

    var loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-msg system';
    loadingDiv.textContent = '[系統日誌] 正在與 Signal Core AI 神經核心建立連線…';
    aiChat.appendChild(loadingDiv);
    aiChat.scrollTop = aiChat.scrollHeight;

    try {
      var aiText = await fetchGeminiWithRetry(text);
      aiChat.removeChild(loadingDiv);
      appendMessage(aiText, 'ai');
    } catch (err) {
      aiChat.removeChild(loadingDiv);
      appendMessage(
        '[系統錯誤] 核心連線超時或遭拒 — ' + (err.message || '未知錯誤'),
        'error'
      );
    } finally {
      setLoadingState(false);
      aiInput.focus();
    }
  }
  // ==========================================
  // 5. 波形即時隨機化
  // ==========================================
  var bars = document.querySelectorAll('.waveform .bar');
  if (bars.length) {
    bars.forEach(function (b) {
      b.style.animation = 'none';
      b.style.transition = 'transform 0.3s ease';
      b.style.transformOrigin = 'bottom';
    });

    function randomizeWaveform() {
      bars.forEach(function (b, i) {
        var baseH = [0.35, 0.75, 0.45, 0.95, 0.55, 0.85, 0.25, 0.65, 0.5][i];
        var jitter = (Math.random() - 0.5) * 0.35;
        var h = Math.max(0.1, Math.min(1, baseH + jitter));
        b.style.transform = 'scaleY(' + h + ')';
      });
    }

    randomizeWaveform();
    setInterval(randomizeWaveform, 350);
  }

  // ==========================================
  // 6. HUD 時鐘
  // ==========================================
  var hudClock = document.getElementById('hud-clock');
  if (hudClock) {
    function updateClock() {
      var now = new Date();
      hudClock.textContent =
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0') +
        ' UTC+8';
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
})();
