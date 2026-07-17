import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages è¨­å?ï¼?// - User page (https://<user>.github.io)ï¼šbase ??'/'
// - Project page (https://<user>.github.io/<repo>)ï¼šbase ??'/<repo>'
const GITHUB_PAGES_BASE = '/';

export default defineConfig({
  site: 'https://hujerry96.github.io',
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
