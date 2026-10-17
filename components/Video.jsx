'use client';

import { useEffect, useRef } from 'react';

/** Muted looping video. Pauses on its first frame when the visitor prefers reduced motion. */
export default function Video({ src, label, className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      disablePictureInPicture
    />
  );
}
