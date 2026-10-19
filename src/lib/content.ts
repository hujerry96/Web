import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { withBase } from '../consts';

export type Post = CollectionEntry<'post'>;

// ponytail: 中英文混排粗略估算，精確計算需要分段邏輯
export function readingTime(body: string, locale: Locale): string {
  // Deep-dive sections inside native <details> are optional on long conversion
  // pages, so the headline estimate should describe the visible reading path.
  const visibleBody = body
    .replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi, '')
    .replace(/^import\s.+$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[`*_>#|]/g, ' ');
  const words = locale === 'zh'
    ? visibleBody.replace(/\s/g, '').length
    : visibleBody.split(/\s+/).filter(Boolean).length;
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
  return withBase(`/${locale}/${category}/${postSlug(post)}/`);
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
  // Normalise Windows \r\n so $ anchor works correctly
  const lines = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  let inFence = false;
  let inDetails = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (/^\s*<details\b/i.test(line)) { inDetails = true; continue; }
    if (/^\s*<\/details>/i.test(line)) { inDetails = false; continue; }
    if (inDetails) continue;
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
// 從「常見問題 / FAQ」H2 段落擷取 H3 問答，供 FAQPage 結構化資料使用
const FAQ_HEADING = /^(常見問題|FAQ|Frequently asked questions|Common questions)/i;
export function extractFaq(body: string): { question: string; answer: string }[] {
  const lines = body.replace(/\r\n?/g, '\n').split('\n');
  const out: { question: string; answer: string }[] = [];
  let inFaq = false;
  let current: { question: string; answer: string[] } | null = null;
  const flush = () => {
    if (current && current.answer.length) {
      const answer = current.answer.join(' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[*_`>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (answer) out.push({ question: current.question, answer });
    }
    current = null;
  };
  for (const line of lines) {
    const h2 = /^##\s+(.*)$/.exec(line);
    if (h2) {
      flush();
      inFaq = FAQ_HEADING.test(h2[1].replace(/[#*_`]/g, '').trim());
      continue;
    }
    if (!inFaq) continue;
    const h3 = /^###\s+(.*)$/.exec(line);
    if (h3) {
      flush();
      current = { question: h3[1].replace(/[#*_`]/g, '').trim(), answer: [] };
      continue;
    }
    if (current && line.trim() && !/^\s*</.test(line)) current.answer.push(line.trim());
  }
  flush();
  return out;
}

// 找出另一語系的對應文章（同 slug，或 -en 後綴配對），供 hreflang 使用
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const { locale, category } = parseId(post.id);
  const slug = postSlug(post);
  const base = slug.replace(/-en$/, '');
  const all = await getCollection('post', ({ data }) => !data.draft);
  return all.find((p) => {
    const other = parseId(p.id);
    if (other.locale === locale || other.category !== category) return false;
    const otherSlug = postSlug(p);
    return otherSlug === slug || otherSlug.replace(/-en$/, '') === base;
  });
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
