// Textos SEO por URL (clave = ruta sin barra inicial ni final).
// intro: párrafo corto bajo el título. sections: guía al final de la página.
// faq: preguntas frecuentes (se publican también como FAQPage en JSON-LD).
// Enlaces internos con formato [texto](ruta/relativa).
import countryTexts from './seo-countries.json';

export const seoTexts = {
  ...countryTexts,
  'caza-en-africa': {
    intro: 'Llevamos más de treinta años organizando safaris de caza en África. Búfalo, leopardo, león, elefante o una buena semana de plains game: le mandamos solo a cazaderos que conocemos, porque antes hemos cazado allí nosotros.',
    heading: 'Cazar en África con de Onís Safaris',
    sections: [
      {
        h: '¿Qué país elegir?',
        p: [
          'Depende sobre todo de lo que quiera cazar. Si es su primer safari, casi siempre le recomendamos [Namibia](caza-en-africa/namibia). Se llega fácil, las fincas son privadas y muy grandes (en Windhoek cazamos en 80.000 hectáreas abiertas) y hay órix, kudu, springbok, eland… Además el lodge está a media hora del aeropuerto, así que es un viaje perfecto para ir con la familia.',
          '[Sudáfrica](caza-en-africa/sudafrica) es el país con más especies. En Limpopo, pegados al Parque Kruger, se pueden cazar hasta 34 distintas, y ahí tenemos también los programas de arco y el león en el Kalahari.',
          'Para búfalo en zonas salvajes, sin vallas, nos vamos a [Mozambique](caza-en-africa/mozambique) (Coutada 10 de Marromeu y Nairoto), a [Tanzania](caza-en-africa/tanzania), a [Zambia](caza-en-africa/zambia) o a [Zimbabwe](caza-en-africa/zimbabwe). El elefante lo cazamos en [Botswana](caza-en-africa/botswana). Y quien busque algo distinto tiene la selva de [Camerún](caza-en-africa/camerun) y [Benín](caza-en-africa/benin), o [Mauritania](caza-en-africa/mauritania) y [Túnez](caza-en-africa/tunez), a dos o tres horas de vuelo desde España.',
        ],
      },
      {
        h: 'Big Five y plains game',
        p: [
          'Cada uno de los [Big Five](especies/big-five) se caza de una manera. Al [búfalo](especies/bufalo) se le sigue la huella a pie, a veces durante horas. El [leopardo](especies/leopardo) se caza en espera, con cebos que el profesional prepara días antes. Y el [león](especies/leon) del Kalahari se rastrea por la arena hasta dar con él. Por eso no vale cualquier destino ni cualquier fecha, y se lo explicamos con calma antes de reservar.',
          'El plains game, es decir los [antílopes](especies/antilopes), el facochero, la cebra o el ñu, es como empieza casi todo el mundo. Se cazan varios animales en un mismo viaje, el precio es razonable y combina muy bien con un búfalo o con un felino si luego le pica el gusanillo.',
        ],
      },
      {
        h: 'Cuándo ir y qué hacemos nosotros',
        p: [
          'En el sur de África la temporada buena es la seca, más o menos de abril a octubre. Hay menos hoja, los animales bajan a beber a los mismos sitios y no hace un calor excesivo. En Mozambique se caza de mayo a noviembre. En cada programa le indicamos las fechas exactas.',
          'Del resto nos ocupamos nosotros: el outfitter, los vuelos, el permiso para llevar su rifle, las licencias y, al final, que el trofeo llegue a casa con sus papeles en regla, CITES incluido. En cada programa tiene el precio y lo que incluye, y con el simulador puede hacerse una idea del presupuesto en un minuto.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué país me recomendáis para un primer safari?', a: 'Namibia o Sudáfrica. Son fáciles de viajar, tienen muchísimas especies y hay programas cortos a buen precio. Namibia, además, es ideal si viaja con la familia.' },
      { q: '¿Cuánto cuesta un safari de caza en África?', a: 'Depende mucho del país, de los días y de lo que se cace. Un safari de plains game puede salir por unos pocos miles de euros; un búfalo o un leopardo en zona salvaje cuestan bastante más. En cada programa verá el precio desde y en el simulador puede calcular el suyo.' },
      { q: '¿Puedo llevar mi rifle?', a: 'Sí, y es lo más habitual. Nosotros tramitamos el permiso de importación temporal. Para búfalo y elefante normalmente se exige como mínimo un .375.' },
      { q: '¿Cómo traigo el trofeo a España?', a: 'Lo coordinamos con el taxidermista y el transitario, incluidos los permisos CITES cuando la especie los necesita. Usted no tiene que preocuparse de nada.' },
      { q: '¿Pueden venir acompañantes que no cazan?', a: 'Claro. Todos los programas tienen precio de acompañante y en muchos cazaderos hay safaris fotográficos y excursiones para ellos.' },
    ],
  },
  'caza-en-asia': {
    intro: 'Asia es caza de montaña de verdad. Marco Polo en el Pamir, íbex en el Tian Shan, tur en el Cáucaso, osos en Siberia y, para quien prefiera algo más tranquilo, los grandes jabalíes de Turquía. Son viajes que exigen, y por eso los preparamos con mucho detalle.',
    heading: 'Cazar en Asia con de Onís Safaris',
    sections: [
      {
        h: 'Montaña: Marco Polo, íbex y tur',
        p: [
          'El [Marco Polo](especies/cabras-y-carneros) lo cazamos en el Pamir de [Tayikistán](caza-en-asia/tayikistan), donde el organizador lleva doce años sin fallar un cazador y cada temporada salen machos de 60 pulgadas. En [Kirguizia](caza-en-asia/kirguizia) se caza en el Tian Shan, entre 3.000 y 3.500 metros, a caballo y durmiendo en yurtas.',
          'Para el [íbex](especies/ibex) hay mucho donde elegir: Kirguizia, Tayikistán, [Kazajistán](caza-en-asia/kazakhstan), [Mongolia](caza-en-asia/mongolia), [Irán](caza-en-asia/iran) y el bezoar de [Turquía](caza-en-asia/turquia), que es de los más asequibles. El tur se caza en el Cáucaso, en [Azerbaiyán](caza-en-asia/azerbaiyan) o en [Rusia](caza-en-asia/rusia). Son cacerías duras: le pediremos que venga en forma y le diremos con sinceridad qué destino le encaja mejor.',
        ],
      },
      {
        h: 'Jabalí, osos y lobos',
        p: [
          'Si hay un país de [jabalí](especies/jabali), ese es Turquía. Cazamos en siete reservas, seis en exclusiva, combinando batidas de día y esperas de noche, y hay un programa que añade pesca de atunes en Kusadasi. En Irán están, para muchos, los jabalíes más grandes del mundo, y en Tayikistán se recechan en alta montaña.',
          'En Rusia tenemos el [oso](especies/oso) pardo siberiano en espera, desde un barco en el Baikal o en la osera en pleno invierno, y el grizzly negro de Manchuria. Y en las estepas de Mongolia se hacen batidas de [lobo](especies/lobo) desde campamentos de yurtas, con un lobo incluido en el precio.',
        ],
      },
      {
        h: 'Cómo lo organizamos',
        p: [
          'En estos destinos lo difícil no es solo la caza: son los vuelos, los visados, los permisos de armas y la logística hasta campamentos que a veces están a muchas horas de la capital. De todo eso nos encargamos nosotros, también de la exportación de los trofeos.',
          'Las temporadas varían mucho. El Marco Polo va de septiembre a diciembre, el maral de Kazajistán se caza en septiembre y los osos de la osera, entre diciembre y febrero. Cada programa lleva sus fechas y su precio.',
        ],
      },
    ],
    faq: [
      { q: '¿Dónde se caza el Marco Polo?', a: 'Lo organizamos en el Pamir de Tayikistán y en el Tian Shan de Kirguizia. En Tayikistán el éxito en los últimos doce años ha sido del cien por cien.' },
      { q: '¿Hace falta estar muy en forma?', a: 'Para la montaña, sí. Se caza a más de 3.000 metros, a pie y a caballo. Para el jabalí en Turquía o el oso en espera, mucho menos.' },
      { q: '¿Cuál es el íbex más fácil de cazar?', a: 'El bezoar de Turquía es una buena puerta de entrada: buenos trofeos, de 100 a 110 cm, y un viaje sencillo desde España.' },
      { q: '¿Se pueden traer los trofeos de Asia a España?', a: 'Sí. Nos encargamos de los permisos de exportación e importación, CITES incluido cuando la especie lo pide.' },
    ],
  },
  'caza-en-europa': {
    intro: 'Europa la tenemos a dos o tres horas de avión y es donde más cazamos. Osos en los Cárpatos, rebecos en los Alpes y los Balcanes, corzos a peso en Hungría y Polonia, muskox en Groenlandia y, en casa, macho montés en Gredos y grandes venados a una hora de Madrid.',
    heading: 'Cazar en Europa con de Onís Safaris',
    sections: [
      {
        h: 'Rumanía y los Balcanes',
        p: [
          '[Rumanía](caza-en-europa/rumania) tiene la mayor población de osos pardos de Europa, unos 8.000, y allí cazamos el [oso](especies/oso) en espera y en batida. También el rebeco carpático, el más grande que hay, ciervo en berrea, corzo y gamo (en 2023 salió allí un nuevo récord nacional). Y jabalí, claro, en batida y en espera.',
          'En [Macedonia](caza-en-europa/macedonia) cazamos el [lobo](especies/lobo) en espera y el rebeco balcánico de Karadzitza. En [Bulgaria](caza-en-europa/bulgaria) hay rebeco en los Ródopes, urogallo en celo, becadas en Strandja y batidas de jabalí, y en [Croacia](caza-en-europa/croacia), osos de medalla y el rebeco de Biokovo con alojamiento junto al mar.',
        ],
      },
      {
        h: 'Corzos, rebecos y el norte',
        p: [
          'Para el [corzo](especies/corzo) nuestros sitios son [Hungría](caza-en-europa/hungria) y [Polonia](caza-en-europa/polonia), donde se paga según el peso del trofeo, además de Rumanía, [Inglaterra](caza-en-europa/inglaterra) y [Escocia](caza-en-europa/escocia). En Inglaterra se puede añadir el muntjac y el ciervo acuático chino, dos trofeos curiosos que no hay en otro sitio de Europa.',
          'El [rebeco](especies/rebeco) alpino lo cazamos en [Eslovenia](caza-en-europa/eslovenia), [Italia](caza-en-europa/italia) y [Austria](caza-en-europa/austria). Más al norte está [Bielorrusia](caza-en-europa/bielorrusia), con el alce en celo y el bisonte europeo, y [Groenlandia](caza-en-europa/groenlandia), con el muskox en verano o en pleno invierno ártico y el caribú.',
        ],
      },
      {
        h: 'España',
        p: [
          'En [España](caza-en-europa/espana) organizamos el [macho montés](especies/macho-montes) en una finca de Gredos, el rebeco cantábrico y el pirenaico, el boc balear en Mallorca y grandes venados, muflones y corzos en una de las mejores fincas del país, a una hora de Madrid.',
          'Para quien viene de fuera nos ocupamos de todo. Y para el cazador español, Europa tiene la ventaja de que en un fin de semana largo se puede volver con un buen trofeo.',
        ],
      },
    ],
    faq: [
      { q: '¿Dónde cazar un oso en Europa?', a: 'En Rumanía, que tiene la mayor población del continente, en espera o en batida. También en Croacia, en espera desde torreta.' },
      { q: '¿Qué es cazar corzos a peso?', a: 'Se paga una tarifa según lo que pese el trofeo. Es lo habitual en Hungría, Polonia y Rumanía, y le permite saber de antemano cuánto le costará cada corzo.' },
      { q: '¿Cuándo es la mejor época para el rebeco?', a: 'Depende del país, pero el otoño, de septiembre a noviembre, suele ser lo mejor. En Eslovenia, agosto y noviembre.' },
      { q: '¿Puedo cazar en Europa con mi rifle?', a: 'Sí. Con la Tarjeta Europea de Armas de Fuego el trámite es sencillo, y le ayudamos con lo que haga falta.' },
    ],
  },
  'caza-en-america': {
    intro: 'En América hay cacerías que no se parecen a nada: el alce y el grizzly del Yukón, los felinos de British Columbia con perros en la nieve, el oso negro de Quebec, el Kodiak desde un barco en Alaska y, en Argentina, ciervos y jabalíes a precios muy razonables.',
    heading: 'Cazar en América con de Onís Safaris',
    sections: [
      {
        h: 'Canadá y Alaska',
        p: [
          'En el Yukón cazamos en Devilhole, con avioneta, caballos y guía 1x1, entre montañas, lagos y glaciares: alce, carnero de Dall y grizzly. En British Columbia, alce, wapití, caribú, cabra de las Rocosas o borrego de Stone, y en invierno el puma, el lince y el gato montés con perros. Esta última es una de las cacerías más físicas que ofrecemos.',
          'El [oso](especies/oso) negro de Quebec es la puerta de entrada perfecta a [Canadá](caza-en-america/canada): un guía español va con usted desde Barajas y vuelve con usted. En [Alaska](caza-en-america/eeuu) el Kodiak se caza desde un yate en la isla de Kodiak, combinado con pesca de fletán y salmón.',
        ],
      },
      {
        h: 'Argentina',
        p: [
          '[Argentina](caza-en-america/argentina) es otra cosa: buen clima, buena comida y una caza muy abundante. Tenemos [ciervo](especies/ciervo) colorado en La Pampa, en fincas que suman más de 22.000 hectáreas, y ciervos de más de 195 puntos CIC de media en los Andes, cerca de Esquel.',
          'En la provincia de Buenos Aires se cazan chanchos, [antílope negro](especies/antilope-negro), ciervo axis y carneros. Y se puede combinar con palomas y perdices.',
        ],
      },
      {
        h: 'Temporadas',
        p: [
          'En el norte las temporadas son cortas y hay que reservar con tiempo: el oso de Quebec, en mayo; el alce y el Dall del Yukón, de agosto a octubre; los felinos, de noviembre a febrero. En Argentina se caza en el otoño austral, de marzo a julio, con la berrea en marzo y abril.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuál es la mejor cacería para empezar en Canadá?', a: 'El oso negro de Quebec. Es corta, un guía español le acompaña desde Barajas y tiene muy buen porcentaje de éxito.' },
      { q: '¿Cuándo es la berrea en Argentina?', a: 'De mediados de marzo a mediados de abril, el otoño austral.' },
      { q: '¿Hace falta mucho estado físico en el Yukón?', a: 'Sí, se camina y se monta a caballo en montaña. Le contaremos con detalle cómo es cada día antes de reservar.' },
    ],
  },
  'caza-en-oceania': {
    intro: 'Nueva Zelanda tiene los ciervos más grandes del mundo, y además tahr, rebeco, wapití y gamo en la Isla Sur. En Australia, en la Tierra de Arnhem, cazamos el búfalo de agua y el banteng desde campamentos de tiendas.',
    heading: 'Cazar en Oceanía con de Onís Safaris',
    sections: [
      {
        h: 'Nueva Zelanda',
        p: [
          'En [Nueva Zelanda](caza-en-oceania/nueva-zelanda) la caza es de alta montaña, en paisajes espectaculares, y los trofeos son enormes. La berrea del [ciervo](especies/ciervo) es en marzo y abril, y en el mismo viaje se puede cazar el tahr, el [rebeco](especies/rebeco), el wapití y el gamo. Los lodges son pequeños y acogedores, y los guías, profesionales de toda la vida.',
          'Se puede ir con rifle o con arco, y es un destino estupendo para combinar con unos días de turismo.',
        ],
      },
      {
        h: 'Australia',
        p: [
          'En [Australia](caza-en-oceania/australia) cazamos en la Tierra de Arnhem, en el norte del país: búfalo de agua en cinco días y banteng en cuatro. Es una caza remota, de campamento, muy distinta a la africana.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuándo es la berrea en Nueva Zelanda?', a: 'En marzo y abril. La temporada general va de enero a agosto.' },
      { q: '¿Qué se puede cazar en un mismo viaje a Nueva Zelanda?', a: 'Ciervo, tahr, rebeco, wapití y gamo. Lo normal es combinar dos o tres especies.' },
    ],
  },
  'caza-con-arco': {
    intro: 'Cazamos con arco desde hace años y sabemos lo que necesita un arquero: puestos a buena distancia, animales que se dejen entrar y profesionales que entiendan lo que es acercarse a 30 metros. Estos son los destinos que mejor nos han funcionado.',
    heading: 'Caza con arco con de Onís Safaris',
    sections: [
      {
        h: 'África con arco',
        p: [
          'En [Namibia](caza-con-arco/namibia) tenemos dos fincas dedicadas solo al arco, seis días con lodge, profesional y vehículo. En [Sudáfrica](caza-con-arco/sudafrica), en Limpopo junto al Kruger, hay paquetes en lodge de lujo y algo que pocos ofrecen: búfalo y león a la huella con rastreadores nativos.',
          'En [Mozambique](caza-con-arco/mozambique) se caza el búfalo en los pajonales del delta del Zambeze, donde la vegetación permite acercarse a la distancia buena, y en [Mauritania](caza-con-arco/mauritania), facocheros a rececho en 200.000 hectáreas sin malaria.',
        ],
      },
      {
        h: 'Fuera de África',
        p: [
          'En [Groenlandia](caza-con-arco/groenlandia), el buey almizclero, con helicóptero incluido. En [Canadá](caza-con-arco/canada), el oso negro de Quebec desde puestos elevados y el alce del Yukón, los más grandes del mundo. En [Nueva Zelanda](caza-con-arco/nueva-zelanda), ciervo en berrea, tahr y rebeco, y en [Turquía](caza-con-arco/turquia), jabalíes de noche con muchas oportunidades cada salida.',
          'Y en [España](caza-con-arco/espana): macho montés en Gredos, y ciervo, muflón y grandes jabalíes en fincas a una hora de Madrid, con puestos a 30 o 50 metros de los cebaderos.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuál es el mejor destino para un primer viaje de caza con arco?', a: 'Namibia o Sudáfrica. Hay mucha caza, puestos bien preparados y fincas pensadas para el arco.' },
      { q: '¿Se puede cazar búfalo con arco?', a: 'Sí, en Mozambique y en Sudáfrica. Le explicaremos el equipo mínimo que exige cada país.' },
      { q: '¿Puedo viajar con mi arco?', a: 'Sí, el arco no necesita los permisos de un rifle. Solo hay que revisar las condiciones de la aerolínea, y le ayudamos con ello.' },
    ],
  },
  'pesca': {
    intro: 'Además de cazar, nos gusta mucho pescar. Estos son los viajes de pesca que organizamos: marlín en Mozambique y Cabo Verde, atún rojo en Cádiz, salmón en Islandia, truchas en Finlandia y Eslovenia, arctic char en Groenlandia y dorados en la Amazonía boliviana.',
    heading: 'Viajes de pesca con de Onís Safaris',
    sections: [
      {
        h: 'Pesca en el mar',
        p: [
          'Para el marlín, [Mozambique](pesca/mozambique) de enero a abril y [Cabo Verde](pesca/cabo-verde) en mayo, en Sal o en São Nicolau, con el barco en exclusiva. En [Cádiz](pesca/espana) se sale desde Barbate, El Puerto de Santa María o La Línea a por atún rojo, túnidos y marlín, o a fondo y jigging todo el año.',
          'En [Mauritania](pesca/mauritania) se pesca desde la costa y en barcos de vela latina dentro del Banco de Arguin: corvinas, palometones, pargos y tiburones.',
        ],
      },
      {
        h: 'Ríos y lagos',
        p: [
          'El salmón atlántico, en los ríos de [Islandia](pesca/islandia) en julio y agosto. Truchas de hasta 6 kilos en la Laponia de [Finlandia](pesca/finlandia) y la trucha marmorata en el Soča de [Eslovenia](pesca/eslovenia), uno de los ríos más bonitos de Europa.',
          'En [Groenlandia](pesca/groenlandia), arctic char en lagos de alta montaña y bacalao en el mar, y en [Bolivia](pesca/bolivia), tucunaré, payara y dorado en más de cien ríos vírgenes del Amazonas.',
        ],
      },
    ],
    faq: [
      { q: '¿Hace falta llevar equipo de pesca?', a: 'Depende del destino. En el mar y en Groenlandia suele estar incluido. Para la mosca en Eslovenia, Finlandia o Bolivia es mejor llevar el propio.' },
      { q: '¿Se puede combinar con caza?', a: 'Sí. En Bolivia se combina con perdices y palomas, en Turquía con jabalí y en Alaska con el oso Kodiak.' },
    ],
  },
  'safaris-fotograficos': {
    intro: 'No todo el mundo viaja a África para cazar. Si quiere ver la fauna, viajar con la familia o acompañar a un cazador sin coger un rifle, le organizamos un safari fotográfico a medida en Namibia, Sudáfrica, Mozambique o Tanzania.',
    heading: 'Safaris fotográficos a medida',
    sections: [
      {
        h: 'Cómo los organizamos',
        p: [
          'Díganos cuántos días quiere viajar, qué le gustaría ver y en qué fechas, y le preparamos una propuesta con lodges, guías y traslados. Conocemos bien estos países porque cazamos en ellos todos los años.',
          '[Namibia](safaris-fotograficos/namibia) es ideal para un viaje por carretera, con desierto, costa y Etosha. [Sudáfrica](safaris-fotograficos/sudafrica), para combinar el Kruger con la ruta jardín o Ciudad del Cabo. [Tanzania](safaris-fotograficos/tanzania), para el Serengeti y Zanzíbar, y [Mozambique](safaris-fotograficos/mozambique), para terminar el viaje en sus playas.',
        ],
      },
    ],
    faq: [
      { q: '¿Se puede combinar con un safari de caza?', a: 'Sí, es muy habitual: mientras uno caza, la familia hace un safari fotográfico y luego se juntan unos días.' },
    ],
  },
};
