import rss from '@astrojs/rss';
import { slugify } from '@/utils/slugify';
import { sortByDateDesc } from '@/utils/sortByDate';
import {Navigation} from "@/config/index.ts";

const allBlog = import.meta.globEager("/src/content/Blog/*.md");
const formattedBlogposts = Object.values(allBlog).map(post => ({
    ...post.frontmatter,
    slug: slugify(post.frontmatter.title),
})).sort(sortByDateDesc)
const title = "Joshuas Gedanken"
const description = "Gedanken, Workflows und Ideen. Einfach Dinge, über die ich schreiben möchte."

export const get = () => rss({
    // `<title>` field in output xml
    title,
    // `<description>` field in output xml
    description,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: formattedBlogposts.map(item => {
      return {
      title: item.title,
      description: item.description,
      pubDate: item.date,
      link: `${Navigation.blogPost.url}/${item.slug}`,
      customData: `<id>${import.meta.env.SITE}${Navigation.blogPost.url.substring(1)}/${item.slug}</id>`
      }
    }),
    // (optional) inject custom xml
    customData: `
    <author>
      <name>Joshua Stübner</name>
      <email>jshsj@hey.com</email>
    </author>
    `,
  });

