import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// 單一 post collection 涵蓋所有 locale/category（KISS：避免 11 份重複 schema）。
// 用 frontmatter 的 `locale` 欄位分流，用檔案路徑解析 category。
const post = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content',
    // 保留資料夾路徑作為 id（如 "zh/reviews/foo"），供 lib/content.parseId 解析
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 省略 slug 時，build 期由檔名自動產生（見 lib/content.ts）
      slug: z.string().optional(),
      description: z.string(),
      keywords: z.array(z.string()).default([]),
      author: z.string().default('Jerry Hu'),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      // 封面圖：與文章同目錄，frontmatter 寫 ./cover.png（astro:assets 自動處理 base/最佳化）
      cover: image().optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      canonical: z.string().url().optional(),
      locale: z.enum(['zh', 'en']),
      draft: z.boolean().default(false),
      // 未來擴充：分潤連結（不加邏輯，僅預留欄位）
      affiliate: z
        .object({ shopee: z.string().url().optional(), amazon: z.string().url().optional() })
        .optional(),
    }),
});

export const collections = { post };
