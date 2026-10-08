import { useEffect, useRef } from 'react';
import { finalCta } from '../../content/home';
import { site } from '../../config/site';
import { ContactButton } from '../contact/ContactContext';
import { Icon } from '../ui/Icon';

export function FinalCta() {
  const panelRef = useRef<HTMLDivElement>(null);

  // halo qui suit le curseur
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="contact" className="section final-cta" aria-labelledby="contact-title">
      <div className="container-site">
        <div className="cta-panel" ref={panelRef} data-reveal="scale">
          <div className="cta-horizon" aria-hidden="true">
            <span className="cta-atmo" />
            <span className="cta-planet" />
          </div>
          <div className="cta-spot" aria-hidden="true" />
          <div className="cta-content">
            <h2 id="contact-title" className="cta-title">
              {finalCta.title}
            </h2>
            <p className="cta-text">{finalCta.text}</p>
            <div className="cta-actions">
              <ContactButton preset={{ source: 'cta-final' }}>{finalCta.primary}</ContactButton>
              <ContactButton className="btn btn-secondary" preset={{ intent: 'devis', source: 'cta-final' }}>
                {finalCta.secondary}
              </ContactButton>
            </div>
            <p className="cta-phone">
              <Icon name="phone" />
              Ou appelez-nous au <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
