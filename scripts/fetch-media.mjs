// Descarga a public/ todas las fotos y PDF de la web antigua que usa la web nueva
// (deonissafaris.com/media/… y /assets/…), para no depender de ese servidor.
// Se ejecuta en GitHub Actions después de `npm run build`. Las fotos se reducen a 1600 px como máximo.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(html|json)$/.test(p) ? [p] : []; });
const urls = new Set();
for (const f of walk('dist')) for (const m of readFileSync(f, 'utf8').matchAll(/https:\/\/www\.deonissafaris\.com\/((?:media|assets)\/[^"'\s<>\\]+)/g)) urls.add(m[1].replace(/&amp;/g, '&'));
console.log('urls', urls.size);
let ok = 0, skip = 0; const fails = [];
const list = [...urls];
for (let i = 0; i < list.length; i += 12) {
  await Promise.all(list.slice(i, i + 12).map(async (rel) => {
    let path;
    try { path = join('public', decodeURIComponent(rel)); } catch { fails.push(rel); return; }
    if (existsSync(path)) { skip++; return; }
    try {
      const r = await fetch(`https://www.deonissafaris.com/${rel}`, { headers: { 'User-Agent': 'deonis-media/1.0' } });
      if (!r.ok) { fails.push(`${r.status} ${rel}`); return; }
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, Buffer.from(await r.arrayBuffer()));
      if (/\.(jpe?g|png)$/i.test(path)) execFileSync('mogrify', ['-auto-orient', '-resize', '1600x1600>', '-strip', ...(/\.png$/i.test(path) ? [] : ['-quality', '82']), path]);
      ok++;
    } catch (e) { fails.push(`ERR ${rel} ${String(e).slice(0, 80)}`); }
  }));
}
console.log('downloaded', ok, 'already', skip, 'failed', fails.length);
for (const f of fails) console.log('  ', f);
