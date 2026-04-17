// ── Settings screen ──────────────────────────────────────────

let _navigate = null;

export function mount(el, navigate) {
  _navigate = navigate;
  renderSettings(el);
}

export function unmount() {
  _navigate = null;
}

// ─────────────────────────────────────────────────────────────
// Main Settings view
// ─────────────────────────────────────────────────────────────
function renderSettings(el) {
  el.innerHTML = `
    <div class="settings-screen screen">
      <div class="status-bar"></div>

      <!-- Back to home nav bar -->
      <div class="settings-nav-bar">
        <button class="settings-back-btn" id="settings-back">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5 9 16" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Home
        </button>
      </div>

      <div class="settings-title">Settings</div>

      <!-- Profile card -->
      <div class="settings-profile-card">
        <div class="settings-profile-row">
          <label class="settings-avatar-label" for="settings-profile-input">
            <input id="settings-profile-input" type="file" accept="image/*">
            <div class="settings-avatar-circle">
              <img id="settings-profile-img" alt="Profile">
              <!-- Default avatar -->
              <svg id="settings-profile-default" viewBox="0 0 58 58" width="58" height="58" fill="none">
                <rect width="58" height="58" fill="#8E8E93"/>
                <ellipse cx="29" cy="38" rx="11" ry="13" fill="#D62828"/>
                <ellipse cx="29" cy="38" rx="7"  ry="9"  fill="#A01010" opacity="0.5"/>
                <rect x="27" y="14" width="4" height="22" rx="2" fill="#C49A3C"/>
                <rect x="25" y="10" width="8" height="7"  rx="2" fill="#C49A3C"/>
                <line x1="29" y1="38" x2="29" y2="14" stroke="#FFD700" stroke-width="0.8"/>
                <line x1="27.5" y1="38" x2="27.5" y2="14" stroke="#FFD700" stroke-width="0.6"/>
                <line x1="30.5" y1="38" x2="30.5" y2="14" stroke="#FFD700" stroke-width="0.6"/>
                <circle cx="29" cy="38" r="3.5" fill="#6B0000"/>
              </svg>
            </div>
            <div class="settings-camera-badge">
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                <path d="M9 7.5H1a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h1L2.5 1h5l.5 1.5H9a.5.5 0 01.5.5v4a.5.5 0 01-.5.5z"
                  stroke="#636366" stroke-width="0.8"/>
                <circle cx="5" cy="4.75" r="1.5" stroke="#636366" stroke-width="0.8"/>
              </svg>
            </div>
          </label>

          <div class="settings-profile-info">
            <div class="settings-profile-name">My Character</div>
            <div class="settings-profile-sub">API Keys, Memory &amp; more</div>
          </div>

          ${chevronSVG()}
        </div>
      </div>

      <!-- Group 1: Appearance -->
      <div class="settings-group">
        ${row({
          iconBg: '#FF9500',
          iconSVG: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M8.5 1.5C8.5 1.5 5 5 5 9.5H2L1 11l4 1 1 4 1.5-1V12h2v2.5L11 16l1-4 4-1-1-1.5h-3c0-4.5-3.5-8-3.5-8z" fill="white"/>
          </svg>`,
          label: 'Airplane Mode',
          rightHTML: `<button class="toggle" id="airplane-toggle" role="switch" aria-checked="false">
            <span class="toggle-thumb"></span>
          </button>`,
          id: 'row-airplane',
          clickable: false,
        })}
        ${sep()}
        ${row({
          iconBg: '#007AFF',
          iconSVG: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="6" stroke="white" stroke-width="1.5"/>
            <path d="M5 8.5a3.5 3.5 0 003.5 3.5" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M8.5 5a3.5 3.5 0 013.5 3.5" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
          </svg>`,
          label: 'Theme',
          rightHTML: chevronSVG(),
        })}
        ${sep()}
        ${row({
          iconBg: '#007AFF',
          iconSVG: `<svg width="12" height="17" viewBox="0 0 12 17" fill="none">
            <path d="M6 1v15M6 1l5 4.5L6 10M6 16l5-4.5L6 6.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          label: 'Wallpaper',
          rightHTML: `<div class="settings-row-right">
            <span class="settings-row-value">Default</span>${chevronSVG()}
          </div>`,
          id: 'row-wallpaper',
        })}
        ${sep()}
        ${row({
          iconBg: '#34C759',
          iconSVG: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <rect x="2" y="2" width="13" height="13" rx="3" stroke="white" stroke-width="1.5"/>
            <path d="M5 8.5h7M8.5 5v7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`,
          label: 'Icons',
          rightHTML: chevronSVG(),
        })}
      </div>

      <!-- Group 2: API & System -->
      <div class="settings-group">
        ${row({
          iconBg: '#34C759',
          iconSVG: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M8.5 12A3.5 3.5 0 105 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8.5 15A6.5 6.5 0 102 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8.5" cy="8.5" r="2" fill="white"/>
          </svg>`,
          label: 'General API',
          rightHTML: chevronSVG(),
          id: 'row-general-api',
        })}
        ${sep()}
        ${row({
          iconBg: '#FF3B30',
          iconSVG: `<svg width="17" height="14" viewBox="0 0 17 14" fill="none">
            <rect x="1" y="1" width="15" height="12" rx="3" stroke="white" stroke-width="1.3"/>
            <path d="M5 7h7M8.5 4.5v5" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
          </svg>`,
          label: 'Voice API',
          rightHTML: `<div class="settings-row-right">
            <span class="settings-row-value">MiniMax</span>${chevronSVG()}
          </div>`,
          id: 'row-voice-api',
        })}
        ${sep()}
        ${row({
          iconBg: '#5856D6',
          iconSVG: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M2 8.5h2.5M12.5 8.5H15M8.5 2v2.5M8.5 12.5V15" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="8.5" cy="8.5" r="3" stroke="white" stroke-width="1.5"/>
          </svg>`,
          label: 'Memory API',
          rightHTML: `<div class="settings-row-right">
            <span class="settings-row-value">Haiku</span>${chevronSVG()}
          </div>`,
          id: 'row-memory-api',
        })}
        ${sep()}
        ${row({
          iconBg: '#FF3B30',
          iconSVG: `<svg width="15" height="17" viewBox="0 0 15 17" fill="none">
            <path d="M7.5 1.5a1 1 0 00-1 1v.6C4.1 3.1 2.5 5.1 2.5 7.5v4L1 13h13l-1.5-1.5v-4C12.5 5.1 10.9 3.1 8.5 2.6V2a1 1 0 00-1-.5z" fill="white"/>
            <path d="M6 14a1.5 1.5 0 003 0" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
          </svg>`,
          label: 'Notifications',
          rightHTML: chevronSVG(),
        })}
      </div>

      <!-- Search bar -->
      <div class="settings-search">
        <div class="settings-search-bar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#8E8E93" stroke-width="1.5"/>
            <path d="M11 11l3.5 3.5" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span>Search</span>
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <path d="M8 1a4 4 0 014 4v5a4 4 0 01-8 0V5a4 4 0 014-4z" stroke="#8E8E93" stroke-width="1.5"/>
            <path d="M1 11a7 7 0 0014 0" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 18v3" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  `;

  // Back to home
  el.querySelector('#settings-back').addEventListener('click', () => _navigate('home'));

  // Airplane mode toggle
  const toggle = el.querySelector('#airplane-toggle');
  toggle.addEventListener('click', () => {
    const on = toggle.classList.toggle('on');
    toggle.setAttribute('aria-checked', String(on));
  });

  // Wallpaper sub-screen
  el.querySelector('#row-wallpaper').addEventListener('click', () => renderWallpaper(el));

  // Profile image upload
  const profileInput = el.querySelector('#settings-profile-input');
  const profileImg   = el.querySelector('#settings-profile-img');
  const profileDef   = el.querySelector('#settings-profile-default');
  profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      profileImg.src = ev.target.result;
      profileImg.classList.add('loaded');
      if (profileDef) profileDef.style.display = 'none';
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });
}

