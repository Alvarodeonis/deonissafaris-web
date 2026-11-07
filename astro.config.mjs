import { defineConfig } from 'astro/config';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { translateDist } from './src/i18n/translate-html.mjs';
import { shrinkMedia } from './src/lib/shrink-media.mjs';

// Fotos y PDF de la web antigua ya copiados a public/: los enlaces apuntan a la copia propia.
const localMedia = () => ({
  name: 'local-media',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const out = dir.pathname;
      const site = (process.env.SITE_URL || 'https://www.deonissafaris.com').replace(/\/$/, '');
      const base = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');
      const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(html|json|xml)$/.test(p) ? [p] : []; });
      let n = 0;
      for (const f of walk(out)) {
        const src = readFileSync(f, 'utf8');
        const res = src.replace(/https:\/\/www\.deonissafaris\.com\/((?:media|assets)\/[^"'\s<>\\]+)/g, (m, rel) => {
          let file; try { file = join(out, decodeURIComponent(rel.replace(/&amp;/g, '&'))); } catch { return m; }
          if (!existsSync(file)) return m;
          n++; return `${site}${base}${rel}`;
        });
        if (res !== src) writeFileSync(f, res);
      }
      console.log(`[local-media] ${n} enlaces apuntan a la copia propia`);
      if (existsSync(join(out, 'media/images'))) await shrinkMedia(join(out, 'media/images'));
      const langs = (process.env.LANGS || 'es').split(',').filter((l) => l !== 'es');
      translateDist(out, langs, process.cwd());
    },
  },
});

// SITE_BASE lets the GitHub Pages preview live under /<repo>/; the real domain uses "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.deonissafaris.com',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'ignore',
  integrations: [localMedia()],
});
