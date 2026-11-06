// Saca 8 fotogramas de cada película (a partir del segundo 20, para saltar la intro)
// para el avance que se ve al pasar el ratón, a partir de los vídeos originales.
// Uso: node scripts/video-frames.mjs <carpeta>  (cada vídeo se llama <id de YouTube>.mp4; necesita ffmpeg)
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.log('Uso: node scripts/video-frames.mjs <carpeta con <id>.mp4>'); process.exit(1); }
const OUT = 'public/img/frames';
const N = 8;
mkdirSync(OUT, { recursive: true });
const manifest = existsSync('src/data/frames.json') ? JSON.parse(readFileSync('src/data/frames.json', 'utf8')) : {};
for (const f of readdirSync(dir).filter((x) => /\.(mp4|mov|mkv|webm)$/i.test(x))) {
  const id = f.replace(/\.[^.]+$/, '');
  const src = join(dir, f);
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src]).toString().trim());
  const start = Math.min(20, dur * 0.2), end = Math.max(start + 1, dur - 8);
  for (let i = 0; i < N; i++) {
    const t = start + ((end - start) * (i + 0.5)) / N;
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', t.toFixed(2), '-i', src, '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '5', `${OUT}/${id}-${i + 1}.jpg`]);
  }
  manifest[id] = N;
  console.log('ok', id, `${Math.round(dur)}s`);
}
writeFileSync('src/data/frames.json', JSON.stringify(manifest, null, 1) + '\n');
