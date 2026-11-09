// Un mapamundi por país (SVG), compartido por todas las fichas y todos los idiomas.
// Antes iba dentro de cada página y, con 12 idiomas, la web pesaba demasiado.
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { GEO } from '../../data/geo.js';

const land = feature(world, world.objects.countries).features.filter((f) => f.properties.name !== 'Antarctica');
const fc = { type: 'FeatureCollection', features: land };
// El lienzo tiene la misma proporción que las tierras, para que el mapa llene todo el recuadro.
const [[x0, y0], [x1, y1]] = geoPath(geoNaturalEarth1().fitWidth(1000, fc)).bounds(fc);
const W = 1000, H = Math.round((1000 * (y1 - y0)) / (x1 - x0)) + 8;
const proj = geoNaturalEarth1().fitExtent([[4, 4], [W - 4, H - 4]], fc);
const path = geoPath(proj).digits(0);

export const getStaticPaths = () => Object.keys(GEO).map((country) => ({ params: { country } }));

export const GET = ({ params }) => {
  const g = GEO[params.country];
  const others = land.filter((f) => f.properties.name !== g[0]).map((f) => path(f)).join('');
  const mine = land.filter((f) => f.properties.name === g[0]).map((f) => path(f)).join('');
  const [x, y] = proj([g[1], g[2]]).map((v) => v.toFixed(1));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><style>.p{fill:#bf121d;opacity:.5;transform-box:fill-box;transform-origin:center;animation:a 2.2s ease-out infinite}@keyframes a{from{transform:scale(1);opacity:.55}to{transform:scale(3.2);opacity:0}}@media (prefers-reduced-motion:reduce){.p{animation:none}}</style><path d="${others}" fill="#b9ae9c" stroke="#f5f0e8" stroke-width=".6"/>${mine ? `<path d="${mine}" fill="#bf121d" stroke="#fff" stroke-width="1.2"/>` : ''}<circle class="p" cx="${x}" cy="${y}" r="22"/><circle cx="${x}" cy="${y}" r="15" fill="#fff" stroke="#bf121d" stroke-width="5"/></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
