/** A labelled stand-in for an image or video until the real asset exists. ratio like "21/9"; cover fills its positioned parent. */
export default function Placeholder({ label, ratio, cover = false, className = '', style }) {
  return (
    <div
      className={`ph ${cover ? 'is-cover' : ''} ${className}`}
      data-label={label}
      role="img"
      aria-label={`Placeholder: ${label}`}
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...style }}
    />
  );
}
