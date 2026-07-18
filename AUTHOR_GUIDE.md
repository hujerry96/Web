# 作者操作手冊 (Author Guide)

本手冊說明如何在本網站新增文章、使用 AI 工作流、本地預覽與部署。網站技術棧：**Astro + TypeScript + GitHub Pages**，雙語（繁中 `zh` / 英文 `en`）。

> 部署細節請另見 `DEPLOY.md`；本手冊聚焦「怎麼寫稿、怎麼發」。

---

## 1. 專案結構速覽

```
src/
  content/            ← 你的文章都在這（Markdown，即 CMS）
    zh/<分類>/*.md
    en/<分類>/*.md
  content.config.ts   ← 文章 frontmatter 欄位定義（schema，改欄位由此處）
  consts.ts           ← 站名 / 作者 / 網址 / 分類名稱（改品牌、加分類由此處）
  i18n/               ← 介面字串（導覽列 / 頁尾）
  lib/                ← SEO / 內容 / i18n 邏輯（一般不需動）
  components/         ← 顯示元件（Header / Footer / 卡片 / TOC / SEO）
  layouts/            ← 頁面骨架
  pages/              ← 路由（一般不需動）
public/
  images/             ← 封面圖、OG 圖（靜態資源根目錄）
    <語系>/<分類>/*.png
    og-default.png
scripts/
  ai-generate.mjs     ← AI 工作流腳本（產 prompt + meta 骨架）
  slug.mjs            ← slug 工具
tools/ai-content/
  TEMPLATE.md         ← frontmatter 模板
```

### 分類（categories）

全站目前只有三個分類，且 `zh` 與 `en` 共用同一組 key：

| key | 繁中顯示 | 英文顯示 |
|-----|----------|----------|
| `reviews` | 實測 | Reviews |
| `guides` | 指南 | Guides |
| `journal` | 手記 | Journal |

文章資料夾即 `src/content/<語系>/<分類>/`，例如 `src/content/zh/reviews/`、`src/content/en/guides/`。

> 想加分類：在 `src/consts.ts` 的 `SITE.categories` 的 `zh` 與 `en` 各加一組 `key: '顯示名'`，並建立對應的 `src/content/<語系>/<新key>/` 空資料夾即可（空分類頁也會自動產出，不會 404）。

---

## 2. 寫一篇新文章（SOP）

### 方法 A：手動寫

1. 複製 `tools/ai-content/TEMPLATE.md` 的 frontmatter 區塊。
2. 在對應資料夾新建 `<slug>.md`：
   - 中文：`src/content/zh/reviews/`、`src/content/zh/guides/`、`src/content/zh/journal/`
   - 英文：`src/content/en/reviews/`、`src/content/en/guides/`、`src/content/en/journal/`
3. 填寫 frontmatter（見第 3 節），寫 Markdown 正文。
4. 封面圖放 `public/images/<語系>/<分類>/<slug>-cover.png`（副檔名要與 frontmatter 的 `cover` 一致）。
5. `npm run build` 檢查欄位是否齊全（缺必填欄位或型別不符會報錯）。

### 方法 B：AI 工作流（推薦）

```bash
npm run ai -- "New Balance 1080 v15" --locale zh --category reviews
# 等同：node scripts/ai-generate.mjs "New Balance 1080 v15" --locale zh --category reviews
```

> ⚠️ `--category` **必須是合法分類 key**（`reviews` / `guides` / `journal`）。腳本預設回落到 `blog`，但 `blog` 不存在，會導致文章進不了任何分類頁，請務必顯式帶入正確分類。

#### 腳本實際在做什麼

`npm run ai` **不會呼叫任何 AI API、也不會自動寫好文章**。它只是用 Node 的模板字串，把幾個參數塞進預寫好的引導詞裡，再寫成 4 個檔案。也就是說，它產生的是「**餵給 AI 的 prompt + frontmatter 骨架**」，真正寫文章的是你拿這些 prompt 去丟的 AI 工具（ChatGPT / Claude / Gemini…）。

腳本讀取的參數（`scripts/ai-generate.mjs`）：

| 參數 | 來源 | 預設 | 說明 |
|------|------|------|------|
| 主題（第 1 個引號參數） | 必填 | — | 不給會報錯退出 |
| `--locale` | 選用 | `zh` | `zh` 或 `en` |
| `--category` | 選用 | `blog`（⚠️ 不存在，要顯式帶） | 合法 key 之一 |
| slug | 由主題 `slugify` 轉出 | — | 如 `New Balance 1080 v15` → `new-balance-1080-v15` |

