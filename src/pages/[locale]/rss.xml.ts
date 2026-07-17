import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts, postPath } from '../../lib/content';
import { SITE, type Locale } from '../../consts';

export function getStaticPaths() {
  return (['zh', 'en'] as Locale[]).map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const locale = params.locale as Locale;
  const posts = await getPosts({ locale });
  return rss({
    title: `${SITE.name} — ${locale === 'zh' ? '繁體中文' : 'English'}`,
    description: SITE.description,
    site: site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: new URL(postPath(post), SITE.url).href,
      categories: post.data.tags,
    })),
    customData: `<language>${locale === 'zh' ? 'zh-TW' : 'en-US'}</language>`,
  });
};
