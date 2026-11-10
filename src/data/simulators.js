// Simuladores de presupuesto de los programas importados de la web antigua (data/catalog/*.json).
// Se crean a partir de sus tarifas actuales. Las etiquetas copian el texto de las tablas de precios,
// así ya están traducidas en los diccionarios de idiomas.
// Formato: igual que `simulator` en data/programs.js. Además:
//   trophies[].group  título del grupo (p. ej. "Tasas de abate: corzo")
//   trophies[].plus   el precio es la base del tramo; se suma el suplemento por g, cm o punto
// Los precios que dependen de medidas (+X € por g, cm o punto) usan la base del tramo.

const tr = (group, list, opts = {}) => list.map(([name, price]) => ({ name, price, ...(group ? { group } : {}), ...opts }));
const PLUS = { plus: true };
const NOTE_PLUS = 'Los trofeos por medida se calculan con el precio base del tramo; el suplemento se suma al medir el trofeo.';

// Tasas de abate de Namibia (Windhoek): iguales en varios programas.
const namibiaTrophies = [
  ['Kudu', 1950], ['Eland', 2200], ['Waterbuck', 1800], ['Órix (gemsbok)', 500], ['Órix dorado', 1500],
  ['Ñu negro', 1200], ['Ñu azul', 1000], ['Ñu dorado', 2500], ['Cebra de montaña', 1100], ['Cebra común', 900],
  ['Hartebeest rojo', 700], ['Blesbok', 600], ['Impala común', 600], ['Nyala', 2500], ['Lechwe', 3500],
  ['Sable (menos de 40")', 4500], ['Sable (más de 40")', 5800], ['Springbok', 350], ['Facóquero', 390],
  ['Duiker', 250], ['Steenbok', 250],
];
// Limpopo (Sudáfrica), tarifas 2026.
const limpopo26 = [
  ['Babuino', 150], ['Blesbok', 500], ['Ñu azul', 1300], ['Ñu negro', 1300], ['Búfalo de más de 40"', 12000], ['Búfalo hembra', 3400],
  ['Bushbuck', 1400], ['Potamóquero', 2150], ['Caracal', 950], ['Civeta', 1700], ['Duiker gris', 490], ['Eland', 5450],
  ['Gineta', 450], ['Jirafa', 2950], ['Hiena parda (con licencia)', 3900], ['Hiena manchada (con licencia)', 3900],
  ['Hartebeest rojo', 2100], ['Impala', 450], ['Chacal', 290], ['Klipspringer', 2850], ['Kudu', 3900], ['Nyala', 2700],
  ['Órix', 2300], ['Avestruz', 1200], ['Reedbuck común', 1300], ['Reedbuck de montaña', 1200], ['Sable', 5700],
  ['Springbok', 740], ['Steenbok', 520], ['Tsessebe', 2100], ['Facóquero de 8" o más', 700], ['Facóquero', 550],
  ['Waterbuck', 2850], ['Cebra', 1300],
];

const days = (n) => ({ id: `d${n}`, label: `${n} días de caza`, days: n });

