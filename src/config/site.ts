/**
 * Configuration centrale du site OcciBoost.
 *
 * Toutes les coordonnées et informations légales se modifient ICI.
 * Les champs vides ('') sont des emplacements à compléter : le site les affiche
 * comme « à renseigner » (coordonnées) ou les masque (réseaux sociaux).
 */
export const site = {
  name: 'OcciBoost',
  baseline: 'Création de sites internet professionnels',

  /** Adresse publique du site, sans « / » final. Sert au canonical, à Open Graph et au sitemap. */
  url: 'https://occiboost.netlify.app', // à remplacer par votre domaine définitif

  contact: {
    phone: '07 84 01 63 12',
    phoneHref: '+33784016312',
    email: 'occiboost@outlook.com',
  },

  /** Réseaux sociaux : ajoutez les liens réels, ils apparaîtront automatiquement dans le pied de page. */
  socials: [
    // { label: 'Instagram', href: 'https://www.instagram.com/...' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/company/...' },
  ] as { label: string; href: string }[],

  /** Formulaire de contact (Netlify Forms par défaut). */
  form: {
    name: 'projet',
    /** Point d'envoi. '/' = Netlify Forms. Remplacez par l'URL d'un autre service si besoin (Formspree…). */
    endpoint: '/',
    /**
     * Envoi de chaque demande par email (FormSubmit, gratuit, sans compte).
     * La toute première demande déclenche un email « Activate » à cette adresse : cliquez dessus une fois.
     * Mettez '' pour désactiver.
     */
    emailRelay: 'https://formsubmit.co/ajax/occiboost@outlook.com',
  },

  /** Informations des mentions légales — à compléter avant la mise en ligne. */
  legal: {
    publisher: '', // Nom et prénom ou raison sociale
    status: '', // ex. Entrepreneur individuel (micro-entreprise), SASU…
    address: '', // Adresse du siège
    siret: '', // Numéro SIRET
    vat: '', // TVA intracommunautaire, le cas échéant
    director: '', // Directeur ou directrice de la publication
    host: '', // Nom de l'hébergeur (ex. Netlify, Inc.)
    hostAddress: '', // Adresse de l'hébergeur
    lastUpdate: 'octobre 2026',
  },
} as const;

export type Site = typeof site;
