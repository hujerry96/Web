import { SITE } from '../consts';
import { HREFLANG, LOCALES } from '../i18n/config';
import type { Post } from './content';
import { parseId, postPath, postSlug } from './content';

// 組出該頁的 hreflang 連結陣列（含 x-default）
// 文章頁：依 translation 互鏈；其他頁：同路徑跨語系
export function buildHreflang(current: Post | null, currentPath: string): { lang: string; href: string }[] {
  const site = SITE.url;
  if (current) {
    // 文章：用 slug 找對應語系路徑
    const { slug } = parseId(current.id);
    const links = LOCALES.map((loc) => ({
      lang: HREFLANG[loc],
      href: `${site}/${loc}/${parseId(current.id).category}/${slug}`,
    }));
    return [...links, { lang: 'x-default', href: `${site}/${LOCALES[0]}/${parseId(current.id).category}/${slug}` }];
  }
  const links = LOCALES.map((loc) => ({
    lang: HREFLANG[loc],
    href: `${site}/${loc}${currentPath}`,
  }));
  return [...links, { lang: 'x-default', href: `${site}/${LOCALES[0]}${currentPath}` }];
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
    image: post.data.cover ? new URL(post.data.cover, SITE.url).href : undefined,
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
