import { SITE } from '../consts';
import { HREFLANG, LOCALES } from '../i18n/config';
import type { Post } from './content';
import { parseId, postPath, postSlug } from './content';

// 正式站（Cloudflare Pages）會把 /path 308 轉到 /path/；canonical、hreflang、og:url 一律用結尾斜線版本
export function withSlash(path: string): string {
  if (/\.[a-z0-9]+$/i.test(path)) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

// 組出該頁的 hreflang 連結陣列
// 靜態頁（about/contact 等雙語皆有）：依當前路徑產生各語系版本的 hreflang 連結。
// 文章頁（中英各自獨立，無交叉翻譯）：僅標註自身語系，不做跨語系對應。
export function buildHreflang(
  current: Post | null,
  currentPath: string,
  alternates: { locale: keyof typeof HREFLANG; path: string }[] = [],
): { lang: string; href: string }[] {
  const site = SITE.url;
  if (current) {
    // 文章頁：有對應翻譯時互相標註，否則僅標註自身語系
    const self = { lang: HREFLANG[parseId(current.id).locale], href: `${site}${withSlash(currentPath)}` };
    if (alternates.length === 0) return [self];
    const links = [self, ...alternates.map((a) => ({ lang: HREFLANG[a.locale], href: `${site}${withSlash(a.path)}` }))];
    const en = links.find((l) => l.lang === HREFLANG.en);
    return en ? [...links, { lang: 'x-default', href: en.href }] : links;
  }
  // 靜態頁：雙語皆有對應頁面，產生跨語系連結
  // currentPath 已含語系前綴（如 /en/about/），需先移除再套用目標語系，避免產生 /en/en 這類錯誤網址
  const barePath = currentPath.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
  const links = LOCALES.map((loc) => ({
    lang: HREFLANG[loc],
    href: `${site}${withSlash(`/${loc}${barePath}`)}`,
  }));
  return [...links, { lang: 'x-default', href: `${site}${withSlash(`/${LOCALES[0]}${barePath}`)}` }];
}

// canonical URL：frontmatter 優先，否則由路徑自動產
export function buildCanonical(post: Post | null, path: string): string {
  if (post?.data.canonical) return post.data.canonical;
  return `${SITE.url}${withSlash(path)}`;
}

// 站內相對資源（如 /_astro/cover.png）轉成絕對網址，供 OG 與 JSON-LD 使用
export function absoluteUrl(src: string): string {
  return /^https?:\/\//.test(src) ? src : `${SITE.url}${src.startsWith('/') ? '' : '/'}${src}`;
}

const publisher = () => ({
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.svg` },
});

// Article JSON-LD
export function articleLd(post: Post, url: string) {
  const { locale } = parseId(post.id);
  const keywords = post.data.keywords.length > 0 ? post.data.keywords : post.data.tags;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.data.title,
    description: post.data.description,
    image: post.data.cover ? absoluteUrl(post.data.cover.src) : `${SITE.url}/images/og-default.png`,
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    inLanguage: HREFLANG[locale],
    author: { '@type': 'Person', name: post.data.author, url: `${SITE.url}/${locale}/about` },
    publisher: publisher(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: keywords.join(', '),
    articleSection: post.data.category,
  };
}

// FAQPage JSON-LD（由文章內「常見問題」段落自動產生）
export function faqLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

// BreadcrumbList JSON-LD
export function breadcrumbLd(trail: { name: string; url: string }[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${withSlash(item.url)}`,
    })),
  };
}

// WebSite JSON-LD（首頁用，含 SearchAction）
export function websiteLd(locale: keyof typeof HREFLANG = 'en') {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: `${SITE.url}/${locale}/`,
      inLanguage: HREFLANG[locale],
      description: SITE.meta[locale].description,
      publisher: publisher(),
    },
    { '@context': 'https://schema.org', ...publisher(), sameAs: [SITE.social.github].filter(Boolean) },
  ];
}

export { parseId, postPath, postSlug };
