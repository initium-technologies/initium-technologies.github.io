'use client';

import { useEffect, useRef, useState } from 'react';
import CivIcon from './CivIcons';

/* "What every officer sees": the real IRIS CIV screen with hotspots. Hover, tap or tab to a point and a card fades in
   beside it while the rest of the screen dims around it. Until the visitor touches a point, the hotspots play through
   on their own (once the section is on screen) so it is obvious they are interactive. On phones the card sits under
   the image. Reduced motion: no auto-play, no pulse. */
export default function CivShot({ image, points, hint }) {
  const [active, setActive] = useState(null);
  const [touched, setTouched] = useState(false);
  const [seen, setSeen] = useState(false);
  const fig = useRef(null);

  useEffect(() => {
    const el = fig.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Tour: step through the points every 3 s while on screen and untouched. */
  useEffect(() => {
    if (touched || !seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setActive((a) => (a === null ? 0 : a));
    const id = setInterval(() => setActive((a) => ((a ?? -1) + 1) % points.length), 3000);
    return () => clearInterval(id);
  }, [touched, seen, points.length]);

  const pick = (i) => {
    setTouched(true);
    setActive(i);
  };
  const p = active !== null ? points[active] : null;

  return (
    <div className="civ-shot-wrap">
      <p className="civ-shot__hint label" aria-hidden="true">
        <span className="civ-shot__hint-hover">{hint.hover}</span>
        <span className="civ-shot__hint-tap">{hint.tap}</span>
      </p>
      <figure
        ref={fig}
        className={`civ-shot ${p ? 'has-active' : ''}`}
        style={p ? { '--x': `${p.at[0]}%`, '--y': `${p.at[1]}%` } : undefined}
        onMouseLeave={() => touched && setActive(null)}
      >
        <img src={image.src} alt={image.alt} loading="lazy" />
        <span className="civ-shot__dim" aria-hidden="true" />
        {points.map((pt, i) => (
          <button
            type="button"
            key={pt.text}
            className={`civ-shot__pin ${active === i ? 'is-on' : ''}`}
            style={{ left: `${pt.at[0]}%`, top: `${pt.at[1]}%` }}
            aria-label={pt.text}
            aria-expanded={active === i}
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className="civ-shot__plus" aria-hidden="true" />
          </button>
        ))}
        {points.map((pt, i) => (
          <div
            key={pt.text}
            className={`civ-shot__card ${active === i ? 'is-on' : ''} ${pt.at[0] > 55 ? 'is-left' : ''} ${pt.at[1] > 60 ? 'is-up' : ''}`}
            style={{ left: `${pt.at[0]}%`, top: `${pt.at[1]}%` }}
            aria-hidden={active !== i}
          >
            <CivIcon name={pt.icon} />
            <span>{pt.text}</span>
          </div>
        ))}
      </figure>
      {/* Phones: the open point's text sits under the image (the cards would cover the small screenshot). */}
      <div className="civ-shot__below" aria-live="polite">
        {p ? (
          <>
            <CivIcon name={p.icon} />
            <span>{p.text}</span>
          </>
        ) : (
          <span className="civ-shot__below-empty">{hint.empty}</span>
        )}
      </div>
    </div>
  );
}
