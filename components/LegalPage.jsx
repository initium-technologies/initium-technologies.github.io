import TextPage from './TextPage';

/* A legal page (Privacy Policy, Terms and Conditions) from content/company.js `legal`: the title, the date, then each
   section's optional heading and its blocks, a paragraph (a string) or a bulleted list ({ list: [...] }). */
export default function LegalPage({ doc }) {
  return (
    <TextPage headline={doc.title} updated={doc.updated}>
      {doc.sections.map((s, i) => (
        <div key={s.h || i}>
          {s.h && <h2 className="h3">{s.h}</h2>}
          {[].concat(s.p).map((b, j) =>
            typeof b === 'string' ? (
              <p className="body" key={j}>{b}</p>
            ) : (
              <ul className="prose__list body" key={j}>
                {b.list.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ),
          )}
        </div>
      ))}
    </TextPage>
  );
}
