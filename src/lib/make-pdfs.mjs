// Convierte en PDF las páginas de impresión de los programas (…/<programa>/pdf/index.html)
// de todos los idiomas, ya traducidas, y las borra después. El PDF queda en …/<programa>/<programa>.pdf.
import { readdirSync, statSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, extname, dirname, basename } from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const BROWSERS = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

export async function makePdfs(out, base) {
  const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (f === 'pdf' && existsSync(join(p, 'index.html')) ? [p] : walk(p)) : []; });
  const jobs = walk(out);
  if (!jobs.length) return;
  const exe = BROWSERS.find((b) => b && existsSync(b));
  if (!exe) throw new Error('[pdf] No hay navegador para generar los PDF (define CHROME_PATH).');
  const { chromium } = await import('playwright-core');
  const local = (url) => {
    let path; try { path = decodeURIComponent(url.split('?')[0]); } catch { return null; }
    if (!path.startsWith(base)) return null;
    let file = join(out, path.slice(base.length));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    return existsSync(file) ? file : null;
  };
  const server = createServer((req, res) => {
    const file = local(req.url);
    if (!file) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const ctx = await browser.newContext();
  // Las fotos llevan la dirección pública de la web (SITE_URL): se sirven desde dist.
  const site = (process.env.SITE_URL || 'https://www.deonissafaris.com').replace(/\/$/, '');
  await ctx.route(`${site}${base}**`, (route) => {
    const file = local(new URL(route.request().url()).pathname);
    return file ? route.fulfill({ path: file, contentType: TYPES[extname(file).toLowerCase()] }) : route.fulfill({ status: 404, body: '' });
  });
  let n = 0;
  const queue = [...jobs];
  const worker = async () => {
    const page = await ctx.newPage();
    for (let dir; (dir = queue.shift());) {
      const rel = dir.slice(out.length).replace(/\\/g, '/').replace(/^\/?/, '');
      await page.goto(`http://127.0.0.1:${port}${base}${rel}/`, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await page.evaluate(() => document.fonts?.ready);
      const prog = dirname(dir);
      await page.pdf({ path: join(prog, `${basename(prog)}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
      rmSync(dir, { recursive: true });
      n++;
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  await browser.close();
  server.close();
  console.log(`[pdf] ${n} PDF generados desde el texto de la web`);
}
