import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';

/** Fenêtre de navigateur. Le contenu (`children`) est rendu dans une vue 16:10. */
export function BrowserFrame({
  url,
  children,
  className = '',
  style,
  viewClassName = '',
  overlay,
}: {
  url: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  viewClassName?: string;
  overlay?: ReactNode;
}) {
  return (
    <div className={`browser ${className}`} style={style}>
      <div className="browser-shell">
        <div className="browser-bar" aria-hidden="true">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-url">
            <Icon name="lock" strokeWidth={2.2} />
            <span>{url}</span>
          </div>
          <div className="browser-tools">
            <i />
            <i />
          </div>
        </div>
        <div className={`browser-view ${viewClassName}`}>{children}</div>
        {overlay}
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone-body">
        <div className="phone-screen">
          <span className="phone-island" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function TabletFrame({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`tablet ${className}`} style={style}>
      <div className="tablet-body">
        <div className="tablet-screen">{children}</div>
      </div>
    </div>
  );
}
