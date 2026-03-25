import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Vault",
  description: "Insights on savings, lending markets, and making your money work harder.",
  openGraph: {
    title: "Blog — Vault",
    description: "Insights on savings, lending markets, and making your money work harder.",
    url: "https://vlt.money/blog",
    siteName: "Vault",
    type: "website",
  },
};

function VaultLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="#0066FF" />
      <circle cx="16" cy="16" r="7.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="16" cy="16" r="2.5" fill="white" />
      <line x1="16" y1="8.5" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="21" x2="16" y2="23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="16" x2="23.5" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "#020810", zIndex: 0 }}
      />

      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(15,17,23,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline">
            <VaultLogo size={24} />
            <span className="text-white font-bold text-[15px] tracking-tight">Vault</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/blog" className="hidden md:inline text-sm text-white/40 hover:text-white/60 transition-colors">Blog</a>
            <a href="/#waitlist" className="px-4 py-2 rounded-2xl text-sm btn-accent">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-24 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <p className="text-xs text-white/30 font-medium uppercase tracking-[0.2em] mb-4">Blog</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Think clearer about your money
            </h1>
            <p className="text-white/40 text-[16px] leading-relaxed">
              Insights on savings, lending markets, and making your money work harder.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-white/30 text-sm">Posts coming soon.</p>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </main>

      <footer className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <VaultLogo size={20} />
            <span className="text-white font-bold text-sm tracking-tight">Vault</span>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <span className="text-[13px] text-white/40">Prometheus Labs — Abu Dhabi, UAE · Pursuing FSRA authorisation under ADGM</span>
            <div className="flex items-center gap-4 text-[13px] text-white/40">
              <a href="/blog" className="hover:text-white/60 transition-colors">Blog</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-white/20 text-center max-w-2xl mx-auto leading-relaxed">
          Vault is a product of Prometheus Labs, incorporated in Abu Dhabi, UAE. Earnings are fees paid by borrowers for access to capital — not interest or guaranteed returns. Rates vary with market conditions.
        </p>
      </footer>
    </>
  );
}
