# Initium website

Marketing site for Initium Industries (initiumtechnologies.com). Built from the Initium design system
(the Design System artifact "Initium") and the Initium Website Design Plan in the INITIUM project.

## Source of truth
- Design tokens: app/tokens.css, compiled from the design system's tokens.json. Never hard-code a colour, size or
  duration; add a token there.
- Copy: content/*.js. Never edit copy inside components.
- Logos: public/logo/ (the <II> mark as SVG). The INITIUM wordmark is set in Julius Sans One (the INITIUM font, as on
  the old site and partner.initiumtechnologies.com), centred on the landing page.

## Rules
- Type: Julius Sans One (wordmark + display, weight 400 only), Inter (body), IBM Plex Mono (labels, figures).
- Dark backgrounds are pure black (#000), as on the partner portal. Selected text = white highlight on dark pages.
- Three themes: dark (home), light (products, company, legal), ops (IRIS CIV). The Site component sets data-theme;
  Nav reads it. The Footer is always dark.
- Nav: DEFENSE · CIVILIAN · SPACE in the center (each opens a panel), PARTNER in the top-right corner, words only
  (no +/- icons). Company links live in the footer, not the nav.
- The Nav has no background at rest. The open panel and the bar share one colour (--nav-panel).
- No gradients, shadows, glass, icon libraries, carousels or page-transition effects. Radius 0 except inputs (2px).
- Every image and video is a <Placeholder> with its label until a real asset is dropped into public/media/,
  except the landing hero, which stays plain black (no label) until home-hero.mp4 exists.
- Product names in caps in labels and tiles; normal case in prose. American English in every word of copy.
- Never add "AI" as a selling word; say inference, detection, tracking.
- The Locust Terminal is theatre: no form action, no fetch, no storage, no analytics on its inputs,
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
