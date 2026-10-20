# Initium website

The company website, [initiumtechnologies.com](https://initiumtechnologies.com). Next.js + React, plain CSS, no
backend: `npm run build` turns the source into plain files, and GitHub Pages serves them.

## Run it
```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Needs Node 20 or newer. Never run `npm run build` in the folder where `npm run dev` is running; build a copy
(see [docs/deploy.md](docs/deploy.md)).

## Where things are
| Path | What |
|---|---|
| `app/` | Pages, one folder per address (`app/defense/iris/page.jsx` = `/defense/iris/`), plus `robots.js` and `sitemap.js` |
| `components/` | Building blocks: Nav, Footer, ProductHero, ProductTile, StepTabs, StepCards, CivShot, LocustTerminal, OrinGlobe, SpecTable, LegalPage, Media… |
| `content/` | Every word on the site. Change copy here, never inside a component |
| `app/tokens.css` · `app/globals.css` | Design tokens (colours, type, spacing, durations) · all styling |
| `lib/` | `media.js` finds the file for a media slot at build time; `sat.worker.js` computes satellite positions for the ORIN globe |
| `public/logo/` | Wordmark and `<II>` mark (SVG) |
| `public/media/` | Images and videos, one folder per page. Slots: [docs/media.md](docs/media.md) |
| `public/data/satellites.tle` | Orbit catalogue for the ORIN globe (refresh with `node scripts/update-satellites.mjs`) |
| `public/partners/` · `public/products/` | Redirect pages: `/partners/` to the partner portal; the old site's `/products/…` addresses to the new pages |
| `scripts/` | `update-satellites.mjs` (catalogue refresh) · `shots.py` (screenshots of every page; needs Playwright) |
| `docs/` | [design.md](docs/design.md) (design rules) · [media.md](docs/media.md) (media slots) · [deploy.md](docs/deploy.md) (build, publish, checks) |
| `.github/` | Build-and-deploy workflow, Dependabot, code owners, pull request template |

## Changing things
- **Words:** edit `content/*.js`. Menus and the footer come from `content/site.js`; a product added there appears in
  the nav, the footer and the sitemap.
- **Pictures and videos:** drop a file into `public/media/<page>/` with the slot's name ([docs/media.md](docs/media.md)).
  No code change.
- **Look and layout:** [docs/design.md](docs/design.md) has the rules; tokens live in `app/tokens.css`.
- **Legal pages:** `legal` in `content/company.js`.

## How it gets published
Work happens in branches and pull requests into the source branch. GitHub Actions builds every pull request; a merge
to `main` is built and published to GitHub Pages within a few minutes. Details, the one-time switch to this flow and
the manual fallback: [docs/deploy.md](docs/deploy.md).

## Security
A static site: no accounts, no user data, no third-party scripts. To report a problem, see [SECURITY.md](SECURITY.md).

## Copyright
© Initium Industries, Inc. All rights reserved. See [LICENSE](LICENSE).
