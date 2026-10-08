import { Fragment, type CSSProperties } from 'react';
import { hero } from '../../content/home';
import { ContactButton } from '../contact/ContactContext';
import { LogoMark } from '../ui/Logo';
import { Showcase } from './Showcase';

/** Titre découpé en mots : chaque mot monte depuis un masque au chargement (CSS uniquement). */
function SplitTitle({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="hw" style={{ '--i': i } as CSSProperties}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow hero-glow--a" />
        <span className="hero-glow hero-glow--b" />
        <span className="hero-grid-lines" />
      </div>
      <div className="container-site hero-layout">
        <div className="hero-copy">
          <p className="pill hero-pill">
            <span className="pill-dot">
              <LogoMark id="logo-pill" className="pill-mark" />
            </span>
            <span className="pill-brand">OcciBoost</span>
            <span className="pill-sep" aria-hidden="true" />
            <span>
              {hero.badge}
              <span className="pill-extra"> {hero.badgeExtra}</span>
            </span>
          </p>
          <h1 id="hero-title" className="t-h1 hero-title">
            <SplitTitle text={hero.title} />
          </h1>
          <p className="t-lead hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <ContactButton preset={{ source: 'hero' }}>{hero.primary}</ContactButton>
            <a className="btn btn-secondary" href="#travail">
              {hero.secondary}
            </a>
          </div>
          <p className="hero-audience">{hero.audience}</p>
        </div>
        <Showcase />
      </div>
    </section>
  );
}
