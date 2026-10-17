export const site = {
  name: 'Initium',
  company: 'Initium Technologies',
  legalName: 'Initium Industries, Inc.',
  tagline: 'Edge compute for mission-critical sensing.',
  email: 'admin@initiumtechnologies.com',
  url: 'https://initiumtechnologies.com',
  social: {
    x: 'https://x.com/',
    linkedin: 'https://www.linkedin.com/',
  },
};

export const menus = {
  defense: {
    label: 'Defense',
    title: 'Defense Products',
    summary:
      'A suite of systems built around one principle: the compute that runs the mission sits with the operator, aboard the ship or in orbit, never in a data center that can be cut off or hit. Each product runs inference where the data is collected and sends on only what matters.',
    categories: [
      { label: 'Land', products: [{ name: 'IRIS', href: '/defense/iris' }] },
      { label: 'Naval', products: [{ name: 'MANTIS', href: '/defense/mantis' }] },
      { label: 'Space', products: [{ name: 'ORIN', href: '/defense/orin' }] },
    ],
  },
  civilian: {
    label: 'Civilian',
    title: 'Civilian Products',
    summary:
      'The same systems proven with U.S. Special Operations breach teams, now cleared for police response and for the facilities they protect. Provided to responding agencies at no cost.',
    categories: [{ label: 'Police', products: [{ name: 'IRIS CIV', href: '/civilian/iris-civ' }] }],
  },
};

export const footer = {
  groups: [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/company' },
        { name: 'Open Roles', href: '/company/careers' },
        /* The partner site, same tab. */
        { name: 'Partner', href: 'https://partner.initiumtechnologies.com/' },
      ],
    },
    {
      title: 'Social',
      links: [
        { name: 'X', href: site.social.x, external: true },
        { name: 'LinkedIn', href: site.social.linkedin, external: true },
      ],
    },
  ],
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
    { key: 'iris', media: 'iris', name: 'IRIS', category: 'Land', subtitle: 'FOR THE OPERATOR', href: '/defense/iris', label: 'IMAGE · IRIS TILE · 7:5' },
    { key: 'mantis', media: 'mantis', name: 'MANTIS', category: 'Naval', subtitle: 'NAVAL SOVEREIGNTY', href: '/defense/mantis', label: 'IMAGE · MANTIS TILE · 7:5' },
    { key: 'civ', media: 'iris-civ', name: 'IRIS CIV', category: 'Police', subtitle: 'POLICE TOTAL RESPONSE', href: '/civilian/iris-civ', label: 'IMAGE · IRIS CIV TILE · 5:2' },
  ],
};
