# OcciBoost — notes pour Claude

- Ce dépôt est la source unique du site occiboost.netlify.app.
- Netlify est relié à la branche `main` : chaque push sur `main` reconstruit et met en ligne le site (`npm run build` → `dist/`).
- Avant de pousser : `npm run typecheck` et `npm run build` doivent passer.
- Coordonnées, formulaire et mentions légales : `src/config/site.ts`. Textes : `src/content/home.ts`.
- Conserver l'identité visuelle décrite dans le README (section « Identité visuelle »).
