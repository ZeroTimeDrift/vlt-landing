import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vault — A savings app with real returns",
  description:
    "Your money earns fees from real borrowers and institutions — not interest from Vault. Deposit, earn ~5.4%, withdraw anytime. Completely hands-off.",
  metadataBase: new URL("https://vlt.money"),
  openGraph: {
    title: "Vault — A savings app with real returns",
    description: "Your money earns fees from real borrowers and institutions. ~5.4%, withdraw anytime. Completely hands-off.",
    url: "https://vlt.money",
    siteName: "Vault",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vault — A savings app with real returns",
    description: "Your money earns fees from real borrowers and institutions. ~5.4%, withdraw anytime. Completely hands-off.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
