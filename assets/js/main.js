// Theme toggle, mobile menu and footer year. Kept tiny on purpose: the site
// works fully without JavaScript, this only adds conveniences.

(function () {
  const root = document.documentElement;

  function readTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function writeTheme(value) {
    try { localStorage.setItem('theme', value); } catch (e) { /* private mode */ }
  }

  const saved = readTheme();
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        writeTheme(next);
      });
    }

    const menuBtn = document.querySelector('[data-menu-toggle]');
    const links = document.getElementById('nav-links');
    if (menuBtn && links) {
      menuBtn.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
      });
      links.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
          links.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
