import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const pages = [
  'index',
  'parse',
  'about',
  'contact',
  'changelog',
  'privacy',
  'terms',
  'disclaimer',
  'guides/index',
  'guides/choose-watermark-removal-method',
  'guides/watermark-box-selection-tips',
  'guides/static-vs-moving-watermarks',
  'guides/video-watermark-copyright',
];

const all = [...pages, ...pages.filter((p) => p !== 'parse').map((p) => `zh/${p}`), 'zh/parse'];

export default defineConfig({
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: Object.fromEntries(
        all.map((p) => [p.replace(/\//g, '-'), fileURLToPath(new URL(`./${p}.html`, import.meta.url))])
      ),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5176,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8080', changeOrigin: true },
    },
  },
});