// ─────────────────────────────────────────────────────────────
// Wallpaper sub-screen
// ─────────────────────────────────────────────────────────────
function renderWallpaper(el) {
  el.innerHTML = `
    <div class="wallpaper-screen screen">
      <div class="status-bar"></div>

      <div class="wallpaper-nav">
        <button class="wallpaper-back-btn" id="wallpaper-back">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5 9 16" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="wallpaper-nav-title">Wallpaper</span>
        <button class="wallpaper-edit-btn">Edit</button>
      </div>

      <!-- Wallpaper card -->
      <div class="wallpaper-card">
        <div class="wallpaper-label">CURRENT</div>
        <div class="wallpaper-mockups">
          <!-- Lock screen mockup -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
            <div class="phone-mockup phone-mockup-lock" id="lock-mockup">
              <img id="lock-wallpaper-img" alt="lock wallpaper">
              <div class="phone-mockup-time" id="lock-time-placeholder">09:41</div>
              <button class="phone-mockup-btn" id="lock-customise-btn">Customise
                <input id="lock-wallpaper-input" type="file" accept="image/*"
                  style="position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0,0,0,0);">
              </button>
            </div>
          </div>
          <!-- Home screen mockup -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
            <div class="phone-mockup phone-mockup-home" id="home-mockup">
              <img id="home-wallpaper-img" alt="home wallpaper">
              <div class="phone-mockup-grid" id="home-grid-placeholder">
                ${Array.from({ length: 20 }).map(() => '<div class="phone-mockup-app"></div>').join('')}
              </div>
              <button class="phone-mockup-btn" id="home-customise-btn">Customise
                <input id="home-wallpaper-input" type="file" accept="image/*"
                  style="position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0,0,0,0);">
              </button>
            </div>
          </div>
        </div>

        <!-- Dots -->
        <div class="wallpaper-dots">
          ${Array.from({ length: 9 }).map((_, i) =>
            `<div class="wallpaper-dot${i === 7 ? ' active' : ''}"></div>`
          ).join('')}
        </div>

        <!-- Remove -->
        <div class="wallpaper-remove-wrap">
          <button class="wallpaper-remove-btn" id="wallpaper-remove">Remove Wallpaper</button>
        </div>
      </div>

      <!-- Info card -->
      <div class="wallpaper-info-card">
        <div class="wallpaper-info-text">
          <div class="wallpaper-info-title">Change your Wallpaper from the Lock Screen</div>
          <div class="wallpaper-info-body">From your Lock Screen, touch and hold to add, edit or switch between different wallpapers and widgets.</div>
        </div>
        <div class="wallpaper-info-thumb">
          <div class="wallpaper-info-thumb-l"></div>
          <div class="wallpaper-info-thumb-div"></div>
          <div class="wallpaper-info-thumb-r"></div>
          <div class="wallpaper-info-dot"></div>
        </div>
      </div>
    </div>
  `;

  el.querySelector('#wallpaper-back').addEventListener('click', () => renderSettings(el));

  // Lock wallpaper upload
  setupWallpaperUpload(el, 'lock-wallpaper-input', 'lock-wallpaper-img', 'lock-time-placeholder', 'lock-customise-btn');
  // Home wallpaper upload
  setupWallpaperUpload(el, 'home-wallpaper-input', 'home-wallpaper-img', 'home-grid-placeholder', 'home-customise-btn');

  // Remove
  el.querySelector('#wallpaper-remove').addEventListener('click', () => {
    ['lock-wallpaper-img', 'home-wallpaper-img'].forEach(id => {
      const img = el.querySelector(`#${id}`);
      img.src = '';
      img.classList.remove('loaded');
    });
    const lockPh = el.querySelector('#lock-time-placeholder');
    if (lockPh) lockPh.style.display = '';
    const homePh = el.querySelector('#home-grid-placeholder');
    if (homePh) homePh.style.display = '';
  });
}

function setupWallpaperUpload(el, inputId, imgId, placeholderId, btnId) {
  const btn   = el.querySelector(`#${btnId}`);
  const input = el.querySelector(`#${inputId}`);
  const img   = el.querySelector(`#${imgId}`);
  const ph    = el.querySelector(`#${placeholderId}`);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    input.click();
  });

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.classList.add('loaded');
      if (ph) ph.style.display = 'none';
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function chevronSVG() {
  return `<svg class="chevron" width="8" height="13" viewBox="0 0 8 13" fill="none">
    <path d="M1 1l6 5.5L1 12" stroke="#C7C7CC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function sep() {
  return '<div class="separator"></div>';
}

function row({ iconBg, iconSVG, label, rightHTML, id = '', clickable = true }) {
  return `
    <div class="settings-row" ${id ? `id="${id}"` : ''} style="cursor:${clickable ? 'pointer' : 'default'};">
      <div class="setting-icon" style="background:${iconBg};">${iconSVG}</div>
      <span class="settings-row-label">${label}</span>
      ${rightHTML}
    </div>`;
}
