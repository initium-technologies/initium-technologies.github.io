# Initium website

The company site for initiumtechnologies.com. Next.js + React, plain CSS, no backend.
`npm run build` turns it into plain files in `out/`, which GitHub Pages serves.

## Run it
```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Where things are
| Path | What |
|---|---|
| `app/` | Pages, one folder per URL (`app/defense/iris/page.jsx` = `/defense/iris/`) |
| `components/` | Building blocks (Nav, Footer, ProductHero, ProductTile, LocustTerminal, Media…) |
| `content/` | All the words on the site. Change copy here, never inside components |
| `app/tokens.css` · `app/globals.css` | Design tokens (colours, type, spacing) · all styling |
| `public/logo/` | Wordmark and `<II>` mark (SVG) |
| `public/media/` | Images and videos: drop a file with the slot's name in, no code change (see its README) |
| `public/partners/` | Forwards `/partners/` to partner.initiumtechnologies.com |
| `scripts/shots.py` | Screenshots every page at desktop + phone width into `shots/` |
