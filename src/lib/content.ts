import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';

export type Post = CollectionEntry<'post'>;

// 從 entry.id（如 "zh/ai/foo"）解析出 locale + category + slug
export function parseId(id: string): { locale: Locale; category: string; slug: string } {
  const [locale, category, ...rest] = id.split('/');
  return {
    locale: locale as Locale,
    category,
    slug: rest.join('/') || category,
  };
}

// 文章最終 slug（frontmatter 優先，否則用檔名）
export function postSlug(post: Post): string {
  return post.data.slug ?? parseId(post.id).slug;
}

// 文章的完整網址路徑（不含 site/base，由 Astro 處理）
export function postPath(post: Post): string {
  const { locale, category } = parseId(post.id);
  return `/${locale}/${category}/${postSlug(post)}`;
}

// 取得已發布文章（過濾 draft），依日期降冪
export async function getPosts(opts?: { locale?: Locale; category?: string }): Promise<Post[]> {
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all
    .filter((p) => (opts?.locale ? parseId(p.id).locale === opts.locale : true))
    .filter((p) => (opts?.category ? parseId(p.id).category === opts.category : true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 同 slug 的跨語系文章（供 LangSwitch 互鏈）
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const slug = postSlug(post);
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all.find((p) => p.id !== post.id && postSlug(p) === slug);
}

// 相關文章：同 category 或共享 tag，排除自己，取前 n 篇
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const { category } = parseId(post.id);
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      const sameCat = parseId(p.id).category === category;
      const sharedTags = p.data.tags.filter((t) => post.data.tags.includes(t)).length;
      return { p, score: sameCat ? sharedTags + 3 : sharedTags };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
