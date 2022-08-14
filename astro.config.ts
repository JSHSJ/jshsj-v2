import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import remarkSmartypants from "remark-smartypants";
import remarkGFM from "remark-gfm";
import remarkWiki from "remark-wiki-link";
import { Navigation } from "./src/config";
import { slugify } from "./src/utils/slugify";
import image from "@astrojs/image";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  root: '.',
  srcDir: './src',
  outDir: './dist',
  publicDir: './public',
  site: 'https://joshuastuebner.com',
  integrations: [sitemap(), mdx(), image(), svelte()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables'
    },
    remarkPlugins: [remarkSmartypants, remarkGFM, [remarkWiki, {
      pageResolver: name => [slugify(name)],
      hrefTemplate: permalink => `${Navigation.digitalGardenDetailPage.url}/${permalink}`
    }]]
  }
});
