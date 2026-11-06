// Textos SEO por URL (clave = ruta sin barra inicial ni final).
// intro: párrafo corto bajo el título. sections: guía al final de la página.
// faq: preguntas frecuentes (se publican también como FAQPage en JSON-LD).
// Enlaces internos con formato [texto](ruta/relativa).
export const seoTexts = {
  'caza-en-africa': {
    intro: 'Organizamos safaris de caza en África desde hace más de 30 años: Big Five, búfalo cafre, leopardo, león y el mejor plains game en once países, con outfitters que conocemos personalmente y en cazaderos donde nuestro propio equipo ya ha cazado.',
    heading: 'Guía para su safari de caza en África',
    sections: [
      {
        h: 'Dónde cazar en África según la especie',
        p: [
          'Cada país tiene su especialidad. [Namibia](caza-en-africa/namibia) es el destino ideal para un primer safari: cazaderos privados, buen acceso y una enorme variedad de antílopes como el órix, el kudu o el springbok, además de leopardo y guepardo. [Sudáfrica](caza-en-africa/sudafrica) ofrece la mayor variedad de especies y alojamientos, desde programas generales en Limpopo hasta lodges de lujo, caza con arco y león en el Kalahari.',
          'Para el búfalo cafre y la caza peligrosa en zonas salvajes, nuestros destinos de referencia son [Mozambique](caza-en-africa/mozambique), [Tanzania](caza-en-africa/tanzania), [Zambia](caza-en-africa/zambia) y [Zimbabwe](caza-en-africa/zimbabwe). [Botswana](caza-en-africa/botswana) es sinónimo de grandes elefantes, mientras que [Camerún](caza-en-africa/camerun) y [Benín](caza-en-africa/benin) son la puerta a la caza en la selva y la sabana de África occidental. En el norte, [Mauritania](caza-en-africa/mauritania) y [Túnez](caza-en-africa/tunez) ofrecen caza a pocas horas de España.',
        ],
      },
      {
        h: 'Big Five y plains game',
        p: [
          'Los [Big Five](especies/big-five) (elefante, búfalo, león, leopardo y rinoceronte) son el gran sueño de cualquier cazador. Cada uno exige una planificación distinta: el [búfalo](especies/bufalo) se caza a la huella, el [leopardo](especies/leopardo) con cebado previo y el [león](especies/leon) siguiendo rastros durante días. Le asesoramos sobre el país, la temporada y el calibre adecuados para cada especie.',
          'El plains game, los [antílopes](especies/antilopes) y especies de llanura como el kudu, el órix, el ñu, el impala o el facochero, permite cazar varios trofeos en un mismo viaje y a un precio muy razonable. Es la forma más habitual de empezar a cazar en África y combina muy bien con un búfalo o un felino.',
        ],
      },
      {
        h: 'Cuándo ir y cómo se organiza el viaje',
        p: [
          'En el África austral la mejor época es la estación seca, aproximadamente de abril a octubre: la vegetación es menos densa, los animales se concentran en los puntos de agua y las temperaturas son agradables. En África oriental y central las temporadas varían según el país, y se lo indicamos en cada programa.',
          'Nos encargamos de todo: elección del outfitter, reserva del cazadero, vuelos, permisos de importación temporal de armas, licencias, y la exportación y tramitación de los trofeos (incluidos los permisos CITES cuando la especie lo requiere). Cada programa indica qué incluye el precio y puede calcular su presupuesto aproximado con el simulador.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuál es el mejor país para un primer safari de caza en África?', a: 'Namibia y Sudáfrica son los más recomendables para empezar: cazaderos privados, buenas infraestructuras, gran variedad de antílopes y programas de pocos días a precios ajustados.' },
      { q: '¿Cuánto cuesta un safari de caza en África?', a: 'Depende del país, de los días y de las especies. Un programa de plains game puede costar desde unos pocos miles de euros, mientras que un safari de búfalo o de Big Five en zona salvaje cuesta bastante más. Cada programa muestra su precio desde y el simulador le da un presupuesto aproximado.' },
      { q: '¿Puedo llevar mi propio rifle?', a: 'Sí. Gestionamos el permiso de importación temporal del arma en cada país. Para caza peligrosa como el búfalo o el elefante suele exigirse un calibre mínimo de .375.' },
      { q: '¿Se pueden traer los trofeos a España?', a: 'Sí. Coordinamos con el taxidermista y el transitario la exportación y la importación de los trofeos, incluidos los permisos CITES de las especies que lo necesitan.' },
      { q: '¿Pueden venir acompañantes que no cazan?', a: 'Sí. Todos los programas tienen tarifa de acompañante, y muchos cazaderos ofrecen safaris fotográficos y otras actividades para ellos.' },
    ],
  },
};
