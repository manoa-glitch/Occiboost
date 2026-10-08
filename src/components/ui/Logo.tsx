/**
 * Logo OcciBoost : un « O » ouvert dont s'échappe un point de lumière — l'élan, le « boost ».
 */
export function LogoMark({ id, className = 'logo-mark' }: { id: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#5B7CFF" />
          <stop offset="1" stopColor="#5CE1FF" />
        </linearGradient>
      </defs>
      <path
        className="lm-ring"
        d="M23.43 16.84A9.5 9.5 0 1 1 15.16 8.57"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      <circle className="lm-dot" cx="24.9" cy="7.1" r="4.1" fill={`url(#${id}-g)`} />
    </svg>
  );
}

export function Logo({ id, href, label = 'OcciBoost, retour à l’accueil' }: { id: string; href: string; label?: string }) {
  return (
    <a className="logo" href={href} aria-label={label}>
      <LogoMark id={id} />
      <span>OcciBoost</span>
    </a>
  );
}
