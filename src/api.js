const API = '/api';

function timeout(ms) {
  return AbortSignal.timeout(ms);
}

export async function apiAvailable() {
  try {
    const res = await fetch(`${API}/health`, { signal: timeout(1500) });
    return res.ok;
  } catch (err) {
    return false;
  }
}

export async function uploadFile(file, kind) {
  const form = new FormData();
  form.append('file', file, file.name || (kind === 'video' ? 'video.mp4' : 'photo.jpg'));
  form.append('kind', kind);
  const res = await fetch(`${API}/uploads`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`upload failed: ${res.status}`);
  const data = await res.json();
  return data.fileKey;
}

export async function createJob(payload) {
  const res = await fetch(`${API}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`create job failed: ${res.status}`);
  return res.json();
}

export async function getJob(id) {
  const res = await fetch(`${API}/jobs/${encodeURIComponent(id)}`, { signal: timeout(8000) });
  if (!res.ok) throw new Error(`job status failed: ${res.status}`);
  return res.json();
}

export function jobFileUrl(id) {
  return `${API}/jobs/${encodeURIComponent(id)}/file`;
}

export async function pollJob(id, onUpdate, intervalMs = 1500) {
  for (;;) {
    const job = await getJob(id);
    onUpdate(job);
    if (job.status === 'done' || job.status === 'failed') return job;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}
