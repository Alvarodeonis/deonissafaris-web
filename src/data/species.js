// Buscador por especie: Big Five, caza mayor y caza menor.
// Un programa entra en una especie si su título la nombra o, cuando el título es genérico
// ("Programa general", "Paquete Windhoek"…), si la nombra su resumen. `add` y `skip` corrigen a mano.
import { programs, byUpdate, isCurrent } from './programs.js';

export const groups = [
  { slug: 'big-five', name: 'Big Five', title: 'Caza de los Big Five', lead: 'Elefante, búfalo, león, leopardo y rinoceronte: los cinco grandes de África, con los outfitters que mejor conocemos en Mozambique, Tanzania, Sudáfrica, Zimbabwe, Zambia y Botswana.' },
  { slug: 'caza-mayor', name: 'Caza mayor', title: 'Caza mayor por especie', lead: 'Elija la especie que quiere cazar y le mostramos en qué países la organizamos y con qué programas.' },
  { slug: 'caza-menor', name: 'Caza menor', title: 'Caza menor', lead: 'Becadas, urogallo, acuáticas, faisanes, palomas y perdices en los mejores cazaderos de Europa y Sudamérica.' },
];

export const subgroups = {
  'caza-mayor': ['África', 'Montaña', 'Bosque y llanura', 'Grandes del norte'],
};

