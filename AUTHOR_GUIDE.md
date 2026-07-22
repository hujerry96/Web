# 作者操作手冊 (Author Guide)

本手冊說明如何在本網站新增文章、管理發佈排程、從 PDF 擷取圖片、本地預覽與部署。網站技術棧：**Astro + TypeScript + GitHub Pages**，雙語（繁中 `zh` / 英文 `en`）。

> 部署細節請另見 `DEPLOY.md`；本手冊聚焦「怎麼寫稿、怎麼發」。

---

## 1. 專案結構速覽

```
src/
  content/              ← 文章都在這（Markdown）
    zh/
      reviews/          ← 分類資料夾
        <slug>/         ← 每篇文章一個子目錄
          index.md      ← 文章本體
          cover.png     ← 封面圖（若有）
          p3.png        ← 內文插圖（若有）
      guides/
      journal/
    en/
      reviews/
      guides/
      journal/
  content.config.ts     ← article frontmatter schema
  consts.ts             ← SITE config（站名 / 分類 / 網址），品牌改名由此處
```

**重要變化**：每篇文章現在是「目錄 + `index.md`」而非單一 `.md` 檔。封面圖、內文插圖都放在同一目錄，用相對路徑引用（如 `./cover.png`、`./p26.png`）。

### 分類（categories）

全站目前三個分類，`zh` 與 `en` 共用同一組 key：

| key | 繁中顯示 | 英文顯示 |
|-----|----------|----------|
| `reviews` | 實測 | Reviews |
| `guides` | 指南 | Guides |
| `journal` | 手記 | Journal |

---

## 2. 寫一篇新文章（完整 SOP）

### 2-1. 建立文章目錄

每篇文章獨立一個資料夾，結構如下：

```
src/content/en/guides/my-new-article/
  index.md          ← 文章本體（Markdown + frontmatter）
  my-cover.png      ← 封面圖（檔名隨意，在 frontmatter 指定）
```

建立方式：

```bash
# 1. 開資料夾
mkdir -p "src/content/en/guides/my-new-article"

# 2. 建 index.md
touch "src/content/en/guides/my-new-article/index.md"
```

> slug 由資料夾名稱決定（`my-new-article`），不需在 frontmatter 手動指定。若要不同 URL，才在 frontmatter 填 `slug:`。

### 2-2. 填寫 Frontmatter

```markdown
---
title: 'New Balance 1080 v15 實測：緩震王者依舊適合長距離？'
slug: ''
description: '從實跑經驗出發，分析第 15 代 Fresh Foam X 中底調校是否仍值得納入訓練鞋陣容。'
keywords: ['跑步鞋', 'New Balance', '緩震', '長距離', '實測']
author: 'Jerry Hu'
date: 2026-07-18
updated: 2026-07-19
cover: './my-cover.png'
category: 'reviews'
tags: ['鞋款評測', '運動', '跑步']
locale: 'en'
draft: true
affiliate:
  amazon: 'https://www.amazon.com/dp/B0XXXXXXXXX'
---
```

各欄位說明：

| 欄位 | 必填 | 說明 |
|------|------|------|
| `title` | ✅ | ≤60 字。若含冒號 `:` 要用**單引號**包住。 |
| `slug` | ⚙ | 留空則用資料夾名稱當 URL。 |
| `description` | ✅ | meta description，≤160 字。 |
| `keywords` | ⚙ | 建議 8–12 個，SEO 用。 |
| `author` | ⚙ | 預設 Jerry Hu |
| `date` | ✅ | `YYYY-MM-DD` 格式 |
| `updated` | ⚙ | `YYYY-MM-DD`，會在標題下顯示「更新於」 |
| `cover` | ⚙ | 必須用**相對路徑** `./cover.png`（Astro `image()` schema 要求） |
| `category` | ✅ | 合法 key：`reviews` / `guides` / `journal` |
| `tags` | ⚙ | 建議 3–6 個，用於相關文章推薦 |
| `canonical` | ⚙ | 留空自動產生；轉載文才需填原出處 |
| `locale` | ✅ | `zh` 或 `en` |
| `draft` | ⚙ | `true` = 不發布（不進 sitemap / 列表 / 首頁） |
| `affiliate` | ⚙ | `{ amazon?: url }`，填了文末顯示購買按鈕。網址須合法 URL。 |

