/* The four dot fields of the IRIS CIV Alert Chain: alert, link, still, build. 2D canvas, 8-second loop. */

const INK = '242,242,240';
const ACC = '#e84a1f';
const rnd = () => Math.random();
const ease = (t) => 1 - Math.pow(1 - t, 3);

function plan() {
  const s = [];
  const seg = (a, b, c, d) => s.push([a, b, c, d]);
  seg(0.06, 0.08, 0.94, 0.08); seg(0.94, 0.08, 0.94, 0.92); seg(0.94, 0.92, 0.06, 0.92); seg(0.06, 0.92, 0.06, 0.08);
  seg(0.06, 0.44, 0.40, 0.44); seg(0.46, 0.44, 0.70, 0.44); seg(0.76, 0.44, 0.94, 0.44);
  seg(0.06, 0.52, 0.30, 0.52); seg(0.36, 0.52, 0.60, 0.52); seg(0.66, 0.52, 0.94, 0.52);
  seg(0.50, 0.52, 0.50, 0.70); seg(0.50, 0.76, 0.50, 0.92); seg(0.56, 0.52, 0.56, 0.62); seg(0.56, 0.68, 0.56, 0.92);
  seg(0.30, 0.08, 0.30, 0.30); seg(0.30, 0.36, 0.30, 0.44); seg(0.62, 0.08, 0.62, 0.22); seg(0.62, 0.28, 0.62, 0.44);
  seg(0.06, 0.72, 0.20, 0.72); seg(0.26, 0.72, 0.50, 0.72); seg(0.28, 0.52, 0.28, 0.60);
  seg(0.56, 0.74, 0.80, 0.74); seg(0.86, 0.74, 0.94, 0.74); seg(0.76, 0.52, 0.76, 0.64);
  return s;
}

function samplePlan(n) {
  const segs = plan();
  let total = 0;
  const lens = segs.map((g) => {
    const l = Math.hypot(g[2] - g[0], g[3] - g[1]);
    total += l;
    return l;
  });
  const pts = [];
  for (let i = 0; i < n; i++) {
    let r = rnd() * total;
    let k = 0;
    while (k < lens.length - 1 && r > lens[k]) {
      r -= lens[k];
      k++;
    }
    const g = segs[k];
    const t = Math.min(1, r / lens[k]);
    pts.push([g[0] + (g[2] - g[0]) * t, g[1] + (g[3] - g[1]) * t]);
  }
  return pts;
}

const PATH = [[0.08, 0.48], [0.53, 0.48], [0.53, 0.9]];

