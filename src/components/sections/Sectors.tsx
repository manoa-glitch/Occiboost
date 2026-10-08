import { useRef, useState, type CSSProperties } from 'react';
import { sectors, type SectorStyle } from '../../content/home';
import { useAutoCycle, useInView, useReducedMotion } from '../../lib/hooks';
import { ContactButton } from '../contact/ContactContext';
import { Icon } from '../ui/Icon';

const families: Record<SectorStyle['font'], string> = {
  serif: 'var(--font-serif)',
  garamond: 'var(--font-garamond)',
  'garamond-italic': 'var(--font-garamond)',
  plex: 'var(--font-plex)',
  mona: 'var(--font-sans)',
};

/** Typographie propre à chaque secteur : la démonstration que chaque site a sa propre identité. */
function typeStyle(s: SectorStyle): CSSProperties {
  return {
    fontFamily: families[s.font],
    fontStyle: s.font === 'garamond-italic' ? 'italic' : 'normal',
    fontStretch: s.stretch ? `${s.stretch}%` : undefined,
    fontWeight: s.weight ?? (s.font === 'garamond' || s.font === 'garamond-italic' ? 500 : 400),
    textTransform: s.upper ? 'uppercase' : undefined,
    letterSpacing: s.upper ? '0.01em' : s.font === 'mona' ? '-0.03em' : '-0.01em',
    ['--sc' as string]: s.color,
  };
}

export function Sectors() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = useReducedMotion();
  const wallRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wallRef, { threshold: 0.35 });
  useAutoCycle(sectors.items.length, 2400, inView && !touched && !reduced, setActive, active);

  const current = sectors.items[active];
  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <section id="secteurs" className="section sectors" aria-labelledby="secteurs-title">
      <div className="container-site">
        <div className="section-head">
          <h2 id="secteurs-title" className="t-h2" data-reveal="mask">
            {sectors.title}
          </h2>
          <p className="t-lead">{sectors.lead}</p>
        </div>

        <div className="sec-layout">
          <div ref={wallRef} className="sec-wall" role="tablist" aria-label="Secteurs d’activité" data-reveal="up">
            {sectors.items.map((it, i) => (
              <button
                key={it.name}
                id={`sec-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="sec-panel"
                tabIndex={i === active ? 0 : -1}
                className="sec-word"
                style={typeStyle(it.style)}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                onKeyDown={(e) => {
                  const n = sectors.items.length;
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    pick((i + 1) % n);
                    document.getElementById(`sec-tab-${(i + 1) % n}`)?.focus();
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    pick((i - 1 + n) % n);
                    document.getElementById(`sec-tab-${(i - 1 + n) % n}`)?.focus();
                  }
                }}
              >
                {it.name}
              </button>
            ))}
            <span className="sec-more">{sectors.more}</span>
          </div>

          <div
            id="sec-panel"
            role="tabpanel"
            aria-labelledby={`sec-tab-${active}`}
            className="sec-panel"
            style={{ '--sc': current.style.color } as CSSProperties}
            data-reveal="up"
          >
            <div className="sec-panel-inner" key={current.name}>
              <p className="sec-panel-name" style={typeStyle(current.style)}>
                {current.name}
              </p>
              <p className="sec-panel-label">{sectors.needsLabel}</p>
              <ul className="sec-needs">
                {current.needs.map((n) => (
                  <li key={n}>
                    <Icon name="check" strokeWidth={2.2} />
                    {n}
                  </li>
                ))}
              </ul>
              <div className="sec-identity" aria-hidden="true">
                <span className="sec-swatches">
                  {current.style.palette.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                <span className="sec-aa" style={typeStyle(current.style)}>
                  Aa
                </span>
                <span className="sec-identity-label">Une identité propre à votre métier</span>
              </div>
            </div>
            <ContactButton className="btn btn-secondary sec-cta" preset={{ sector: current.name, source: 'secteurs' }}>
              Un site pour mon activité
            </ContactButton>
          </div>
        </div>

        <div className="sec-sizes" data-reveal="up">
          <p className="sec-sizes-title">{sectors.sizesTitle}</p>
          <ol className="sec-scale">
            {sectors.sizes.map((z, i) => (
              <li key={z} style={{ '--k': i } as CSSProperties}>
                <i aria-hidden="true" />
                <span>{z}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
