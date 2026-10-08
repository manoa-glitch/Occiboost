import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import type { PageId } from './lib/routes';

const root = document.getElementById('root')!;
const fromQuery = new URLSearchParams(window.location.search).get('page') as PageId | null;
const page = (root.dataset.page as PageId | undefined) ?? fromQuery ?? 'home';

if (root.hasChildNodes()) {
  hydrateRoot(root, <App page={page} />);
} else {
  // développement (vite) : pas de pré-rendu
  createRoot(root).render(<App page={page} />);
}
