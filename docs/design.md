# Design rules

The site is black and white, set in two typefaces, and built from a small set of components.
These rules keep every page consistent. When a rule changes, change it here first, then in the code.

## Type
- **Julius Sans One** (weight 400 only): the INITIUM wordmark, display headings, labels, figures,
  buttons and the Locus Terminal. Julius draws lowercase as small capitals, so mixed-case headings are
  set all lowercase (`text-transform`) and no first letter stands taller. Product names in heroes and
  tiles stay in capitals.
- **Inter**: body text and the nav words (nav: Inter 500, 15 px, 0.08 em tracking, light grey
  `--nav-ink`, white on hover and when open).
- No monospace anywhere.
- Fonts are bundled with the site (`next/font` in `app/layout.jsx`), never fetched at page load, so
  Windows and Mac render the same files. `font-synthesis: none` stops browsers faking weights.
- Check layouts at Windows sizes too: 1280×720, 1366×768, 1536×864 (display scaling makes laptops
  report these widths).

## Colour
- Pure black background (`#000`), white text, neutral greys for muted text and lines. No accent colour
  (the accent token is white). One theme; no per-page themes.
- Two near-black browns are the only exceptions. Grey boxes (step cards, tabs, the Locus Terminal)
  carry a barely visible brown hue and no outline. Set-apart sections sit on an edge-to-edge brown band
  so dark it only shows on close inspection (`.band`, `--band-bg`).
- Mid-grey panels (`.grey`: the IRIS and IRIS CIV descriptions, the IRIS concept cards, IRIS CIV steps
  01–03; `--card-grey-*`) flip the text to dark. The tan `.light` panel (`--card-light-*`) exists but is
  unused.
- Selected text: white highlight, black letters.
- Every colour, size and duration is a token in `app/tokens.css`. Never hard-code one; add a token.

## Lines, surfaces, motion
- Dividers are 3 px light-grey lines (`--rule`), solid end to end, drawn as plain borders
  (no `border-image`: it paints thicker at Windows scaling). Boxes use a solid `--graphite` border.
- A fixed film grain (`.grain`) sits over dark pages.
- Radius 0 everywhere except inputs (2 px), the IRIS spec panel (`--radius-panel`) and the home tiles
  (`--radius-tile`, 4 px).
- No gradients, shadows, glass, icon libraries, carousels (except the IRIS concept-of-operations tabs)
  or page-transition effects.
- Scrollbar: themed (thin graphite thumb on black, `--scrollbar-*`), never the OS one.
- `prefers-reduced-motion`: transforms become opacity changes; animated fields render their final frame.

## Navigation
- `<II>` mark top-left · DEFENSE and CIVILIAN centred · COMPANY top-right. All three are drop-downs:
  Defense = IRIS · MANTIS · ORIN; Civilian = IRIS CIV; Company = Open Roles · Partner Portal.
  Rows show names only. Words only, no icons.
- Phone: mark left, MENU right.
- The bar has no background at rest. Once scrolled it gets translucent black with a blur (`--nav-panel`)
  and no line under it; the drop-down panels share that colour. The bar hides on scroll down and
  returns on scroll up with a slow ease-in-out slide (`--duration-nav`).

## Footer
- INITIUM left, then DEFENSE · CIVILIAN · COMPANY · SOCIAL as four equal columns (`--footer-col`)
  packed at the right edge, titles in bold Inter. The columns are built from the nav menus in
  `content/site.js`, so a product added to a menu appears in both places.
- CONTACT sits under COMPANY, lined up with it, the email on one line.
- Bottom-left: INITIUM INDUSTRIES, INC. · MADE IN AMERICA · Privacy Policy · Terms and Conditions.
  No copyright line and no line along the top of the footer.

## Home
- Landing: the INITIUM wordmark centred, plain black until `public/media/home/hero.mp4` exists.
- Tiles: ORIN tall on the left (the right half of the globe coming in from the left edge, on
  `--orin-tile-bg` `#070707` so it just separates from the page), IRIS then IRIS CIV on the right (7:5),
  MANTIS wide along the bottom (5:2). Tiles show only the product name, have no border and 4 px corners
  (keyboard focus still shows the outline). `zoom` and `focus` in `content/site.js` crop a tile's image.

## Media slots
- Every image and video slot is an empty `<Placeholder>` box (no text) until a real file is dropped
  into `public/media/<page>/`. The slots are listed in [`docs/media.md`](media.md);
  dropping a file needs no code change.
- Convert master videos to `.mp4` before adding them; never commit originals (`.mov` is git-ignored).
- Screenshots of our own software: crop to the application body. Never include the window chrome,
  title bar or address bar.

