# de Onís Safaris · web

Web informativa de [deonissafaris.com](https://www.deonissafaris.com) hecha con [Astro](https://astro.build).

## Estructura

- `src/data/programs.js`: todos los programas (categoría → país → programa) con precios, fotos y la configuración del simulador de presupuesto.
- `src/data/site.js`: contacto, equipo, vídeos de YouTube (el primero es el fondo de la portada) y categorías.
- `src/pages/[category]/[country]/[program].astro`: ficha de programa. Las URLs siguen el formato de la web antigua.

## Desarrollo

```sh
npm install
npm run dev
```

Cada push a `main` publica una vista previa en GitHub Pages.

## Pendiente

- Descargar las fotos a `public/` (ahora se cargan desde la web actual).
- Conectar el formulario de contacto a un servicio (ahora abre el correo).
- Páginas legales y redirecciones desde las URLs antiguas que cambian.
