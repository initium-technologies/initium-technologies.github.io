'use client';

import { useEffect, useRef } from 'react';
import { mountField } from '@/lib/dotfield';

export default function DotField({ mode, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    return mountField(ref.current, mode);
  }, [mode]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
