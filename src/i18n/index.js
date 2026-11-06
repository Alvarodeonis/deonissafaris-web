// Idiomas de la web. El español vive en la raíz; el resto, en /<código>/.
export const LANGS = [
  { code: 'es', name: 'Español', short: 'ES', hreflang: 'es', og: 'es_ES', suggest: 'Esta página también está disponible en español.', go: 'Ver en español' },
  { code: 'en', name: 'English', short: 'EN', hreflang: 'en', og: 'en_GB', suggest: 'This page is also available in English.', go: 'View in English' },
  { code: 'de', name: 'Deutsch', short: 'DE', hreflang: 'de', og: 'de_DE', suggest: 'Diese Seite gibt es auch auf Deutsch.', go: 'Auf Deutsch ansehen' },
  { code: 'fr', name: 'Français', short: 'FR', hreflang: 'fr', og: 'fr_FR', suggest: 'Cette page existe aussi en français.', go: 'Voir en français' },
  { code: 'it', name: 'Italiano', short: 'IT', hreflang: 'it', og: 'it_IT', suggest: 'Questa pagina è disponibile anche in italiano.', go: 'Vedi in italiano' },
  { code: 'pl', name: 'Polski', short: 'PL', hreflang: 'pl', og: 'pl_PL', suggest: 'Ta strona jest dostępna także po polsku.', go: 'Zobacz po polsku' },
  { code: 'ro', name: 'Română', short: 'RO', hreflang: 'ro', og: 'ro_RO', suggest: 'Această pagină este disponibilă și în română.', go: 'Vezi în română' },
  { code: 'pt', name: 'Português', short: 'PT', hreflang: 'pt', og: 'pt_PT', suggest: 'Esta página também está disponível em português.', go: 'Ver em português' },
  { code: 'cs', name: 'Čeština', short: 'CS', hreflang: 'cs', og: 'cs_CZ', suggest: 'Tato stránka je k dispozici také v češtině.', go: 'Zobrazit česky' },
  { code: 'hu', name: 'Magyar', short: 'HU', hreflang: 'hu', og: 'hu_HU', suggest: 'Ez az oldal magyarul is elérhető.', go: 'Megnézem magyarul' },
  { code: 'ru', name: 'Русский', short: 'RU', hreflang: 'ru', og: 'ru_RU', suggest: 'Эта страница доступна и на русском языке.', go: 'Открыть на русском' },
  { code: 'zh', name: '中文', short: '中文', hreflang: 'zh-Hans', og: 'zh_CN', suggest: '本页面也有中文版本。', go: '查看中文版' },
];
// Idiomas publicados (los que ya tienen traducción). Se amplía según se traducen.
export const ACTIVE = (process.env.LANGS || 'es').split(',');
export const OTHER = ACTIVE.filter((l) => l !== 'es');

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

// Idioma de la página que se está generando. Lo fija el middleware en cada petición
// (la compilación genera las páginas de una en una).
let current = 'es';
export const setLang = (l) => { current = ACTIVE.includes(l) ? l : 'es'; };
export const lang = () => current;
export const langInfo = (l = current) => LANGS.find((x) => x.code === l);

export const langFromPath = (pathname) => {
  const rest = pathname.slice(base.length).replace(/^\/+/, '');
  const seg = rest.split('/')[0];
  return OTHER.includes(seg) ? seg : 'es';
};

// Ruta sin el prefijo de idioma ni el base: "caza-en-africa/namibia".
export const stripLang = (pathname) => {
  let rest = pathname.slice(base.length).replace(/^\/+/, '');
  const seg = rest.split('/')[0];
  if (OTHER.includes(seg)) rest = rest.slice(seg.length).replace(/^\/+/, '');
  return rest.replace(/\/+$/, '');
};

// Enlace a la misma página en otro idioma.
export const pathIn = (l, rel) => `${base}/${l === 'es' ? '' : l + '/'}${rel}`.replace(/\/+$/, '') + '/';

// Diccionarios de la interfaz.
import en from './ui/en.json';
const dicts = { en };
export const t = (es, vars) => {
  let s = (current !== 'es' && dicts[current]?.[es]) || es;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return s;
};
