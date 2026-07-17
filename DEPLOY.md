# ?¨ç½²æ­¥é? (Deploy to GitHub Pages)

ç¶²ç?ä½¿ç”¨ GitHub Actions ?ªå??¨ç½²??GitHub Pages?‚ä»¥ä¸‹ä»¥ **user page**ï¼ˆ`https://hujerry96.github.io`ï¼‰ç‚ºä¾‹ã€?
---

## 1. å»ºç? GitHub Repo
1. ?»å…¥ GitHubï¼Œæ–°å»?repoï¼Œå?ç¨±å??ˆæ˜¯ `hujerry96.github.io`ï¼ˆuser pageï¼?2. ä¸è??å???READMEï¼ˆæœ¬å°ˆæ?å·²æ?æª”æ?ï¼?
> ?¥ç”¨ project pageï¼ˆä»»??repo ?ï?ï¼šé???`astro.config.mjs` ??`base` ?¹ç‚º `'/<repo>'`ï¼Œä?ç¶²å???`https://hujerry96.github.io/<repo>`??
---

## 2. ?¨é€ç?å¼ç¢¼
```bash
git init
git add .
git commit -m "init: Astro bilingual AI-first content site"
git branch -M main
git remote add origin https://github.com/hujerry96/hujerry96.github.io.git
git push -u origin main
```

---

## 3. ?‹å? GitHub Pages
1. Repo ??**Settings** ??**Pages**
2. Source ??**GitHub Actions**
3. ç­‰å? Actions è·‘å?ï¼ˆé?æ¬¡ç? 1?? ?†é?ï¼‰ï?ç¶²ç??³ä?ç·šæ–¼ `https://hujerry96.github.io`

> ä¹‹å?æ¯æ¬¡ `git push` ??`main` ?½æ??ªå??æ–°?¨ç½²??
---

## 4. Google Search Consoleï¼ˆSEO ?¶å°¾ï¼?1. ?å? [Google Search Console](https://search.google.com/search-console)
2. ?°å?è³‡æ?ï¼š`https://hujerry96.github.io`
3. é©—è??¹å?ï¼šä?è¼?HTML é©—è?æª”ï??¾åˆ° `public/google-site-verification.html`ï¼Œpush å¾Œé??Œé?è­‰ã€?4. **?äº¤ Sitemap**ï¼šå·¦??Sitemaps ??è¼¸å…¥ `sitemap-index.xml` ???äº¤
5. å®šæ?æª¢æŸ¥?Œç¶²?ç´¢å¼•ã€è??Œæ ¸å¿ƒç¶²?æ?æ¨™ã€å ±??
---

## 5. ?ªè?ç¶²å?ï¼ˆå¯?¸ï?
1. è³¼è²·ç¶²å?ï¼ˆå? Namecheap / Google Domainsï¼?2. DNS è¨­å?ï¼?   - A ç´€?„æ???GitHub Pages IPï¼š`185.199.108.153`?`185.199.109.153`?`185.199.110.153`?`185.199.111.153`
   - ??CNAME ç´€?„æ???`hujerry96.github.io`
3. Repo ??Settings ??Pages ??Custom domain å¡«å…¥ä½ ç?ç¶²å?
4. ?¾é¸ **Enforce HTTPS**ï¼ˆç??ˆé??¸å??‚ï?
5. è¨˜å???`astro.config.mjs` ??`site` ??`src/consts.ts` ??`SITE.url` ?¹æ??ªè?ç¶²å?

---

## 6. ?‘é›£?’è§£
- **æ¨??/è³‡æ? 404**ï¼šproject page å¿˜ä?è¨?`base: '/<repo>'`
- **Actions å¤±æ?**ï¼šç? Actions ?¥è?ï¼Œé€šå¸¸??`npm run build` ä¸?frontmatter æ¬„ä?ç¼ºæ?
- **Sitemap ä¸å«?æ?ç«?*ï¼šè©²?‡ç? `draft: true` ??`category` ä¸ç¬¦
