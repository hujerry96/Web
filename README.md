# AI-First 內容網站

Astro 6 + TypeScript + GitHub Pages 的雙語（繁中/英文）內容站，目標為 Google SEO、長期內容累積、導流 Shopee 與 Amazon KDP。

## 技術棧
- Astro 6（static output）
- TypeScript strict
- 原生 Scoped CSS（零樣式依賴）
- @astrojs/sitemap、@astrojs/rss

## 本地開發
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + 靜態建置到 dist/
npm run preview
```

## 寫一篇新文章
1. 複製 `tools/ai-content/TEMPLATE.md`
2. 放到 `src/content/<locale>/<category>/<slug>.md`
3. 封面圖放 `public/images/<locale>/<category>/`
4. `npm run build` 檢查 frontmatter 是否齊全

## AI 工作流
```bash
npm run ai -- "New Balance 1080 v15" --locale zh --category reviews
```
產出 `drafts/<slug>/` 提示詞包，交給 AI 完成後確認，再移入 `src/content/`。

## 部署

**正式站：Cloudflare Pages（https://hulab.pages.dev）**，GitHub Pages（https://hujerry96.github.io/Web）為備援（兩站內容相同、同步部署）。

### ⚠️ Cloudflare Pages 部署注意事項（重要）

本專案預設是 GitHub Pages project site，`astro.config.mjs` 的 base 會是 `/Web`。Cloudflare Pages 使用網域根目錄，**不能直接執行 `npm run build` 後部署**，否則 CSS、圖片與 JS 會指向 `/Web/_astro/...`，頁面看似部署成功但會「跑掉」或資源全部 404。

Cloudflare 正式站請固定使用以下 **bash / Git Bash** 指令：

```bash
ASTRO_BASE=none ASTRO_SITE=https://hulab.pages.dev ASTRO_OUT_DIR=dist npm run build
npx wrangler pages deploy dist --project-name hulab
```

不要在 bash / Git Bash 寫 `set ASTRO_BASE=none`；那不是正確的環境變數匯出方式。若使用 PowerShell，改用：

```powershell
$env:ASTRO_BASE="none"
$env:ASTRO_SITE="https://hulab.pages.dev"
$env:ASTRO_OUT_DIR="dist"
npm run build
npx wrangler pages deploy dist --project-name hulab
```

部署前可確認產物沒有錯誤的 `/Web` 前綴：

```bash
grep -R '"/Web/_astro/' dist --include='*.html' --include='*.xml'
# 必須沒有輸出；有輸出就不要部署，先重新用 ASTRO_BASE=none build
```

注意：`npx wrangler pages deploy` 是直接部署本機目前的工作樹，不等於 GitHub commit/push；部署前應先確認 `git diff` 內容，避免把未預期的修改一起上線。

### 備援站（GitHub Pages）

```bash
ASTRO_SITE=https://hujerry96.github.io/Web ASTRO_OUT_DIR=dist-gh npm run build
cp -r dist-gh docs && touch docs/.nojekyll && git push
```

修改 `astro.config.mjs` 的 `site` 與 `base`（project page 需 `/<repo>`；正式站 base 用 `none`，因 Astro 6.4.8 對顯式 `base:'/'` 有 i18n bug）。