export const species = [
  // Big Five
  { slug: 'elefante', group: 'big-five', name: 'Elefante', re: /elefante/i, intro: 'Elefante en Botswana y Sudáfrica.' },
  { slug: 'bufalo', group: 'big-five', name: 'Búfalo', re: /búfalo|bufalo/i, skip: ['australia-caza-de-banteng-y-bufalo-de-agua', 'argentina-programa-general'], recommended: ['mozambique', 'sudafrica', 'tanzania'], intro: 'Búfalo cafre en Mozambique, Tanzania, Sudáfrica, Zambia y Zimbabwe, a rifle y con arco.' },
  { slug: 'leon', group: 'big-five', name: 'León', re: /\bleón|\bleon\b|leones|leona/i, intro: 'León a la huella en el Kalahari, a rifle y con arco.' },
  { slug: 'leopardo', group: 'big-five', name: 'Leopardo', re: /leopardo/i, add: ['mozambique-bufalos-pack-7-y-10-dias'], intro: 'Leopardo en Mozambique y Namibia, con cebado previo.' },
  { slug: 'rinoceronte', group: 'big-five', name: 'Rinoceronte', re: /rinoceronte/i, add: ['sudafrica-limpopo-programa-general', 'sudafrica-bufalo-lodge-de-lujo', 'sudafrica-arco-lodge-de-lujo'], intro: 'Rinoceronte en Sudáfrica, como trofeo adicional en Limpopo. Consúltenos disponibilidad y condiciones.' },

  // Caza mayor · África
  { slug: 'antilopes', group: 'caza-mayor', sub: 'África', name: 'Antílopes', re: /antílope|antilope|plains game|sable|roan|kudu|órix|orix|oryx|gemsbok|impala|springb|nyala|eland|ñu\b|hartebeest|blesb|waterbuck|duiker|dik.?dik|steenb|klipspring|sitatunga/i,
    add: ['namibia-paquete-windhoek', 'namibia-programa-general-windhoek', 'sudafrica-limpopo-paquetes-en-lodge-de-lujo', 'sudafrica-arco-lodge-de-lujo', 'sudafrica-limpopo-programa-general'],
    skip: ['argentina-chanchos-y-antilopes', 'argentina-programa-general', 'nueva-zelanda-programa-general', 'nueva-zelanda-arco-ciervos'],
    recommended: ['namibia'], intro: 'Kudu, órix, sable, roan, impala, springbok y los cuatro pequeños (dik-dik de Damara, steenbok, duiker y klipspringer) en Namibia, Sudáfrica, Mozambique, Tanzania, Zambia y Zimbabwe.' },
  { slug: 'facochero', group: 'caza-mayor', sub: 'África', name: 'Facochero', re: /facochero|facóquero|facoquero/i, intro: 'Facocheros en Mauritania y Sudáfrica, con paquetes de varios animales por cazador.' },
  { slug: 'felinos', group: 'caza-mayor', sub: 'África', name: 'Guepardo y otros felinos', re: /guepardo|puma|lince|gato montés/i, recommended: ['namibia'], intro: 'Guepardo en Namibia, y puma, lince y gato montés en British Columbia (Canadá).' },

  // Caza mayor · Montaña
  { slug: 'ibex', group: 'caza-mayor', sub: 'Montaña', name: 'Íbex', re: /íbex|ibex|íbice|ibice/i, recommended: ['kazakhstan', 'turquia'], intro: 'Íbex en Kazajistán, Kirguizia, Tayikistán, Mongolia, Irán y Turquía (bezoar).' },
  { slug: 'rebeco', group: 'caza-mayor', sub: 'Montaña', name: 'Rebeco', re: /rebeco|gamuza|chamois/i, recommended: ['macedonia', 'rumania'], intro: 'Rebeco alpino, carpático, balcánico, pirenaico y cantábrico en Eslovenia, Italia, Rumanía, Bulgaria, Macedonia, Croacia y España, y en Nueva Zelanda.' },
  { slug: 'macho-montes', group: 'caza-mayor', sub: 'Montaña', name: 'Macho montés', re: /macho montés|macho montes/i, intro: 'Macho montés en Gredos y en finca privada, con los mejores guardas.' },
  { slug: 'cabras-y-carneros', group: 'caza-mayor', sub: 'Montaña', name: 'Cabras y carneros', re: /\btur\b|marco polo|tahr|boc balear|carnero|argal|urial|dall/i, recommended: ['nueva-zelanda', 'tayikistan'], intro: 'Tur del Cáucaso, Marco Polo, tahr, boc balear, carneros de Dall y uriales.' },

  // Caza mayor · Bosque y llanura
  { slug: 'jabali', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Jabalí', re: /jabal|cochino|chancho/i, recommended: ['turquia'], intro: 'Somos especialistas en jabalí: batidas y recechos nocturnos en Turquía, grandes navajeros en Irán y Tayikistán, esperas y batidas en Rumanía, Bulgaria y Macedonia, y chanchos en Argentina, donde se cazan muchísimo.' },
  { slug: 'ciervo', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Ciervo', re: /ciervo|venado|red stag|wapit|berrea|maral|sambar|axis/i, skip: ['inglaterra-caza-de-muntjac-y-cwd'], recommended: ['nueva-zelanda', 'rumania'], intro: 'Ciervo en berrea en Europa, venados de récord en España, ciervo colorado en Argentina y los ciervos más grandes del mundo en Nueva Zelanda.' },
  { slug: 'corzo', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Corzo', re: /corzo/i, recommended: ['polonia', 'hungria', 'rumania'], intro: 'Corzos a peso en Hungría, Polonia y Rumanía, en Inglaterra, Escocia y España, y corzo siberiano en Mongolia.' },
  { slug: 'muflon-y-gamo', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Muflón y gamo', re: /muflón|muflon|gamo/i, recommended: ['rumania', 'nueva-zelanda'], intro: 'Grandes muflones y gamos en España, Croacia, Bulgaria y Rumanía.' },
  { slug: 'muntjac', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Muntjac y ciervo acuático chino', re: /muntjac|muntjak|cwd|acuático chino/i, add: ['inglaterra-caza-de-corzos'], intro: 'Muntjac y ciervo acuático chino (CWD) en Inglaterra, dos de los trofeos más curiosos de Europa.' },
  { slug: 'antilope-negro', group: 'caza-mayor', sub: 'Bosque y llanura', name: 'Antílope negro', re: /antílope negro|antilope negro|blackbuck|antílopes|antilopes/i, add: ['argentina-chanchos-y-antilopes'], skip: [], onlyCountry: 'argentina', intro: 'Antílope negro en Argentina, donde se combina con chanchos y ciervos en las mejores estancias.' },

  // Caza mayor · Grandes del norte
  { slug: 'oso', group: 'caza-mayor', sub: 'Grandes del norte', name: 'Oso', re: /\boso\b|\bosos\b|grizzly|kodiak/i, recommended: ['rumania'], intro: 'Oso pardo en los Cárpatos, Croacia y Siberia, oso negro en Quebec, grizzly en el Yukón y Kodiak en Alaska, en espera, rececho o batida.' },
  { slug: 'lobo', group: 'caza-mayor', sub: 'Grandes del norte', name: 'Lobo', re: /\blobo|\blobos/i, recommended: ['macedonia'], intro: 'Lobo en espera en Macedonia y en batida en Mongolia, y como trofeo adicional en Asia Central, los Balcanes y Canadá.' },
  { slug: 'alce-caribu-muskox', group: 'caza-mayor', sub: 'Grandes del norte', name: 'Alce, caribú y muskox', re: /alce|caribú|caribu|muskox|almizcl|bisonte/i, recommended: ['groenlandia'], intro: 'Alce en Bielorrusia y Canadá, caribú y buey almizclero en Groenlandia y bisonte europeo en Bielorrusia.' },

  // Caza menor
  { slug: 'becada', group: 'caza-menor', name: 'Becada', re: /becad/i, intro: 'Becadas en Bulgaria, en grupos pequeños y con perros.' },
  { slug: 'urogallo', group: 'caza-menor', name: 'Urogallo', re: /urogallo|gallo lira/i, intro: 'Urogallo en celo en Bulgaria, y urogallo y gallo lira como opcional en Rusia.' },
  { slug: 'acuaticas-y-faisanes', group: 'caza-menor', name: 'Acuáticas y faisanes', re: /acuáticas|acuaticas|faisan|faisán|patos/i, intro: 'Jornadas de acuáticas y faisanes en West Norfolk (Inglaterra).' },
  { slug: 'palomas-y-perdices', group: 'caza-menor', name: 'Palomas y perdices', re: /paloma|perdi|tórtola|codorn/i, intro: 'Palomas y perdices en Argentina, combinables con jabalí y ciervo en La Pampa.' },
];

// Palabras que ya identifican una especie en el título (si aparece alguna, el resumen no cuenta).
const anySpecies = new RegExp(species.map((s) => s.re.source).join('|'), 'i');
const generic = (p) => !anySpecies.test(p.title);

for (const s of species) {
  s.programs = programs.filter((p) => {
    if (s.skip?.includes(p.slug)) return false;
    if (s.add?.includes(p.slug)) return true;
    if (s.onlyCountry && p.country !== s.onlyCountry) return false;
    return s.re.test(p.title) || s.re.test(p.slug.replace(/-/g, ' ')) || (generic(p) && s.re.test(p.summary ?? ''));
  }).sort((a, b) => (isCurrent(b) - isCurrent(a)) || byUpdate(a, b));
}
export const activeSpecies = species.filter((s) => s.programs.length);
export const speciesOf = (p) => activeSpecies.filter((s) => s.programs.includes(p));
export const speciesUrl = (s) => `especies/${s.slug}`;
export const groupUrl = (g) => `especies/${g.slug ?? g}`;
export const groupOf = (s) => groups.find((g) => g.slug === s.group);
export const speciesIn = (g, sub) => activeSpecies.filter((s) => s.group === g && (!sub || s.sub === sub));
export const countriesOfSpecies = (s) => new Set(s.programs.map((p) => p.country)).size;

// Foto de portada: la de un programa vigente cuyo título nombra la especie.
export const speciesCover = (s) => (s.programs.find((p) => isCurrent(p) && s.re.test(p.title)) ?? s.programs.find((p) => s.re.test(p.title)) ?? s.programs[0])?.hero;

// Programas agrupados por país. Primero los países recomendados para la especie (en el orden
// que indica Alvaro, con la etiqueta "Recomendado"); después, los que tienen más programas.
export const byCountry = (list, recommended = []) => {
  const m = new Map();
  for (const p of list) {
    if (!m.has(p.country)) m.set(p.country, { slug: p.country, name: p.countryName, category: p.category, programs: [] });
    const c = m.get(p.country);
    if (c.category === 'caza-con-arco' && p.category !== 'caza-con-arco') c.category = p.category;
    c.programs.push(p);
  }
  const rank = (c) => { const i = recommended.indexOf(c.slug); return i < 0 ? recommended.length : i; };
  for (const c of m.values()) c.rec = recommended.includes(c.slug);
  return [...m.values()].sort((a, b) => rank(a) - rank(b) || b.programs.length - a.programs.length || a.name.localeCompare(b.name, 'es'));
};
