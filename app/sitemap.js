import { site, menus, footer } from '@/content/site';

/* Written to out/sitemap.xml at build time: the home page plus every page reachable from the menus and the footer.
   Pages that are not linked (previews, redirect pages for old addresses) stay out on purpose. */
export const dynamic = 'force-static';

export default function sitemap() {
  const products = [menus.defense, menus.civilian].flatMap((m) =>
    m.categories.flatMap((c) => c.products.map((p) => p.href)),
  );
  const company = menus.company.links.map((l) => l.href).filter((h) => h.startsWith('/'));
  const legal = footer.legal.map((l) => l.href);
  const paths = ['/', ...products, ...company, ...legal];
  return paths.map((p) => ({ url: new URL(p.endsWith('/') ? p : `${p}/`, site.url).href }));
}
