export type PageId = 'home' | 'mentions' | 'confidentialite' | 'notfound';

export const PREVIEW = typeof __PREVIEW__ !== 'undefined' && __PREVIEW__;

/** Chemins des pages. La prévisualisation autonome utilise des fichiers .html relatifs. */
export const paths: Record<Exclude<PageId, 'notfound'>, string> = PREVIEW
  ? { home: 'index.html', mentions: 'mentions-legales.html', confidentialite: 'confidentialite.html' }
  : { home: '/', mentions: '/mentions-legales/', confidentialite: '/confidentialite/' };

/** Lien vers une section de l'accueil, depuis n'importe quelle page. */
export function sectionHref(page: PageId, id: string) {
  return page === 'home' ? `#${id}` : `${paths.home}#${id}`;
}
