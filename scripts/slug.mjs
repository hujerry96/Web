// 簡易 slug 轉換（零依賴，支援中英文）
export function slugify(input) {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '') // 保留字母數字與連字號（含中文）
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s || 'post';
}
