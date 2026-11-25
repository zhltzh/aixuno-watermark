import { getLang } from './i18n.js';

export const NETWORK_SITES = [
  { id: 'markdown', href: 'https://aixuno.com/', mark: 'MD', tone: 'amber', label: { en: 'Markdown', zh: 'Markdown 转换' } },
  { id: 'image', href: 'https://image.aixuno.com/', mark: 'IMG', tone: 'fuchsia', label: { en: 'Pixkit Images', zh: 'Pixkit 图片批量处理' } },
  { id: 'compress', href: 'https://compress.aixuno.com/', mark: 'ZIP', tone: 'sky', label: { en: 'File Compress', zh: '文件压缩' } },
  { id: 'pdf', href: 'https://pdf.aixuno.com/', mark: 'PDF', tone: 'rose', label: { en: 'PDF Tools', zh: 'PDF 工具' } },
  { id: 'bg', href: 'https://bg.aixuno.com/', mark: 'BG', tone: 'violet', label: { en: 'AI Cutout', zh: 'AI 抠图' } },
  { id: 'scan', href: 'https://scan.aixuno.com/', mark: 'DOC', tone: 'blue', label: { en: 'Document Scan', zh: '文档扫描' } },
  { id: 'idphoto', href: 'https://idphoto.aixuno.com/', mark: 'ID', tone: 'pink', label: { en: 'ID Photo', zh: '证件照制作' } },
  { id: 'restore', href: 'https://restore.aixuno.com/', mark: 'FIX', tone: 'indigo', label: { en: 'Photo Restore', zh: '老照片修复' } },
  { id: 'watermark', href: 'https://watermark.aixuno.com/', mark: 'WM', tone: 'cyan', label: { en: 'Watermark Remover', zh: '视频去水印' } },
];

let currentSiteId = null;

export function renderNetwork(currentId) {
  if (currentId) currentSiteId = currentId;
  const host = document.getElementById('network');
  if (!host) return;
  const lang = getLang();
  const items = NETWORK_SITES.map((site) => {
    const label = site.label[lang] || site.label.en;
    if (site.id === currentSiteId) {
      return `<span class="current" aria-current="page"><span class="mark mark--${site.tone}">${site.mark}</span>${label}</span>`;
    }
    return `<a href="${site.href}"><span class="mark mark--${site.tone}">${site.mark}</span>${label}</a>`;
  }).join('');
  host.innerHTML = `<div class="network__inner container"><span class="network__brand">AIXUNO</span>${items}</div>`;
}

export function renderFooterSites() {
  let host = document.getElementById('footer-sites');
  if (!host) {
    const inner = document.querySelector('.site-footer__inner');
    if (!inner) return;
    host = document.createElement('span');
    host.className = 'footer-sites';
    host.id = 'footer-sites';
    inner.appendChild(host);
  }
  const lang = getLang();
  host.innerHTML = NETWORK_SITES.map((site) => {
    const label = site.label[lang] || site.label.en;
    if (site.id === currentSiteId) {
      return `<span class="footer-site-current" aria-current="page">${label}</span>`;
    }
    return `<a href="${site.href}">${label}</a>`;
  }).join('');
}

if (typeof window !== 'undefined') {
  window.addEventListener('langchange', () => {
    renderNetwork();
    renderFooterSites();
  });
}
