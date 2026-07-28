# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Jerry Hu 的個人網站訪客，主要是材料/半導體背景的工程師與研究生，以及對 Python 工具、生活效率、選物推薦有興趣的讀者。兩類訪客各自從不同入口進站：

- **Hu Lab 讀者**:來找技術指南、實測筆記、工具使用教學，重視內容深度與可讀性
- **Hu Select 訪客**:來看 Jerry 親自篩選的產品推薦，重視信任感與快速判斷

## Product Purpose

Hu Lab 是 Jerry Hu 的個人知識角落:發表技術指南、實測筆記、Python 工具教學，以及自出版書籍。Hu Select 是同站的選物推薦區，透過 Shopee 聯盟連結分享親自使用過的好物。兩者共享一個站但視覺與語氣各自獨立。

成功 = 讀者覺得內容值得留下來讀完(Lab)，或覺得推薦值得點進去買(Select)。

## Positioning

一個靠真實研究背景(半導體/材料科學)支撐的個人知識站，不寫空泛 SEO 農場文，只寫親自做過的事。Hu Select 的推薦來自 Hu Lab 同一個人的真實使用脈絡，不是導購機器人。

## Operating Context

- 雙語(zh + en)內容各自獨立，不互通翻譯
- 分類結構:reviews / guides / journal / select
- 靜態站(Astro 6.3)部署到 GitHub Pages project page (base /Web)
- 文章以 Markdown content collection 管理，封面圖放文章資料夾
- Hu Select 文章含 affiliate frontmatter (shopee / amazon 連結)
- 已安裝 Tailwind CSS v4 + @tailwindcss/typography
- GSAP scroll animations 已整合
- 深色/淺色主題切換(localStorage + prefers-color-scheme)

## Capabilities and Constraints

- I18n:zh + en，defaultLocale = en，prefixDefaultLocale = true
- Image optimization 透過 astro:assets (sharp)
- SEO:Meta / OpenGraph / TwitterCard / JSON-LD 已實作
- 搜尋:client-side fuzzy search 讀 search-index.json
- RSS feed per locale
-sitemap

## Brand Commitments

- 名稱:Hu Lab (主品牌) / Hu Select (副品牌，只出現在選物區)
- 作者:Jerry Hu
- 禁止:破折號(em dash)、AI 感語氣
- 字體:Lora (英文襯線) + Noto Serif TC (中文襯線) — 但這次重設計可能調整

## Evidence on Hand

- 真實文章內容:半導體指南、材料科學實測、Python 工具教學(SEM 粒徑分析、論文格式工具)
- 真實產品推薦內容:AirPods Pro 3、14 吋 DC 風扇等
- 封面圖:每篇文章有專屬封面(.png 或 .webp)
- 產品圖:Hu Select 文章有實體產品圖

## Product Principles

1. **Content is the product** — 設計不該搶走內容焦點，Lab 區尤其
2. **Two brands, one person** — 視覺要明確區隔，但人格信任要串起來
3. **Depth over breadth** — 文章要被讀完，不是被滑過
4. **Tech-confident** — Jerry 是工程師，站該像工程師做的，不像行銷套版

## Accessibility & Inclusion

- 正文對比 ≥ 4.5:1 (WCAG AA)
- 鍵盤導覽可用，focus ring 不靠顏色
- prefers-reduced-motion 已處理
- body measure 65–75ch
