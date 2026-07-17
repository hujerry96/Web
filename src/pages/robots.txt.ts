import type { APIRoute } from 'astro';
import { SITE } from '../consts';

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site ?? SITE.url);
  return new Response(getRobotsTxt(sitemapURL));
};
