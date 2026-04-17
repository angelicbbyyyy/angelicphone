const STARS = [
  { x: 14,  y: 62,  s: 30, o: 0.42 },
  { x: 332, y: 38,  s: 22, o: 0.32 },
  { x: 356, y: 168, s: 17, o: 0.28 },
  { x: 6,   y: 288, s: 26, o: 0.36 },
  { x: 346, y: 336, s: 19, o: 0.38 },
  { x: 22,  y: 462, s: 28, o: 0.32 },
  { x: 364, y: 514, s: 16, o: 0.36 },
  { x: 10,  y: 634, s: 23, o: 0.30 },
  { x: 360, y: 718, s: 22, o: 0.38 },
  { x: 42,  y: 762, s: 16, o: 0.26 },
  { x: 198, y: 16,  s: 13, o: 0.22 },
  { x: 176, y: 830, s: 15, o: 0.28 },
  { x: 72,  y: 180, s: 12, o: 0.20 },
  { x: 310, y: 600, s: 14, o: 0.24 },
];

function starsHTML() {
  return STARS.map(({ x, y, s, o }) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 20 20"
      style="position:absolute;left:${x}px;top:${y}px;pointer-events:none;z-index:0">
      <path d="M10 1 L11.8 7.5 L18.5 10 L11.8 12.5 L10 19 L8.2 12.5 L1.5 10 L8.2 7.5 Z"
        fill="rgba(170,170,195,${o})"/>
    </svg>`
  ).join('');
}

function messagesIconHTML() {
  return `
    <div class="messages-icon">
      <div class="msg-layer msg-glow-outer"></div>
      <div class="msg-layer msg-blur-35"></div>
      <div class="msg-layer msg-glow-mid"></div>
      <div class="msg-layer msg-blur-40"></div>
      <div class="msg-layer msg-glow-inner"></div>
      <div class="msg-bubble">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="msg-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="14.65%" stop-color="rgba(255,255,255,0.6)"/>
              <stop offset="85.35%" stop-color="rgba(255,255,255,0.3)"/>
            </linearGradient>
            <linearGradient id="msg-g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="14.65%" stop-color="rgba(255,255,255,0.6)"/>
              <stop offset="49.48%" stop-color="rgba(255,255,255,0)"/>
              <stop offset="85.15%" stop-color="rgba(255,255,255,0.3)"/>
            </linearGradient>
            <linearGradient id="msg-g3" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="6.51%"  stop-color="rgba(255,255,255,0.7)"/>
              <stop offset="51.64%" stop-color="rgba(255,255,255,0.45)"/>
              <stop offset="93.47%" stop-color="rgba(255,255,255,0.55)"/>
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="72" height="54" rx="15" fill="url(#msg-g1)"/>
          <rect x="4" y="4" width="72" height="54" rx="15" fill="url(#msg-g2)"/>
          <rect x="36" y="36" width="7"  height="24" rx="2" fill="url(#msg-g3)"/>
          <rect x="34" y="20" width="6"  height="30" rx="2" fill="url(#msg-g3)" opacity="0.8"/>
          <circle cx="22" cy="31" r="5" fill="rgba(255,255,255,0.55)"/>
          <circle cx="40" cy="31" r="5" fill="rgba(255,255,255,0.55)"/>
          <circle cx="58" cy="31" r="5" fill="rgba(255,255,255,0.55)"/>
        </svg>
      </div>
    </div>`;
}

function gearIconHTML(size, color) {
  const ticks = [0, 45, 90, 135, 180, 225, 270, 315].map(deg =>
    `<rect x="14" y="1" width="2" height="5" rx="1" fill="${color}" transform="rotate(${deg} 15 15)"/>`
  ).join('');
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="5" stroke="${color}" stroke-width="2.2"/>
      ${ticks}
    </svg>`;
}

function render(el, navigate) {
  el.innerHTML = `
    <div class="home-screen screen">
      ${starsHTML()}

      <div class="status-bar"></div>

      <!-- Profile card -->
      <div class="profile-card">
        <div class="profile-card-top">
          <!-- WiFi icon -->
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M10 13a1.5 1.5 0 100 2 1.5 1.5 0 000-2z" fill="#8E8E93"/>
            <path d="M5 9c1.4-1.4 3-2.2 5-2.2s3.6.8 5 2.2" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M1 5c2.4-2.4 5.4-3.8 9-3.8s6.6 1.4 9 3.8" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round"/>
          </svg>

          <div class="profile-center">
            <!-- Avatar upload -->
            <label class="upload-widget avatar-widget" for="home-profile-input">
              <input id="home-profile-input" type="file" accept="image/*">
              <img id="home-profile-img" alt="profile">
              <div class="upload-placeholder avatar-default">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="12" r="7" fill="#8E8E93"/>
                  <ellipse cx="16" cy="30" rx="12" ry="8" fill="#8E8E93"/>
                </svg>
              </div>
            </label>
            <!-- Name pill -->
            <div class="profile-name-pill">
              <span contenteditable="true">baby</span>
            </div>
          </div>

          <!-- Clock icon -->
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#8E8E93" stroke-width="1.3"/>
            <path d="M10 5v5l3 3" stroke="#8E8E93" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="profile-char-name">
          <span contenteditable="true">あかさん</span>
        </div>
        <div class="profile-handle">
          <span contenteditable="true">@angelica</span>
        </div>

        <div class="profile-card-bottom">
          <span class="profile-time" id="home-time"></span>
          <div class="profile-status">
            <span contenteditable="true">i love you to the moon</span>
          </div>
          <span class="profile-date" id="home-date"></span>
        </div>
      </div>

      <!-- Grid Row 1: large widget + 2x2 icons -->
      <div class="grid-row-1">
        <label class="upload-widget large-widget" for="widget1-input">
          <input id="widget1-input" type="file" accept="image/*">
          <img id="widget1-img" alt="">
          <div class="upload-placeholder">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#AEAEC0" stroke-width="1.5"/>
              <path d="M14 9v10M9 14h10" stroke="#AEAEC0" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </label>

        <div class="icon-grid-2x2">
          <!-- Messages -->
          <button class="app-icon" id="nav-messages">
            ${messagesIconHTML()}
            <span>Messages</span>
          </button>

          <!-- Contacts -->
          <button class="app-icon" id="nav-contacts">
            <div class="app-icon-bg" style="background:#F2F2F7;">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="11" r="7" fill="#636366"/>
                <ellipse cx="16" cy="28" rx="13" ry="7" fill="#636366"/>
                <rect x="27" y="6" width="3" height="12" rx="1.5" fill="#FF3B30"/>
                <rect x="27" y="6" width="3" height="12" rx="1.5" fill="#FF9500" opacity="0.6"/>
              </svg>
            </div>
            <span>Contacts</span>
          </button>

          <!-- Diary -->
          <button class="app-icon" id="nav-diary">
            <div class="app-icon-bg" style="background:#FF6B8A;">
              <svg width="31" height="31" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="2" width="22" height="28" rx="4" fill="white" opacity="0.9"/>
                <path d="M9 10h14M9 15h14M9 20h9" stroke="#FF6B8A" stroke-width="2" stroke-linecap="round"/>
                <path d="M4 6a4 4 0 014-4" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              </svg>
            </div>
            <span>Diary</span>
          </button>

          <!-- Calendar (live) -->
          <button class="app-icon" id="nav-calendar">
            <div class="calendar-icon-widget">
              <div class="cal-header"><span id="cal-day-name"></span></div>
              <div class="cal-body"><span id="cal-day-num"></span></div>
            </div>
            <span>Calendar</span>
          </button>
        </div>
      </div>

      <!-- Grid Row 2: 2 icons + polaroid -->
      <div class="grid-row-2">
        <!-- Moments -->
        <button class="app-icon" id="nav-moments">
          <div class="app-icon-bg" style="background:#BF5AF2;">
            <svg width="31" height="31" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="8" width="28" height="20" rx="5" stroke="white" stroke-width="2"/>
              <circle cx="16" cy="18" r="5" stroke="white" stroke-width="2"/>
              <rect x="11" y="4" width="10" height="5" rx="2.5" fill="white"/>
              <circle cx="24" cy="13" r="2" fill="white"/>
            </svg>
          </div>
          <span>Moments</span>
        </button>

        <!-- Story (replaces Shop) -->
        <button class="app-icon" id="nav-story">
          <div class="app-icon-bg" style="background:#FF2D55;">
            <svg width="31" height="29" viewBox="0 0 31 29" fill="none">
              <path d="M15.5 26C15.5 26 2 17.8 2 9.5C2 5.4 5.4 2 9.5 2C12.1 2 14.4 3.4 15.5 5.5C16.6 3.4 18.9 2 21.5 2C25.6 2 29 5.4 29 9.5C29 17.8 15.5 26 15.5 26Z"
                fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span>Story</span>
        </button>

        <!-- Polaroid upload -->
        <label class="polaroid-widget" for="widget2-input">
          <input id="widget2-input" type="file" accept="image/*">
          <img id="widget2-img" alt="">
          <div class="polaroid-placeholder">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#AEAEC0" stroke-width="1.5"/>
              <path d="M14 9v10M9 14h10" stroke="#AEAEC0" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </label>
      </div>

      <!-- Dock -->
      <div class="dock">
        <div class="dock-bg">
          <!-- Phone -->
          <div class="dock-icon">
            <div class="dock-icon-bg" style="background:#34C759;">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 4a2 2 0 012-2h4l2 7-3 2c1.5 3 4 5.5 7 7l2-3 7 2v4a2 2 0 01-2 2C10 27 5 10 6 4z" fill="white"/>
              </svg>
            </div>
          </div>
          <!-- Music -->
          <div class="dock-icon">
            <div class="dock-icon-bg" style="background:#FF2D55;">
              <svg width="30" height="32" viewBox="0 0 30 32" fill="none">
                <path d="M10 26a4 4 0 100-8 4 4 0 000 8z" fill="white"/>
                <path d="M14 18V8l12-3v8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <circle cx="22" cy="18" r="4" fill="white"/>
              </svg>
            </div>
          </div>
          <!-- Settings -->
          <button class="dock-icon" id="nav-settings" style="background:none;border:none;cursor:pointer;">
            <div class="dock-icon-bg" style="background:#8E8E93;">
              ${gearIconHTML(32, 'white')}
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  // ── Clock ────────────────────────────────────────────────────
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeEl    = el.querySelector('#home-time');
  const dateEl    = el.querySelector('#home-date');
  const calDayNum = el.querySelector('#cal-day-num');
  const calDayName = el.querySelector('#cal-day-name');

  function tick() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const d  = String(now.getDate()).padStart(2, '0');
    const m  = String(now.getMonth() + 1).padStart(2, '0');
    dateEl.textContent = `${d}/${m}`;
    calDayNum.textContent  = now.getDate();
    calDayName.textContent = DAY_NAMES[now.getDay()];
  }
  tick();
  _clockId = setInterval(tick, 1000);

  // ── Upload widgets ───────────────────────────────────────────
  setupUpload('home-profile-input', 'home-profile-img');
  setupUpload('widget1-input', 'widget1-img');
  setupUpload('widget2-input', 'widget2-img', '.polaroid-placeholder');

  // ── Navigation ───────────────────────────────────────────────
  el.querySelector('#nav-settings').addEventListener('click', () => navigate('settings'));
  el.querySelector('#nav-messages').addEventListener('click', () => navigate('chat'));
  el.querySelector('#nav-contacts').addEventListener('click', () => navigate('contacts'));
  el.querySelector('#nav-diary').addEventListener('click', () => navigate('diary'));
  el.querySelector('#nav-calendar').addEventListener('click', () => navigate('calendar'));
  el.querySelector('#nav-moments').addEventListener('click', () => navigate('moments'));
  el.querySelector('#nav-story').addEventListener('click', () => navigate('story'));
}

function setupUpload(inputId, imgId, placeholderSelector) {
  const input = document.getElementById(inputId);
  const img   = document.getElementById(imgId);
  if (!input || !img) return;

  const placeholder = placeholderSelector
    ? img.closest('label, .polaroid-widget')?.querySelector(placeholderSelector)
    : img.closest('label')?.querySelector('.upload-placeholder, .avatar-default');

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.classList.add('loaded');
      if (placeholder) placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });
}

let _clockId = null;

export function mount(el, navigate) {
  render(el, navigate);
}

export function unmount() {
  if (_clockId) {
    clearInterval(_clockId);
    _clockId = null;
  }
}
