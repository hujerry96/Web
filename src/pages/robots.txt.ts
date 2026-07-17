import type { APIRoute } from 'astro';
import { SITE, BASE } from '../consts';

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const base = SITE.url;
  const sitemapURL = new URL(`${BASE}/sitemap-index.xml`, base);
  return new Response(getRobotsTxt(sitemapURL));
};
