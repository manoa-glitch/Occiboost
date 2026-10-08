import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Unité « mpx » des maquettes.
 * Dans les fichiers CSS de src/mockups/, `24mpx` est converti en `calc(24 * var(--m))`,
 * où --m vaut (largeur réelle du cadre / largeur de conception). Les sites d'exemple
 * sont ainsi dessinés en pixels « de conception » et se redimensionnent sans flou.
 */
function mockupUnits(): Plugin {
  return {
    name: 'occiboost:mockup-units',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0].replace(/\\/g, '/');
      if (!file.endsWith('.css') || !file.includes('/src/mockups/')) return null;
      return {
        code: code.replace(/(-?\d*\.?\d+)mpx\b/g, (_m, n: string) => `calc(${n} * var(--m))`),
        map: null,
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  // mode « artifact » : version autonome (un seul fichier HTML) pour la prévisualisation
  const artifact = mode === 'artifact';
  return {
    base: artifact ? './' : '/',
    plugins: [mockupUnits(), react(), tailwindcss()],
    define: {
      __PREVIEW__: JSON.stringify(artifact),
    },
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: artifact ? 100_000_000 : 4096,
      modulePreload: artifact ? false : { polyfill: false },
      target: 'es2020',
      chunkSizeWarningLimit: artifact ? 4000 : 600,
      rollupOptions: {
        output: artifact ? { inlineDynamicImports: true } : undefined,
      },
    },
  };
});
