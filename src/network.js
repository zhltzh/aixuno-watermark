export const NETWORK_SITES = [
  { id: 'markdown', href: 'https://aixuno.com/', mark: 'MD', label: 'Markdown 转换' },
  { id: 'image', href: 'https://image.aixuno.com/', mark: 'IMG', label: 'Pixkit 图片' },
  { id: 'compress', href: 'https://compress.aixuno.com/', mark: 'ZIP', label: '文件压缩' },
  { id: 'pdf', href: 'https://pdf.aixuno.com/', mark: 'PDF', label: 'PDF 工具' },
  { id: 'bg', href: 'https://bg.aixuno.com/', mark: 'BG', label: 'AI 抠图' },
  { id: 'scan', href: 'https://scan.aixuno.com/', mark: 'DOC', label: '文档扫描' },
  { id: 'restore', href: 'https://restore.aixuno.com/', mark: 'FIX', label: '老照片修复' },
  { id: 'watermark', href: 'https://watermark.aixuno.com/', mark: 'WM', label: '视频去水印' },
];

export function renderNetwork(currentId) {
  const host = document.getElementById('network');
  if (!host) return;
  const items = NETWORK_SITES.map((site) => {
    if (site.id === currentId) {
      return `<span class="current" aria-current="page"><span class="mark">${site.mark}</span>${site.label}</span>`;
    }
    return `<a href="${site.href}"><span class="mark">${site.mark}</span>${site.label}</a>`;
  }).join('');
  host.innerHTML = `<div class="network__inner container"><span class="network__brand">AIXUNO</span>${items}</div>`;
}
