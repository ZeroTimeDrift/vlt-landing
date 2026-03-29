import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vault — تطبيق ادّخار بعوائد حقيقية",
  description:
    "أموالك تحقق عوائد من رسوم المقترضين الفعليين والمؤسسات — وليس فوائد من Vault. أودع واكسب ~5.4%، واسحب في أي وقت.",
  metadataBase: new URL("https://vlt.money"),
  alternates: {
    canonical: "https://vlt.money/ar",
    languages: {
      en: "https://vlt.money",
      ar: "https://vlt.money/ar",
    },
  },
  openGraph: {
    title: "Vault — تطبيق ادّخار بعوائد حقيقية",
    description: "أموالك تحقق عوائد من رسوم المقترضين الفعليين والمؤسسات. ~5.4%، اسحب في أي وقت.",
    url: "https://vlt.money/ar",
    siteName: "Vault",
    type: "website",
    locale: "ar_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vault — تطبيق ادّخار بعوائد حقيقية",
    description: "أموالك تحقق عوائد من رسوم المقترضين الفعليين والمؤسسات. ~5.4%، اسحب في أي وقت.",
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="en" href="https://vlt.money" />
        <link rel="alternate" hrefLang="ar" href="https://vlt.money/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://vlt.money" />
      </head>
      <body className="ar-layout">{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
