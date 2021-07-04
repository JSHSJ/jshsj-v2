import { Client } from '@notionhq/client';
import { slugify } from './slugify';

export async function getAllProjects() {
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const allProjectsQuery = await notion.databases.query({
    database_id: '407731b52d4642d6a91e326ea9eb3a98',
  });

  const allProjects = allProjectsQuery.results
    .map((page) => ({
      id: page.id,
      techStack: page.properties.Techstack, // richtext
      // preview: page.properties.Preview
      description: page.properties.Description, // richtext
      url: page.properties.URL, // url
      name: page.properties.Name, // plain text
      slug: slugify(page.properties.Name['title'].map((part) => part.text.content).join('-'), '-'),
    }))
    .filter((p) => p.name['title'].length > 0);

  return allProjects;
}
