/**
 * Textes de la page d'accueil.
 * Modifier un texte ici le met à jour partout sur le site.
 */

export const hero = {
  badge: 'Création de sites internet',
  badgeExtra: 'sur mesure',
  title: 'Votre entreprise mérite un site à la hauteur de vos ambitions.',
  lead: 'Nous créons des sites internet modernes, professionnels et sur mesure, adaptés à votre activité et à vos objectifs.',
  primary: 'Parler de mon projet',
  secondary: 'Voir notre travail',
  audience: 'Indépendants, commerces, PME, startups ou grands groupes : chaque site est conçu pour vous.',
};

/** Réalisation réelle présentée dans la section « Notre travail ». */
export const work = {
  label: 'Réalisation récente',
  name: 'Assmati',
  url: 'https://assmati.com',
  domain: 'assmati.com',
  tagline: 'Le carnet de liaison numérique entre assistantes maternelles et parents.',
  summary:
    "Une application web complète pour les assistantes maternelles et les maisons d'assistantes maternelles (MAM), pensée pour simplifier le quotidien et le lien avec les familles.",
  audience: ['Assistantes maternelles', 'MAM', 'Parents'],
  scope: ['Conception', "Design de l'interface", 'Développement', 'Abonnements en ligne', 'Site vitrine'],
  brand: '#6B8E7F',
  modules: [
    { icon: 'clock', title: 'Présences', text: 'Arrivées et départs suivis au quotidien.' },
    { icon: 'file', title: 'Déclarations mensuelles', text: 'Les récapitulatifs du mois, prêts à déclarer.' },
    { icon: 'calendar', title: 'Agenda partagé', text: 'Le planning de la structure, accessible à tous.' },
    { icon: 'chat', title: 'Messagerie', text: 'Des échanges avec accusés de lecture.' },
    { icon: 'notebook', title: 'Journal de la journée', text: 'Repas, siestes, soins et activités.' },
    { icon: 'flag', title: 'Étapes de développement', text: 'Les grandes étapes de chaque enfant.' },
    { icon: 'image', title: 'Photos', text: 'Partagées avec le consentement des parents.' },
    { icon: 'megaphone', title: 'Annonces', text: 'Les informations importantes de la structure.' },
  ],
  /**
   * Captures d'écran réelles : déposez-les dans src/assets/realisations/
   * puis importez-les dans src/components/sections/Work.tsx (voir le README).
   */
};

export const services = {
  title: 'Des sites pensés pour votre entreprise.',
  lead: 'Chaque projet part de vos objectifs. Voici les formats que nous concevons le plus souvent.',
  items: [
    {
      id: 'vitrine',
      title: 'Site vitrine',
      text: 'Pour présenter votre entreprise, vos services et générer des contacts.',
    },
    {
      id: 'landing',
      title: 'Landing page',
      text: 'Pour mettre en avant une offre, un lancement ou une campagne.',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      text: 'Pour vendre vos produits en ligne, simplement.',
    },
    {
      id: 'refonte',
      title: 'Refonte',
      text: 'Pour moderniser un site existant et lui redonner de l’impact.',
    },
    {
      id: 'surmesure',
      title: 'Site sur mesure',
      text: 'Espace client, réservation, outil métier : pour des besoins plus spécifiques.',
    },
  ],
  footnote: 'Vous hésitez entre plusieurs formats ? Nous vous aidons à choisir.',
};

export type SectorStyle = {
  /** Famille et réglages typographiques appliqués au nom du secteur */
  font: 'serif' | 'garamond' | 'garamond-italic' | 'plex' | 'mona';
  stretch?: number;
  weight?: number;
  upper?: boolean;
  color: string;
  palette: [string, string, string];
};

