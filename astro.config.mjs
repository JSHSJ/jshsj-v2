import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  site: 'https://joshuastuebner.com',
  integrations: [sitemap(), mdx(), image()],
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  }
});