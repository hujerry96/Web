import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCHEDULE_FILE = join(__dirname, 'publish-schedule.json');
const CONTENT_DIR = join(ROOT, 'src', 'content', 'en');

function loadSchedule() {
  const raw = readFileSync(SCHEDULE_FILE, 'utf-8');
  return JSON.parse(raw).schedule;
}

function findMdFile(category, slug) {
  const dir = join(CONTENT_DIR, category, slug);
  if (existsSync(join(dir, 'index.md'))) return join(dir, 'index.md');
  if (existsSync(join(dir, `${slug}.md`))) return join(dir, `${slug}.md`);
  return null;
}

function setDraftFalse(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const updated = content.replace(/^draft:\s*true$/m, 'draft: false');
  if (content === updated) {
    console.log(`  Already published, skipped.`);
    return false;
  }
  writeFileSync(filePath, updated, 'utf-8');
  console.log(`  Updated draft: true -> false`);
  return true;
}

function run() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const schedule = loadSchedule();
  let published = 0;

  for (const entry of schedule) {
    const publishDate = new Date(entry.publishDate + 'T00:00:00');
    if (publishDate > today) continue;

    const [category, ...slugParts] = entry.id.split('/');
    const slug = slugParts.join('/');
    const mdFile = findMdFile(category, slug);

    if (!mdFile) {
      console.log(`[${entry.id}] File not found, skipping.`);
      continue;
    }

    console.log(`[${entry.id}] Publishing...`);
    if (setDraftFalse(mdFile)) published++;
  }

  console.log(`\nDone. ${published} article(s) published today.`);
}

run();