執行後建立 `drafts/<slug>/` 並寫入：

| 檔案 | 內容 | 你拿它做什麼 |
|------|------|------|
| `prompt-article.md` | 寫作 prompt（H1/H2 結構、字數 1200–1800、CTA、內鏈建議） | 貼給 AI → 產出**文章正文** |
| `prompt-meta.md` | SEO meta prompt（title/description/keywords/slug/tags/faq 的 JSON） | 貼給 AI → 產出**中繼資料** |
| `prompt-social.md` | 社群 prompt（Threads / Twitter / OG 文字稿 / 圖檔名 / alt text） | 貼給 AI → 產出**宣傳素材** |
| `meta.json` | 預填 frontmatter 骨架（slug、date、cover 路徑、locale、`draft:true` 已填，title/description/keywords/tags/faq 留空待補） | AI 補完後你貼回這裡 |

> prompt 本質是**通用 SEO 寫作框架**，腳本對主題內容一無所知，只做變數替換（主題 / 分類 / 語言 / slug 插值）。指定任何主題都能跑，但 prompt 不會針對該主題做客製（例如不會自動要求「比較 v14/v15」這種專屬指令，那是手動加的）。

#### 完整操作步驟

**步驟 1 — 產生草稿包**

```bash
npm run ai -- "New Balance 1080 v15" --locale zh --category reviews
# 終端會印出：✅ 草稿包已產生： drafts/new-balance-1080-v15/
```

**步驟 2 — 把三個 prompt 分別交給 AI**

1. 打開 `drafts/<slug>/prompt-article.md` → 複製貼進 AI → 取得**文章正文**。
2. 打開 `prompt-meta.md` → 貼進 AI → 取得 meta **JSON**（title/description/keywords/tags/faq）。
3. 打開 `prompt-social.md` → 貼進 AI → 取得**社群稿 / OG 文字稿**（自行拿去發或製圖）。

**步驟 3 — 組裝成正式文章**

在 `drafts/<slug>/` 新建最終 `.md`，frontmatter 用 `meta.json` 的值（或直接用 `tools/ai-content/TEMPLATE.md` 當底），正文貼上步驟 2.1 的 AI 文章：

```markdown
---
title: 'AI 給的 title（≤60 字）'
slug: "new-balance-1080-v15"
description: 'AI 給的 description（≤160 字）'
keywords: ["AI 給的 8-12 個"]
author: "Jerry Hu"
date: 2026-07-18
cover: "/images/zh/reviews/new-balance-1080-v15-cover.png"
category: "reviews"
tags: ["AI 給的 3-6 個"]
locale: "zh"
draft: false
---

# AI 給的文章正文（Markdown）
```

> ⚠️ 發布前兩個必改點：`meta.json` 預設 `draft: true`（要改 `false`）；`canonical` 網址是占位的 `https://<user>.github.io/...`（少了 `/Web`），建議**留空**讓系統自動產，或改成正式 `https://hujerry96.github.io/Web/...`。

**步驟 4 — 移到正式目錄並發布**

```bash
# 把組好的 .md 移進內容目錄
git mv drafts/new-balance-1080-v15/new-balance-1080-v15.md src/content/zh/reviews/

# 封面圖（若有）放對位置
cp drafts/new-balance-1080-v15/cover.png public/images/zh/reviews/new-balance-1080-v15-cover.png

npm run build    # 驗證 frontmatter 欄位
git add -A && git commit -m "post: ..." && git push origin main   # 自動部署
```

#### 流程總覽

```
npm run ai → drafts/<slug>/{prompt-article, prompt-meta, prompt-social, meta.json}
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
       AI 寫文章         AI 補 meta JSON     AI 產社群稿
            │                 │
            └──── 組成 .md ────┘  (draft:false, canonical 修正)
                              │
                   移入 src/content/<語系>/<分類>/
                              │
                       git push → 自動部署
```

> `drafts/` 不在 `src/content` 下，不會被網站打包，所以草稿階段 push 也不會上線；只有移進 `src/content/` 且 `draft: false` 才會發布。

#### 指定「其他主題」會怎樣？

例如 `npm run ai -- "Python 自動化訓練紀錄" --locale zh --category guides`：

