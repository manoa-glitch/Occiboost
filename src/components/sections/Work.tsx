import type { CSSProperties } from 'react';
import { AssmatiAssistante, AssmatiParent } from '../../mockups/Assmati';
import { work } from '../../content/home';
import { ContactButton } from '../contact/ContactContext';
import { PhoneFrame } from '../ui/Devices';
import { Icon } from '../ui/Icon';

function Modules() {
  return (
    <ul className="wk-features" aria-label="Fonctionnalités développées">
      {work.modules.map((m) => (
        <li key={m.title}>
          <Icon name={m.icon} />
          {m.title}
        </li>
      ))}
    </ul>
  );
}

export function Work() {
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
            <div className="wk-phones">
              <figure className="wk-phone wk-phone--a">
                <PhoneFrame>
                  <AssmatiAssistante />
                </PhoneFrame>
                <figcaption>Côté assistante maternelle</figcaption>
              </figure>
              <figure className="wk-phone wk-phone--b">
                <PhoneFrame>
                  <AssmatiParent />
                </PhoneFrame>
                <figcaption>Côté parents</figcaption>
              </figure>
            </div>
            <Modules />
            <p className="wk-demo">Interface de l’application, présentée avec des données de démonstration.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
