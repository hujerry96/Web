#!/usr/bin/env node
/**
 * usage: node tools/publish.mjs <category/slug>
 *   eg:  node tools/publish.mjs guides/my-new-article
 *        node tools/publish.mjs reviews/semiconductor-lab-notebook
 *
 * 作用：將文章從草稿模式改為發布模式：
 *   1. 把 index.md 的 draft: true 改為 draft: false
 *   2. 加入 publish-schedule.json（若尚未在排程中）
 *   3. 提示 git commit / push
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const SCHEDULE_FILE = join(__dirname, 'publish-schedule.json');

// ---- helpers ----

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function loadSchedule() {
  return JSON.parse(readFileSync(SCHEDULE_FILE, 'utf-8'));
}

function saveSchedule(schedule) {
  writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 4) + '\n', 'utf-8');
}

function findArticleMd(id) {
  const [category, ...slugParts] = id.split('/');
  const slug = slugParts.join('/');
  // 優先找 index.md
  const p1 = join(CONTENT_DIR, 'en', category, slug, 'index.md');
  if (existsSync(p1)) return p1;
  // fallback：舊版單檔
  const p2 = join(CONTENT_DIR, 'en', category, `${slug}.md`);
  if (existsSync(p2)) return p2;
  return null;
}

function setDraftFalse(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const updated = content.replace(/^draft:\s*true$/m, 'draft: false');
  if (content === updated) {
    return false; // already published
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

// 1. 找文章
const mdFile = findArticleMd(id);
if (!mdFile) {
  console.error(`找不到文章：src/content/en/${id}/`);
  console.error('請確認路徑是否正確，或先用 mkdir 建立目錄。');
  process.exit(1);
}

// 2. 改 draft
const changed = setDraftFalse(mdFile);
if (changed) {
  console.log(`✅  ${id} → draft: true → draft: false`);
} else {
  console.log(`ℹ️   ${id} 已經是發布狀態（draft: false）`);
}

// 3. 加入排程
const schedule = loadSchedule();
const exists = schedule.schedule.some((e) => e.id === id);
if (!exists) {
  const today = todayStr();
  schedule.schedule.push({ id, publishDate: today });
  // 按日期排序
  schedule.schedule.sort((a, b) => a.publishDate.localeCompare(b.publishDate));
  saveSchedule(schedule);
  console.log(`📅  已加入排程（${today}）`);
} else {
  console.log(`ℹ️  已在排程中`);
}

// 4. 提示下一步
console.log('\n--- 下一步 ---');
console.log('npm run build              # 確認無誤');
console.log('git add -A');
console.log('git commit -m "publish: ' + id + '"');
console.log('git push origin main       # 觸發自動部署');