- `topic = "Python 自動化訓練紀錄"`，`slug` 由 `slugify` 轉出（英文轉小寫加連字號，中文通常原樣保留，影響 URL 與圖檔名）。
- 三個 prompt 的主題 / 分類 / 語言自動換成你給的值，**模板結構完全不變**——即請 AI「寫一篇關於 Python 自動化訓練紀錄的 guides 類文章」。
- `meta.json` 的 `cover` 變成 `/images/zh/guides/<slug>-cover.jpg`、`category` 變 `guides`、`locale` 變 `zh`。

注意：中文 slug 會直接進 URL，建議主題用英文或手動在 frontmatter 指定 `slug` 以保持網址乾淨。

### 自動產生的內容（不用手寫）

以下都由系統根據你的 Markdown 自動生成，作者不需處理：

- **目錄（TOC）**：自動抓正文中的 `##` / `###` 標題，在文章右側產生 sticky 目錄並隨滾動高亮目前章節。
- **閱讀時間**：依字數估算「X 分鐘閱讀」。
- **相關文章**：依「同分類 + 共享標籤」打分自動挑 3 篇。
- **hreflang 互鏈**：同 slug 的 `zh` 與 `en` 文章會在頁面與 SEO 標籤互相連結；缺少對應語版則不顯示該語言連結。
- **SEO / OG / JSON-LD**：根據 frontmatter 自動產 meta、Open Graph、Twitter Card 與結構化資料。

---

## 3. Frontmatter 欄位說明

| 欄位 | 必填 | 型別 / 預設 | 說明 |
|------|------|------------|------|
| `title` | ✅ | string | 含關鍵字，≤60 字。含冒號 `:` 要用**單引號**包住整個值。 |
| `slug` | ⚙ | string（選用） | 留空則用檔名當 URL 末段。 |
| `description` | ✅ | string | meta description，≤160 字。 |
| `keywords` | ⚙ | string[]（預設 `[]`） | 建議 8–12 個，用於 SEO。 |
| `author` | ⚙ | string（預設 `Jerry Hu`） | |
| `date` | ✅ | `YYYY-MM-DD` | 發布日；會做日期排序。 |
| `updated` | ⚙ | `YYYY-MM-DD`（選用） | 更新日，會在文章標題下顯示「更新於」。 |
| `cover` | ⚙ | string（選用） | 封面圖路徑，格式 `/images/<語系>/<分類>/<slug>-cover.png`。**副檔名要與實際檔案一致**，否則圖不顯示。 |
| `category` | ✅ | string | 必須是該語系下的合法分類 key（`reviews` / `guides` / `journal`）。 |
| `tags` | ⚙ | string[]（預設 `[]`） | 建議 3–6 個，用於相關文章推薦。 |
| `canonical` | ⚙ | 絕對網址（選用） | 留空自動產生；轉載文章才需要填原出處。 |
| `locale` | ✅ | `zh` \| `en` | 語系，決定資料夾與顯示語言。 |
| `draft` | ⚙ | boolean（預設 `false`） | `true` 不發布（不進 sitemap / 列表 / 首頁）。 |
| `affiliate` | ⚙ | `{ shopee?, amazon? }`（選用） | 分潤連結；填了會在文末顯示「在 Shopee / Amazon 購買」按鈕。網址須為合法 URL。 |

> ⚠️ **YAML 陷阱**：frontmatter 值若含冒號 `:`、井號 `#` 或特殊符號，要用**單引號**包住，否則 `npm run build` 會失敗。

### Frontmatter 模板

```markdown
---
title: 'New Balance 1080 v15 實測：緩震王者依舊適合長距離？'
slug: ""
description: '從實跑經驗出發，分析第 15 代 Fresh Foam X 中底調校是否仍值得納入訓練鞋陣容。'
keywords: ["跑步鞋", "New Balance", "緩震", "長距離", "實測"]
author: "Jerry Hu"
date: 2026-07-18
updated: 2026-07-19
cover: "/images/zh/reviews/nb1080v15-cover.png"
category: "reviews"
tags: ["鞋款評測", "運動", "跑步"]
canonical: ""
locale: "zh"
draft: false
# affiliate:
#   shopee: "https://shopee.tw/..."
#   amazon: "https://amazon.com/dp/..."
---

# 標題

正文開始寫（Markdown）……
```

---

## 4. 封面圖規範

- 放置位置：`public/images/<語系>/<分類>/<slug>-cover.png`
  - 例：`public/images/zh/reviews/nb1080v15-cover.png`
