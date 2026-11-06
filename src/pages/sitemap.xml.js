// Sitemap con todas las páginas HTML que genera el sitio.
const pages = import.meta.glob('./**/*.astro');
import { allCategories as categories } from '../data/site.js';
import { countries, programs, programUrl, programYear } from '../data/programs.js';
import { groups, speciesIn, activeSpecies } from '../data/species.js';

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const statics = Object.keys(pages)
    .filter((f) => !f.includes('['))
    .map((f) => f.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''));
  const urls = [
    ...statics.map((p) => [p, p === '' ? '1.0' : '0.5']),
    ...categories.filter((c) => countries(c.slug).length).flatMap((c) => [[c.slug, '0.9'], ...countries(c.slug).map((k) => [`${c.slug}/${k.slug}`, '0.8'])]),
    ...programs.map((p) => [programUrl(p), programYear(p) >= 2025 ? '0.8' : '0.6']),
    ...groups.filter((g) => speciesIn(g.slug).length).map((g) => [`especies/${g.slug}`, '0.7']),
    ...activeSpecies.map((s) => [`especies/${s.slug}`, '0.7']),
  ];
  const loc = (p) => new URL(`${base}${p}`.replace(/\/?$/, '/'), site).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Map(urls.map(([p, pr]) => [loc(p), pr]))].map(([l, pr]) => `  <url><loc>${l}</loc><priority>${pr}</priority></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
