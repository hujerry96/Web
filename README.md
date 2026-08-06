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

```bash
# 正式站（Cloudflare Pages）
ASTRO_BASE=none npm run build          # dist/
 npx wrangler pages deploy dist --project-name hulab

# 備援站（GitHub Pages，legacy branch 模式：main/docs，不依賴 Actions）
ASTRO_SITE=https://hujerry96.github.io/Web ASTRO_OUT_DIR=dist-gh npm run build
cp -r dist-gh docs && touch docs/.nojekyll && git push
```

修改 `astro.config.mjs` 的 `site` 與 `base`（project page 需 `/<repo>`；正式站 base 用 `none`，因 Astro 6.4.8 對顯式 `base:'/'` 有 i18n bug）。
