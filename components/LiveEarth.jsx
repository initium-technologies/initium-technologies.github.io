'use client';

import { useEffect, useRef, useState } from 'react';

/* Live Earth behind the ORIN name (preview: Sanjeev, 2026-10-17). Both feeds are public domain and load straight from
   the source in the visitor's browser (both send Access-Control-Allow-Origin: *); nothing is stored on our site.
   - mode="goes": NOAA GOES-East (GOES-19) full disk, GeoColor, renewed every 10 minutes. We check every 2 minutes and
     cross-fade when a newer image is out. The disc is clipped to a circle so NOAA's logo and caption line stay hidden.
   - mode="epic": NASA EPIC on DSCOVR, 1.5 million km out: the latest day's photos (about 13) blended in a loop, so the
     planet turns.
   If a feed fails, the globe simply doesn't appear and the black hero stays (the name and text are unaffected). */

const GOES = 'https://cdn.star.nesdis.noaa.gov/GOES19/ABI/FD/GEOCOLOR/1808x1808.jpg';
const EPIC_API = 'https://epic.gsfc.nasa.gov/api/natural';
const epicUrl = (it) => {
  const [d] = it.date.split(' ');
  const [y, m, day] = d.split('-');
  return `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${day}/jpg/${it.image}.jpg`;
};
const utc = (date) =>
  `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')} UTC`;
const day = (date) =>
  date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

function preload(src) {
  return new Promise((ok, fail) => {
    const img = new Image();
    img.onload = () => ok(src);
    img.onerror = fail;
    img.src = src;
  });
}

function useGoes(active) {
  const [frame, setFrame] = useState(null); // { src, time }
  useEffect(() => {
    if (!active) return undefined;
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
        setFrame({ src, time: new Date(lm) });
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
  }, [active]);
  return frame;
}

function useEpic(active) {
  const [frames, setFrames] = useState(null); // [{ src, time }]
  useEffect(() => {
    if (!active) return undefined;
    let stop = false;
    (async () => {
      try {
        const list = await (await fetch(EPIC_API)).json();
        const items = list.map((it) => ({ src: epicUrl(it), time: new Date(`${it.date.replace(' ', 'T')}Z`) }));
        const ok = await Promise.allSettled(items.map((f) => preload(f.src)));
        const loaded = items.filter((_, i) => ok[i].status === 'fulfilled');
        if (!stop && loaded.length) setFrames(loaded);
      } catch {
        /* no globe */
      }
    })();
    return () => {
      stop = true;
    };
  }, [active]);
  return frames;
}

export default function LiveEarth({ mode = 'goes' }) {
  const goes = useGoes(mode === 'goes');
  const epic = useEpic(mode === 'epic');
  const [i, setI] = useState(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* EPIC: step through the day's photos; each blend lasts as long as a step, so the turn reads as motion. */
  useEffect(() => {
    if (!epic || epic.length < 2 || reduce.current) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % epic.length), 900);
    return () => clearInterval(id);
  }, [epic]);

  const frames = mode === 'goes' ? (goes ? [goes] : []) : epic || [];
  const shown = mode === 'goes' ? goes : epic && epic[i];

  return (
    <div className={`earth earth--${mode} ${frames.length ? 'is-ready' : ''}`} aria-hidden="true">
      <div className="earth__disc">
        {frames.map((f, n) => (
          <img
            key={f.src}
            className={`earth__img ${(mode === 'goes' ? true : n === i) ? 'is-on' : ''}`}
            src={f.src}
            alt=""
            decoding="async"
          />
        ))}
      </div>
      {shown && (
        <span className="earth__hud mono-label">
          <span className="earth__dot" />
          {mode === 'goes'
            ? `Live · NOAA GOES-19 · ${utc(shown.time)}`
            : `NASA EPIC · DSCOVR · 1.5M km · ${day(shown.time)} · ${utc(shown.time)}`}
        </span>
      )}
    </div>
  );
}
