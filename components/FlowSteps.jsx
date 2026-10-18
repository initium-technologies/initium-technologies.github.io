import FlowSand from './FlowSand';

/* A workflow: numbered steps in a row, each starting at a small point on a line that runs into the next step, with
   sand grains (FlowSand) rising from each point and streaming along the line. Stacked on phones. Used by IRIS (concept
   of operations) and IRIS CIV (how it works). A step is { tag, title, text? }; `long` sets long titles a size down. */
export default function FlowSteps({ steps, long = false }) {
  return (
    <div className="flow-wrap">
      <ol className={`flow${long ? ' flow--long' : ''}`}>
        {steps.map((s, i) => (
          <li className="flow-step" key={s.title}>
            <div className="flow-step__head" aria-hidden="true">
              <span className="flow-step__node" />
              {i < steps.length - 1 && <span className="flow-step__arrow" />}
            </div>
            <span className="flow-step__tag mono-label">
              {String(i + 1).padStart(2, '0')} · {s.tag}
            </span>
            <h3 className="flow-step__title h3">{s.title}</h3>
            {s.text && <p className="flow-step__text">{s.text}</p>}
          </li>
        ))}
      </ol>
      <FlowSand />
    </div>
  );
}
