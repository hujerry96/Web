# 部署步驟 (Deploy to GitHub Pages)

網站使用 GitHub Actions 自動部署到 GitHub Pages，以下以 **project page**（`https://hujerry96.github.io/Web`）為例。

---

## 1. 建立 GitHub Repo
1. 登入 GitHub，新增 repo，名稱設定為 `Web`（或其它名稱）
2. 若為 project page：需設定 `astro.config.mjs` 中 `base` 改為 `'/<repo>'`，網站網址為 `https://<user>.github.io/<repo>`

---

## 2. 推送程式碼
```bash
git init
git add .
git commit -m "init: Astro bilingual AI-first content site"
git branch -M main
git remote add origin https://github.com/hujerry96/Web.git
git push -u origin main
```

---

## 3. 啟動 GitHub Pages
1. Repo 進入 **Settings** → **Pages**
2. Source 選 **GitHub Actions**
3. 等待 Actions 跑完（每次約 1 分鐘），網站即可上線於 `https://hujerry96.github.io/Web`

> 之後每次 `git push` 到 `main` 都會自動重新部署

---

## 4. Google Search Console（SEO 最後一哩路）
1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 新增資源（選一種）：
   - **URL 前置字元**：`https://hujerry96.github.io/Web`
   - **網域**：`hujerry96.github.io`（涵蓋所有子路徑）
3. 驗證方式：下載 HTML 驗證檔放到 `public/google-site-verification.html`，push 後按驗證
4. **提交 Sitemap**（統一用 `sitemap.xml`，GitHub Pages 對 sitemap-index 支援度不佳）：
   - 若用 URL 前置字元 `https://hujerry96.github.io/Web`：輸入 `sitemap.xml`
   - 若用 URL 前置字元 `https://hujerry96.github.io`：輸入 `Web/sitemap.xml`
   - 若用網域 `hujerry96.github.io`：輸入 `sitemap.xml`
5. 定期檢查「網頁索引」與「核心網頁指標」報表

---

## 5. 自訂網域（可選）
1. 購買網域（如 Namecheap / Google Domains）
2. DNS 設定：
   - A 紀錄指向 GitHub Pages IP：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - 或 CNAME 紀錄指向 `hujerry96.github.io`
3. Repo → Settings → Pages → Custom domain 填入你的網域
4. 勾選 **Enforce HTTPS**（建議一定要開）
5. 記得更新 `astro.config.mjs` 的 `site` 與 `src/consts.ts` 的 `SITE.url`

---

## 6. 疑難排解
- **圖片/資源 404**：project page 忘記設 `base: '/<repo>'`
- **Actions 失敗**：看 Actions 日誌，通常是 `npm run build` 時 frontmatter 欄位缺失
- **Sitemap 不含某頁**：該頁設了 `draft: true` 或 `category` 不符
