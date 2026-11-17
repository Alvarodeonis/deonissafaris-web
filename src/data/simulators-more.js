// Más simuladores de presupuesto (2026-11-17, a petición de Álvaro): todos los programas importados con tarifas
// completas, también los de temporadas anteriores (el total sale como orientativo).
// Mismo formato que data/simulators.js. Las etiquetas copian el texto de las tablas de precios (ya traducido).
// Extras de este fichero: trophies[].max y trophies[].step (piezas por unidad, como aves), minDays sacado de «(mín. N días)».

const tr = (group, list, opts = {}) => list.map(([name, price, more]) => ({ name, price, ...(group ? { group } : {}), ...opts, ...(more || {}) }));
const PLUS = { plus: true };
const NOTE_PLUS = 'Los trofeos por medida se calculan con el precio base del tramo; el suplemento se suma al medir el trofeo.';
const days = (n, price, extra = {}) => ({ id: `d${n}`, label: `${n} días de caza`, days: n, price, ...extra });
// Tasas con «(mín. N días)» en el nombre: solo se pueden añadir si el paquete tiene esos días.
const minD = (list) => list.map(([name, price]) => { const m = name.match(/mín\. (\d+)/); return { name, price, ...(m ? { minDays: Number(m[1]) } : {}) }; });

// Tarifas de los cotos de España (arco y rifle): días de caza y tasas por pieza.
const spainDays = (base) => [2, 3, 5].map((n) => days(n, base * n, { feeOverrides: { night: 100 * n } }));
const spainStag = [['Selectivo pequeño', 500], ['Selectivo grande', 1000], ['Representativo no trofeo', 1500], ['Medalla de bronce (165 CIC)', 2000], ['Medalla de plata (173 CIC)', 2500], ['Medalla de oro (181 CIC)', 3000], ['Medalla de oro (más de 200 CIC)', 5000]];
const spainMouflon = [['Selectivo', 1000], ['Representativo', 1500], ['Medalla de bronce (185 CIC)', 2000], ['Medalla de plata (195 CIC)', 2200], ['Medalla de oro (200 CIC)', 2500]];
const spainBoar = [['Menos de 5 cm por fuera', 600], ['Más de 5 cm por fuera', 1000], ['Hembra', 400]];
const spainBow = (first) => {
  const g = { venado: tr('Venado con arco', spainStag), muflon: tr('Muflón con arco', spainMouflon), jabali: tr('Jabalí con arco', spainBoar) };
  return {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: spainDays(150),
    companions: [{ label: 'Acompañante con pensión completa', price: 100, per: 'day' }, { label: 'Acompañante con pernocta en la finca', price: 200, per: 'day' }],
    trophies: [first, ...Object.keys(g).filter((k) => k !== first)].flatMap((k) => g[k]),
    fees: [{ id: 'night', label: 'Día de caza con pernocta en la finca', price: 100, per: 'hunter', optional: true }],
    notes: ['Con pernocta en la finca, el día de caza cuesta 250 € en lugar de 150 €.'],
  };
};
// Cáucaso (Azerbaiyán, Osetia, Kubán): mismas tarifas.
const caucasus = (label) => ({
  currency: 'EUR', hunters: { min: 1, max: 4 },
  packages: [{ id: 'p', label, days: 8, tiers: [{ min: 1, max: 1, price: 4000 }, { min: 2, max: 2, price: 3800 }, { min: 3, max: 3, price: 3600 }, { min: 4, max: 4, price: 3400 }] }],
  companions: [{ label: 'Acompañante', price: 2500, per: 'trip' }],
  trophies: tr('Trofeos', [['Primer tur', 3600], ['Segundo tur', 3000], ['Rebeco caucásico', 3500], ['Oso pardo (solo Azerbaiyán)', 5000], ['Lobo (solo Azerbaiyán)', 700], ['Jabalí', 900], ['Corzo siberiano', 1600]]),
  fees: [{ id: 'extra', label: 'Día adicional de caza', price: 350, per: 'hunter', optional: true }],
});
const mozTrophies = (list) => tr('Tasas de abate (trofeo + gobierno)', minD(list).map((t) => [t.name, t.price, t.minDays ? { minDays: t.minDays } : {}]));
const mozCharter = (label) => [
  { id: 'c206', label: label[0], price: 3000, per: 'group', optional: true },
  { id: 'airvan', label: label[1], price: 3600, per: 'group', optional: true },
  { id: 'islander', label: label[2], price: 4000, per: 'group', optional: true },
];
const blackBear = (first) => ({
  currency: 'EUR', hunters: { min: 1, max: 4 },
  packages: [{ id: 'p', label: first, days: 5, price: 3500, includedTrophies: 1 }],
  companions: [{ label: 'Acompañante', price: 950, per: 'trip' }],
  trophies: tr(null, [['Segundo oso', 1250]]),
  fees: [{ id: 'prep', label: 'Preparación de piel, CITES y documentación (por oso)', price: 200, per: 'trophy' }],
});
const mongolia = (pk, trophies) => ({
  currency: 'USD', hunters: { min: 1, max: 4 },
  packages: pk,
  companions: [{ label: 'Acompañante', price: 2100, per: 'trip' }],
  trophies: tr(null, trophies),
  fees: [],
  notes: ['Suplemento cazador individual: 10 %.'],
});

