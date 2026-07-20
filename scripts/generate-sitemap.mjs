import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const SITE = 'https://hujerry96.github.io/Web';
const DIST = join(import.meta.dirname, '..', 'dist');

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else if (e.name === 'index.html') files.push(p);
  }
  return files;
}

const pages = walk(DIST).filter(p => !p.includes('/404/') && !p.endsWith('/404/index.html'));

const urls = pages.map(p => {
  const rel = p.slice(DIST.length).replace(/\\/g, '/').replace('/index.html', '');
  return `${SITE}${rel}/`;
}).sort();

// text sitemap (Google's simplest format, no XML issues)
writeFileSync(join(DIST, 'sitemap.txt'), urls.join('\n') + '\n', 'utf-8');
console.log(`Generated sitemap.txt with ${urls.length} URLs`);

// also keep sitemap.xml for robots.txt compatibility
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
