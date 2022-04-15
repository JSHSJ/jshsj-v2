import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config

export default defineConfig({
  root: '.',
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  site: 'https://joshuastuebner.com',
  integrations: [sitemap()],
});
