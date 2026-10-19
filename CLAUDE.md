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
- Type: Julius Sans One (wordmark + display, weight 400 only; Julius draws lowercase as smaller capitals, so mixed-case
  Julius is set all lowercase (text-transform) and no first letter stands taller; product names in the hero and tiles
  stay in capitals), Inter (body). No monospace font
  anywhere: labels, figures, buttons and the Locus Terminal are in Julius (`.label`). The fonts
  are bundled with the site (next/font in app/layout.jsx), never fetched from Google at page load, so Windows and Mac
  get the same files; `font-synthesis: none` stops browsers faking weights. Check layouts at Windows sizes too
  (1280×720, 1366×768, 1536×864: Windows scales the display, so laptops report these widths).
- Black and white on every page: background pure black (#000), text white, neutral greys for muted text and
  lines. No colour (no red/orange accent; the accent token is white), except two near-black browns: grey boxes
  (step cards and tabs, the Locus Terminal) carry a barely visible brown hue and no outline, and set-apart sections
  (key functions) sit on a brown band from edge to edge so dark it only shows on
  close inspection (`.band`, `--band-bg`), starting just above the section label. Mid-grey panels (`.grey`: the IRIS and IRIS CIV descriptions, the IRIS concept cards and IRIS CIV steps 01–03, all one colour;
  `--card-grey-*`; tan `.light`, #bdad96, `--card-light-*`, is kept but unused), with a touch of brown, flip the text to dark. One theme, no per-page themes.
  Selected text = white highlight with black letters.
- Nav: <II> mark top-left · DEFENSE and CIVILIAN centred on the page · COMPANY top-right. All three are drop-downs:
  Defense = IRIS · MANTIS · ORIN; Civilian = IRIS CIV; Company = Open Roles · Partner Portal. Rows show names only
  (no Land/Naval/Space/Police labels).
  Words only (no +/- icons). Phone: mark left, MENU right. It hides on scroll down and returns on scroll up with a slow
  ease-in-out slide (--duration-nav).
- Footer: INITIUM left, then DEFENSE · CIVILIAN · COMPANY · SOCIAL as four equal columns (`--footer-col`, so the gaps
  match) packed at the right edge, titles in
  bold Inter (built from the nav menus in content/site.js, so a product added to a menu appears in both); bottom-left
  INITIUM INDUSTRIES, INC. then MADE IN AMERICA then the legal links, Privacy Policy and Terms and Conditions (/privacy-policy, /terms-and-conditions: the Termify texts from
  Privacy_Policy.pdf and Terms_And_Conditions.pdf word for word in `legal` in content/company.js, components/LegalPage.jsx;
  no copyright line; no modern slavery policy); CONTACT under COMPANY, lined up
  with it, the email on one line running across toward SOCIAL. No line along the top of the footer.
- Scrollbar: themed, never the OS one: thin graphite thumb on black (`--scrollbar-*` tokens).
- The Nav has no background at rest. The open panel and the bar share one colour (--nav-panel).
- Partner-portal look (partner.initiumtechnologies.com): every divider is a 3px light-grey line (`--border-1`, `--rule` / `--graphite`), solid end to end,
  drawn as a plain border in `--rule` (no border-image: it paints thicker than plain borders at Windows scaling); boxes use a solid `--graphite` border; a fixed film grain
  (`.grain`, dark pages) sits over everything; once scrolled, the nav bar gets translucent black + blur + a faint line.
- Nav words: Inter 500, 15px, 0.08em, light grey (`--nav-ink`), white on hover/open.
- Otherwise no gradients, shadows, glass, icon libraries, carousels (except the IRIS concept-of-operations tabs) or
  page-transition effects. Radius 0 except inputs (2px), the IRIS spec panel (`--radius-panel`) and the home tiles (`--radius-tile`, 4px).
- Every image and video slot is an empty <Placeholder> box (no text inside) until a real file is dropped into
  public/media/<page>/ (one folder per page, slots listed in public/media/README.md); the landing hero stays plain
  black until home/hero.mp4 exists. Tiles show only the product name.
- Product pages (IRIS, MANTIS, ORIN): full-screen hero image/video behind the name, the full name + one-liner under
  the name, black shades top and bottom for readability; then a short intro text (`intro` in content/products.js;
  MANTIS; its hero is the MANTIS backdrop video, public/media/mantis/hero.mp4, a screen recording: `heroCrop` in content/products.js
  cuts its top (the app's title bars) off above the header, and the video is pinned to the bottom so its bottom edge shows). Key functions are hidden for now (`SHOW_DETAILS` in components/ProductPage.jsx); ORIN and MANTIS have the Locus
  Terminal login box under the hero instead of any text. ORIN's hero is the ORIN Hero video (public/media/orin/hero.mp4). Preview /defense/orin/live/ (not linked, noindex)
  has the live 3D satellite globe instead (components/OrinGlobe.jsx + lib/sat.worker.js, three.js + satellite.js):
  every active satellite from public/data/satellites.tle, positions computed live (SGP4) in a worker; greyscale NASA
  Earth (public/media/orin/earth-day.jpg, earth-night.jpg) lit by the real Sun. Refresh the catalogue every few days:
  `node scripts/update-satellites.mjs` (CelesTrak: max one download per 2 hours). Falls back to the video without WebGL.
- IRIS: no intro; under the hero (subtitle "A full interior picture for the operator, before engagement.") come
  CONCEPT OF OPERATIONS (a large white heading, `--major`; tabs and card on black; components/StepTabs.jsx, after Anduril's Fury build-qualities block: tabs Camera Access · Initial Picture ·
  Refinement · Assault (Julius, lowercase so every letter is the same size) with a line under the active one, over one mid-grey card at a time that slides sideways to the chosen tab
  (scroll-snap, so it swipes too; arrow keys on the tabs); card: the tag in caps in the top-left corner, the title large in Julius (close to the left edge; no 01 / 04), the image
  top right (public/media/iris/step-1…4.*), a large number bottom left; titles only), DESCRIPTION (mid-grey `.grey` panel; large lead, body under
  it at the left margin, grey) and the spec table (the grey runs on down past it; the table sits in a black panel inset by
  the page margins, shaped like a folder: rounded corners (`--radius-panel`, the one exception to radius 0 besides
  inputs) and the caption in a tab rising from its top-left, the tab's foot curving out into the panel's edge; dark-page
  colours inside, the panel almost black but a step lighter than the footer (`--spec-panel-bg`, rows `--spec-panel-row`) (`--box-rule`, `--box-line`); components/SpecTable.jsx: the caption IRIS
  RUGGEDIZATION SPECS in the tab, larger white Julius caps, as its heading; the black margin is the same above the
  table (from the caption's baseline), at its sides and below it, no other label or count, then a compact ruled table, parameter, rating, detail,
  every row the same height (`--spec-row`) and the header in the same 12px caps as the parameters, every other row a
  minuscule step browner (`--band-row`); no row numbers; rows do not change on hover).
  All copy in `iris` in content/products.js.
- IRIS CIV: same hero (the officers photo, public/media/iris-civ/hero.jpg; subtitle "Interior Reconnaissance and Inference System", no "Civilian"), then one story:
  60-second promise (on black, equal space above and below, the concept of operations heading close under it; the 60 in Julius like the step numbers, exactly as tall as the three fixed lines beside it, cap top to baseline;
  the maths is in globals.css .civ-stat) · CONCEPT OF OPERATIONS (large white heading; components/StepCards.jsx: the 4 steps as full-width
  bands touching edge to edge, after Anduril's build-qualities cards, mid grey (01–03: `--card-grey-*`, the
  description colour, dark text; on desktop a faint 3px line (`--step-sep`) between them from the page's left edge to the
  image) and black (04): a large number at the top left (fixed, it does not move on scroll)
  (no time under it: StepCards still takes an optional `time`, which starts where the 0 is drawn and, on desktop, sits
  halfway between the foot of the number and the foot of the band), the step title in Julius (desktop: the tops of its letters level with the top of the number), its text,
  and the image filling the right part of the band to its top, bottom and the page's right edge, about a third of the
  width (public/media/iris-civ/step-1…3.*; plain black until then); bands 01–03 are as tall as the tallest (grid rows
  1fr). Band 04 (The live picture is available; text: See what IRIS puts on an officer’s phone the second they breach a building.) has no
  image and is as tall as the others (desktop; its title and text centred across the page); straight under the band, centred on the page at the width of the bands'
  text column, the interactive officer screen (StepCards `last`: components/CivShot.jsx, a real IRIS CIV screen
  `public/media/iris-civ/officer-view.jpg` with hover/tap hotspots that auto-play until touched; never publish the
  app's top bar: it shows the server address), with black under it). DESCRIPTION follows directly on the mid-grey `.grey` panel (as IRIS's), no
  black between (lead and text in `description` in content/civ.js, the text on the left under the lead). No pillars, use cases or closing statement. Icons are drawn in components/CivIcons.jsx (no icon library); copy in
  content/civ.js.
- No About page (removed; /company has no page). Careers (/company/careers): one Open roles list (now just ML/Computer Vision
  Engineer), nothing after it.
- Home tiles: ORIN tall on the left (the right half of the globe, coming in from the left edge, on pure black), IRIS then IRIS CIV on the right (7:5), MANTIS wide along the
  bottom (5:2). Tiles can zoom their image (`zoom`, `focus` in content/site.js); IRIS is zoomed and centred on the unit. Tiles have no border and just-rounded corners (4px, `--radius-tile`; keyboard focus still shows the focus outline). The ORIN tile's black is lifted a hair
  (`--orin-tile-bg`, #070707) so it just separates from the page.
- Drop-down panels are see-through black with a blur (--nav-panel), like the scrolled bar.
- Product names in caps in labels and tiles; normal case in prose. American English in every word of copy.
- Never add "AI" as a selling word; say inference, detection, tracking.
- The Locus Terminal (components/LocustTerminal.jsx, after initiumterminal.com; ORIN and MANTIS, one copy `loginTerminal` in
  content/products.js) is a grey box (`--terminal-bg`, brown-tinted,
  no outer border) centred under the ORIN and MANTIS heroes: a slim title bar (the <II> mark), the LOG IN TO
  ACCESS heading in Julius, ACCESS CODE and PASSWORD as labelled input boxes (`--terminal-field`, 2px radius, block
  cursor), the status line, a full-width LOG IN button (#8b8880, black text). Nothing under the box. No NODE / LINK lines, no green. The heading types itself out when scrolled into view, then the
  fields fade in (final frame with reduced motion). Enter moves to the next field, then logs in.
- The Locus Terminal is theatre: no form action, no fetch, no storage, no analytics on its inputs,
  autocomplete="off". Every submit shows INVALID DETAILS.
- Respect prefers-reduced-motion: transforms become opacity; dot fields render their final frame.
- Accessibility: WCAG 2.1 AA; keyboard focus visible everywhere.

## Build and hosting
- Static export (`output: 'export'` in next.config.mjs): `npm run build` writes plain files to out/ for GitHub Pages.
  Don't run `npm run build` in this folder while `npm run dev` is running (they share .next and the preview breaks):
  build a copy elsewhere (rsync without node_modules/.next, symlink node_modules) to check a production build.
  No server features: no redirects/headers in next.config, no API routes, no runtime image optimisation.
- Work happens on the `new-site` branch; `main` is the live site and is not touched until the new site is ready.

## Workflow
- Build one component at a time; after each route run `npm run build`, then the screenshot script
  (scripts/shots.py) and look at the output in shots/.
