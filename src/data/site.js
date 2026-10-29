// Datos generales del sitio: contacto, equipo, vídeos y categorías.
const IMG = 'https://www.deonissafaris.com';

export const contact = {
  phone: '+34 915 152 606',
  email: 'info@deonissafaris.com',
  address: 'Calle Doctor Velázquez 10, Pozuelo de Alarcón (Madrid)',
  // Número que recibe los presupuestos del simulador por WhatsApp.
  whatsapp: '34647686891',
  offices: [
    { city: 'Madrid · Oficina central', phone: '+34 915 152 606', email: 'info@deonissafaris.com' },
    { city: 'Valencia', phone: '+34 630 020 770', email: 'tatay@deonissafaris.com' },
    { city: 'Asturias', phone: '+34 670 925 601', email: 'crespo@deonissafaris.com' },
  ],
  social: {
    youtube: 'https://www.youtube.com/user/DeOnisSafaris',
    instagram: 'https://www.instagram.com/deonissafaris/',
    facebook: 'https://www.facebook.com/deOnissafaris/',
  },
};

export const team = [
  { name: 'Arturo de Onís', role: 'Fundador · 40 años de caza internacional', langs: 'EN · IT', photo: `${IMG}/assets/images/arturo.jpg`, phone: '+34 629 110 612', email: 'arturo@deonissafaris.com' },
  { name: 'Álvaro de Onís', role: 'Caza con arco, espera y rececho', langs: 'EN', photo: `${IMG}/assets/images/alvaro.jpg`, phone: '+34 647 686 891', email: 'alvaro@deonissafaris.com' },
  { name: 'Alfonso Ginés', role: 'Guía de grupos · experto en rifle', langs: 'EN', photo: `${IMG}/assets/images/gines.jpg` },
  { name: 'Andrés Tatay', role: 'Especialista en África', langs: 'EN · FR', photo: `${IMG}/assets/images/andres.jpg` },
  { name: 'José Ignacio Crespo', role: 'Caza mayor en cuatro continentes', langs: 'ES', photo: `${IMG}/assets/images/crespo.jpg` },
  { name: 'Oscar Maldonado', role: 'Caza de alta montaña', langs: 'EN', photo: `${IMG}/assets/images/maldonado.jpg` },
  { name: 'Pachi Bourgon', role: 'Alta montaña y África', langs: 'EN · FR', photo: `${IMG}/assets/images/pachi.jpg` },
];

// El primero es el vídeo de fondo de la portada.
export const videos = [
  { id: 'zX_mf9Fz-7M', title: 'Lances de caza · de Onís Safaris' },
  { id: 'Jk2uAbcHA9Q', title: 'Búfalos en Mozambique', start: 20 },
  { id: 'aQntnYT1gco', title: 'Caza con arco en África' },
  { id: '6xCcJP1rqlA', title: 'Caribús en Groenlandia' },
  { id: '2SyKpQBl92k', title: 'Lobos en Macedonia' },
  { id: 'ax3Pwr3RKo4', title: 'Batidas de jabalí en Turquía' },
  { id: 'PIAY-DjTEdY', title: 'Buey almizclero en Groenlandia' },
];

export const categories = [
  { slug: 'caza-en-africa', name: 'África', title: 'Caza en África', tagline: 'Big Five, plains game y búfalo en Mozambique, Namibia y Sudáfrica.' },
  { slug: 'caza-en-asia', name: 'Asia', title: 'Caza en Asia', tagline: 'Íbice en las montañas de Kazajistán y batidas de jabalí en Turquía.' },
  { slug: 'caza-en-europa', name: 'Europa', title: 'Caza en Europa', tagline: 'Lobo y jabalí en batida en las montañas de Macedonia.' },
  { slug: 'caza-en-america', name: 'América', title: 'Caza en América', tagline: 'Caribú y buey almizclero en Groenlandia.' },
  { slug: 'caza-en-oceania', name: 'Oceanía', title: 'Caza en Oceanía', tagline: 'Banteng y búfalo de agua en la Tierra de Arnhem, Australia.' },
  { slug: 'caza-con-arco', name: 'Arco', title: 'Caza con arco', tagline: 'Fincas dedicadas solo al arco, en espera y rececho.' },
];
