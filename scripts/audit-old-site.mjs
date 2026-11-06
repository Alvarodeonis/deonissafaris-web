// Auditoría (se ejecuta en GitHub Actions, que sí llega a deonissafaris.com):
// 1) rastrea la web antigua y anota cada página con sus fotos y PDF;
// 2) comprueba que cada foto/PDF de la web antigua que usa la web nueva responde 200.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://www.deonissafaris.com';
const UA = { 'User-Agent': 'deonis-audit/1.0' };
const seen = new Set();
const queue = [ORIGIN + '/'];
const pages = [];
const norm = (h, from) => { try { const x = new URL(h, from); x.hash = ''; return x.href; } catch { return null; } };

while (queue.length && pages.length < 1500) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  let res;
  try { res = await fetch(url, { headers: UA, redirect: 'follow' }); } catch (e) { pages.push({ url, error: String(e) }); continue; }
  const type = res.headers.get('content-type') || '';
  if (!type.includes('html')) continue;
  const html = await res.text();
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').replace(/<[^>]+>/g, '').trim();
  const imgs = [...new Set([...html.matchAll(/(?:src|href|data-src)=["']([^"']+\.(?:jpe?g|png|gif|webp))["']/gi)].map((m) => norm(m[1], url)).filter(Boolean))];
  const pdfs = [...new Set([...html.matchAll(/href=["']([^"']+\.pdf)["']/gi)].map((m) => norm(m[1], url)).filter(Boolean))];
  pages.push({ url, status: res.status, title, h1, imgs, pdfs });
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const n = norm(m[1], url);
    if (!n || !n.startsWith(ORIGIN) || /\.(jpe?g|png|gif|webp|pdf|zip|mp4|css|js|ico|xml)(\?|$)/i.test(n) || /\/(en|fr|de)\//.test(n.slice(ORIGIN.length, ORIGIN.length + 4))) continue;
    if (!seen.has(n)) queue.push(n);
  }
}

// URLs de la web antigua que usa la web nueva (sacadas del HTML generado).
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const used = new Set();
for (const f of walk('dist')) for (const m of readFileSync(f, 'utf8').matchAll(/https:\/\/www\.deonissafaris\.com\/[^"'\s<>]+/g)) used.add(m[0].replace(/&amp;/g, '&'));
const checks = [];
const list = [...used];
for (let i = 0; i < list.length; i += 16) {
  checks.push(...await Promise.all(list.slice(i, i + 16).map(async (u) => {
    try { const r = await fetch(u, { headers: { ...UA, Range: 'bytes=0-0' } }); return { u, s: r.status, len: Number(r.headers.get('content-length') || 0) }; } catch (e) { return { u, s: 0, e: String(e) }; }
  })));
}
// Fotos de los programas de la web antigua: ¿cuáles responden de verdad?
const oldImgs = [...new Set(pages.flatMap((p) => p.imgs || []).filter((x) => x.includes('/media/images/proyectos_')).map((x) => { const m = x.match(/image=([^&]+)/); return m ? `${ORIGIN}/media/images/${m[1]}` : x; }))];
const oldChecks = [];
for (let i = 0; i < oldImgs.length; i += 16) {
  oldChecks.push(...await Promise.all(oldImgs.slice(i, i + 16).map(async (u) => {
    try { const r = await fetch(u, { headers: { ...UA, Range: 'bytes=0-0' } }); return { u, s: r.status }; } catch (e) { return { u, s: 0 }; }
  })));
}
// HTML completo de algunas páginas para importar su contenido.
const saved = {};
for (const url of (process.env.SAVE || '').split(/\s+/).filter(Boolean)) saved[url] = await (await fetch(url, { headers: UA })).text();
writeFileSync('audit-old-site.json', JSON.stringify({ pages, checks, oldChecks, saved }, null, 1));
console.log('pages', pages.length, 'used', list.length, 'bad', checks.filter((c) => c.s >= 400 || !c.s).length);
