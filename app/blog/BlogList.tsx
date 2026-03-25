"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

const INITIAL = 9;
const INCREMENT = 9;

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [displayCount, setDisplayCount] = useState(INITIAL);
  const visible = posts.slice(0, displayCount);
  const allShown = displayCount >= posts.length;

  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Featured card — spans full width */}
        {featured && (
          <a
            key={featured.slug}
            href={`/blog/${featured.slug}`}
            className="card card-hover flex flex-col md:flex-row overflow-hidden sm:col-span-2 lg:col-span-3"
            style={{ textDecoration: "none" }}
          >
            {featured.heroImage && (
              <div
                className="md:w-1/2 flex-shrink-0"
                style={{ height: "280px", background: "#0F1117" }}
              >
                <img
                  src={featured.heroImage}
                  alt={featured.title}
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
            <div className="flex flex-col justify-center p-8 flex-1">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#0066FF" }}
              >
                Latest
              </span>
              <h2 className="text-[22px] font-bold text-white mb-3 leading-snug">{featured.title}</h2>
              <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-[11px] text-vault-text-dim font-medium">
                {featured.date && (
                  <span>
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                {featured.readingTime && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{featured.readingTime}</span>
                  </>
                )}
                <span className="ml-auto text-vault-accent font-medium">Read →</span>
              </div>
            </div>
          </a>
        )}

        {/* Regular grid cards */}
        {rest.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card card-hover flex flex-col overflow-hidden"
            style={{ textDecoration: "none" }}
          >
            {post.heroImage && (
              <div style={{ height: "200px", background: "#0F1117" }}>
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
            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-[16px] font-bold text-white mb-2 leading-snug">{post.title}</h2>
              <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-[11px] text-vault-text-dim font-medium mt-auto">
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

      <div className="flex flex-col items-center gap-3 mt-8">
        {!allShown && (
          <button
            onClick={() => setDisplayCount((prev) => prev + INCREMENT)}
            className="load-more-btn"
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
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "rgba(255,255,255,0.08)";
              btn.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "transparent";
              btn.style.color = "#9CA3AF";
            }}
          >
            Load more articles
          </button>
        )}
        <p className="text-xs text-vault-muted" style={{ textAlign: "center" }}>
          {allShown
            ? `Showing all ${posts.length} articles`
            : `Showing ${Math.min(displayCount, posts.length)} of ${posts.length} articles`}
        </p>
      </div>
    </div>
  );
}
