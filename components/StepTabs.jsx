'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Media from './Media';

/* Steps as tabs over one card at a time, after Anduril's Fury build-qualities block (IRIS concept of operations): a row
   of tabs (the step tags) with a line under the active one, and below it the cards side by side in a track that slides
   to the chosen tab. Click a tab, use the arrow keys on the tabs, or swipe the track. Each card: the tag in caps in the
   top-left corner, the step title large, the image top right (black until public/media/<page>/step-N.* exists) and a
   large number bottom left. Every card is as tall as the tallest. A step is { tag, title, text?, media }. */
export default function StepTabs({ steps, label }) {
  const [active, setActive] = useState(0);
  const track = useRef(null);
  const tabs = useRef([]);
  const id = useId();
  const n = steps.length;

  const go = (i, focus = false) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  /* Keep the tabs in step with the track when it is swiped or scrolled sideways. */
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(Math.min(n - 1, Math.round(el.scrollLeft / el.clientWidth))));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  const onKeyDown = (e) => {
    const next = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    go(next, true);
  };

  return (
    <div className="step-tabs">
      <div className="step-tabs__tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={`step-tabs__tab${i === active ? ' is-on' : ''}`}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            onClick={() => go(i)}
          >
            {s.tag}
          </button>
        ))}
      </div>
      <div className="step-tabs__track" ref={track}>
        {steps.map((s, i) => (
          <article
            key={s.title}
            className="step-tab"
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            inert={i !== active}
          >
            <span className="step-tab__tag label">{s.tag}</span>
            <div className="step-tab__body">
              <h3 className="step-tab__title">{s.title}</h3>
              {s.text && <p className="step-tab__text">{s.text}</p>}
            </div>
            <div className="step-tab__media">
              <Media media={s.media} label={`IMAGE · ${s.tag} · 16:9`} ratio="16 / 9" alt="" />
            </div>
            <span className="step-tab__num" aria-hidden="true">
              {i + 1}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
