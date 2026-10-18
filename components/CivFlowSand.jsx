'use client';

import { useEffect, useRef } from 'react';

/* How it works (IRIS CIV): thousands of white grains, like sand, rise out of each step's icon, settle onto the line and
   stream along it to the next icon, rise out of that one, and so on to 04, where they rise and fade. One canvas over
   the steps, reading its geometry from the icons and arrows beside it; paused while off screen. With reduced motion it
   draws one still frame. Decorative only (aria-hidden, no pointer events). */

const RISE = 0.3; // share of each leg spent rising out of the icon
const JOIN = 0.42; // ... then settling onto the start of the line; the rest is the stream along it

const easeOut = (u) => 1 - (1 - u) ** 3;
const easeInOut = (u) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);

export default function CivFlowSand({ grains = 2400 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = canvas?.parentElement;
    if (!canvas || !box) return undefined;
    const ctx = canvas.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--ink').trim() || 'white';
    const legMs = parseFloat(css.getPropertyValue('--duration-sand-leg')) || 5000;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = window.innerWidth < 900 ? Math.round(grains / 2) : grains;

    let W = 0;
    let H = 0;
    let stations = [];
    let lines = [];
    const measure = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stations = [...box.querySelectorAll('.civ-step__icon')].map((el) => {
        const b = el.getBoundingClientRect();
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2, w: b.width, h: b.height, top: b.top - r.top };
      });
      /* Each arrow is the line from one icon to the next: across on wide screens, down on phones. */
      lines = [...box.querySelectorAll('.civ-step__arrow')].map((el) => {
        const b = el.getBoundingClientRect();
        if (b.width >= b.height) {
          const y = b.top - r.top + b.height / 2;
          return { x0: b.left - r.left, y0: y, x1: b.right - r.left, y1: y, nx: 0, ny: 1 };
        }
        const x = b.left - r.left + b.width / 2;
        return { x0: x, y0: b.top - r.top, x1: x, y1: b.bottom - r.top, nx: 1, ny: 0 };
      });
    };

    /* Per grain: where it is along the chain (0 … number of icons), its speed and brightness, and the shape of the
       leg it is on (start point in the icon, how high it rises, sideways drift, offset across the line). */
    const s = new Float32Array(n);
    const speed = new Float32Array(n);
    const glow = new Float32Array(n);
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const rise = new Float32Array(n);
    const drift = new Float32Array(n);
    const jit = new Float32Array(n);
    const phase = new Float32Array(n);
    const legOf = new Int16Array(n);
    const roll = (i) => {
      sx[i] = (Math.random() - 0.5) * 0.7;
      sy[i] = (Math.random() - 0.5) * 0.5;
      rise[i] = 8 + Math.random() ** 0.7 * 30;
      drift[i] = (Math.random() - 0.4) * 36;
      jit[i] = (Math.random() + Math.random() + Math.random() - 1.5) * 2.4;
      phase[i] = Math.random() * Math.PI * 2;
    };
    for (let i = 0; i < n; i += 1) {
      speed[i] = 0.75 + Math.random() * 0.5;
      glow[i] = 0.2 + Math.random() ** 2 * 0.8;
      roll(i);
    }
    let seeded = false;
    const seed = () => {
      for (let i = 0; i < n; i += 1) {
        s[i] = Math.random() * stations.length;
        legOf[i] = Math.floor(s[i]);
      }
      seeded = true;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink;
      const last = stations.length - 1;
      for (let i = 0; i < n; i += 1) {
        const k = Math.floor(s[i]);
        const f = s[i] - k;
        const st = stations[k];
        if (!st) continue;
        const x0 = st.x + sx[i] * st.w;
        const y0 = st.y + sy[i] * st.h;
        const px = st.x + drift[i];
        const py = st.top - rise[i];
        const wob = Math.sin(f * 18 + phase[i]);
        let x;
        let y;
        let a = 1;
        if (f < RISE) {
          /* Rising out of the icon. */
          const u = f / RISE;
          const e = easeOut(u);
          x = x0 + (px - x0) * e + wob * 1.5;
          y = y0 + (py - y0) * e;
          a = Math.min(1, u * 4);
        } else if (k >= last || !lines[k]) {
          /* The last icon: keep rising, and fade. */
          const u = (f - RISE) / (1 - RISE);
          x = px + drift[i] * 0.4 * u + wob * 2;
          y = py - u * 28;
          a = 1 - u;
        } else {
          const L = lines[k];
          const lx = L.x0 + L.nx * jit[i];
          const ly = L.y0 + L.ny * jit[i];
          if (f < JOIN) {
            /* Settling onto the start of the line. */
            const e = easeInOut((f - RISE) / (JOIN - RISE));
            x = px + (lx - px) * e;
            y = py + (ly - py) * e;
          } else {
            /* Streaming along the line into the next icon. */
            const u = (f - JOIN) / (1 - JOIN);
            const shimmer = wob * 0.6;
            x = lx + (L.x1 - L.x0) * u + L.nx * shimmer;
            y = ly + (L.y1 - L.y0) * u + L.ny * shimmer;
            if (u > 0.9) a = (1 - u) * 10;
          }
        }
        ctx.globalAlpha = a * glow[i];
        const size = glow[i] > 0.8 ? 1.4 : 1;
        ctx.fillRect(x, y, size, size);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let prev = 0;
    const tick = (now) => {
      const dt = Math.min(64, now - (prev || now));
      prev = now;
      const stops = stations.length;
      for (let i = 0; i < n; i += 1) {
        s[i] += (dt / legMs) * speed[i];
        if (s[i] >= stops) s[i] -= stops;
        const k = Math.floor(s[i]);
        if (k !== legOf[i]) {
          legOf[i] = k;
          roll(i);
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reduce) return;
      prev = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const refresh = () => {
      measure();
      if (!stations.length) return;
      if (!seeded) seed();
      if (!raf) draw();
    };
    refresh();
    const ro = new ResizeObserver(refresh);
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(box);
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [grains]);

  return <canvas className="civ-sand" ref={ref} aria-hidden="true" />;
}
