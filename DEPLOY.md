# 部署步驟 (Deploy to GitHub Pages)

網站使用 GitHub Actions 自動部署到 GitHub Pages。以下以 **user page**（`https://hujerry96.github.io`）為例。

---

## 1. 建立 GitHub Repo
1. 登入 GitHub，新建 repo，名稱必須是 `hujerry96.github.io`（user page）
2. 不要初始化 README（本專案已有檔案）

> 若用 project page（任意 repo 名）：需把 `astro.config.mjs` 的 `base` 改為 `'/<repo>'`，且網址為 `https://hujerry96.github.io/<repo>`。

---

## 2. 推送程式碼
```bash
git init
git add .
git commit -m "init: Astro bilingual AI-first content site"
git branch -M main
git remote add origin https://github.com/hujerry96/hujerry96.github.io.git
git push -u origin main
```

---

## 3. 開啟 GitHub Pages
1. Repo → **Settings** → **Pages**
2. Source 選 **GitHub Actions**
3. 等待 Actions 跑完（首次約 1–2 分鐘），網站即上線於 `https://hujerry96.github.io`

> 之後每次 `git push` 到 `main` 都會自動重新部署。

---

## 4. Google Search Console（SEO 收尾）
1. 前往 [Google Search Console](https://search.google.com/search-console)
2. 新增資源：`https://hujerry96.github.io`
3. 驗證方式：下載 HTML 驗證檔，放到 `public/google-site-verification.html`，push 後點「驗證」
4. **提交 Sitemap**：左側 Sitemaps → 輸入 `sitemap-index.xml` → 提交
5. 定期檢查「網頁索引」與「核心網頁指標」報告

---

## 5. 自訂網域（可選）
1. 購買網域（如 Namecheap / Google Domains）
2. DNS 設定：
   - A 紀錄指向 GitHub Pages IP：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - 或 CNAME 紀錄指向 `hujerry96.github.io`
3. Repo → Settings → Pages → Custom domain 填入你的網域
4. 勾選 **Enforce HTTPS**（生效需數小時）
5. 記得把 `astro.config.mjs` 的 `site` 與 `src/consts.ts` 的 `SITE.url` 改成自訂網域

---

## 6. 疑難排解
- **樣式/資源 404**：project page 忘了設 `base: '/<repo>'`
- **Actions 失敗**：看 Actions 日誌，通常是 `npm run build` 中 frontmatter 欄位缺漏
- **Sitemap 不含某文章**：該文章 `draft: true` 或 `category` 不符
