// ── General API settings sub-screen ───────────────────────────

let _navigate = null;

export function mount(el, navigate) {
  _navigate = navigate;
  render(el);
}

export function unmount() {
  _navigate = null;
}

// ── Provider detection ─────────────────────────────────────────

function detectProvider(baseUrl) {
  const u = (baseUrl || '').toLowerCase();
  if (u.includes('anthropic.com')) return 'claude';
  if (u.includes('googleapis.com') || u.includes('generativelanguage')) return 'google';
  return 'openai';
}

function base(url) {
  return url.replace(/\/$/, '');
}

// ── API calls ──────────────────────────────────────────────────

async function fetchModels(baseUrl, apiKey) {
  const b = base(baseUrl);
  const provider = detectProvider(baseUrl);
  let url, init;

  if (provider === 'claude') {
    url = `${b}/v1/models`;
    init = { headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' } };
  } else if (provider === 'google') {
    url = `${b}/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    init = {};
  } else {
    url = `${b}/v1/models`;
    init = { headers: { 'Authorization': `Bearer ${apiKey}` } };
  }

  let res;
  try { res = await fetch(url, init); }
  catch (_) { throw new Error("Can't reach server — check the URL"); }

  if (!res.ok) throw new Error(await httpError(res, 'fetch'));

  const data = await res.json();
  if (provider === 'google') return (data.models || []).map(m => m.name).filter(Boolean);
  return (data.data || []).map(m => m.id).filter(Boolean);
}

async function testConnection(baseUrl, apiKey, model) {
  const b = base(baseUrl);
  const provider = detectProvider(baseUrl);
  let url, init;

  if (provider === 'claude') {
    url = `${b}/v1/messages`;
    init = {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] }),
    };
  } else if (provider === 'google') {
    const modelId = model.replace(/^models\//, '');
    url = `${b}/v1beta/models/${modelId}:generateContent?key=${encodeURIComponent(apiKey)}`;
    init = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: 'hi' }] }], generationConfig: { maxOutputTokens: 1 } }),
    };
  } else {
    url = `${b}/v1/chat/completions`;
    init = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] }),
    };
  }

  let res;
  try { res = await fetch(url, init); }
  catch (_) { throw new Error("Can't reach server — check the URL"); }

  if (!res.ok) throw new Error(await httpError(res, 'test'));
}

async function httpError(res, action) {
  switch (res.status) {
    case 401: return 'Invalid API key';
    case 403: return 'Access denied — check organization permissions';
    case 404: return action === 'fetch'
      ? 'No models endpoint found — check the base URL'
      : 'Model not found at this endpoint';
    case 429: return 'Rate limited — wait a moment and try again';
    case 500: return 'Server error — the API is having issues';
    case 503: return 'Service unavailable — try again later';
    default:  return `Request failed (${res.status})`;
  }
}

// ── Render ─────────────────────────────────────────────────────

function render(el) {
  const saved = loadSaved();
  const temp  = saved.temperature ?? 0.85;

  el.innerHTML = `
    <div class="api-screen screen">
      <div class="status-bar"></div>

      <div class="api-nav">
        <button class="api-back-btn" id="api-back">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5 9 16" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Settings
        </button>
        <span class="api-nav-title">General API</span>
      </div>

      <!-- PROVIDER -->
      <div class="api-section-label">PROVIDER</div>
      <div class="api-group">
        <div class="api-field-row">
          <span class="api-field-label">Base URL</span>
          <input class="api-input" id="api-base-url" type="url"
            placeholder="https://api.anthropic.com"
            value="${esc(saved.baseUrl || '')}" autocomplete="off" spellcheck="false">
        </div>
        <div class="api-inner-sep"></div>
        <div class="api-field-row">
          <span class="api-field-label">API Key</span>
          <div class="api-key-wrap">
            <input class="api-input api-key-input" id="api-key" type="password"
              placeholder="sk-…"
              value="${esc(saved.apiKey || '')}" autocomplete="off" spellcheck="false">
            <button class="eye-btn" id="api-eye" type="button" aria-label="Show or hide API key">
              ${eyeIcon(false)}
            </button>
          </div>
        </div>
      </div>

      <div class="api-action-row">
        <button class="api-action-btn" id="api-fetch-btn" disabled>Fetch Models</button>
      </div>
      <div class="api-status" id="api-fetch-status" aria-live="polite"></div>

      <!-- MODEL -->
      <div class="api-section-label">MODEL</div>
      <div class="api-group">
        <div class="api-select-row">
          <select class="api-select" id="api-model" disabled>
            <option value="">— fetch models first —</option>
          </select>
        </div>
      </div>

      <div class="api-action-row">
        <button class="api-action-btn" id="api-test-btn" disabled>Test Connection</button>
      </div>
      <div class="api-status" id="api-test-status" aria-live="polite"></div>

      <!-- TEMPERATURE -->
      <div class="api-section-label">TEMPERATURE</div>
      <div class="api-group">
        <div class="api-slider-row">
          <div class="api-slider-labels">
            <span>0.5</span>
            <span class="api-temp-value" id="api-temp-display">${temp.toFixed(2)}</span>
            <span>1.2</span>
          </div>
          <input class="ios-slider" id="api-temp" type="range"
            min="0.5" max="1.2" step="0.01" value="${temp}">
        </div>
        <div class="api-inner-sep"></div>
        <div class="api-temp-hint">Lower = more focused &nbsp;·&nbsp; Higher = more creative</div>
      </div>

      <div style="height: 40px"></div>
    </div>
  `;

  const back        = el.querySelector('#api-back');
  const urlInput    = el.querySelector('#api-base-url');
  const keyInput    = el.querySelector('#api-key');
  const eyeBtn      = el.querySelector('#api-eye');
  const fetchBtn    = el.querySelector('#api-fetch-btn');
  const fetchStatus = el.querySelector('#api-fetch-status');
  const modelSel    = el.querySelector('#api-model');
  const testBtn     = el.querySelector('#api-test-btn');
  const testStatus  = el.querySelector('#api-test-status');
  const tempSlider  = el.querySelector('#api-temp');
  const tempDisplay = el.querySelector('#api-temp-display');

  // Restore saved model
  if (saved.model) {
    const opt = new Option(saved.model, saved.model, true, true);
    modelSel.innerHTML = '';
    modelSel.appendChild(opt);
    modelSel.disabled = false;
    testBtn.disabled  = false;
  }

  updateSliderFill(tempSlider);

  // Enable fetch when both fields are filled
  function syncFetchBtn() {
    fetchBtn.disabled = !(urlInput.value.trim() && keyInput.value.trim());
  }
  urlInput.addEventListener('input', syncFetchBtn);
  keyInput.addEventListener('input', syncFetchBtn);
  syncFetchBtn();

  // Back
  back.addEventListener('click', () => _navigate('settings'));

  // Eye toggle
  let keyVisible = false;
  eyeBtn.addEventListener('click', () => {
    keyVisible = !keyVisible;
    keyInput.type = keyVisible ? 'text' : 'password';
    eyeBtn.innerHTML = eyeIcon(keyVisible);
  });

  // Fetch models
  fetchBtn.addEventListener('click', async () => {
    setStatus(fetchStatus, '', null);
    fetchBtn.disabled  = true;
    fetchBtn.textContent = 'Fetching…';

    try {
      const models = await fetchModels(urlInput.value.trim(), keyInput.value.trim());
      if (!models.length) {
        setStatus(fetchStatus, 'No models returned by this endpoint', 'err');
      } else {
        modelSel.innerHTML = '';
        models.forEach(id => modelSel.appendChild(new Option(id, id)));
        modelSel.disabled = false;
        testBtn.disabled  = false;
        setStatus(fetchStatus, `${models.length} model${models.length > 1 ? 's' : ''} loaded`, 'ok');
      }
    } catch (err) {
      setStatus(fetchStatus, err.message, 'err');
    }

    fetchBtn.textContent = 'Fetch Models';
    fetchBtn.disabled = false;
  });

  // Model change → reset test status
  modelSel.addEventListener('change', () => {
    testBtn.disabled = !modelSel.value;
    setStatus(testStatus, '', null);
  });

  // Test connection
  testBtn.addEventListener('click', async () => {
    setStatus(testStatus, '', null);
    testBtn.disabled  = true;
    testBtn.textContent = 'Testing…';

    try {
      await testConnection(urlInput.value.trim(), keyInput.value.trim(), modelSel.value);
      setStatus(testStatus, 'Connection successful', 'ok');
      // Only save after a passing test
      saveSetting({
        baseUrl:     urlInput.value.trim(),
        apiKey:      keyInput.value.trim(),
        model:       modelSel.value,
        temperature: parseFloat(tempSlider.value),
      });
    } catch (err) {
      setStatus(testStatus, err.message, 'err');
    }

    testBtn.textContent = 'Test Connection';
    testBtn.disabled = false;
  });

  // Temperature
  tempSlider.addEventListener('input', () => {
    const v = parseFloat(tempSlider.value);
    tempDisplay.textContent = v.toFixed(2);
    updateSliderFill(tempSlider);
  });

  tempSlider.addEventListener('change', () => {
    const existing = loadSaved();
    existing.temperature = parseFloat(tempSlider.value);
    saveSetting(existing);
  });
}

// ── Helpers ────────────────────────────────────────────────────

function setStatus(el, msg, type) {
  el.textContent = msg;
  el.className   = 'api-status' + (type ? ' ' + type : '');
}

function updateSliderFill(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const pct = ((parseFloat(slider.value) - min) / (max - min)) * 100;
  slider.style.background =
    `linear-gradient(to right, #007AFF 0%, #007AFF ${pct}%, #E5E5EA ${pct}%, #E5E5EA 100%)`;
}

function eyeIcon(visible) {
  const stroke = visible ? '#007AFF' : '#8E8E93';
  const slash   = visible
    ? `<line x1="3" y1="2" x2="19" y2="14" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/>`
    : '';
  return `<svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <path d="M11 1C6 1 2 8 2 8s4 7 9 7 9-7 9-7-4-7-9-7z" stroke="${stroke}" stroke-width="1.5"/>
    <circle cx="11" cy="8" r="3" stroke="${stroke}" stroke-width="1.5"/>
    ${slash}
  </svg>`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadSaved() {
  try { return JSON.parse(localStorage.getItem('lp_api_settings') || '{}'); }
  catch (_) { return {}; }
}

function saveSetting(data) {
  localStorage.setItem('lp_api_settings', JSON.stringify(data));
}
