# 作者操作手冊 (Author Guide)

本手冊說明如何在本網站新增文章、使用 AI 工作流、本地預覽與部署。網站技術棧：Astro 6 + TypeScript + GitHub Pages，雙語（繁中 `zh` / 英文 `en`）。

---

## 1. 專案結構速覽

```
src/
  content/            ← 你的文章都在這（Markdown，即 CMS）
    zh/<分類>/*.md
    en/<分類>/*.md
  consts.ts           ← 站名/作者/網址/分類名（改品牌由此處）
  content.config.ts   ← 文章 frontmatter 欄位定義（改欄位由此處）
  i18n/               ← 介面字串（nav/footer）
  lib/                ← SEO / 內容 / i18n 邏輯（一般不需動）
  components/         ← 顯示元件（Header/Footer/卡片/SEO）
  layouts/            ← 頁面骨架
  pages/              ← 路由（一般不需動）
public/images/        ← 封面圖、OG 圖
scripts/              ← AI 工作流腳本
tools/ai-content/     ← 文章模板
```

---

## 2. 寫一篇新文章（SOP）

### 方法 A：手動寫
1. 複製 `tools/ai-content/TEMPLATE.md` 的 frontmatter
2. 在對應資料夾新建 `<slug>.md`：
   - 中文：`zh/shopee`、`zh/ai`、`zh/python`、`zh/reviews`、`zh/blog`
   - 英文：`en/books`、`en/study`、`en/blog`、`en/lab`、`en/printable`、`en/engineering`
3. 填寫 frontmatter（見第 3 節），寫 Markdown 正文
4. 封面圖放 `public/images/<語系>/<分類>/<slug>-cover.png`
5. `npm run build` 檢查欄位是否齊全（缺欄會報錯）

### 方法 B：AI 工作流（推薦）
```bash
npm run ai -- "New Balance 1080 v15" --locale zh --category reviews
```
產出 `drafts/<slug>/`：
- `prompt-article.md` — 交給 AI 寫文章
- `prompt-meta.md` — 交給 AI 產 title/desc/keywords/FAQ
- `prompt-social.md` — 交給 AI 產 Threads/Twitter/OG 文字稿
- `meta.json` — frontmatter 骨架

把 AI 回傳貼回、確認無誤後，把 `.md` 移入 `src/content/<語系>/<分類>/`。

---

## 3. Frontmatter 欄位說明

| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | 含關鍵字，≤60 字（含冒號要用單引號包住） |
| `slug` | ⚙ | 留空則用檔名；URL 末段 |
| `description` | ✅ | meta description，≤160 字 |
| `keywords` | ✅ | 陣列，8–12 個 |
| `author` | ⚙ | 預設 Jerry Hu |
| `date` | ✅ | `YYYY-MM-DD` |
| `updated` | ⚙ | 更新日 |
| `cover` | ⚙ | `/images/<語系>/<分類>/<slug>-cover.png` |
| `category` | ✅ | 必須是該語系下的合法分類 key |
| `tags` | ✅ | 陣列，3–6 個 |
| `canonical` | ⚙ | 留空自動產；否則填絕對網址 |
| `locale` | ✅ | `zh` 或 `en` |
| `draft` | ⚙ | `true` 不發布（不進 sitemap/列表） |
| `affiliate` | ⚙ | `{ shopee: "...", amazon: "..." }` 分潤連結 |

> ⚠️ YAML 陷阱：frontmatter 值若含冒號 `:` 或特殊符，要用**單引號**包住，否則 build 會失敗。

---

## 4. 本地預覽

```bash
npm install        # 首次
npm run dev        # http://localhost:4321
npm run build      # astro check + 靜態建置到 dist/
npm run preview    # 預覽正式建置
```

---

## 5. 部署（見 DEPLOY.md）
推送 `main` 即由 GitHub Actions 自動部署到 GitHub Pages。

---

## 6. 常見問題

**Q: 文章沒出現在首頁/分類頁？**
A: 檢查 `draft` 是否為 `true`；檢查 `category` 是否為該語系合法 key；重新 `npm run build`。

**Q: build 報 YAML 錯誤？**
A: 通常是 title 含冒號沒加引號，或中文編碼問題。用單引號包住值。

**Q: 封面圖不顯示？**
A: 確認路徑在 `public/images/...` 且 frontmatter `cover` 與檔名一致（含副檔名）。

**Q: hreflang 怎麼運作？**
A: 同 slug 的 `zh` 與 `en` 文章會自動互鏈；沒有對應語版則不顯示該語言連結。

**Q: 想加新分類？**
A: 在 `src/consts.ts` 的 `SITE.categories` 加 key+名稱，並建立 `src/content/<語系>/<新key>/` 資料夾即可。
