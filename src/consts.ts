// 全站常數：改這裡即可更新品牌/作者/社群資訊（DRY 單一來源）
// 網站 base 路徑（GitHub Pages project page 為 "/<repo>"，user page 為 "/"）
// 與 astro.config.mjs 的 base 保持一致
export const BASE = '/Web';

// 給內部路徑補上 base 前綴（project page = /Web）
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return (BASE + path).replace(/\/{2,}/g, '/');
}

export const SITE = {
  name: 'Hu Lab',
  // 依語系提供 SEO 標題/描述，避免英文頁出現中文
  meta: {
    zh: {
      title: 'Hu Lab — AI 工具・Python 教學・科技評測',
      description:
        'AI 工具實測、Python 教學、科技產品評測與 KDP 自出版資源。中文與英文雙語內容站。',
    },
    en: {
      title: 'Hu Lab — AI Tools, Python Tutorials & Tech Reviews',
      description:
        'Hands-on AI tool reviews, Python tutorials, tech product reviews, and KDP self-publishing resources. A bilingual content site in Traditional Chinese and English.',
    },
  } as Record<'zh' | 'en', { title: string; description: string }>,
  // 注意：需與 astro.config.mjs 的 site 一致（含 base）
  url: 'https://hujerry96.github.io/Web',
  author: 'Jerry Hu',
  authorZh: '胡杰瑞',
  locale: 'zh-TW',
  ogLocale: 'zh_TW',
  twitter: '@jerryhu',
  email: 'hello@example.com',
  // 分類結構（locale -> 分類 key -> 顯示名）
  categories: {
    zh: {
      ai: 'AI 工具',
      shopee: 'Shopee 分潤',
      python: 'Python 教學',
      reviews: '產品評測',
      blog: '部落格',
    },
    en: {
      books: 'Books',
      study: 'Study Guides',
      blog: 'Blog',
      lab: 'Lab Notebook',
      printable: 'Printables',
      engineering: 'Engineering Notes',
    },
  },
  // 雙語分類對齊（保留現狀結構，確保每個 zh 分類在 en 有對應入口）
  categoryPairs: {
    ai: 'books',
    shopee: 'printable',
    python: 'study',
    reviews: 'engineering',
    blog: 'lab',
  } as Record<string, string>,
  // 作者/社群資料（最後由站長自行填入；空值時元件隱藏對應入口）
  avatar: '',
  social: {
    github: '',
    x: '',
    shopee: '',
    amazon: '',
  },
} as const;

export type Locale = keyof typeof SITE.categories;
export type CategoryKey = keyof (typeof SITE.categories)[Locale];
