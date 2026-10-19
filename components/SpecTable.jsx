/* Environment specification (IRIS): a compact table, one row per parameter: the parameter in caps, its rating and the
   detail. It sits in a black panel with rounded corners on the grey that continues down from the description above,
   shaped like a folder: the caption rides in a tab rising from the panel's top-left. Rows do not change on hover.
   On phones each row stacks. */
export default function SpecTable({ specs, id }) {
  const [parameter, rating, detail] = specs.columns;
  return (
    <section className="product-section specs grey" aria-labelledby={id}>
      <div className="specs__box">
        <h2 className="specs__tab label" id={id}>
          {specs.caption}
        </h2>
        <div className="specs__body">
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
                  <th scope="row" className="spec-table__label label">
                    {s.label}
                  </th>
                  <td className="spec-table__figure">{s.figure}</td>
                  <td className="spec-table__detail">{s.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
