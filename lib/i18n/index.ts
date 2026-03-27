import { en } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";
export type Translations = typeof en | typeof ar;

const translations = { en, ar } as const;

export function t(locale: Locale): Translations {
  return translations[locale];
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function getLocalePath(locale: Locale, path: string = "/"): string {
  if (locale === "en") return path;
  return `/ar${path === "/" ? "" : path}`;
}

export { en, ar };
