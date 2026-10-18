import Site from '@/components/Site';
import ProductHero from '@/components/ProductHero';
import CivIcon from '@/components/CivIcons';
import CivShot from '@/components/CivShot';
import StepCards from '@/components/StepCards';
import { civ } from '@/content/civ';
import { findMedia } from '@/lib/media';

export const metadata = civ.meta;

/* IRIS CIV tells one story, top to bottom: the 60-second promise, how it works (four steps, the first three inside
   the 60 seconds), what every officer sees, why police use it, where it is used. Hero image: public/media/iris-civ/hero.* */
export default function IrisCivPage() {
  return (
    <Site>
      <ProductHero
        name={civ.name}
        fullName={civ.fullName}
        explainer={civ.explainer}
        label={civ.heroLabel}
        media={findMedia('iris-civ/hero')}
        focus={civ.heroFocus}
        cover
      />

      <section className="civ-stat" aria-label="Response time">
        <p className="civ-stat__value">
          {civ.stat.value}
          <span className="civ-stat__unit section-label">{civ.stat.unit}</span>
        </p>
        <p className="civ-stat__text">{civ.stat.text}</p>
      </section>

      <section className="product-section" aria-labelledby="civ-flow">
        {/* The note at the right of the label: steps 01–03, the call to a confirmed threat on every officer's screen. */}
        <div className="product-section__head">
          <h2 className="product-section__label section-label" id="civ-flow">{civ.flowLabel}</h2>
          <span className="product-section__note mono-label">{civ.bracket}</span>
        </div>
        {/* The four steps as touching full-width cards. Images: public/media/iris-civ/step-1…4.* */}
        <StepCards steps={civ.steps} media="iris-civ" />
      </section>

      <section className="product-section" aria-labelledby="civ-sees">
        <h2 className="product-section__label section-label" id="civ-sees">{civ.seesLabel}</h2>
        <CivShot image={civ.seesImage} points={civ.sees} />
      </section>

      <section className="product-section" aria-labelledby="civ-why">
        <h2 className="product-section__label section-label" id="civ-why">{civ.pillarsLabel}</h2>
        <div className="civ-pillars">
          {civ.pillars.map((p) => (
            <div className="civ-pillar" key={p.title}>
              <CivIcon name={p.icon} />
              <h3 className="h3">{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rows" aria-label={civ.useCasesLabel}>
        <span className="rows__label section-label">{civ.useCasesLabel}</span>
        {civ.useCases.map((u) => (
          <div className="row" key={u.name}>
            <h3 className="row__name h3">{u.name}</h3>
            <p className="row__text body">{u.text}</p>
          </div>
        ))}
      </section>

      <section className="banner">
        <h2 className="h1">{civ.banner}</h2>
      </section>
    </Site>
  );
}
