'use client';

import { useEffect, useRef, useState } from 'react';
import Video from './Video';

/* ORIN hero: a live 3D Earth with every active satellite (preview, Sanjeev 2026-10-17).
   - Orbits: public/data/satellites.tle (CelesTrak, refreshed by scripts/update-satellites.mjs). Positions are computed
     live with SGP4 in a worker (lib/sat.worker.js) and blended on the GPU between updates, so the dots move smoothly.
   - Earth: NASA Blue Marble (day) and Black Marble (night lights), greyscale, lit by the Sun's real position now.
   - Interaction: the globe leans toward the cursor, drags with momentum (horizontal drag only on touch, so the page still
     scrolls), turns as the page scrolls. No wheel zoom. Hover near a dot for its name and altitude. LIVE / x60 switch.
   - Pauses when off screen or in a background tab. No WebGL, or any error: the ORIN video plays instead. */

const R_KM = 6371;
const SPEEDS = [1, 60];
const CLASS_NAMES = ['LEO', 'MEO', 'GEO'];

const julian = (ms) => ms / 86400000 + 2440587.5;
const gmst = (ms) => {
  const d = julian(ms) - 2451545.0;
  return (((280.46061837 + 360.98564736629 * d) % 360) * Math.PI) / 180;
};
/* Sun direction in the globe's frame (x = ECI x, y = ECI z, z = -ECI y). Low-precision formula, plenty for lighting. */
function sunDir(ms) {
  const n = julian(ms) - 2451545.0;
  const rad = Math.PI / 180;
  const L = (280.46 + 0.9856474 * n) * rad;
  const g = (357.528 + 0.9856003 * n) * rad;
  const lambda = L + (1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad;
  const eps = (23.439 - 0.0000004 * n) * rad;
  const x = Math.cos(lambda);
  const y = Math.cos(eps) * Math.sin(lambda);
  const z = Math.sin(eps) * Math.sin(lambda);
  return [x, z, -y];
}
const hhmmss = (ms) => new Date(ms).toISOString().slice(11, 19);

const EARTH_VS = /* glsl */ `
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`;
const EARTH_FS = /* glsl */ `
  uniform sampler2D uDay; uniform sampler2D uNight; uniform vec3 uSun;
  varying vec2 vUv; varying vec3 vN; varying vec3 vW;
  void main() {
    vec3 n = normalize(vN);
    float l = dot(n, normalize(uSun));
    float dayMix = smoothstep(-0.12, 0.22, l);
    float day = texture2D(uDay, vUv).r * (0.18 + 0.95 * max(l, 0.0));
    float lights = texture2D(uNight, vUv).r;
    float night = pow(lights, 1.6) * 1.5 + 0.015;
    float c = mix(night, day, dayMix);
    vec3 v = normalize(cameraPosition - vW);
    float rim = pow(1.0 - max(dot(v, n), 0.0), 3.0);
    c += rim * (0.04 + 0.22 * smoothstep(-0.3, 0.6, l));
    gl_FragColor = vec4(vec3(c), 1.0);
  }`;
const ATMO_VS = /* glsl */ `
  varying vec3 vN; varying vec3 vW;
  void main() {
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`;
const ATMO_FS = /* glsl */ `
  uniform vec3 uSun; varying vec3 vN; varying vec3 vW;
  void main() {
    // Back faces of a slightly larger shell: brightest at the Earth's edge, fading to nothing at the shell's edge.
    vec3 v = normalize(cameraPosition - vW);
    float d = -dot(v, normalize(vN));
    float i = pow(smoothstep(0.0, 0.33, d), 2.2) * 0.55;
    float lit = 0.25 + 0.75 * smoothstep(-0.35, 0.45, dot(normalize(vN), normalize(uSun)));
    gl_FragColor = vec4(vec3(1.0), i * lit);
  }`;
const SAT_VS = /* glsl */ `
  attribute vec3 aA; attribute vec3 aB; attribute float aC;
  uniform float uMix; uniform float uPx; uniform float uHover; attribute float aI;
  varying float vA; varying float vH;
  void main() {
    vec3 p = mix(aA, aB, uMix);
    if (dot(p, p) < 0.25) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; return; }
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = aC < 0.5 ? 1.0 : (aC < 1.5 ? 1.35 : 1.6);
    vH = abs(aI - uHover) < 0.5 ? 1.0 : 0.0;
    gl_PointSize = clamp(uPx * s * (5.0 / -mv.z), 1.0, 3.2) + vH * 6.0;
    vA = aC < 0.5 ? 0.75 : 0.95;
  }`;
const SAT_FS = /* glsl */ `
  varying float vA; varying float vH;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vA;
    if (vH > 0.5) a = max(a, smoothstep(0.5, 0.42, d) * (1.0 - smoothstep(0.42, 0.34, d)));
    if (a < 0.01) discard;
    gl_FragColor = vec4(vec3(1.0), a);
  }`;

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function OrinGlobe({ fallbackVideo = null }) {
  const wrap = useRef(null);
  const speedRef = useRef(1);
  const [mode, setMode] = useState('loading'); // loading | ready | fallback
  const [hud, setHud] = useState({ count: 0, classes: [0, 0, 0], time: '' });
  const [speed, setSpeed] = useState(1);
  const [hover, setHover] = useState(null); // { name, cls, alt, x, y }

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!webglOK()) {
      setMode('fallback');
      return undefined;
    }
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import('three');
        if (disposed) return;
        const el = wrap.current;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ---------- renderer, camera, scene ---------- */
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 1);
        renderer.domElement.className = 'orin-globe__canvas';
        el.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 100);
        const root = new THREE.Group(); // tilt + spin from the visitor
        const inertial = new THREE.Group(); // space-fixed frame: satellites live here; the Earth turns inside it
        root.add(inertial);
        scene.add(root);

        /* ---------- Earth + atmosphere ---------- */
        const loader = new THREE.TextureLoader();
        const load = (src) =>
          new Promise((ok, fail) =>
            loader.load(src, (t) => {
              t.anisotropy = renderer.capabilities.getMaxAnisotropy();
              ok(t);
            }, undefined, fail),
          );
        const [dayTex, nightTex, tleText] = await Promise.all([
          load('/media/orin/earth-day.jpg'),
          load('/media/orin/earth-night.jpg'),
          fetch('/data/satellites.tle').then((r) => {
            if (!r.ok) throw new Error('catalogue');
            return r.text();
          }),
        ]);
        if (disposed) return;
        const sunU = { value: new THREE.Vector3(1, 0, 0) };
        const earth = new THREE.Mesh(
          new THREE.SphereGeometry(1, 128, 64),
          new THREE.ShaderMaterial({ uniforms: { uDay: { value: dayTex }, uNight: { value: nightTex }, uSun: sunU }, vertexShader: EARTH_VS, fragmentShader: EARTH_FS }),
        );
        inertial.add(earth);
        const atmo = new THREE.Mesh(
          new THREE.SphereGeometry(1.06, 96, 48),
          new THREE.ShaderMaterial({ uniforms: { uSun: sunU }, vertexShader: ATMO_VS, fragmentShader: ATMO_FS, side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
        );
        inertial.add(atmo);

        /* ---------- satellites (positions from the worker) ---------- */
        const worker = new Worker(new URL('../lib/sat.worker.js', import.meta.url), { type: 'module' });
        const meta = await new Promise((ok) => {
          worker.onmessage = (e) => e.data.type === 'meta' && ok(e.data);
          worker.postMessage({ type: 'load', text: tleText });
        });
        if (disposed) {
          worker.terminate();
          return;
        }
        const N = meta.names.length;
        const geo = new THREE.BufferGeometry();
        const aA = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
        const aB = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
        const idx = new Float32Array(N);
        for (let i = 0; i < N; i++) idx[i] = i;
        aA.setUsage(THREE.DynamicDrawUsage);
        aB.setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute('position', aA); // bounding only
        geo.setAttribute('aA', aA);
        geo.setAttribute('aB', aB);
        geo.setAttribute('aC', new THREE.BufferAttribute(Float32Array.from(meta.classes), 1));
        geo.setAttribute('aI', new THREE.BufferAttribute(idx, 1));
        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
        const satU = { uMix: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uHover: { value: -1 } };
        const points = new THREE.Points(
          geo,
          new THREE.ShaderMaterial({ uniforms: satU, vertexShader: SAT_VS, fragmentShader: SAT_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
        );
        inertial.add(points);
        const counts = [0, 0, 0];
        meta.classes.forEach((c) => counts[c]++);

        /* ISS: ring marker + its orbit for the next 93 minutes. */
        const issIndex = meta.names.findIndex((n) => /^ISS \(ZARYA\)/.test(n));
        const issLine = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, depthWrite: false }));
        inertial.add(issLine);

        /* Position buffers: A at time tA, B at time tB; the GPU blends between them. (BufferAttributes have no userData,
           so the times live here.) */
        let tA = 0;
        let tB = 0;
        let step = 10000;
        let waitingB = false;
        let pending = 0;
        const request = (t) => {
          pending += 1;
          worker.postMessage({ type: 'at', t, id: pending });
        };
        worker.onmessage = (e) => {
          const m = e.data;
          if (m.type === 'pos') {
            if (!tB) {
              aA.array.set(m.pos);
              aB.array.set(m.pos);
              tA = m.t;
              tB = m.t;
            } else {
              aA.array.set(aB.array);
              aB.array.set(m.pos);
              tA = tB;
              tB = m.t;
              step = Math.max(1, tB - tA);
            }
            aA.needsUpdate = true;
            aB.needsUpdate = true;
            waitingB = false;
          } else if (m.type === 'track') {
            issLine.geometry.dispose();
            issLine.geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(m.pos, 3));
          }
        };

        /* ---------- time ---------- */
        let simT = Date.now();
        let last = performance.now();
        const stepFor = (s) => (s === 1 ? 10000 : 60000); // sim ms between position updates
        request(simT);
        request(simT + stepFor(1));
        let lastTrack = 0;

        /* ---------- interaction ---------- */
        /* Start with the Sun to the right and slightly behind the globe, so the day/night line and the city lights face the
           visitor. Rotating about y adds to a direction's azimuth atan2(x, z). */
        const s0 = sunDir(Date.now());
        /* Drag: the pointer moves a target (yawT, pitchT); the globe eases toward it every frame, so it follows smoothly
           instead of jumping between pointer events. On release the last drag speed carries on and dies away.
           Mouse/pen: drag any direction. Touch: sideways only, so vertical swipes still scroll the page. */
        const PITCH = 0.38; // resting tilt
        const PITCH_MAX = 1.15; // how far up/down a drag can tilt (~66°)
        let yaw = Math.atan2(1, -0.35) - Math.atan2(s0[0], s0[2]);
        let yawT = yaw;
        let pitch = PITCH;
        let pitchT = PITCH;
        let velX = 0;
        let velY = 0;
        let tiltX = 0;
        let tiltY = 0;
        let targetX = 0;
        let targetY = 0;
        let dragging = false;
        let dragTouch = false;
        let lastPX = 0;
        let lastPY = 0;
        const DRAG = 0.0055; // radians per pixel
        const pointer = { x: -1, y: -1, moved: false };
        const onMove = (e) => {
          targetX = (e.clientY / window.innerHeight - 0.5) * 0.35;
          targetY = (e.clientX / window.innerWidth - 0.5) * 0.5;
          const r = el.getBoundingClientRect();
          pointer.x = e.clientX - r.left;
          pointer.y = e.clientY - r.top;
          pointer.moved = true;
          if (dragging) {
            const dx = (e.clientX - lastPX) * DRAG;
            const dy = dragTouch ? 0 : (e.clientY - lastPY) * DRAG;
            yawT += dx;
            pitchT = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, pitchT + dy));
            // Smoothed drag speed, used for the glide after release.
            velX = velX * 0.5 + dx * 0.5;
            velY = velY * 0.5 + dy * 0.5;
            lastPX = e.clientX;
            lastPY = e.clientY;
          }
        };
        const onDown = (e) => {
          dragging = true;
          dragTouch = e.pointerType === 'touch';
          lastPX = e.clientX;
          lastPY = e.clientY;
          velX = 0;
          velY = 0;
          if (!dragTouch) renderer.domElement.setPointerCapture?.(e.pointerId);
          el.classList.add('is-dragging');
        };
        const onUp = () => {
          dragging = false;
          el.classList.remove('is-dragging');
        };
        const onLeave = () => {
          pointer.x = -1;
          setHover(null);
          satU.uHover.value = -1;
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        renderer.domElement.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        renderer.domElement.addEventListener('pointerleave', onLeave);

        /* ---------- layout ---------- */
        let baseDist = 4.4;
        const resize = () => {
          const w = el.clientWidth;
          const h = el.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // Desktop: globe on the right; phones: globe up top, name below.
          // Phones: pull back so the whole globe fits the narrow screen.
          baseDist = w >= 900 ? 4.4 : 4.4 * Math.min(1.9, Math.max(1, (h / w) * 0.72));
          if (w >= 900) camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
          else camera.setViewOffset(w, h, 0, h * 0.14, w, h);
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        let visible = true;
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
        io.observe(el);

        /* ---------- hover: nearest satellite to the cursor (screen space) ---------- */
        const v = new THREE.Vector3();
        const camPos = new THREE.Vector3();
        let hoverFrame = 0;
        const pickHover = (mix) => {
          if (pointer.x < 0) return;
          const w = el.clientWidth;
          const h = el.clientHeight;
          camera.getWorldPosition(camPos);
          const m = inertial.matrixWorld;
          let best = -1;
          let bestD = 14 * 14;
          let bx = 0;
          let by = 0;
          const A = aA.array;
          const B = aB.array;
          for (let i = 0; i < N; i++) {
            const x = A[i * 3] + (B[i * 3] - A[i * 3]) * mix;
            const y = A[i * 3 + 1] + (B[i * 3 + 1] - A[i * 3 + 1]) * mix;
            const z = A[i * 3 + 2] + (B[i * 3 + 2] - A[i * 3 + 2]) * mix;
            if (x * x + y * y + z * z < 0.25) continue;
            v.set(x, y, z).applyMatrix4(m);
            // Hidden behind the Earth? (segment camera -> point passes within radius 1 of the centre before the point)
            const dx = v.x - camPos.x;
            const dy = v.y - camPos.y;
            const dz = v.z - camPos.z;
            const len2 = dx * dx + dy * dy + dz * dz;
            const t = -(camPos.x * dx + camPos.y * dy + camPos.z * dz) / len2;
            if (t > 0 && t < 1) {
              const cx = camPos.x + dx * t;
              const cy = camPos.y + dy * t;
              const cz = camPos.z + dz * t;
              if (cx * cx + cy * cy + cz * cz < 1) continue;
            }
            v.project(camera);
            if (v.z > 1) continue;
            const sx = (v.x * 0.5 + 0.5) * w;
            const sy = (-v.y * 0.5 + 0.5) * h;
            const d = (sx - pointer.x) ** 2 + (sy - pointer.y) ** 2;
            if (d < bestD) {
              bestD = d;
              best = i;
              bx = sx;
              by = sy;
            }
          }
          satU.uHover.value = best;
          if (best < 0) setHover(null);
          else {
            const x = A[best * 3] + (B[best * 3] - A[best * 3]) * mix;
            const y = A[best * 3 + 1] + (B[best * 3 + 1] - A[best * 3 + 1]) * mix;
            const z = A[best * 3 + 2] + (B[best * 3 + 2] - A[best * 3 + 2]) * mix;
            const alt = Math.round(Math.sqrt(x * x + y * y + z * z) * R_KM - R_KM);
            setHover({ name: meta.names[best], cls: CLASS_NAMES[meta.classes[best]], alt, x: bx, y: by });
          }
        };

        /* ---------- loop ---------- */
        let raf = 0;
        let hudTick = 0;
        const frame = () => {
          raf = requestAnimationFrame(frame);
          const now = performance.now();
          const dt = Math.min(0.1, (now - last) / 1000);
          last = now;
          if (!visible || document.hidden || !tB) return;

          const s = speedRef.current;
          simT += dt * 1000 * s;
          // Keep the next buffer coming: once time passes the newest buffer, ask for the one after.
          if (!waitingB && simT >= tB) {
            waitingB = true;
            request(Math.max(simT, tB) + stepFor(s));
          }
          if (simT - lastTrack > 300000 && issIndex >= 0) {
            lastTrack = simT;
            worker.postMessage({ type: 'track', index: issIndex, t: simT });
          }
          const mix = Math.min(1, Math.max(0, (simT - tA) / step));
          satU.uMix.value = mix;

          // Earth turns with real time; the Sun lights the right side.
          earth.rotation.y = gmst(simT);
          const sd = sunDir(simT);
          sunU.value.set(sd[0], sd[1], sd[2]).applyQuaternion(root.quaternion).normalize();

          // Visitor: momentum spin, gentle auto-turn, lean toward the cursor, turn with scroll.
          // Frame-rate independent easing: the same feel at 30, 60 or 120 fps.
          const k = (rate) => 1 - Math.pow(1 - rate, dt * 60);
          if (!dragging) {
            // Glide after release, then a slow return of the tilt toward its resting angle.
            yawT += velX + (reduce ? 0 : dt * 0.012);
            pitchT = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, pitchT + velY));
            velX *= Math.pow(0.93, dt * 60);
            velY *= Math.pow(0.93, dt * 60);
            if (Math.abs(velY) < 0.0005) pitchT += (PITCH - pitchT) * k(0.006);
          }
          yaw += (yawT - yaw) * k(0.18);
          pitch += (pitchT - pitch) * k(0.18);
          tiltX += (targetX - tiltX) * k(0.05);
          tiltY += (targetY - tiltY) * k(0.05);
          const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
          root.rotation.set(pitch + tiltX, yaw + tiltY + scroll * 0.9, 0, 'XYZ');
          camera.position.set(0, 0, baseDist + scroll * 1.6);
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);

          if (pointer.moved && ++hoverFrame % 2 === 0) {
            pointer.moved = false;
            pickHover(mix);
          }
          if (now - hudTick > 1000) {
            hudTick = now;
            setHud({ count: N, classes: counts, time: hhmmss(simT) });
          }
        };
        raf = requestAnimationFrame(frame);
        setMode('ready');

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          ro.disconnect();
          io.disconnect();
          worker.terminate();
          renderer.dispose();
          renderer.domElement.remove();
          [geo, earth.geometry, atmo.geometry, issLine.geometry].forEach((g) => g.dispose());
          [dayTex, nightTex].forEach((t) => t.dispose());
        };
      } catch {
        if (!disposed) setMode('fallback');
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  if (mode === 'fallback') {
    return fallbackVideo ? <Video src={fallbackVideo} className="media is-cover" /> : null;
  }

  return (
    <div ref={wrap} className={`orin-globe ${mode === 'ready' ? 'is-ready' : ''}`}>
      {mode === 'ready' && (
        <>
          <div className="orin-globe__hud mono-label" aria-hidden="true">
            <span className="orin-globe__live">
              <span className="orin-globe__dot" />
              {speed === 1 ? 'Live' : `×${speed}`} · {hud.time} UTC
            </span>
            <span>
              {hud.count.toLocaleString('en-US')} active satellites · LEO {hud.classes[0].toLocaleString('en-US')} · MEO{' '}
              {hud.classes[1].toLocaleString('en-US')} · GEO {hud.classes[2].toLocaleString('en-US')}
            </span>
          </div>
          <div className="orin-globe__speed" role="group" aria-label="Time speed">
            {SPEEDS.map((s) => (
              <button key={s} type="button" className={`mono-label ${speed === s ? 'is-on' : ''}`} onClick={() => setSpeed(s)}>
                {s === 1 ? 'Live' : `×${s}`}
              </button>
            ))}
          </div>
          <span className="orin-globe__credit mono-label">Orbits: CelesTrak · Earth: NASA</span>
          {hover && (
            <span className="orin-globe__tip mono-label" style={{ left: hover.x, top: hover.y }}>
              <strong>{hover.name}</strong>
              <span>
                {hover.cls} · {hover.alt.toLocaleString('en-US')} km
              </span>
            </span>
          )}
        </>
      )}
    </div>
  );
}
