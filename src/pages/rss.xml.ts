import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { articleUrl, getArticles, getCategory } from '../lib/articles';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    customData: `<language>${SITE.locale.toLowerCase()}</language>`,
    items: articles.slice(0, 50).map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishDate,
      link: articleUrl(a),
      categories: [getCategory(a.data.category).name, ...a.data.tags],
    })),
  });
}
