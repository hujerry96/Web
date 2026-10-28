// 全站常數：改這裡即可更新品牌/作者/社群資訊（DRY 單一來源）
// 網站 base 路徑（GitHub Pages project page 為 "/<repo>"，user page 為 "/"）
// 與 astro.config.mjs 的 base 保持一致（鏡像站以 ASTRO_BASE=none 省略前綴）
export const BASE = process.env.ASTRO_BASE === 'none' ? '' : (process.env.ASTRO_BASE || '/Web');

// 給內部路徑補上 base 前綴（project page = /Web）。
// 頁面路徑（沒有副檔名）一律補上結尾斜線：/en/about → /en/about/。
// 否則 Cloudflare 會 308 轉址，Google 會把這些站內連結列為「頁面會重新導向」。
// 檔案路徑（/favicon.svg、/search-index.json）不變；#錨點與 ?查詢字串保留在斜線之後。
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const [, pathname, suffix = ''] = path.match(/^([^#?]*)(.*)$/) as RegExpMatchArray;
  let out = (BASE + pathname).replace(/\/{2,}/g, '/');
  if (!/\.[a-z0-9]+$/i.test(out) && !out.endsWith('/')) out += '/';
  return out + suffix;
}

export const SITE = {
  name: 'Hu Lab',
  // 依語系提供 SEO 標題/描述，避免英文頁出現中文
  meta: {
    zh: {
      title: 'Hu Lab｜XRD、FTIR、Raman、UV-Vis 光譜分析與論文繪圖工具',
      description:
        '免費 Windows 光譜分析軟體 Spectra Studio 與實用教學：XRD 峰擬合、晶粒尺寸、FTIR／Raman 疊圖、UV-Vis Tauc 能隙，輸出可投稿的期刊圖，數據不上傳。',
    },
    en: {
      title: 'Hu Lab — XRD & Spectroscopy Analysis Software and Guides',
      description:
        'Free Windows software and practical guides for XRD, FTIR, Raman and UV-Vis: peak fitting, crystallite size, Tauc band gap and journal-ready figures — data stays local.',
    },
  } as Record<'zh' | 'en', { title: string; description: string }>,
  // 注意：需與 astro.config.mjs 的 site 一致（含 base）；正式站為 hulab.pages.dev，GitHub Pages 為備援（以 ASTRO_SITE 覆寫）
  url: process.env.ASTRO_SITE || 'https://hulab.pages.dev',
  author: 'Jerry Hu',
  locale: 'en-US',
  ogLocale: 'en_US',
  twitter: '@jerryhu',
  email: '',
  // 分類結構（locale -> 分類 key -> 顯示名）；中英文各自獨立、中性命名
  categories: {
    zh: {
      guides: '分析教學',
    },
    en: {
      guides: 'Guides',
    },
  },
  // 作者/社群資料（最後由站長自行填入；空值時元件隱藏對應入口）
  avatar: '',
  social: {
    github: 'https://github.com/hujerry96',
    x: '',
  },
} as const;

export type Locale = keyof typeof SITE.categories;
export type CategoryKey = keyof (typeof SITE.categories)[Locale];
