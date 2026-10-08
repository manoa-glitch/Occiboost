import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type ContactIntent = 'projet' | 'devis';
export type ContactPreset = { intent?: ContactIntent; type?: string; sector?: string; source?: string };

type Ctx = {
  isOpen: boolean;
  preset: ContactPreset;
  open: (preset?: ContactPreset) => void;
  close: () => void;
};

const ContactCtx = createContext<Ctx | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preset, setPreset] = useState<ContactPreset>({});
  const open = useCallback((p: ContactPreset = {}) => {
    setPreset(p);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, preset, open, close }), [isOpen, preset, open, close]);
  return <ContactCtx.Provider value={value}>{children}</ContactCtx.Provider>;
}

export function useContact() {
  const ctx = useContext(ContactCtx);
  if (!ctx) throw new Error('useContact doit être utilisé dans <ContactProvider>');
  return ctx;
}

/** Bouton d'appel à l'action qui ouvre le formulaire de contact. */
export function ContactButton({
  children,
  preset,
  className = 'btn btn-primary',
}: {
  children: ReactNode;
  preset?: ContactPreset;
  className?: string;
}) {
  const { open } = useContact();
  return (
    <button type="button" className={className} onClick={() => open(preset)} aria-haspopup="dialog">
      {children}
    </button>
  );
}
