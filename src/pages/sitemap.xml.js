// Sitemap con todas las páginas HTML que genera el sitio.
const pages = import.meta.glob('./**/*.astro');
import { allCategories as categories } from '../data/site.js';
import { countries, programs, programUrl, programYear } from '../data/programs.js';
import { groups, speciesIn, activeSpecies } from '../data/species.js';
import { LANGS, ACTIVE } from '../i18n/index.js';

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const statics = Object.keys(pages)
    .filter((f) => !f.includes('[') && !f.startsWith('./['))
    .map((f) => f.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''));
  const urls = [
    ...statics.map((p) => [p, p === '' ? '1.0' : '0.5']),
    ...categories.filter((c) => countries(c.slug).length).flatMap((c) => [[c.slug, '0.9'], ...countries(c.slug).map((k) => [`${c.slug}/${k.slug}`, '0.8'])]),
    ...programs.map((p) => [programUrl(p), programYear(p) >= 2025 ? '0.8' : '0.6']),
    ...groups.filter((g) => speciesIn(g.slug).length).map((g) => [`especies/${g.slug}`, '0.7']),
    ...activeSpecies.map((s) => [`especies/${s.slug}`, '0.7']),
  ];
  const langs = LANGS.filter((l) => ACTIVE.includes(l.code));
  const loc = (p, l = 'es') => new URL(`${base}${l === 'es' ? '' : l + '/'}${p}`.replace(/\/?$/, '/'), site).href;
  const uniq = [...new Map(urls.map(([p, pr]) => [p, pr]))];
  const alt = (p) => langs.length > 1 ? langs.map((l) => `<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${loc(p, l.code)}"/>`).join('') : '';
  const rows = uniq.flatMap(([p, pr]) => langs.map((l) => `  <url><loc>${loc(p, l.code)}</loc>${alt(p)}<priority>${pr}</priority></url>`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
