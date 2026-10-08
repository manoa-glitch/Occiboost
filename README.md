# Site OcciBoost

Site vitrine d’OcciBoost — création de sites internet professionnels.
React 19 + TypeScript + Vite + Tailwind CSS 4, **pré-rendu en HTML statique** (SEO, affichage immédiat) puis hydraté côté navigateur pour les animations et interactions. Aucune autre dépendance d’exécution.

---

## Démarrer

```bash
npm install
npm run dev            # développement : http://localhost:5173
npm run build          # production → dist/ (HTML pré-rendu, prêt pour Netlify)
npm run preview        # sert dist/ en local : http://localhost:4173
npm run build:preview  # version autonome → dist-preview/ (un fichier HTML par page, tout intégré)
npm run typecheck      # vérification TypeScript
```

Node 20 ou plus récent.

---

## Où modifier quoi

| Je veux modifier…                                   | Fichier                                    |
| --------------------------------------------------- | ------------------------------------------ |
| Un texte de la page d’accueil (titres, FAQ, secteurs…) | `src/content/home.ts`                      |
| Téléphone, email, réseaux sociaux, URL du site      | `src/config/site.ts`                       |
| Les mentions légales (SIRET, adresse, hébergeur…)   | `src/config/site.ts` → `legal`             |
| Les couleurs, typographies, rayons                  | `src/styles/global.css` (bloc `@theme`)    |
| Le style d’une section                              | `src/styles/sections/<section>.css`        |
| Un site d’exemple (maquette)                        | `src/mockups/*.tsx` et `*.css`             |

### À compléter avant la mise en ligne

Les informations inconnues ne sont **pas inventées** : elles apparaissent comme « à renseigner » sur le site.

- `site.url` : l’adresse définitive (active le canonical, Open Graph absolu et le `sitemap.xml`) ;
- `site.contact.email` ;
- `site.socials` : liens Instagram, LinkedIn… (affichés automatiquement s’ils sont renseignés) ;
- `site.legal` : raison sociale, statut, adresse, SIRET, directeur de publication, hébergeur ;
- les réponses de la FAQ (`src/content/home.ts`) sont rédigées sans prix ni délai : relisez-les pour qu’elles collent exactement à votre offre ;
- la durée de conservation des données (3 ans) dans la politique de confidentialité (`src/pages/Legal.tsx`).

### Ajouter les captures d’écran d’Assmati

La section « Notre travail » présente Assmati avec ses informations réelles (nom, accroche, fonctionnalités, lien vers assmati.com).
Pour afficher de vraies captures :

1. exportez une capture ordinateur (1600 × 1000 px environ) et une capture mobile (780 × 1688 px environ) en WebP ;
2. déposez-les dans `src/assets/realisations/` (ex. `assmati-desktop.webp`, `assmati-mobile.webp`) ;
3. dans `src/components/sections/Work.tsx`, remplacez la ligne `const shots = {}` :

```ts
import assmatiDesktop from '../../assets/realisations/assmati-desktop.webp';
import assmatiMobile from '../../assets/realisations/assmati-mobile.webp';
const shots = { desktop: assmatiDesktop, mobile: assmatiMobile };
```

Les captures s’affichent alors dans un navigateur et un téléphone, à la place du tableau des fonctionnalités.

---

## Formulaire de contact

Tous les boutons « Parler de mon projet » / « Demander un devis » ouvrent le même formulaire (type de site, structure, coordonnées, message).

- **Netlify Forms** est utilisé par défaut : un formulaire statique `projet` est présent dans `index.html` pour que Netlify le détecte au déploiement.
  Dans Netlify : *Site configuration → Forms* → activez la détection des formulaires, puis ajoutez une notification email.
- **Email** : chaque demande est aussi envoyée par email via FormSubmit (gratuit, sans compte) à l’adresse de `site.form.emailRelay`. À la première demande, FormSubmit envoie un email « Activate Form » : cliquez dessus une fois. Mettez `emailRelay: ''` pour désactiver.
- Autre hébergeur : remplacez `site.form.endpoint` par l’URL d’un service de formulaires (Formspree, etc.). Les champs sont envoyés en `application/x-www-form-urlencoded`.
- Un champ piège (`bot-field`) filtre les robots.
- Dans la version autonome (`build:preview`), l’envoi est désactivé et un message l’indique clairement.

