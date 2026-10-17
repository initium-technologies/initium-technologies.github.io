import Site from '@/components/Site';
import Media from '@/components/Media';
import { findMedia, slug } from '@/lib/media';
import { company } from '@/content/company';

export const metadata = company.meta;

export default function CompanyPage() {
  return (
    <Site>
      <section className="text-hero">
        <span className="section-label">{company.label}</span>
        <h1 className="h1">{company.headline}</h1>
      </section>
      <div className="prose">
        <div className="prose__inner">
          {company.argument.map((p) => (
            <p className="body-l" key={p}>{p}</p>
          ))}
        </div>
      </div>
      <section className="people" aria-label="Leadership">
        {company.leadership.map((p) => (
          <div className="person" key={p.name}>
            <Media media={findMedia(`portrait-${slug(p.name)}`)} label={p.label} ratio="4 / 5" alt={p.name} />
            <div className="h3">{p.name}</div>
            <div className="small">{p.title}</div>
          </div>
        ))}
      </section>
      <section className="rows" aria-label="Contact">
        <span className="rows__label section-label">Contact</span>
        {company.contact.map((c) => (
          <div className="row" key={c.name}>
            <h3 className="row__name h3">{c.name}</h3>
            <p className="row__text body">{c.href ? <a className="link" href={c.href}>{c.text}</a> : c.text}</p>
          </div>
        ))}
      </section>
    </Site>
  );
}
