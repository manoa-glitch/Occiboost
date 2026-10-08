import { site } from '../../config/site';
import { paths, sectionHref, type PageId } from '../../lib/routes';
import { ContactButton } from '../contact/ContactContext';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

export function Footer({ page }: { page: PageId }) {
  const links = [
    { label: 'Accueil', href: page === 'home' ? '#top' : paths.home },
    { label: 'Services', href: sectionHref(page, 'services') },
    { label: 'Méthode', href: sectionHref(page, 'methode') },
    { label: 'Secteurs', href: sectionHref(page, 'secteurs') },
    { label: 'FAQ', href: sectionHref(page, 'faq') },
  ];
  const year = 2026;

  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo id="logo-f" href={page === 'home' ? '#top' : paths.home} />
            <p>{site.baseline}.</p>
          </div>

          <nav className="footer-col" aria-label="Plan du site">
            <p className="footer-title">Navigation</p>
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li>
                <ContactButton className="footer-link-btn" preset={{ source: 'footer' }}>
                  Contact
                </ContactButton>
              </li>
            </ul>
          </nav>

          <div className="footer-col">
            <p className="footer-title">Contact</p>
            <ul>
              <li>
                <a className="footer-contact" href={`tel:${site.contact.phoneHref}`}>
                  <Icon name="phone" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                {site.contact.email ? (
                  <a className="footer-contact" href={`mailto:${site.contact.email}`}>
                    <Icon name="mail" />
                    {site.contact.email}
                  </a>
                ) : (
                  <span className="footer-contact">
                    <Icon name="mail" />
                    <em className="placeholder-info">Email à renseigner</em>
                  </span>
                )}
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} OcciBoost. Tous droits réservés.</p>
          <ul>
            <li>
              <a href={paths.mentions}>Mentions légales</a>
            </li>
            <li>
              <a href={paths.confidentialite}>Politique de confidentialité</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        OcciBoost
      </div>
    </footer>
  );
}
