'use client';

import { useEffect, useRef, useState } from 'react';
import { Mark } from './Icons';

/* The Locus Terminal on ORIN and MANTIS, after initiumterminal.com: a grey box with a slim title bar (the <II> mark). Its heading types itself out
   when scrolled into view, then the access code and password fields appear, each echoing into an input box with a
   block cursor, then the LOG IN button. Enter moves to the next field, then logs in.
   Theatre: no action, no fetch, no storage. Every attempt ends in INVALID DETAILS. */

/* A duration token from app/tokens.css, in ms. */
const ms = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
const wait = (t) => new Promise((resolve) => setTimeout(resolve, t));

export default function LocustTerminal({ terminal }) {
  const { title, fields } = terminal;
  const [typed, setTyped] = useState(0);
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState(() => fields.map(() => ''));
  const [focus, setFocus] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const section = useRef(null);
  const inputs = useRef([]);
  const timer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      setTyped(title.length);
      setReady(true);
    };
    const boot = async () => {
      const tick = ms('--duration-type');
      for (let c = 1; c <= title.length; c += 1) {
        await wait(tick);
        if (cancelled) return;
        setTyped(c);
      }
      await wait(ms('--duration-boot-line'));
      if (!cancelled) setReady(true);
    };

    /* Reduced motion: the final frame, no typing. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      finish();
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        boot();
      },
      { threshold: 0.4 },
    );
    io.observe(section.current);
    return () => {
      cancelled = true;
      io.disconnect();
      clearTimeout(timer.current);
    };
  }, [title]);

  const submit = () => {
    if (busy) return;
    setBusy(true);
    setMsg('');
    timer.current = setTimeout(() => {
      setValues(fields.map(() => ''));
      setBusy(false);
      setMsg(terminal.invalid);
      inputs.current[0]?.focus();
    }, ms('--duration-verify'));
  };

  /* Enter moves to the next field; on the last one it logs in. */
  const onKeyDown = (i) => (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (i < fields.length - 1) inputs.current[i + 1]?.focus();
    else submit();
  };

  const onChange = (i, masked) => (e) => {
    const v = masked ? e.target.value : e.target.value.toUpperCase();
    setValues((prev) => prev.map((p, j) => (j === i ? v : p)));
  };

  return (
    <section className="terminal-section" aria-label={title} ref={section}>
      <form
        className="term"
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="term__bar" aria-hidden="true">
          <Mark />
        </div>
        <div className="term__body">
          <h2 className="term__title">
            <span className="sr-only">{title}</span>
            <span aria-hidden="true">
              {title.slice(0, typed)}
              <span className="term__ghost">{title.slice(typed)}</span>
            </span>
          </h2>
          <div className={`term__fields${ready ? ' is-on' : ''}`} inert={!ready}>
            {fields.map((f, i) => {
              const v = values[i];
              const cursor = !busy && (focus === i || (focus === -1 && i === 0));
              return (
                <div className="term__field" key={f.id}>
                  <label className="term__label" htmlFor={f.id}>
                    {f.label}
                  </label>
                  <div className="term__entry">
                    <span className="term__echo" aria-hidden="true">
                      {f.masked ? '•'.repeat(v.length) : v}
                    </span>
                    {cursor && <span className="cursor" aria-hidden="true" />}
                    <input
                      className="term__input"
                      id={f.id}
                      type={f.masked ? 'password' : 'text'}
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      value={v}
                      maxLength={32}
                      readOnly={busy}
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck={false}
                      onChange={onChange(i, f.masked)}
                      onKeyDown={onKeyDown(i)}
                      onFocus={() => setFocus(i)}
                      onBlur={() => setFocus(-1)}
                    />
                  </div>
                </div>
              );
            })}
            <p className="term__msg" role="status" aria-live="polite">
              {busy ? <span className="dots">{terminal.verifying}</span> : msg}
            </p>
            <button className="term__enter" type="submit" disabled={busy}>
              {terminal.enter}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
