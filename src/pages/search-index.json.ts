import { articleUrl, getArticles, getCategory } from '../lib/articles';

// A small static index the /search page queries in the browser, so search
// works identically on every host without a server.
export async function GET() {
  const articles = await getArticles();
  const index = articles.map((a) => ({
    url: articleUrl(a),
    title: a.data.title,
    description: a.data.description,
    category: getCategory(a.data.category).name,
    tags: a.data.tags,
    date: a.data.publishDate.toISOString(),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
