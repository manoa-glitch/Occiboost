import './mockup.css';
import './Artisan.css';
import heroImg from '../assets/img/atelier-cuisine.webp';
import dressing from '../assets/img/atelier-dressing.webp';
import escalier from '../assets/img/atelier-escalier.webp';
import bibliotheque from '../assets/img/atelier-bibliotheque.webp';
import { StatusBar, type MockProps } from './shared';

const services = [
  { img: dressing, title: 'Dressings', text: 'Rangements sur mesure, du sol au plafond.' },
  { img: escalier, title: 'Escaliers', text: 'Bois massif, limons acier, marches suspendues.' },
  { img: bibliotheque, title: 'Agencements', text: 'Bibliothèques, banquettes, bureaux intégrés.' },
];

/**
 * Concept « Atelier Fil du Bois » — menuisier agenceur.
 * `mode="wire"` affiche la même page en maquette fil de fer (utilisé dans la section Méthode).
 */
export function ArtisanSite({ variant = 'desktop', lazy = false, mode = 'design' }: MockProps & { mode?: 'design' | 'wire' }) {
  const loading = lazy ? 'lazy' : undefined;
  return (
    <div className="mk mk-artisan" data-variant={variant} data-mode={mode} data-nosnippet="">
      <div className="mk-page">
        {variant === 'mobile' && <StatusBar tone="dark" />}
        <div className="a-top only-desktop">
          <span className="w">Menuiserie et agencement intérieur sur mesure</span>
          <span className="w">Devis gratuit · 04 65 71 23 18</span>
        </div>
        <header className="a-nav">
          <div className="a-logo">
            <span className="a-logo-mark w-box">FB</span>
            <span className="a-logo-text">
              <strong className="w">Fil du Bois</strong>
              <small className="w">Atelier de menuiserie</small>
            </span>
          </div>
          <nav className="a-links only-desktop">
            <span className="w">Réalisations</span>
            <span className="w">Savoir-faire</span>
            <span className="w">Zone d’intervention</span>
            <span className="w">L’atelier</span>
          </nav>
          <span className="a-btn not-mobile">Demander un devis</span>
          <span className="mk-burger only-mobile">
            <i />
            <i />
            <i />
          </span>
        </header>

        <section className="a-hero">
          <div className="a-hero-text">
            <p className="a-eyebrow w">Menuisier agenceur depuis 2009</p>
            <div className="a-title a-display w">Menuiserie sur mesure, de la conception à la pose.</div>
            <p className="a-lead w">
              Cuisines, dressings, escaliers et agencements intérieurs fabriqués dans notre atelier, en bois massif.
            </p>
            <div className="a-actions">
              <span className="a-btn">Demander un devis</span>
              <span className="a-btn a-btn--ghost">Voir nos réalisations</span>
            </div>
            <div className="a-trust">
              <div>
                <b className="w">15 ans</b>
                <span className="w">d’expérience</span>
              </div>
              <div>
                <b className="w">100 %</b>
                <span className="w">fabriqué à l’atelier</span>
              </div>
              <div>
                <b className="w">10 ans</b>
                <span className="w">de garantie décennale</span>
              </div>
            </div>
          </div>
          <figure className="a-hero-img w-img">
            <img src={heroImg} alt="" width={1080} height={810} loading={loading} decoding="async" />
            <figcaption className="a-tag">Cuisine en chêne massif</figcaption>
          </figure>
        </section>

        <section className="a-services">
          <div className="a-sec-head">
            <div className="a-h2 a-display w">Nos savoir-faire</div>
            <span className="a-more w">Toutes nos réalisations</span>
          </div>
          <div className="a-cards">
            {services.map((s) => (
              <article className="a-card" key={s.title}>
                <div className="a-card-img w-img">
                  <img src={s.img} alt="" width={720} height={560} loading={loading} decoding="async" />
                </div>
                <div className="a-card-title a-display w">{s.title}</div>
                <p className="w">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="a-zone">
          <div className="a-map w-img">
            <svg viewBox="0 0 520 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="520" height="300" fill="#E8E0D3" />
              <path d="M0 210 C120 190 180 240 300 200 S470 150 520 170" stroke="#CFE0E6" strokeWidth="18" fill="none" />
              <path d="M-10 90 L530 150 M120 -10 L200 310 M330 -10 L380 310 M0 260 L520 40" stroke="#fff" strokeWidth="7" />
              <path d="M40 30 L480 280 M460 -10 L60 310" stroke="#fff" strokeWidth="3.5" opacity=".8" />
              <circle cx="260" cy="150" r="120" fill="#C2622D" fillOpacity=".09" stroke="#C2622D" strokeWidth="2" strokeDasharray="6 7" />
              <circle cx="260" cy="150" r="13" fill="#C2622D" />
              <circle cx="260" cy="150" r="5" fill="#fff" />
              <rect x="300" y="118" width="96" height="28" rx="6" fill="#231C16" />
              <text x="348" y="137" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="14" fontWeight="700" fill="#fff">
                40 km
              </text>
            </svg>
          </div>
          <div className="a-zone-text">
            <div className="a-h2 a-display w">Zone d’intervention</div>
            <p className="w">Nous intervenons dans un rayon de 40 km autour de l’atelier, du premier rendez-vous à la pose.</p>
            <ul className="a-checks">
              <li className="w">Visite et prise de mesures sur place</li>
              <li className="w">Plans et rendus 3D avant fabrication</li>
              <li className="w">Pose par nos menuisiers</li>
            </ul>
          </div>
        </section>

        <section className="a-contact">
          <div>
            <div className="a-contact-title a-display w">Un projet ? Parlons-en.</div>
            <p className="w">Réponse sous 48 h, devis gratuit et sans engagement.</p>
          </div>
          <span className="a-btn">Demander un devis</span>
        </section>
      </div>
    </div>
  );
}
