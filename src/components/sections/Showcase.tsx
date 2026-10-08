import { useCallback, useEffect, useRef, useState, type ComponentType, type CSSProperties } from 'react';
import { useInView, useReducedMotion } from '../../lib/hooks';
import { BrowserFrame, PhoneFrame } from '../ui/Devices';
import { RestaurantSite } from '../../mockups/Restaurant';
import { ArtisanSite } from '../../mockups/Artisan';
import { B2BSite } from '../../mockups/B2B';
import type { MockProps } from '../../mockups/shared';

type Concept = {
  id: string;
  label: string;
  url: string;
  description: string;
  Site: ComponentType<MockProps>;
  /** distance de défilement automatique (px de conception) : desktop / mobile */
  scroll: [number, number];
};

const concepts: Concept[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    url: 'sauge-et-sel.fr',
    description: 'site d’un bistrot de saison avec carte, réservation en ligne et horaires',
    Site: RestaurantSite,
    scroll: [700, 900],
  },
  {
    id: 'artisan',
    label: 'Artisan',
    url: 'atelier-fildubois.fr',
    description: 'site d’un menuisier avec réalisations, zone d’intervention et demande de devis',
    Site: ArtisanSite,
    scroll: [640, 980],
  },
  {
    id: 'b2b',
    label: 'Entreprise B2B',
    url: 'kelvia.com',
    description: 'site d’une entreprise industrielle avec proposition de valeur, chiffres clés et démo',
    Site: B2BSite,
    scroll: [660, 1040],
  },
];

const DURATION = 7000;

/**
 * Vitrine du hero : trois sites d'exemple (entreprises fictives) qui se succèdent,
 * en version ordinateur et mobile. Un faisceau de lumière balaie l'écran à chaque transition.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [mounted, setMounted] = useState(() => concepts.map((_, i) => i === 0));
  const [hover, setHover] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0);
  const inView = useInView(rootRef, { threshold: 0.2 });

  const playing = !reduced && inView && !hover && pageVisible;

  const activeRef = useRef(0);
  const go = useCallback((i: number) => {
    const cur = activeRef.current;
    if (cur === i) return;
    activeRef.current = i;
    elapsed.current = 0;
    setPrev(cur);
    setActive(i);
    setMounted((m) => m.map((v, k) => v || k === i));
  }, []);

  // monte les autres sites une fois la page chargée (images préchargées sans bloquer l'affichage)
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(concepts.map(() => true)), 1600);
    const onVis = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // fin de la transition : l'ancien site est masqué
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), reduced ? 0 : 1000);
    return () => window.clearTimeout(t);
  }, [prev, active, reduced]);

  // lecture automatique + barre de progression (sans re-rendu à chaque image)
  useEffect(() => {
    progressRefs.current.forEach((el, i) => el?.style.setProperty('--prog', i === active ? String(elapsed.current / DURATION) : '0'));
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const p = Math.min(1, elapsed.current / DURATION);
      progressRefs.current[active]?.style.setProperty('--prog', p.toFixed(4));
      if (p >= 1) {
        go((active + 1) % concepts.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, active, go]);

  // légère profondeur au mouvement de la souris
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const hero = root.closest('section') ?? root;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty('--rx', cx.toFixed(4));
      root.style.setProperty('--ry', cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    hero.addEventListener('pointermove', onMove as EventListener);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove as EventListener);
      hero.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const stateOf = (i: number) => (i === active ? 'active' : i === prev ? 'prev' : 'idle');
  const current = concepts[active];

  return (
    <div
      ref={rootRef}
      className="showcase"
      data-paused={playing ? undefined : ''}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="sc-stage">
        <div className="sc-halo" aria-hidden="true" />
        <div id="showcase-panel" role="tabpanel" aria-label={`Concept : ${current.description}`} className="sc-devices">
          <BrowserFrame
            className="sc-browser"
            url={
              <span className="sc-url" key={current.url}>
                {current.url}
              </span>
            }
          >
            <div aria-hidden="true" className="sc-layers">
              {concepts.map((c, i) => (
                <div
                  key={c.id}
                  className="sc-layer"
                  data-state={stateOf(i)}
                  data-enter={i === active && prev !== null && !reduced ? '' : undefined}
                  style={{ '--sy': c.scroll[0] } as CSSProperties}
                >
                  {mounted[i] && <c.Site variant="desktop" lazy={i !== 0} />}
                </div>
              ))}
              {prev !== null && !reduced && <span className="sc-beam" key={`b${active}`} />}
            </div>
          </BrowserFrame>

          <PhoneFrame className="sc-phone">
            <div aria-hidden="true" className="sc-layers">
              {concepts.map((c, i) => (
                <div
                  key={c.id}
                  className="sc-layer"
                  data-state={stateOf(i)}
                  data-enter={i === active && prev !== null && !reduced ? '' : undefined}
                  style={{ '--sy': c.scroll[1] } as CSSProperties}
                >
                  {mounted[i] && <c.Site variant="mobile" lazy={i !== 0} />}
                </div>
              ))}
              {prev !== null && !reduced && <span className="sc-beam sc-beam--late" key={`p${active}`} />}
            </div>
          </PhoneFrame>
        </div>
      </div>

      <div className="sc-dock">
        <span className="sc-dock-label">Concepts</span>
        <div className="sc-tabs" role="tablist" aria-label="Exemples de sites">
          {concepts.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="showcase-panel"
              className="sc-tab"
              onClick={() => go(i)}
            >
              <span>{c.label}</span>
              <span className="sc-tab-track" aria-hidden="true">
                <span
                  className="sc-tab-progress"
                  ref={(el) => {
                    progressRefs.current[i] = el;
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="sc-note">Entreprises fictives : sites conçus pour l’exemple.</p>
    </div>
  );
}
