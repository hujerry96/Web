#!/usr/bin/env node
/**
 * AI Content Workflow — 產出草稿包（不直接寫入 src/content）
 *
 * 用法：
 *   node scripts/ai-generate.mjs "New Balance 1080 v15" --locale zh --category reviews
 *
 * 產出到 drafts/<slug>/：
 *   - prompt-article.md   交給 AI 的寫作 prompt
 *   - prompt-meta.md      meta / FAQ / keywords prompt
 *   - prompt-social.md    Threads / Twitter / OG 文字稿 prompt
 *   - meta.json           預填 frontmatter 骨架（待 AI 補完）
 *
 * 你將 AI 回傳內容貼回後，確認無誤再移入 src/content/<locale>/<category>/。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { slugify } from './slug.mjs';

const args = process.argv.slice(2);
const topic = args[0];
if (!topic) {
  console.error('用法: node scripts/ai-generate.mjs "<主題>" --locale zh|en --category <分類>');
  process.exit(1);
}
const getFlag = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};
const locale = getFlag('--locale') ?? 'zh';
const category = getFlag('--category') ?? (locale === 'zh' ? 'blog' : 'blog');
const slug = slugify(topic);
const dir = `drafts/${slug}`;
mkdirSync(dir, { recursive: true });

const langLabel = locale === 'zh' ? '繁體中文' : 'English';
const today = new Date().toISOString().slice(0, 10);

const articlePrompt = `# 文章寫作 Prompt（${langLabel}）

主題：${topic}
分類：${category}
語言：${langLabel}
目標：SEO 友善、原創經驗、導流價值

請產出一篇 1200–1800 字文章，包含：
- 吸引點擊的 H1 標題
- 簡短導言（問題/痛點）
- 3–5 個 H2 小節（含比較、優缺點、適合誰）
- 結論與行動呼籲（如適用，附 Shopee/Amazon 連結位）
- 自然內部連結建議（其他相關文章主題）
`;

const metaPrompt = `# SEO Meta Prompt（${langLabel}）

主題：${topic}
請產出 JSON：
{
  "title": "≤60 字，含關鍵字",
  "description": "≤160 字 meta description",
  "keywords": ["8-12 個關鍵字"],
  "slug": "${slug}",
  "tags": ["3-6 個標籤"],
  "faq": [{"q": "...", "a": "..."}]  // 5-8 組，供 JSON-LD FAQ
}
`;

const socialPrompt = `# 社群貼文 Prompt

主題：${topic}
請產出：
1. Threads 貼文（繁中，含 3-5 hashtag + 連結位）
2. Twitter 貼文（英文，含 3-5 hashtag + 連結位）
3. OG 圖片文字稿：主標 + 副標（供 Canva 手動製圖）
4. 建議圖片檔名：如 ${slug}-01.jpg
5. 建議 Alt Text（每張圖一句描述性文字）
`;

const metaJson = {
  title: '', // TODO: AI 補
  slug,
  description: '', // TODO: AI 補
  keywords: [], // TODO: AI 補
  author: 'Jerry Hu',
  date: today,
  cover: `/images/${locale}/${category}/${slug}-cover.jpg`,
  category,
  tags: [], // TODO: AI 補
  canonical: `https://<user>.github.io/${locale}/${category}/${slug}`,
  locale,
  draft: true,
  faq: [], // TODO: AI 補（供 JSON-LD）
};

writeFileSync(`${dir}/prompt-article.md`, articlePrompt);
writeFileSync(`${dir}/prompt-meta.md`, metaPrompt);
writeFileSync(`${dir}/prompt-social.md`, socialPrompt);
writeFileSync(`${dir}/meta.json`, JSON.stringify(metaJson, null, 2));

console.log(`✅ 草稿包已產生： ${dir}/`);
console.log('   交給 AI 完成三個 prompt，再將結果貼回 meta.json 與新 .md，確認後移入 src/content/。');
