import { programs, programUrl, countries, isCurrent, fromPrice, money } from '../data/programs.js';
import { allCategories as categories } from '../data/site.js';
import { activeSpecies, groups, speciesIn, speciesUrl, groupUrl, speciesCover, countriesOfSpecies } from '../data/species.js';

// Índice del buscador de la cabecera: se descarga la primera vez que se abre la lupa.
export function GET() {
  const items = [];
  for (const g of groups) if (speciesIn(g.slug).length) items.push({ t: 'e', n: g.title, s: `${speciesIn(g.slug).length} especies`, h: groupUrl(g), i: speciesCover(speciesIn(g.slug)[0]), k: speciesIn(g.slug).map((s) => s.name).join(' ') });
  for (const s of activeSpecies) items.push({ t: 'e', n: s.name, s: `${countriesOfSpecies(s)} países · ${s.programs.length} programas`, h: speciesUrl(s), i: speciesCover(s), k: `${s.re.source.replace(/[\\|()?.*+\[\]^$]/g, ' ')} ${s.intro}` });
  for (const c of categories) {
    const list = countries(c.slug);
    if (!list.length) continue;
    items.push({ t: 'c', n: c.title, s: `${list.length} países`, h: c.slug, i: list[0].programs[0].hero, k: '' });
    for (const k of list) items.push({ t: 'p', n: k.name, s: `${c.title} · ${k.programs.length} programas`, h: `${c.slug}/${k.slug}`, i: (k.programs.find((p) => p.gallery?.length) ?? k.programs[0]).hero, k: k.programs.map((p) => p.title).join(' ') });
  }
  for (const p of programs) {
    const from = fromPrice(p);
    items.push({ t: 'g', n: p.title, s: [p.countryName, p.category === 'caza-con-arco' ? 'con arco' : '', from ? `desde ${money(from.amount, from.currency)}` : ''].filter(Boolean).join(' · '), h: programUrl(p), i: p.hero, k: `${p.countryName} ${(p.summary ?? '').slice(0, 400)}`, o: isCurrent(p) ? 0 : 1 });
  }
  for (const [n, h, k] of [['Fotos', 'fotos', 'galería imágenes trofeos'], ['Películas', 'videos', 'vídeos youtube'], ['Artículos y revistas', 'articulos-revistas', 'prensa'], ['Sobre nosotros', 'sobre-nosotros', 'equipo quiénes somos'], ['Contacto', 'contacto', 'teléfono email whatsapp oficina']])
    items.push({ t: 'w', n, s: 'Página', h, k });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
