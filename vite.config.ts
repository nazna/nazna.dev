import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

import { prerender } from './src/plugins/vite/prerender.ts';
import { rss } from './src/plugins/vite/rss.ts';

export default defineConfig({
  clearScreen: false,
  plugins: [cloudflare(), prerender(), rss()],
});
