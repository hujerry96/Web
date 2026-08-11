// 全站常數：改這裡即可更新品牌/作者/社群資訊（DRY 單一來源）
// 網站 base 路徑（GitHub Pages project page 為 "/<repo>"，user page 為 "/"）
// 與 astro.config.mjs 的 base 保持一致（鏡像站以 ASTRO_BASE=none 省略前綴）
export const BASE = process.env.ASTRO_BASE === 'none' ? '' : (process.env.ASTRO_BASE || '/Web');

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
      title: 'Hu Lab',
      description:
        '材料科學筆記與免費分析工具：光譜繪圖與 XRD 分析軟體 Spectra Studio、SEM 粒徑分析、論文格式工具，以及能源材料、半導體等領域的技術指南。',
    },
    en: {
      title: 'Hu Lab',
      description:
        'Materials science notes and free analysis tools — Spectra Studio for XRD & spectral plotting, SEM particle analysis, thesis formatting, plus technical guides on energy materials and semiconductors.',
    },
  } as Record<'zh' | 'en', { title: string; description: string }>,
  // 注意：需與 astro.config.mjs 的 site 一致（含 base）；正式站為 hulab.pages.dev，GitHub Pages 為備援（以 ASTRO_SITE 覆寫）
  url: process.env.ASTRO_SITE || 'https://hulab.pages.dev',
  author: 'Jerry Hu',
  locale: 'en-US',
  ogLocale: 'en_US',
  twitter: '@jerryhu',
  email: 'hello@example.com',
  // 分類結構（locale -> 分類 key -> 顯示名）；中英文各自獨立、中性命名
  categories: {
    zh: {
      guides: '指南',
      journal: '手記',
    },
    en: {
      reviews: 'Reviews',
      guides: 'Guides',
      journal: 'Journal',
    },
  },
  // 作者/社群資料（最後由站長自行填入；空值時元件隱藏對應入口）
  avatar: '',
  social: {
    github: '',
    x: '',
  },
} as const;

export type Locale = keyof typeof SITE.categories;
export type CategoryKey = keyof (typeof SITE.categories)[Locale];
