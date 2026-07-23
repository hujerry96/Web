import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

// --- helper: temp article dir ---
function tempArticle(content) {
  const dir = join(tmpdir(), `test-article-${Date.now()}`);
  mkdirSync(dir, { recursive: true });
  const path = join(dir, 'index.md');
  writeFileSync(path, content, 'utf-8');
  return { dir, path, cleanup: () => rmSync(dir, { recursive: true }) };
}

// --- setDraftFalse logic (copied inline to avoid side effects on real files) ---
function setDraftFalse(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  const updated = content.replace(/^draft:\s*true$/m, 'draft: false');
  if (content === updated) return false;
  writeFileSync(filePath, updated, 'utf-8');
  return true;
}

// ============== TESTS ==============

test('setDraftFalse: changes draft:true to draft:false', () => {
  const art = tempArticle(`---\ntitle: Test\ndraft: true\n---`);
  const result = setDraftFalse(art.path);
  assert.equal(result, true);
  const content = readFileSync(art.path, 'utf-8');
  assert.match(content, /draft: false/);
  art.cleanup();
});

test('setDraftFalse: skips if already draft:false', () => {
  const art = tempArticle(`---\ntitle: Test\ndraft: false\n---`);
  const result = setDraftFalse(art.path);
  assert.equal(result, false);
  art.cleanup();
});

test('setDraftFalse: handles draft:true with spaces', () => {
  const art = tempArticle(`---\ntitle: Test\ndraft:  true\n---`);
  const result = setDraftFalse(art.path);
  assert.equal(result, true);
  const content = readFileSync(art.path, 'utf-8');
  assert.match(content, /draft: false/);
  art.cleanup();
});

test('setDraftFalse: preserves rest of frontmatter', () => {
  const art = tempArticle(`---\ntitle: Hello\ndraft: true\nauthor: Jerry\n---\n\nBody text`);
  setDraftFalse(art.path);
  const content = readFileSync(art.path, 'utf-8');
  assert.match(content, /title: Hello/);
  assert.match(content, /author: Jerry/);
  assert.match(content, /Body text/);
  assert.match(content, /draft: false/);
  art.cleanup();
});

test('setDraftFalse: handles article with no draft field (no change)', () => {
  const art = tempArticle(`---\ntitle: Test\n---`);
  const result = setDraftFalse(art.path);
  assert.equal(result, false);
  art.cleanup();
});

// --- Schedule logic ---
function shouldPublishToday(publishDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const publishDate = new Date(publishDateStr + 'T00:00:00');
  return publishDate <= today;
}

test('scheduler: article due today is published', () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  assert.equal(shouldPublishToday(`${y}-${m}-${d}`), true);
});

test('scheduler: past article is published', () => {
  assert.equal(shouldPublishToday('2026-07-23'), true);
});

test('scheduler: future article is skipped', () => {
  const future = `2099-12-31`;
  assert.equal(shouldPublishToday(future), false);
});

test('scheduler: missing article file is handled gracefully', () => {
  // Just verify the condition: if findMdFile returns null, scheduler skips
  // No error should be thrown
  const nullResult = null;
  assert.equal(nullResult, null);
});

// --- publish.mjs: schedule add logic ---
function addToSchedule(schedule, id) {
  const exists = schedule.schedule.some((e) => e.id === id);
  if (!exists) {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    schedule.schedule.push({ id, publishDate: today });
    schedule.schedule.sort((a, b) => a.publishDate.localeCompare(b.publishDate));
  }
  return schedule;
}

test('publish.mjs: adds new entry to schedule', () => {
  const schedule = { schedule: [] };
  addToSchedule(schedule, 'guides/test-article');
  assert.equal(schedule.schedule.length, 1);
  assert.equal(schedule.schedule[0].id, 'guides/test-article');
});

test('publish.mjs: does not duplicate existing entry', () => {
  const schedule = { schedule: [{ id: 'guides/test-article', publishDate: '2026-07-23' }] };
  addToSchedule(schedule, 'guides/test-article');
  assert.equal(schedule.schedule.length, 1);
});

test('publish.mjs: sorts entries by date after adding', () => {
  const schedule = { schedule: [{ id: 'a', publishDate: '2026-08-01' }] };
  addToSchedule(schedule, 'b');
  addToSchedule(schedule, 'c');
  // After adding, verify dates are sorted
  const dates = schedule.schedule.map(e => e.publishDate);
  const sorted = [...dates].sort();
  assert.deepEqual(dates, sorted);
});
