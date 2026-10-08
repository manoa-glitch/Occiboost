export type MockVariant = 'desktop' | 'tablet' | 'mobile' | 'mini';
export type MockProps = { variant?: MockVariant; lazy?: boolean };

/** Barre d'état d'un téléphone (heure, réseau, batterie). */
export function StatusBar({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className="mk-status" style={{ color: tone === 'light' ? '#fff' : '#0b0b0f' }}>
      <span>9:41</span>
      <span className="mk-status-icons">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
