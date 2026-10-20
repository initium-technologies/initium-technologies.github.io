# Images and videos

One folder per page under `public/media/`. Drop a file in with the name below and it appears on that page; no code change.
Until a file exists, its spot is an empty box (or plain black for the landing hero).

- **Images:** `.jpg`, `.png`, `.webp` or `.avif`. About 2000 px on the long side is plenty.
- **Videos:** `.mp4` (H.264) or `.webm`, muted and looping. Aim for about 2 MB and stay under 4 MB (1600 px wide, H.264 CRF 28–30, no audio track).
- The name is what matters, not the extension: `hero.jpg` and `hero.mp4` both fill the `hero` slot (video wins if both exist).

| Folder | File name | Where it shows | Shape |
|---|---|---|---|
| `home/` | `hero` | Landing page, full screen behind INITIUM | 16:9 |
| `home/` | `orin-tile` | Landing page, ORIN tile (tall, left) | 5:7 |
| `home/` | `iris-tile` | Landing page, IRIS tile | 7:5 |
| `home/` | `iris-civ-tile` | Landing page, IRIS CIV tile (right, under IRIS) | 7:5 |
| `home/` | `mantis-tile` | Landing page, MANTIS tile (wide, bottom) | 5:2 |
| `iris/` | `hero` | IRIS page, full screen behind the name | 16:9 |
| `iris/` | `1`, `2`, `3` | IRIS page, key functions 01–03 | 4:5 |
| `iris/` | `step-1` … `step-4` | IRIS page, Concept of operations cards 01–04 (right side of each card) | 16:9 |
| `mantis/` | `hero` | MANTIS page, full screen behind the name | 16:9 |
| `mantis/` | `1`, `2`, `3` | MANTIS page, key functions 01–03 | 4:5 |
| `orin/` | `hero` | ORIN page, full screen behind the name (ORIN Hero video, 14 s) | 16:9 |
| `orin/` | `earth-day`, `earth-night` | Textures for the live satellite globe (NASA Blue Marble / Black Marble, greyscale, 4096×2048) | 2:1 |
| `iris-civ/` | `hero` | IRIS CIV page, full screen behind the name | 16:9 |
| `iris-civ/` | `step-1` … `step-3` | IRIS CIV page, Concept of operations cards 01–03 (right side of each card; 04 holds the officer screen) | 16:9 |

Examples: `home/iris-tile.jpg`, `iris/2.jpg`, `mantis/hero.mp4`.

## Rules for new files
- Convert master videos to `.mp4` before adding them and never commit the originals (`.mov` is git-ignored).
- Screenshots and screen recordings of our own software: crop to the application body before adding them. Never include
  the window chrome, title bar or address bar.
- Logos are separate, in `public/logo/`.

Filled slots today: `home/orin-tile`, `home/iris-tile`, `home/iris-civ-tile`, `home/mantis-tile`, `iris/hero`,
`iris/step-1…4`, `mantis/hero`, `orin/hero`, `orin/earth-day`, `orin/earth-night`, `iris-civ/hero`,
`iris-civ/officer-view` (the officer screen in the IRIS CIV story).
