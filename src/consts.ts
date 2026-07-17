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
  name: 'Jerry Hu',
  title: 'Jerry Hu — AI 工具・Python 教學・科技評測',
  description:
    'AI 工具實測、Python 教學、科技產品評測與 KDP 自出版資源。中文與英文雙語內容站。',
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
} as const;

export type Locale = keyof typeof SITE.categories;
export type CategoryKey = keyof (typeof SITE.categories)[Locale];
