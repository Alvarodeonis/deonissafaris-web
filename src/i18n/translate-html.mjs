// Traduce el HTML ya generado de cada idioma (dist/<lang>/…): sustituye los textos
// visibles, los atributos de texto, <title>, metas y JSON-LD por su traducción.
// Diccionario: src/i18n/text/<lang>/*.json  ({"texto en español": "traducción"}).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&amp;/g, '&');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escText(s).replace(/"/g, '&quot;');

export const loadDict = (dir) => {
  const d = new Map();
  if (!existsSync(dir)) return d;
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    for (const [k, v] of Object.entries(JSON.parse(readFileSync(join(dir, f), 'utf8')))) if (v) d.set(norm(k), v);
  }
  return d;
};

export const translateHtml = (html, dict) => {
  const tr = (raw) => dict.get(norm(raw));
  // Separa scripts/estilos para no tocarlos (salvo JSON-LD).
  return html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)/i).map((part, i) => {
    if (i % 2) {
      if (!/application\/ld\+json/.test(part)) return part;
      return part.replace(/("(?:name|description|text)":)"((?:[^"\\]|\\.)*)"/g, (m, k, v) => {
        let s; try { s = JSON.parse(`"${v}"`); } catch { return m; }
        const t = tr(s); return t ? k + JSON.stringify(t).replace(/</g, '\\u003c') : m;
      });
    }
    part = part.replace(/(\s(?:alt|aria-label|title|placeholder|data-title|content)=")([^"]*)"/g, (m, a, v) => {
      const t = tr(unesc(v)); return t ? `${a}${escAttr(t)}"` : m;
    });
    part = part.replace(/<title>([^<]*)<\/title>/, (m, v) => { const t = tr(unesc(v)); return t ? `<title>${escText(t)}</title>` : m; });
    return part.replace(/>([^<]+)</g, (m, v) => {
      if (!/\S/.test(v)) return m;
      const t = tr(unesc(v));
      if (!t) return m;
      const lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
      return `>${lead}${escText(t)}${trail}<`;
    });
  }).join('');
};

export const translateDist = (out, langs, root) => {
  const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
  for (const l of langs) {
    const dir = join(out, l);
    if (!existsSync(dir)) continue;
    const dict = loadDict(join(root, 'src/i18n/text', l));
    let n = 0;
    for (const f of walk(dir)) { const s = readFileSync(f, 'utf8'); const r = translateHtml(s, dict); if (r !== s) { writeFileSync(f, r); n++; } }
    console.log(`[i18n] ${l}: ${dict.size} textos, ${n} páginas traducidas`);
  }
};
