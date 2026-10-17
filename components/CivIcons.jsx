/* Line icons for the IRIS CIV page: 24×24, 1.5px white strokes, no fill. One look, drawn here (no icon library). */
const PATHS = {
  phone: (
    <path d="M6.5 3h3L11 7 9 8.5A11 11 0 0 0 15.5 15L17 13l4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5a2 2 0 0 1 2-2z" />
  ),
  building: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-6h6v6M3 21h18" />
    </>
  ),
  verify: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  floorplan: (
    <>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M3 11h7v9M10 4v4M14 11h7M14 11v3" />
      <circle cx="17" cy="16.5" r="1.2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  sight: (
    <>
      <circle cx="5" cy="12" r="2" />
      <path d="M7 11l14-6M7 13l14 6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.5a3 3 0 0 1 0 5M18 14.5c1.8.8 3 2.6 3 5" />
    </>
  ),
  eyeoff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3 3.6M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4.4-1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8 17c.6-2 2.2-3 4-3s3.4 1 4 3" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8z" />
      <path d="M12 17v4" />
    </>
  ),
};

export default function CivIcon({ name, className = '' }) {
  return (
    <svg className={`civ-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
