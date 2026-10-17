import Site from '@/components/Site';
import { Arrow } from '@/components/Icons';
import { careers } from '@/content/company';
import { site } from '@/content/site';

export const metadata = careers.meta;

export default function CareersPage() {
  return (
    <Site>
      <section className="text-hero">
        <span className="section-label">{careers.label}</span>
        <h1 className="h1">{careers.headline}</h1>
      </section>
      <section className="rows" aria-label="Open roles" style={{ paddingTop: 0 }}>
        <span className="rows__label section-label">Open roles</span>
        {careers.open.length === 0 ? (
          <div className="row">
            <h3 className="row__name h3">None today</h3>
            <p className="row__text body">{careers.openEmpty}</p>
          </div>
        ) : (
          careers.open.map((r) => (
            <div className="row" key={r.name}>
              <h3 className="row__name h3">{r.name}</h3>
              <p className="row__text body">{r.text}</p>
            </div>
          ))
        )}
      </section>
      <section className="rows" aria-label="Future roles" style={{ paddingTop: 0 }}>
        <span className="rows__label section-label">Future roles</span>
        {careers.future.map((r) => (
          <div className="row" key={r.name}>
            <h3 className="row__name h3">{r.name}</h3>
            <p className="row__text body">
              {r.text}
              <br />
              <a className="arrow-link nav-label" href={`mailto:${site.email}?subject=${encodeURIComponent(r.name)}`}>
                <span>Write to us</span>
                <Arrow />
              </a>
            </p>
          </div>
        ))}
      </section>
    </Site>
  );
}
