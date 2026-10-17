import Site from '@/components/Site';
import ProductHero from '@/components/ProductHero';
import AlertChain from '@/components/AlertChain';
import { civ } from '@/content/civ';
import { findMedia } from '@/lib/media';

export const metadata = civ.meta;

/* Same shape as the defense product pages: name up top, the hero video (public/media/iris-civ-hero.*) underneath. */
export default function IrisCivPage() {
  return (
    <Site>
      <ProductHero
        name={civ.name}
        fullName={civ.fullName}
        explainer={civ.explainer}
        label={civ.heroLabel}
        media={findMedia('iris-civ/hero')}
      />
      <AlertChain chain={civ.chain} arrival={civ.arrival} />
      <section className="banner">
        <h2 className="h1">{civ.banner}</h2>
      </section>
      <section className="ipl ipl--text" aria-label="What IRIS CIV gives the police">
        <div className="ipl__list">
          {civ.list.map((it, i) => (
            <div className="ipl__item" key={it.title}>
              <span className="ipl__num mono-label">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{it.title}</h3>
              <p className="body">{it.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rows rows--band" aria-label={civ.useCasesLabel}>
        <span className="rows__label section-label">{civ.useCasesLabel}</span>
        {civ.useCases.map((u) => (
          <div className="row" key={u.name}>
            <h3 className="row__name h3">{u.name}</h3>
            <p className="row__text body">{u.text}</p>
          </div>
        ))}
      </section>
    </Site>
  );
}
