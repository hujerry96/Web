// ?®Á?Â∏∏Êï∏ÔºöÊîπ?ôË£°?≥ÂèØ?¥Êñ∞?ÅÁ?/‰ΩúËÄ?Á§æÁæ§Ë≥áË?ÔºàDRY ?Æ‰?‰æÜÊ?Ôº?export const SITE = {
  name: 'Jerry Hu',
  title: 'Jerry Hu ??AI Â∑•ÂÖ∑?ªPython ?ôÂ≠∏?ªÁ??ÄË©ïÊ∏¨',
  description:
    'AI Â∑•ÂÖ∑ÂØ¶Ê∏¨?ÅPython ?ôÂ≠∏?ÅÁ??Ä?¢Â?Ë©ïÊ∏¨??KDP ?™Âá∫?àË?Ê∫ê„ÄÇ‰∏≠?áË??±Ê??ôË??ßÂÆπÁ´ô„Ä?,
  // Ê≥®Ê?ÔºöÈ???astro.config.mjs ??site ‰∏Ä?¥Ô???baseÔº?  url: 'https://hujerry96.github.io',
  author: 'Jerry Hu',
  authorZh: '?°Êù∞??,
  locale: 'zh-TW',
  ogLocale: 'zh_TW',
  twitter: '@jerryhu',
  email: 'hello@example.com',
  // ?ÜÈ?ÁµêÊ?Ôºàlocale -> ?ÜÈ? key -> È°ØÁ§∫?çÔ?
  categories: {
    zh: {
      ai: 'AI Â∑•ÂÖ∑',
      shopee: 'Shopee ?ÜÊΩ§',
      python: 'Python ?ôÂ≠∏',
      reviews: '?¢Â?Ë©ïÊ∏¨',
      blog: '?®ËêΩ??,
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
