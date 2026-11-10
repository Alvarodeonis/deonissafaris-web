// Fotos del alojamiento (fila "Alojamiento" bajo la galería del programa).
// Lodge de Windhoek: fotos enviadas por Alvaro el 2026-11-10.
const windhoek = Array.from({ length: 43 }, (_, i) => `img/alojamiento-namibia/${String(i + 1).padStart(2, '0')}.jpg`);

export const lodging = {
  'namibia-paquete-windhoek': windhoek,
  'namibia-programa-general-windhoek': windhoek,
  'namibia-paquete-economico': windhoek,
};
