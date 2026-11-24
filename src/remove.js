import { t } from './i18n.js';
import { initPage, showToast } from './main.js';
import { apiAvailable, uploadFile, createJob, pollJob, jobFileUrl } from './api.js';

initPage('watermark');

const els = {
  empty: document.getElementById('wm-empty'),
  editor: document.getElementById('wm-editor'),
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  video: document.getElementById('wm-video'),
  overlay: document.getElementById('box-overlay'),
  boxesList: document.getElementById('boxes-list'),
  methodCards: document.getElementById('method-cards'),
  agree: document.getElementById('wm-agree'),
  btnSubmit: document.getElementById('btn-submit'),
  btnReset: document.getElementById('btn-reset'),
  progressWrap: document.getElementById('wm-progress'),
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),
  resultPanel: document.getElementById('wm-result'),
  resultVideo: document.getElementById('result-video'),
  btnResultDownload: document.getElementById('btn-result-download'),
  btnResultReplay: document.getElementById('btn-result-replay'),
};

const MAX_SIZE = 200 * 1024 * 1024;
const MAX_DURATION = 300;
let videoFile = null;
let videoUrl = null;
let regions = [];
let drawing = null;

if (els.dropzone) {
  els.dropzone.addEventListener('click', () => els.fileInput.click());
  els.dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      els.fileInput.click();
    }
  });
  els.fileInput.addEventListener('change', () => handleFile(els.fileInput.files[0]));
  els.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    els.dropzone.classList.add('dragover');
  });
  els.dropzone.addEventListener('dragleave', () => els.dropzone.classList.remove('dragover'));
  els.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    els.dropzone.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
  });

  async function handleFile(file) {
    if (!file) return;
    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|m4v)$/i.test(file.name || '');
    if (!isVideo) {
      showToast(t('w_toast_not_video'));
      return;
    }
    if (file.size > MAX_SIZE) {
      showToast(t('w_toast_too_large'));
      return;
    }
    videoFile = file;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    videoUrl = URL.createObjectURL(file);
    els.video.src = videoUrl;
    els.resultPanel.hidden = true;
    els.progressWrap.hidden = true;
    els.empty.hidden = true;
    els.editor.hidden = false;
  }

  els.video.addEventListener('loadedmetadata', () => {
    if (els.video.duration > MAX_DURATION) {
      showToast(t('w_toast_too_long'));
      resetEditor();
      return;
    }
    els.video.currentTime = Math.min(0.2, (els.video.duration || 1) / 2);
  });

  els.video.addEventListener('seeked', setupOverlay);
  els.video.addEventListener('loadeddata', setupOverlay);

  function setupOverlay() {
    const vw = els.video.videoWidth;
    const vh = els.video.videoHeight;
    if (!vw || !vh) return;
    els.overlay.width = vw;
    els.overlay.height = vh;
    renderRegions();
  }

  function overlayPos(e) {
    const rect = els.overlay.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * els.overlay.width;
    const y = ((e.clientY - rect.top) / rect.height) * els.overlay.height;
    return {
      x: Math.max(0, Math.min(els.overlay.width, x)),
      y: Math.max(0, Math.min(els.overlay.height, y)),
    };
  }

  els.overlay.addEventListener('pointerdown', (e) => {
    if (!els.video.videoWidth) return;
    const p = overlayPos(e);
    drawing = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    try {
      els.overlay.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    e.preventDefault();
  });

  els.overlay.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const p = overlayPos(e);
    drawing.x1 = p.x;
    drawing.y1 = p.y;
    renderRegions();
  });

  const finishDraw = () => {
    if (!drawing) return;
    const x = Math.min(drawing.x0, drawing.x1);
    const y = Math.min(drawing.y0, drawing.y1);
    const w = Math.abs(drawing.x1 - drawing.x0);
    const h = Math.abs(drawing.y1 - drawing.y0);
    drawing = null;
    if (w < 8 || h < 8) {
      renderRegions();
      return;
    }
    regions.push({
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(w),
      h: Math.round(h),
    });
    renderRegions();
    renderList();
  };

  els.overlay.addEventListener('pointerup', finishDraw);
  els.overlay.addEventListener('pointercancel', finishDraw);

  function renderRegions() {
    const ctx = els.overlay.getContext('2d');
    ctx.clearRect(0, 0, els.overlay.width, els.overlay.height);
    const all = drawing
      ? regions.concat([
          {
            x: Math.min(drawing.x0, drawing.x1),
            y: Math.min(drawing.y0, drawing.y1),
            w: Math.abs(drawing.x1 - drawing.x0),
            h: Math.abs(drawing.y1 - drawing.y0),
          },
        ])
      : regions;
    for (const r of all) {
      ctx.fillStyle = 'rgba(37, 99, 235, 0.28)';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.lineWidth = Math.max(2, els.overlay.width / 500);
      ctx.strokeStyle = '#2563eb';
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
  }

  function renderList() {
    els.boxesList.innerHTML = '';
    if (!regions.length) {
      const empty = document.createElement('span');
      empty.className = 'footnote';
      empty.textContent = t('w_boxes_empty');
      els.boxesList.appendChild(empty);
      return;
    }
    regions.forEach((r, i) => {
      const chip = document.createElement('span');
      chip.className = 'box-chip';
      const label = document.createElement('span');
      label.textContent = `${t('w_box_item', { n: i + 1 })} · ${r.w}×${r.h}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t('w_box_remove');
      btn.setAttribute('aria-label', `${t('w_box_remove')} ${i + 1}`);
      btn.addEventListener('click', () => {
        regions.splice(i, 1);
        renderRegions();
        renderList();
      });
      chip.appendChild(label);
      chip.appendChild(btn);
      els.boxesList.appendChild(chip);
    });
  }

  els.methodCards.addEventListener('change', () => {
    for (const card of els.methodCards.querySelectorAll('.method-card')) {
      card.classList.toggle('selected', card.querySelector('input').checked);
    }
  });

  function getMethod() {
    const checked = els.methodCards.querySelector('input[name="method"]:checked');
    return checked ? checked.value : 'blur';
  }

  els.btnSubmit.addEventListener('click', async () => {
    if (!videoFile) return;
    if (!regions.length) {
      showToast(t('w_toast_no_boxes'));
      return;
    }
    if (!els.agree.checked) {
      showToast(t('w_toast_no_disclaimer'));
      return;
    }
    els.btnSubmit.disabled = true;
    els.progressWrap.hidden = false;
    els.progressFill.style.width = '0%';
    els.progressText.textContent = t('w_progress_queued');
    try {
      if (!(await apiAvailable())) {
        els.progressWrap.hidden = true;
        showToast(t('w_toast_service'));
        return;
      }
      const fileKey = await uploadFile(videoFile, 'video');
      const vw = els.video.videoWidth;
      const vh = els.video.videoHeight;
      const { id } = await createJob({
        type: 'watermark',
        fileKey,
        params: {
          method: getMethod(),
          regions: regions.map((r) => ({
            x: r.x / vw,
            y: r.y / vh,
            w: r.w / vw,
            h: r.h / vh,
          })),
        },
      });
      const job = await pollJob(id, (j) => {
        if (j.status === 'processing') {
          const p = Math.max(0, Math.min(100, j.progress ?? 0));
          els.progressFill.style.width = `${p}%`;
          els.progressText.textContent = t('w_progress_processing', { n: p });
        }
      });
      if (job.status === 'done') {
        const url = job.resultUrl || jobFileUrl(id);
        els.progressWrap.hidden = true;
        els.resultVideo.src = url;
        els.btnResultDownload.href = url;
        els.resultPanel.hidden = false;
        els.resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('job failed');
      }
    } catch (err) {
      els.progressWrap.hidden = true;
      showToast(t('w_toast_failed'));
    } finally {
      els.btnSubmit.disabled = false;
    }
  });

  function resetEditor() {
    videoFile = null;
    regions = [];
    drawing = null;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    videoUrl = null;
    els.video.removeAttribute('src');
    els.video.load();
    els.overlay.getContext('2d').clearRect(0, 0, els.overlay.width, els.overlay.height);
    renderList();
    els.editor.hidden = true;
    els.empty.hidden = false;
    els.progressWrap.hidden = true;
    els.resultPanel.hidden = true;
    els.resultVideo.removeAttribute('src');
    els.agree.checked = false;
    els.fileInput.value = '';
  }

  els.btnReset.addEventListener('click', resetEditor);
  els.btnResultReplay.addEventListener('click', resetEditor);

  renderList();
}
