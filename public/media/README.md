# Media slots

Drop a file in here with the right name and the matching slot renders it on the next deploy. No code change.
Until the file exists, the slot shows its labelled placeholder. Video: .mp4 (H.264) or .webm, muted, looping.
Image: .jpg, .png, .webp or .avif. Keep hero videos under ~2 MB (1600x900 H.264 CRF 30 is plenty).

| File name stem        | Where it shows                                             | Shape        |
| --------------------- | ---------------------------------------------------------- | ------------ |
| home-hero             | Landing page, full screen behind the headline (phase 2: IRIS in action) | 16:9 |
| orin-tile             | Landing page, ORIN tile (black background, ground tracks)  | 2:3 tall     |
| iris-tile             | Landing page, IRIS tile                                     | 7:5          |
| mantis-tile           | Landing page, MANTIS tile                                   | 7:5          |
| iris-civ-tile         | Landing page, IRIS CIV tile                                 | 5:2 wide     |
| iris-hero             | IRIS page, under the name                                   | 21:9         |
| iris-1, iris-2, iris-3 | IRIS page, key functions 01-03                             | 4:5          |
| mantis-hero           | MANTIS page, under the name                                 | 21:9         |
| mantis-1, mantis-2, mantis-3 | MANTIS page, key functions 01-03                     | 4:5          |
| orin-hero             | ORIN page, full screen behind the name                      | 16:9         |
| iris-civ-hero         | IRIS CIV page, under the name (phase 1: knife-on-table demo) | 21:9        |
| portrait-<first>-<last> | Company page leadership portraits (e.g. portrait-daniel-choupak) | 4:5    |

Example: `public/media/iris-tile.jpg`, `public/media/orin-hero.mp4`.
