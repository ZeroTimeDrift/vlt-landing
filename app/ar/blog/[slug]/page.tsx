import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import ReadingProgressBar from "@/app/blog/[slug]/ReadingProgressBar";
import BlogBottomCtaAr from "./BlogBottomCtaAr";
import BlogSidebarCtaAr from "./BlogSidebarCtaAr";
import ShareButtons from "@/app/blog/[slug]/ShareButtons";
import MobileStickyCtaBar from "@/app/blog/[slug]/MobileStickyCtaBar";

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
    title: `${post.title} — مدوّنة Vault`,
    description: post.excerpt,
    alternates: {
      canonical: `https://vlt.money/ar/blog/${post.slug}`,
      languages: {
        en: `https://vlt.money/blog/${post.slug}`,
        ar: `https://vlt.money/ar/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://vlt.money/ar/blog/${post.slug}`,
      siteName: "Vault",
      type: "article",
      locale: "ar_AE",
      publishedTime: post.date,
      images: post.heroImage
        ? [{ url: `https://vlt.money${post.heroImage}`, width: 1200, height: 420, alt: post.title }]
        : [{ url: "https://vlt.money/opengraph-image", width: 1200, height: 630, alt: "Vault — تطبيق ادّخار بعوائد حقيقية" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
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

export default function BlogPostAr({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Topic-aware related posts: prefer same-category posts, fall back to recency
  const TOPIC_MATCHERS = [
    { label: "Vault vs.", match: (s: string) => s.startsWith("vault-vs-") },
    { label: "Savings rates", match: (s: string) => s.includes("savings-rate") || s.includes("-rates-") || s.startsWith("uae-savings-rates") },
    { label: "Expat guides", match: (s: string) => s.includes("expat") || /(?:^|-)(?:indians|filipinos|pakistanis|british-expats|moving-to-dubai)(?:-|$)/.test(s) },
    { label: "UAE banks", match: (s: string) => ["adcb","adib","fab","dib","mashreq","emirates-nbd","hsbc","rakbank","standard-chartered","emirates-islamic"].some(b => s.includes(b)) },
    { label: "How it works", match: (s: string) => ["how-vault-works-without-the-jargon","how-lending-markets-work","whos-building-vault","transparency-is-a-feature","what-to-check-before-depositing","who-are-the-borrowers"].includes(s) || s.startsWith("what-is-") },
    { label: "Regulation", match: (s: string) => ["regulation","regulator","adgm","genius-act","legal","us-earnings-ban","us-digital-savings","us-stablecoin"].some(t => s.includes(t)) },
  ];

  const allOtherPosts = getAllPosts().filter(p => p.slug !== post.slug);
  const postCategory = TOPIC_MATCHERS.find(c => c.match(post.slug));

  let relatedPosts;
  if (postCategory) {
    const sameCategory = allOtherPosts.filter(p => postCategory.match(p.slug));
    const fromOther = allOtherPosts.filter(p => !postCategory.match(p.slug));
    relatedPosts = [...sameCategory.slice(0, 2), ...fromOther].slice(0, 2);
  } else {
    relatedPosts = allOtherPosts.slice(0, 2);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "ar",
    author: { "@type": "Organization", name: post.author ?? "Vault Team" },
    publisher: { "@type": "Organization", name: "Vault", url: "https://vlt.money" },
    url: `https://vlt.money/ar/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgressBar />

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
          <a href="/ar" className="flex items-center gap-2 no-underline">
            <VaultLogo size={24} />
            <span className="text-white font-bold text-[15px] tracking-tight">Vault</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/ar/blog" className="hidden md:inline text-sm text-white/40 hover:text-white/60 transition-colors">المدوّنة</a>
            <a href={`/blog/${post.slug}`} className="hidden md:inline text-sm text-white/40 hover:text-white/60 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>English</a>
            <a href="/ar#waitlist" className="px-4 py-2 rounded-2xl text-sm btn-accent">
              احصل على وصول مبكر
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-24 px-6 min-h-screen">
        <div className="relative max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <a
            href="/ar/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors mb-10 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            جميع المقالات
          </a>

          {/* Hero image */}
          {post.heroImage && (
            <div
              className="mb-10 overflow-hidden relative"
              style={{
                borderRadius: 20,
                width: "min(900px, calc(100vw - 48px))",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full"
                style={{ display: "block", height: "auto" }}
              />
            </div>
          )}

          {/* Article header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-[12px] text-vault-text-dim font-medium">
              {post.date && (
                <span>
                  {new Date(post.date).toLocaleDateString("ar-AE", {
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
              {post.author && (
                <>
                  <span className="text-white/20">·</span>
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

          {/* Mid-article callout */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 my-10 px-6 py-4"
            style={{
              background: "rgba(0,102,255,0.05)",
              border: "1px solid rgba(0,102,255,0.10)",
              borderRadius: 16,
            }}
          >
            <span className="text-white font-semibold text-sm">
              Vault يحقق ~٥٫٤٪ على مدّخراتك.
            </span>
            <a
              href="#cta-form"
              className="btn-accent text-xs font-bold rounded-2xl whitespace-nowrap"
              style={{ padding: "8px 16px" }}
            >
              احصل على وصول مبكر
            </a>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <>
              <div className="section-divider mt-16 mb-10" />
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-6">
                المزيد من Vault
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <a
                    key={related.slug}
                    href={`/ar/blog/${related.slug}`}
                    className="vault-card p-6 flex flex-col no-underline group"
                    style={{ textDecoration: "none" }}
                  >
                    <h3 className="text-[15px] font-bold text-vault-text mb-2 leading-snug group-hover:text-white transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2 flex-1">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-vault-muted">
                      {related.date && (
                        <span>{new Date(related.date).toLocaleDateString("ar-AE", { month: "short", day: "numeric" })}</span>
                      )}
                      {related.readingTime && (
                        <>
                          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                          <span>{related.readingTime}</span>
                        </>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {/* Share buttons */}
          <ShareButtons title={post.title} slug={post.slug} />

          <div className="section-divider mt-16 mb-12" />

          {/* CTA */}
          <BlogBottomCtaAr />
        </div>

        {/* Sidebar — positioned in left gutter for RTL, xl+ only */}
        <div className="hidden xl:block absolute top-0 left-0 w-[240px]">
          <BlogSidebarCtaAr />
        </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <VaultLogo size={20} />
            <span className="text-white font-bold text-sm tracking-tight">Vault</span>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-[13px] text-white/40">Prometheus Labs — أبوظبي، الإمارات · نسعى لترخيص FSRA تحت ADGM</span>
            <div className="flex items-center gap-4 text-[13px] text-white/40">
              <a href="/ar/blog" className="hover:text-white/60 transition-colors">المدوّنة</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/ar/privacy" className="hover:text-white/60 transition-colors">الخصوصية</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/ar/terms" className="hover:text-white/60 transition-colors">الشروط</a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-white/20 text-center max-w-2xl mx-auto leading-relaxed">
          Vault هو منتج من Prometheus Labs، المسجّلة في أبوظبي، الإمارات. الأرباح هي رسوم يدفعها المقترضون للوصول إلى رأس المال — وليست فوائد أو عوائد مضمونة. المعدّلات تتغيّر مع ظروف السوق.
        </p>
      </footer>

      <MobileStickyCtaBar />
    </>
  );
}
