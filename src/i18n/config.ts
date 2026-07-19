// i18n 基本設定：與 astro.config.mjs 的 i18n 保持一致
export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// hreflang 用的標準語言代碼
export const HREFLANG: Record<Locale, string> = {
  zh: 'zh-TW',
  en: 'en-US',
};

// UI 顯示名稱
export const LOCALE_NAMES: Record<Locale, string> = {
  zh: '繁體中文',
  en: 'English',
};
