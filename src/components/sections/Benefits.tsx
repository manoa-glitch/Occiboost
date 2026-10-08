import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { benefits } from '../../content/home';
import { useAutoCycle, useInView, useReducedMotion } from '../../lib/hooks';
import { BrowserFrame, PhoneFrame, TabletFrame } from '../ui/Devices';
import { Icon } from '../ui/Icon';
import { RealEstateSite } from '../../mockups/RealEstate';

const icons: Record<string, string> = {
  image: 'star',
  ux: 'compass',
  conversion: 'target',
  mobile: 'devices',
  performance: 'bolt',
};

/** Zone mise en évidence sur le site d'exemple pour chaque bénéfice. */
const targets: Record<string, string | null> = {
  image: '[data-anno="image"]',
  ux: '[data-anno="ux"]',
  conversion: '[data-anno="conversion-nav"]',
  mobile: null,
  performance: null,
};

export function Benefits() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [box, setBox] = useState<CSSProperties | null>(null);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { threshold: 0.35 });
  useAutoCycle(benefits.items.length, 3800, inView && !touched && !reduced, setActive, active);

  const id = benefits.items[active].id;

  // positionne le cadre de mise en évidence sur l'élément ciblé du site d'exemple
  const measure = useCallback(() => {
    const view = viewRef.current?.querySelector('.browser-view') as HTMLElement | null;
    const sel = targets[id];
    if (!view || !sel) {
      setBox(null);
      return;
    }
    const el = view.querySelector(sel) as HTMLElement | null;
    if (!el) return;
    const v = view.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = 6;
    setBox({
      left: Math.max(4, r.left - v.left - pad),
      top: Math.max(4, r.top - v.top - pad),
      width: Math.min(v.width - 8, r.width + pad * 2),
      height: Math.min(v.height - 8, r.height + pad * 2),
    });
  }, [id]);

  useEffect(() => {
    measure();
    const view = viewRef.current;
    if (!view || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(view);
    return () => ro.disconnect();
  }, [measure]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <section id="pourquoi" className="section benefits" aria-labelledby="pourquoi-title">
      <div className="container-site">
        <div className="section-head">
          <h2 id="pourquoi-title" className="t-h2" data-reveal="mask">
            {benefits.title}
          </h2>
          <p className="t-lead">{benefits.lead}</p>
        </div>

        <div className="bn-layout" ref={rootRef}>
          <div className="bn-visual" ref={viewRef} data-active={id} aria-hidden="true" data-reveal="scale">
            <BrowserFrame
              url="rivage-immobilier.fr"
              className="bn-browser"
              overlay={<span className="bn-loadbar" key={`l${active}`} />}
            >
              <div className="bn-page" key={id === 'performance' ? `p${active}` : 'page'}>
                <RealEstateSite variant="desktop" />
              </div>
              <span className="bn-focus" style={box ?? undefined} data-on={box ? '' : undefined}>
                <span className="bn-focus-tag">{benefits.items[active].title}</span>
              </span>
            </BrowserFrame>
            <div className="bn-devices">
              <TabletFrame className="bn-tablet">
                <RealEstateSite variant="tablet" />
              </TabletFrame>
              <PhoneFrame className="bn-phone">
                <RealEstateSite variant="mobile" />
              </PhoneFrame>
            </div>
            <div className="bn-perf">
              <span>
                <Icon name="bolt" /> Images optimisées
              </span>
              <span>
                <Icon name="check" strokeWidth={2.2} /> Code léger
              </span>
            </div>
          </div>

          <div className="bn-list" role="group" aria-label="Ce que votre site vous apporte">
            {benefits.items.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-pressed={i === active}
                className="bn-item"
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
              >
                <span className="bn-icon">
                  <Icon name={icons[b.id]} />
                </span>
                <span className="bn-text">
                  <span className="bn-title">{b.title}</span>
                  <span className="bn-desc">{b.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
