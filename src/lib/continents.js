// Siluetas de continentes generadas en el build a partir de world-atlas.
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { merge } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

const AFRICA = new Set(['Tanzania','W. Sahara','Dem. Rep. Congo','Somalia','Kenya','Sudan','Chad','South Africa','Lesotho','Zimbabwe','Botswana','Namibia','Senegal','Mali','Mauritania','Benin','Niger','Nigeria','Cameroon','Togo','Ghana',"Côte d'Ivoire",'Guinea','Guinea-Bissau','Liberia','Sierra Leone','Burkina Faso','Central African Rep.','Congo','Gabon','Eq. Guinea','Zambia','Malawi','Mozambique','eSwatini','Angola','Burundi','Madagascar','Gambia','Tunisia','Algeria','Eritrea','Morocco','Egypt','Libya','Ethiopia','Djibouti','Somaliland','Uganda','Rwanda','S. Sudan']);
const EUROPE = new Set(['Norway','France','Sweden','Belarus','Ukraine','Poland','Austria','Hungary','Moldova','Romania','Lithuania','Latvia','Estonia','Germany','Bulgaria','Greece','Albania','Croatia','Switzerland','Luxembourg','Belgium','Netherlands','Portugal','Spain','Ireland','Italy','Denmark','United Kingdom','Iceland','Slovenia','Finland','Slovakia','Czechia','Bosnia and Herz.','Macedonia','Serbia','Montenegro','Kosovo']);
const OCEANIA = new Set(['Australia','New Zealand','Papua New Guinea','Fiji','Vanuatu','New Caledonia','Solomon Is.']);
const SKIP = new Set(['Antarctica','Fr. S. Antarctic Lands','Greenland']);

const geoms = world.objects.countries.geometries;
const contOf = (g) => {
  const n = g.properties.name;
  if (SKIP.has(n)) return null;
  if (AFRICA.has(n)) return 'caza-en-africa';
  if (EUROPE.has(n)) return 'caza-en-europa';
  if (OCEANIA.has(n)) return 'caza-en-oceania';
  return null;
};
// América: el resto de países al oeste de -25º; Asia: lo que queda.
const fc = (g) => ({ type: 'Feature', geometry: merge(world, [g]) });
for (const g of geoms) {
  if (contOf(g) || SKIP.has(g.properties.name)) continue;
  g._c = geoCentroid(fc(g))[0] < -25 ? 'caza-en-america' : 'caza-en-asia';
}
// Recorte por caja para quitar territorios lejanos (p. ej. Guayana Francesa en Europa).
const BOX = {
  'caza-en-europa': [-26, 34, 45, 72], 'caza-en-africa': [-20, -36, 60, 38], 'caza-en-asia': [25, -12, 190, 82],
  'caza-en-america': [-170, -56, -30, 84], 'caza-en-oceania': [110, -48, 180, 0],
};
const inBox = ([x, y], [a, b, c, d]) => { if (x < 0 && c > 180) x += 360; return x >= a && x <= c && y >= b && y <= d; };

const S = 64;
export const silhouettes = {};
for (const slug of Object.keys(BOX)) {
  const m = merge(world, geoms.filter((g) => (contOf(g) ?? g._c) === slug));
  m.coordinates = m.coordinates.filter((poly) => {
    const c = geoCentroid({ type: 'Polygon', coordinates: poly });
    const area = geoPath().area({ type: 'Polygon', coordinates: poly });
    return inBox(c, BOX[slug]) && area > 0.0004;
  });
  const lon = geoCentroid(m)[0];
  const proj = geoNaturalEarth1().rotate([-lon, 0]).fitSize([S, S], m);
  silhouettes[slug] = geoPath(proj)(m).replace(/(\d+\.\d{1})\d+/g, '$1');
}
// Arco y flecha para la caza con arco.
silhouettes['caza-con-arco'] = null;
export const ICON_SIZE = S;
