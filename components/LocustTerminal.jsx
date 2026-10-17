'use client';

import { useRef, useState } from 'react';

/** Theatre: no action, no fetch, no storage. Every attempt ends in INVALID DETAILS. */
export default function LocustTerminal({ terminal }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const form = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg('');
    setTimeout(() => {
      form.current?.querySelectorAll('input').forEach((i) => {
        i.value = '';
      });
      setBusy(false);
      setMsg(terminal.invalid);
    }, 1200);
  };

  return (
    <section className="terminal-section" aria-label={terminal.title}>
      <form className="terminal" ref={form} onSubmit={onSubmit} autoComplete="off" noValidate>
        <div className="terminal__title section-label" style={{ color: 'var(--ink-inverse-muted)' }}>
          <span>{terminal.title}</span>
          <span className="cursor" aria-hidden="true" />
        </div>
        {terminal.fields.map((f) => (
          <div className="field" key={f.id}>
            <label className="mono-label" htmlFor={f.id}>
              {f.label}
            </label>
            <input
              id={f.id}
              name={f.id}
              type={f.masked ? 'password' : 'text'}
              placeholder=".........."
              autoComplete="off"
              spellCheck={false}
              onInput={(e) => {
                if (!f.masked) e.currentTarget.value = e.currentTarget.value.toUpperCase();
              }}
            />
          </div>
        ))}
        <button className="button terminal__button" type="submit" disabled={busy}>
          {busy ? <span className="dots">{terminal.verifying}</span> : terminal.enter}
        </button>
        <span className="terminal__msg mono-label" role="status" aria-live="polite">
          {msg}
        </span>
      </form>
      <p className="terminal-section__note section-label">{terminal.note}</p>
    </section>
  );
}
