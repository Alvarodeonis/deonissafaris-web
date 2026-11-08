// Las fotos de la web antigua pesan casi 600 MB y, con 12 idiomas, la web superaba el
// límite de 1 GB de GitHub Pages. Al compilar se convierten las copias de dist/ a WebP
// (máx. 1600 px, sin recortar) y se crea una versión de 800 px para móvil (srcset).
// Solo se conserva un JPEG (1200 px) de las fotos que se usan para compartir en redes
// (og:image), porque algunas apps no leen WebP. Los originales de public/ no se tocan.
import { readdirSync, readFileSync, writeFileSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const IMG = /\.(jpe?g|jfif|png)$/i;
// Referencia a una foto propia dentro de HTML/CSS/JSON/JS (el nombre puede ir codificado).
const REF = /((?:media\/images|img)\/)([^"'\s<>\\]+?\.(?:jpe?g|jfif|png))(?![a-z0-9])/gi;

const walk = (d, re) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p, re) : re.test(p) ? [p] : [];
});
const dec = (s) => { try { return decodeURIComponent(s.replace(/&amp;/g, '&')); } catch { return s; } };

export const shrinkMedia = async (out, dirs = ['media/images', 'img']) => {
  let sharp; try { sharp = (await import('sharp')).default; } catch { console.log('[shrink-media] sharp no disponible'); return; }
  const texts = walk(out, /\.(html|json|xml|js|css|svg|txt)$/);

  // 1. Fotos que usan las etiquetas para redes sociales: se quedan también en JPEG.
  const og = new Set();
  for (const f of texts) {
    if (!f.endsWith('.html')) continue;
    for (const m of readFileSync(f, 'utf8').matchAll(/<meta (?:property|name)="(?:og|twitter):image" content="([^"]+)"/g)) {
      for (const r of m[1].matchAll(REF)) og.add(dec(r[1] + r[2]));
    }
  }

  // 2. Convertir. info[rel] = { webp, w, small, sw }
  const files = dirs.filter((d) => existsSync(join(out, d))).flatMap((d) => readdirSync(join(out, d)).filter((f) => IMG.test(f)).map((f) => `${d}/${f}`));
  const dup = new Set(); const seen = new Set();
  for (const r of files) { const k = r.replace(IMG, '').toLowerCase(); if (seen.has(k)) dup.add(k); seen.add(k); }
  const info = {};
  let before = 0, after = 0, i = 0;
  const one = async (rel) => {
    const p = join(out, rel), buf = readFileSync(p); before += buf.length;
    const stem = rel.replace(IMG, ''), k = stem.toLowerCase();
    const name = dup.has(k) ? rel : stem; // si existen x.jpg y x.png, se usa x.jpg.webp
    try {
      const base = sharp(buf, { failOn: 'none' }).rotate();
      const big = await base.clone().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 }).toBuffer({ resolveWithObject: true });
      writeFileSync(join(out, `${name}.webp`), big.data); after += big.data.length;
      const it = { webp: `${name}.webp`, w: big.info.width };
      if (big.info.width > 900) {
        const sm = await base.clone().resize({ width: 800 }).webp({ quality: 70, effort: 5 }).toBuffer({ resolveWithObject: true });
        writeFileSync(join(out, `${name}-800.webp`), sm.data); after += sm.data.length;
        it.small = `${name}-800.webp`; it.sw = sm.info.width;
      }
      if (og.has(rel)) {
        const jpg = await base.clone().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 76, progressive: true, mozjpeg: true }).toBuffer();
        if (jpg.length < buf.length) writeFileSync(p, jpg);
      }
      info[rel] = it;
    } catch { /* foto dañada: se deja tal cual */ }
  };
  const worker = async () => { while (i < files.length) await one(files[i++]); };
  await Promise.all(Array.from({ length: 6 }, worker));

  // 3. Reescribir las referencias (menos las de redes sociales) y añadir srcset a <img>.
  const toWebp = (m, dir, name) => {
    const it = info[dec(dir + name)]; if (!it) return m;
    return it.webp === `${dec(dir + name).replace(IMG, '')}.webp` ? `${dir}${name.replace(IMG, '')}.webp` : `${dir}${name}.webp`;
  };
  const byWebp = new Map(Object.values(info).map((x) => [x.webp, x]));
  let refs = 0, sets = 0;
  for (const f of texts) {
    const src = readFileSync(f, 'utf8');
    let res = src.replace(/(<meta (?:property|name)="(?:og|twitter):image" content=")([^"]+)"/g, (m, a, b) => `${a}${b.replace(/\.(jpe?g|jfif|png)/gi, (x) => `\u0000${x.slice(1)}`)}"`);
    res = res.replace(REF, (m, dir, name) => { const r = toWebp(m, dir, name); if (r !== m) refs++; return r; });
    res = res.replace(/\u0000/g, '.');
    if (f.endsWith('.html')) {
      res = res.replace(/<img\b[^>]*>/g, (tag) => {
        if (/\ssrcset=/.test(tag)) return tag;
        const s = tag.match(/\ssrc="([^"]+)"/); if (!s) return tag;
        const r = s[1].match(/((?:media\/images|img)\/[^"]+)\.webp$/); if (!r) return tag;
        const it = byWebp.get(dec(r[1]) + '.webp');
        if (!it || !it.small) return tag;
        const url = s[1]; if (url.includes(',')) return tag;
        const small = url.replace(/\.webp$/, '-800.webp');
        sets++;
        return tag.replace(/\ssrc="/, ` srcset="${small} ${it.sw}w, ${url} ${it.w}w" sizes="(max-width: 820px) 100vw, 1600px" src="`);
      });
    }
    if (res !== src) writeFileSync(f, res);
  }

  // 4. Borrar los JPEG/PNG que ya nadie usa.
  const still = new Set();
  for (const f of texts) for (const r of readFileSync(f, 'utf8').matchAll(REF)) still.add(dec(r[1] + r[2]));
  let removed = 0;
  for (const rel of Object.keys(info)) if (!still.has(rel)) { unlinkSync(join(out, rel)); removed++; }
  console.log(`[shrink-media] ${files.length} fotos (${(before / 1e6).toFixed(0)} MB) -> WebP ${(after / 1e6).toFixed(0)} MB; ${refs} enlaces, ${sets} srcset, ${removed} originales borrados, ${still.size} siguen en JPEG`);
};
