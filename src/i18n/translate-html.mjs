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

// Números al estilo del idioma: en inglés 3.200 € -> €3,200 y 17,9 -> 17.9.
const NUM = {
  en: (t) => t
    .replace(/(\d),(\d)/g, '$1\u0001$2')
    .replace(/(\d)\.(\d{3})(?!\d)/g, '$1,$2').replace(/(\d)\.(\d{3})(?!\d)/g, '$1,$2')
    .replace(/\u0001/g, '.')
    .replace(/(\d[\d,.]*)\s?€/g, '€$1')
    .replace(/US\$\s(?=\d)/g, 'US$').replace(/£\s(?=\d)/g, '£'),
};
export const localizeNumbers = (t, lang) => (NUM[lang] ? NUM[lang](t) : t);

export const translateHtml = (html, dict, lang) => {
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
    // Mensaje prerrellenado de WhatsApp: plantilla con {x} (programa) y {y} (país).
    part = part.replace(/(href="https:\/\/wa\.me\/\d+\?text=)([^"]*)"/g, (m, a, v) => {
      let txt; try { txt = decodeURIComponent(unesc(v)); } catch { return m; }
      let t = tr(txt);
      const q = txt.match(/^(.*«)(.+)(» en )(.+)(\.)$/);
      if (!t && q) {
        const tpl = tr(`${q[1]}{x}${q[3]}{y}${q[5]}`);
        if (tpl) t = tpl.replace('{x}', tr(q[2]) || q[2]).replace('{y}', tr(q[4]) || q[4]);
      }
      return t ? `${a}${escAttr(encodeURIComponent(t))}"` : m;
    });
    part = part.replace(/<title>([^<]*)<\/title>/, (m, v) => { const t = tr(unesc(v)); return t ? `<title>${escText(t)}</title>` : m; });
    return part.replace(/>([^<]+)</g, (m, v) => {
      if (!/\S/.test(v)) return m;
      const t = tr(unesc(v));
      const lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
      if (!t) { const n = localizeNumbers(v, lang); return n === v ? m : `>${n}<`; }
      return `>${lead}${escText(t)}${trail}<`;
    });
  }).join('');
};

// Textos que usan los scripts del navegador (window.tt): las claves fijas y las etiquetas
// del simulador que lleva cada página en data-sim.
const clientDict = (html, dict, keys) => {
  const out = {};
  const add = (k) => { const t = dict.get(norm(k)); if (t) out[k] = t; };
  keys.forEach(add);
  const m = html.match(/data-sim="([^"]*)"/);
  if (m) {
    const walkJ = (o) => { if (typeof o === 'string') add(o); else if (o && typeof o === 'object') Object.values(o).forEach(walkJ); };
    try { walkJ(JSON.parse(unesc(m[1]))); } catch {}
  }
  return JSON.stringify(out).replace(/</g, '\\u003c');
};

export const translateDist = (out, langs, root) => {
  const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : /\.(html|json)$/.test(p) ? [p] : []; });
  const keys = JSON.parse(readFileSync(join(root, 'src/i18n/client-keys.json'), 'utf8'));
  for (const l of langs) {
    const dir = join(out, l);
    if (!existsSync(dir)) continue;
    const dict = loadDict(join(root, 'src/i18n/text', l));
    let n = 0;
    for (const f of walk(dir)) {
      const s = readFileSync(f, 'utf8');
      let r;
      if (f.endsWith('.json')) {
        // Índice del buscador: se traducen nombre y subtítulo, y se conserva el español como palabra clave.
        const data = JSON.parse(s);
        for (const x of Array.isArray(data) ? data : []) {
          const tn = x.n && dict.get(norm(x.n)), ts = x.s && dict.get(norm(x.s));
          if (tn || ts) x.k = [x.k, x.n, x.s].filter(Boolean).join(' ');
          if (tn) x.n = tn;
          if (ts) x.s = ts;
        }
        r = JSON.stringify(data);
      } else {
        r = translateHtml(s, dict, l).replace('<script id="i18n-data" type="application/json">{}</script>', () => `<script id="i18n-data" type="application/json">${clientDict(s, dict, keys)}</script>`);
      }
      if (r !== s) { writeFileSync(f, r); n++; }
    }
    console.log(`[i18n] ${l}: ${dict.size} textos, ${n} ficheros traducidos`);
  }
};
