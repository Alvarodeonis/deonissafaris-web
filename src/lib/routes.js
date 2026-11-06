// Rutas generadas por las páginas dinámicas. Las comparten la versión española
// (raíz) y las demás lenguas (src/pages/[lang]/…).
import { allCategories as categories } from '../data/site.js';
import { countries, programs } from '../data/programs.js';
import { groups, activeSpecies, speciesIn } from '../data/species.js';
import { OTHER } from '../i18n/index.js';

export const categoryPaths = () => categories
  .filter((c) => countries(c.slug).length)
  .map((c) => ({ params: { category: c.slug }, props: { cat: c } }));

export const countryPaths = () => categories.flatMap((cat) =>
  countries(cat.slug).map((c) => ({ params: { category: cat.slug, country: c.slug }, props: { cat, c } })));

export const programPaths = () => programs.map((p) => ({
  params: { category: p.category, country: p.country, program: p.slug }, props: { p } }));

export const speciesPaths = () => [
  ...groups.filter((g) => speciesIn(g.slug).length).map((g) => ({ params: { slug: g.slug }, props: { group: g } })),
  ...activeSpecies.map((s) => ({ params: { slug: s.slug }, props: { sp: s } })),
];

// Multiplica unas rutas por los idiomas distintos del español.
export const inLangs = (paths = [{ params: {}, props: {} }]) =>
  OTHER.flatMap((lang) => paths.map((x) => ({ params: { ...x.params, lang }, props: x.props ?? {} })));
