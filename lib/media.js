import fs from 'fs';
import path from 'path';

/* Media slots are resolved from files on disk at build time: drop `public/media/<page>/<slot>.<ext>` in (e.g.
   findMedia('iris/hero') → public/media/iris/hero.jpg) and the slot shows it; with no file, the slot is an empty box.
   See public/media/README.md for every slot.
   Server components only (uses the filesystem). The first extension found wins. */
const EXTS = ['mp4', 'webm', 'jpg', 'jpeg', 'png', 'webp', 'avif'];
const VIDEO = new Set(['mp4', 'webm']);

export function findMedia(name) {
  if (!name) return null;
  const dir = path.join(process.cwd(), 'public', 'media');
  for (const ext of EXTS) {
    const file = `${name}.${ext}`;
    if (fs.existsSync(path.join(dir, file))) {
      return { src: `/media/${file}`, video: VIDEO.has(ext), name };
    }
  }
  return null;
}

export const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