- frontmatter 的 `cover` 填 `/images/zh/reviews/nb1080v15-cover.png`（**開頭要有 `/`**；網站部署在 `/Web` 子路徑，系統會自動補 `/Web` 前綴，作者不用手動加）。
- 建議比例 **16:9**，寬度 ≥ 1280px；會自動裁切為卡片縮圖與 OG 分享圖。
- 沒填 `cover` 時，卡片會顯示該分類名稱的漸層佔位圖，不會破版。
- 網站預設 OG 圖為 `public/images/og-default.png`。

---

## 5. 本地預覽與指令

```bash
npm install        # 首次安裝依賴
npm run dev        # 本地開發伺服器 → http://localhost:4321
npm run build      # astro check + 靜態建置到 dist/（會驗證 frontmatter 欄位）
npm run preview    # 預覽「正式建置」結果 → http://localhost:4321
npm run check      # 只跑型別 / schema 檢查
npm run ai -- "主題" --locale zh --category reviews   # AI 工作流（見第 2 節）
```

> 本機開發時網址是 `http://localhost:4321`（無 `/Web` 前綴）；部署到 GitHub Pages 後才是 `https://hujerry96.github.io/Web/...`。`base` 路徑由 `astro.config.mjs` 的 `GITHUB_PAGES_BASE = '/Web'` 統一控制，作者寫相對路徑或 `/images/...` 即可，不用管前綴。

---

## 6. 部署（見 DEPLOY.md）

推送 `main` 即由 GitHub Actions 自動構建並部署到 GitHub Pages（project page：`https://hujerry96.github.io/Web`）。

```bash
git add src/content/<語系>/<分類>/<slug>.md public/images/...
git commit -m "post: 新增 <標題>"
git push origin main     # 觸發自動部署，約 1–2 分鐘上線
```

> 部署後若畫面沒更新，通常是瀏覽器快取：用 `Ctrl/Cmd + Shift + R` 硬刷新，或開無痕視窗確認。

---

## 7. 淺色 / 深色模式

- 網站支援淺色（預設）與深色兩套主題，配色集中定義在 `src/styles/global.css` 的 `[data-theme='light']` 與 `[data-theme='dark']`。
- 讀者可用右上角切換鈕切換，選擇會存入 `localStorage`；未選過則跟隨系統 `prefers-color-scheme`。
- 作者一般不需動樣式；若要調整品牌色，改 `global.css` 裡的 `--color-accent` 系列變數（淺色與深色各一組）即可全站連動。

---

## 8. 常見問題（FAQ）

**Q: 文章沒出現在首頁 / 分類頁？**
A: 檢查 `draft` 是否為 `true`（會被排除）；檢查 `category` 是否為合法 key；確認檔案放在 `src/content/<語系>/<分類>/` 下；最後重跑 `npm run build`。

**Q: build 報 YAML / schema 錯誤？**
A: 多半是 title 含冒號沒加單引號，或某欄位型別不符（如 `date` 不是 `YYYY-MM-DD`、`affiliate` 網址不是合法 URL）。錯誤訊息會指出檔名與欄位，照著改即可。

**Q: 封面圖不顯示？**
A: 三個常見原因——① `cover` 路徑與檔名（含副檔名）不一致；② 圖沒放到 `public/images/<語系>/<分類>/`；③ 路徑開頭少了 `/`。注意卡片與文章頁都依賴 `cover` 欄位，且會自動補 `/Web` 前綴，作者填 `/images/...` 即可。

**Q: hreflang 怎麼運作？**
A: 同 slug 的 `zh` 與 `en` 文章會自動互鏈（語言切換鈕與 SEO `hreflang` 標籤）；若某語系缺對應文章，則不顯示該語言連結，也不會錯誤跳轉。

**Q: 想加新分類？**
A: 在 `src/consts.ts` 的 `SITE.categories` 的 `zh` 與 `en` 各加一組 `key: '顯示名'`，並建立 `src/content/<語系>/<新key>/` 空資料夾。空分類頁會自動產出，連結不會 404。

**Q: 目錄（TOC）沒出現？**
A: TOC 只在正文含 `##` / `###` 標題時出現；純短文或無二級以上標題的文章不會顯示側邊目錄（行動版 < 980px 也會隱藏）。

**Q: 為什麼文章頁右側有分類頁沒有 TOC？**
A: TOC 是文章頁（`[locale]/[category]/[slug].astro`）專屬；列表 / 分類 / 首頁用的是 `ArticleCard` 卡片，本就沒有目錄。
