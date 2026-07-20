import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const SITE = 'https://hujerry96.github.io/Web';
const DIST = join(import.meta.dirname, '..', 'dist');

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...walk(p));
    } else if (e.name === 'index.html') {
      files.push(p);
    }
  }
  return files;
}

const pages = walk(DIST).filter(p => !p.includes('/404/') && !p.endsWith('/404/index.html'));

const urls = pages.map(p => {
  const rel = p.slice(DIST.length).replace(/\\/g, '/').replace('/index.html', '');
  return `  <url><loc>${SITE}${rel}/</loc></url>`;
}).sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
