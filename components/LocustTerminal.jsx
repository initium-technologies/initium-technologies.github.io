'use client';

import { useEffect, useRef, useState } from 'react';

/* The Locus Terminal, after initiumterminal.com: it boots line by line when scrolled into view (title, then each
   status row types its dots and shows its value), then asks for an access code and a password.
   Theatre: no action, no fetch, no storage. Every attempt ends in INVALID DETAILS. */

/* Label + dots fill this many characters, so every status value starts in the same column. */
const DOT_COLUMN = 20;
const dotsFor = (s) => Math.max(3, DOT_COLUMN - s.label.length);

/* A duration token from app/tokens.css, in ms. */
const ms = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
const wait = (t) => new Promise((resolve) => setTimeout(resolve, t));

export default function LocustTerminal({ terminal }) {
  const { status, fields } = terminal;
  const promptsAt = status.length + 2; // rows: title, one per status, then the prompts
  const [shown, setShown] = useState(0);
  const [typed, setTyped] = useState(0);
  const [settled, setSettled] = useState(0);
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
      setSettled(status.length);
      setShown(promptsAt);
    };
    const boot = async () => {
      const line = ms('--duration-boot-line');
      const tick = ms('--duration-tick');
      setShown(1);
      for (let k = 0; k < status.length; k += 1) {
        await wait(line);
        if (cancelled) return;
        setTyped(0);
        setShown(2 + k);
        for (let d = 1; d <= dotsFor(status[k]); d += 1) {
          await wait(tick);
          if (cancelled) return;
          setTyped(d);
        }
        await wait(line);
        if (cancelled) return;
        setSettled(k + 1);
      }
      await wait(line);
      if (!cancelled) setShown(promptsAt);
    };

    /* Reduced motion: the final frame, no boot. */
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
  }, [status, promptsAt]);

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

  /* Enter moves to the next prompt; on the last one it signs in. */
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

  const on = (cond) => (cond ? ' is-on' : '');

  return (
    <section className="terminal-section" aria-label={terminal.title} ref={section}>
      <form
        className="term"
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <p className={`term__line term__title${on(shown >= 1)}`}>{terminal.title}</p>
        <div className="term__gap" />
        {status.map((s, k) => {
          const n = dotsFor(s);
          const done = settled > k;
          const t = done ? n : shown >= 2 + k ? typed : 0;
          return (
            <p className={`term__line${on(shown >= 2 + k)}`} key={s.label}>
              {s.label}{' '}
              <span aria-hidden="true">
                {'.'.repeat(t)}
                <span className="term__ghost">{'.'.repeat(n - t)}</span>
              </span>{' '}
              <span className={`term__value${on(done)}`}>{s.value}</span>
            </p>
          );
        })}
        <div className="term__gap" />
        <div className={`term__prompts${on(shown >= promptsAt)}`} inert={shown < promptsAt}>
          {fields.map((f, i) => {
            const v = values[i];
            const cursor = !busy && (focus === i || (focus === -1 && i === 0));
            return (
              <div className="term__line term__prompt" key={f.id}>
                <label className="term__ps" htmlFor={f.id}>
                  {f.label}:{' '}
                </label>
                <span aria-hidden="true">{f.masked ? '*'.repeat(v.length) : v}</span>
                {cursor && <span className="cursor" aria-hidden="true" />}
                <input
                  className="term__input"
                  id={f.id}
                  name={f.id}
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
            );
          })}
          <p className="term__line term__msg" role="status" aria-live="polite">
            {busy ? <span className="dots">{terminal.verifying}</span> : msg}
          </p>
        </div>
      </form>
    </section>
  );
}
