import { register, navigate } from './router.js';
import * as home        from '../screens/home.js';
import * as settings    from '../screens/settings.js';
import * as apiSettings from '../screens/api-settings.js';

register('home',         home);
register('settings',     settings);
register('api-settings', apiSettings);

// Stub screens for screens not yet built
function stub(name) {
  return {
    mount(el, nav) {
      el.innerHTML = `
        <div class="stub-screen screen">
          <h2>${name}</h2>
          <button class="stub-back-btn" id="stub-back">← Home</button>
        </div>`;
      el.querySelector('#stub-back').addEventListener('click', () => nav('home'));
    },
  };
}

['chat', 'contacts', 'diary', 'calendar', 'moments', 'story'].forEach(name =>
  register(name, stub(name.charAt(0).toUpperCase() + name.slice(1)))
);

navigate('home');
