export function Plus({ className = '' }) {
  return <span className={`plus ${className}`} aria-hidden="true" />;
}

export function Arrow() {
  return (
    <span className="icon" aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M4 12 12 4M6 4h6v6" /></svg>
    </span>
  );
}

export function Chevron() {
  return (
    <span className="icon" aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" /></svg>
    </span>
  );
}

export function Wordmark({ className = '' }) {
  return <span className={`wordmark ${className}`}>INITIUM</span>;
}

export function Mark({ className = '' }) {
  return <span className={`mark ${className}`} role="img" aria-label="Initium mark" />;
}
