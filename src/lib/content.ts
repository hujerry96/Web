import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { withBase } from '../consts';

export type Post = CollectionEntry<'post'>;

// ponytail: 中英文混排粗略估算，精確計算需要分段邏輯
export function readingTime(body: string, locale: Locale): string {
  const words = locale === 'zh'
    ? body.replace(/\s/g, '').length
    : body.split(/\s+/).filter(Boolean).length;
  const speed = locale === 'zh' ? 400 : 200;
  const min = Math.max(1, Math.ceil(words / speed));
  return locale === 'zh' ? `${min} 分鐘閱讀` : `${min} min read`;
}

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

// 文章的完整網址路徑（含 base 前綴）
export function postPath(post: Post): string {
  const { locale, category } = parseId(post.id);
  return withBase(`/${locale}/${category}/${postSlug(post)}`);
}

// 取得已發布文章（過濾 draft），依日期降冪
export async function getPosts(opts?: { locale?: Locale; category?: string }): Promise<Post[]> {
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all
    .filter((p) => (opts?.locale ? parseId(p.id).locale === opts.locale : true))
    .filter((p) => (opts?.category ? parseId(p.id).category === opts.category : true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 從 markdown 正文解析 H2/H3 標題，供側邊 TOC 使用
// id 必須與 Astro 渲染出的 <h2 id="..."> 一致（github-slugger），才能作錨點
import GithubSlugger from 'github-slugger';
export function extractHeadings(body: string): { text: string; id: string; level: number }[] {
  const out: { text: string; id: string; level: number }[] = [];
  const slugger = new GithubSlugger();
  const lines = body.split('\n');
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/[#*_`]/g, '').trim();
    if (!text) continue;
    const id = slugger.slug(text);
    out.push({ text, id, level });
  }
  return out;
}
export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const { locale, category } = parseId(post.id);
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all
    .filter((p) => p.id !== post.id)
    .filter((p) => parseId(p.id).locale === locale)
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
