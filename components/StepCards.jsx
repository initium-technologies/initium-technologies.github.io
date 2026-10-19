import Media from './Media';
import { findMedia } from '@/lib/media';

/* Steps as cards stacked down the page (IRIS CIV concept of operations), after Anduril's build-qualities cards:
   full-width bands touching edge to edge, alternating grey and black (01, 03 grey; 02, 04 black). A large number at
   the top left with its time under it, the step title in Julius, its text, and the image filling the right part of the
   band to its top, bottom and the page's right edge (plain black until public/media/<media>/step-N.* exists). Every
   card in the list is as tall as the tallest. A step is { tag, title, text?, time? } (time: a short line under the
   number, e.g. 0–5 seconds). `last`: content that replaces the last step's image and runs full width under its title
   (IRIS CIV: the officer screen); that band keeps its own height. */
export default function StepCards({ steps, media, last = null }) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <ol className={`step-cards${last ? ' step-cards--last' : ''}`} style={last ? { '--rows': steps.length - 1 } : undefined}>
      {steps.map((s, i) => {
        const wide = last && i === steps.length - 1;
        return (
          <li className={`step-card${i % 2 ? ' step-card--dark' : ''}${wide ? ' step-card--wide' : ''}`} key={s.title}>
            <div className="step-card__lead">
              <span className="step-card__num">{pad(i + 1)}</span>
              {s.time && <span className="step-card__time label">{s.time}</span>}
            </div>
            <div className="step-card__body">
              <h3 className="step-card__title">{s.title}</h3>
              {s.text && <p className="step-card__text">{s.text}</p>}
              {wide && <div className="step-card__extra">{last}</div>}
            </div>
            {!wide && (
              <div className="step-card__media">
                <Media media={findMedia(`${media}/step-${i + 1}`)} label={`IMAGE · ${s.tag} · 16:9`} cover alt="" />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
