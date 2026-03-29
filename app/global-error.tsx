"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#020810", margin: 0, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div
              style={{
                fontSize: "160px",
                fontWeight: 700,
                lineHeight: 1,
                color: "rgba(255,255,255,0.05)",
                userSelect: "none",
                marginBottom: "8px",
              }}
            >
              500
            </div>

            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.025em",
                marginBottom: "12px",
              }}
            >
              Something went wrong.
            </h1>

            <p style={{ color: "#9CA3AF", fontSize: "16px", marginBottom: "32px" }}>
              We hit an error loading this page.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: "12px 24px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "white",
                  background: "#0066FF",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,102,255,0.25)",
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  padding: "12px 24px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#6B7280",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                ← Back to home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
