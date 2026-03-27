import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "Vault Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? slugToTitle(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0F1117",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top: Logo + Blog label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "#0066FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2.5px solid white",
              }}
            />
          </div>
          <span style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>
            Vault
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              marginLeft: "8px",
            }}
          >
            Blog
          </span>
        </div>

        {/* Middle: Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: title.length > 60 ? "44px" : "52px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {title}
          </span>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            vlt.money/blog
          </span>
        </div>

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#0066FF",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
