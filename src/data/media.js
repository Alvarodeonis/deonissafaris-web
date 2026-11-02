// Reportajes de fotos y artículos de revistas de la web antigua.
const M = 'https://www.deonissafaris.com/media/images/';
const F = 'https://www.deonissafaris.com/media/files/';

const cap = (t) => ['12.02.48', '12.02.39', '12.01.27', '12.01.17', '12.01.40', '12.01.07', '12.02.18', '12.00.46', '11.59.56', '12.00.27', '12.00.09', '12.00.18', '11.59.45', '12.00.36', '11.59.23', '11.58.40', '11.58.49', '11.59.32', '11.58.31', '12.03.52', '11.58.08', '12.03.07', '11.58.21', '11.57.54', '12.03.40', '12.03.28', '12.02.03', '12.02.59', '12.01.53'].map((h) => `galeria_3_captura%20de%20pantalla%202019-06-26%20a%20las%20${h}.png`);

export const reportajes = [
  { slug: 'botswana', title: 'Botswana', photos: ['photo90.jpg', 'photo93.jpg', 'photo92.jpg', 'photo91.jpg', 'ambose.jpg'].map((f) => M + 'galeria_1_' + f) },
  {
    slug: 'namibia', title: 'Namibia',
    photos: ['captura%20de%20pantalla%202019-02-16%20a%20las%2021.05.07.png', 'p9110110.jpg', '_20180529_140013.jpg', 'leon02.jpg', '1d2d02d2-af05-4438-87c4-a3ca95264e42.jpg', '39c3bcbf-7aa2-41f0-a81f-4050a60fa3ea.jpg', 'unnamed.jpg', 'p9080082.jpg', 'p8013491.jpg', '386072f1-4098-4db0-8994-e35667839b3d.jpg', 'p9070074.jpg', 'dsc_1412.jpg', 'dsc_1407.jpg', 'img_3228.jpg', 'img_3177.jpg', 'img_3192.jpg', 'foto%207-6-18%2017%2012%2020.jpg', 'img_3166.jpg', 'img_7715.jpg', 'foto%206-6-18%2015%2029%2022.jpg', 'foto%207-6-18%2016%2005%2044.jpg', 'photo91.jpg', 'archivo%2019-1-18%2018%2023%2045.jpeg', 'photo92.jpg', 'foto%207-6-18%2016%2030%2059.jpg', 'photo93.jpg', 'unnamed%20%283%29fgfg.jpg', '_20170404_204003.jpg', 'unnamed%20df%283%29.jpg', 'unnamed%20%283%29.jpg', 'img_4265.jpg', 'p9090091.jpg', 'p9100107.jpg', 'p9070077.jpg', 'unnamed%20%281%29.jpg'].map((f) => M + 'galeria_2_' + f),
  },
  { slug: 'turquia', title: 'Turquía', photos: cap().map((f) => M + f) },
];

export const articles = [
  { country: 'España', items: [['El lobo ibérico en espera', 'revistas_2_lobo%20iberico%20en%20espera.pdf'], ['Corzos de antaño', 'revistas_14_evolucion%20de%20la%20caza%20del%20corzo%20en%20espan%CC%83a_compressed.pdf']] },
  { country: 'Bulgaria', items: [['Urogallos', 'revistas_15_urogallo.pdf']] },
  { country: 'Canadá', items: [['Oso negro en Canadá', 'revistas_1_oso%20negro%20en%20quebec.pdf']] },
  { country: 'Irán', items: [['Goraz, el jabalí gigante de Irán', 'revistas_3_goraz%20el%20jabali%20gigante%20de%20iran.pdf'], ['Jabalíes en Irán', 'revistas_4_jabalies%20iran.pdf'], ['Caza de alta montaña en Irán', 'revistas_5_caza%20de%20alta%20montaa%20en%20iran-trofeo%20cm%20enero%202011.pdf', 'Trofeo · enero 2011']] },
  { country: 'Kazajistán', items: [['Ibex en Kazajistán', 'revistas_6_ibex%20kazajistn.pdf'], ['Aullando con lobos', 'revistas_7_aullando%20con%20lobos-trofeo%20cm%20julio%202011.pdf', 'Trofeo · julio 2011']] },
  { country: 'Namibia', items: [['Cebras de montaña en Namibia', 'revistas_8_cebras%20de%20montaa%20en%20namibia-trofeo%20cm%20noviembre%202011.pdf', 'Trofeo · noviembre 2011'], ['Leopardo con perros', 'revistas_9_leopardo%20con%20perros-trofeo%20cm%20noviembre%202009.pdf', 'Trofeo · noviembre 2009']] },
  { country: 'Turquía', items: [['Turquía', 'revistas_12_j_turquia.pdf']] },
  { country: 'Varios', items: [['Recopilación', 'revistas_13_feb2013.pdf', 'Febrero 2013']] },
].map((g) => ({ ...g, items: g.items.map(([title, file, note]) => ({ title, url: F + file, note })) }));
