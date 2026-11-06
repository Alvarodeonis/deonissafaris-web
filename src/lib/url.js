// Construye rutas internas respetando el `base` (la vista previa vive en /<repo>/)
// y el idioma de la página: las páginas llevan /en/, /de/…; los ficheros (fotos, logo) no.
import { lang } from '../i18n/index.js';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const isFile = (p) => /\.[a-z0-9]{2,5}($|[?#])/i.test(p.split('/').pop());
export const u = (p = '') => {
  const l = lang();
  const pre = l !== 'es' && !isFile(p) ? `/${l}` : '';
  return `${base}${pre}/${p}`.replace(/\/+$/, '') || '/';
};
// Siempre sin idioma (para ficheros o enlaces que deben ir a la versión española).
export const raw = (p = '') => `${base}/${p}`.replace(/\/+$/, '') || '/';
