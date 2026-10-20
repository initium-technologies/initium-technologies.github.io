// Refresh the ORIN globe's satellite catalogue: every active satellite's orbit (two-line elements) from CelesTrak.
// Run every few days:  node scripts/update-satellites.mjs   (CelesTrak allows one download every 2 hours; it answers 403
// if asked sooner.) To use a file you already downloaded:  node scripts/update-satellites.mjs path/to/active.tle
// Positions are computed live in the browser from these orbits, so a few days' age is invisible at globe scale.
import { readFileSync, writeFileSync } from 'node:fs';

const SOURCE = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle';
async function download() {
  const res = await fetch(SOURCE, { headers: { 'User-Agent': 'initium-website (admin@initiumtechnologies.com)' } });
  if (!res.ok) throw new Error(`CelesTrak ${res.status}${res.status === 403 ? ' (downloaded too recently; wait 2 hours)' : ''}`);
  return res.text();
}
const text = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : await download();
const lines = text.split(/\r?\n/).map((l) => l.trimEnd()).filter(Boolean);
const out = [];
for (let i = 0; i + 2 < lines.length + 1; i += 3) {
  const [name, l1, l2] = lines.slice(i, i + 3);
  if (l1?.startsWith('1 ') && l2?.startsWith('2 ')) out.push(name.trim(), l1, l2);
}
// A CelesTrak error page or a cut-off download must never replace a good catalogue (the globe would go empty).
const MIN_SATELLITES = 5000;
if (out.length / 3 < MIN_SATELLITES) {
  throw new Error(`only ${out.length / 3} satellites parsed (expected at least ${MIN_SATELLITES}); catalogue not written`);
}
writeFileSync(new URL('../public/data/satellites.tle', import.meta.url), out.join('\n') + '\n');
console.log(`${out.length / 3} satellites, ${new Date().toISOString()}`);
