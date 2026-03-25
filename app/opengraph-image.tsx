import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vault — Your money earns more";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0F1117",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 32 32"
              style={{ display: "flex" }}
            >
              <rect width="32" height="32" rx="9" fill="#0066FF" />
              <circle cx="16" cy="16" r="7.5" stroke="white" strokeWidth="1.8" fill="none" />
              <circle cx="16" cy="16" r="2.5" fill="white" />
              <line x1="16" y1="8.5" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="21" x2="16" y2="23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8.5" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="21" y1="16" x2="23.5" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Vault
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                textAlign: "center",
              }}
            >
              Your money earns more.
            </span>
            <span
              style={{
                fontSize: "80px",
                fontWeight: 700,
                color: "#0066FF",
                letterSpacing: "-0.03em",
              }}
            >
              ~5.4% earnings
            </span>
          </div>

          {/* Subhead */}
          <span
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 400,
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Earn fees from real borrowers. No lock-ups. Withdraw anytime.
          </span>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "16px",
              background: "#0066FF",
              marginTop: "12px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "white",
              }}
            >
              Get Early Access at vlt.money
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
