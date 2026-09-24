import { getCollection, type CollectionEntry } from 'astro:content';
import { AUTHORS, CATEGORIES, SITE, type AuthorSlug } from '../config';

export type Article = CollectionEntry<'articles'>;

/** Published articles, newest first. Drafts show in `astro dev` only. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function articleUrl(article: Article) {
  return `/articles/${article.id}/`;
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export function getAuthor(slug: string) {
  return AUTHORS[slug as AuthorSlug];
}

const dateFormat = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: SITE.timezone,
});

export function formatDate(date: Date) {
  return dateFormat.format(date);
}

export function readingTime(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
