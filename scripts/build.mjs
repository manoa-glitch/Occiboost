/**
 * Construction du site OcciBoost.
 *
 *   npm run build           → dist/ : site de production pré-rendu (HTML statique + hydratation React)
 *   npm run build:preview   → dist-preview/ : version autonome (un fichier HTML par page, tout intégré)
 *
 * Étapes : build client (Vite) → build serveur (SSR) → pré-rendu de chaque page.
 */
import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const preview = process.argv.includes('--preview');
const mode = preview ? 'artifact' : 'production';
const outDir = path.join(root, preview ? 'dist-preview' : 'dist');
const ssrDir = path.join(root, '.ssr');

const t0 = Date.now();
await build({ root, mode, logLevel: 'warn', build: { outDir, emptyOutDir: true } });
await build({
  root,
  mode,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
});
const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href + `?t=${Date.now()}`);
const site = ssr.site;

let template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');

/**
 * Rendu d'une page. React place ses indications de préchargement (<link rel="preload">)
 * au début du HTML rendu : on les déplace dans <head> pour que l'hydratation retrouve
 * exactement l'arbre attendu.
 */
function renderPage(id) {
  const html = ssr.render(id);
  const lead = html.match(/^(?:<link\b[^>]*>)+/);
  return lead ? { app: html.slice(lead[0].length), hints: lead[0].replace(/></g, '>\n    <') } : { app: html, hints: '' };
}

// --- CSS : intégrée dans la page (un aller-retour réseau de moins au premier affichage)
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
let css = '';
if (cssLink) {
  const cssPath = path.join(outDir, cssLink[1].replace(/^\.?\//, ''));
  css = await fs.readFile(cssPath, 'utf8');
  template = template.replace(cssLink[0], '');
  await fs.rm(cssPath);
}

const pages = [
  { id: 'home', file: preview ? 'index.html' : 'index.html' },
  { id: 'mentions', file: preview ? 'mentions-legales.html' : 'mentions-legales/index.html' },
  { id: 'confidentialite', file: preview ? 'confidentialite.html' : 'confidentialite/index.html' },
  ...(preview ? [] : [{ id: 'notfound', file: '404.html' }]),
];

if (!preview) {
  // ------------------------------------------------------------------ production
  const assets = await fs.readdir(path.join(outDir, 'assets'));
  const font = assets.find((f) => f.startsWith('mona-sans') && f.endsWith('.woff2'));
  const preload = font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />` : '';
  for (const p of pages) {
    const { app, hints } = renderPage(p.id);
    let html = template
      .replace('<!--head-->', ssr.head(p.id, '/og-image.jpg'))
      .replace('<!--preload-->', `${preload}\n    ${hints}\n    <style>${css}</style>`)
      .replace('<div id="root"><!--app--></div>', `<div id="root" data-page="${p.id}">${app}</div>`);
    if (p.id !== 'home') html = html.replace(/<!--\s*Formulaire statique[\s\S]*?<\/form>\n?/, '');
    const dest = path.join(outDir, p.file);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, html);
  }
  // robots.txt + sitemap.xml
  const url = site.url;
  await fs.writeFile(
    path.join(outDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`,
  );
  if (url) {
    const locs = ['/', '/mentions-legales/', '/confidentialite/'];
    await fs.writeFile(
      path.join(outDir, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs
        .map((l) => `  <url><loc>${url}${l}</loc></url>`)
        .join('\n')}\n</urlset>\n`,
    );
  }
} else {
  // ------------------------------------------------------------------ prévisualisation autonome
  const scriptTag = template.match(/<script type="module" crossorigin src="([^"]+)"><\/script>|<script type="module" src="([^"]+)"><\/script>/);
  const jsFile = scriptTag[1] || scriptTag[2];
  const js = (await fs.readFile(path.join(outDir, jsFile.replace(/^\.?\//, '')), 'utf8')).replace(/<\/script/gi, '<\\/script');
  const safeCss = css.replace(/<\/style/gi, '<\\/style');
  for (const p of pages) {
    const app = `<div id="root" data-page="${p.id}">${renderPage(p.id).app}</div>`;
    const meta = ssr.pages[p.id];
    let html;
    if (p.id === 'home') {
      // page principale de l'artifact : le squelette <html>/<head>/<body> est ajouté à la publication
      html = `<title>OcciBoost</title>\n<meta name="description" content="${meta.description}">\n<style>${safeCss}</style>\n${app}\n<script type="module">${js}</script>\n`;
    } else {
      html = `<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>${meta.title}</title>\n<style>${safeCss}</style>\n</head>\n<body>\n${app}\n<script type="module">${js}</script>\n</body>\n</html>\n`;
    }
    await fs.writeFile(path.join(outDir, p.file), html);
  }
  // nettoyage : tout est intégré dans les pages
  await fs.rm(path.join(outDir, 'assets'), { recursive: true, force: true });
  for (const f of await fs.readdir(outDir)) {
    if (!f.endsWith('.html')) await fs.rm(path.join(outDir, f), { recursive: true, force: true });
  }
}

await fs.rm(ssrDir, { recursive: true, force: true });
const files = await fs.readdir(outDir, { recursive: true });
console.log(`✓ ${preview ? 'Prévisualisation' : 'Production'} : ${files.length} fichiers dans ${path.relative(root, outDir)}/ (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
