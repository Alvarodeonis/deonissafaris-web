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
      let r;
      for (let t = 0; t < 3; t++) {
        try { r = await fetch(`https://www.deonissafaris.com/${rel}`, { headers: { 'User-Agent': 'deonis-media/1.0' } }); break; }
        catch (e) { if (t === 2) throw e; await new Promise((ok) => setTimeout(ok, 2000 * (t + 1))); }
      }
      if (!r.ok) { fails.push(`${r.status} ${rel}`); return; }
      const buf = Buffer.from(await r.arrayBuffer());
      // La web antigua responde 200 con una página HTML cuando el archivo no existe: no se guarda.
      if (/html/i.test(r.headers.get('content-type') || '') || buf.subarray(0, 15).toString().trimStart().startsWith('<')) { fails.push(`HTML ${rel}`); return; }
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, buf);
      if (/\.(jpe?g|png)$/i.test(path)) {
        try { execFileSync('mogrify', ['-auto-orient', '-resize', '1600x1600>', '-strip', ...(/\.png$/i.test(path) ? [] : ['-quality', '82']), path]); }
        catch (e) { console.log('   sin optimizar', rel); }
      }
      ok++;
    } catch (e) { fails.push(`ERR ${rel} ${String(e).slice(0, 80)}`); }
  }));
}
console.log('downloaded', ok, 'already', skip, 'failed', fails.length);
for (const f of fails) console.log('  ', f);
