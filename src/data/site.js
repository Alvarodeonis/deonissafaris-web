// Datos generales del sitio: contacto, equipo, vídeos y categorías.
const IMG = 'https://www.deonissafaris.com';

export const contact = {
  phone: '+34 915 152 606',
  // Teléfono que se muestra en el pie: el móvil de Arturo.
  mobile: '+34 629 110 612',
  // Caza con arco: Álvaro.
  bowPhone: '+34 647 686 891',
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
  { id: 'zX_mf9Fz-7M', title: 'Lances de caza · de Onís Safaris', start: 15 },
  { id: 'Jk2uAbcHA9Q', title: 'Búfalos en Mozambique', start: 20 },
  { id: 'aQntnYT1gco', title: 'Caza con arco en África' },
  { id: '6xCcJP1rqlA', title: 'Caribús en Groenlandia' },
  { id: '2SyKpQBl92k', title: 'Lobos en Macedonia' },
  { id: 'ax3Pwr3RKo4', title: 'Batidas de jabalí en Turquía' },
  { id: 'PIAY-DjTEdY', title: 'Buey almizclero en Groenlandia' },
];

export const categories = [
  { slug: 'caza-en-africa', emoji: '🌍', name: 'África', title: 'Caza en África', tagline: 'Big Five, búfalo, leopardo y plains game en once países africanos.' },
  { slug: 'caza-en-asia', emoji: '🌏', name: 'Asia', title: 'Caza en Asia', tagline: 'Marco Polo, íbex, osos de Siberia y grandes jabalíes en ocho países.' },
  { slug: 'caza-en-europa', emoji: '🌍', name: 'Europa', title: 'Caza en Europa', tagline: 'Osos de los Cárpatos, rebecos, corzos a peso, muskox de Groenlandia y grandes trofeos de España.' },
  { slug: 'caza-en-america', emoji: '🌎', name: 'América', title: 'Caza en América', tagline: 'Alce y grizzly del Yukón, osos de Quebec, felinos de British Columbia, ciervo colorado en Argentina y Kodiak en Alaska.' },
  { slug: 'caza-en-oceania', emoji: '🌏', name: 'Oceanía', title: 'Caza en Oceanía', tagline: 'Ciervos gigantes, tahr y rebeco en Nueva Zelanda; banteng y búfalo de agua en Australia.' },
  { slug: 'caza-con-arco', emoji: '🏹', name: 'Arco', title: 'Caza con arco', tagline: 'Arco en África, España, Norteamérica, Groenlandia, Nueva Zelanda y Turquía.' },
];

// Otros viajes (fuera del menú de caza; se enlazan desde el pie de página).
export const extraCategories = [
  { slug: 'pesca', name: 'Pesca', title: 'Viajes de pesca', place: 'Pesca en', unit: 'pescador', verb: 'Así se pesca aquí', tagline: 'Marlín en Mozambique y Cabo Verde, atún rojo en Cádiz, salmón en Islandia, truchas en Finlandia y Eslovenia, arctic char en Groenlandia y la Amazonía boliviana.' },
  { slug: 'safaris-fotograficos', name: 'Safaris fotográficos', title: 'Safaris fotográficos', place: 'Safari fotográfico en', unit: 'persona', verb: 'Vídeo', tagline: 'Safaris fotográficos a medida en Namibia, Sudáfrica, Mozambique y Tanzania, con amigos o en familia.' },
];
export const allCategories = [...categories, ...extraCategories];
export const isHunting = (slug) => categories.some((c) => c.slug === slug);
