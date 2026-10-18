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
| `iris/` | `hero` | IRIS page, full screen behind the name | 16:9 |
| `iris/` | `1`, `2`, `3` | IRIS page, key functions 01–03 | 4:5 |
| `mantis/` | `hero` | MANTIS page, full screen behind the name | 16:9 |
| `mantis/` | `1`, `2`, `3` | MANTIS page, key functions 01–03 | 4:5 |
| `orin/` | `hero` | ORIN page, full screen behind the name (ORIN Hero video, 14 s) | 16:9 |
| `iris-civ/` | `hero` | IRIS CIV page, full screen behind the name | 16:9 |
| `company/` | `hero` | About page, full screen behind the headline (empty = plain black; a video is planned) | 16:9 |

Examples: `home/iris-tile.jpg`, `iris/2.jpg`, `company/hero.jpg`.

In use now: `orin/hero.mp4` (ORIN Hero video, 14 s), `iris-civ/officer-view.jpg` (IRIS CIV screen on the IRIS CIV page; top bar with the server address cropped off), `home/orin-tile.jpg`, `home/iris-tile.jpg`, `home/mantis-tile.jpg`, `home/iris-civ-tile.jpg`, `iris/hero.mp4` (IRIS MIL Hero Video, 30 s), `mantis/hero.jpg`, `iris-civ/hero.jpg` (copies of the home tiles until proper wide images arrive).

Logos are separate, in `public/logo/`.
