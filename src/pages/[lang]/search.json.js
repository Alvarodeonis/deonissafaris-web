// Índice del buscador en otro idioma: el mismo contenido; los textos se traducen tras la compilación.
import { inLangs } from '../../lib/routes.js';
export { GET } from '../search.json.js';
export const getStaticPaths = () => inLangs();