/** Mounts a field on a canvas. Returns a cleanup function. */
export function mountField(canvas, mode) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 1;
  let H = 1;
  let pts = [];
  let links = [];
  let visible = true;
  let raf = 0;
  const t0 = performance.now();

  const proj = (p, layer) => {
    const x = p[0] - 0.5;
    const y = p[1] - 0.5;
    return [W / 2 + x * W * 0.78 + y * W * 0.1, H * 0.52 + y * H * 0.62 - (layer || 0) * 3 * dpr];
  };

  function init() {
    pts = [];
    links = [];
    const N = mode === 'build' ? 1500 : 800;
    if (mode === 'alert') {
      for (let i = 0; i < N; i++) pts.push({ ring: i % 10, ang: rnd() * Math.PI * 2, ph: rnd() * Math.PI * 2 });
    } else if (mode === 'link') {
      const cols = 22;
      const rows = 16;
      for (let i = 0; i < cols * rows; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        pts.push({ x: rnd() * W, y: rnd() * H, tx: ((c + 0.5 + (rnd() - 0.5) * 0.6) / cols) * W, ty: ((r + 0.5 + (rnd() - 0.5) * 0.6) / rows) * H });
      }
      for (let i = 0; i < pts.length; i++) {
        const d = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const dx = pts[i].tx - pts[j].tx;
          const dy = pts[i].ty - pts[j].ty;
          d.push([dx * dx + dy * dy, j]);
        }
        d.sort((a, b) => a[0] - b[0]);
        for (let k = 0; k < 3; k++) if (d[k][1] > i) links.push([i, d[k][1]]);
      }
    } else if (mode === 'still') {
      for (let i = 0; i < N; i++) pts.push({ x: rnd() * W, y: rnd() * H, ph: rnd() * Math.PI * 2, a: 0.35 + rnd() * 0.45 });
    } else if (mode === 'build') {
      const sp = samplePlan(N);
      for (let i = 0; i < N; i++) {
        const layer = i % 3;
        const q = proj(sp[i], layer);
        pts.push({ x: rnd() * W, y: rnd() * H, tx: q[0], ty: q[1], layer, d: rnd() * 0.5 });
      }
    }
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr));
    H = Math.max(1, Math.round(r.height * dpr));
    canvas.width = W;
    canvas.height = H;
    init();
  }

  const dot = (x, y, a, r) => {
    ctx.fillStyle = `rgba(${INK},${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };

  function draw(now) {
    const t = ((now - t0) / 1000) % 8;
    const R = 1.6 * dpr;
    ctx.clearRect(0, 0, W, H);
    if (mode === 'alert') {
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.hypot(W, H) / 2;
      for (const p of pts) {
        const rr = ((t * 0.14 + p.ring * 0.1) % 1) * maxR;
        const a = (0.35 + 0.45 * 0.5 * (1 + Math.sin((2 * Math.PI * t) / 2 + p.ph))) * (1 - rr / maxR);
        dot(cx + Math.cos(p.ang) * rr, cy + Math.sin(p.ang) * rr, Math.max(0, a), R);
      }
    } else if (mode === 'link') {
      const kk = ease(Math.min(1, t / 1.5));
      const lk = Math.max(0, Math.min(1, (t - 1.5) / 1.5));
      for (const p of pts) {
        p.cx = p.x + (p.tx - p.x) * kk;
        p.cy = p.y + (p.ty - p.y) * kk;
      }
      if (lk > 0) {
        ctx.lineWidth = 1 * dpr;
        for (const L of links) {
          const A = pts[L[0]];
          const B = pts[L[1]];
          const sh = 0.25 + 0.25 * Math.sin(((A.cx + B.cx) / W) * 6 - t * 2);
          ctx.strokeStyle = `rgba(${INK},${lk * sh})`;
          ctx.beginPath();
          ctx.moveTo(A.cx, A.cy);
          ctx.lineTo(B.cx, B.cy);
          ctx.stroke();
        }
      }
      for (const p of pts) dot(p.cx, p.cy, 0.7, R);
    } else if (mode === 'still') {
      const amp = Math.max(0, 1 - t / 3) * 6 * dpr;
      for (const s of pts) dot(s.x + amp * Math.sin(now / 90 + s.ph), s.y + amp * Math.cos(now / 70 + s.ph * 1.3), s.a, R);
    } else if (mode === 'build') {
      for (const b of pts) {
        const k2 = ease(Math.max(0, Math.min(1, (t - b.d) / 2.0)));
        dot(b.x + (b.tx - b.x) * k2, b.y + (b.ty - b.y) * k2, 0.8 - b.layer * 0.2, R * (1 - b.layer * 0.15));
      }
      if (t > 2.6) {
        const u = ((t - 2.6) / 5) % 1;
        const s0 = 0.45;
        const s1 = 0.42;
        const sd = u * (s0 + s1);
        let pa;
        let pb;
        let f;
        if (sd < s0) {
          pa = PATH[0];
          pb = PATH[1];
          f = sd / s0;
        } else {
          pa = PATH[1];
          pb = PATH[2];
          f = (sd - s0) / s1;
        }
        const q = proj([pa[0] + (pb[0] - pa[0]) * f, pa[1] + (pb[1] - pa[1]) * f], 1);
        ctx.fillStyle = ACC;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function loop(now) {
    if (visible) draw(now);
    raf = requestAnimationFrame(loop);
  }

  resize();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
    });
    io.observe(canvas);
  }
  const finalAt = { alert: 1000, link: 4000, still: 5000, build: 7000 }[mode] || 1000;
  if (reduce) {
    draw(t0 + finalAt);
  } else {
    draw(t0);
    raf = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    if (io) io.disconnect();
  };
}
