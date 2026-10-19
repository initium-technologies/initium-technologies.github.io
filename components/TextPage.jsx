import Site from './Site';

/** Light-theme text template for Company, Careers, Events and the legal pages. */
export default function TextPage({ label, headline, updated, children }) {
  return (
    <Site>
      <section className="text-hero">
        {label && <span className="section-label">{label}</span>}
        <h1 className="h1">{headline}</h1>
      </section>
      <div className="prose">
        <div className="prose__inner">
          {updated && <span className="label">Last updated · {updated}</span>}
          {children}
        </div>
      </div>
    </Site>
  );
}
