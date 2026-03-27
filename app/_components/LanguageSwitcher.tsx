"use client";

import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale, currentPath = "/" }: { locale: Locale; currentPath?: string }) {
  const targetLocale = locale === "ar" ? "en" : "ar";
  const label = locale === "ar" ? "English" : "العربية";

  // Build target URL
  let href: string;
  if (locale === "ar") {
    // Currently Arabic → go to English: strip /ar prefix
    href = currentPath.replace(/^\/ar/, "") || "/";
  } else {
    // Currently English → go to Arabic: add /ar prefix
    href = `/ar${currentPath === "/" ? "" : currentPath}`;
  }

  return (
    <a
      href={href}
      lang={targetLocale}
      className="text-sm text-vault-muted hover:text-vault-text-dim transition-colors"
      style={{ fontFamily: targetLocale === "ar" ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', sans-serif" }}
    >
      {label}
    </a>
  );
}
