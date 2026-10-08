import './mockup.css';
import './B2B.css';
import { StatusBar, type MockProps } from './shared';

function KelviaMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#FF5B1F" />
      <path d="M10 8v16M10 16l9-8M13.5 13l6.5 11" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function Chart({ id }: { id: string }) {
  // consommation mensuelle : année précédente (pointillés) et année en cours
  const prev = [62, 66, 60, 58, 63, 67, 71, 69, 64, 61, 66, 70];
  const curr = [58, 60, 53, 50, 52, 55, 57, 54, 51, 48];
  const W = 560;
  const H = 180;
  const x = (i: number) => 10 + (i * (W - 20)) / 11;
  const y = (v: number) => H - ((v - 40) / 35) * (H - 20) - 6;
  const line = (arr: number[]) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line(curr)} L${x(curr.length - 1).toFixed(1)},${H} L${x(0)},${H}Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="k-chart" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF5B1F" stopOpacity=".22" />
          <stop offset="1" stopColor="#FF5B1F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1="0" x2={W} y1={20 + k * 50} y2={20 + k * 50} stroke="#E8EDF3" strokeWidth="1" />
      ))}
      <path d={line(prev)} fill="none" stroke="#AEB7C6" strokeWidth="2" strokeDasharray="5 6" />
      <path d={area} fill={`url(#${id})`} />
      <path d={line(curr)} fill="none" stroke="#FF5B1F" strokeWidth="3" strokeLinejoin="round" />
      <circle cx={x(curr.length - 1)} cy={y(curr[curr.length - 1])} r="6" fill="#fff" stroke="#FF5B1F" strokeWidth="3" />
    </svg>
  );
}

/** Concept « Kelvia » — pilotage énergétique pour sites industriels (B2B). */
export function B2BSite({ variant = 'desktop' }: MockProps) {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <div className="mk mk-b2b" data-variant={variant} data-nosnippet="">
      <div className="mk-page">
        {variant === 'mobile' && <StatusBar tone="dark" />}
        <header className="k-nav">
          <div className="k-logo">
            <KelviaMark />
            <span>Kelvia</span>
          </div>
          <nav className="k-links only-desktop">
            <span>Plateforme</span>
            <span>Solutions</span>
            <span>Études de cas</span>
            <span>Ressources</span>
            <span>Entreprise</span>
          </nav>
          <div className="k-nav-end">
            <span className="k-login only-desktop">Connexion</span>
            <span className="k-btn k-btn--dark not-mobile">Demander une démo</span>
            <span className="mk-burger only-mobile">
              <i />
              <i />
              <i />
            </span>
          </div>
        </header>

        <section className="k-hero">
          <div className="k-hero-text">
            <span className="k-pill">
              <b>Nouveau</b> Rapport carbone automatisé
            </span>
            <div className="k-title">Pilotez l’énergie de vos sites industriels en temps réel.</div>
            <p className="k-lead">
              Kelvia connecte vos compteurs, détecte les dérives et vous aide à réduire durablement vos consommations.
            </p>
            <div className="k-actions">
              <span className="k-btn">Demander une démo</span>
              <span className="k-btn k-btn--ghost">Voir la plateforme</span>
            </div>
            <ul className="k-proof">
              <li>Installation sans arrêt de production</li>
              <li>Données hébergées en France</li>
            </ul>
          </div>

          <div className="k-dash">
            <div className="k-dash-head">
              <div>
                <span className="k-dash-site">Site Nord</span>
                <strong>Consommation électrique</strong>
              </div>
              <div className="k-tabs">
                <span>Jour</span>
                <span>Semaine</span>
                <span className="is-on">Année</span>
              </div>
            </div>
            <div className="k-kpis">
              <div>
                <span>Ce mois-ci</span>
                <strong>1,82 GWh</strong>
              </div>
              <div>
                <span>Vs année N-1</span>
                <strong className="k-down">−14,6 %</strong>
              </div>
              <div>
                <span>Alertes</span>
                <strong className="k-warn">3 actives</strong>
              </div>
            </div>
            <Chart id={`k-area-${variant}`} />
            <div className="k-months">
              {months.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
            <div className="k-alert">
              <span className="k-alert-dot" />
              <div>
                <strong>Dérive détectée</strong>
                <span>Compresseur C2 · +18 % depuis 6 h</span>
              </div>
              <span className="k-alert-btn">Analyser</span>
            </div>
          </div>
        </section>

        <section className="k-band">
          <div>
            <strong>−18 %</strong>
            <span>de consommation en moyenne dès la première année</span>
          </div>
          <div>
            <strong>240</strong>
            <span>sites industriels connectés en Europe</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>supervision et alertes en temps réel</span>
          </div>
        </section>

        <section className="k-features">
          <div className="k-h2">Une plateforme, trois leviers.</div>
          <div className="k-grid">
            {[
              ['Mesurer', 'Compteurs connectés et collecte automatique, sans ressaisie.'],
              ['Analyser', 'Tableaux de bord par site, par atelier et par machine.'],
              ['Optimiser', 'Plans d’action chiffrés et suivi des économies réalisées.'],
            ].map(([t, d], i) => (
              <article key={t}>
                <span className="k-icon">0{i + 1}</span>
                <strong>{t}</strong>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="k-cta">
          <div className="k-h2">Prêt à réduire votre facture énergétique ?</div>
          <span className="k-btn">Planifier une démo</span>
        </section>
      </div>
    </div>
  );
}
