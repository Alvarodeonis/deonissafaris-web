// Programa completo de cada ficha, tal como aparece en la web y los PDF de cada temporada.
// Bloques: { title, rows: [[concepto, precio]] } | { title, table: { head, rows } } | { title, list } | { title, text }
const F = 'https://www.deonissafaris.com/media/files/';

const disclaimer = {
  title: 'Aviso',
  text: [
    'Los programas no son un documento contractual; son meramente informativos. Los precios pueden cambiar sin previo aviso por causas ajenas a la empresa y sus representadas.',
  ],
};

export const details = {
  'mozambique-bufalos-pack-7-y-10-dias': {
    pdf: `${F}proyectos_43_mozambique%202026%20bufalos.pdf`,
    blocks: [
      { title: 'Zona y campamentos', list: ['Zona de caza: Coutada 10, Marromeu.', 'Dos campamentos de cabañas de madera, nuevos y confortables, con todos los servicios.', 'Temporada: del 1 de mayo al 30 de noviembre.'] },
      { title: 'Paquetes', table: { head: ['Paquete', 'Modalidad', 'Precio'], rows: [['7 días · 1 búfalo', '1×1', 'US$ 15.250'], ['10 días · 1 búfalo', '1×1', 'US$ 17.500'], ['10 días · 1 búfalo', '2×1 (por cazador)', 'US$ 16.100'], ['Acompañante (todos los paquetes)', 'por día', 'US$ 420']] } },
      { title: 'Tasas de abate', text: ['IVA del 17 % incluido en las tarifas diarias. Tasas según tarifas del gobierno y de la comunidad, sujetas a disponibilidad de cupo.'], table: { head: ['Especie', 'Días mín.', 'US$'], rows: [
        ['Leopardo', '14', '10.000'], ['Elefante', '14', 'Consultar'], ['Hiena', '14', '1.950'],
        ['Segundo búfalo', '7 / 10', '7.800'], ['Sable', '10', '7.600'], ['Hipopótamo', '10', '7.500'], ['Eland', '10', '5.000'], ['Nyala', '10', '4.500'],
        ['Cebra de Selous', '10', '3.000'], ['Hartebeest', '10', '2.700'], ['Waterbuck', '10', '2.500'],
        ['Cocodrilo', '7', '4.000'], ['Oribi', '7', '2.000'], ['Duiker azul', '7', '2.000'], ['Duiker rojo', '7', '1.800'], ['Suni', '7', '1.800'], ['Bushbuck', '7', '1.700'],
        ['Reedbuck común', '7', '1.400'], ['Potamóquero', '7', '1.400'], ['Facóquero', '7', '1.100'], ['Duiker gris', '7', '950'], ['Impala', '7', '850'], ['Babuino', '7', '400'],
      ] } },
      { title: 'Incluye', list: ['Licencia de caza.', 'Permiso de importación de un rifle.', 'Tasas comunitarias.', 'Permiso general de exportación y permiso de exportación de un búfalo.', 'Cazador profesional con vehículo y equipo.', 'Alojamiento en pensión completa.', 'Primera preparación de trofeos.'] },
      { title: 'No incluye', rows: [
        ['Vuelos internacionales, domésticos y chárter', ''], ['Licencia de importación de un segundo rifle', 'US$ 500'], ['Segundo Argo (programas 2×1)', 'US$ 100 / día'],
        ['Otros animales abatidos o heridos (los heridos no cobrados se cobran como abatidos)', ''], ['Certificado veterinario', 'US$ 150 / trofeo'], ['Permiso CITES', 'US$ 330 / animal'],
        ['Transporte de trofeos a Maputo', 'US$ 750 / cazador (50 % cada uno en 2×1)'], ['Alquiler de rifle', 'US$ 150 / día + US$ 15 / bala'], ['Envío de trofeos al país de destino', ''],
        ['Hoteles antes o después de la cacería', ''], ['Propinas al profesional y al personal', ''], ['Gastos personales', ''],
      ] },
      { title: 'Chárter Beira – campamento (coste compartido por el grupo)', rows: [['Cessna 206 (3-4 pasajeros)', 'US$ 3.000'], ['Airvan (4-5 pasajeros)', 'US$ 3.600'], ['Islander (5-6 pasajeros)', 'US$ 4.000']] },
      { title: 'Forma de pago', list: ['50 % de depósito al reservar.', '50 % restante 30 días antes de la llegada al campamento.', 'La factura final (tasas y varios) se paga en efectivo en el campamento. No se aceptan cheques.'] },
      { title: 'Cancelación', list: ['Más de 365 días antes: se devuelve todo menos el 10 %.', 'Entre 180 y 365 días antes: se devuelve el 50 %.', 'Menos de 180 días: sin devolución.', 'Si se aplaza al año siguiente y después se cancela: sin devolución, salvo que se encuentre un sustituto para las mismas fechas.', 'Causas de fuerza mayor: el outfitter puede modificar o cancelar itinerarios y las devoluciones quedan a su criterio.'] },
      disclaimer,
    ],
  },

  'namibia-paquete-windhoek': {
    pdf: `${F}proyectos_52_namibia%202026%20paquete%20especial%20windhoek%201%20y%202.pdf`,
    blocks: [
      { title: 'El programa', list: ['Seis días de caza 1×1 en unas 80.000 hectáreas de fincas abiertas, zona de grandes trofeos.', 'Lodge con todas las comodidades a unos 40 km (media hora) del aeropuerto internacional Hosea Kutako.', 'Temporada: de febrero a noviembre.', 'Los animales del paquete se pueden cambiar por otros de categoría similar, pagando la diferencia.', 'Ideal para ir en familia y combinar con turismo en la costa o en los Parques Nacionales.'] },
      { title: 'Paquetes (6 días, 1×1)', table: { head: ['Paquete', 'Trofeos incluidos', 'Precio'], rows: [['Windhoek 1', 'Órix, hartebeest rojo, impala, steenbuck, facóquero, babuino y chacal (7 trofeos)', '3.200 €'], ['Windhoek 2', 'Kudu, órix, hartebeest rojo, facóquero, steenbuck, babuino y chacal (7 trofeos)', '4.200 €'], ['Acompañante no cazador', '', '750 €']] } },
      { title: 'Devolución por animales del paquete no abatidos', rows: [['Kudu', '975 €'], ['Órix', '250 €'], ['Hartebeest rojo', '350 €'], ['Impala', '300 €'], ['Steenbuck', '125 €'], ['Facóquero', '100 €'], ['Babuino y chacal', '0 €']] },
      { title: 'Extensiones', rows: [['Kalahari 1 · 2 días, 2 springbuck y 1 blesbuck (springbuck extra 350 € trofeo / 150 € no trofeo)', '950 €'], ['Kalahari 2 · 1 día ida y vuelta, 2 springbok (springbok extra 350 € trofeo / 150 € no trofeo)', '550 €'], ['Cebra de montaña de Hartmann · 1 día en Khomas Hochland', '1.100 €']] },
      { title: 'Tasas de abate de animales adicionales', table: { head: ['Especie', '€', 'Especie', '€'], rows: [
        ['Greater kudu', '1.950', 'Waterbuck', '1.800'], ['Hartebeest rojo', '700', 'Eland', '2.200'], ['Roan', 'Consultar', 'Ñu negro', '1.200'],
        ['Órix (gemsbok)', '500', 'Ñu azul', '1.000'], ['Órix dorado', '1.500', 'Ñu dorado', '2.500'], ['Cebra de montaña', '1.100', 'Klipspringer', 'Consultar'],
        ['Cebra común', '900', 'Sable (menos de 40")', '4.500'], ['Blesbuck', '600', 'Sable (más de 40")', '5.800'], ['Blesbuck blanco', 'Consultar', 'Impala común', '600'],
        ['Springbuck', '350', 'Nyala', '2.500'], ['Springbok blanco / negro', 'Consultar', 'Leopardo (CITES)', 'Consultar'], ['Duiker', '250', 'Guepardo (CITES)', 'Consultar'],
        ['Steenbok', '250', 'Tsessebe', 'Consultar'], ['Facóquero', '390', 'Lechwe', '3.500'], ['Impala de cara negra', 'Consultar', 'Chacal y babuino', 'Gratis'],
      ] } },
      { title: 'Incluye', list: ['Traslados desde el aeropuerto.', 'Lodge de lujo en pensión completa.', 'Bebidas alcohólicas en cantidades razonables.', 'Lavandería diaria.', 'Servicios de un PH y vehículo de caza.', 'Licencia de caza.', 'Primera preparación de trofeos.'] },
      { title: 'No incluye', rows: [['Vuelos', ''], ['Tasas de abate de animales adicionales abatidos o heridos y no cobrados', ''], ['Objetos de naturaleza personal', ''], ['Permisos de importación y exportación de armas', ''], ['Propinas (recomendadas)', '400 €'], ['Alquiler de rifle y munición', '200 € / 6 días']] },
      { title: 'Cancelación', text: ['Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'sudafrica-limpopo-paquetes-en-lodge-de-lujo': {
    pdf: `${F}proyectos_62_sudafrica%20lodge%20de%20lujo%20%202026%20limpopo%20paquetes.pdf`,
    blocks: [
      { title: 'El programa', list: ['88.000 hectáreas de fincas privadas en Limpopo, lindando con el Parque Kruger. Finca principal de 30.000 hectáreas.', 'Lodge de lujo. Aeropuerto de Johannesburgo.', 'Posibilidad de 34 especies distintas, con trofeos de calidad.', 'Extras: excursiones al Kruger o vuelos en helicóptero.', 'Los paquetes no se pueden modificar. Se pueden añadir otros trofeos pagando su tasa de abate.'] },
      { title: 'Paquetes (6 días: 4 de caza más llegada y salida)', table: { head: ['Paquete', 'Animales', 'Precio'], rows: [['Nº 1', '1 ñu azul, 1 impala, 1 blesbuck', '3.700 €'], ['Nº 2', '1 búfalo (hasta 38"), boss duro', '9.900 €'], ['Nº 3', '1 blesbuck, 1 ñu azul o negro o cebra, 1 impala, 1 facóquero', '4.200 €'], ['Nº 4', '1 blesbuck, 1 impala, 1 facóquero, 1 duiker gris', '3.500 €']] } },
      { title: 'Gastos diarios (programa general, por persona)', rows: [['1 cazador con 1 profesional, antílopes', '440 €'], ['1 cazador con 1 profesional, Big Five', '700 €'], ['2 cazadores con 1 profesional', '380 €'], ['Acompañante no cazador', '230 €'], ['Día de llegada y salida', '290 €'], ['Excursión de turismo', '180 € / día'], ['Alquiler de helicóptero', '800 € / hora'], ['Alquiler de rifle', '80 € / día']] },
      { title: 'Tasas de abate de trofeos adicionales', table: { head: ['Especie', '€', 'Especie', '€'], rows: [
        ['Babuino', '150', 'Kudu', '3.900'], ['Blesbuck', '500', 'Leopardo', 'Consultar'], ['Ñu azul', '1.300', 'León / leona', 'Consultar'], ['Ñu negro', '1.300', 'Lince caracal', '950'],
        ['Búfalo más de 40"', '12.000', 'Nyala', '2.700'], ['Búfalo hembra', '3.400', 'Órix', '2.300'], ['Bushbuck', '1.400', 'Avestruz', '1.200'], ['Potamóquero', '2.150', 'Reedbuck común', '1.300'],
        ['Civeta', '1.700', 'Reedbuck de montaña', '1.200'], ['Duiker gris', '490', 'Rinoceronte (por pulgada)', '2.300'], ['Eland', '5.450', 'Sable', '5.700'], ['Gineta', '450', 'Springbuck', '740'],
        ['Jirafa', '2.950', 'Steenbok', '520'], ['Hiena parda + licencia', '3.900', 'Tsessebe', '2.100'], ['Hiena manchada + licencia', '3.900', 'Facóquero 8" o más', '700'], ['Hartebeest rojo', '2.100', 'Facóquero', '550'],
        ['Impala', '450', 'Waterbuck', '2.850'], ['Chacal', '290', 'Cebra', '1.300'], ['Klipspringer', '2.850', '', ''],
      ] } },
      { title: 'Incluye', list: ['Recogida y regreso al aeropuerto de Johannesburgo.', 'Cazador profesional con vehículo y equipo de ayudantes.', 'Lodge de lujo en pensión completa.', 'Lavandería diaria.', 'Primera preparación de trofeos.'] },
      { title: 'No incluye', list: ['Vuelos.', 'Tasas de abate de animales adicionales abatidos o heridos y no recuperados (en África se consideran abatidos).', 'Alojamiento o comidas antes o después del safari.', 'Alquiler de rifle (80 €/día) y munición.', 'Propinas al profesional y al personal.', 'Preparación, embalaje, documentación y exportación de trofeos.', 'Gastos personales y bebidas alcohólicas.'] },
      { title: 'Cancelación', text: ['Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'kazakhstan-ibex-zonas-premium': {
    pdf: `${F}proyectos_85_kazakstan%20ibex%20zonas%20premium%202025.pdf`,
    blocks: [
      { title: 'Itinerario', rows: [['Día 1', 'Llegada a Almaty y traslado a la zona (Dzungarian Alatau unas 10 h, Narynkol 6 h, Kegen 8 h)'], ['Días 2 a 8', 'Siete días de caza'], ['Día 9', 'Regreso a Almaty y conexión con Europa']] },
      { title: 'Zonas y modalidad', list: ['Zonas: Dzungarian Alatau, Narynkol y Kegen.', 'Rececho a pie, a caballo y desde campamentos volantes.', 'Temporada: del 1 de agosto al 15 de noviembre.', 'Grupos de 1 a 6 cazadores, 4 cazadores por campamento.', 'Alojamiento en yurtas, caravanas y campamentos volantes (hace falta saco térmico).'] },
      { title: 'Precios desde Almaty', rows: [['Cacería', '3.600 €'], ['Suplemento cazador individual', '800 €'], ['Acompañante', '2.700 €'], ['Documentación del acompañante', '200 €'], ['Día adicional de caza', 'US$ 290'], ['Día adicional de acompañante', 'US$ 230']] },
      { title: 'Tasas de abate del íbice', table: { head: ['Longitud del trofeo', 'Precio'], rows: [['Hasta 110 cm', '3.500 €'], ['110,1 – 120 cm', '4.000 €'], ['120,1 – 125 cm', '4.500 €'], ['125,1 – 130 cm', '5.000 €'], ['130,1 – 135 cm', '5.500 €'], ['Más de 135 cm', '7.500 €']] } },
      { title: 'Otras especies', rows: [['Corzo siberiano', '2.200 €'], ['Jabalí', '1.500 €'], ['Lobo', '1.500 €']] },
      { title: 'Incluye', list: ['Guía experimentado.', 'Pensión completa en el campamento.', 'Guía intérprete.', 'Transporte a la zona de caza y durante la cacería.'] },
      { title: 'No incluye', rows: [['Billetes de avión', ''], ['Hoteles y comidas en Almaty antes y después', ''], ['Bebidas alcohólicas o con gas', ''], ['Gastos personales', ''], ['Documentación (invitación, recepción en aeropuerto, transporte y permiso de un rifle)', '350 €'], ['Certificado CITES', '700 €'], ['Certificado veterinario', '300 €'], ['Envío DHL', 'Consultar']] },
      { title: 'Notas', list: ['Hay que indicar el número de serie del cuchillo de caza.', 'Saco de dormir caliente obligatorio para los campamentos volantes.', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'turquia-batidas-jabali-caza-en-reservas': {
    pdf: `${F}proyectos_166_turquia%202026%20jabali%20batida.pdf`,
    blocks: [
      { title: 'El programa', list: ['Batidas de jabalí del 15 de octubre al 15 de febrero, con la compañía líder en caza de jabalí en Turquía.', 'Grupos de 8 a 14 cazadores. 4 días de caza (5 noches).', 'Guías que mantienen sus zonas cebadas o controladas todo el año.', 'Seis concesiones de montaña (Corum, Kirsehir, Yozgat, Elazig, Siirt y Tuncelli) con buena visibilidad y jabalíes grandes.'] },
      { title: 'Precio por cazador', rows: [['10 a 14 cazadores · 4 días (5 noches)', '3.790 €'], ['9 cazadores', '4.190 €'], ['8 cazadores', '4.390 €'], ['Suplemento nuevas zonas del este (hay que traer batidores)', '+200 €'], ['Acompañante en habitación compartida', '890 €'], ['Acompañante en habitación individual', '1.390 €']] },
      { title: 'Trofeos', rows: [['Hembras y machos hasta 19,9 cm', 'Gratis'], ['Machos de 20 a 23,9 cm', '390 €'], ['Machos de 24 cm o más', '690 €'], ['Opcional: rececho nocturno, machos de más de 19 cm', '1.090 €']] },
      { title: 'Alojamiento', list: ['Hoteles de mínimo 4 estrellas en la zona o casa de caza.', 'Desayuno, barbacoa durante la cacería y cena en el hotel.', 'Habitación doble incluida; individual +30 € por noche.'] },
      { title: 'Incluye', list: ['Todos los jabalíes hasta 19,9 cm de colmillo.', 'Asistencia en los aeropuertos de llegada y salida.', 'Organización completa de las batidas.', 'Alojamiento en habitación doble.', 'Comidas y transportes durante la cacería.', 'Documentos de exportación.'] },
      { title: 'No incluye', rows: [['Vuelos y alojamientos antes o después de la cacería', ''], ['Importación de armas', '30 € / rifle'], ['Documentación de caza', '80 €'], ['Bebidas alcohólicas y con gas', ''], ['Propinas recomendadas para los ojeadores', '170 € / cazador'], ['Preparación de colmillos', '60 €'], ['Traslado extra si el grupo llega en vuelos distintos', 'Consultar'], ['Gastos personales', '']] },
      { title: 'Forma de pago', list: ['Reserva: 900 €, no reembolsables si no se asiste a la batida.', 'Importe de la caza y tasas de llegada: en metálico al viajar.', 'Liquidación final: en metálico después de la cacería.'] },
      { title: 'Expectativas y normas', list: ['Un buen resultado es un jabalí por cazador y día, de los que un 20-30 % son machos: en 4 días, unos 40 jabalíes y entre 8 y 12 machos, algunos de hasta 30 cm.', 'Máximo 50 balas por persona.', 'En la escala de Estambul no se permiten lentes en la mochila (se requisan): deben ir en el maletín del rifle.', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'turquia-jabali-vip-caza-nocturna': {
    blocks: [
      { title: 'El programa', list: ['Rececho y espera nocturna en cebaderos naturales o artificiales, caza 100 % natural.', '8 reservas en Turquía, 7 de ellas exclusivas, muchas sin presión de caza.', 'Todo el año; mejor época de marzo a septiembre.', '7 días, 6 noches de alojamiento y 5 noches de caza. Máximo 4 cazadores.', 'Hoteles de 4 estrellas o casa de caza. Solo Toyota Hilux.', '120 cámaras de control en los cebaderos. Media de colmillo en las últimas temporadas superior a 23 cm, con machos de 30-31 cm.'] },
      { title: 'Precios', table: { head: ['Modalidad', 'Para quién', 'Precio'], rows: [['1×1 · un guía por cazador', 'Quien busca 6-10 machos grandes', '1.750 € / cazador'], ['1×1 con 6 o más jabalíes', 'La cuota de caza baja a', '750 €'], ['2×1 · dos cazadores por guía y vehículo', 'Quien busca 4-5 machos grandes cada uno', '1.450 € / cazador'], ['2×1 con 4 o más jabalíes por cazador', 'La cuota de caza baja a', '750 €'], ['Acompañante en habitación compartida', '', '600 €'], ['Acompañante en habitación individual', '', '900 €']] } },
      { title: 'Tasas de abate', rows: [['Machos de 20 a 24 cm', '1.190 €'], ['Machos de más de 24 cm', '1.490 €'], ['Machos de menos de 20 cm y hembras', 'Gratis']] },
      { title: 'Incluye', list: ['Guía profesional con experiencia.', 'Alojamiento y comidas durante la cacería.', 'Transporte durante la cacería.', 'Intérprete.'] },
      { title: 'No incluye', rows: [['Vuelos y alojamiento antes o después', ''], ['Tasas de aeropuerto', ''], ['Importación de armas', '40 € / persona'], ['Documentación de caza', '80 €'], ['Bebidas alcohólicas y con gas', ''], ['Propinas', '60 € / jabalí abatido'], ['Preparación de colmillos', '60 €'], ['Suplemento habitación individual', '35 € / noche'], ['Gastos personales', '']] },
      { title: 'Normas', list: ['Máximo 50 balas.', 'En la escala de Estambul las lentes deben ir en el maletín del rifle, no en la mochila (se requisan).', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'macedonia-lobo-y-jabali-en-batida': {
    pdf: `${F}proyectos_144_macedonia%20%20batida%20lobo%20y%20jabali%20%202023-2024.pdf`,
    blocks: [
      { title: 'El programa', list: ['Finca privada en el centro de Macedonia, terreno de montaña.', 'Batida con perros y ojeadores. 3 días de caza, 4 noches.', 'Hotel Gardenia, habitaciones individuales, a unos 30 minutos del aeropuerto de Skopje.'] },
      { title: 'Precios', rows: [['Paquete 3 días de caza / 4 noches', '2.690 €'], ['Lobo abatido en batida', '1.600 €'], ['Lobo abatido en espera', '2.500 €'], ['Permiso CITES del lobo', '350 €'], ['Jabalíes', 'Incluidos todos']] },
      { title: 'Incluye', list: ['Recepción en el aeropuerto de Skopje y traslados.', 'Intérprete durante toda la estancia.', 'Hotel Gardenia, habitación individual, 4 noches.', 'Pensión completa con bebidas sin alcohol.', '3 días de batida en terreno abierto.', 'Todos los jabalíes abatidos.', 'Permisos de caza locales.', 'Primera preparación de trofeos.'] },
      { title: 'No incluye', rows: [['Importación de rifle (se paga en el aeropuerto)', '25 €'], ['Tasas de abate del lobo y CITES', 'Ver arriba'], ['Envío de trofeos y taxidermia', ''], ['Bebidas alcohólicas', '']] },
      { title: 'Forma de pago', list: ['30 % del paquete para reservar.', '70 % restante más las tasas de abate, en efectivo el último día de caza.'] },
      { title: 'Documentación', list: ['DNI o pasaporte.', 'Pasaporte europeo de armas o licencia; la carta de invitación la preparamos nosotros.', 'Para la invitación: nombre completo y pasaporte, marca, modelo y número del rifle, número de balas (máximo 40) y vuelos.', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'groenlandia-caribous': {
    pdf: `${F}proyectos_121_groenlandia%20caribous%20%202026.pdf`,
    blocks: [
      { title: 'El programa', list: ['Alrededores de Narsarsuaq, en un excelente campamento de caza.', 'Vuelos: España – Reikiavik – Narsarsuaq.', 'Agosto y septiembre; mejores fechas del 24 de agosto al 30 de septiembre.', '3 o 4 días de caza según vuelos y número de cazadores.', 'Segundo trofeo posible pagando su tasa de abate. Pesca opcional.'] },
      { title: 'Precios', rows: [['Caribú trofeo macho (3 a 6 días, según vuelos)', '11.900 €'], ['Combinado 1 caribú + 1 buey almizclero', '20.900 €'], ['Acompañante', '5.900 €'], ['Porcentaje de éxito', '99 %']] },
      { title: 'Incluye', list: ['Campamento de caza en cabañas compartidas, pensión completa.', 'Un PH por cada 4 cazadores.', 'Transporte en coches, quads y botes.', 'Licencia de caza y pesca.', 'Documentación para importar rifles a Groenlandia.', 'Primera preparación de trofeos.'] },
      { title: 'No incluye', rows: [['Vuelos y hoteles antes y después', ''], ['Habitación individual', ''], ['Tasas de abate de animales y programas adicionales', ''], ['Propinas, bebidas alcohólicas y gastos personales', ''], ['Alquiler de rifle', '55 € / día'], ['Munición', ''], ['Documentos de exportación', ''], ['Helicóptero (opcional)', '']] },
      { title: 'Forma de pago', list: ['Reserva: depósito del 50 %.', 'Resto: un mes antes de la cacería.', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },

  'australia-caza-de-banteng-y-bufalo-de-agua': {
    pdf: `${F}proyectos_147_australia%202022%20banteng%20y%20bufalo%20de%20agua.pdf`,
    blocks: [
      { title: 'Búfalo de agua · 5 días en Central Arnhem Land', text: ['Temporada: junio, julio y agosto. Día 1 llegada al campamento, días 2 a 6 caza, día 7 salida.'], rows: [['1×1 (un cazador, un guía)', 'US$ 14.500'], ['2×1 (dos cazadores, un guía)', 'US$ 9.900 / persona'], ['Búfalo de agua adicional', 'US$ 3.500'], ['Búfalo de gestión o toro dugga (<80 SCI)', 'US$ 2.200'], ['Toro salvaje (scrub bull)', 'US$ 1.500'], ['Jabalí trofeo', 'US$ 25'], ['Observador', 'US$ 200 / día']] },
      { title: 'Incluye (búfalo)', list: ['1 tasa de trofeo de búfalo de agua.', '5 días de guía.', 'Traslado desde el aeródromo de la zona de caza.', 'Campamento de tiendas clásico, 6 noches.', 'Comidas, bebidas, cerveza, vino y whisky.', 'Licencia temporal de armas.', 'Uso de rifles .375 H&H y .416 Rigby.'] },
      { title: 'Banteng · 4 días en el noroeste de Arnhem Land', text: ['Temporada: junio, julio y agosto. Llegada temprano el día 1, tres días y medio de caza, salida el día 4 o 5. Toro joven unos 450 kg; maduro unos 550 kg.'], rows: [['1 cazador por guía', 'US$ 18.500 / persona'], ['2 cazadores por guía', 'US$ 15.500 / persona'], ['Segundo toro de banteng', 'US$ 12.500'], ['Jabalí trofeo', 'US$ 400'], ['Observador', 'US$ 200 / día']] },
      { title: 'Incluye (banteng)', list: ['1 tasa de trofeo de banteng.', 'Traslado desde el aeródromo de la zona de caza.', 'Campamento de tiendas cerca de la zona.', 'Comidas y bebidas (en esta zona no se permite alcohol).', 'Licencia temporal de armas del Territorio del Norte.', 'Uso de rifles.'] },
      { title: 'No incluye (ambos)', rows: [['Preparación del trofeo: cráneo / cuernos', 'US$ 250'], ['Cabeza con capa / cuernos', 'US$ 400'], ['Piel completa', 'US$ 900'], ['Flete y taxidermia', ''], ['Alojamiento en Darwin', ''], ['Avioneta Darwin – zona de búfalo (Cessna 210, 3 pax / Cessna 402, 7 pax)', 'US$ 1.500 / 2.900 por vuelo'], ['Avioneta Darwin – zona de banteng (Cessna 210)', 'aprox. AUD 1.500']] },
      { title: 'Forma de pago', list: ['Depósito de US$ 4.000 por cazador, no reembolsable.', 'El pago principal de la caza no es reembolsable.', 'Precios en dólares con impuestos (GST) incluidos. Llegada a Darwin.'] },
      disclaimer,
    ],
  },

  'namibia-caza-con-arco-africa': {
    blocks: [
      { title: 'El programa', list: ['Dos de las mejores fincas de Namibia dedicadas exclusivamente al arco, a 40 km del aeropuerto Hosea Kutako.', 'Esperas de día en charcas y saladeros, en puestos a ras de suelo y treestands, a 20-45 metros.', 'Temporada: mayo a octubre; mejor época septiembre a noviembre.', 'Grupo máximo de 3 o 4 cazadores (más, consultar).', 'Lodge excelente con todas las comodidades. Apto para familias y para combinar con turismo.'] },
      { title: 'Paquete', rows: [['Seis días de caza con arco: 1 facóquero y 2 animales a elegir entre órix, hartebeest rojo y ñu', '2.700 €'], ['Chacales, gallinas de guinea y babuinos', 'Gratis'], ['Acompañante no cazador', '750 €']] },
      { title: 'Trofeos recomendados', table: { head: ['Especie', '€'], rows: [['Órix', '500'], ['Hartebeest rojo macho', '700'], ['Impala', '600'], ['Facóquero', '390'], ['Kudu', '1.950'], ['Ñu negro', '1.200'], ['Ñu azul', '1.200'], ['Eland', '1.800'], ['Waterbuck', '1.800'], ['Sable', 'Consultar']] } },
      { title: 'Incluye', list: ['Lodge de lujo en pensión completa.', 'Bebidas alcohólicas en cantidades razonables.', 'Lavandería diaria.', 'PH y vehículo de caza.', 'Licencia de caza.', 'Primera preparación de trofeos.', 'Traslados desde el aeropuerto.'] },
      { title: 'No incluye', rows: [['Vuelos', 'aprox. 700 €'], ['Tasas de abate de animales adicionales abatidos o heridos y no cobrados', ''], ['Propinas', '50 € / día'], ['Objetos personales', ''], ['Permisos de importación y exportación de arcos', '']] },
      { title: 'Forma de pago', list: ['Depósito de reserva de 500 €. Las reservas se hacen por riguroso orden de recepción.', 'Condiciones de cancelación según outfitter.'] },
      disclaimer,
    ],
  },
};
