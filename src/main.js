import { applyStaticTexts, getLang, setLang, LANGUAGES } from './i18n.js';
import { renderNetwork, renderFooterSites } from './network.js';

export function initPage(currentSite) {
  renderNetwork(currentSite);
  renderFooterSites();
  applyStaticTexts();
  renderLangSwitch();
  bindHeroCtaFocus();
}

// 首屏 CTA：滚动到操作区并聚焦上传框，减少一次无效点击
function bindHeroCtaFocus() {
  document.querySelectorAll('a[href="#workspace"]').forEach((cta) => {
    cta.addEventListener('click', () => {
      const dropzone = document.getElementById('dropzone');
      if (!dropzone) return;
      dropzone.focus({ preventScroll: true });
      dropzone.classList.add('dropzone--pulse');
      setTimeout(() => dropzone.classList.remove('dropzone--pulse'), 1200);
    });
  });
}

function renderLangSwitch() {
  const host = document.getElementById('lang-switch');
  if (!host) return;
  const render = () => {
    host.innerHTML = '';
    for (const l of LANGUAGES) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-btn' + (l.id === getLang() ? ' active' : '');
      btn.textContent = l.label;
      btn.setAttribute('aria-label', l.id === 'zh' ? '切换到中文' : 'Switch to English');
      btn.addEventListener('click', () => setLang(l.id));
      host.appendChild(btn);
    }
  };
  render();
  window.addEventListener('langchange', render);
}

let toastTimer = 0;

export function showToast(message, ms = 2800) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, ms);
}

export function setBusy(on, text) {
  const el = document.getElementById('busy');
  if (!el) return;
  if (text != null) {
    const t = el.querySelector('#busy-text');
    if (t) t.textContent = text;
  }
  el.hidden = !on;
}
