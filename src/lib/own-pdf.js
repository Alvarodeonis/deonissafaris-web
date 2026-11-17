// PDF propios: los programas cuyo PDF de la web antigua no se pudo copiar llevan un PDF
// generado al compilar a partir del texto de la propia web (uno por idioma).
// La página de impresión es src/pages/[category]/[country]/[program]/pdf.astro y la
// convierte en PDF src/lib/make-pdfs.mjs (después se borra).
import { existsSync } from 'node:fs';
import { join } from 'node:path';
const OLD = 'https://www.deonissafaris.com/';
export const needsOwnPdf = (d) => {
  if (!d?.pdf || !d.pdf.startsWith(OLD)) return false;
  let rel; try { rel = decodeURIComponent(d.pdf.slice(OLD.length)); } catch { return true; }
  return !existsSync(join(process.cwd(), 'public', rel));
};
export const pdfName = (p) => `${p.slug}.pdf`;
