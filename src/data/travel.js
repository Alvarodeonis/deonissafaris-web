// Gastos que no dependen de nosotros, para orientar al cliente en el simulador.
// Vuelos: ida y vuelta desde Madrid en clase turista, por persona, en euros (orientativo).
// Propinas: recomendación por cazador y día de caza, en euros (orientativo).
export const travel = {
  mozambique: { route: 'Madrid – Beira (vía Johannesburgo)', flight: [1200, 1800], tipsDay: [60, 100] },
  namibia: { route: 'Madrid – Windhoek', flight: [900, 1400], tipsDay: [50, 80] },
  sudafrica: { route: 'Madrid – Johannesburgo', flight: [800, 1300], tipsDay: [50, 80] },
  kazakhstan: { route: 'Madrid – Almaty', flight: [600, 1000], tipsDay: [40, 70] },
  turquia: { route: 'Madrid – Estambul / Antalya', flight: [200, 450], tipsDay: [30, 60] },
  macedonia: { route: 'Madrid – Skopie', flight: [200, 450], tipsDay: [30, 50] },
  groenlandia: { route: 'Madrid – Kangerlussuaq / Narsarsuaq (vía Copenhague)', flight: [1400, 2200], tipsDay: [40, 70] },
  australia: { route: 'Madrid – Darwin', flight: [1500, 2500], tipsDay: [50, 80] },
};