## Product pages (IRIS, MANTIS, ORIN)
- Full-screen hero image or video behind the product name, the full name and one-liner under it,
  black shades top and bottom for readability.
- Under the hero: a short intro (`intro` in `content/products.js`), or for ORIN and MANTIS the Locus
  Terminal. Key functions are hidden for now (`SHOW_DETAILS` in `components/ProductPage.jsx`).
- MANTIS hero: a screen-recording video; `heroCrop` in `content/products.js` cuts off its top (the
  application's title bars) and the video is pinned to the bottom so its bottom edge shows.
- ORIN hero: `public/media/orin/hero.mp4`. The unlinked, `noindex` preview `/defense/orin/live/`
  shows the live satellite globe instead (`components/OrinGlobe.jsx` + `lib/sat.worker.js`): every
  active satellite in `public/data/satellites.tle`, positions computed live (SGP4) in a web worker,
  a greyscale Earth lit by the real Sun. It falls back to the video without WebGL.

### Locus Terminal
`components/LocustTerminal.jsx`, with one copy of its text (`loginTerminal`) in `content/products.js`.
A grey box (`--terminal-bg`) centred under the ORIN and MANTIS heroes: a slim title bar with the `<II>`
mark, LOG IN TO ACCESS in Julius, ACCESS CODE and PASSWORD input boxes (`--terminal-field`, 2 px radius,
block cursor), a status line and a full-width LOG IN button (`#8b8880`, black text). The heading types
itself out when scrolled into view, then the fields fade in. Enter moves to the next field, then logs in.

It is theatre. No form action, no fetch, no storage, no analytics on its inputs, `autocomplete="off"`.
Every submit shows INVALID DETAILS. Keep it that way.

### IRIS
No intro. Under the hero:
1. **CONCEPT OF OPERATIONS** (`--major` heading; `components/StepTabs.jsx`): tabs Camera Access ·
   Initial Picture · Refinement · Assault (Julius, lowercase) with a line under the active one, over one
   mid-grey card at a time that slides sideways to the chosen tab (scroll-snap, so it swipes; arrow keys
   on the tabs). Card: the tag in caps top-left, the title large in Julius, the image top-right
   (`public/media/iris/step-1…4.*`), a large number bottom-left.
2. **DESCRIPTION** on a `.grey` panel: a large lead, the body under it in grey.
3. **Spec table** (`components/SpecTable.jsx`): a black, folder-shaped panel inset by the page margins
   (`--radius-panel` corners, the caption IRIS RUGGEDIZATION SPECS in a tab rising from its top-left),
   then a compact ruled table parameter · rating · detail, every row `--spec-row` high, alternate rows a
   step browner (`--band-row`), no row numbers, no hover change. The grey runs on down past it.

Copy lives in `iris`, `content/products.js`.

### IRIS CIV
Same hero (subtitle "Interior Reconnaissance and Inference System"), then one story:
1. **The 60-second promise** on black: the 60 in Julius exactly as tall as the three lines beside it
   (the maths is in `globals.css`, `.civ-stat`).
2. **CONCEPT OF OPERATIONS** as four full-width bands (`components/StepCards.jsx`). Bands 01–03 are mid
   grey: a fixed large number top-left, the title in Julius level with the number's top, the text, and
   the image filling the right third (`public/media/iris-civ/step-1…3.*`); a faint 3 px line
   (`--step-sep`) separates them on desktop. Band 04 is black, has no image, and centres its title and
   text. Straight under it sits the interactive officer screen (`components/CivShot.jsx`:
   `public/media/iris-civ/officer-view.jpg` with hover/tap hotspots that auto-play until touched).
3. **DESCRIPTION** on the `.grey` panel, directly after, no black between.

Icons are drawn in `components/CivIcons.jsx` (no icon library). Copy lives in `content/civ.js`.

## Company pages
- No About page (`/company` has no page). Careers (`/company/careers`): one Open roles list, nothing after it.
- Legal pages (`/privacy-policy`, `/terms-and-conditions`): `components/LegalPage.jsx` renders the
  texts in `legal`, `content/company.js`, word for word.
- `/partners/` forwards to partner.initiumtechnologies.com. `public/products/*` are redirect pages for
  the old site's addresses.

## Copy
- All words live in `content/*.js`. Never edit copy inside a component.
- Product names in caps in labels and tiles, normal case in prose. American English throughout.
- Never sell with the word "AI": say inference, detection, tracking.

## Accessibility
WCAG 2.1 AA. Keyboard focus visible everywhere.
