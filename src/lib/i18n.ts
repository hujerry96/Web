import type { Locale } from '../i18n/config';

// 簡易 i18n helper：依 locale 取 UI 字串（與 ui.ts 對接）
import { useTranslations } from '../i18n/ui';

export function t(locale: Locale, key: Parameters<ReturnType<typeof useTranslations>>[0]): string {
  return useTranslations(locale)(key);
}

// 由路徑判斷當前 locale（Astro.currentLocale 也可用，此為備援）
export function localeFromPath(path: string): Locale {
  return path.startsWith('/en') ? 'en' : 'zh';
}
