// Saca 8 fotogramas de cada película (a partir del segundo 20, para saltar la intro)
// para el avance que se ve al pasar el ratón. Se ejecuta en GitHub Actions (yt-dlp + ffmpeg).
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { allFilms } from '../src/data/films.js';

const OUT = 'public/img/frames';
const N = 8;
mkdirSync(OUT, { recursive: true });
const manifest = existsSync('src/data/frames.json') ? JSON.parse(readFileSync('src/data/frames.json', 'utf8')) : {};
const fails = [];
for (const { id } of allFilms) {
  if (manifest[id] && existsSync(`${OUT}/${id}-1.jpg`)) continue;
  try {
    rmSync('tmp.mp4', { force: true });
    execFileSync('yt-dlp', ['-q', '--no-warnings', '-f', 'bv*[height<=480][ext=mp4]/bv*[height<=480]/b[height<=480]', '--remux-video', 'mp4', '-o', 'tmp.mp4', `https://www.youtube.com/watch?v=${id}`], { stdio: 'inherit', timeout: 300000 });
    const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'tmp.mp4']).toString().trim());
    const start = Math.min(20, dur * 0.2), end = Math.max(start + 1, dur - 8);
    for (let i = 0; i < N; i++) {
      const t = start + ((end - start) * (i + 0.5)) / N;
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', t.toFixed(2), '-i', 'tmp.mp4', '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '5', `${OUT}/${id}-${i + 1}.jpg`]);
    }
    manifest[id] = N;
    console.log('ok', id, Math.round(dur) + 's');
  } catch (e) {
    fails.push(id);
    console.log('FAIL', id, String(e).slice(0, 200));
  }
}
rmSync('tmp.mp4', { force: true });
writeFileSync('src/data/frames.json', JSON.stringify(manifest, null, 1) + '\n');
console.log('done', Object.keys(manifest).length, 'fails', fails.join(' '));
