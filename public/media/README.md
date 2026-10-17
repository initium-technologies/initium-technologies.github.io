# Images and videos

One folder per page. Drop a file in with the name below and it appears on that page; no code change.
Until a file exists, its spot is an empty box (or plain black for the landing hero).

- **Images:** `.jpg`, `.png`, `.webp` or `.avif`. About 2000 px on the long side is plenty.
- **Videos:** `.mp4` (H.264) or `.webm`, muted and looping. Keep each under ~2 MB (1600×900, CRF 30).
- The name is what matters, not the extension: `hero.jpg` and `hero.mp4` both fill the `hero` slot (video wins if both exist).

| Folder | File name | Where it shows | Shape |
|---|---|---|---|
| `home/` | `hero` | Landing page, full screen behind INITIUM | 16:9 |
| `home/` | `orin-tile` | Landing page, ORIN tile (tall, left) | 2:3 |
| `home/` | `iris-tile` | Landing page, IRIS tile | 7:5 |
| `home/` | `mantis-tile` | Landing page, MANTIS tile | 7:5 |
| `home/` | `iris-civ-tile` | Landing page, IRIS CIV tile (wide, bottom) | 5:2 |
| `iris/` | `hero` | IRIS page, under the name | 21:9 |
| `iris/` | `1`, `2`, `3` | IRIS page, key functions 01–03 | 4:5 |
| `mantis/` | `hero` | MANTIS page, under the name | 21:9 |
| `mantis/` | `1`, `2`, `3` | MANTIS page, key functions 01–03 | 4:5 |
| `orin/` | `hero` | ORIN page, full screen behind the name | 16:9 |
| `iris-civ/` | `hero` | IRIS CIV page, under the name | 21:9 |
| `company/` | `daniel-choupak`, `conrad-scheibye`, `ashley-astrom-andrews` | Company page, leadership portraits | 4:5 |

Examples: `home/iris-tile.jpg`, `iris/2.jpg`, `orin/hero.mp4`, `company/conrad-scheibye.jpg`.

In use now: `home/iris-tile.jpg`, `home/mantis-tile.jpg`, `orin/hero.mp4`.

Logos are separate, in `public/logo/`.
