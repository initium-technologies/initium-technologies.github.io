'use client';

import { useEffect, useState } from 'react';

/* Live Earth behind the ORIN name: NOAA GOES-East (GOES-19) full disk, GeoColor, public domain, renewed every 10
   minutes. It loads straight from NOAA in the visitor's browser (NOAA sends Access-Control-Allow-Origin: *); nothing is
   stored on our site. We check every 2 minutes and cross-fade when a newer image is out. The disc is clipped to a circle
   so NOAA's logo and caption line stay hidden. If the feed fails, the hero stays black (name and text unaffected).
   The light-blue squares that sometimes appear are gaps in NOAA's own scan. */

const GOES = 'https://cdn.star.nesdis.noaa.gov/GOES19/ABI/FD/GEOCOLOR/1808x1808.jpg';
const utc = (date) =>
  `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')} UTC`;

function preload(src) {
  return new Promise((ok, fail) => {
    const img = new Image();
    img.onload = () => ok(src);
    img.onerror = fail;
    img.src = src;
  });
}

export default function LiveEarth() {
  const [frames, setFrames] = useState([]); // newest last; the previous one stays underneath while the new one fades in

  useEffect(() => {
    let stop = false;
    let last = '';
    const check = async () => {
      try {
        const r = await fetch(GOES, { method: 'HEAD', cache: 'no-store' });
        const lm = r.headers.get('last-modified') || String(Date.now());
        if (lm === last) return;
        const src = `${GOES}?t=${encodeURIComponent(lm)}`;
        await preload(src);
        if (stop) return;
        last = lm;
        setFrames((f) => [...f.slice(-1), { src, time: new Date(lm) }]);
      } catch {
        /* keep the current frame */
      }
    };
    check();
    const id = setInterval(check, 120000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, []);

  const shown = frames[frames.length - 1];
  return (
    <div className={`earth ${shown ? 'is-ready' : ''}`} aria-hidden="true">
      <div className="earth__disc">
        {frames.map((f) => (
          <img key={f.src} className="earth__img" src={f.src} alt="" decoding="async" />
        ))}
      </div>
      {shown && (
        <span className="earth__hud mono-label">
          <span className="earth__dot" />
          {`Live · NOAA GOES-19 · ${utc(shown.time)}`}
        </span>
      )}
    </div>
  );
}
