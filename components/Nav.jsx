'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menus } from '@/content/site';
import { Mark, Plus } from './Icons';

/* Mobile sheet order: the two product menus, then Company with the Partner Portal link right under it. */
const ORDER = ['defense', 'civilian', 'company'];

function PanelContent({ menuKey, pathname }) {
  const m = menus[menuKey];
  if (!m) return null;
  return (
    <>
      <div className="nav__summary">
        <span className="section-label">{m.title}</span>
        <p className="body">{m.summary}</p>
      </div>
      {m.categories ? (
        <div className="nav__links">
          {m.categories.map((c) => (
            <div className="nav__cat" key={c.label}>
              <span className="section-label">{c.label}</span>
              {c.products.map((p) => (
                <Link key={p.name} href={p.href} className={`nav__product ${pathname === p.href ? 'is-current' : ''}`}>
                  <span className="nav__product-name h3">{p.name}</span>
                  <Plus />
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="nav__links nav__company">
          {m.links.map((l) =>
            l.href.startsWith('mailto:') ? (
              <a key={l.name} href={l.href} className="nav__product">
                <span className="nav__product-name h3">{l.name}</span>
                <Plus />
              </a>
            ) : (
              <Link key={l.name} href={l.href} className={`nav__product ${pathname === l.href ? 'is-current' : ''}`}>
                <span className="nav__product-name h3">{l.name}</span>
                <Plus />
              </Link>
            ),
          )}
        </div>
      )}
    </>
  );
}

export default function Nav({ theme }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState('defense');
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [sheetGroup, setSheetGroup] = useState(null);
  const intent = useRef(null);
  const leave = useRef(null);
  const lastY = useRef(0);

  const openMenu = useCallback(
    (key) => {
      if (isOpen && key !== menu) {
        setSwitching(true);
        setTimeout(() => setSwitching(false), 220);
      }
      setMenu(key);
      setIsOpen(true);
    },
    [isOpen, menu],
  );
  const close = useCallback(() => setIsOpen(false), []);

  const onItemEnter = (key) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    clearTimeout(leave.current);
    clearTimeout(intent.current);
    intent.current = setTimeout(() => openMenu(key), 80);
  };
  const onNavEnter = () => clearTimeout(leave.current);
  const onNavLeave = () => {
    clearTimeout(intent.current);
    leave.current = setTimeout(close, 150);
  };
  const onItemClick = (key) => {
    clearTimeout(intent.current);
    if (isOpen && menu === key) close();
    else openMenu(key);
  };
  /* Partner Portal sits between the two menus: resting on it closes the panel after the same
     grace period as leaving the nav, so sweeping from Defense to Civilian does not flicker. */
  const onLinkEnter = () => {
    clearTimeout(intent.current);
    clearTimeout(leave.current);
    leave.current = setTimeout(close, 150);
  };

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < 8) return;
      setHidden(y > 80 && dy > 0);
      lastY.current = y;
      setIsOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSheet(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheet]);

  useEffect(() => {
    setIsOpen(false);
    setSheet(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`nav ${isOpen ? 'is-open' : ''} ${hidden && !isOpen ? 'is-hidden' : ''}`}
        aria-label="Site"
        onMouseEnter={onNavEnter}
        onMouseLeave={onNavLeave}
      >
        <div className="nav__bar">
          <Link href="/" className="nav__brand" aria-label="Initium home">
            <Mark />
          </Link>
          <div className="nav__center">
            <button
              type="button"
              className={`nav__item nav-label ${isOpen && menu === 'defense' ? 'is-open' : ''}`}
              aria-expanded={isOpen && menu === 'defense'}
              aria-controls="nav-panel"
              onMouseEnter={() => onItemEnter('defense')}
              onClick={() => onItemClick('defense')}
            >
              <span>{menus.defense.label}</span>
              <Plus />
            </button>
            <a href={menus.partners.href} className="nav__item nav__link nav-label" onMouseEnter={onLinkEnter}>
              <span>{menus.partners.label}</span>
            </a>
            <button
              type="button"
              className={`nav__item nav-label ${isOpen && menu === 'civilian' ? 'is-open' : ''}`}
              aria-expanded={isOpen && menu === 'civilian'}
              aria-controls="nav-panel"
              onMouseEnter={() => onItemEnter('civilian')}
              onClick={() => onItemClick('civilian')}
            >
              <span>{menus.civilian.label}</span>
              <Plus />
            </button>
          </div>
          <div className="nav__right">
            <button
              type="button"
              className={`nav__item nav-label ${isOpen && menu === 'company' ? 'is-open' : ''}`}
              aria-expanded={isOpen && menu === 'company'}
              aria-controls="nav-panel"
              onMouseEnter={() => onItemEnter('company')}
              onClick={() => onItemClick('company')}
            >
              <span>{menus.company.label}</span>
              <Plus />
            </button>
          </div>
          <button
            type="button"
            className={`nav__item nav-label nav__menu-button ${sheet ? 'is-open' : ''}`}
            aria-expanded={sheet}
            aria-controls="nav-sheet"
            onClick={() => setSheet((s) => !s)}
          >
            <span>{sheet ? 'Close' : 'Menu'}</span>
            <Plus />
          </button>
        </div>
        <div className="nav__panel" id="nav-panel">
          <div className="nav__panel-clip">
            <div className={`nav__panel-inner ${switching ? 'is-switching' : ''}`} key={menu} aria-hidden={!isOpen}>
              <PanelContent menuKey={menu} pathname={pathname} />
            </div>
          </div>
        </div>
      </nav>

      {sheet && (
        <div className="sheet" id="nav-sheet" data-theme={theme} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="sheet__bar">
            <Link href="/" aria-label="Initium home">
              <Mark />
            </Link>
            <button type="button" className="nav__item nav-label is-open" onClick={() => setSheet(false)}>
              <span>Close</span>
              <Plus />
            </button>
          </div>
          {ORDER.map((key) => {
            const m = menus[key];
            const open = sheetGroup === key;
            return (
              <div className={`sheet__group ${open ? 'is-open' : ''}`} key={key}>
                <button type="button" className="sheet__head" aria-expanded={open} onClick={() => setSheetGroup(open ? null : key)}>
                  <span className="h3">{m.label}</span>
                  <Plus />
                </button>
                <div className="sheet__body">
                  {m.categories
                    ? m.categories.map((c) => (
                        <div key={c.label}>
                          <span className="section-label">{c.label}</span>
                          {c.products.map((p) => (
                            <Link key={p.name} href={p.href} className="h3">
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    : m.links.map((l) =>
                        l.href.startsWith('mailto:') ? (
                          <a key={l.name} href={l.href} className="h3">
                            {l.name}
                          </a>
                        ) : (
                          <Link key={l.name} href={l.href} className="h3">
                            {l.name}
                          </Link>
                        ),
                      )}
                </div>
              </div>
            );
          })}
          <a href={menus.partners.href} className="sheet__link h3">
            {menus.partners.label}
          </a>
        </div>
      )}
    </>
  );
}
