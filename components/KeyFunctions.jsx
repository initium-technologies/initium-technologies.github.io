'use client';

import { useEffect, useRef, useState } from 'react';
import Placeholder from './Placeholder';
import Video from './Video';

const pad = (n) => String(n).padStart(2, '0');

export default function KeyFunctions({ items, label = 'Key Functions' }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="numbered" aria-label={label}>
      <span className="numbered__label section-label">{label}</span>
      <div className="numbered__layout">
        <div className="numbered__count" aria-hidden="true">
          <div className="odometer counter">
            <span>0</span>
            <div className="odometer__strip" style={{ transform: `translateY(${-80 * active}px)` }}>
              {items.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          </div>
          <span className="counter-of">/ {pad(items.length)}</span>
        </div>
        <div className="numbered__items">
          {items.map((it, i) => (
            <div className="numbered__item" key={it.title} data-index={i} ref={(el) => (refs.current[i] = el)}>
              <div className="numbered__body">
                <span className="numbered__num mono-label">
                  {pad(i + 1)} / {pad(items.length)}
                </span>
                <h3 className="h3">{it.title}</h3>
                <p className="body">{it.text}</p>
              </div>
              <div className="numbered__media">
                {it.media ? (
                  it.media.video ? (
                    <Video src={it.media.src} label={it.label} className="media" style={{ aspectRatio: '4 / 5' }} />
                  ) : (
                    <img className="media" src={it.media.src} alt="" style={{ aspectRatio: '4 / 5' }} loading="lazy" />
                  )
                ) : (
                  <Placeholder label={it.label} ratio="4 / 5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
