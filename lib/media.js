import fs from 'fs';
import path from 'path';

/* Media slots are resolved from files on disk at build time: drop `public/media/<name>.<ext>` in and the
   matching slot renders it on the next deploy; with no file, the slot shows its labelled placeholder.
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
