# Initium website

Marketing site for Initium Industries (initiumtechnologies.com). Built from the Initium design system
(the Design System artifact "Initium") and the Initium Website Design Plan in the INITIUM project.

## Source of truth
- Design tokens: app/tokens.css (one theme; edited directly now). Never hard-code a colour, size or duration; add a
  token there.
- Copy: content/*.js. Never edit copy inside components.
- Logos: public/logo/ (the <II> mark as SVG). The INITIUM wordmark is set in Julius Sans One (the INITIUM font, as on
  the old site and partner.initiumtechnologies.com), centred on the landing page.

## Rules
- Type: Julius Sans One (wordmark + display, weight 400 only), Inter (body), IBM Plex Mono (labels, figures).
- Black and white only, on every page: background pure black (#000), text white, neutral greys for muted text and
  lines. No colour anywhere (no red/orange accent; the accent token is white), except the Locus Terminal's green
  OPERATIONAL / ENCRYPTED. One theme, no per-page themes.
  Selected text = white highlight with black letters.
- Nav: <II> mark top-left · DEFENSE and CIVILIAN centred on the page · COMPANY top-right. All three are drop-downs:
  Defense = IRIS · MANTIS · ORIN; Civilian = IRIS CIV; Company = About · Open Roles · Partner Portal. Rows show names only
  (no Land/Naval/Space/Police labels).
  Words only (no +/- icons). Phone: mark left, MENU right. It hides on scroll down and returns on scroll up with a slow
  ease-in-out slide (--duration-nav).
- Footer: INITIUM left, then DEFENSE · CIVILIAN · COMPANY · SOCIAL packed close together at the right edge, titles in
  bold Inter (built from the nav menus in content/site.js, so a product added to a menu appears in both); bottom-left
  INITIUM INDUSTRIES, INC. then MADE IN AMERICA then the legal links (no copyright line); CONTACT under SOCIAL, lined up
  with it, the email split over two lines (admin@initium / technologies.com).
- Scrollbar: themed, never the OS one: thin graphite thumb on black (`--scrollbar-*` tokens).
- The Nav has no background at rest. The open panel and the bar share one colour (--nav-panel).
- Partner-portal look (partner.initiumtechnologies.com): every divider is a 1px faint line that fades out at both ends
  (border + `border-image: var(--rule-h)` / `var(--rule-v)`); boxes use a solid `--graphite` border; a fixed film grain
  (`.grain`, dark pages) sits over everything; once scrolled, the nav bar gets translucent black + blur + a faded line.
- Nav words: Inter 500, 13px, 0.08em, light grey (`--nav-ink`), white on hover/open.
- Otherwise no gradients, shadows, glass, icon libraries, carousels or page-transition effects. Radius 0 except inputs (2px).
- Every image and video slot is an empty <Placeholder> box (no text inside) until a real file is dropped into
  public/media/<page>/ (one folder per page, slots listed in public/media/README.md); the landing hero stays plain
  black until home/hero.mp4 exists. Tiles show only the product name.
- Product pages (IRIS, MANTIS, ORIN): full-screen hero image/video behind the name, the full name + one-liner under
  the name, black shades top and bottom for readability; then a short intro text (`intro` in content/products.js).
  Key functions are hidden for now (`SHOW_DETAILS` in components/ProductPage.jsx); ORIN keeps its Locus Terminal.
  ORIN's hero is the ORIN Hero video (public/media/orin/hero.mp4).
- IRIS CIV: same hero, then one story: 60-second promise · How it works (4 steps with line icons, bracket over 01–03;
  white sand grains rise out of each icon and stream along the line to the next, components/CivFlowSand.jsx, a
  still frame with reduced motion) ·
  What every officer sees (a real IRIS CIV screen, `public/media/iris-civ/officer-view.jpg`, with hover/tap hotspots in
  components/CivShot.jsx that auto-play until touched;
  never publish the app's top bar: it shows the server address) · Why police use it · Use cases · closing statement. Icons are drawn in
  components/CivIcons.jsx (no icon library); copy in content/civ.js.
- About (/company): plain black hero behind the headline for now (a video will go in public/media/company/hero.*), then the text and contact (no
  leadership portraits). Careers: one Open roles list (no future roles).
- Home tiles: ORIN tall on the left (the right half of the globe, coming in from the left edge, on pure black), IRIS then IRIS CIV on the right (7:5), MANTIS wide along the
  bottom (5:2). Tiles can zoom their image (`zoom`, `focus` in content/site.js); IRIS is zoomed and centred on the unit.
- Drop-down panels are see-through black with a blur (--nav-panel), like the scrolled bar.
- Product names in caps in labels and tiles; normal case in prose. American English in every word of copy.
- Never add "AI" as a selling word; say inference, detection, tracking.
- The Locus Terminal (components/LocustTerminal.jsx, after initiumterminal.com) is a box (solid `--graphite` border)
  centred under ORIN's intro: INITIUM LOCUS TERMINAL, NODE … OPERATIONAL, LINK … ENCRYPTED, then ACCESS CODE
  and PASSWORD prompts with a block cursor (Enter moves on, then signs in). It boots line by line when scrolled into
  view (final frame with reduced motion). Its status words are green (`--terminal-ok`, as on initiumterminal.com):
  the one exception to black and white.
- The Locus Terminal is theatre: no form action, no fetch, no storage, no analytics on its inputs,
  autocomplete="off". Every submit shows INVALID DETAILS.
- Respect prefers-reduced-motion: transforms become opacity; dot fields render their final frame.
- Accessibility: WCAG 2.1 AA; keyboard focus visible everywhere.

## Build and hosting
- Static export (`output: 'export'` in next.config.mjs): `npm run build` writes plain files to out/ for GitHub Pages.
  No server features: no redirects/headers in next.config, no API routes, no runtime image optimisation.
- Work happens on the `new-site` branch; `main` is the live site and is not touched until the new site is ready.

## Workflow
- Build one component at a time; after each route run `npm run build`, then the screenshot script
  (scripts/shots.py) and look at the output in shots/.
