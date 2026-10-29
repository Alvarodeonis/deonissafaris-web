import { defineConfig } from 'astro/config';

// SITE_BASE lets the GitHub Pages preview live under /<repo>/; the real domain uses "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.deonissafaris.com',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'ignore',
});
