/* Orbit worker for the ORIN globe. Runs off the main thread so the page stays smooth.
   - 'load' { text }: parse the TLE catalogue (public/data/satellites.tle); reply 'meta' with names and orbit classes.
   - 'at' { t, id }: compute every satellite's position at time t (ms) with SGP4; reply 'pos' with a Float32Array.
   - 'track' { index, t }: one satellite's path for the next 93 minutes (one point a minute); reply 'track'.
   Positions are in Earth radii, in the three.js frame used by the globe: x = ECI x, y = ECI z (north), z = -ECI y. */
import { twoline2satrec, propagate } from 'satellite.js';

const R = 6371; // km per Earth radius
let sats = [];

function classify(rec) {
  // Mean motion (rad/min) -> period -> rough orbit class: LEO < 2,000 km, GEO ~ 1 sidereal day, MEO between.
  const period = (2 * Math.PI) / rec.no; // minutes
  if (period < 128) return 0; // LEO
  if (period > 1300 && period < 1580) return 2; // GEO
  return 1; // MEO / other high orbits
}

self.onmessage = (e) => {
  const m = e.data;
  if (m.type === 'load') {
    const lines = m.text.split('\n');
    sats = [];
    const names = [];
    const classes = [];
    for (let i = 0; i + 2 < lines.length; i += 3) {
      try {
        const rec = twoline2satrec(lines[i + 1], lines[i + 2]);
        if (rec.error) continue;
        sats.push(rec);
        names.push(lines[i].trim());
        classes.push(classify(rec));
      } catch {
        /* skip a bad record */
      }
    }
    self.postMessage({ type: 'meta', names, classes: Uint8Array.from(classes) });
    return;
  }
  if (m.type === 'track') {
    const rec = sats[m.index];
    if (!rec) return;
    const pts = [];
    for (let k = 0; k <= 93; k++) {
      try {
        const p = propagate(rec, new Date(m.t + k * 60000)).position;
        if (p && Number.isFinite(p.x)) pts.push(p.x / R, p.z / R, -p.y / R);
      } catch {
        /* skip */
      }
    }
    const out = Float32Array.from(pts);
    self.postMessage({ type: 'track', pos: out }, [out.buffer]);
    return;
  }
  if (m.type === 'at') {
    const date = new Date(m.t);
    const out = new Float32Array(sats.length * 3);
    for (let i = 0; i < sats.length; i++) {
      let p = null;
      try {
        p = propagate(sats[i], date).position;
      } catch {
        p = null;
      }
      if (p && Number.isFinite(p.x)) {
        out[i * 3] = p.x / R;
        out[i * 3 + 1] = p.z / R;
        out[i * 3 + 2] = -p.y / R;
      } else {
        out[i * 3] = out[i * 3 + 1] = out[i * 3 + 2] = 0; // decayed / failed: parked at the centre, hidden by the Earth
      }
    }
    self.postMessage({ type: 'pos', t: m.t, id: m.id, pos: out }, [out.buffer]);
  }
};
