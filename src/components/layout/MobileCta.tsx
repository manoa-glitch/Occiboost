import { useEffect, useState } from 'react';
import { useContact } from '../contact/ContactContext';

/**
 * Bouton flottant sur mobile : apparaît une fois le hero dépassé,
 * disparaît quand l'appel à l'action final ou le pied de page sont visibles.
 */
export function MobileCta() {
  const { open, isOpen } = useContact();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById('top'), document.getElementById('contact'), document.querySelector('.site-footer')].filter(
      Boolean,
    ) as Element[];
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting);
      setShow(![...visible.values()].some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const visible = show && !isOpen;
  return (
    <div className="mobile-cta" data-show={visible ? '' : undefined}>
      <button
        type="button"
        className="btn btn-primary"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        onClick={() => open({ source: 'mobile-bar' })}
      >
        Parler de mon projet
      </button>
    </div>
  );
}
