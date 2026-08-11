import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

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
      // GitHub Pages 鏡像（base=/Web）生成的 sitemap 會把 /Web/ 前綴帶進 URL，
      // 指向 CF 站 404 路徑；統一剝掉，讓兩站 sitemap 都指向 CF 主站。
      serialize: (item) => {
        // GH 鏡像（base=/Web）生成的 URL 形如 …/Web/en/；移除段但保留分隔斜線
        if (item.url.includes('/Web/')) item.url = item.url.replace('/Web/', '/');
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});