export const sectors = {
  title: 'Pour toutes les entreprises, dans tous les secteurs.',
  lead: 'Un restaurant ne se présente pas comme une entreprise industrielle. Nous adaptons le design, les contenus et les fonctionnalités à votre métier.',
  needsLabel: 'Ce que votre site doit faire',
  items: [
    {
      name: 'Restauration',
      needs: ['Mettre en valeur la carte et l’ambiance', 'Réserver une table en ligne', 'Afficher horaires et accès'],
      style: { font: 'serif', color: '#F0B24A', palette: ['#16231B', '#F3EBDD', '#E8A93A'] },
    },
    {
      name: 'Immobilier',
      needs: ['Annonces avec recherche et filtres', 'Demandes d’estimation', 'Prise de rendez-vous'],
      style: { font: 'garamond-italic', color: '#E3CBA4', palette: ['#1D1B19', '#FAF8F5', '#B08A57'] },
    },
    {
      name: 'Artisanat',
      needs: ['Réalisations en photos', 'Zone d’intervention claire', 'Demande de devis simplifiée'],
      style: { font: 'mona', stretch: 75, weight: 800, upper: true, color: '#E0814A', palette: ['#2A211B', '#F2ECE3', '#C2622D'] },
    },
    {
      name: 'Commerce',
      needs: ['Vitrine de vos produits', 'Vente en ligne ou retrait en boutique', 'Infos pratiques du magasin'],
      style: { font: 'mona', stretch: 125, weight: 760, color: '#FF86AA', palette: ['#2B1631', '#FFF1F5', '#FF5C8A'] },
    },
    {
      name: 'Services',
      needs: ['Des offres faciles à comprendre', 'Prise de rendez-vous', 'Éléments qui rassurent'],
      style: { font: 'mona', stretch: 100, weight: 480, color: '#72D9C6', palette: ['#0E2A2A', '#F2FBF9', '#2BB39B'] },
    },
    {
      name: 'Santé & bien-être',
      needs: ['Présentation des soins', 'Réservation en ligne', 'Un ton rassurant et accessible'],
      style: { font: 'garamond', color: '#B4DEC3', palette: ['#20302A', '#F5F8F4', '#7FB79A'] },
    },
    {
      name: 'Tourisme',
      needs: ['Photos qui donnent envie', 'Disponibilités et réservation', 'Version en plusieurs langues'],
      style: { font: 'serif', color: '#62CBF5', palette: ['#0C2B3E', '#F4FAFD', '#2FA4D8'] },
    },
    {
      name: 'Événementiel',
      needs: ['Programme et billetterie', 'Galeries photo et vidéo', 'Inscriptions en ligne'],
      style: { font: 'mona', stretch: 125, weight: 900, color: '#C59BFF', palette: ['#1A0F2E', '#F8F3FF', '#9D5CFF'] },
    },
    {
      name: 'Industrie',
      needs: ['Savoir-faire et capacités', 'Fiches techniques', 'Demandes de devis B2B'],
      style: { font: 'plex', weight: 600, upper: true, color: '#F5AE3A', palette: ['#15191E', '#EEF1F4', '#F5A524'] },
    },
    {
      name: 'B2B',
      needs: ['Une proposition de valeur claire', 'Études de cas et preuves', 'Prise de contact qualifiée'],
      style: { font: 'plex', weight: 600, color: '#FF7A45', palette: ['#0E1726', '#F4F6FA', '#FF5B1F'] },
    },
    {
      name: 'Finance',
      needs: ['Une image de confiance', 'Contenus pédagogiques', 'Espace client sécurisé'],
      style: { font: 'garamond', color: '#E9D6A6', palette: ['#0F2620', '#F6F4EE', '#C8A75E'] },
    },
    {
      name: 'Startups',
      needs: ['Un message produit percutant', 'Pages de lancement', 'Un site qui évolue avec vous'],
      style: { font: 'mona', stretch: 112, weight: 700, color: '#7CF0C4', palette: ['#0B1022', '#F3FFFA', '#36E0A1'] },
    },
    {
      name: 'Associations',
      needs: ['Votre mission et vos actions', 'Dons et adhésions en ligne', 'Agenda des événements'],
      style: { font: 'serif', color: '#FFAA86', palette: ['#2A1712', '#FFF6F1', '#F2784B'] },
    },
  ] as { name: string; needs: string[]; style: SectorStyle }[],
  more: 'et bien d’autres',
  sizesTitle: 'Du premier site d’un indépendant au site d’un grand groupe, la même exigence.',
  sizes: [
    'Indépendants',
    'Artisans',
    'Commerçants',
    'Professions libérales',
    'Associations',
    'TPE',
    'PME',
    'Startups',
    'ETI',
    'Grandes entreprises',
  ],
};

