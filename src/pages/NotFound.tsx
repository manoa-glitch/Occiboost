import { paths } from '../lib/routes';
import { ContactButton } from '../components/contact/ContactContext';

export function NotFoundPage() {
  return (
    <section className="section legal-hero">
      <div className="container-site notfound">
        <p className="section-label">Erreur 404</p>
        <h1 className="t-h2">Cette page n’existe pas.</h1>
        <p className="t-lead">Elle a peut-être été déplacée. Revenez à l’accueil ou parlez-nous directement de votre projet.</p>
        <div className="hero-actions">
          <a className="btn btn-secondary" href={paths.home}>
            Retour à l’accueil
          </a>
          <ContactButton>Parler de mon projet</ContactButton>
        </div>
      </div>
    </section>
  );
}