> ⚠️ **YAML 陷阱**：值若含冒號 `:`、井號 `#` 或特殊符號，要用**單引號**包住。

### 2-3. 加入封面圖

封面圖**直接放文章目錄**，frontmatter 用 `./檔名.副檔名` 引用。

```bash
# 把封面圖複製到文章目錄
cp /path/to/cover.png "src/content/en/guides/my-new-article/my-cover.png"
```

- 建議比例 **16:9**，寬度 ≥ 1280px
- 系統會自動最佳化為 WebP 並產生多種尺寸
- `cover` 不用填寫時，卡片會顯示分類名稱的漸層佔位圖

### 2-4. 加入內文插圖

從書籍 PDF 擷取頁面截圖作為內文插圖（步驟見第 5 節）。圖片放文章目錄，正文用標準 Markdown 引用：

```markdown
![BCC, FCC, and HCP unit cell diagrams.](./p26.png)
```

---

## 3. 發佈排程系統

網站使用「先寫好、定時發佈」模式，避免一天大量新文章衝擊讀者。

### 3-1. 排程檔

`tools/publish-schedule.json` 記錄每篇文章的發佈日期：

```json
{
  "schedule": [
    { "id": "guides/ai-productivity-knowledge-workers", "publishDate": "2026-07-23" },
    { "id": "reviews/semiconductor-lab-notebook", "publishDate": "2026-08-11" }
  ]
}
```

- `id` = `分類/slug`
- `publishDate` = 發佈日，當天 UTC 8:00 自動發

### 3-2. 發佈流程

```bash
# 步驟 1：文章標題 draft: true
# 在 frontmatter 設 draft: true

# 步驟 2：加入排程
# 編輯 tools/publish-schedule.json，加入新條目

# 步驟 3：推上 GitHub
git add -A
git commit -m "post: 新文章（排程 YYYY-MM-DD 發佈）"
git push origin main
```

### 3-3. 自動發佈機制

GitHub Actions 每天早上 UTC 8:00 執行 `tools/scheduler.mjs`，掃描排程表：若當天日期 ≥ 排程日，則將該文章的 `draft: true` 改為 `draft: false`，commit 並 push。

```yaml
# .github/workflows/schedule-publish.yml
on:
  schedule:
    - cron: '0 8 * * *'   # 每天 UTC 8:00 = 台灣時間 16:00
```

若要手動觸發立即發佈：GitHub → Actions → Scheduled Article Publisher → Run workflow。

### 3-4. 即時發佈（跳過排程）

直接把 `draft` 設為 `false` 推上去即可立即上線。

---

## 4. 一鍵發布腳本

寫好文章後，執行以下指令即可發布：

```bash
npm run publish -- <分類/slug>
```

範例：

```bash
npm run publish -- guides/my-new-article
npm run publish -- reviews/semiconductor-lab-notebook
```

腳本會做三件事：
1. 將 `index.md` 的 `draft: true` 改為 `draft: false`
2. 將文章加入 `tools/publish-schedule.json`（日期設為今天）
3. 提示下一步的 git 指令

> 若要排程未來發佈，請手動編輯 `tools/publish-schedule.json` 並維持 `draft: true`，讓 GitHub Actions 自動發佈。

---

## 5. 本地開發指令

```bash
npm install        # 首次安裝依賴
npm run dev        # 本地開發 → http://localhost:4321（自動 hot-reload）
npm run build      # build（會檢查 frontmatter 欄位）
npm run preview    # 預覽正式 build 結果
npm run check      # 只跑型別檢查
```

> 本機網址無 `/Web` 前綴；部署到 GitHub Pages 後自動補上。

---

## 6. 從 PDF 擷取內文插圖

當書籍原始 PDF 有圖表、照片或填寫範例時，可用 Python 截取特定頁面做文章插圖。

### 前置條件

```bash
pip install pymupdf    # 或 pip install fitz
```

### 操作步驟

**步驟 1 — 掃描 PDF 結構**

先快速掃描 PDF 總頁數與每頁內容類型，找出有圖表的頁碼：

```bash
python -c "
import fitz
doc = fitz.open(r'C:\path\to\book.pdf')
for i, page in enumerate(doc):
    imgs = page.get_images()
    text = page.get_text()[:80].replace('\n',' ').strip()
    print(f'p{i+1}: imgs={len(imgs)} text={text}')
doc.close()
"
```

