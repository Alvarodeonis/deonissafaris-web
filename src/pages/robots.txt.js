// robots.txt: la vista previa (github.io) no se indexa; la web real enlaza su sitemap.
export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const preview = /github\.io/.test(site?.host ?? '');
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: ${base}search.json\n\nSitemap: ${new URL(`${base}sitemap.xml`, site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
