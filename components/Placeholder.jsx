/** An empty box standing in for an image or video until the real file exists in public/media/. No text inside.
    ratio like "21/9"; cover fills its positioned parent. `label` is kept by callers as a note of what goes there. */
export default function Placeholder({ ratio, cover = false, className = '', style }) {
  return (
    <div
      className={`ph ${cover ? 'is-cover' : ''} ${className}`}
      aria-hidden="true"
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...style }}
    />
  );
}
