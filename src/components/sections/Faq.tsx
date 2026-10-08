import { useId, useState } from 'react';
import { faq } from '../../content/home';
import { ContactButton } from '../contact/ContactContext';
import { Icon } from '../ui/Icon';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container-site faq-layout">
        <div className="faq-intro">
          <h2 id="faq-title" className="t-h2" data-reveal="mask">
            {faq.title}
          </h2>
          <p className="t-lead">{faq.lead}</p>
          <ContactButton className="btn btn-secondary" preset={{ source: 'faq' }}>
            Poser ma question
          </ContactButton>
        </div>

        <div className="faq-list" data-reveal="up">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const btn = `faq-b-${uid}-${i}`;
            const panel = `faq-p-${uid}-${i}`;
            return (
              <div key={item.q} className="faq-item" data-open={isOpen ? '' : undefined}>
                <h3>
                  <button
                    id={btn}
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <Icon name="plus" strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" aria-labelledby={btn} className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
