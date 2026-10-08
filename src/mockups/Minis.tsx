import { useState, type CSSProperties } from 'react';
import './mockup.css';
import './Minis.css';
import villa from '../assets/img/immo-villa.webp';
import vase from '../assets/img/shop-vase.webp';
import tasse from '../assets/img/shop-tasse.webp';
import bol from '../assets/img/shop-bol.webp';
import carafe from '../assets/img/shop-carafe.webp';
import { StatusBar } from './shared';

/* ------------------------------------------------------------------ site vitrine */
export function MiniVitrine() {
  return (
    <div className="mk mk-vit" data-variant="mini" data-nosnippet="">
      <header className="v-nav">
        <span className="v-logo">
          <i>V</i>Cabinet Valmont
        </span>
        <span className="v-links">
          <span>Expertise</span>
          <span>Création</span>
          <span>Le cabinet</span>
        </span>
        <span className="v-btn">Prendre rendez-vous</span>
      </header>
      <section className="v-hero">
        <div>
          <p className="v-kicker">Expert-comptable</p>
          <div className="v-title">Votre expert-comptable, à vos côtés toute l’année.</div>
          <p className="v-lead">Comptabilité, fiscalité et accompagnement des dirigeants, avec un interlocuteur dédié.</p>
          <div className="v-tiles">
            <span>Comptabilité</span>
            <span>Fiscalité</span>
            <span>Création d’entreprise</span>
          </div>
        </div>
        <div className="v-form">
          <strong>Demander un rendez-vous</strong>
          <span className="v-input">Nom et prénom</span>
          <span className="v-input">Email professionnel</span>
          <span className="v-input v-input--sel">Création d’entreprise</span>
          <span className="v-btn v-btn--block">Envoyer ma demande</span>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ landing page (mobile) */
export function MiniLanding() {
  return (
    <div className="mk mk-land" data-variant="mobile" data-nosnippet="">
      <StatusBar tone="light" />
      <div className="l-hero">
        <span className="l-chip">14 &amp; 15 mars · Parc des expositions</span>
        <div className="l-title">Salon Habitat &amp; Déco</div>
        <p className="l-lead">120 exposants, des conférences et des ateliers pour tous vos projets.</p>
        <div className="l-count">
          <span>
            <b>12</b>jours
          </span>
          <span>
            <b>08</b>heures
          </span>
          <span>
            <b>45</b>min
          </span>
        </div>
        <span className="l-cta">
          <span className="l-cta-a">Je réserve mon badge gratuit</span>
          <span className="l-cta-b">Badge réservé, à bientôt !</span>
          <i className="l-tap" />
        </span>
      </div>
      <ul className="l-list">
        <li>
          <b>Entrée gratuite</b> sur réservation
        </li>
        <li>
          <b>30 conférences</b> sur deux jours
        </li>
        <li>
          <b>Ateliers</b> déco et rénovation
        </li>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ e-commerce */
const products = [
  { img: vase, name: 'Vase Galet', price: '48 €' },
  { img: tasse, name: 'Tasse Sauge', price: '22 €' },
  { img: bol, name: 'Bol Lagune', price: '26 €' },
  { img: carafe, name: 'Carafe Nacre', price: '39 €' },
];

export function MiniShop() {
  return (
    <div className="mk mk-shop" data-variant="mini" data-nosnippet="">
      <div className="s-strip">Livraison offerte dès 60 € · Fabriqué à la main</div>
      <header className="s-nav">
        <span className="s-logo">maison argile</span>
        <span className="s-links">
          <span>Boutique</span>
          <span>Collections</span>
          <span>L’atelier</span>
        </span>
        <span className="s-cart">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 4.5h2.2l2 10.5h10.6l1.9-7.5H7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9.5" cy="19" r="1.4" fill="currentColor" />
            <circle cx="17" cy="19" r="1.4" fill="currentColor" />
          </svg>
          <b className="s-badge">
            <span className="s-n2">2</span>
            <span className="s-n3">3</span>
          </b>
        </span>
      </header>
      <div className="s-grid">
        {products.map((p, i) => (
          <article key={p.name} className={`s-card${i === 0 ? ' s-card--hot' : ''}`}>
            <div className="s-img">
              <img src={p.img} alt="" width={520} height={520} loading="lazy" decoding="async" />
            </div>
            <div className="s-meta">
              <span>{p.name}</span>
              <b>{p.price}</b>
            </div>
            {i === 0 && (
              <span className="s-add">
                <span className="s-add-a">Ajouter au panier</span>
                <span className="s-add-b">Ajouté ✓</span>
              </span>
            )}
          </article>
        ))}
      </div>
      <i className="s-fly" />
    </div>
  );
}

/* ------------------------------------------------------------------ refonte : avant / après */
export function MiniRefonte({ interactive = true }: { interactive?: boolean }) {
  const [pos, setPos] = useState<number | null>(null);
  const style = pos === null ? undefined : ({ '--pos': `${pos}%` } as CSSProperties);
  return (
    <div className="mk mk-ref" data-variant="mini" data-manual={pos === null ? undefined : ''} style={style} data-nosnippet="">
      <div className="rf-old" aria-hidden="true">
        <div className="rf-old-head">
          <span className="rf-old-title">Hôtel des Embruns</span>
          <span className="rf-old-marquee">*** Bienvenue sur notre site !!! Réservez dès maintenant ***</span>
        </div>
        <div className="rf-old-body">
          <ul className="rf-old-nav">
            <li>Accueil</li>
            <li>Nos chambres</li>
            <li>Tarifs 2011</li>
            <li>Plan d’accès</li>
            <li>Livre d’or</li>
          </ul>
          <div className="rf-old-main">
            <p className="rf-old-h">Bienvenue à l’Hôtel des Embruns</p>
            <div className="rf-old-row">
              <img src={villa} alt="" width={1400} height={788} loading="lazy" decoding="async" />
              <p>
                Notre hôtel vous accueille toute l’année dans un cadre exceptionnel face à la mer. Pour toute réservation, merci
                de nous contacter par téléphone ou par fax.
              </p>
            </div>
            <p className="rf-old-count">Vous êtes le visiteur n° 012458</p>
          </div>
        </div>
      </div>
      <div className="rf-new" aria-hidden="true">
        <img src={villa} alt="" width={1400} height={788} loading="lazy" decoding="async" />
        <div className="rf-new-shade" />
        <header className="rf-new-nav">
          <span className="rf-new-logo">Les Embruns</span>
          <span className="rf-new-links">
            <span>Chambres</span>
            <span>Spa</span>
            <span>Restaurant</span>
          </span>
          <span className="rf-new-btn">Réserver</span>
        </header>
        <div className="rf-new-hero">
          <div className="rf-new-title">Un hôtel face à l’océan.</div>
          <div className="rf-new-book">
            <span>
              <small>Arrivée</small>
              <b>12 juil.</b>
            </span>
            <span>
              <small>Départ</small>
              <b>15 juil.</b>
            </span>
            <span>
              <small>Voyageurs</small>
              <b>2 adultes</b>
            </span>
            <span className="rf-new-go">Voir les disponibilités</span>
          </div>
        </div>
      </div>
      <div className="rf-handle" aria-hidden="true">
        <span className="rf-tag rf-tag--a">Avant</span>
        <span className="rf-knob" />
        <span className="rf-tag rf-tag--b">Après</span>
      </div>
      {interactive && (
        <input
          className="rf-range"
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          aria-label="Comparer l’ancien et le nouveau site"
          onChange={(e) => setPos(Number(e.currentTarget.value))}
          onPointerDown={(e) => setPos(Number(e.currentTarget.value))}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ sur mesure : outil métier */
const days = ['Lun 13', 'Mar 14', 'Mer 15', 'Jeu 16', 'Ven 17'];
const events: { d: number; start: number; len: number; title: string; who: string; tone: string }[] = [
  { d: 0, start: 0, len: 2, title: 'Visite technique', who: 'M. Dupont', tone: 'blue' },
  { d: 0, start: 3, len: 2, title: 'Installation', who: 'Mme Garnier', tone: 'green' },
  { d: 1, start: 1, len: 3, title: 'Chantier', who: 'SCI Les Pins', tone: 'amber' },
  { d: 2, start: 0, len: 1, title: 'Devis', who: 'M. Roux', tone: 'blue' },
  { d: 2, start: 2, len: 2, title: 'Entretien', who: 'Mme Petit', tone: 'green' },
  { d: 4, start: 1, len: 2, title: 'Installation', who: 'M. Colin', tone: 'green' },
  { d: 4, start: 4, len: 1, title: 'Devis', who: 'Mme Blanc', tone: 'blue' },
];

export function MiniCustom() {
  return (
    <div className="mk mk-app" data-variant="mini" data-nosnippet="">
      <aside className="ap-side">
        <span className="ap-logo">
          <i />
          Atlas
        </span>
        <span>Tableau de bord</span>
        <span className="is-on">Planning</span>
        <span>Clients</span>
        <span>Devis</span>
        <span>Factures</span>
      </aside>
      <div className="ap-main">
        <div className="ap-head">
          <div>
            <small>Équipe Sud</small>
            <strong>Planning de la semaine</strong>
          </div>
          <span className="ap-new">+ Nouveau rendez-vous</span>
        </div>
        <div className="ap-grid">
          {days.map((d, i) => (
            <div key={d} className="ap-day">
              <span className="ap-day-name">{d}</span>
              <div className="ap-col">
                {events
                  .filter((e) => e.d === i)
                  .map((e) => (
                    <span
                      key={e.title + e.who}
                      className={`ap-ev ap-ev--${e.tone}`}
                      style={{ '--s': e.start, '--l': e.len } as CSSProperties}
                    >
                      <b>{e.title}</b>
                      {e.who}
                    </span>
                  ))}
                {i === 3 && (
                  <span className="ap-ev ap-ev--new" style={{ '--s': 2, '--l': 2 } as CSSProperties}>
                    <b>Diagnostic</b>
                    Mme Lefèvre
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="ap-toast">
        <i />
        Rendez-vous confirmé · Jeu. 14 h
      </span>
    </div>
  );
}
