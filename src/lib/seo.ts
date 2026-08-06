import { SITE } from '../consts';
import { HREFLANG, LOCALES } from '../i18n/config';
import type { Post } from './content';
import { parseId, postPath, postSlug } from './content';

// 組出該頁的 hreflang 連結陣列
// 靜態頁（about/contact 等雙語皆有）：依當前路徑產生各語系版本的 hreflang 連結。
// 文章頁（中英各自獨立，無交叉翻譯）：僅標註自身語系，不做跨語系對應。
export function buildHreflang(current: Post | null, currentPath: string): { lang: string; href: string }[] {
  const site = SITE.url;
  if (current) {
    // 文章頁：各語系文章獨立，僅標註自身語系，無 alternative
    return [{ lang: HREFLANG[parseId(current.id).locale], href: `${site}${currentPath}` }];
  }
  // 靜態頁：雙語皆有對應頁面，產生跨語系連結
  // currentPath 已含語系前綴（如 /en/about/），需先移除再套用目標語系，避免產生 /en/en 這類錯誤網址
  const barePath = currentPath.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
  const links = LOCALES.map((loc) => ({
    lang: HREFLANG[loc],
    href: `${site}/${loc}${barePath}`,
  }));
  return [...links, { lang: 'x-default', href: `${site}/${LOCALES[0]}${barePath}` }];
}

// canonical URL：frontmatter 優先，否則由路徑自動產
export function buildCanonical(post: Post | null, path: string): string {
  if (post?.data.canonical) return post.data.canonical;
  return `${SITE.url}${path}`;
}

// Article JSON-LD
export function articleLd(post: Post, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    image: post.data.cover ? post.data.cover.src : undefined,
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    author: { '@type': 'Person', name: post.data.author },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.data.keywords.join(', '),
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
      item: `${siteUrl}${item.url}`,
    })),
  };
}

// WebSite JSON-LD（首頁用，含 SearchAction）
export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
  };
}

export { parseId, postPath, postSlug };
