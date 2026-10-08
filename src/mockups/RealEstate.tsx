import './mockup.css';
import './RealEstate.css';
import villa from '../assets/img/immo-villa.webp';
import maison from '../assets/img/immo-maison.webp';
import salon from '../assets/img/immo-salon.webp';
import loft from '../assets/img/immo-loft.webp';
import { StatusBar, type MockProps } from './shared';

const listings = [
  { img: maison, price: '485 000 €', type: 'Maison', rooms: '5 pièces', area: '132 m²', place: 'Quartier des Pins', tag: 'Exclusivité' },
  { img: salon, price: '329 000 €', type: 'Appartement', rooms: '3 pièces', area: '78 m²', place: 'Centre-ville', tag: 'Nouveau' },
  { img: loft, price: '612 000 €', type: 'Loft', rooms: '4 pièces', area: '145 m²', place: 'Le Port', tag: '' },
];

/** Concept « Rivage Immobilier » — agence immobilière (section « Pourquoi OcciBoost ? »). */
export function RealEstateSite({ variant = 'desktop' }: MockProps) {
  const shown = variant === 'mobile' ? listings.slice(0, 2) : variant === 'tablet' ? listings.slice(0, 2) : listings;
  return (
    <div className="mk mk-immo" data-variant={variant} data-nosnippet="">
      <div className="mk-page">
        <section className="i-hero" data-anno="image">
          <img src={villa} alt="" width={1400} height={788} loading="lazy" decoding="async" />
          <div className="i-shade" />
          {variant === 'mobile' && <StatusBar tone="light" />}
          <header className="i-nav" data-anno="ux-nav">
            <div className="i-logo">
              <strong>Rivage</strong>
              <span>Immobilier</span>
            </div>
            <nav className="i-links only-desktop">
              <span>Acheter</span>
              <span>Louer</span>
              <span>Vendre</span>
              <span>L’agence</span>
            </nav>
            <span className="i-btn i-btn--light not-mobile" data-anno="conversion-nav">
              Estimer mon bien
            </span>
            <span className="mk-burger only-mobile">
              <i />
              <i />
              <i />
            </span>
          </header>
          <div className="i-hero-text">
            <div className="i-title">Trouvez le lieu qui vous ressemble.</div>
            <div className="i-search" data-anno="ux">
              <div className="i-search-tabs">
                <span className="is-on">Acheter</span>
                <span>Louer</span>
              </div>
              <div className="i-fields">
                <span>
                  <small>Localisation</small>
                  <b>Bord de mer</b>
                </span>
                <span>
                  <small>Type de bien</small>
                  <b>Maison</b>
                </span>
                <span className="not-mobile">
                  <small>Budget max.</small>
                  <b>650 000 €</b>
                </span>
                <span className="i-go">Rechercher</span>
              </div>
            </div>
          </div>
        </section>

        <section className="i-list">
          <div className="i-list-head">
            <div className="i-h2">Nos dernières exclusivités</div>
            <span className="i-link not-mobile">Voir tous les biens</span>
          </div>
          <div className="i-cards">
            {shown.map((l) => (
              <article key={l.price} className="i-card">
                <div className="i-card-img">
                  <img src={l.img} alt="" width={720} height={540} loading="lazy" decoding="async" />
                  {l.tag && <span className="i-tag">{l.tag}</span>}
                </div>
                <strong className="i-price">{l.price}</strong>
                <span className="i-meta">
                  {l.type} · {l.rooms} · {l.area}
                </span>
                <span className="i-place">{l.place}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="i-estimate">
          <div>
            <div className="i-h2">Vous vendez ?</div>
            <p>Recevez une estimation précise de votre bien, réalisée par un expert du quartier.</p>
          </div>
          <span className="i-btn" data-anno="conversion">
            Estimer mon bien
          </span>
        </section>
      </div>
    </div>
  );
}
