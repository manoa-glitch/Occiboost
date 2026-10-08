import { renderToString } from 'react-dom/server';
import { App } from './App';
import { site } from './config/site';
import { faq } from './content/home';
import { paths, type PageId } from './lib/routes';

export { site };

export type PageMeta = { title: string; description: string; path: string; robots?: string };

export const pages: Record<PageId, PageMeta> = {
  home: {
    title: 'OcciBoost — Création de sites internet professionnels',
    description:
      'OcciBoost crée des sites internet modernes, professionnels et sur mesure pour les entreprises de toutes tailles et de tous secteurs. Parlez-nous de votre projet.',
    path: paths.home,
  },
  mentions: {
    title: 'Mentions légales — OcciBoost',
    description: 'Mentions légales du site OcciBoost, création de sites internet professionnels.',
    path: paths.mentions,
  },
  confidentialite: {
    title: 'Politique de confidentialité — OcciBoost',
    description: 'Comment OcciBoost collecte, utilise et protège vos données personnelles.',
    path: paths.confidentialite,
  },
  notfound: {
    title: 'Page introuvable — OcciBoost',
    description: 'Cette page n’existe pas ou a été déplacée.',
    path: '/404.html',
    robots: 'noindex',
  },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Balises <head> propres à chaque page (SEO, Open Graph, données structurées). */
export function head(page: PageId, ogImage: string) {
  const m = pages[page];
  const abs = (p: string) => (site.url ? `${site.url}${p.startsWith('/') ? p : `/${p}`}` : p);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.robots ?? 'index, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${esc(abs(ogImage))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (site.url) {
    tags.push(`<link rel="canonical" href="${esc(abs(m.path))}" />`);
    tags.push(`<meta property="og:url" content="${esc(abs(m.path))}" />`);
  }
  if (page === 'home') {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: site.name,
      description: m.description,
      ...(site.url ? { url: site.url, image: abs(ogImage) } : {}),
      telephone: site.contact.phoneHref,
      ...(site.contact.email ? { email: site.contact.email } : {}),
      areaServed: { '@type': 'Country', name: 'France' },
      knowsAbout: ['Création de sites internet', 'Site vitrine', 'Landing page', 'E-commerce', 'Refonte de site', 'Site sur mesure'],
    };
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(org)}</script>`);
    tags.push(`<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`);
  }
  return tags.join('\n    ');
}

export function render(page: PageId) {
  return renderToString(<App page={page} />);
}
