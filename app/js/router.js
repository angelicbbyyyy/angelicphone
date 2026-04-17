const registry = {};
let currentUnmount = null;

export function register(name, mod) {
  registry[name] = mod;
}

export function navigate(name) {
  const app = document.getElementById('app');
  if (currentUnmount) {
    currentUnmount();
    currentUnmount = null;
  }
  app.innerHTML = '';
  const mod = registry[name];
  if (!mod) {
    console.error(`Screen "${name}" not registered`);
    return;
  }
  mod.mount(app, navigate);
  currentUnmount = mod.unmount || null;
}
