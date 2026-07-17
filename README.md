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
推送 `main` 即由 GitHub Actions 自動部署到 GitHub Pages。
修改 `astro.config.mjs` 的 `site` 與 `base`（project page 需 `/<repo>`）。
