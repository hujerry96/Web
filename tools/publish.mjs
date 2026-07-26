#!/usr/bin/env node
/**
 * usage: node tools/publish.mjs <category/slug>
 *   eg:  node tools/publish.mjs guides/my-new-article
 *        node tools/publish.mjs reviews/semiconductor-lab-notebook
 *
 * 作用：將文章 draft: true 改為 draft: false（發佈），並提示 git commit / push。
 * 排程發佈直接用 frontmatter 的 date 欄位控制即可，build 時自動過濾未來日期。
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');

// ---- helpers ----

function findArticleMd(id) {
  const [category, ...slugParts] = id.split('/');
  const slug = slugParts.join('/');
  const p1 = join(CONTENT_DIR, 'en', category, slug, 'index.md');
  if (existsSync(p1)) return p1;
  const p2 = join(CONTENT_DIR, 'en', category, `${slug}.md`);
  if (existsSync(p2)) return p2;
  return null;
}

function setDraftFalse(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const updated = content.replace(/^draft:\s*true$/m, 'draft: false');
  if (content === updated) {
    return false;
  }
  writeFileSync(filePath, updated, 'utf-8');
  return true;
}

// ---- main ----

const id = process.argv[2];
if (!id) {
  console.error('用法: node tools/publish.mjs <category/slug>');
  console.error('範例: node tools/publish.mjs guides/my-new-article');
  process.exit(1);
}

const mdFile = findArticleMd(id);
if (!mdFile) {
  console.error(`找不到文章：src/content/en/${id}/`);
  console.error('請確認路徑是否正確，或先用 mkdir 建立目錄。');
  process.exit(1);
}

const changed = setDraftFalse(mdFile);
if (changed) {
  console.log(`✅  ${id} → draft: true → draft: false`);
} else {
  console.log(`ℹ️   ${id} 已經是發布狀態（draft: false）`);
}

console.log('\n--- 下一步 ---');
console.log('npm run build              # 確認無誤');
console.log('git add -A');
console.log('git commit -m "publish: ' + id + '"');
console.log('git push origin main       # 觸發自動部署');
