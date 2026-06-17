(function () {
  'use strict';

  // ==========================================
  // 1. DOM 參考
  // ==========================================
  const sceneRing = document.getElementById('scene-ring');
  const aiModal = document.getElementById('ai-modal');
  const aiChat = document.getElementById('ai-chat');
  const aiInput = document.getElementById('ai-input-field');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const btnAiOpen = document.getElementById('btn-ai-open');
  const btnAiClose = document.getElementById('btn-ai-close');
  let lastFocusedEl = null;

  // ==========================================
  // 2. 滑鼠視差 — requestAnimationFrame 節流
  // ==========================================
  let mouseX = 0, mouseY = 0;
  let ticking = false;

  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!ticking) {
      requestAnimationFrame(function () {
        if (sceneRing) {
          sceneRing.style.transform =
            'translateY(-50%) translate(' + (mouseX * -25) + 'px, ' + (mouseY * -25) + 'px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true });

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

  if (btnAiOpen) {
    btnAiOpen.addEventListener('click', openModal);
  }
  if (btnAiClose) {
    btnAiClose.addEventListener('click', closeModal);
  }
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
})();
