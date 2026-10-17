'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Arrow } from './Icons';
import Video from './Video';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|_-+=<>';

export function scramble(el, text) {
  if (!el) return;
  if (el._raf) cancelAnimationFrame(el._raf);
  el.classList.remove('is-flash');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    el.textContent = text;
    return;
  }
  const n = text.length;
  const dur = 900;
  const start = performance.now();
  let lastTick = 0;
  const tick = (now) => {
    const t = now - start;
    if (now - lastTick >= 30 || t >= dur) {
      lastTick = now;
      let out = '';
      for (let i = 0; i < n; i++) {
        const c = text[i];
        if (c === ' ') {
          out += ' ';
          continue;
        }
        out += t >= i * (dur / n) ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
    }
    if (t < dur) {
      el._raf = requestAnimationFrame(tick);
    } else {
      el.textContent = text;
      el.classList.add('is-flash');
      setTimeout(() => el.classList.remove('is-flash'), 150);
    }
  };
  el._raf = requestAnimationFrame(tick);
}

export default function ProductTile({ name, subtitle, href, media = null, zoom, focus, className = '' }) {
  const tile = useRef(null);
  const sub = useRef(null);

  useEffect(() => {
    const el = tile.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover)').matches) {
      el.classList.add('is-touch');
    }
  }, []);

  const run = () => scramble(sub.current, subtitle);

  return (
    <Link
      ref={tile}
      href={href}
      className={`tile ${className}`}
      onMouseEnter={run}
      onFocus={run}
      aria-label={`${name}: ${subtitle.toLowerCase()}`}
    >
      <div className="tile__media" aria-hidden="true" style={zoom ? { '--zoom': zoom, '--focus': focus || '50% 50%' } : undefined}>
        {media && (media.video ? <Video src={media.src} className="media is-cover" /> : <img className="media is-cover" src={media.src} alt="" />)}
      </div>
      <div className="tile__text">
        <span className="h2">{name}</span>
        <span className="tile__sub scramble" ref={sub} aria-hidden="true">
          {subtitle}
        </span>
      </div>
      <span className="tile__arrow">
        <Arrow />
      </span>
    </Link>
  );
}
