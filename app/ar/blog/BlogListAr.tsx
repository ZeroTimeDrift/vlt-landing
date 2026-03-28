"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const INITIAL = 9;
const INCREMENT = 9;

type Category = { label: string; match: (slug: string) => boolean };

const CATEGORIES: Category[] = [
  { label: "الكل", match: () => true },
  { label: "Vault مقابل", match: (s) => s.startsWith("vault-vs-") },
  {
    label: "معدلات الادخار",
    match: (s) =>
      s.includes("savings-rate") || s.includes("-rates-") || s.startsWith("uae-savings-rates"),
  },
  {
    label: "أدلة المغتربين",
    match: (s) =>
      s.includes("expat") ||
      /(?:^|-)(?:indians|filipinos|pakistanis|british-expats|moving-to-dubai)(?:-|$)/.test(s),
  },
  {
    label: "بنوك الإمارات",
    match: (s) =>
      [
        "adcb", "adib", "fab", "dib", "mashreq", "emirates-nbd",
        "hsbc", "rakbank", "standard-chartered", "emirates-islamic",
      ].some((b) => s.includes(b)),
  },
  {
    label: "كيف يعمل",
    match: (s) =>
      [
        "how-vault-works-without-the-jargon",
        "how-lending-markets-work",
        "whos-building-vault",
        "transparency-is-a-feature",
        "what-to-check-before-depositing",
        "who-are-the-borrowers",
      ].includes(s) || s.startsWith("what-is-"),
  },
  {
    label: "التنظيم",
    match: (s) =>
      ["regulation", "regulator", "adgm", "genius-act", "legal", "us-earnings-ban", "us-digital-savings", "us-stablecoin"].some(
        (t) => s.includes(t)
      ),
  },
];

export default function BlogListAr({ posts }: { posts: BlogPost[] }) {
  const [displayCount, setDisplayCount] = useState(INITIAL);
  const [query, setQuery] = useState("");
  const [activePill, setActivePill] = useState("الكل");

  const q = query.trim().toLowerCase();

  const categoryCounts = useMemo(
    () => CATEGORIES.map((c) => ({ ...c, count: posts.filter((p) => c.match(p.slug)).length })),
    [posts]
  );
  const visiblePills = categoryCounts.filter((c) => c.label === "الكل" || c.count >= 2);

  const pillFiltered =
    activePill === "الكل"
      ? posts
      : posts.filter((p) => CATEGORIES.find((c) => c.label === activePill)!.match(p.slug));
  const filtered = q
    ? pillFiltered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt ?? "").toLowerCase().includes(q)
      )
    : pillFiltered;
  const visible = q ? filtered : filtered.slice(0, displayCount);
  const allShown = q || displayCount >= filtered.length;

  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Search input */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.25)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المقالات…"
            style={{
              width: "100%",
              height: "44px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "12px 42px 12px 42px",
              fontSize: "14px",
              fontFamily: "'Noto Sans Arabic', Inter, sans-serif",
              color: "#FFFFFF",
              outline: "none",
              transition: "border-color 0.15s",
              direction: "rtl",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,102,255,0.35)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.25)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.25)";
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Topic filter pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingRight: "1px",
          paddingLeft: "16px",
          paddingBottom: "4px",
          direction: "rtl",
        }}
        className="hide-scrollbar"
      >
        {visiblePills.map((cat) => {
          const isActive = activePill === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => {
                setActivePill(cat.label);
                setDisplayCount(INITIAL);
              }}
              style={{
                height: "32px",
                padding: "0 14px",
                borderRadius: "999px",
                border: `1px solid ${isActive ? "rgba(0,102,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                background: isActive ? "rgba(0,102,255,0.10)" : "transparent",
                color: isActive ? "#0066FF" : "#6B7280",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "'Noto Sans Arabic', Inter, sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "background 0.15s, color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#9CA3AF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6B7280";
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {q && filtered.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1rem",
            gap: "8px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", margin: 0 }}>
            لا توجد مقالات تطابق &ldquo;{query.trim()}&rdquo;
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", margin: 0 }}>
            جرّب &ldquo;bank&rdquo; أو &ldquo;savings&rdquo; أو &ldquo;rate&rdquo;.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured && (
              <a
                key={featured.slug}
                href={`/ar/blog/${featured.slug}`}
                className="card card-hover flex flex-col md:flex-row-reverse overflow-hidden sm:col-span-2 lg:col-span-3"
                style={{ textDecoration: "none" }}
              >
                {featured.heroImage && (
                  <div
                    className="md:w-1/2 flex-shrink-0 flex items-center justify-center"
                    style={{ background: "#0F1117", minHeight: "200px" }}
                  >
                    <img
                      src={featured.heroImage}
                      alt={featured.title}
                      style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center p-8 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#0066FF" }}>
                    {activePill === "الكل" ? "الأحدث" : activePill}
                  </span>
                  <h2 className="text-[22px] font-bold text-white mb-3 leading-snug">{featured.title}</h2>
                  <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-vault-text-dim font-medium">
                    {featured.date && (
                      <span>{new Date(featured.date).toLocaleDateString("ar-AE", { month: "long", day: "numeric", year: "numeric" })}</span>
                    )}
                    {featured.readingTime && (
                      <>
                        <span className="text-white/20">·</span>
                        <span>{featured.readingTime}</span>
                      </>
                    )}
                    <span className="mr-auto text-vault-accent font-medium">← اقرأ</span>
                  </div>
                </div>
              </a>
            )}

            {rest.map((post) => (
              <a
                key={post.slug}
                href={`/ar/blog/${post.slug}`}
                className="card card-hover flex flex-col overflow-hidden"
                style={{ textDecoration: "none" }}
              >
                {post.heroImage && (
                  <div className="flex items-center justify-center" style={{ background: "#0F1117", aspectRatio: "1200 / 420" }}>
                    <img src={post.heroImage} alt={post.title} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-[16px] font-bold text-white mb-2 leading-snug">{post.title}</h2>
                  <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-vault-text-dim font-medium mt-auto">
                    {post.date && (
                      <span>{new Date(post.date).toLocaleDateString("ar-AE", { month: "long", day: "numeric", year: "numeric" })}</span>
                    )}
                    {post.readingTime && (
                      <>
                        <span className="text-white/20">·</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                    <span className="mr-auto text-vault-accent font-medium">← اقرأ</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 mt-8">
            {!allShown && (
              <button
                onClick={() => setDisplayCount((prev) => prev + INCREMENT)}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  background: "transparent",
                  color: "#9CA3AF",
                  padding: "0.75rem 2rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9CA3AF"; }}
              >
                تحميل المزيد
              </button>
            )}
            <p className="text-xs text-vault-muted" style={{ textAlign: "center" }}>
              {q
                ? `${filtered.length} نتيجة لـ "${query.trim()}"${activePill !== "الكل" ? ` في ${activePill}` : ""}`
                : activePill !== "الكل"
                  ? allShown
                    ? `عرض جميع مقالات ${activePill} (${filtered.length})`
                    : `عرض ${Math.min(displayCount, filtered.length)} من ${filtered.length} مقالة في ${activePill}`
                  : allShown
                    ? `عرض جميع المقالات (${posts.length})`
                    : `عرض ${Math.min(displayCount, posts.length)} من ${posts.length} مقالة`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
