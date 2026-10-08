import { useEffect, useRef, useState } from 'react';
import { nav } from '../../content/home';
import { site } from '../../config/site';
import { paths, sectionHref, type PageId } from '../../lib/routes';
import { ContactButton } from '../contact/ContactContext';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

export function Header({ page }: { page: PageId }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // fond vitré après quelques pixels ; masqué en descendant, réaffiché en remontant
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 16);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 520);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // section active dans la navigation
  useEffect(() => {
    if (page !== 'home') return;
    const ids = nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  // menu mobile : verrouillage du scroll, Échap, focus
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menu);
    if (!menu) return;
    const first = menuRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const homeHref = page === 'home' ? '#top' : paths.home;

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || menu ? '' : undefined}
      data-hidden={hidden && !menu ? '' : undefined}
    >
      <div className="container-site header-inner">
        <Logo id="logo-h" href={homeHref} />

        <nav className="header-nav" aria-label="Navigation principale">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={sectionHref(page, item.id)} aria-current={active === item.id ? 'true' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ContactButton className="btn btn-primary btn-sm header-cta">Parler de mon projet</ContactButton>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenu((m) => !m)}
          >
            <span className="menu-toggle-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" data-open={menu ? '' : undefined} hidden={!menu}>
        <nav aria-label="Navigation mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                <a href={sectionHref(page, item.id)} onClick={() => setMenu(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-foot">
          <ContactButton className="btn btn-primary" preset={{ source: 'menu' }}>
            Parler de mon projet
          </ContactButton>
          <a className="mobile-menu-phone" href={`tel:${site.contact.phoneHref}`}>
            <Icon name="phone" />
            {site.contact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
