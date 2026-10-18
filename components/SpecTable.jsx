/* Environment specification (IRIS): a compact table, one row per parameter: the parameter in mono caps, its rating in
   mono and the detail. A caption line above names the table and counts the parameters. Rows do not change on hover.
   On phones each row stacks. */
export default function SpecTable({ specs, id }) {
  const pad = (n) => String(n).padStart(2, '0');
  const [parameter, rating, detail] = specs.columns;
  return (
    <section className="product-section specs" aria-labelledby={id}>
      <h2 className="product-section__label section-label" id={id}>
        {specs.label}
      </h2>
      <div className="specs__caption mono-label">
        <span>{specs.caption}</span>
        <span>{pad(specs.items.length)} parameters</span>
      </div>
      <table className="spec-table">
        <thead className="spec-table__head">
          <tr>
            <th scope="col">{parameter}</th>
            <th scope="col">{rating}</th>
            <th scope="col">{detail}</th>
          </tr>
        </thead>
        <tbody>
          {specs.items.map((s) => (
            <tr key={s.label}>
              <th scope="row" className="spec-table__label mono-label">
                {s.label}
              </th>
              <td className="spec-table__figure">{s.figure}</td>
              <td className="spec-table__detail">{s.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