export const more = {
  'argentina-ciervo-en-los-andes': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [3, 5, 7].map((n) => days(n, 500 * n)),
    companions: [{ label: 'Acompañante (alojamiento, pensión completa y transporte)', price: 200, per: 'day' }],
    trophies: tr('Ciervo', [['Selectivo', 800], ['Hasta 200 puntos CIC', 2500]]).concat(tr('Ciervo', [['De 200 a 220 puntos CIC', 2500], ['Más de 220 puntos CIC', 4500]], PLUS), tr('Jabalí y puma', [['Jabalí de menos de 20 cm', 600], ['Jabalí de más de 20 cm', 1000], ['Hembra de jabalí', 400], ['Puma (sin CITES)', 2000]])),
    fees: [],
    notes: [NOTE_PLUS],
  },
  'argentina-jabalies-y-ciervos-en-la-pampa': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [
      { id: 'cochinos', label: 'Paquete cochinos (5 días, 4 de caza, 3 machos de más de 15 cm y 4 hembras o jóvenes)', days: 5, price: 2900 },
      ...[3, 5, 7].map((n) => days(n, 0, { tiers: [{ min: 1, max: 2, price: 280 * n }, { min: 3, max: 99, price: 250 * n }] })),
    ],
    companions: [],
    trophies: tr('Precio paquete cochinos', [['Jabalí macho de más de 15 cm (adicional)', 500], ['Hembra o joven de jabalí (adicional)', 150]]).concat(tr('Tasas de abate', [['Venado', 1800], ['Jabalí macho', 650], ['Jabalí hembra o joven', 150], ['Gamo', 1200], ['Antílope negro', 950], ['Búfalo de agua', 2300], ['Puma', 2000]])),
    fees: [],
  },
  'argentina-programa-general': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [5, 7, 10].map((n) => days(n, 300 * n)),
    companions: [{ label: 'Acompañante', price: 250, per: 'day' }],
    trophies: tr('Precio por pieza', [['Ciervo colorado hasta 180 puntos CIC', 1950], ['Ciervo colorado de 180 a 200 CIC', 2300], ['Ciervo colorado de más de 200 CIC', 3200], ['Gamo', 1500], ['Ciervo axis', 1800], ['Jabalí macho hasta 16 cm', 420], ['Jabalí macho de 16 a 20 cm', 530], ['Jabalí macho de más de 20 cm', 700], ['Jabalí hembra (según épocas)', 330], ['Antílope negro', 1200], ['Cabra de Juan Fernández', 900], ['Dall', 900], ['Black face ram', 900], ['Cuatro cuernos', 900], ['Carneros patagónicos', 600], ['Muflón', 2500], ['Búfalo', 2800], ['Puma', 9000], ['Puma de más de 13 pulgadas', 11000], ['Pecarí de collar', 1000]]),
    fees: [
      { id: 'lic', label: 'Licencia por cazador', price: 60, per: 'hunter' },
      { id: 'bullets', label: 'Balas (caja de 20)', price: 80, per: 'hunter', optional: true },
      { id: 'shells', label: 'Cartuchos (caja de 25)', price: 17, per: 'hunter', optional: true },
    ],
  },
  'austria-programa-general': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '4 días de estancia y 3 de caza', days: 4, price: 900 }],
    companions: [],
    trophies: [
      ...tr('Venado (precio + suplemento por cada 10 g)', [['Hasta 6 kg', 2100]]),
      ...tr('Venado (precio + suplemento por cada 10 g)', [['6,00 – 6,50 kg', 2450], ['6,50 – 7,00 kg', 2800], ['7,00 – 7,50 kg', 3220], ['7,50 – 8,00 kg', 3710], ['8,00 – 8,50 kg', 4270], ['8,50 – 9,00 kg', 4900], ['9,00 – 9,50 kg', 5670], ['9,50 – 10,00 kg', 6570], ['10,00 – 12,00 kg', 7260]], PLUS),
      ...tr('Rebeco', [['Machos y hembras', 1500]]),
      ...tr('Jabalí', [['Hasta 12 cm', 420], ['12,1 – 14 cm', 530], ['14,1 – 16 cm', 700]]),
      ...tr('Jabalí', [['16,1 – 18 cm', 1000], ['18,1 – 20 cm', 1600], ['20,1 – 22 cm', 2300], ['Más de 22,1 cm', 3400]], PLUS),
      ...tr('Íbex alpino', [['Hasta 70 cm', 8350], ['71 – 75 cm', 10350], ['76 – 80 cm', 12000], ['81 – 85 cm', 14350], ['86 – 90 cm', 16600], ['91 – 95 cm', 20000]]),
      ...tr('Gamo (precio + suplemento por cada 10 g)', [['Menos de 3 kg', 1400], ['3,00 – 3,50 kg', 1820], ['3,50 – 4,00 kg', 2310], ['4,00 – 4,50 kg', 2870], ['Más de 4,50 kg', 3920]], PLUS),
      ...tr('Muflón', [['Hasta 60 cm', 800], ['60,1 – 70 cm', 1100], ['70,1 – 80 cm', 1700], ['80,1 – 90 cm', 2600], ['Más de 90,1 cm', 4350]]),
    ],
    fees: [],
    notes: [NOTE_PLUS],
  },
  'azerbaiyan-caucaso-tur': caucasus('Tarifas por cazador (iguales en los tres destinos)'),
  'rusia-caucaso-tur': caucasus('Tarifas por cazador'),
  'bielorrusia-bisonte': {
    currency: 'EUR', hunters: { min: 2, max: 4 },
    packages: [{ id: 'p', label: 'Precio por cazador', days: 6, tiers: [{ min: 2, max: 2, price: 2000 }, { min: 3, max: 3, price: 1800 }, { min: 4, max: 4, price: 1700 }] }],
    companions: [],
    trophies: tr('Trofeo de bisonte', [['Sin medalla (hasta 129,99 puntos)', 8500], ['Bronce (130 a 149,99)', 11000], ['Plata (150 a 169,99)', 13200], ['Oro (170 o más)', 15000]]),
    fees: [],
  },
  'bielorrusia-ciervos-grandes': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Precio por cazador', days: 5, tiers: [{ min: 1, max: 1, price: 1900 }, { min: 2, max: 2, price: 1700 }, { min: 3, max: 3, price: 1600 }, { min: 4, max: 4, price: 1500 }] }],
    companions: [],
    trophies: tr('Trofeo de ciervo', [['Hasta 4,99 kg', 2000], ['5 a 7,99 kg', 3500], ['Desde 8 kg', 4500]]),
    fees: [],
  },
  'bulgaria-rebeco-balcanico': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: 'Por persona · 3 días de caza, 4 noches', days: 4, price: 1490 }],
    companions: [],
    trophies: [
      ...tr('Tasas de abate: rebeco (puntos CIC)', [['Hasta 80', 1000]]),
      ...tr('Tasas de abate: rebeco (puntos CIC)', [['80 – 85', 1100], ['85 – 90', 1250], ['90 – 95', 1450], ['95 – 100', 1800], ['Más de 100', 2250]], PLUS),
      ...tr('Tasas de abate: ciervo', [['4 – 5 kg', 700], ['5 – 6 kg', 1000], ['6 – 7 kg', 1500], ['7 – 8 kg', 2200], ['8 – 9 kg', 3200], ['9 – 10 kg', 4700], ['10 – 11 kg', 6700], ['11 – 12 kg', 9700], ['Más de 12 kg', 13700]], PLUS),
      ...tr('Tasas de abate: jabalí', [['Hasta 14 cm', 500]]),
      ...tr('Tasas de abate: jabalí', [['14 – 16 cm', 600], ['16 – 18 cm', 800], ['18 – 20 cm', 1060], ['20 – 22 cm', 1400], ['Más de 22 cm', 2100]], PLUS),
      ...tr('Tasas de abate: corzo', [['Hasta 250 g', 150]]),
      ...tr('Tasas de abate: corzo', [['250 – 300 g', 250], ['300 – 350 g', 450], ['350 – 400 g', 700], ['400 – 450 g', 1150], ['Más de 450 g', 1850]], PLUS),
      ...tr('Tasas de abate: muflón y lobo', [['Muflón hasta 50 cm', 600]]),
      ...tr('Tasas de abate: muflón y lobo', [['Muflón 50 – 60 cm', 900], ['Muflón 60 – 70 cm', 1200], ['Muflón 70 – 80 cm', 1700], ['Muflón de más de 80 cm', 3000]], PLUS),
      ...tr('Tasas de abate: muflón y lobo', [['Lobo (todo el año)', 1000]]),
    ],
    fees: [{ id: 'extra', label: 'Día de caza adicional', price: 390, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'canada-arco-osos-negros': blackBear('1 oso negro (5 días de caza)'),
  'canada-oso-negro-en-quebec': blackBear('1 oso negro, 5 días de caza'),
  'canada-british-columbia-programa-general': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'u5', label: '5 días, 1x1, incluye el abate de una especie', days: 5, price: 10500, includedTrophies: 1 },
      { id: 'u7', label: '7 días, 1x1, incluye el abate de una especie', days: 7, price: 11300, includedTrophies: 1 },
      { id: 'u10', label: '10 días, 1x1, incluye el abate de una especie', days: 10, price: 13300, includedTrophies: 1 },
      { id: 'd7', label: '7 días, 1x1, incluye el abate de dos especies', days: 7, price: 14800, includedTrophies: 2 },
      { id: 'd10', label: '10 días, 1x1, incluye el abate de dos especies', days: 10, price: 17200, includedTrophies: 2 },
      { id: 'stone', label: '14 días, 1x1, incluye un carnero', days: 14, price: 38800, includedTrophies: 1 },
    ],
    companions: [{ label: 'Acompañante en campamento base', price: 300, per: 'day' }, { label: 'Acompañante en cabina de caza', price: 400, per: 'day' }],
    trophies: tr('Extras', [['Animal adicional (harvest fee)', 5250], ['Oso grizzly', 9750]]),
    fees: [],
  },
  'canada-yukon-alce-dall-grizzly': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'dall', label: 'Programa base (incluye 1 carnero de Dall)', days: 10, price: 24500, includedTrophies: 1 },
      { id: 'moose', label: 'Programa base (1 alce Alaska-Yukón, desde barca o a caballo)', days: 11, price: 24500, includedTrophies: 1 },
      { id: 'grizzly', label: 'Programa base (incluye 1 oso grizzly)', days: 11, price: 24500, includedTrophies: 1 },
    ],
    companions: [{ label: 'En campamento base', price: 250, per: 'day' }, { label: 'En cabina de caza', price: 350, per: 'day' }],
    trophies: tr(null, [['Oso grizzly adicional', 9750], ['Alce adicional', 9400], ['Carnero de Dall adicional', 9000], ['Caribú adicional', 6800], ['Lobo, glotón u oso negro adicional', 5250]]),
    fees: [],
  },
  'croacia-oso': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Cacería con 1 guía por cazador', days: 7, price: 1900 }],
    companions: [{ label: 'Acompañante en habitación compartida', price: 150, per: 'day' }],
    trophies: tr(null, [['Oso bronce o plata (hasta 300 puntos CIC)', 4900], ['Oso oro (300 a 350 puntos)', 7500]]).concat(tr(null, [['Oso gran oro (350 a 450 puntos)', 7500], ['Oso excepcional (más de 450 puntos)', 19000]], PLUS)),
    fees: [
      { id: 'lic', label: 'Licencia de caza', price: 80, per: 'hunter' },
      { id: 'gun', label: 'Permiso temporal del arma', price: 15, per: 'hunter' },
      { id: 'track', label: 'Equipo de rastreo si se cobra el oso', price: 500, per: 'trophy', optional: true },
      { id: 'transfer', label: 'Traslado al hotel, por vehículo', price: 300, per: 'group', optional: true, checked: true },
      { id: 'extra', label: 'Día adicional', price: 300, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'croacia-rebeco-y-muflon': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Rebeco · 3 días de caza 1×1, 4 noches, 1 rebeco hasta 100 puntos CIC', days: 4, price: 3990, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante en habitación doble', price: 150, per: 'day' }],
    trophies: tr('Rebeco adicional (puntos CIC)', [['Hasta 100', 2100]]).concat(tr('Rebeco adicional (puntos CIC)', [['100 – 105', 2100], ['105 – 110', 2500], ['110 – 115', 3300], ['115 – 120', 4800], ['Más de 120', 7300]], PLUS)),
    fees: [
      { id: 'lic', label: 'Licencia de caza', price: 80, per: 'hunter' },
      { id: 'prep', label: 'Preparación del trofeo', price: 50, per: 'trophy', optional: true, checked: true },
      { id: 'rifle', label: 'Alquiler de rifle con munición', price: 200, per: 'hunter', optional: true },
      { id: 'extra', label: 'Día adicional', price: 300, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'eeuu-alaska-oso-kodiak-desde-el-barco': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Cazador', days: 12, price: 18950 }],
    companions: [{ label: 'Acompañante', price: 3500, per: 'trip' }],
    trophies: [],
    fees: [
      { id: 'lic', label: 'Licencia general de caza', price: 300, per: 'hunter' },
      { id: 'bear', label: 'Oso pardo', price: 650, per: 'hunter' },
      { id: 'sitka', label: 'Venado de Sitka (black tail)', price: 200, per: 'hunter', optional: true },
      { id: 'black', label: 'Oso negro', price: 300, per: 'hunter', optional: true },
      { id: 'fish', label: 'Licencia de pesca', price: 30, per: 'hunter', optional: true },
    ],
  },
  'escocia-corzos-y-ciervos': {
    currency: 'GBP', hunters: { min: 1, max: 4 },
    packages: [3, 5, 7].map((n) => days(n, 500 * n)),
    companions: [{ label: 'Acompañante en habitación doble', price: 150, per: 'day' }, { label: 'Acompañante en habitación individual', price: 200, per: 'day' }],
    trophies: tr('Tasas de abate: corzo', [['Hembra (21 octubre – 31 marzo)', 100], ['Macho, cráneo hasta 449 g', 400], ['450 a 509 g', 700], ['510 a 569 g', 850], ['Más de 570 g', 1000]]).concat(tr('Tasas de abate: ciervo', [['Macho', 1000], ['Hembra (21 octubre – 15 febrero)', 250]])),
    fees: [],
  },
  'espana-arco-ciervo-berrea-o-espera': spainBow('venado'),
  'espana-arco-jabali-en-espera': spainBow('jabali'),
  'espana-arco-muflon-espera-o-rececho': spainBow('muflon'),
  'espana-arco-macho-montes': {
    currency: 'EUR', hunters: { min: 1, max: 2 },
    packages: [{ id: 'p', label: 'Caza, 2/3 días', days: 3, price: 1000 }],
    companions: [],
    trophies: tr('Tarifas', [['Macho hasta 79 cm', 6900], ['Macho de más de 79 cm', 8900], ['Hembra (solo después de cazar el macho)', 450], ['Ciervo (solo después de cazar el macho)', 1900], ['Jabalí (solo después de cazar el macho)', 900]]),
    defaultTrophies: { 'Macho hasta 79 cm': 1 },
    fees: [{ id: 'lic', label: 'Licencia de caza (solo cazadores extranjeros)', price: 100, per: 'hunter', optional: true }],
  },
  'espana-boc-balear': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [2, 3, 4].map((n) => days(n, 150 * n)),
    companions: [],
    trophies: tr('Trofeos', [['Representativo', 1800], ['Bronce', 2200], ['Plata', 3800], ['Oro', 4500]]),
    defaultTrophies: { Representativo: 1 },
    fees: [{ id: 'travel', label: 'Desplazamiento fuera de Palma', price: 50, per: 'group', optional: true }],
  },
  'espana-grandes-corzos': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: spainDays(150),
    companions: [{ label: 'Acompañante', price: 100, per: 'day' }],
    trophies: [
      ...tr('Corzo', [['Hasta 130 puntos', 1500]]),
      ...tr('Venado', [['Selectivo pequeño', 500], ['Selectivo grande', 1000], ['Representativo', 1500], ['Bronce (165 CIC)', 2000], ['Plata (173 CIC)', 2500], ['Oro (181 CIC)', 3000], ['Oro (más de 200 CIC)', 5000]]),
      ...tr('Jabalí', [['Menos de 5 cm', 600], ['Más de 5 cm', 1000], ['Hembra', 400]]),
      ...tr('Muflón', [['Selectivo', 1000], ['Representativo', 1500], ['Bronce (185 CIC)', 2000], ['Plata (195 CIC)', 2200], ['Oro (200 CIC)', 2500]]),
    ],
    defaultTrophies: { 'Hasta 130 puntos': 1 },
    fees: [{ id: 'night', label: 'Día de caza con noche en la finca', price: 100, per: 'hunter', optional: true }],
    notes: ['Corzo de más de 130 puntos: 100 € más por punto.', 'Con noche en la finca, el día de caza cuesta 250 € en lugar de 150 €.'],
  },
  'espana-rebeco-pirineo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Rebeco pirineo sin límite de puntos', days: 2, price: 3600 }],
    companions: [{ label: 'Acompañante no cazador por día', price: 250, per: 'day' }],
    trophies: [],
    fees: [
      { id: 'lic', label: 'Licencia de caza', price: 100, per: 'hunter' },
      { id: 'rifle', label: 'Alquiler de rifle y munición', price: 120, per: 'hunter', optional: true },
    ],
  },
  'francia-caza-de-rececho': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [2, 3, 5].map((n) => days(n, 300 * n)),
    companions: [{ label: 'Acompañante', price: 80, per: 'day' }],
    trophies: [],
    fees: [
      { id: 'lic', label: 'Licencia de caza 9 días', price: 90, per: 'hunter' },
      { id: 'ins', label: 'Seguro anual', price: 30, per: 'hunter' },
      { id: 'adm', label: 'Gastos administrativos', price: 40, per: 'hunter' },
      { id: 'night', label: 'Hospedaje adicional día de llegada o salida, por persona', price: 80, per: 'hunter', optional: true },
    ],
  },
  'groenlandia-arco-muskox': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Paquete de 3 o 4 días, con 1 buey almizclero macho', days: 4, price: 6000 }],
    companions: [{ label: 'Acompañante', price: 3500, per: 'trip' }],
    trophies: tr(null, [['Trofeo adicional de buey almizclero', 2900], ['Trofeo adicional de caribú (muy complicado)', 2900]]),
    fees: [],
  },
  'groenlandia-muskox-en-primavera': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Cazador', days: 4, price: 8500 }],
    companions: [{ label: 'Acompañante / observador', price: 3500, per: 'trip' }],
    trophies: [],
    fees: [
      { id: 'rifle', label: 'Alquiler de rifle (todo el periodo)', price: 250, per: 'hunter', optional: true },
      { id: 'hotel', label: 'Gestión de habitación de hotel extra', price: 300, per: 'hunter', optional: true },
    ],
    notes: ['Segundo muskox: 3.500 €. Caribú opcional: 3.500 €.'],
  },
  'inglaterra-caza-de-acuaticas': {
    currency: 'GBP', hunters: { min: 1, max: 8 },
    packages: [2, 3, 4].map((n) => days(n, 250 * n)),
    companions: [],
    trophies: tr('Tasas de abate', [['Acuáticas (por unidad)', 20, { max: 300, step: 10 }], ['Faisanes, perdiz, becada y agachadiza (por unidad)', 30, { max: 300, step: 10 }], ['Muntjac medalla', 800], ['Muntjac no medallable', 500], ['CWD medalla', 1000], ['CWD no medalla', 500]]),
    defaultTrophies: { 'Acuáticas (por unidad)': 20 },
    fees: [],
  },
  'inglaterra-caza-de-corzos': {
    currency: 'GBP', hunters: { min: 1, max: 4 },
    packages: [3, 4, 5].map((n) => days(n, 300 * n)),
    companions: [],
    trophies: tr('Tasas de abate', [['Corzo representativo', 650], ['Corzo de 400 a 449 g', 750]]).concat(tr('Tasas de abate', [['Corzo por encima de 450 g', 950]], PLUS), tr('Tasas de abate', [['Muntjac medalla', 1000], ['Muntjac representativo', 500], ['CWD medalla plata', 900], ['CWD medalla oro', 1000], ['Ciervo medalla', 5000]])),
    fees: [],
    notes: [NOTE_PLUS],
  },
  'inglaterra-caza-de-muntjac-y-cwd': {
    currency: 'GBP', hunters: { min: 1, max: 4 },
    packages: [3, 4, 5].map((n) => days(n, 300 * n)),
    companions: [],
    trophies: tr('Tasas de abate', [['Muntjac medalla', 1000], ['Muntjac no medallable', 500], ['CWD medalla plata', 900], ['CWD medalla oro', 1000], ['Antílope negro', 3000]]),
    fees: [],
  },
  'italia-caza-de-rebecos-en-los-alpes': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'r1', label: '2 días de caza con 1 rebeco sin límite de puntos', days: 3, price: 3000, includedTrophies: 1 },
      { id: 'r2', label: '2 días de caza con 2 rebecos sin límite de puntos', days: 3, price: 5500, includedTrophies: 2 },
      { id: 'r3', label: '2 días de caza con 3 rebecos sin límite de puntos', days: 3, price: 7700, includedTrophies: 3 },
    ],
    companions: [{ label: 'Acompañante', price: 250, per: 'trip' }],
    trophies: [],
    fees: [
      { id: 'lic', label: 'Licencia de caza', price: 100, per: 'hunter' },
      { id: 'rifle', label: 'Alquiler de rifle y munición', price: 120, per: 'hunter', optional: true },
      { id: 'heli', label: 'Helicóptero para acceder a zonas inaccesibles', price: 350, per: 'hunter', optional: true },
    ],
  },
  'kazakhstan-maral': {
    currency: 'USD', hunters: { min: 2, max: 6 },
    packages: [{ id: 'p', label: '12 días, 10 de caza de maral, 2×2', days: 12, price: 5400 }],
    companions: [{ label: 'Acompañante no cazador', price: 2800, per: 'trip' }],
    trophies: tr('Trofeo de maral', [['Hasta 12 kg', 4500], ['12 a 13 kg', 5200], ['13 a 14 kg', 5700], ['14 a 15 kg', 6700], ['15 a 16 kg', 7700], ['16 a 17 kg', 9700], ['17 kg o más', 11500]]).concat(
      tr('Trofeo de íbice', [['Hasta 110 cm', 2500], ['110 a 120 cm', 3000], ['120 a 125 cm', 3500], ['125 a 130 cm', 4000], ['130 a 135 cm', 4500], ['135 a 140 cm', 5000], ['Más de 140 cm', 6500]]),
      tr('Extras', [['Corzo siberiano', 1400], ['Lobo', 1200], ['Jabalí', 1200]])),
    defaultTrophies: { 'Hasta 12 kg': 1 },
    fees: [
      { id: 'docs', label: 'Trámites cazador (invitación, permisos de armas y caza, tasa estatal, certificado veterinario, recepción y traslados en Almaty, intérprete)', price: 450, per: 'hunter' },
      { id: 'one', label: 'Suplemento 1×1', price: 900, per: 'hunter', optional: true },
      { id: 'extra', label: 'Día de caza adicional', price: 320, per: 'hunter', optional: true },
      { id: 'cites', label: 'CITES', price: 300, per: 'hunter', optional: true },
    ],
  },
  'kirguizia-ibex': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Programa desde Bishkek, 7 días de caza, 1 íbex incluido', days: 9, price: 4900, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante desde Bishkek', price: 2000, per: 'trip' }],
    trophies: tr(null, [['Segundo íbex', 2200]]),
    fees: [{ id: 'docs', label: 'Gestión y documentación (invitación, aeropuerto, licencias, importación de armas)', price: 250, per: 'hunter' }],
  },
  'kirguizia-marco-polo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Programa desde Bishkek, 1 Marco Polo incluido', days: 12, price: 20000, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante desde Bishkek', price: 2000, per: 'trip' }],
    trophies: tr(null, [['Segundo Marco Polo', 20000], ['Íbex', 2500]]),
    fees: [
      { id: 'docs', label: 'Gestión y documentación', price: 250, per: 'hunter' },
      { id: 'cites', label: 'CITES y documentación de exportación', price: 150, per: 'trophy' },
    ],
  },
  'macedonia-caza-de-rebecos': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '2 días de caza, 3 noches, 1 rebeco sin límite de puntos', days: 3, price: 4190, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante (por día)', price: 175, per: 'day' }],
    trophies: tr(null, [['Segundo rebeco', 3790]]).concat(tr('Ciervo (trofeo por kilos, con mandíbula superior)', [['Ciervo hasta 9 kg', 3880], ['Ciervo de 9 a 11 kg', 5280]]), tr('Ciervo (trofeo por kilos, con mandíbula superior)', [['Ciervo de más de 11 kg', 7280]], PLUS)),
    fees: [
      { id: 'gun', label: 'Tasa de importación del rifle (por cazador)', price: 50, per: 'hunter', optional: true },
      { id: 'skin', label: 'Piel del rebeco (sacar, salar y secar)', price: 150, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'mongolia-batidas-de-lobos': mongolia([
    { id: 'p1', label: 'Lobo 1×1 (1 lobo incluido)', days: 7, price: 4300, includedTrophies: 1 },
    { id: 'p2', label: 'Lobo 2×1, por cazador (1 lobo incluido)', days: 7, price: 3850, includedTrophies: 1, hunterStep: 2 },
  ], [['Lobo adicional', 900], ['Corzo siberiano en batida', 1500]]),
  'mongolia-corzo-siberiano': mongolia([
    { id: 'p1', label: 'Caza 1×1 (1 corzo incluido)', days: 7, price: 5000, includedTrophies: 1 },
    { id: 'p2', label: 'Caza 2×1, por cazador (1 corzo incluido)', days: 7, price: 4200, includedTrophies: 1, hunterStep: 2 },
  ], [['Corzo adicional', 1300], ['Lobo', 900]]),
  'mongolia-ibex': mongolia([
    { id: 'a1', label: 'Íbex del Altái · 1×1 (1 íbex incluido)', days: 7, price: 6950, includedTrophies: 1 },
    { id: 'a2', label: 'Íbex del Altái · 2×1, por cazador (1 íbex incluido)', days: 7, price: 6500, includedTrophies: 1, hunterStep: 2 },
    { id: 'g1', label: 'Íbex del Altái y gacela de cola negra · 1×1 (1 íbex y 1 gacela incluidos)', days: 7, price: 7850, includedTrophies: 2 },
    { id: 'g2', label: 'Íbex del Altái y gacela de cola negra · 2×1, por cazador', days: 7, price: 7400, includedTrophies: 2, hunterStep: 2 },
    { id: 'b1', label: 'Íbex del Gobi · 1×1 (1 íbex incluido)', days: 7, price: 6600, includedTrophies: 1 },
    { id: 'b2', label: 'Íbex del Gobi · 2×1, por cazador (1 íbex incluido)', days: 7, price: 5600, includedTrophies: 1, hunterStep: 2 },
  ], [['Íbex adicional', 1700], ['Gacela de cola negra', 900], ['Gacela de cola blanca', 300], ['Corzo siberiano', 1300], ['Lobo', 900]]),
  'mozambique-arco-bufalos': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'd5', label: '5 días de caza, 1 búfalo incluido (1x1)', days: 5, price: 11950, includedTrophies: 1 },
      { id: 'd7', label: '7 días de caza, 2 búfalos incluidos (1x1)', days: 7, price: 19260, includedTrophies: 2 },
      { id: 'd10', label: '10 días de caza, 2 búfalos incluidos (1x1)', days: 10, price: 20960, includedTrophies: 2 },
    ],
    companions: [{ label: 'Acompañante', price: 350, per: 'day' }],
    trophies: mozTrophies([['Leopardo (mín. 14 días)', 9500], ['Hiena (mín. 14 días)', 1950], ['Hipopótamo (mín. 10 días)', 5700], ['Antílope sable (mín. 10 días)', 7600], ['Cebra (mín. 10 días)', 4800], ['Nyala (solo C10) (mín. 10 días)', 4500], ['Hartebeest (mín. 10 días)', 2375], ['Eland (mín. 10 días)', 4600], ['Waterbuck (mín. 10 días)', 2750], ['Cocodrilo (solo C10) (mín. 7 días)', 3650], ['Reedbuck (mín. 7 días)', 1500], ['Potamoquero (mín. 7 días)', 1250], ['Facochero (mín. 7 días)', 850], ['Bushbuck (mín. 7 días)', 1500], ['Duiker rojo (mín. 7 días)', 1450], ['Duiker azul (solo C10) (mín. 7 días)', 1600], ['Duiker gris (mín. 7 días)', 700], ['Suni (solo C10) (mín. 7 días)', 1600], ['Oribi (C10) (mín. 7 días)', 1600], ['Grysbok (mín. 7 días)', 1600], ['Babuino (mín. 7 días)', 265], ['Impala (mín. 7 días)', 800], ['Kudú (solo CDN) (mín. 7 días)', 3500], ['Ñu de Niassa (solo CDN) (mín. 7 días)', 3500]]),
    fees: mozCharter(['Cessna C206 (3-4 pasajeros)', 'Airvan (4-5 pasajeros)', 'Islander (5-6 pasajeros)']),
  },
  'mozambique-programa-general': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [
      days(7, 4900),
      days(10, 7000),
      { id: 'leo', label: '14 días de leopardo y plains game', days: 14, price: 18000 },
    ],
    companions: [{ label: 'Acompañante, por día', price: 350, per: 'day' }],
    trophies: mozTrophies([['Leopardo (mín. 14 días)', 9500], ['Hiena (mín. 14 días)', 1950], ['Primer búfalo (mín. 10 días)', 5000], ['Segundo búfalo (según cupo)', 5000], ['Hipopótamo (mín. 10 días)', 5700], ['Sable (mín. 10 días)', 7600], ['Cebra (mín. 10 días)', 4800], ['Nyala (solo C10, mín. 10 días)', 4500], ['Hartebeest (mín. 10 días)', 2375], ['Eland (mín. 10 días)', 4600], ['Waterbuck (mín. 10 días)', 2750], ['Cocodrilo (solo C10, mín. 7 días)', 3650], ['Reedbuck común', 1500], ['Potamóquero', 1250], ['Facochero', 850], ['Bushbuck', 1500], ['Duiker rojo', 1450], ['Duiker azul (solo C10)', 1600], ['Duiker gris', 700], ['Suni (solo C10)', 1600], ['Oribi (C10)', 1600], ['Grysbuck', 1600], ['Babuino', 265], ['Impala', 800], ['Kudu (solo Nairoto)', 3500], ['Ñu de Niassa (solo Nairoto)', 3500]]),
    fees: mozCharter(['Cessna 206 (3-4 pasajeros)', 'Airvan (4-5 pasajeros)', 'Islander (5-6 pasajeros)']),
    notes: ['Plains game 1×1: 700 US$ por día.'],
  },
  'namibia-campamento-de-lujo': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [5, 7, 10].map((n) => days(n, 0, { tiers: [{ min: 1, max: 1, price: 480 * n }, { min: 2, max: 99, price: 350 * n }] })),
    companions: [{ label: 'No cazador', price: 250, per: 'day' }],
    trophies: tr('Tasas de abate', [['Babuino (trofeo)', 100], ['Blesbok común', 600], ['Blesbok blanco', 750], ['Caracal', 800], ['Guepardo', 4000], ['Duiker', 350], ['Eland del Cabo', 2000], ['Órix', 700], ['Órix dorado', 2300], ['Jirafa', 2500], ['Impala común', 550], ['Chacal (trofeo)', 100], ['Klipspringer', 1500], ['Kudu', 2800], ['Nyala', 3000], ['Hartebeest rojo', 700], ['Roan', 6000], ['Sable', 6000], ['Springbok Kalahari', 400], ['Springbok negro, blanco o cobrizo', 1000], ['Steenbok', 350], ['Facochero', 450], ['Waterbuck', 1500], ['Ñu negro', 1000], ['Ñu azul', 800], ['Ñu dorado', 2300], ['Cebra de Hartmann', 750]]),
    fees: [],
  },
  'nueva-zelanda-arco-ciervos': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [5, 7, 10].map((n) => days(n, 640 * n)),
    companions: [{ label: 'Acompañante', price: 300, per: 'day' }],
    trophies: tr('Tasas de abate', [['Ciervo de 290 a 320 puntos SCI', 3500], ['Ciervo de 321 a 360 puntos SCI', 4900], ['Ciervo de 361 a 399 puntos SCI', 9000], ['Ciervo de 400 a 450 puntos SCI', 15000], ['Ciervo de 451 a 499 puntos SCI', 20000], ['Ciervo de 500 a 530 puntos SCI', 25000], ['Tahr', 5500], ['Rebeco', 5500], ['Gamo', 4750], ['Carnero Arapawa', 1000], ['Cabra asilvestrada', 750], ['Jabalí', 1200]]),
    fees: [
      { id: 'heli', label: 'Helicóptero para rebeco y tahr (por animal)', price: 2000, per: 'hunter', optional: true },
      { id: 'fish', label: 'Día de pesca', price: 700, per: 'hunter', optional: true },
      { id: 'fish2', label: 'Día de pesca con alojamiento', price: 1250, per: 'hunter', optional: true },
    ],
  },
  'rusia-siberia-black-grizzly': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Grizzly negro (7 días, 1 oso incluido)', days: 7, price: 7900, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 2900, per: 'trip' }],
    trophies: tr(null, [['Oso negro del Himalaya', 3500], ['Jabalí', 900], ['Wapití de Manchuria', 2150]]),
    fees: [],
  },
  'rusia-siberia-oso-negro-en-la-osera': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '6 días de viaje, 3 de caza', days: 6, price: 5900, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 2900, per: 'trip' }],
    trophies: [],
    fees: [],
  },
  'rusia-siberia-oso-pardo-desde-el-barco': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Precios (7 días de caza, 1 oso incluido)', days: 9, includedTrophies: 1, tiers: [{ min: 1, max: 1, price: 11500 }, { min: 2, max: 2, price: 8500 }, { min: 3, max: 3, price: 7500 }, { min: 4, max: 4, price: 7000 }] }],
    companions: [{ label: 'Acompañante no cazador', price: 1900, per: 'trip' }],
    trophies: tr(null, [['Foca del Baikal', 1000]]),
    fees: [{ id: 'prep', label: 'Preparación de trofeos', price: 150, per: 'trophy', optional: true, checked: true }],
  },
  'rusia-siberia-oso-pardo-en-la-cueva': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'bear', label: '5 días de caza, 1 oso incluido', days: 5, price: 6900, includedTrophies: 1 },
      { id: 'lynx', label: '5 días de caza, 1 lince incluido', days: 5, price: 4500, includedTrophies: 1 },
    ],
    companions: [{ label: 'Acompañante no cazador', price: 1900, per: 'trip' }],
    trophies: [],
    fees: [],
  },
  'rusia-siberia-oso-pardo-espera-y-rececho': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Oso pardo siberiano', days: 7, price: 8300, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 2900, per: 'trip' }],
    trophies: tr(null, [['Opcional: urogallo (dos especies, Buriatia) y gallo lira', 2200]]),
    fees: [{ id: 'prep', label: 'Preparación de trofeos', price: 150, per: 'trophy', optional: true, checked: true }],
  },
  'sudafrica-arco-especial-facoceros': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '4 días de caza 1x1, 5 noches, con 5 facocheros', days: 5, price: 2700, includedTrophies: 5 }],
    companions: [{ label: 'Acompañante', price: 750, per: 'trip' }],
    trophies: tr(null, [['Facochero extra', 350]]),
    fees: [{ id: 'prep', label: 'Limpieza y preparación de colmillos (juego)', price: 20, per: 'trophy', optional: true, checked: true }],
  },
  'sudafrica-arco-leones': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [
      { id: 'l1', label: 'León macho', days: 7, price: 10900 },
      { id: 'l2', label: 'León + leona', days: 7, price: 14800 },
      { id: 'l3', label: 'León + búfalo sin límite de pulgadas', days: 7, price: 19900 },
      { id: 'l4', label: 'Leona + búfalo + sable', days: 7, price: 15500 },
    ],
    companions: [],
    trophies: [],
    fees: [],
  },
  'tayikistan-ibex': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Caza, 9 días (7 de caza)', days: 10, price: 3000 }],
    companions: [],
    trophies: tr(null, [['Íbex', 3900], ['Segundo íbex', 5000], ['Lobo (normalmente no se puede exportar)', 1300]]),
    defaultTrophies: { 'Íbex': 1 },
    fees: [],
  },
  'tayikistan-marco-polo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Caza', days: 10, price: 20000 }],
    companions: [],
    trophies: tr(null, [['Marco Polo (unas 55 pulgadas)', 18000], ['Marco Polo extragrande (más de 60 pulgadas)', 38000], ['Íbex', 6000], ['Lobo (no exportable)', 1300]]),
    defaultTrophies: { 'Marco Polo (unas 55 pulgadas)': 1 },
    fees: [],
  },
  'tunez-batidas-jabali': (() => {
    const two = { 4: 1020, 5: 975, 6: 875, 7: 820, 8: 800, 9: 775, 10: 800 };
    const add = { 4: 360, 5: 345, 6: 300, 7: 270, 8: 255, 9: 240, 10: 250 };
    const tiers = (n) => Object.keys(two).map((h) => ({ min: +h, max: +h, price: two[h] + add[h] * (n - 2) }));
    return {
      currency: 'EUR', hunters: { min: 4, max: 10 },
      packages: [2, 3, 4].map((n) => days(n, 0, { tiers: tiers(n) })),
      companions: [{ label: 'Acompañante · 2 días', price: 460, per: 'trip' }],
      trophies: tr('Precio por jabalí', [['Macho', 340], ['Hembra y pequeños', 150]]),
      fees: [],
      notes: ['Acompañante: 150 € por cada día adicional.'],
    };
  })(),
  'turquia-arco-jabali': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: 'Programa y precios', days: 4, includedTrophies: 1, tiers: [{ min: 1, max: 1, price: 3495 }, { min: 2, max: 2, price: 2850 }, { min: 3, max: 3, price: 2550 }, { min: 4, max: 99, price: 2250 }] }],
    companions: [],
    trophies: tr('Tasas de abate', [['Macho de 18 cm o más adicional (el primero está incluido)', 900], ['Hembras y pequeños, a partir de 30', 50]]),
    fees: [{ id: 'extra', label: 'Día adicional de caza', price: 300, per: 'hunter', optional: true }],
  },
  'turquia-ciervo-de-anatolia': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Servicio de caza', days: 5, price: 2950 }],
    companions: [],
    trophies: tr('Precios', [['Trofeo hasta 10 kg', 6500], ['10 a 11 kg', 8500], ['11 a 12 kg', 10500], ['12 a 13 kg', 12500], ['13 kg o más', 14500]]),
    defaultTrophies: { 'Trofeo hasta 10 kg': 1 },
    fees: [
      { id: 'skull', label: 'Solo cráneo', price: 130, per: 'trophy', optional: true, checked: true },
      { id: 'cape', label: 'Cráneo, desollado de hombros y salado', price: 250, per: 'trophy', optional: true },
    ],
  },
  'turquia-ibex-bezoar': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Programa de 6 noches y 5 días de caza (al reservar)', days: 6, price: 4000 }],
    companions: [{ label: 'Acompañante', price: 250, per: 'day' }],
    trophies: tr(null, [['Íbex (al terminar la caza)', 15000]]),
    defaultTrophies: { 'Íbex (al terminar la caza)': 1 },
    fees: [
      { id: 'prep', label: 'Preparación del trofeo', price: 250, per: 'trophy', optional: true, checked: true },
      { id: 'extra', label: 'Día extra de caza', price: 300, per: 'hunter', optional: true },
    ],
  },
  'turquia-jabalies-y-pesca-de-atunes': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [
      { id: 'p1', label: '1×1 (objetivo de 6 a 10 machos grandes)', days: 5, price: 1750 },
      { id: 'p2', label: '2×1, por cazador (objetivo de 4 a 5 machos grandes)', days: 5, price: 1450, hunterStep: 2 },
    ],
    companions: [{ label: 'Acompañante en habitación compartida', price: 600, per: 'trip' }, { label: 'Acompañante en habitación individual', price: 900, per: 'trip' }],
    trophies: tr('Tasas de abate', [['De 20 a 24 cm', 1190], ['Más de 24 cm', 1490]]).concat(tr('Tarifa de pesca', [['Atún cobrado de más de 50 kg', 300]])),
    fees: [
      { id: 'fish', label: 'Salida de pesca, de 1 a 4 pescadores', price: 2290, per: 'group', optional: true },
      { id: 'taxi', label: 'Taxidermia por trofeo', price: 40, per: 'trophy', optional: true, checked: true },
      { id: 'extra', label: 'Día adicional de caza', price: 300, per: 'hunter', optional: true },
    ],
  },
  'yukon-arco-alce': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '10 días de caza con un alce', days: 10, price: 28500, includedTrophies: 1 }],
    companions: [],
    trophies: tr(null, [['Segundo alce', 9750]]),
    fees: [
      { id: 'lic', label: 'Licencia y precinto de alce', price: 750, per: 'hunter' },
      { id: 'gst', label: 'GST (tasa del gobierno)', price: 1463, per: 'hunter' },
      { id: 'charter', label: 'Chárter hasta el campamento', price: 2750, per: 'hunter' },
      { id: 'meat', label: 'Transporte de trofeo, carne y pieles', price: 1500, per: 'hunter' },
    ],
  },
  'zambia-bufalo-hipo-cocodrilo-7-dias': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '7 días de caza 1×1: búfalo, hipopótamo y cocodrilo', days: 7, price: 10150 }],
    companions: [{ label: 'Acompañante', price: 400, per: 'day' }],
    trophies: tr('Precio del programa', [['Tasa de abate de búfalo', 5450], ['Tasa de abate de cocodrilo', 4000], ['Tasa de abate de hipopótamo', 4000]]).concat(tr('Trofeos adicionales (según cupo y zona)', [['Babuino', 175], ['Bushbuck', 1150], ['Potamóquero', 900], ['Duiker común', 700], ['Duiker azul', 1150], ['Hartebeest', 2300], ['Impala', 460], ['Kudu', 3450], ['Oribi', 1350], ['Puku', 1700], ['Reedbuck', 1150], ['Lechwe rojo', 6900], ['Sable', 9000], ['Facochero', 1000], ['Waterbuck defassa', 3450], ['Ñu azul', 2000]])),
    defaultTrophies: { 'Tasa de abate de búfalo': 1, 'Tasa de abate de cocodrilo': 1, 'Tasa de abate de hipopótamo': 1 },
    fees: [
      { id: 'dip', label: 'Dip, pack y crate', price: 2000, per: 'hunter' },
      { id: 'lic', label: 'Licencia de safari, de aves y permiso de arma', price: 1650, per: 'hunter' },
    ],
  },
};
