export function initCompare(container, afterClip, handle) {
  let pos = 50;
  const apply = () => {
    afterClip.style.clipPath = `inset(0 0 0 ${pos}%)`;
    handle.style.left = `${pos}%`;
  };
  apply();

  let dragging = false;
  const moveTo = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    pos = Math.min(100, Math.max(0, (x / rect.width) * 100));
    apply();
  };

  container.addEventListener('pointerdown', (e) => {
    dragging = true;
    try {
      container.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    moveTo(e);
  });
  container.addEventListener('pointermove', (e) => {
    if (dragging) moveTo(e);
  });
  const stop = () => {
    dragging = false;
  };
  container.addEventListener('pointerup', stop);
  container.addEventListener('pointercancel', stop);

  return { set: (v) => { pos = v; apply(); } };
}
