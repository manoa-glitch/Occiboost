/**
 * Apparitions au scroll.
 * Les éléments marqués `data-reveal` restent visibles par défaut (rendu serveur, sans JS).
 * Au chargement, seuls ceux situés SOUS la ligne de flottaison sont mis en attente,
 * puis révélés à leur entrée dans l'écran. Rien n'est masqué si l'utilisateur
 * préfère réduire les animations.
 *
 * Les titres « mask » sont masqués par clip-path : l'observateur surveille donc leur parent
 * (un élément masqué n'est jamais considéré comme visible par IntersectionObserver).
 */
export function initReveal(root: ParentNode = document) {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])'));
  const fold = window.innerHeight * 0.92;
  const byTarget = new Map<Element, HTMLElement[]>();

  for (const el of els) {
    if (el.getBoundingClientRect().top <= fold) {
      el.dataset.rv = 'done';
      continue;
    }
    el.dataset.rv = 'wait';
    const target = el.dataset.reveal === 'mask' ? (el.parentElement ?? el) : el;
    const list = byTarget.get(target) ?? [];
    list.push(el);
    byTarget.set(target, list);
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const el of byTarget.get(entry.target) ?? []) el.dataset.rv = 'show';
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  byTarget.forEach((_, target) => io.observe(target));
  return () => io.disconnect();
}
