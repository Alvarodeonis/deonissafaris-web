# Web de de Onís Safaris: instrucciones para Claude

Web informativa (sin pagos) de **de Onís Safaris**, outfitter de caza español con sede en Madrid.
Quien te escribe suele ser Arturo o Álvaro de Onís, de la propia empresa. No son programadores:
háblales en español, claro y breve, sin jerga técnica, y confirma siempre lo que has cambiado con el enlace.

## Cómo se publica

- Cada `push` a la rama `main` publica la web sola en unos 5 minutos (GitHub Actions → GitHub Pages).
  Vista previa: https://alvarodeonis.github.io/deonissafaris-web/
- Trabaja directamente en `main` (no hace falta pull request), con commits pequeños y un mensaje en español
  que diga qué ha cambiado. Antes de hacer push: `git pull --rebase origin main`, porque otra persona
  puede estar cambiando la web a la vez.
- Antes de publicar, compila para comprobar que no hay errores:
  `SITE_URL=http://localhost:8765 SITE_BASE=/deonissafaris-web/ LANGS=es,en npx astro build`
- Después del push, comprueba que la publicación ha terminado bien (`gh run list`) y da el enlace con `?v=` y
  un número nuevo al final, para que el navegador no muestre la versión antigua.

## Dónde está cada cosa

- **Programas hechos a mano** (con simulador de presupuesto): `src/data/programs.js`. Cada uno tiene precio,
  foto principal (`hero`), galería y la configuración del simulador.
- **Programas importados de la web antigua**: `src/data/catalog/<slug>.json`. Ahí están el título, el resumen,
  la temporada, la duración, el alojamiento, el PDF, el vídeo, las fotos (`images`, la primera es la portada)
  y las tarifas (`blocks`: cada fila es `[concepto, precio]`).
- **Calculadora de presupuesto de los programas importados**: `src/data/simulators.js`. Si cambias un precio
  en `catalog/<slug>.json`, cámbialo también aquí. Los textos nuevos de la calculadora se traducen en
  `src/i18n/text/<idioma>/30-sim.json`.
- **Tarifas y condiciones de los programas hechos a mano**: `src/data/details.js`.
- **Fila de fotos "Alojamiento"**: `src/data/lodging.js` (fotos en `public/img/alojamiento-namibia/`).
- **Galerías extra de fotos**: `src/data/galleries.js`.
- **Programas recomendados** (salen primero, con la etiqueta roja): lista `PINNED` en `src/data/programs.js`.
- **Contacto, teléfonos, redes, equipo, categorías y vídeos**: `src/data/site.js`.
- **Especies**: `src/data/species.js`; textos SEO en `src/data/seo-species.json`.
- **Textos SEO de países y categorías**: `src/data/seo-countries.json` y `src/data/seo-texts.js`.
- **Fotos nuevas**: guárdalas en `public/img/<carpeta>/` con nombres sencillos (sin espacios).
  No modifiques ni borres las fotos originales de `public/media/`. Al compilar, las fotos se convierten
  solas a un formato más ligero; no hace falta reducirlas a mano.

## Idiomas (muy importante)

La web está en 12 idiomas: español (raíz) y en, de, fr, it, pl, ro, pt, cs, hu, ru, zh (en `/<idioma>/`).
Las páginas se escriben en español y se traducen al compilar con diccionarios
`src/i18n/text/<idioma>/*.json` con el formato `{"texto exacto en español": "traducción"}`.

- Si cambias o añades **cualquier texto en español** (título, resumen, fila de tarifa, etc.), añade su
  traducción a `src/i18n/text/<idioma>/00.json` en los **11 idiomas**. Si no lo haces, ese texto saldrá
  en español en las demás versiones.
- Los precios con números (`1.800 €`, `US$ 3.200`) se adaptan solos a cada idioma; no hace falta traducirlos.
- Para comprobarlo, compila con `LANGS=es,en,de` y busca el texto nuevo en `dist/en/...` y `dist/de/...`.
  No debe aparecer en español.
- Tratamiento: formal en de, fr, pt, cs, hu, ru y zh; de tú en it, pl y ro. En español, la web habla de usted.
- En todos los idiomas debe quedar claro que la empresa es **española** (Madrid) y que el equipo son
  **cazadores**.

## Estilo y normas de Álvaro

- Los textos deben sonar humanos, no a IA: frases cortas, datos concretos del programa y nada de frases hechas.
  Nunca repitas el mismo texto en varias páginas.
- Las fotos no se recortan nunca (sin cabezas cortadas).
- En la portada, la foto de fondo es la del íbex en la nieve.
- No hay pagos online: el presupuesto se pide por WhatsApp.
- Pesca y Safaris fotográficos solo aparecen en el pie de página, no en el menú.
- Si un cambio no está claro (precio, año, qué programa), pregunta antes de publicarlo.
