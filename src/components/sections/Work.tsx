import type { CSSProperties } from 'react';
import { work } from '../../content/home';
import { ContactButton } from '../contact/ContactContext';
import { BrowserFrame, PhoneFrame } from '../ui/Devices';
import { Icon } from '../ui/Icon';

/**
 * Captures d'écran réelles d'Assmati (facultatif).
 * Déposez les images dans src/assets/realisations/ puis remplacez les valeurs ci-dessous, par exemple :
 *   import assmatiDesktop from '../../assets/realisations/assmati-desktop.webp';
 *   const shots = { desktop: assmatiDesktop, mobile: assmatiMobile };
 * Tant qu'aucune capture n'est fournie, la section présente les fonctionnalités réelles de l'application.
 */
const shots: { desktop?: string; mobile?: string } = {};

function Modules() {
  return (
    <ul className="wk-modules">
      {work.modules.map((m, i) => (
        <li key={m.title} className="wk-module" style={{ '--i': i } as CSSProperties}>
          <span className="wk-module-icon">
            <Icon name={m.icon} />
          </span>
          <span className="wk-module-title">{m.title}</span>
          <span className="wk-module-text">{m.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  const hasShots = Boolean(shots.desktop);
  return (
    <section id="travail" className="section work" aria-labelledby="travail-title">
      <div className="container-site">
        <div className="section-head work-head">
          <p className="section-label">Notre travail</p>
          <h2 id="travail-title" className="t-h2" data-reveal="mask">
            Une réalisation récente.
          </h2>
        </div>

        <article className="wk-case" data-reveal="scale" style={{ '--brand': work.brand } as CSSProperties}>
          <div className="wk-info">
            <h3 className="wk-name">{work.name}</h3>
            <p className="wk-tagline">{work.tagline}</p>
            <p className="wk-summary">{work.summary}</p>

            <dl className="wk-facts">
              <div>
                <dt>Pour qui</dt>
                <dd>{work.audience.join(', ')}</dd>
              </div>
              <div>
                <dt>Ce que nous avons réalisé</dt>
                <dd>
                  <ul className="wk-scope">
                    {work.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="wk-actions">
              <a className="btn btn-secondary" href={work.url} target="_blank" rel="noopener noreferrer">
                Découvrir {work.name}
                <Icon name="arrowUpRight" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
              <ContactButton className="btn btn-quiet" preset={{ type: 'Site sur mesure', source: 'travail' }}>
                Un projet sur mesure ? Parlons-en
              </ContactButton>
            </div>
          </div>

          <div className="wk-visual">
            <div className="wk-visual-bar">
              <span className="wk-domain">
                <Icon name="lock" strokeWidth={2} />
                {work.domain}
              </span>
              <span className="wk-live">
                <i />
                En ligne
              </span>
            </div>
            {hasShots ? (
              <div className="wk-shots">
                <BrowserFrame url={work.domain} className="wk-shot-browser">
                  <img src={shots.desktop} alt={`Interface de l’application ${work.name}`} loading="lazy" />
                </BrowserFrame>
                {shots.mobile && (
                  <PhoneFrame className="wk-shot-phone">
                    <img src={shots.mobile} alt={`${work.name} sur mobile`} loading="lazy" />
                  </PhoneFrame>
                )}
              </div>
            ) : (
              <div className="wk-board">
                <p className="wk-board-title">Fonctionnalités développées</p>
                <Modules />
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
