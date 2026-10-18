import Media from './Media';
import { findMedia } from '@/lib/media';

/* Steps as cards stacked down the page (IRIS CIV how it works), after Anduril's build-qualities cards: full-width bands
   touching edge to edge, alternating grey and black (01, 03 grey; 02, 04 black). A large white number at the top left,
   the step title in Julius, its text, and the image filling the right part of the band to its top, bottom and the
   page's right edge (plain black until public/media/<media>/step-N.* exists). Every card in the list is as tall as the
   tallest. A step is { tag, title, text? } (IRIS has titles only). */
export default function StepCards({ steps, media }) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <ol className="step-cards">
      {steps.map((s, i) => (
        <li className={`step-card${i % 2 ? ' step-card--dark' : ''}`} key={s.title}>
          <span className="step-card__num">{pad(i + 1)}</span>
          <div className="step-card__body">
            <h3 className="step-card__title">{s.title}</h3>
            {s.text && <p className="step-card__text">{s.text}</p>}
          </div>
          <div className="step-card__media">
            <Media media={findMedia(`${media}/step-${i + 1}`)} label={`IMAGE · ${s.tag} · 16:9`} cover alt="" />
          </div>
        </li>
      ))}
    </ol>
  );
}
