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
  (the IRIS concept tabs and card, key functions) sit on a brown band from edge to edge so dark it only shows on
  close inspection (`.band`, `--band-bg`), starting just above the section label. Off-white panels (`.light`: the IRIS concept cards; `--card-light-*`) and mid-grey panels (`.grey`: IRIS CIV steps 01, 03, the IRIS and IRIS CIV descriptions;
  `--card-grey-*`), both with a touch of brown, flip the text to dark. One theme, no per-page themes.
  Selected text = white highlight with black letters.
- Nav: <II> mark top-left · DEFENSE and CIVILIAN centred on the page · COMPANY top-right. All three are drop-downs:
  Defense = IRIS · MANTIS · ORIN; Civilian = IRIS CIV; Company = Open Roles · Partner Portal. Rows show names only
  (no Land/Naval/Space/Police labels).
  Words only (no +/- icons). Phone: mark left, MENU right. It hides on scroll down and returns on scroll up with a slow
  ease-in-out slide (--duration-nav).
- Footer: INITIUM left, then DEFENSE · CIVILIAN · COMPANY · SOCIAL as four equal columns (`--footer-col`, so the gaps
  match) packed at the right edge, titles in
  bold Inter (built from the nav menus in content/site.js, so a product added to a menu appears in both); bottom-left
  INITIUM INDUSTRIES, INC. then MADE IN AMERICA then the legal links (no copyright line); CONTACT under COMPANY, lined up
  with it, the email on one line running across toward SOCIAL. No line along the top of the footer.
- Scrollbar: themed, never the OS one: thin graphite thumb on black (`--scrollbar-*` tokens).
- The Nav has no background at rest. The open panel and the bar share one colour (--nav-panel).
- Partner-portal look (partner.initiumtechnologies.com): every divider is a 3px light-grey line (`--border-1`, `--rule` / `--graphite`), solid end to end,
  drawn as a plain border in `--rule` (no border-image: it paints thicker than plain borders at Windows scaling); boxes use a solid `--graphite` border; a fixed film grain
  (`.grain`, dark pages) sits over everything; once scrolled, the nav bar gets translucent black + blur + a faint line.
- Nav words: Inter 500, 15px, 0.08em, light grey (`--nav-ink`), white on hover/open.
- Otherwise no gradients, shadows, glass, icon libraries, carousels (except the IRIS concept-of-operations tabs) or
  page-transition effects. Radius 0 except inputs (2px) and the IRIS spec panel (`--radius-panel`).
- Every image and video slot is an empty <Placeholder> box (no text inside) until a real file is dropped into
  public/media/<page>/ (one folder per page, slots listed in public/media/README.md); the landing hero stays plain
  black until home/hero.mp4 exists. Tiles show only the product name.
- Product pages (IRIS, MANTIS, ORIN): full-screen hero image/video behind the name, the full name + one-liner under
  the name, black shades top and bottom for readability; then a short intro text (`intro` in content/products.js;
  MANTIS). Key functions are hidden for now (`SHOW_DETAILS` in components/ProductPage.jsx); ORIN keeps its Locus
  Terminal. ORIN's hero is the ORIN Hero video (public/media/orin/hero.mp4). Preview /defense/orin/live/ (not linked, noindex)
  has the live 3D satellite globe instead (components/OrinGlobe.jsx + lib/sat.worker.js, three.js + satellite.js):
  every active satellite from public/data/satellites.tle, positions computed live (SGP4) in a worker; greyscale NASA
  Earth (public/media/orin/earth-day.jpg, earth-night.jpg) lit by the real Sun. Refresh the catalogue every few days:
  `node scripts/update-satellites.mjs` (CelesTrak: max one download per 2 hours). Falls back to the video without WebGL.