export const benefits = {
  title: 'Pourquoi OcciBoost ?',
  lead: 'Un beau site ne suffit pas. Le vôtre doit aussi rassurer, guider et convaincre.',
  items: [
    { id: 'image', title: 'Image professionnelle', text: 'Votre site est à la hauteur de votre entreprise, dès la première seconde.' },
    { id: 'ux', title: 'Expérience utilisateur', text: 'Vos visiteurs trouvent facilement ce qu’ils cherchent.' },
    { id: 'conversion', title: 'Conversion', text: 'Chaque page donne envie de vous contacter.' },
    { id: 'mobile', title: 'Mobile', text: 'Une expérience soignée sur téléphone, tablette et ordinateur.' },
    { id: 'performance', title: 'Performance', text: 'Un site rapide et agréable à utiliser.' },
  ],
};

export const method = {
  title: 'De l’idée au site en ligne.',
  lead: 'Une méthode simple, avec un interlocuteur unique du premier échange à la mise en ligne.',
  steps: [
    { title: 'Échange', text: 'Nous prenons le temps de comprendre votre entreprise, vos clients et vos objectifs.' },
    { title: 'Conception', text: 'Nous imaginons le design et le parcours de vos visiteurs. Vous validez la direction.' },
    { title: 'Création', text: 'Nous construisons votre site, page après page, avec vos contenus.' },
    { title: 'Mise en ligne', text: 'Nous testons tout, sur tous les écrans, puis nous mettons votre site en ligne.' },
  ],
};

export const faq = {
  title: 'Questions fréquentes',
  lead: 'Une autre question ? Le plus simple est d’en parler.',
  items: [
    {
      q: 'Combien coûte un site internet ?',
      a: 'Le prix dépend du type de site, du nombre de pages et des fonctionnalités. Après un premier échange, nous vous envoyons un devis détaillé, adapté à votre projet.',
    },
    {
      q: 'Combien de temps faut-il pour créer un site ?',
      a: 'Cela dépend de l’ampleur du projet et de la disponibilité de vos contenus. Un planning clair, étape par étape, vous est proposé dès le départ.',
    },
    {
      q: 'Le site sera-t-il adapté au mobile ?',
      a: 'Oui. Chaque site est conçu pour le téléphone, la tablette et l’ordinateur, avec une mise en page pensée pour chaque écran.',
    },
    {
      q: 'Pouvez-vous refaire mon site actuel ?',
      a: 'Oui. Nous partons de votre site existant : ce qui fonctionne est conservé, le reste est repensé pour un site plus moderne et plus efficace.',
    },
    {
      q: 'Pouvez-vous travailler avec mon identité visuelle ?',
      a: 'Oui. Logo, couleurs, typographies : votre site respecte votre identité. Si vous n’en avez pas encore, nous définissons ensemble une direction visuelle cohérente.',
    },
    {
      q: 'Est-ce que vous vous occupez de la mise en ligne ?',
      a: 'Oui. Nous mettons votre site en ligne et vous accompagnons pour le nom de domaine et l’hébergement.',
    },
  ],
};

export const finalCta = {
  title: 'Votre prochain site commence ici.',
  text: 'Parlez-nous de votre projet et imaginons ensemble un site à la hauteur de votre entreprise.',
  primary: 'Parler de mon projet',
  secondary: 'Demander un devis',
};

export const nav = [
  { id: 'travail', label: 'Notre travail' },
  { id: 'services', label: 'Services' },
  { id: 'secteurs', label: 'Secteurs' },
  { id: 'methode', label: 'Méthode' },
  { id: 'faq', label: 'FAQ' },
];
