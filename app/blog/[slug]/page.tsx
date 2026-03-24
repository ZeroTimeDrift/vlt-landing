import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vault Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://vlt.money/blog/${post.slug}`,
      siteName: "Vault",
      type: "article",
      publishedTime: post.date,
      images: [{ url: "https://vlt.money/opengraph-image", width: 1200, height: 630, alt: "Vault — A savings app with real returns" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://vlt.money/opengraph-image"],
    },
  };
}

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

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author ?? "Vault Team" },
    publisher: { "@type": "Organization", name: "Vault", url: "https://vlt.money" },
    url: `https://vlt.money/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "#020810", zIndex: 0 }}
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
            <span className="text-white font-semibold text-[15px]">Vault</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/blog" className="text-sm text-white/40 hover:text-white/70 transition-colors">Blog</a>
            <a href="/#waitlist" className="px-4 py-2 rounded-lg text-sm btn-accent">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-24 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors mb-10 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All posts
          </a>

          {/* Hero image */}
          {post.heroImage && (
            <div className="mb-10 rounded-xl overflow-hidden" style={{ maxHeight: 360 }}>
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full object-cover"
                style={{ maxHeight: 360, display: "block" }}
              />
            </div>
          )}

          {/* Article header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-[12px] text-white/25 font-medium">
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
                  <span className="text-white/10">·</span>
                  <span>{post.readingTime}</span>
                </>
              )}
              {post.author && (
                <>
                  <span className="text-white/10">·</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </header>

          <div className="section-divider mb-10" />

          {/* Article body */}
          <article
            className="prose-vault"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />

          <div className="section-divider mt-16 mb-12" />

          {/* CTA */}
          <div className="card p-8 text-center" style={{ background: "rgba(0,102,255,0.03)", borderColor: "rgba(0,102,255,0.10)" }}>
            <p className="text-white/30 text-xs font-medium uppercase tracking-[0.2em] mb-3">Ready to earn more?</p>
            <p className="text-white text-[17px] font-semibold mb-2">Put your savings to work.</p>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              Join the waitlist and be first in line when Vault launches.
            </p>
            <a href="/#waitlist" className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white btn-accent">
              Get Early Access
            </a>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 no-underline">
            <VaultLogo size={18} />
            <span className="text-white/30 text-sm">vlt.money</span>
          </a>
          <div className="flex items-center gap-4 text-xs text-white/15">
            <span>Prometheus Labs</span>
            <span className="text-white/8">·</span>
            <a href="#" className="hover:text-white/30 transition-colors">Privacy</a>
            <span className="text-white/8">·</span>
            <a href="#" className="hover:text-white/30 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
