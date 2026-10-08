import './mockup.css';
import './Restaurant.css';
import heroImg from '../assets/img/resto-hero.webp';
import burrata from '../assets/img/resto-burrata.webp';
import saumon from '../assets/img/resto-saumon.webp';
import figues from '../assets/img/resto-figues.webp';
import { StatusBar, type MockProps } from './shared';

const dishes = [
  { img: burrata, name: 'Burrata & tomates anciennes', desc: 'Basilic, huile d’olive, fleur de sel', price: '14 €' },
  { img: saumon, name: 'Saumon rôti, asperges vertes', desc: 'Beurre citronné, aneth frais', price: '24 €' },
  { img: figues, name: 'Tarte fine aux figues', desc: 'Frangipane, crème crue', price: '9 €' },
];

function Sprig() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 29V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 14c-5-1-8-5-8-9 5 0 8 3.5 8 9Z" fill="#7FA76A" />
      <path d="M16 19c5-1 8-5 8-9-5 0-8 3.5-8 9Z" fill="#9CC27F" />
      <path d="M16 24c-4.5-.5-7-4-7-7.5 4.5 0 7 3 7 7.5Z" fill="#7FA76A" />
    </svg>
  );
}

export function RestaurantSite({ variant = 'desktop', lazy = false }: MockProps) {
  const loading = lazy ? 'lazy' : undefined;
  return (
    <div className="mk mk-resto" data-variant={variant} data-nosnippet="">
      <div className="mk-page">
        {variant === 'mobile' && <StatusBar tone="light" />}
        <header className="r-nav">
          <div className="r-logo">
            <Sprig />
            <span>Sauge &amp; Sel</span>
          </div>
          <nav className="r-links only-desktop">
            <span>La carte</span>
            <span>Le lieu</span>
            <span>Événements privés</span>
            <span>Contact</span>
          </nav>
          <div className="r-nav-end">
            <span className="r-btn r-btn--sm">Réserver</span>
            <span className="mk-burger only-mobile">
              <i />
              <i />
              <i />
            </span>
          </div>
        </header>

        <section className="r-hero">
          <div className="r-hero-text">
            <p className="r-kicker">
              <span className="r-dot" />
              Bistrot de saison
            </p>
            <div className="r-title">Une cuisine de saison, simple et généreuse.</div>
            <p className="r-lead">
              Des produits frais du marché, une carte courte qui change chaque semaine et une belle cave de vins nature.
            </p>
            <div className="r-actions">
              <span className="r-btn">Réserver une table</span>
              <span className="r-btn r-btn--ghost">Voir la carte</span>
            </div>
            <div className="r-info">
              <div>
                <span>Horaires</span>
                <strong>Mar – Sam · 12h–14h30 · 19h–22h30</strong>
              </div>
              <div>
                <span>Adresse</span>
                <strong>12 rue des Tanneurs</strong>
              </div>
            </div>
          </div>
          <figure className="r-hero-img">
            <img src={heroImg} alt="" width={1080} height={810} loading={loading} decoding="async" />
            <figcaption className="r-badge">
              <strong>Formule du midi</strong>
              <span>Entrée + plat · 22 €</span>
            </figcaption>
          </figure>
        </section>

        <section className="r-menu">
          <div className="r-menu-head">
            <div className="r-h2">La carte du moment</div>
            <p>Renouvelée chaque semaine selon le marché.</p>
          </div>
          <div className="r-dishes">
            {dishes.map((d) => (
              <article className="r-dish" key={d.name}>
                <div className="r-dish-img">
                  <img src={d.img} alt="" width={560} height={560} loading={loading} decoding="async" />
                </div>
                <div className="r-dish-body">
                  <div>
                    <div className="r-dish-name">{d.name}</div>
                    <p className="r-dish-desc">{d.desc}</p>
                  </div>
                  <span className="r-price">{d.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="r-book">
          <div className="r-book-text">
            <div className="r-h2">Réserver une table</div>
            <p>En ligne en quelques clics, ou par téléphone au 04 65 71 23 18.</p>
          </div>
          <div className="r-widget">
            <div className="r-field">
              <span>Date</span>
              <strong>Vendredi 14 novembre</strong>
            </div>
            <div className="r-field">
              <span>Couverts</span>
              <strong>2 personnes</strong>
            </div>
            <div className="r-slots">
              <span className="r-slot">19:30</span>
              <span className="r-slot is-on">20:00</span>
              <span className="r-slot">20:30</span>
              <span className="r-slot">21:00</span>
            </div>
            <span className="r-btn r-btn--block">Confirmer la réservation</span>
          </div>
        </section>

        <footer className="r-foot">
          <div className="r-logo">
            <Sprig />
            <span>Sauge &amp; Sel</span>
          </div>
          <span>12 rue des Tanneurs</span>
          <span>Mar – Sam · 12h–14h30 · 19h–22h30</span>
        </footer>
      </div>
    </div>
  );
}
