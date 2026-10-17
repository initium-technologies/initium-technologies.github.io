export default function StatsStrip({ stats, capabilities }) {
  return (
    <section className="stats-wrap" aria-label="Key figures">
      <div className="stats" style={{ '--cells': stats.length }}>
        {stats.map((s) => (
          <div className={`stats__cell ${s.confirm ? 'is-confirm' : ''}`} key={s.label}>
            <span className={`stat-value ${s.value.length > 8 ? 'is-xlong' : s.long || s.value.length > 4 ? 'is-long' : ''}`}>{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
      {capabilities && (
        <div className="stats__caps mono-label" aria-label="Capabilities">
          {capabilities.map((c, i) => (
            <span key={c}>
              {i > 0 && <span aria-hidden="true">· </span>}
              {c}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
