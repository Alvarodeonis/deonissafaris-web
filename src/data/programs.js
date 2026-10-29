// Programas de caza. Cada programa vive en categoría → país → programa.
//
// `simulator` alimenta el simulador de presupuesto de la ficha:
//   packages:   opciones de paquete. `price` por cazador, o `tiers` por tamaño de grupo.
//   hunters:    { min, max } cazadores permitidos.
//   companions: opciones de acompañante, con `per: 'day'` (días del paquete) o `per: 'trip'`.
//   trophies:   animales adicionales (tasa de abate). `minDays` y `cites` son opcionales.
//   fees:       costes que se suman según `per`:
//                 hunter | group | trophy (cada trofeo, incluidos los del paquete) | cites | single (solo si va 1 cazador)
//               `optional: true` los convierte en casillas; `checked` marca la casilla por defecto.
const M = 'https://www.deonissafaris.com/media/images/';

export const programs = [
  {
    slug: 'mozambique-bufalos-pack-7-y-10-dias',
    category: 'caza-en-africa', country: 'mozambique', countryName: 'Mozambique',
    title: 'Búfalos Pack 7 y 10 días',
    summary: 'Búfalo cafre en la Coutada 10 de Marromeu, una de las zonas clásicas del delta del Zambeze, con opción de añadir plains game y leopardo.',
    season: '1 mayo – 30 noviembre', duration: '7 o 10 días', area: 'Coutada 10, Marromeu',
    lodging: 'Dos campamentos de cabañas de madera, nuevos y con todos los servicios',
    hero: `${M}proyectos_43_mozambique_7-10-dias.jpg`,
    gallery: ['proyectos_43_img-20190713-wa0021.jpg', 'proyectos_43_dscf3056.jpg', 'proyectos_43_img-20190713-wa0022.jpg', 'proyectos_43_img_0012.jpg', 'proyectos_43_dscf3066.jpg', 'proyectos_43_img-20180918-wa0011.jpg'].map((f) => M + f),
    video: 'Jk2uAbcHA9Q',
    featured: true,
    includes: ['Licencia de caza', 'Permiso de importación de un rifle', 'Tasas comunitarias', 'Permiso general de exportación y de un búfalo', 'Cazador profesional con vehículo y equipo', 'Pensión completa', 'Preparación del primer trofeo'],
    excludes: ['Vuelos internacionales, domésticos y chárter', 'Tasas de abate de otros animales (los heridos no cobrados se cobran como abatidos)', 'Envío de trofeos al país de destino', 'Hoteles antes o después de la cacería', 'Propinas y gastos personales'],
    simulator: {
      currency: 'USD',
      hunters: { min: 1, max: 6 },
      packages: [
        { id: '7d-1x1', label: '7 días · 1 búfalo · 1×1', days: 7, price: 15250, includedTrophies: 1 },
        { id: '10d-1x1', label: '10 días · 1 búfalo · 1×1', days: 10, price: 17500, includedTrophies: 1 },
        { id: '10d-2x1', label: '10 días · 1 búfalo · 2×1', days: 10, price: 16100, includedTrophies: 1, hunterStep: 2, feeOverrides: { maputo: 375 } },
      ],
      companions: [{ label: 'Acompañante no cazador', price: 420, per: 'day' }],
      trophies: [
        { name: 'Segundo búfalo', price: 7800 },
        { name: 'Sable', price: 7600, minDays: 10 },
        { name: 'Hipopótamo', price: 7500, minDays: 10, cites: true },
        { name: 'Eland', price: 5000, minDays: 10 },
        { name: 'Nyala', price: 4500, minDays: 10 },
        { name: 'Cebra de Selous', price: 3000, minDays: 10 },
        { name: 'Hartebeest', price: 2700, minDays: 10 },
        { name: 'Waterbuck', price: 2500, minDays: 10 },
        { name: 'Cocodrilo', price: 4000, cites: true },
        { name: 'Oribi', price: 2000 },
        { name: 'Duiker azul', price: 2000 },
        { name: 'Duiker rojo', price: 1800 },
        { name: 'Suni', price: 1800 },
        { name: 'Bushbuck', price: 1700 },
        { name: 'Reedbuck', price: 1400 },
        { name: 'Potamóquero', price: 1400 },
        { name: 'Facóquero', price: 1100 },
        { name: 'Duiker gris', price: 950 },
        { name: 'Impala', price: 850 },
        { name: 'Babuino', price: 400 },
      ],
      fees: [
        { id: 'vet', label: 'Certificado veterinario', price: 150, per: 'trophy' },
        { id: 'cites', label: 'Permiso CITES', price: 330, per: 'cites' },
        { id: 'maputo', label: 'Transporte de trofeos a Maputo', price: 750, per: 'hunter' },
        { id: 'rifle2', label: 'Importación de un segundo rifle', price: 500, per: 'hunter', optional: true },
        { id: 'charter', label: 'Chárter Beira – campamento (Cessna 206, 3-4 pax, total grupo)', price: 3000, per: 'group', optional: true },
      ],
      notes: ['Leopardo, elefante y hiena requieren 14 días: consúltanos.', 'IVA del 17 % incluido en las tarifas diarias.'],
    },
  },
  {
    slug: 'namibia-paquete-windhoek',
    category: 'caza-en-africa', country: 'namibia', countryName: 'Namibia',
    title: 'Paquete Windhoek',
    summary: 'Seis días de plains game 1×1 en 80.000 hectáreas de fincas abiertas, a 40 km del aeropuerto de Windhoek. Ideal para ir en familia y combinar con turismo en la costa o los parques.',
    season: 'Febrero – noviembre', duration: '6 días', area: 'Windhoek, a 40 km del aeropuerto',
    lodging: 'Lodge de lujo a 30 minutos del aeropuerto',
    hero: `${M}proyectos_52_img-20190521-wa0042.jpg`,
    gallery: ['proyectos_52_img-20141015-wa0002%20%28copiar%29.jpg', 'proyectos_52_img-20150826-wa0000.jpg', 'proyectos_52_img-20160623-wa0009.jpg', 'proyectos_52_img-20141016-wa0005%20-%20copia.jpg'].map((f) => M + f),
    featured: true,
    includes: ['Traslados aeropuerto', 'Lodge de lujo en pensión completa', 'Bebidas alcohólicas en cantidad razonable', 'Lavandería diaria', 'Cazador profesional y vehículo', 'Licencia de caza', 'Preparación del primer trofeo'],
    excludes: ['Vuelos', 'Animales adicionales abatidos o heridos', 'Permisos de importación y exportación de armas', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 8 },
      packages: [
        { id: 'w1', label: 'Windhoek 1 · órix, hartebeest, impala, steenbuck, facóquero, babuino y chacal', days: 6, price: 3200, includedTrophies: 7 },
        { id: 'w2', label: 'Windhoek 2 · kudu, órix, hartebeest, facóquero, steenbuck, babuino y chacal', days: 6, price: 4200, includedTrophies: 7 },
      ],
      companions: [{ label: 'Acompañante no cazador', price: 750, per: 'trip' }],
      trophies: [
        { name: 'Kudu', price: 1950 }, { name: 'Eland', price: 2200 }, { name: 'Waterbuck', price: 1800 },
        { name: 'Sable (menos de 40")', price: 4500 }, { name: 'Sable (más de 40")', price: 5800 },
        { name: 'Lechwe', price: 3500 }, { name: 'Nyala', price: 2500 }, { name: 'Ñu dorado', price: 2500 },
        { name: 'Órix dorado', price: 1500 }, { name: 'Ñu negro', price: 1200 }, { name: 'Ñu azul', price: 1000 },
        { name: 'Cebra de montaña', price: 1100 }, { name: 'Cebra común', price: 900 }, { name: 'Hartebeest rojo', price: 700 },
        { name: 'Blesbuck', price: 600 }, { name: 'Impala', price: 600 }, { name: 'Órix', price: 500 },
        { name: 'Facóquero', price: 390 }, { name: 'Springbuck', price: 350 }, { name: 'Duiker', price: 250 }, { name: 'Steenbok', price: 250 },
      ],
      fees: [
        { id: 'kalahari1', label: 'Extensión Kalahari 1 (2 días, 2 springbuck y 1 blesbuck)', price: 950, per: 'hunter', optional: true },
        { id: 'kalahari2', label: 'Extensión Kalahari 2 (1 día, 2 springbok)', price: 550, per: 'hunter', optional: true },
        { id: 'zebra', label: 'Extensión cebra de montaña (Khomas Hochland, 1 día)', price: 1100, per: 'hunter', optional: true },
        { id: 'rifle', label: 'Alquiler de rifle y munición (6 días)', price: 200, per: 'hunter', optional: true },
        { id: 'tips', label: 'Propinas recomendadas', price: 400, per: 'hunter', optional: true, checked: true },
      ],
      notes: ['Si no se abate algún animal del paquete se devuelve su importe (kudu 975 €, órix 250 €, hartebeest 350 €, impala 300 €).'],
    },
  },
  {
    slug: 'sudafrica-limpopo-paquetes-en-lodge-de-lujo',
    category: 'caza-en-africa', country: 'sudafrica', countryName: 'Sudáfrica',
    title: 'Limpopo · paquetes en lodge de lujo',
    summary: 'Fincas privadas en Limpopo junto al Parque Kruger, con 30.000 hectáreas en la finca principal y unas 34 especies posibles. Excursiones a Kruger o en helicóptero opcionales.',
    season: 'Temporada 2026', duration: '4 días de caza (6 en total)', area: 'Limpopo, junto al Parque Kruger',
    lodging: 'Lodge de lujo en pensión completa',
    hero: `${M}proyectos_62_img_3228.jpg`,
    gallery: ['proyectos_62_img_3192.jpg', 'proyectos_62_img_7715.jpg', 'proyectos_62_foto%206-6-18%2015%2029%2022.jpg'].map((f) => M + f),
    includes: ['Lodge de lujo en pensión completa', 'Cazador profesional y vehículo'],
    excludes: ['Vuelos', 'Animales fuera del paquete'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 8 },
      packages: [
        { id: 'p1', label: 'Nº 1 · ñu azul, impala y blesbuck', days: 6, price: 3700, includedTrophies: 3 },
        { id: 'p2', label: 'Nº 2 · búfalo hasta 38"', days: 6, price: 9900, includedTrophies: 1 },
        { id: 'p3', label: 'Nº 3 · blesbuck, ñu o cebra, impala y facóquero', days: 6, price: 4200, includedTrophies: 4 },
        { id: 'p4', label: 'Nº 4 · blesbuck, impala, facóquero y duiker gris', days: 6, price: 3500, includedTrophies: 4 },
      ],
      companions: [{ label: 'Acompañante no cazador', price: 230, per: 'day' }],
      trophies: [
        { name: 'Kudu', price: 3900 }, { name: 'Nyala', price: 2700 }, { name: 'Órix', price: 2300 }, { name: 'Sable', price: 5700 },
        { name: 'Eland', price: 5450 }, { name: 'Waterbuck', price: 2850 }, { name: 'Jirafa', price: 2950 }, { name: 'Hartebeest rojo', price: 2100 },
        { name: 'Tsessebe', price: 2100 }, { name: 'Bushbuck', price: 1400 }, { name: 'Ñu azul', price: 1300 }, { name: 'Ñu negro', price: 1300 },
        { name: 'Cebra', price: 1300 }, { name: 'Springbuck', price: 740 }, { name: 'Facóquero 8" o más', price: 700 }, { name: 'Facóquero', price: 550 },
        { name: 'Blesbuck', price: 500 }, { name: 'Duiker gris', price: 490 }, { name: 'Impala', price: 450 },
      ],
      fees: [
        { id: 'rifle', label: 'Alquiler de rifle (6 días)', price: 480, per: 'hunter', optional: true },
      ],
      notes: ['Los paquetes no se pueden modificar; los animales adicionales se pagan por tasa de abate.'],
    },
  },
  {
    slug: 'kazakhstan-ibex-zonas-premium',
    category: 'caza-en-asia', country: 'kazakhstan', countryName: 'Kazajistán',
    title: 'Íbice · zonas premium',
    summary: 'Nueve días para el íbice siberiano en Dzungarian Alatau, Narynkol y Kegen: rececho a pie, a caballo y desde campamentos volantes, en grupos de 1 a 6 cazadores.',
    season: '1 agosto – 15 noviembre', duration: '9 días (7 de caza)', area: 'Dzungarian Alatau, Narynkol y Kegen',
    lodging: 'Yurtas, caravanas y campamentos volantes',
    hero: `${M}proyectos_85_kazakhstan-ibex.jpg`,
    gallery: ['proyectos_85_img_1253.jpg', 'proyectos_85_dsc_0206.jpg', 'proyectos_85_dsc_0042.jpg', 'proyectos_85_pb020871.jpg', 'proyectos_85_dsc01123.jpg', 'proyectos_85_compo1.jpg'].map((f) => M + f),
    featured: true,
    includes: ['Guía experimentado', 'Pensión completa en el campamento', 'Guía intérprete', 'Transporte a la zona y durante la caza'],
    excludes: ['Vuelos', 'Hoteles y comidas en Almaty', 'Bebidas alcohólicas o con gas', 'Envío DHL de trofeos', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 6 },
      packages: [{ id: 'ibex', label: 'Cacería de íbice desde Almaty', days: 9, price: 3600 }],
      companions: [{ label: 'Acompañante (incluye documentación)', price: 2900, per: 'trip' }],
      trophies: [
        { name: 'Íbice hasta 110 cm', price: 3500 },
        { name: 'Íbice 110–120 cm', price: 4000 },
        { name: 'Íbice 120–125 cm', price: 4500 },
        { name: 'Íbice 125–130 cm', price: 5000 },
        { name: 'Íbice 130–135 cm', price: 5500 },
        { name: 'Íbice más de 135 cm', price: 7500 },
        { name: 'Corzo siberiano', price: 2200 },
        { name: 'Jabalí', price: 1500 },
        { name: 'Lobo', price: 1500 },
      ],
      defaultTrophies: { 'Íbice 110–120 cm': 1 },
      fees: [
        { id: 'docs', label: 'Documentación (invitación, recepción, transporte y permiso de un rifle)', price: 350, per: 'hunter' },
        { id: 'single', label: 'Suplemento cazador individual', price: 800, per: 'single' },
        { id: 'vet', label: 'Certificado veterinario', price: 300, per: 'hunter', optional: true, checked: true },
        { id: 'cites', label: 'Certificado CITES', price: 700, per: 'hunter', optional: true },
      ],
      notes: ['Elige el tamaño de íbice que esperas: la tasa se paga según la medida real.', 'Día extra de caza: 290 US$; día extra de acompañante: 230 US$.'],
    },
  },
  {
    slug: 'turquia-batidas-jabali-caza-en-reservas',
    category: 'caza-en-asia', country: 'turquia', countryName: 'Turquía',
    title: 'Batidas de jabalí en reservas',
    summary: 'Batidas de jabalí en concesiones de montaña con guías locales que cuidan sus zonas todo el año. Grupos de 8 a 14 cazadores con ojeadores.',
    season: '15 octubre – 15 febrero', duration: '4 días de caza (5 noches)', area: 'Concesiones de montaña',
    lodging: 'Hotel de 4 estrellas o pabellón de caza',
    hero: `${M}proyectos_166_img-20200131-wa0037.jpg`,
    gallery: ['proyectos_166_img-20230114-wa0026.jpg', 'proyectos_166_img-20220219-wa0046.jpg', 'proyectos_166_img-20200201-wa0050.jpg', 'proyectos_166_img-20191027-wa0006.jpg'].map((f) => M + f),
    video: 'ax3Pwr3RKo4',
    featured: true,
    includes: ['Organización de las batidas con ojeadores', 'Alojamiento'],
    excludes: ['Vuelos', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 8, max: 14 },
      packages: [{ id: 'batidas', label: 'Batidas 4 días · 5 noches', days: 5, tiers: [{ min: 8, max: 8, price: 4390 }, { min: 9, max: 9, price: 4190 }, { min: 10, max: 14, price: 3790 }] }],
      companions: [
        { label: 'Acompañante en habitación compartida', price: 890, per: 'trip' },
        { label: 'Acompañante en habitación individual', price: 1390, per: 'trip' },
      ],
      trophies: [
        { name: 'Macho de 20 a 23,9 cm', price: 390 },
        { name: 'Macho de 24 cm o más', price: 690 },
        { name: 'Macho en rececho nocturno (más de 19 cm)', price: 1090 },
      ],
      fees: [
        { id: 'docs', label: 'Documentación de caza', price: 80, per: 'hunter' },
        { id: 'arms', label: 'Importación de rifle', price: 30, per: 'hunter' },
        { id: 'tips', label: 'Propinas recomendadas para ojeadores', price: 170, per: 'hunter', optional: true, checked: true },
        { id: 'east', label: 'Suplemento nuevas zonas del este', price: 200, per: 'hunter', optional: true },
      ],
      notes: ['Hembras y machos hasta 19,9 cm, gratis.', 'El precio por cazador baja según el tamaño del grupo: 8 cazadores 4.390 €, 9 cazadores 4.190 €, 10 a 14 cazadores 3.790 €.'],
    },
  },
  {
    slug: 'turquia-jabali-vip-caza-nocturna',
    category: 'caza-en-asia', country: 'turquia', countryName: 'Turquía',
    title: 'Jabalí VIP · caza nocturna',
    summary: 'Rececho y espera nocturna en cebaderos de 8 reservas, 7 de ellas exclusivas, con 120 cámaras de control. Media de colmillo superior a 23 cm en las últimas temporadas.',
    season: 'Todo el año (mejor marzo – septiembre)', duration: '7 días · 5 noches de caza', area: '8 reservas en Turquía',
    lodging: 'Hotel de 4 estrellas o casa de caza',
    hero: `${M}proyectos_98_img-20210915-wa0098.jpg`,
    gallery: ['proyectos_98_20210619_131306.jpg', 'proyectos_98_img-20190116-wa0047.jpg', 'proyectos_98_img-20211208-wa0054.jpg', 'proyectos_98_20200127_095229.jpg'].map((f) => M + f),
    video: 'E8NKrpsEOj4',
    includes: [], excludes: [],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 4 },
      packages: [
        { id: '1x1', label: '1×1 · un guía por cazador', days: 7, price: 1750 },
        { id: '2x1', label: '2×1 · dos cazadores por guía', days: 7, price: 1450, hunterStep: 2 },
      ],
      companions: [
        { label: 'Acompañante en habitación compartida', price: 600, per: 'trip' },
        { label: 'Acompañante en habitación individual', price: 900, per: 'trip' },
      ],
      trophies: [
        { name: 'Macho de 20 a 24 cm', price: 1190 },
        { name: 'Macho de más de 24 cm', price: 1490 },
      ],
      fees: [
        { id: 'docs', label: 'Documentación de caza', price: 80, per: 'hunter' },
        { id: 'arms', label: 'Importación de armas', price: 40, per: 'hunter' },
        { id: 'tips', label: 'Propinas (60 € por jabalí)', price: 60, per: 'trophy', optional: true, checked: true },
        { id: 'tusks', label: 'Preparación de colmillos', price: 60, per: 'trophy', optional: true },
      ],
      notes: ['Machos de menos de 20 cm y hembras, gratis.', 'Con 6 o más jabalíes por cazador en 1×1 (4 o más en 2×1) la cuota de caza baja a 750 €.'],
    },
  },
  {
    slug: 'macedonia-lobo-y-jabali-en-batida',
    category: 'caza-en-europa', country: 'macedonia', countryName: 'Macedonia',
    title: 'Lobo y jabalí en batida',
    summary: 'Batidas de lobo y jabalí con perros y ojeadores en una finca privada de montaña en el centro de Macedonia. Traslados desde Skopje e intérprete incluidos.',
    season: 'Noviembre – enero', duration: '3 días de caza (4 noches)', area: 'Centro de Macedonia',
    lodging: 'Hotel Gardenia, pensión completa',
    hero: `${M}proyectos_144_dsc00932.jpg`,
    gallery: ['proyectos_144_img-20210220-wa0004.jpg', 'proyectos_144_img-20210220-wa0006.jpg', 'proyectos_144_dsc00882.jpg', 'proyectos_144_macedonia-lobo-batida.jpg'].map((f) => M + f),
    video: '2SyKpQBl92k',
    tag: 'Nuevo',
    includes: ['Traslados desde el aeropuerto de Skopje', 'Intérprete', '4 noches en pensión completa', '3 días de batida con perros y ojeadores'],
    excludes: ['Vuelos', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 12 },
      packages: [{ id: 'mk', label: 'Batida 3 días · 4 noches', days: 4, price: 2690 }],
      companions: [],
      trophies: [
        { name: 'Lobo en batida (incluye CITES 350 €)', price: 1950 },
        { name: 'Lobo en espera (incluye CITES 350 €)', price: 2850 },
      ],
      fees: [
        { id: 'arms', label: 'Importación de rifle (en el aeropuerto)', price: 25, per: 'hunter' },
      ],
      notes: ['Todos los jabalíes abatidos están incluidos.'],
    },
  },
  {
    slug: 'groenlandia-caribous',
    category: 'caza-en-america', country: 'groenlandia', countryName: 'Groenlandia',
    title: 'Caribú en Narsarsuaq',
    summary: 'Caribú en la zona de Narsarsuaq desde un campamento de cabañas compartidas en pensión completa, con opción de combinar con buey almizclero.',
    season: 'Agosto – septiembre (mejor del 24/8 al 30/9)', duration: '3 a 6 días', area: 'Narsarsuaq',
    lodging: 'Campamento de cabañas compartidas, pensión completa',
    hero: `${M}proyectos_121_groenlandia-caribous.jpg`,
    gallery: ['proyectos_121_img-20180828-wa0094.jpg', 'proyectos_121_img-20180828-wa0105.jpg', 'proyectos_121_img-20180828-wa0107.jpg', 'proyectos_121_img-20180828-wa0093.jpg'].map((f) => M + f),
    video: '6xCcJP1rqlA',
    tag: 'Nuevo',
    featured: true,
    includes: ['Un caribú macho trofeo', 'Campamento en pensión completa'],
    excludes: ['Vuelos', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 6 },
      packages: [
        { id: 'caribou', label: '1 caribú trofeo', days: 6, price: 11900 },
        { id: 'combo', label: 'Combinado caribú + buey almizclero', days: 6, price: 20900 },
      ],
      companions: [{ label: 'Acompañante no cazador', price: 5900, per: 'trip' }],
      trophies: [],
      fees: [
        { id: 'rifle', label: 'Alquiler de rifle (4 días)', price: 220, per: 'hunter', optional: true },
      ],
      notes: ['Porcentaje de éxito del 99 %.'],
    },
  },
  {
    slug: 'australia-caza-de-banteng-y-bufalo-de-agua',
    category: 'caza-en-oceania', country: 'australia', countryName: 'Australia',
    title: 'Banteng y búfalo de agua',
    summary: 'Dos cacerías remotas en la Tierra de Arnhem, en el norte de Australia: búfalo de agua en 5 días y banteng en 4, desde campamentos de tiendas.',
    season: 'Junio – agosto', duration: '4 a 7 días', area: 'Tierra de Arnhem',
    lodging: 'Campamento de tiendas',
    hero: `${M}proyectos_147_australia.jpg`,
    gallery: [],
    tag: 'Nuevo',
    includes: ['Guía', 'Campamento', 'Una tasa de abate'],
    excludes: ['Vuelos', 'Preparación y envío de trofeos'],
    simulator: {
      currency: 'USD',
      hunters: { min: 1, max: 2 },
      packages: [
        { id: 'buffalo', label: 'Búfalo de agua · 5 días de caza', days: 7, includedTrophies: 1, tiers: [{ min: 1, max: 1, price: 14500 }, { min: 2, max: 2, price: 9900 }] },
        { id: 'banteng', label: 'Banteng · 4 días', days: 5, includedTrophies: 1, tiers: [{ min: 1, max: 1, price: 18500 }, { min: 2, max: 2, price: 15500 }] },
      ],
      companions: [{ label: 'Observador', price: 200, per: 'day' }],
      trophies: [
        { name: 'Búfalo de agua adicional', price: 3500 },
        { name: 'Búfalo de gestión / toro dugga', price: 2200 },
        { name: 'Toro salvaje (scrub bull)', price: 1500 },
        { name: 'Segundo toro de banteng', price: 12500 },
      ],
      fees: [
        { id: 'prep', label: 'Preparación del trofeo (cabeza con capa)', price: 400, per: 'trophy', optional: true, checked: true },
      ],
      notes: ['Con 2 cazadores por guía el precio por persona baja.', 'Avioneta desde Darwin obligatoria, aparte: consúltanos.'],
    },
  },
  {
    slug: 'namibia-caza-con-arco-africa',
    category: 'caza-con-arco', country: 'namibia', countryName: 'Namibia',
    title: 'Caza con arco en Namibia',
    summary: 'Seis días de arco en dos fincas privadas dedicadas solo a la caza con arco, con lodge, cazador profesional y vehículo. Se puede combinar con turismo.',
    season: 'Mayo – octubre (mejor septiembre)', duration: '6 días', area: 'Dos fincas privadas solo para arco',
    lodging: 'Lodge',
    hero: `${M}proyectos_150_namibia.jpg`,
    gallery: ['proyectos_150_facochero%20alvaro%20namibia.jpg', 'proyectos_150_img_3222.jpg'].map((f) => M + f),
    video: 'aQntnYT1gco',
    featured: true,
    includes: ['Lodge', 'Cazador profesional y vehículo', 'Un facóquero y dos animales a elegir entre órix, hartebeest rojo o ñu azul', 'Chacal, pintada y babuino gratis'],
    excludes: ['Vuelos', 'Animales adicionales', 'Gastos personales'],
    simulator: {
      currency: 'EUR',
      hunters: { min: 1, max: 6 },
      packages: [{ id: 'arco', label: '6 días · facóquero + 2 animales', days: 6, price: 2700, includedTrophies: 3 }],
      companions: [{ label: 'Acompañante no cazador', price: 750, per: 'trip' }],
      trophies: [
        { name: 'Kudu', price: 1950 }, { name: 'Eland', price: 1800 }, { name: 'Waterbuck', price: 1800 }, { name: 'Ñu negro', price: 1200 },
        { name: 'Ñu azul', price: 1200 }, { name: 'Hartebeest rojo macho', price: 700 }, { name: 'Impala', price: 600 }, { name: 'Órix', price: 500 }, { name: 'Facóquero', price: 390 },
      ],
      fees: [
        { id: 'tips', label: 'Propinas (50 € / día)', price: 300, per: 'hunter', optional: true, checked: true },
      ],
      notes: ['Chacales, gallinas de guinea y babuinos gratis.', 'Vuelos aparte, aproximadamente 700 €.'],
    },
  },
];

export const countries = (category) => {
  const map = new Map();
  for (const p of programs.filter((p) => p.category === category)) {
    if (!map.has(p.country)) map.set(p.country, { slug: p.country, name: p.countryName, hero: p.hero, programs: [] });
    map.get(p.country).programs.push(p);
  }
  return [...map.values()];
};

export const programUrl = (p) => `${p.category}/${p.country}/${p.slug}`;

export const fromPrice = (p) => {
  const s = p.simulator;
  if (!s) return null;
  const prices = s.packages.flatMap((k) => (k.tiers ? k.tiers.map((t) => t.price) : [k.price]));
  return { amount: Math.min(...prices), currency: s.currency };
};

export const money = (n, c) => {
  const v = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return c === 'USD' ? `US$ ${v}` : `${v} €`;
};
