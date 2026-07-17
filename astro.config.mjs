import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 設定：
// - User page (https://<user>.github.io)：base 留 '/'
// - Project page (https://<user>.github.io/<repo>)：base 改 '/<repo>'
// 本專案為 project page：repo 名 Web
const GITHUB_PAGES_BASE = '/Web';

export default defineConfig({
  site: 'https://hujerry96.github.io/Web',
  base: GITHUB_PAGES_BASE,
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-TW', en: 'en-US' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
