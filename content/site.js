export const site = {
  name: 'Initium',
  company: 'Initium Technologies',
  legalName: 'Initium Industries, Inc.',
  tagline: 'Edge compute for mission-critical sensing.',
  email: 'admin@initiumtechnologies.com',
  url: 'https://initiumtechnologies.com',
  social: {
    x: 'https://x.com/initium_tech',
    linkedin: 'https://www.linkedin.com/company/initiumtech/',
  },
};

export const menus = {
  defense: {
    label: 'Defense',
    title: 'Defense Products',
    summary:
      'A suite of systems built to afford software capabilities to the warfighter in any environment, without latency, reachback, or reliance on vulnerable infrastructure.',
    categories: [
      { label: 'Land', products: [{ name: 'IRIS', href: '/defense/iris' }] },
      { label: 'Naval', products: [{ name: 'MANTIS', href: '/defense/mantis' }] },
      { label: 'Space', products: [{ name: 'ORIN', href: '/defense/orin' }] },
    ],
  },
  civilian: {
    label: 'Civilian',
    title: 'Civilian Products',
    summary: 'The same platforms developed for U.S. Special Operations, reformatted for use in civilian security.',
    categories: [{ label: 'Police', products: [{ name: 'IRIS CIV', href: '/civilian/iris-civ' }] }],
  },
  /* Top-right drop-down; the same links make the footer's Company column. */
  company: {
    label: 'Company',
    title: 'Company',
    summary: 'Initium Technologies builds edge compute for mission-critical sensing, from Mountain View, California.',
    links: [
      { name: 'Open Roles', href: '/company/careers' },
      /* The partner site, same tab. */
      { name: 'Partner Portal', href: 'https://partner.initiumtechnologies.com/' },
    ],
  },
};

/* Every product in a menu, in menu order, as footer links. */
const productLinks = (m) => m.categories.flatMap((c) => c.products.map((p) => ({ name: p.name, href: p.href })));



export const footer = {
  /* Left to right; Company and Social sit at the right edge. */
  groups: [
    { title: 'Defense', links: productLinks(menus.defense) },
    { title: 'Civilian', links: productLinks(menus.civilian) },
    { title: 'Company', links: menus.company.links },
    {
      title: 'Social',
      links: [
        { name: 'LinkedIn', href: site.social.linkedin, external: true },
        { name: 'X', href: site.social.x, external: true },
      ],
    },
  ],
  /* Bottom-left, under the legal name and above the legal links. */
  madeIn: 'Made in America',
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Modern Slavery Policy', href: '/modern-slavery-policy' },
  ],
};

export const home = {
  /* The original wordmark, centred on the landing page. */
  heroMark: 'INITIUM',
  /* Phase 1: black. Phase 2: public/media/home-hero.mp4, IRIS in action. */
  heroMediaLabel: 'VIDEO · IRIS IN ACTION · 16:9',
  /* `media` is the file name stem in public/media (e.g. orin-tile.jpg). */
  tiles: [
    { key: 'orin', media: 'orin', name: 'ORIN', category: 'Space', subtitle: 'SATELLITE SOVEREIGNTY', href: '/defense/orin', label: 'IMAGE · ORIN TILE · 2:3' },
    { key: 'iris', media: 'iris', name: 'IRIS', category: 'Land', subtitle: 'FOR THE OPERATOR', href: '/defense/iris', label: 'IMAGE · IRIS TILE · 7:5',
      /* Zoomed in on the IRIS unit, centred in the tile. */
      zoom: 1.3, focus: '50% 48%' },
    { key: 'civ', media: 'iris-civ', name: 'IRIS CIV', category: 'Police', subtitle: 'POLICE TOTAL RESPONSE', href: '/civilian/iris-civ', label: 'IMAGE · IRIS CIV TILE · 7:5' },
    { key: 'mantis', media: 'mantis', name: 'MANTIS', category: 'Naval', subtitle: 'NAVAL SOVEREIGNTY', href: '/defense/mantis', label: 'IMAGE · MANTIS TILE · 5:2' },
  ],
};
