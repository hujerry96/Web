// 指南主題分群（首頁主題入口、指南索引頁、頁尾共用，DRY）
// 以文章 slug 歸類；未列出的文章落入最後一個「材料科學專題」。
import type { Locale } from '../i18n/config';
import type { Post } from './content';
import { postSlug } from './content';

export interface Topic {
  id: string;
  code: string;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  slugs: string[];
}

export const TOPICS: Topic[] = [
  {
    id: 'xrd',
    code: 'XRD',
    name: { zh: 'XRD 繞射分析', en: 'XRD analysis' },
    desc: {
      zh: '峰擬合、FWHM、Scherrer 與 Williamson–Hall 晶粒尺寸，以及不用 Origin 的 XRD 論文圖。',
      en: 'Peak fitting, FWHM, Scherrer and Williamson–Hall crystallite size, and XRD figures without Origin.',
    },
    slugs: [
      'xrd-peak-fitting',
      'xrd-overlapping-peak-fitting',
      'xrd-scherrer-williamson-hall',
      'how-to-calculate-crystallite-size-from-xrd',
      'xrd-publication-figure-without-origin',
    ],
  },
  {
    id: 'spectroscopy',
    code: 'FTIR · RAMAN · UV-VIS',
    name: { zh: 'FTIR、Raman 與 UV-Vis', en: 'FTIR, Raman & UV-Vis' },
    desc: {
      zh: '基線校正、多樣品疊圖、Tauc plot 能隙估算與儀器檔案格式整理。',
      en: 'Baseline correction, multi-sample overlays, Tauc band-gap estimation and instrument file formats.',
    },
    slugs: [
      'ftir-raman-spectra-analysis',
      'multi-sample-ftir-raman-xrd-comparison',
      'uv-vis-tauc-plot-bandgap',
      'uv-vis-tauc-bandgap-workflow',
      'spectra-data-format-conversion',
    ],
  },
  {
    id: 'software',
    code: 'SOFTWARE',
    name: { zh: '軟體教學與論文繪圖', en: 'Software & figures' },
    desc: {
      zh: 'Spectra Studio、SEM 粒徑分析與論文格式工具的完整教學，以及期刊圖表標準化流程。',
      en: 'Full guides to Spectra Studio, the SEM Particle Analyzer and the Thesis Format Fixer, plus journal figure workflows.',
    },
    slugs: [
      'spectra-studio-guide',
      'spectra-studio-guide-en',
      'publication-spectra-figure-workflow',
      'particle-analyzer-guide',
      'particle-analyzer-guide-en',
      'thesis-formatter-guide',
      'thesis-formatter-guide-en',
    ],
  },
  {
    id: 'materials',
    code: 'MATERIALS',
    name: { zh: '材料科學專題', en: 'Materials science notes' },
    desc: {
      zh: '固態電池、鈣鈦礦、寬能隙半導體等能源與半導體材料的瓶頸解析。',
      en: 'Deep dives into the materials bottlenecks behind batteries, solar cells, semiconductors and energy tech.',
    },
    slugs: [],
  },
];

export function topicOf(post: Post): Topic {
  const slug = postSlug(post);
  return TOPICS.find((topic) => topic.slugs.includes(slug)) ?? TOPICS[TOPICS.length - 1];
}

export function groupByTopic(posts: Post[]): { topic: Topic; posts: Post[] }[] {
  return TOPICS.map((topic) => ({ topic, posts: posts.filter((p) => topicOf(p).id === topic.id) })).filter(
    (group) => group.posts.length > 0,
  );
}