**步驟 2 — 截圖候選頁面**

選定頁碼後，用 2x 解析度渲染：

```python
import fitz
doc = fitz.open(r'C:\path\to\book.pdf')
page = doc[25]  # 第 26 頁（0-indexed）
pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
pix.save(r'src\content\en\guides\my-article\p26.png')
doc.close()
```

或在終端一次執行：

```bash
python -c "
import fitz
doc = fitz.open(r'C:\Users\hujerry\Desktop\網站\電子檔\book.pdf')
page = doc[25]  # 第 26 頁
pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
pix.save(r'src\content\en\guides\my-article\p26.png')
print(f'Saved p26.png ({pix.width}x{pix.height})')
doc.close()
"
```

**步驟 3 — 插入文章**

```markdown
![圖說文字](./p26.png)
```

- 圖檔放文章目錄（與 `index.md` 同層）
- Markdown 用相對路徑 `./檔名.png`
- 建議每篇文章 1–3 張圖，最多不超過 5 張

**步驟 4 — 刪除未使用圖片**

只保留實際插入的圖檔，避免 build 時浪費頻寬。

---

## 7. 常見工作情境

### 情境 A：新增 KDP 書籍文章

1. 開資料夾 `src/content/en/guides/book-slug/`
2. 寫 `index.md`（frontmatter + 正文，含 Amazon 分潤連結）
3. 封面圖從 `草稿/封面/` 複製到文章目錄
4. 若書有 PDF 電子檔，從中擷取 1–3 張插圖
5. `npm run build` 確認無誤
6. 加入 `tools/publish-schedule.json`
7. `git push` 上線排程

### 情境 B：多格式書（拼圖／謎題書）

跟一般文章流程相同，但有幾點注意：

- 封面圖已在 `草稿/封面/` 的用 `./cover.png`
- 無封面圖則省略 `cover` 欄位
- PDF 電子檔頁面可挑不同 puzzle 類型各一張當插圖
- 分類建議用 `reviews`

### 情境 C：既有文章加插圖

1. 從 PDF 截圖（步驟同上）
2. 圖存到文章目錄
3. 編輯 `index.md`，在相關段落後插入 `![圖說](./pX.png)`
4. `npm run build` 確認
5. 刪除該目錄下未使用圖檔

---

## 8. 部署

推送 `main` 即由 GitHub Actions 自動部署到 GitHub Pages。

```bash
git add -A
git commit -m "post: 新增文章標題"
git push origin main     # 觸發自動部署，約 1–2 分鐘上線
```

> 部署後若畫面沒更新，用 `Ctrl/Cmd + Shift + R` 硬刷新，或開無痕視窗確認。

---

## 9. 淺色 / 深色模式

- 支援兩套主題，配色在 `src/styles/global.css` 的 `[data-theme='light']` 與 `[data-theme='dark']`
- 讀者可用右上角切換鈕切換（存入 `localStorage`）
- 未選過則跟隨系統 `prefers-color-scheme`

---

## 10. 常見問題

**Q: Build 報 YAML / schema 錯誤？**
A: 最常見原因——① title 含冒號沒加引號；② `affiliate.amazon` 網址不是合法 URL；③ `date` 格式不對。

**Q: 封面圖不顯示？**
A: 確認——① `cover` 路徑用 `./檔名.副檔名`；② 圖檔在文章目錄裡；③ 副檔名與 frontmatter 一致。

**Q: 文章沒出現在首頁 / 分類頁？**
A: 檢查 `draft` 是否為 `true`、`category` 是否為合法 key、檔案放對資料夾、重跑 `npm run build`。

**Q: 想加新分類？**
A: 在 `src/consts.ts` 的 `SITE.categories` 各加一組，並建立 `src/content/<語系>/<新key>/` 空資料夾。

**Q: 目錄（TOC）沒出現？**
A: 需要正文有至少一個 `##` 或 `###` 標題才會顯示；行動版 < 980px 會隱藏。

**Q: 排程當天沒發？**
A: GitHub Actions 排程有時延遲 15–30 分鐘。若要確認：GitHub → Actions → Scheduled Article Publisher 看執行記錄。也可手動 Run workflow。