export const simulators = {
  'argentina-chanchos-y-antilopes': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [3, 5, 7].map((n) => ({ ...days(n), price: 200 * n, feeOverrides: { arms: 100 * n } })),
    companions: [{ label: 'Acompañante (por día)', price: 100, per: 'day' }],
    trophies: tr(null, [['Chancho (sin límite de tamaño)', 600], ['Antílope negro (sin límite de tamaño)', 1100], ['Ciervo axis (según finca)', 1400], ['Carneros comunes', 900], ['Carneros 4 cuernos', 1200]]),
    fees: [
      { id: 'transfer', label: 'Traslado aeropuerto/hotel, ida y vuelta (grupo de hasta 4)', price: 350, per: 'group', checked: true, optional: true },
      { id: 'arms', label: 'Alquiler de armas (por día y persona)', price: 100, per: 'hunter', optional: true },
      { id: 'horse', label: 'Caballo y perros (por persona)', price: 120, per: 'hunter', optional: true },
      { id: 'prep', label: 'Preparado de cueros y descuerno (por pieza)', price: 100, per: 'trophy', optional: true },
    ],
    notes: ['Ciervo axis: de 1.400 € a 2.400 € según la finca.'],
  },
  'bielorrusia-alce': {
    currency: 'EUR', hunters: { min: 3, max: 4 },
    packages: [{ id: 'p', label: 'Grupo de 3-4 cazadores, por persona (4 días de caza, 5 noches)', days: 5, price: 1800 }],
    companions: [],
    trophies: tr('Trofeo de alce', [['Macho hasta 6,99 kg', 2300], ['Macho sin trofeo', 1200]]).concat(tr('Trofeo de alce', [['Macho de 7 a 8,99 kg', 2900], ['Macho de más de 9 kg', 3900]], PLUS)),
    fees: [
      { id: 'transfer', label: 'Traslado al cazadero', price: 160, per: 'hunter' },
      { id: 'docs', label: 'Documentación', price: 150, per: 'hunter' },
      { id: 'vet', label: 'Certificado veterinario', price: 80, per: 'trophy' },
      { id: 'prep', label: 'Primera preparación del cráneo', price: 90, per: 'trophy', optional: true, checked: true },
      { id: 'single', label: 'Habitación individual', price: 150, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'bulgaria-becadas': {
    currency: 'EUR', hunters: { min: 2, max: 8 },
    packages: [{ id: 'p', label: '4 noches, 3 días de caza', days: 4, tiers: [{ min: 2, max: 3, price: 1900 }, { min: 4, max: 99, price: 1700 }] }],
    companions: [{ label: 'Acompañante', price: 165, per: 'day' }],
    trophies: [],
    fees: [{ id: 'extra', label: 'Día adicional', price: 420, per: 'hunter', optional: true }],
  },
  'bulgaria-programa-general': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '1 cazador · 3 días de caza, 4 noches', days: 4, price: 1690 }],
    companions: [],
    trophies: [
      ...tr('Tasas de abate: muflón', [['Hasta 60 cm', 600]]),
      ...tr('Tasas de abate: muflón', [['60,01 – 70 cm', 1100], ['70,01 – 80 cm', 1800], ['80,01 – 90 cm', 3500], ['Más de 90 cm', 5700]], PLUS),
      ...tr('Tasas de abate: ciervo', [['6 – 7 kg', 2000], ['7 – 8 kg', 2700], ['8 – 9 kg', 3700], ['9 – 10 kg', 4900], ['10 – 11 kg', 6400], ['11 – 12 kg', 9400], ['Más de 12 kg', 13400]], PLUS),
      ...tr('Tasas de abate: gamo', [['Hasta 2 kg', 700], ['2 – 2,5 kg', 900]]),
      ...tr('Tasas de abate: gamo', [['2,5 – 3 kg', 1100], ['3 – 3,5 kg', 1400], ['3,5 – 4 kg', 1900], ['4 – 4,5 kg', 2900], ['Más de 4,5 kg', 4450]], PLUS),
    ],
    fees: [{ id: 'extra', label: 'Día de caza adicional', price: 480, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'bulgaria-urogallo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Cazador · 3 días de caza, 4 noches', days: 4, price: 1900 }],
    companions: [{ label: 'Acompañante', price: 660, per: 'trip' }],
    trophies: [
      ...tr('Tasas de abate: urogallo', [['Urogallo abatido', 2800]]),
      ...tr('Tasas de abate: corzo (trofeo menos 90 g)', [['Hasta 250 g', 150]]),
      ...tr('Tasas de abate: corzo (trofeo menos 90 g)', [['250 – 299 g', 150], ['300 – 349 g', 250], ['350 – 399 g', 450], ['400 – 449 g', 850], ['Más de 450 g', 1500]], PLUS),
      ...tr('Tasas de abate: jabalí (media de colmillos)', [['Hasta 14 cm', 300]]),
      ...tr('Tasas de abate: jabalí (media de colmillos)', [['14 – 15,99 cm', 300], ['16 – 17,99 cm', 500], ['18 – 19,99 cm', 700], ['20 – 21,99 cm', 1000], ['Más de 22 cm', 1600]], PLUS),
    ],
    fees: [],
    notes: [NOTE_PLUS],
  },
  'eslovenia-rebeco-alpino': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '3 días de caza, 4 noches, por persona', days: 4, price: 1790 }],
    companions: [{ label: 'Acompañante', price: 175, per: 'day' }],
    trophies: [
      ...tr('Tasas de abate (puntos CIC)', [['Hasta 85', 1400], ['85 – 90', 1800], ['90 – 95', 2100], ['95 – 100', 2600], ['100 – 105', 3100], ['105 – 110', 3900]]),
      ...tr('Tasas de abate (puntos CIC)', [['Más de 110', 3900]], PLUS),
    ],
    fees: [
      { id: 'single', label: 'Suplemento cazador solo', price: 160, per: 'single' },
      { id: 'extra', label: 'Día de caza adicional', price: 420, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'espana-grandes-muflones': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [2, 3, 4].map((n) => ({ ...days(n), price: 450 * n })),
    companions: [{ label: 'Acompañante', price: 200, per: 'day' }],
    trophies: [
      ...tr('Trofeo de muflón', [['Selectivo', 1000], ['Representativo', 1500], ['Bronce', 2000], ['Plata', 2800], ['Oro', 3500], ['210 a 215 puntos', 4400], ['215 a 220', 5300], ['220 a 225', 6200], ['225 a 230', 7100], ['230 a 235', 8200]]),
      ...tr('Ciervo', [['Hasta 190 puntos CIC', 3500]]),
      ...tr('Jabalí', [['Más de 5 cm', 1500], ['Menos de 5 cm', 600], ['Hembra', 400]]),
    ],
    fees: [],
    notes: ['Ciervo de más de 190 puntos: +100 € por punto hasta 200 y +200 € por punto a partir de 200.'],
  },
  'espana-grandes-venados': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [2, 3, 4].map((n) => ({ ...days(n), price: 450 * n })),
    companions: [{ label: 'Acompañante', price: 200, per: 'day' }],
    trophies: [
      ...tr('Ciervo', [['Hasta 190 puntos CIC', 3500]]),
      ...tr('Jabalí', [['Más de 5 cm', 1500], ['Menos de 5 cm', 600], ['Hembra', 400]]),
      ...tr('Muflón', [['Selectivo', 1000], ['Representativo', 1500], ['Bronce', 2000], ['Plata', 2800], ['Oro', 3500]]),
    ],
    fees: [],
    notes: ['Ciervo de más de 190 puntos: +100 € por punto hasta 200 y +200 € por punto a partir de 200.'],
  },
  'espana-macho-montes-gredos-finca-privada': {
    currency: 'EUR', hunters: { min: 1, max: 2 },
    packages: [
      { id: 'm1', label: 'Caza, 2/3 días + Macho hasta 79 cm', days: 3, price: 7900 },
      { id: 'm2', label: 'Caza, 2/3 días + Macho de más de 79 cm', days: 3, price: 10400 },
    ],
    companions: [],
    trophies: tr(null, [['Hembra (solo después de cazar el macho)', 500], ['Ciervo (solo después de cazar el macho)', 1900], ['Jabalí (solo después de cazar el macho)', 900]]),
    fees: [
      { id: 'rifle', label: 'Alquiler de rifle y munición (solo cazadores extranjeros)', price: 120, per: 'hunter', optional: true },
      { id: 'lic', label: 'Licencia de caza (solo cazadores extranjeros)', price: 100, per: 'hunter', optional: true },
    ],
    notes: ['Al reservar se paga un depósito de 3.250 €.'],
  },
  'groenlandia-muskox-en-verano': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Paquete de caza de 3 o 4 días (incluye abate de 1 muskox macho)', days: 4, price: 6000, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante', price: 3500, per: 'trip' }],
    trophies: tr(null, [['Trofeo adicional de muskox', 2900], ['Trofeo adicional de caribú', 2900]]),
    fees: [],
  },
  'hungria-corzos-a-peso': {
    currency: 'EUR', hunters: { min: 1, max: 8 },
    packages: [{ id: 'p', label: '3 días de caza / 4 de estancia', days: 4, tiers: [{ min: 1, max: 1, price: 2400 }, { min: 2, max: 3, price: 1850 }, { min: 4, max: 99, price: 1700 }] }],
    companions: [{ label: 'Acompañante (3 días de caza / 4 de estancia)', price: 750, per: 'trip' }],
    trophies: tr('Tasas de abate (IVA incluido)', [['Hasta 249 g', 200], ['250-349 g', 270], ['350-399 g', 550], ['400-449 g', 950], ['450-499 g', 1550], ['Más de 500 g', 3000]], PLUS),
    fees: [],
    notes: [NOTE_PLUS],
  },
  'iran-batidas-jabali': {
    currency: 'EUR', hunters: { min: 2, max: 10 },
    packages: [{ id: 'p', label: '5 días de caza', days: 5, tiers: [{ min: 2, max: 3, price: 2200 }, { min: 4, max: 5, price: 2100 }, { min: 6, max: 10, price: 2000 }] }],
    companions: [],
    trophies: tr(null, [['Macho, colmillo hasta 17,9 cm', 590], ['Macho, colmillo de 18 a 20 cm', 990], ['Macho, colmillo de más de 20,1 cm', 1290]]),
    fees: [],
  },
  'macedonia-lobo-en-espera': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '3 días de caza de lobo, 4 noches (por persona)', days: 4, price: 1900 }],
    companions: [{ label: 'Acompañante (por día)', price: 175, per: 'day' }],
    trophies: [{ name: 'Tasa de abate lobo', price: 2900, cites: true }],
    fees: [{ id: 'cites', label: 'CITES para el lobo', price: 500, per: 'cites' }],
  },
  'mauritania-especial-facocheros': {
    currency: 'EUR', hunters: { min: 4, max: 10 },
    packages: [{ id: 'p', label: '4 días, mínimo 4 cazadores, 5 facocheros por cazador, todo incluido', days: 4, price: 3295, includedTrophies: 5 }],
    companions: [{ label: 'Acompañante', price: 490, per: 'trip' }],
    trophies: tr(null, [['Facochero extra, cada uno', 250]]),
    fees: [
      { id: 'arms', label: 'Trámite de importación de armas', price: 150, per: 'hunter' },
      { id: 'visa', label: 'Visado', price: 55, per: 'hunter' },
      { id: 'health', label: 'Certificado sanitario', price: 125, per: 'group' },
      { id: 'tusk', label: 'Preparación de trofeo (colmillos), por animal', price: 25, per: 'trophy', optional: true, checked: true },
      { id: '1x1', label: 'Caza 1×1', price: 450, per: 'hunter', optional: true },
      { id: 'room', label: 'Habitación individual', price: 150, per: 'hunter', optional: true },
      { id: 'extra', label: 'Día adicional de cazador', price: 250, per: 'hunter', optional: true },
      { id: 'rifle', label: 'Alquiler de rifle o escopeta', price: 200, per: 'hunter', optional: true },
    ],
    notes: ['Alquiler de rifle o escopeta: 50 € al día (4 días). Munición de rifle: 6 € por bala.'],
  },
  'mozambique-bufalo-en-5-dias': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '5 días de caza con 1 búfalo incluido, 1×1', days: 5, price: 13000, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante', price: 420, per: 'day' }],
    trophies: tr(null, [['Reedbuck común', 1400], ['Potamóquero', 1400], ['Facóquero', 1100], ['Bushbuck', 1700], ['Duiker rojo', 1800], ['Duiker azul', 2000], ['Duiker gris', 950], ['Suni', 1800], ['Oribi', 2000], ['Impala', 850], ['Babuino', 400]]),
    fees: [
      { id: 'cessna', label: 'Cessna 206 (3-4 pasajeros)', price: 3000, per: 'group', optional: true },
      { id: 'airvan', label: 'Airvan (4-5 pasajeros)', price: 3600, per: 'group', optional: true },
      { id: 'islander', label: 'Islander (5-6 pasajeros)', price: 4000, per: 'group', optional: true },
    ],
    notes: ['Leopardo, hiena, hipopótamo, sable, nyala, eland y otros piden 7, 10 o 14 días: consulte el programa largo.'],
  },
  'namibia-guepardo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Programa guepardo', days: 6, price: 1800 + 1000 + 1500 + 7700, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 120, per: 'day' }],
    trophies: tr(null, namibiaTrophies),
    fees: [],
    notes: ['Incluye 6 días de caza × 300 €, permisos y CITES (1.000 €), preparación especial (1.500 €) y la tasa de abate del guepardo (7.700 €, se paga tras abatirlo).'],
  },
  'namibia-leopardo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: 'Programa leopardo (mínimo 10 días)', days: 10, price: 3000 + 1200 + 1000 + 16800, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 120, per: 'day' }],
    trophies: tr(null, namibiaTrophies),
    fees: [],
    notes: ['Incluye 10 días de caza × 300 €, permisos y CITES (1.200 €), cebado previo (1.000 €) y la tasa de abate del leopardo (16.800 €, se paga tras abatirlo).'],
  },
  'namibia-paquete-economico': {
    currency: 'EUR', hunters: { min: 2, max: 8 },
    packages: [{ id: 'p', label: 'Paquete económico Windhoek 1: 4 días de caza en 2×1 con órix, 2 springbok, babuino y chacal (5 trofeos)', days: 4, price: 1800, includedTrophies: 5, hunterStep: 2 }],
    companions: [{ label: 'Acompañante no cazador', price: 360, per: 'trip' }],
    trophies: tr(null, namibiaTrophies),
    fees: [
      { id: 'rifle', label: 'Alquiler de rifle y balas (todos los días)', price: 200, per: 'hunter', optional: true },
      { id: 'k1', label: 'Kalahari 1: 2 de los días de caza en el Kalahari (una noche allí) con 2 springbok y 1 blesbok', price: 950, per: 'hunter', optional: true },
      { id: 'k2', label: 'Kalahari 2: 1 día de ida y vuelta al Kalahari con 2 springbok trofeo', price: 650, per: 'hunter', optional: true },
      { id: 'zebra', label: 'Cebra de montaña: 1 día en las montañas Khomas Hochland con 1 cebra de Hartmann', price: 1100, per: 'hunter', optional: true },
    ],
  },
  'namibia-programa-general-windhoek': {
    currency: 'EUR', hunters: { min: 1, max: 8 },
    packages: [
      { id: '1x1', label: '1 cazador con 1 profesional', days: 6, price: 1800 },
      { id: '2x1', label: '2 cazadores con 1 profesional', days: 6, price: 1200, hunterStep: 2 },
    ],
    companions: [{ label: 'Acompañante no cazador', price: 120, per: 'day' }],
    trophies: tr(null, namibiaTrophies),
    fees: [
      { id: 'k1', label: 'Kalahari 1 · 2 días de caza, una noche en la finca, 2 springbok y 1 blesbok', price: 950, per: 'hunter', optional: true },
      { id: 'k2', label: 'Kalahari 2 · 1 día ida y vuelta, 2 springbok', price: 550, per: 'hunter', optional: true },
      { id: 'zebra', label: 'Cebra de montaña · 1 día en Khomas Hochland, 1 cebra de Hartmann', price: 1100, per: 'hunter', optional: true },
    ],
    notes: ['6 días de caza: 300 € al día con un profesional por cazador, o 200 € al día si son dos cazadores por profesional.'],
  },
  'nueva-zelanda-programa-general': {
    currency: 'USD', hunters: { min: 1, max: 4 },
    packages: [
      ...[['Puntos SCI 400-450', 13000], ['Puntos SCI 451-500', 18000], ['Puntos SCI 501-550', 25500], ['Puntos SCI 551-600', 35500], ['Puntos SCI 601-650', 48000]].map(([label, price], i) => ({ id: `4-${i}`, label, days: 4, price, includedTrophies: 1 })),
    ],
    companions: [{ label: 'Tarifa diaria acompañante', price: 250, per: 'day' }],
    trophies: [
      ...tr('Wapití', [['Hasta 400 puntos SCI', 12000], ['Puntos SCI 401-420', 16000], ['Puntos SCI 421-440', 20000], ['Puntos SCI 441-460', 25000], ['Puntos SCI 461-480', 30000], ['Puntos SCI 481-500', 40000]]),
      ...tr('Otros animales', [['Tahr', 6000], ['Rebeco', 5000], ['Gamo oro', 5000], ['Gamo plata', 2500], ['Carnero', 1250], ['Cabra', 1250]]),
    ],
    fees: [
      { id: 'tour', label: 'Turismo día completo', price: 700, per: 'group', optional: true },
      { id: 'fish', label: 'Pesca en lago', price: 1000, per: 'group', optional: true },
    ],
    notes: ['Con 3 o más trofeos hay paquete de 6 días. Helicóptero para rebeco y tahr: US$ 2.000-2.500 por animal.'],
  },
  'polonia-caza-de-corzos-a-peso': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [3, 4, 5].map((n) => ({ ...days(n), price: 290 * n })),
    companions: [],
    trophies: [
      ...tr('Tasas de abate. Opción 1: área de Przedborz', [['Hasta 350 g', 390], ['Más de 350 g', 490]]),
      ...tr('Tasas de abate. Opción 2: áreas de corzos grandes', [['De 200 a 350 g', 390], ['De 351 a 500 g', 540], ['De 501 g en adelante', 690]]),
    ],
    fees: [],
  },
  'rumania-batidas-de-jabali': {
    currency: 'EUR', hunters: { min: 1, max: 20 },
    packages: [{ id: 'p', label: '3 noches con 2 días de caza', days: 3, price: 1400 }],
    companions: [{ label: 'Acompañante no cazador', price: 150, per: 'day' }],
    trophies: [
      ...tr('Tarifa de jabalíes', [['Colmillos hasta 12,0 cm (media del arma inferior)', 300], ['Colmillos de 12,1 a 14,0 cm', 400], ['Colmillos de 14,1 a 16,0 cm', 500], ['Colmillos de 16,1 a 18,0 cm', 650], ['Colmillos de 18,1 a 19,9 cm', 850]]),
      ...tr('Tarifa de jabalíes', [['Colmillos a partir de 20,0 cm', 1000]], PLUS),
      ...tr('Tarifa de jabalíes', [['Hembra de 50 a 100 kg (se recomienda no abatir hembras grandes)', 375], ['Hembra de más de 100 kg', 550], ['Jóvenes hasta 50 kg', 250]]),
    ],
    fees: [],
    notes: [NOTE_PLUS],
  },
  'rumania-caza-de-ciervo': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [
      { id: 'llanura', label: 'Cazador en bosque de llanura', days: 4, price: 1200 },
      { id: 'montana', label: 'Cazador en bosque de colina y montaña', days: 4, price: 1400 },
    ],
    companions: [{ label: 'Acompañante no cazador, habitación doble', price: 100, per: 'day' }, { label: 'Acompañante no cazador, habitación individual', price: 150, per: 'day' }],
    trophies: [
      ...tr('Tarifa por trofeo', [['Hasta 7,0 kg', 1950]]),
      ...tr('Tarifa por trofeo', [['7,01 - 8 kg', 2000], ['8,01 - 9 kg', 2800], ['9,01 - 10 kg', 3800], ['10,01 - 11 kg', 5000], ['Más de 11,01 kg', 7000]], PLUS),
    ],
    fees: [{ id: 'extra', label: 'Día extra de caza', price: 250, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'rumania-caza-de-corzos': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '4 noches con 3 días de caza', days: 4, price: 1000 }],
    companions: [{ label: 'Acompañante no cazador, habitación doble', price: 100, per: 'day' }, { label: 'Acompañante no cazador, habitación individual', price: 150, per: 'day' }],
    trophies: [
      ...tr('Tarifa por trofeo', [['Hasta 300 g', 300]]),
      ...tr('Tarifa por trofeo', [['301 - 350 g', 350], ['351 - 400 g', 550], ['401 - 450 g', 850], ['451 - 500 g', 1400], ['A partir de 501 g', 2000]], PLUS),
    ],
    fees: [{ id: 'extra', label: 'Día extra de caza', price: 250, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'rumania-caza-de-oso-en-batida': {
    currency: 'EUR', hunters: { min: 1, max: 10 },
    packages: [{ id: 'p', label: 'Programa por cazador', days: 4, price: 2700 }],
    companions: [{ label: 'Acompañante no cazador', price: 300, per: 'day' }],
    trophies: tr(null, [['Oso abatido', 13200]]),
    fees: [{ id: 'extra', label: 'Día extra de caza', price: 800, per: 'hunter', optional: true }],
  },
  'rumania-jabali-en-espera': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: 'Programa (4 noches, 3 días de caza en espera), por cazador', days: 4, price: 1600 }],
    companions: [{ label: 'Acompañante (por día)', price: 300, per: 'day' }],
    trophies: [
      ...tr('Tasas de abate', [['Machos hasta 12 cm', 400]]),
      ...tr('Tasas de abate', [['Machos de 12,01 a 14 cm', 450], ['Machos de 14,01 a 16 cm', 650], ['Machos de 16,01 a 18 cm', 950], ['Machos de 18,01 a 20 cm', 1350], ['Machos de más de 20 cm', 1850]], PLUS),
      ...tr('Tasas de abate', [['Hembra', 600], ['Crías', 400]]),
    ],
    fees: [
      { id: 'lic', label: 'Licencia de caza', price: 100, per: 'hunter' },
      { id: 'extra', label: 'Día extra de caza', price: 375, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'rumania-osos-en-espera': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: 'Precio por cazador', days: 4, price: 2400 }],
    companions: [{ label: 'Acompañante no cazador', price: 300, per: 'day' }],
    trophies: [...tr(null, [['Oso abatido: trofeo hasta 400 CIC', 9700]]), ...tr(null, [['Oso desde 400 CIC', 9700]], PLUS)],
    fees: [{ id: 'extra', label: 'Día extra de caza', price: 500, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'rumania-rebeco-carpatico': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '5 días y 4 noches, 3 de caza', days: 5, price: 1700 }],
    companions: [{ label: 'Acompañante no cazador', price: 300, per: 'day' }],
    trophies: [
      ...tr('Trofeos (puntos CIC)', [['Hasta 90 puntos', 1300], ['90 – 95 puntos', 1400]]),
      ...tr('Trofeos (puntos CIC)', [['95 – 100 puntos', 1400], ['100 – 105 puntos', 1800], ['105 – 110 puntos', 2300], ['Más de 110 puntos', 3050]], PLUS),
    ],
    fees: [
      { id: 'prep', label: 'Preparación del trofeo', price: 50, per: 'trophy', optional: true, checked: true },
      { id: 'extra', label: 'Día suplementario', price: 375, per: 'hunter', optional: true },
    ],
    notes: [NOTE_PLUS],
  },
  'rumania-rececho-de-gamo': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '4 noches con 3 días de caza', days: 4, price: 1000 }],
    companions: [{ label: 'Acompañante no cazador, habitación doble', price: 100, per: 'day' }, { label: 'Acompañante no cazador, habitación individual', price: 150, per: 'day' }],
    trophies: [
      ...tr('Tarifa de trofeos', [['Hasta 2 kg', 500], ['2,01 - 2,5 kg', 750]]),
      ...tr('Tarifa de trofeos', [['2,51 - 3 kg', 1100], ['3,01 - 3,5 kg', 1400], ['3,51 - 4 kg', 2300], ['4,01 - 4,5 kg', 3300], ['A partir de 4,51 kg', 4800]], PLUS),
    ],
    fees: [{ id: 'extra', label: 'Día extra de caza', price: 250, per: 'hunter', optional: true }],
    notes: [NOTE_PLUS],
  },
  'sudafrica-arco-bufalos': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [['León + búfalo sin límite de pulgadas', 19900], ['Leona + búfalo + sable', 15500], ['León macho', 10900], ['León + leona', 14800]].map(([label, price], i) => ({ id: `p${i}`, label, days: 7, price })),
    companions: [], trophies: [], fees: [],
  },
  'sudafrica-arco-lodge-de-lujo': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [
      ['Paquete 1: ñu azul, impala y blesbok', 3700, 3], ['Paquete 2: búfalo (hasta 38") de caza dura', 9900, 1],
      ['Paquete 3: blesbok, ñu azul o negro o cebra, impala y facóquero', 4200, 4], ['Paquete 4: blesbok, impala, facóquero y duiker gris', 3500, 4],
    ].map(([label, price, n], i) => ({ id: `p${i}`, label, days: 6, price, includedTrophies: n })),
    companions: [{ label: 'Acompañante no cazador', price: 230, per: 'day' }],
    trophies: tr(null, limpopo26),
    fees: [{ id: 'rifle', label: 'Alquiler de rifle (por día)', price: 480, per: 'hunter', optional: true }],
    notes: ['Alquiler de rifle: 80 € al día (6 días). Helicóptero: 800 € por hora. Excursión turística: 180 € por día.'],
  },
  'sudafrica-bufalo-lodge-de-lujo': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [{ id: 'p', label: '5 días de caza con 1 búfalo de boss duro incluido', days: 7, price: 10900, includedTrophies: 1 }],
    companions: [{ label: 'Acompañante no cazador', price: 180, per: 'day' }],
    trophies: tr(null, [
      ['Babuino', 150], ['Blesbok', 425], ['Ñu azul', 1100], ['Ñu negro', 1100], ['Búfalo', 11000], ['Búfalo hembra', 3400], ['Bushbuck', 1400],
      ['Potamóquero', 750], ['Caracal', 950], ['Civeta', 950], ['Duiker gris', 440], ['Eland', 4100], ['Gineta', 400], ['Jirafa', 2950],
      ['Hiena parda (con licencia)', 3600], ['Hiena manchada (con licencia)', 3400], ['Hartebeest rojo', 2100], ['Impala', 325], ['Chacal', 290],
      ['Klipspringer', 2850], ['Kudu', 2900], ['Nyala', 2250], ['Órix', 1650], ['Avestruz', 700], ['Reedbuck común', 1300], ['Reedbuck de montaña', 980],
      ['Sable', 4200], ['Springbok', 520], ['Steenbok', 520], ['Tsessebe', 2100], ['Facóquero de 8" o más', 570], ['Facóquero', 400], ['Waterbuck', 2850], ['Cebra', 980],
    ]),
    fees: [{ id: 'rifle', label: 'Alquiler de rifle', price: 490, per: 'hunter', optional: true }],
    notes: ['Alquiler de rifle: 70 € al día (7 días). Helicóptero: 650 € por hora. Excursión turística: 210 € por día.'],
  },
  'sudafrica-leones-y-bufalo-kalahari': {
    currency: 'EUR', hunters: { min: 1, max: 4 },
    packages: [
      ['León macho · 5 días de caza, 7 de estancia', 10900, 7], ['León y leona · 5 días de caza, 7 de estancia', 13500, 7],
      ['León y búfalo sin límite de pulgadas · 4 días de caza, 6 de estancia', 18900, 6], ['Leona, búfalo y sable · 5 días de caza, 7 de estancia', 17000, 7],
    ].map(([label, price, d], i) => ({ id: `p${i}`, label, days: d, price })),
    companions: [], trophies: [], fees: [],
  },
  'sudafrica-limpopo-programa-general': {
    currency: 'EUR', hunters: { min: 1, max: 8 },
    packages: [
      ...[5, 7].map((n) => ({ id: `a${n}`, label: `1 cazador con 1 profesional (antílopes) · ${n} días de caza`, days: n + 2, price: 440 * n + 290 * 2 })),
      ...[5, 7].map((n) => ({ id: `b${n}`, label: `2 cazadores con 1 profesional · ${n} días de caza`, days: n + 2, price: 380 * n + 290 * 2, hunterStep: 2 })),
    ],
    companions: [{ label: 'Acompañante no cazador', price: 230, per: 'day' }],
    trophies: tr(null, limpopo26),
    fees: [],
    notes: ['Incluye el día de llegada y el de salida (290 € cada uno). Big Five: 700 € al día con un profesional.'],
  },
  'tanzania-especial-bufalos': {
    currency: 'USD', hunters: { min: 2, max: 4 },
    packages: [{ id: 'p', label: '7 días de caza, 2×1, 2 búfalos por cazador', days: 7, price: 28000, includedTrophies: 2, hunterStep: 2 }],
    companions: [{ label: 'Acompañante', price: 300, per: 'day' }],
    trophies: tr(null, [['Facóquero', 1150], ['Impala', 1150], ['Cebra', 2200], ['Hartebeest', 3000]]),
    fees: [],
  },
  'tayikistan-grandes-cochinos': {
    currency: 'EUR', hunters: { min: 1, max: 6 },
    packages: [{ id: 'p', label: '5 días de caza', days: 5, price: 1400 }],
    companions: [{ label: 'Acompañante', price: 100, per: 'day' }],
    trophies: tr('Tasas de abate 2025 (por la navaja más larga)', [['Hembras y machos de menos de 140 mm', 200], ['Machos de 141 a 200 mm', 600], ['Machos de 201 a 240 mm', 800], ['Machos de más de 240 mm', 1200]]),
    fees: [
      { id: 'single', label: 'Un solo cazador', price: 280, per: 'single' },
      { id: 'transfer', label: 'Traslado al área de caza', price: 100, per: 'hunter' },
      { id: 'vip', label: 'Traslado al aeropuerto con sala VIP', price: 90, per: 'hunter', optional: true },
    ],
  },
  'turquia-jabali-caza-mixta': {
    currency: 'EUR', hunters: { min: 4, max: 6 },
    packages: [{ id: 'p', label: 'Por cazador · 5 noches, 4 días, batidas y 3-4 recechos nocturnos (grupo de 4 a 6)', days: 5, price: 2990 }],
    companions: [{ label: 'Acompañante en habitación individual', price: 290, per: 'day' }],
    trophies: tr('Tasas de abate 2026', [['Batida: machos de más de 19 cm', 890], ['Noche: machos de 19,1 a 23,9 cm', 1190], ['Noche: machos de más de 24 cm', 1390]]),
    fees: [
      { id: 'airport', label: 'Tasas de aeropuerto e importación de armas', price: 35, per: 'hunter' },
      { id: 'tusk', label: 'Preparación de colmillos, por jabalí', price: 40, per: 'trophy', optional: true, checked: true },
      { id: 'tips', label: 'Propina a los ojeadores, por cazador (recomendada)', price: 170, per: 'hunter', optional: true, checked: true },
      { id: 'room', label: 'Habitación individual', price: 175, per: 'hunter', optional: true },
    ],
    notes: ['Hembras y machos de hasta 19 cm están incluidos.', 'Habitación individual: 35 € por noche (5 noches).'],
  },
};
