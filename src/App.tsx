import { useEffect } from 'react';
import './styles/global.css';
import { ContactProvider } from './components/contact/ContactContext';
import { ContactDialog } from './components/contact/ContactDialog';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileCta } from './components/layout/MobileCta';
import { HomePage } from './pages/Home';
import { LegalPage } from './pages/Legal';
import { NotFoundPage } from './pages/NotFound';
import { initReveal } from './lib/reveal';
import type { PageId } from './lib/routes';

export function App({ page }: { page: PageId }) {
  useEffect(() => initReveal(), [page]);

  return (
    <ContactProvider>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header page={page} />
      <main id="contenu">
        {page === 'home' && <HomePage />}
        {(page === 'mentions' || page === 'confidentialite') && <LegalPage kind={page} />}
        {page === 'notfound' && <NotFoundPage />}
      </main>
      <Footer page={page} />
      {page === 'home' && <MobileCta />}
      <ContactDialog />
    </ContactProvider>
  );
}
