import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  site: 'https://joshuastuebner.com',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  }
});