- IRIS: no intro; under the hero (subtitle "A full interior picture for the operator, before engagement.") come
  CONCEPT OF OPERATIONS (a large white heading, `--major`; tabs and card on the brown band; components/StepTabs.jsx, after Anduril's Fury build-qualities block: tabs Camera Access · Initial Picture ·
  Refinement · Assault (Julius, lowercase so every letter is the same size) with a line under the active one, over one off-white card at a time that slides sideways to the chosen tab
  (scroll-snap, so it swipes too; arrow keys on the tabs); card: the tag in caps in the top-left corner, the title large in Julius (close to the left edge; no 01 / 04), the image
  top right (public/media/iris/step-1…4.*), a large number bottom left; titles only), DESCRIPTION (mid-grey `.grey` panel; large lead, body set
  in from the right, grey) and the spec table (the grey runs on down past it; the table sits in a black panel inset by
  the page margins, shaped like a folder: rounded corners (`--radius-panel`, the one exception to radius 0 besides
  inputs) and the caption in a tab rising from its top-left, the tab's foot curving out into the panel's edge; dark-page
  colours inside (`--box-rule`, `--box-line`); components/SpecTable.jsx: the caption IRIS
  RUGGEDIZATION SPECS in the tab, larger white Julius caps, as its heading; the black margin is the same above the
  table (from the caption's baseline), at its sides and below it, no other label or count, then a compact ruled table, parameter, rating, detail,
  every row the same height (`--spec-row`) and the header in the same 12px caps as the parameters, every other row a
  minuscule step browner (`--band-row`); no row numbers; rows do not change on hover).
  All copy in `iris` in content/products.js.
- IRIS CIV: same hero (subtitle "Interior Reconnaissance and Inference System", no "Civilian"), then one story:
  60-second promise (on the brown `--band-bg`, equal space above and below; the 60 in Julius like the step numbers, exactly as tall as the three fixed lines beside it, cap top to baseline;
  the maths is in globals.css .civ-stat) · CONCEPT OF OPERATIONS (large white heading; components/StepCards.jsx: the 4 steps as full-width
  bands touching edge to edge, after Anduril's build-qualities cards, alternating mid grey (01, 03: `--card-grey-*`, a
  touch of brown, dark text) and black (02, 04): a large number at the top left (fixed, it does not move on scroll)
  with its time under it (0–5, 5–10, 10–60 seconds; `time` in content/civ.js), the step title in Julius, its text,
  and the image filling the right part of the band to its top, bottom and the page's right edge, about a third of the
  width (public/media/iris-civ/step-1…3.*; plain black until then); bands 01–03 are as tall as the tallest (grid rows
  1fr). Band 04 (The live picture is available) has no text: under its title, full width, the interactive officer screen
  (StepCards `last`: components/CivShot.jsx, the "Hover over a point to explore" line, a real IRIS CIV screen
  `public/media/iris-civ/officer-view.jpg` with hover/tap hotspots that auto-play until touched; never publish the
  app's top bar: it shows the server address); the band runs a little past the screen). DESCRIPTION follows directly on the mid-grey `.grey` panel (as IRIS's), no
  black between (placeholder
  lorem ipsum in `description` in content/civ.js). No pillars, use cases or closing statement. Icons are drawn in components/CivIcons.jsx (no icon library); copy in
  content/civ.js.
- No About page (removed; /company has no page). Careers (/company/careers): one Open roles list (now just Perception
  engineering), nothing after it.
- Home tiles: ORIN tall on the left (the right half of the globe, coming in from the left edge, on pure black), IRIS then IRIS CIV on the right (7:5), MANTIS wide along the
  bottom (5:2). Tiles can zoom their image (`zoom`, `focus` in content/site.js); IRIS is zoomed and centred on the unit.
- Drop-down panels are see-through black with a blur (--nav-panel), like the scrolled bar.
- Product names in caps in labels and tiles; normal case in prose. American English in every word of copy.
- Never add "AI" as a selling word; say inference, detection, tracking.
- The Locus Terminal (components/LocustTerminal.jsx, after initiumterminal.com) is a grey box (`--terminal-bg`, brown-tinted,
  no outer border) centred under ORIN's hero: a slim title bar (INITIUM), the LOG IN TO
  ACCESS heading in Julius, ACCESS CODE and PASSWORD as labelled input boxes (`--terminal-field`, 2px radius, block
  cursor), the status line, a full-width white LOG IN button. Nothing under the box. No NODE / LINK lines, no green. The heading types itself out when scrolled into view, then the
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
