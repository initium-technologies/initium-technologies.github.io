import DotField from './DotField';

export default function AlertChain({ chain, arrival }) {
  return (
    <section className="alert-wrap" aria-label="Alert chain">
      <div className="alert">
        <span className="alert__label section-label" style={{ color: 'var(--ink-inverse-muted)' }}>
          Alert chain
        </span>
        <div className="alert__grid">
          {chain.map((c) => (
            <div className="alert__cell" key={c.num}>
              <DotField mode={c.field} className="alert__canvas" />
              <span className="alert__num mono-label">{c.num}</span>
              <h3 className="h3">{c.title}</h3>
              <p className="body">{c.text}</p>
            </div>
          ))}
          <div className="alert__cell alert__cell--wide">
            <div>
              <span className="alert__num mono-label">{arrival.num}</span>
              <h3 className="h3">{arrival.title}</h3>
              <p className="body">{arrival.text}</p>
              <p className="body">
                <strong>{arrival.bold}</strong>
              </p>
            </div>
            <DotField mode={arrival.field} className="alert__canvas" />
          </div>
        </div>
      </div>
    </section>
  );
}
