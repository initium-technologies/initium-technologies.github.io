import Site from '@/components/Site';
import Media from '@/components/Media';
import { findMedia } from '@/lib/media';
import { company } from '@/content/company';

export const metadata = company.meta;

/* About: the office INITIUM sign fills the screen behind the headline (public/media/company/hero.*), then the text and
   contact. Same hero as the product pages. */
export default function CompanyPage() {
  return (
    <Site>
      <section className="hero hero--cover hero--about">
        <Media media={findMedia('company/hero')} cover focus={company.heroFocus} alt={company.heroAlt} />
        <div className="hero__row">
          <h1 className="hero__name h1">{company.headline}</h1>
          <div className="hero__side">
            <span className="section-label">{company.label}</span>
          </div>
        </div>
      </section>
      <div className="prose">
        <div className="prose__inner">
          {company.argument.map((p) => (
            <p className="body-l" key={p}>{p}</p>
          ))}
        </div>
      </div>
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
