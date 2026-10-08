import { useEffect, useRef, useState, type ReactNode } from 'react';
import { services } from '../../content/home';
import { ContactButton } from '../contact/ContactContext';
import { BrowserFrame, PhoneFrame } from '../ui/Devices';
import { MiniCustom, MiniLanding, MiniRefonte, MiniShop, MiniVitrine } from '../../mockups/Minis';

type Item = (typeof services.items)[number];

const visuals: Record<string, { node: ReactNode; label: string }> = {
  vitrine: {
    label: 'Exemple : site vitrine d’un cabinet d’expertise comptable recevant une demande de contact',
    node: (
      <>
        <BrowserFrame url="cabinet-valmont.fr" className="svc-browser">
          <MiniVitrine />
        </BrowserFrame>
        <div className="svc-toast">
          <span className="svc-toast-dot" />
          <span>
            <strong>Nouvelle demande de contact</strong>
            <small>Création d’entreprise · à l’instant</small>
          </span>
        </div>
      </>
    ),
  },
  landing: {
    label: 'Exemple : page d’inscription à un salon, sur mobile',
    node: (
      <PhoneFrame className="svc-phone">
        <MiniLanding />
      </PhoneFrame>
    ),
  },
  ecommerce: {
    label: 'Exemple : boutique de céramiques en ligne avec ajout au panier',
    node: (
      <BrowserFrame url="maison-argile.fr" className="svc-browser">
        <MiniShop />
      </BrowserFrame>
    ),
  },
  refonte: {
    label: 'Exemple : ancien et nouveau site d’un hôtel, à comparer avec le curseur',
    node: (
      <BrowserFrame url="hotel-lesembruns.fr" className="svc-browser">
        <MiniRefonte />
      </BrowserFrame>
    ),
  },
  surmesure: {
    label: 'Exemple : outil de planification sur mesure pour une équipe d’intervention',
    node: (
      <BrowserFrame url="app.atlas-pro.fr/planning" className="svc-browser">
        <MiniCustom />
      </BrowserFrame>
    ),
  },
};

function ServiceCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v = visuals[item.id];
  return (
    <article
      ref={ref}
      className={`svc-card svc-card--${item.id}`}
      data-play={play ? '' : undefined}
      data-reveal="up"
      style={{ '--rv-delay': `${(index % 3) * 70}ms` } as React.CSSProperties}
    >
      <div className="svc-visual" role={item.id === 'refonte' ? 'group' : 'img'} aria-label={v.label}>
        <div className="svc-visual-inner" aria-hidden={item.id === 'refonte' ? undefined : true}>
          {v.node}
        </div>
      </div>
      <div className="svc-body">
        <h3 className="t-h3">{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  // indicateur de position du carrousel mobile
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setSlide(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container-site">
        <div className="section-head">
          <h2 id="services-title" className="t-h2" data-reveal="mask">
            {services.title}
          </h2>
          <p className="t-lead">{services.lead}</p>
        </div>

        <div className="svc-grid" ref={trackRef}>
          {services.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
          <div className="svc-card svc-cta" data-reveal="up">
            <p className="svc-cta-text">{services.footnote}</p>
            <ContactButton preset={{ source: 'services' }}>Parler de mon projet</ContactButton>
          </div>
        </div>

        <div className="svc-dots" aria-hidden="true">
          {[...services.items, null].map((_, i) => (
            <span key={i} data-on={slide === i ? '' : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
