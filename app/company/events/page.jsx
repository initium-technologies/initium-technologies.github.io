import Site from '@/components/Site';
import { Arrow } from '@/components/Icons';
import { events } from '@/content/company';
import { site } from '@/content/site';

export const metadata = events.meta;

export default function EventsPage() {
  return (
    <Site>
      <section className="text-hero">
        <span className="section-label">{events.label}</span>
        <h1 className="h1">{events.headline}</h1>
      </section>
      <section className="rows" aria-label="Events" style={{ paddingTop: 0 }}>
        {events.items.map((e) => (
          <div className="row" key={e.name}>
            <div className="row__name">
              <h3 className="h3">{e.name}</h3>
              <span className="mono-label" style={{ display: 'block', marginTop: 'var(--space-3)' }}>{e.when} · {e.where}</span>
            </div>
            <p className="row__text body">
              {e.text}
              <br />
              <a className="arrow-link nav-label" href={`mailto:${site.email}?subject=${encodeURIComponent(e.name)}`}>
                <span>{events.cta}</span>
                <Arrow />
              </a>
            </p>
          </div>
        ))}
      </section>
    </Site>
  );
}
