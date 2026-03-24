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
          background: "#020810",
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
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0066FF, #00A3FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "3px solid white",
                }}
              />
            </div>
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
                background: "linear-gradient(135deg, #0066FF, #00A3FF)",
                backgroundClip: "text",
                color: "transparent",
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
              background: "linear-gradient(135deg, #0066FF, #0080FF)",
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