---

## Déploiement (Netlify)

`netlify.toml` est déjà configuré (commande `npm run build`, dossier `dist`, cache longue durée des fichiers versionnés, en-têtes de sécurité).

- Avec Git : connectez le dépôt dans Netlify, tout est automatique.
- Sans Git : `npm run build`, puis glissez le dossier `dist/` dans Netlify.

Pages générées : `/`, `/mentions-legales/`, `/confidentialite/`, `404.html`, `robots.txt` (+ `sitemap.xml` quand `site.url` est renseigné).

---

## Structure

```
src/
  config/site.ts          coordonnées, formulaire, mentions légales
  content/home.ts         tous les textes de l'accueil
  components/
    layout/               en-tête, pied de page, bouton flottant mobile
    sections/             Hero, Showcase, Work, Services, Sectors, Benefits, Method, Faq, FinalCta
    contact/              formulaire (dialog natif) et contexte d'ouverture
    ui/                   logo, icônes, cadres navigateur / téléphone / tablette
  mockups/                sites d'exemple (entreprises fictives) et mini-sites des services
  pages/                  accueil, pages légales, 404
  styles/                 système visuel (global.css) + une feuille par section
  lib/                    hooks, apparitions au scroll, routes
  entry-client.tsx        hydratation
  entry-server.tsx        rendu serveur + balises SEO
scripts/build.mjs         build client + SSR + pré-rendu
design/illustrations/     sources des illustrations (Python) → src/assets/img/*.webp
public/                   favicon, image de partage (og-image.jpg)
```

### Les maquettes de sites

Les sites d’exemple sont de vrais composants HTML/CSS, dessinés sur une largeur de conception (1280 px ordinateur, 820 px tablette, 390 px mobile) avec l’unité `mpx` (convertie au build en `calc(n * var(--m))`). Ils se redimensionnent donc sans flou, du hero aux petites cartes. Ils sont `aria-hidden` et marqués `data-nosnippet` pour ne pas polluer le référencement.

Les entreprises présentées (Sauge & Sel, Atelier Fil du Bois, Kelvia, Rivage Immobilier, Cabinet Valmont, Maison Argile, Hôtel des Embruns, Atlas) sont **fictives** et signalées comme telles sur le site et dans les mentions légales.

### Illustrations

Les images des maquettes (plats, intérieurs, maisons, céramiques) sont dessinées en SVG puis converties en WebP — aucune banque d’images. Pour les régénérer : `python3 design/illustrations/render.py` (Python 3, Playwright et Pillow).

---

## Identité visuelle (à conserver)

- **Couleurs** : bleu nuit `#070C22` (fond), surfaces `#0A1130` → `#16214F`, texte `#EEF1FF` / `#A7B1D9` / `#7883B0`, lumière électrique `#5B7CFF` → `#5CE1FF` (dégradé « boost »).
- **Typographie** : Mona Sans (variable). Titres en largeur étendue (110–112 %), graisse ~620, interlettrage serré. Texte courant en largeur normale.
- **Signature** : la lumière qui « écrit » les interfaces — faisceau des transitions du hero, reflet du bouton principal, horizon du CTA final.
- **Rayons** : panneaux 2 rem, cartes 1,375 rem, boutons et pastilles en pilule.
- **Mouvement** : courbe `--ease-out-expo`, apparitions au scroll uniquement sur les titres et visuels clés, `prefers-reduced-motion` respecté partout.

---

## Qualité

- HTML pré-rendu, CSS intégrée, polices auto-hébergées (aucun appel à Google), police principale préchargée.
- Images WebP dimensionnées, chargement différé hors écran ; les autres sites de la vitrine sont montés après l’affichage.
- Titre, meta description, Open Graph, données structurées (`ProfessionalService`, `FAQPage`), structure H1 → H2 → H3.
- Navigation au clavier, focus visible, lien d’évitement, formulaire dans un `<dialog>` natif, contrastes AA.

## Licences

Polices Mona Sans, Young Serif, IBM Plex Sans et Cormorant Garamond : SIL Open Font License 1.1.
