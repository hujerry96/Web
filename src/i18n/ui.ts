import type { Locale } from './config';

// 介面字串（nav / footer / button）。新增語言只需擴充此物件。
export const ui = {
  zh: {
    'nav.home': '首頁',
    'nav.ai': 'AI 工具',
    'nav.shopee': 'Shopee',
    'nav.python': 'Python',
    'nav.reviews': '評測',
    'nav.blog': '部落格',
    'nav.books': '書籍',
    'nav.study': '學習指南',
    'nav.lab': '實驗筆記',
    'nav.printable': '可列印',
    'nav.engineering': '工程筆記',
    'nav.free': '免費資源',
    'nav.about': '關於我',
    'nav.contact': '聯絡我',
    'nav.resources': '免費資源',
    'home.tagline': 'AI 工具・Python 教學・科技評測・KDP 資源',
    'home.latest': '最新文章',
    'home.categories': '分類',
    'footer.rights': '保留所有權利',
    'footer.built': '由 Astro 建置',
    'article.toc': '目錄',
    'article.related': '相關文章',
    'article.published': '發布於',
    'article.updated': '更新於',
    'article.tags': '標籤',
    'article.by': '作者',
    'lang.switch': '切換語言',
    'rss.subscribe': '訂閱 RSS',
    'breadcrumb.home': '首頁',
  },
  en: {
    'nav.home': 'Home',
    'nav.ai': 'AI Tools',
    'nav.shopee': 'Shopee',
    'nav.python': 'Python',
    'nav.reviews': 'Reviews',
    'nav.blog': 'Blog',
    'nav.books': 'Books',
    'nav.study': 'Study Guides',
    'nav.lab': 'Lab Notebook',
    'nav.printable': 'Printables',
    'nav.engineering': 'Engineering Notes',
    'nav.free': 'Free Resources',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.resources': 'Free Resources',
    'home.tagline': 'AI Tools · Python Tutorials · Tech Reviews · KDP Resources',
    'home.latest': 'Latest Posts',
    'home.categories': 'Categories',
    'footer.rights': 'All rights reserved',
    'footer.built': 'Built with Astro',
    'article.toc': 'Contents',
    'article.related': 'Related Posts',
    'article.published': 'Published',
    'article.updated': 'Updated',
    'article.tags': 'Tags',
    'article.by': 'By',
    'lang.switch': 'Switch language',
    'rss.subscribe': 'Subscribe RSS',
    'breadcrumb.home': 'Home',
  },
} as const;

export type UiKey = keyof (typeof ui)['zh'];

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[DEFAULT_FALLBACK][key] ?? key;
  };
}

const DEFAULT_FALLBACK: Locale = 'zh';
