// Las fotos de la web antigua pesan casi 600 MB y, con 12 idiomas, la web superaba el
// límite de 1 GB de GitHub Pages. Al compilar se reducen las copias de dist/ (máx. 1600 px,
// sin recortar); los originales de public/ no se tocan.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const shrinkMedia = async (dir) => {
  let sharp; try { sharp = (await import('sharp')).default; } catch { console.log('[shrink-media] sharp no disponible'); return; }
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|jfif|png)$/i.test(f));
  let before = 0, after = 0, i = 0;
  const one = async (f) => {
    const p = join(dir, f), buf = readFileSync(p); before += buf.length;
    try {
      const img = sharp(buf, { failOn: 'none' }).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true });
      const out = /\.png$/i.test(f)
        ? await img.png({ compressionLevel: 9, palette: buf.length > 400000, quality: 88 }).toBuffer()
        : await img.jpeg({ quality: 76, progressive: true, mozjpeg: true }).toBuffer();
      if (out.length < buf.length * 0.95) { writeFileSync(p, out); after += out.length; return; }
    } catch {}
    after += buf.length;
  };
  const worker = async () => { while (i < files.length) await one(files[i++]); };
  await Promise.all(Array.from({ length: 6 }, worker));
  console.log(`[shrink-media] ${files.length} fotos: ${(before / 1e6).toFixed(0)} MB -> ${(after / 1e6).toFixed(0)} MB`);
};
