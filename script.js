// script.js — minimal interactions for the static landing page

// DOM helpers
const $ = (sel) => document.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
  // Fill current year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

// Theme toggle: respects saved preference and OS setting
(() => {
  const STORAGE_KEY = 'site-theme'; // 'light' | 'dark'
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'dark') html.setAttribute('data-theme','dark');
    else html.removeAttribute('data-theme');

    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    updateToggleA11y(theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Overlay circle animation
      const rect = toggle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const radius = Math.sqrt(Math.max(cx, vw - cx)**2 + Math.max(cy, vh - cy)**2);
      const diameter = Math.ceil(radius * 2);

      const overlay = document.createElement('div');
      overlay.className = 'theme-overlay';
      overlay.style.left = `${cx}px`;
      overlay.style.top = `${cy}px`;
      overlay.style.width = '24px';
      overlay.style.height = '24px';
      overlay.style.background = targetTheme === 'dark' ? '#0b1220' : '#ffffff'; // different colors per transition
      document.body.appendChild(overlay);

      // Force layout
      overlay.getBoundingClientRect();
      html.classList.add('theme-animating');

      // Expand overlay
      overlay.style.width = overlay.style.height = `${diameter}px`;
      overlay.style.transform = 'translate(-50%, -50%) scale(1)';

      overlay.addEventListener('transitionend', function onEnd(ev){
        if (ev.propertyName === 'transform' || ev.propertyName === 'width') {
          overlay.removeEventListener('transitionend', onEnd);
          localStorage.setItem(STORAGE_KEY, targetTheme);
          applyTheme(targetTheme);

          // Retract overlay
          setTimeout(() => {
            overlay.style.transform = 'translate(-50%, -50%) scale(0)';
            overlay.addEventListener('transitionend', function cleanup(){
              if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
              html.classList.remove('theme-animating');
            }, {once:true});
          }, 120);
        }
      });
    });
  }

  function updateToggleA11y(theme) {
    if (!toggle) return;
    if (theme === 'dark') {
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('aria-label', 'Switch to light theme');
      toggle.title = 'Switch to light theme';
    } else {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', 'Switch to dark theme');
      toggle.title = 'Switch to dark theme';
    }
  }

  // Initialize theme on load
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTheme);
  else initTheme();
})();
