/**
 * Change this to `true` to generate source maps alongside your production bundle. This is useful for debugging, but
 * will increase total bundle size and expose your source code.
 */
const sourceMapsInProduction = true;

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import sveltePreprocess from "svelte-preprocess";
import legacy from "@vitejs/plugin-legacy";
import autoprefixer from "autoprefixer";
import pkg from "./package.json";
import tsconfig from "./tsconfig.json";

const production = process.env.NODE_ENV === "production";
const config = defineConfig({
  plugins: [
    svelte({
      emitCss: production,
      preprocess: sveltePreprocess(),
      compilerOptions: {
        dev: !production,
      },
      hot: !production
        ? {
            injectCss: true,
            partialAccept: true,
          }
        : false,
    }),
  ],
  build: {
    sourcemap: sourceMapsInProduction,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});

// Babel
config.plugins?.unshift(
  legacy({
    targets: pkg.browserslist,
  })
);

// Load path aliases from the tsconfig.json file
for (const alias in tsconfig.compilerOptions.paths) {
  const paths = aliases[alias].map((p) => path.resolve(__dirname, p));

  // Our tsconfig uses glob path formats, whereas webpack just wants directories
  // We'll need to transform the glob format into a format acceptable to webpack

  const wpAlias = alias.replace(/(\\|\/)\*$/, "");
  const wpPaths = paths.map((p) => p.replace(/(\\|\/)\*$/, ""));

  if (!config.resolve) config.resolve = {};
  if (!config.resolve.alias) config.resolve.alias = {};

  if (
    config.resolve &&
    config.resolve.alias &&
    !(wpAlias in config.resolve.alias)
  ) {
    config.resolve.alias[wpAlias] = wpPaths.length > 1 ? wpPaths : wpPaths[0];
  }
}

export default config;
