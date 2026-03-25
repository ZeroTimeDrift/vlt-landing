"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

const INITIAL = 9;
const INCREMENT = 9;

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [displayCount, setDisplayCount] = useState(INITIAL);
  const visible = posts.slice(0, displayCount);
  const allShown = displayCount >= posts.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {visible.map((post) => (
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
            <div className="flex flex-col justify-center p-6 sm:p-8" style={{ flex: 1 }}>
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
