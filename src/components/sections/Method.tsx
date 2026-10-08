import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { method } from '../../content/home';
import { useAutoCycle, useInView, useMediaQuery, useReducedMotion, useStickyProgress } from '../../lib/hooks';
import { BrowserFrame, PhoneFrame } from '../ui/Devices';
import { Icon } from '../ui/Icon';
import { ArtisanSite } from '../../mockups/Artisan';

const brief = [
  { text: 'Objectif : recevoir plus de demandes de devis', tone: 'a' },
  { text: 'Montrer les réalisations en photos', tone: 'b' },
  { text: 'Clients : particuliers et architectes', tone: 'c' },
  { text: 'Zone : 40 km autour de l’atelier', tone: 'b' },
  { text: 'Ambiance chaleureuse et artisanale', tone: 'a' },
];

function CodePanel() {
  return (
    <div className="mt-code" aria-hidden="true">
      <span className="mt-code-bar">
        <i />
        <i />
        <i />
        <b>hero.tsx</b>
      </span>
      <code>
        <span className="c-t">{'<section'}</span> <span className="c-a">className</span>=<span className="c-s">"hero"</span>
        <span className="c-t">{'>'}</span>
        {'\n  '}
        <span className="c-t">{'<h1>'}</span>Menuiserie sur mesure<span className="c-t">{'</h1>'}</span>
        {'\n  '}
        <span className="c-t">{'<Button'}</span> <span className="c-a">href</span>=<span className="c-s">"/devis"</span>
        <span className="c-t">{'>'}</span>
        {'\n    '}Demander un devis
        {'\n  '}
        <span className="c-t">{'</Button>'}</span>
        {'\n'}
        <span className="c-t">{'</section>'}</span>
        <span className="mt-caret" />
      </code>
    </div>
  );
}

export function Method() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  const sticky = desktop && !reduced;
  const { ref, step: scrollStep } = useStickyProgress<HTMLDivElement>(method.steps.length, sticky);
  const [autoStep, setAutoStep] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { threshold: 0.3 });
  useAutoCycle(method.steps.length, 3200, !sticky && inView && !reduced, setAutoStep, autoStep);
  const step = sticky ? scrollStep : autoStep;

  // un clic sur une étape fait défiler jusqu'à sa position (bureau) ou l'affiche (mobile)
  const goTo = (i: number) => {
    const el = ref.current;
    if (sticky && el) {
      const total = el.offsetHeight - window.innerHeight;
      const y = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / method.steps.length);
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      setAutoStep(i);
    }
  };

  useEffect(() => {
    if (!sticky) ref.current?.style.removeProperty('--p');
  }, [sticky, ref]);

  const live = step >= 3;

  return (
    <section id="methode" className="section method" aria-labelledby="methode-title">
      <div className="container-site">
        <div className="section-head">
          <h2 id="methode-title" className="t-h2" data-reveal="mask">
            {method.title}
          </h2>
          <p className="t-lead">{method.lead}</p>
        </div>
      </div>

      <div className="mt-scroller" ref={ref} data-sticky={sticky ? '' : undefined}>
        <div className="mt-sticky">
          <div className="container-site mt-grid" ref={listRef}>
            <ol className="mt-steps" style={{ '--n': method.steps.length } as CSSProperties}>
              {method.steps.map((s, i) => (
                <li key={s.title} data-state={i < step ? 'done' : i === step ? 'active' : 'todo'}>
                  <button type="button" className="mt-step" onClick={() => goTo(i)} aria-current={i === step ? 'step' : undefined}>
                    <span className="mt-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mt-step-text">
                      <span className="mt-step-title">{s.title}</span>
                      <span className="mt-step-desc">{s.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-visual" data-step={step} aria-hidden="true">
              <BrowserFrame
                className="mt-browser"
                url={
                  <span className="mt-url" key={live ? 'live' : 'draft'}>
                    {live ? 'atelier-fildubois.fr' : 'Projet : Atelier Fil du Bois'}
                    {live && <i className="mt-url-live">En ligne</i>}
                  </span>
                }
              >
                <div className="mt-site">
                  <ArtisanSite variant="desktop" mode={step <= 1 ? 'wire' : 'design'} lazy />
                </div>
                <div className="mt-columns">
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <div className="mt-brief">
                  <p className="mt-brief-title">Premier échange</p>
                  <ul>
                    {brief.map((b, i) => (
                      <li key={b.text} className={`mt-note mt-note--${b.tone}`} style={{ '--i': i } as CSSProperties}>
                        {b.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <CodePanel />
              </BrowserFrame>
              <PhoneFrame className="mt-phone">
                <ArtisanSite variant="mobile" lazy />
              </PhoneFrame>
              <div className="mt-checks">
                <span>
                  <Icon name="check" strokeWidth={2.4} /> Mobile
                </span>
                <span>
                  <Icon name="check" strokeWidth={2.4} /> Tablette
                </span>
                <span>
                  <Icon name="check" strokeWidth={2.4} /> Ordinateur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
