import { test } from 'node:test';
import assert from 'node:assert/strict';

function getContentZone(category) {
  if (category === 'select') return 'select';
  return 'lab';
}

test('getContentZone: select category returns select zone', () => {
  assert.equal(getContentZone('select'), 'select');
});

test('getContentZone: reviews category returns lab zone', () => {
  assert.equal(getContentZone('reviews'), 'lab');
});

test('getContentZone: guides category returns lab zone', () => {
  assert.equal(getContentZone('guides'), 'lab');
});

test('getContentZone: journal category returns lab zone', () => {
  assert.equal(getContentZone('journal'), 'lab');
});

test('getContentZone: unknown category returns lab zone', () => {
  assert.equal(getContentZone('unknown'), 'lab');
});

test('getContentZone: empty string returns lab zone', () => {
  assert.equal(getContentZone(''), 'lab');
});
