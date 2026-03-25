import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

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
        style={{ background: "#0F1117", zIndex: 0 }}
      />

      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(2,8,16,0.80)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline">
            <VaultLogo size={24} />
            <span className="text-white font-bold text-[15px]">Vault</span>
          </a>
          <a href="/#waitlist" className="px-4 py-2 rounded-2xl text-sm btn-accent">
            Get Early Access
          </a>
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
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card card-hover flex flex-col sm:flex-row overflow-hidden"
                  style={{ textDecoration: "none" }}
                >
                  {post.heroImage && (
                    <div
                      className="sm:flex-shrink-0 sm:w-64"
                      style={{ height: "160px", background: "#0F1117" }}
                    >
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          display: "block",
                        }}
                      />
                    </div>
                  )}
                  <div
                    className="flex flex-col justify-center p-6 sm:p-8"
                    style={{ flex: 1 }}
                  >
                    <h2 className="text-[17px] font-bold text-white mb-2 leading-snug">{post.title}</h2>
                    <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-[11px] text-vault-text-dim font-medium">
                      {post.date && (
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {post.readingTime && (
                        <>
                          <span className="text-white/20">·</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                      <span className="ml-auto text-vault-accent font-medium">Read →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 no-underline">
            <VaultLogo size={18} />
            <span className="text-white/30 text-sm">vlt.money</span>
          </a>
          <div className="flex items-center gap-4 text-xs text-vault-muted">
            <span>Prometheus Labs</span>
            <span className="text-white/15">·</span>
            <a href="/privacy" className="hover:text-white/30 transition-colors">Privacy</a>
            <span className="text-white/15">·</span>
            <a href="/terms" className="hover:text-white/30 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
