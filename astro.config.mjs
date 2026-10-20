import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

// sitemap lastmod：只給真實的修改日期，不用建置時間（Google 會忽略不準的 lastmod）
// - 文章：frontmatter 的 updated，沒有就用 date
// - 首頁與分類頁：該語系最新文章的日期
// - 其他頁面：原始檔最後一次 git commit 的日期
function readPostDates() {
  const dates = {};
  for (const locale of ['en', 'zh']) {
    const dir = `src/content/${locale}/guides`;
    if (!existsSync(dir)) continue;
    for (const slug of readdirSync(dir)) {
      const file = ['index.md', 'index.mdx'].map((f) => `${dir}/${slug}/${f}`).find(existsSync);
      if (!file) continue;
      const fm = readFileSync(file, 'utf-8').split(/^---\s*$/m)[1] || '';
      if (/^draft:\s*true/m.test(fm)) continue;
      const pick = (k) => (fm.match(new RegExp(`^${k}:\\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})`, 'm')) || [])[1];
      const date = pick('updated') || pick('date');
      const s = (fm.match(/^slug:\s*['"]?([^'"\r\n]+)/m) || [])[1] || slug;
      if (date) dates[`/${locale}/guides/${s.trim()}/`] = date;
    }
  }
  return dates;
}

function gitDate(file) {
  try {
    return execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf-8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

const POST_DATES = readPostDates();
const latestPost = (locale) =>
  Object.entries(POST_DATES).filter(([u]) => u.startsWith(`/${locale}/`)).map(([, d]) => d).sort().pop();
const PAGE_SOURCES = {
  'spectra-studio/': 'src/pages/[locale]/spectra-studio.astro',
  'tools/': 'src/pages/[locale]/tools.astro',
  'tools/crystallite-size-calculator/': 'src/pages/[locale]/tools/crystallite-size-calculator.astro',
  'about/': 'src/pages/[locale]/about.astro',
  'contact/': 'src/pages/[locale]/contact.astro',
};

function lastmodFor(pathname) {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (POST_DATES[p]) return POST_DATES[p];
  const m = p.match(/^\/(en|zh)\/(.*)$/);
  if (!m) return undefined;
  const [, locale, rest] = m;
  if (rest === '' || rest === 'guides/') return latestPost(locale);
  return PAGE_SOURCES[rest] ? gitDate(PAGE_SOURCES[rest]) : undefined;
}

// GitHub Pages 設定：
// - User page (https://<user>.github.io)：base 留 '/'
// - Project page (https://<user>.github.io/<repo>)：base 改 '/<repo>'
// 本專案為 project page：repo 名 Web
const GITHUB_PAGES_BASE = '/Web';

// 鏡像站（如 Cloudflare Pages）以環境變數覆寫：
//   ASTRO_BASE=none ASTRO_SITE=https://xxx.pages.dev ASTRO_OUT_DIR=dist-cf npm run build
//   注意：base 顯式設 '/' 會觸發 astro 6.4.8 的 i18n bug，故省略 base 用 'none'
const BASE = process.env.ASTRO_BASE === 'none' ? undefined : (process.env.ASTRO_BASE || GITHUB_PAGES_BASE);
export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://hulab.pages.dev',
  base: BASE,
  outDir: process.env.ASTRO_OUT_DIR || 'dist',
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      // 站內搜尋頁是 noindex 的薄內容；根目錄 / 會 301 到 /en/，兩者都不放進 sitemap
      filter: (page) => !/\/search\/?$/.test(page) && new URL(page).pathname.replace(/^\/Web/, '') !== '/',
      // GitHub Pages 鏡像（base=/Web）生成的 sitemap 會把 /Web/ 前綴帶進 URL，
      // 指向 CF 站 404 路徑；統一剝掉，讓兩站 sitemap 都指向 CF 主站。
      serialize: (item) => {
        // GH 鏡像（base=/Web）生成的 URL 形如 …/Web/en/；移除段但保留分隔斜線
        if (item.url.includes('/Web/')) item.url = item.url.replace('/Web/', '/');
        const lastmod = lastmodFor(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});