import { t } from './i18n.js';
import { initPage, showToast, setBusy } from './main.js';

initPage('watermark');

const API = import.meta.env.PROD ? 'https://api.aizak.cn' : 'http://127.0.0.1:8000';

const els = {
  input: document.getElementById('link-input'),
  btnPaste: document.getElementById('btn-paste'),
  btnParse: document.getElementById('btn-parse'),
  result: document.getElementById('parse-result'),
  title: document.getElementById('result-title'),
  platform: document.getElementById('result-platform'),
  videoWrap: document.getElementById('result-video-wrap'),
  video: document.getElementById('result-video'),
  videoDl: document.getElementById('btn-video-download'),
  imagesWrap: document.getElementById('result-images-wrap'),
  imagesLabel: document.getElementById('images-label'),
  images: document.getElementById('result-images'),
  btnImagesDl: document.getElementById('btn-images-download'),
};

const PLATFORM_KEYS = {
  douyin: 'p_platform_douyin',
  kuaishou: 'p_platform_kuaishou',
  xiaohongshu: 'p_platform_xiaohongshu',
  bilibili: 'p_platform_bilibili',
};

const SUPPORTED_RE = /(v\.douyin\.com|douyin\.com\/video|iesdouyin\.com|chenzhongtech\.com|kuaishou\.com|v\.kuaishou\.com|kwai\.com|xiaohongshu\.com|xhslink\.com|b23\.tv|bilibili\.com\/video)/;

let lastResult = null;

function extractUrl(text) {
  const match = (text || '').match(/https?:\/\/[^\s]+/);
  return match ? match[0] : (text || '').trim();
}

async function parse() {
  const raw = els.input.value.trim();
  if (!raw) {
    showToast(t('p_err_empty'));
    return;
  }
  const url = extractUrl(raw);
  if (!SUPPORTED_RE.test(url)) {
    showToast(t('p_err_unsupported'));
    return;
  }
  els.btnParse.disabled = true;
  setBusy(true, t('p_loading'));
  try {
    const res = await fetch(`${API}/api/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const payload = await res.json();
    if (res.ok && payload.code === 0 && payload.data) {
      lastResult = payload.data;
      render(payload.data);
    } else {
      showToast((payload && payload.detail) || t('p_err_failed'));
    }
  } catch (err) {
    showToast(t('p_err_network'));
  } finally {
    setBusy(false);
    els.btnParse.disabled = false;
  }
}

function render(data) {
  els.result.hidden = false;
  els.title.textContent = data.title || '';
  els.platform.textContent = PLATFORM_KEYS[data.platform] ? t(PLATFORM_KEYS[data.platform]) : (data.platform || '');

  const hasVideo = !!data.video_url;
  const images = Array.isArray(data.images) ? data.images : [];
  els.videoWrap.hidden = !hasVideo;
  els.imagesWrap.hidden = images.length === 0;

  if (hasVideo) {
    els.video.src = `${API}/api/download?url=${encodeURIComponent(data.video_url)}`;
    els.videoDl.href = `${API}/api/download?url=${encodeURIComponent(data.video_url)}`;
  }

  els.images.innerHTML = '';
  images.forEach((src, i) => {
    const fig = document.createElement('figure');
    fig.className = 'parse-image';
    const img = document.createElement('img');
    img.src = `${API}/api/download?url=${encodeURIComponent(src)}`;
    img.alt = `image ${i + 1}`;
    img.loading = 'lazy';
    fig.appendChild(img);
    const cap = document.createElement('figcaption');
    const dl = document.createElement('a');
    dl.href = `${API}/api/download?url=${encodeURIComponent(src)}`;
    dl.target = '_blank';
    dl.rel = 'noopener';
    dl.textContent = t('p_btn_download');
    cap.appendChild(dl);
    fig.appendChild(cap);
    els.images.appendChild(fig);
  });

  if (images.length) {
    els.imagesLabel.textContent = t('p_result_images', { n: images.length });
    els.btnImagesDl.onclick = () => downloadAll(images);
  }

  els.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function downloadAll(images) {
  els.btnImagesDl.disabled = true;
  for (const src of images) {
    try {
      const res = await fetch(`${API}/api/download?url=${encodeURIComponent(src)}`);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'aixuno-image.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
      // continue with next
    }
  }
  els.btnImagesDl.disabled = false;
}

els.btnParse.addEventListener('click', parse);
els.input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') parse();
});
els.btnPaste.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      els.input.value = text;
      parse();
    } else {
      showToast(t('p_err_empty'));
    }
  } catch (err) {
    showToast(t('p_err_empty'));
  }
});
