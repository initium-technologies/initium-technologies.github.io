'use client';

import { useEffect, useState } from 'react';
import Placeholder from './Placeholder';
import Video from './Video';
import { home } from '@/content/site';

/* Landing hero. Black until the launch video exists as public/media/home-hero.mp4. */
export default function HomeHero({ media = null }) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const onScroll = () => setGone(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className="home-hero" aria-label="Introduction">
      {media ? (
        media.video ? (
          <Video src={media.src} label={home.heroMediaLabel} className="media is-cover" />
        ) : (
          <img className="media is-cover" src={media.src} alt="" />
        )
      ) : (
        <Placeholder label={home.heroMediaLabel} cover />
      )}
      <div className="home-hero__copy">
        <span className="section-label">{home.heroLabel}</span>
        <h1 className="h2">{home.heroLine}</h1>
      </div>
      <div className={`home-hero__scroll ${gone ? 'is-gone' : ''}`} aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
