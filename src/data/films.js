// Todas las películas de la web antigua (y de los programas), agrupadas por país.
const raw = {
  'Caza con arco': [['v1QI4A65U8E', 'Caza con arco por todo el mundo'], ['tltEL4jKqVs', 'Caza con arco en África'], ['aQntnYT1gco', 'Caza con arco en África: plains game'], ['2mQVn1PqGfc', 'Caza con arco en Namibia'], ['z4RNsLdHuNc', 'Eland con arco en Namibia'], ['II2sBb8QkXM', 'Facocheros con arco en Mauritania'], ['lGjRtKMfoTg', 'Caza con arco en Namibia, 2020']],
  'Canadá': [['n7DhtTLz8SQ', 'Oso negro en espera en Quebec']],
  'Groenlandia': [['5FCVca9R_18', 'Buey almizclero en Groenlandia (versión corta)'], ['xLv3UJOYGXY', 'Buey almizclero en Groenlandia, con Iberalia'], ['PIAY-DjTEdY', 'Buey almizclero en Groenlandia, 2.ª parte'], ['Mqvrz7B9iQ4', 'Buey almizclero en Groenlandia, 3.ª parte'], ['yCfNKV85OIo', 'Caribús en Groenlandia'], ['6xCcJP1rqlA', 'Caribús en Narsarsuaq']],
  'Irán': [['2y2X3fdBXZ4', 'Los mejores lances al jabalí de Irán'], ['Iq3D6Q6Pwrw', 'Batidas en Irán: jabalíes de grandes colmillos, 1.ª parte'], ['m3rHip591lU', 'Batidas en Irán: jabalíes de grandes colmillos, 2.ª parte'], ['OPR2gjQMOwk', 'Batidas en Irán: jabalíes de grandes colmillos, 3.ª parte'], ['yByWP-C9dj4', 'Jabalíes gigantes en Irán, batidas con Iberalia'], ['MbuBAXnW5_g', 'Caza nocturna de enormes jabalíes en Irán, 1.ª parte'], ['Hu8VvgDo_Qc', 'Caza nocturna de enormes jabalíes en Irán, 2.ª parte'], ['n6QPztl1qmA', 'Los mejores lances al jabalí persa']],
  'Kazajistán': [['y8ngjbsU9t8', 'Íbex y lobo en Kazajistán, con Iberalia'], ['Vg4V4wLe9Q8', 'Íbex en Kazajistán']],
  'Macedonia': [['2SyKpQBl92k', 'Lobos y jabalíes en batida en Macedonia'], ['k7m59SupStI', 'Lobo en espera en Macedonia']],
  'Mauritania': [['8DXz--w4_SA', 'Caza del facochero en Mauritania']],
  'Mozambique': [['Jk2uAbcHA9Q', 'Leopardo y búfalo en Mozambique']],
  'Namibia': [['YWvBWKpyzg0', 'Antílopes en Namibia, con Iberalia'], ['tVNvHIAH2to', 'Cebras de montaña en Namibia, con Iberalia'], ['DRe-Ww0RTcs', 'Facocheros en Namibia, con Iberalia'], ['bAALKJ5WZO4', 'Caza en Namibia']],
  'Nueva Zelanda': [['Xkj-0xiNInA', 'Grandes ciervos en Nueva Zelanda, con Iberalia'], ['VNkfI5aCRMw', 'Grandes ciervos en berrea'], ['nDaS1yA3V3U', 'Ciervos de récord mundial']],
  'Rumanía': [['rbF0MY_F7Kc', 'Osos pardos en batida y en espera'], ['EsHRQ4nsGh4', 'Batidas de jabalí en Rumanía'], ['LkJqhK9PFFk', 'Corzos en Rumanía']],
  'Rusia': [['VGUfuC1U6is', 'Oso pardo en la osera, lago Baikal'], ['H2gOsdBNVb0', 'Tur de Kubán en el Cáucaso'], ['cAImq2prAhQ', 'Oso en espera en Rusia'], ['iLgrVjxKCpY', 'Alces cerca de Moscú']],
  'Sudáfrica': [['lpdbzRmnjgM', 'Leones en el Kalahari, 2015'], ['gJFsYOK99DI', 'Leones en el Kalahari, 2016'], ['poJsSFtcmrA', 'Leones a la huella en el Kalahari']],
  'Tanzania': [['4eBr23WJLiI', 'Búfalos en Tanzania con Mark Sullivan'], ['9URJRMy8ltA', 'Los mejores lances de Mark Sullivan'], ['5NeJcYdiwoo', 'Búfalos a la huella en Tanzania']],
  'Tayikistán': [['c-5-XgYuBAQ', 'Caza nocturna de grandes jabalíes en Tayikistán']],
  'Turquía': [['ax3Pwr3RKo4', 'Batidas de cochinos en los montes de Kalkım, 1.ª parte'], ['L1RVJY1qwRo', 'Batidas de jabalí con Iberalia, 2.ª parte'], ['4m0iVlq4L3M', 'Territorio Keiler: batidas con Iberalia'], ['E8NKrpsEOj4', 'Jabalíes y pesca de atunes en Turquía'], ['V44nUOTQ6UI', 'Jabalí gigante de 34 centímetros en Turquía']],
  'Varios': [['e6hzeb_t8pc', 'Osos y jabalíes, de Siberia a Canadá'], ['ozKyH4kOL2g', 'Entrevista a Mark Sullivan']],
};
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '-');
// Orden de Álvaro (2026-11-11): primero Irán, Turquía, Namibia, Kazajistán y caza con arco; Canadá al final (Bolivia, que era de pesca, quitada).
const FIRST = ['Irán', 'Turquía', 'Namibia', 'Kazajistán', 'Caza con arco'];
const LAST = ['Varios', 'Canadá'];
const rank = (n) => (FIRST.includes(n) ? FIRST.indexOf(n) - 100 : LAST.includes(n) ? 100 + LAST.indexOf(n) : 0);
export const filmGroups = Object.entries(raw).sort(([a], [b]) => rank(a) - rank(b)).map(([name, list]) => ({ name, slug: slug(name), films: list.map(([id, title]) => ({ id, title })) }));
export const allFilms = filmGroups.flatMap((g) => g.films.map((f) => ({ ...f, group: g.slug, groupName: g.name })));
// Recomendadas: arriba del todo.
export const featuredFilms = ['Jk2uAbcHA9Q', 'v1QI4A65U8E', 'nDaS1yA3V3U', 'poJsSFtcmrA', 'VGUfuC1U6is'].map((id) => allFilms.find((f) => f.id === id));
