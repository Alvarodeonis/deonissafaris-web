// Construye rutas internas respetando el `base` (la vista previa vive en /<repo>/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p = '') => `${base}/${p}`.replace(/\/+$/, '') || '/';
