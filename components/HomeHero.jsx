'use client';

import { useEffect, useState } from 'react';
import Video from './Video';
import { home } from '@/content/site';

/* Landing hero: the INITIUM wordmark on black (a video plays behind it once public/media/home-hero.mp4 exists).
   A thin line at the bottom drops and fades on a slow loop to invite scrolling; it hides once the visitor scrolls. */
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
      ) : null}
      <div className="home-hero__copy">
        <h1 className="home-hero__mark" aria-label="Initium">{home.heroMark}</h1>
      </div>
      <div className={`home-hero__scroll ${gone ? 'is-gone' : ''}`} aria-hidden="true">
        <span className="home-hero__scroll-line" />
      </div>
    </section>
  );
}
