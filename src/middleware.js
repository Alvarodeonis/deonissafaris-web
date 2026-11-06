import { setLang, langFromPath } from './i18n/index.js';
export const onRequest = (ctx, next) => { setLang(langFromPath(ctx.url.pathname)); return next(); };
