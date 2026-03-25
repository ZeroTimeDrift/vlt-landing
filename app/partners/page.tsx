"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Layers, TrendingUp, Shield, ArrowRight } from "lucide-react";

// ── Hooks ────────────────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Vault Logo ───────────────────────────────────────────────────────────────
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

// ── Partner Waitlist Form ────────────────────────────────────────────────────
function PartnerWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "partners" }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong.");
      setStatus("error");
    }
  }, [email]);

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-xl w-full max-w-md"
        style={{ background: "rgba(0,102,255,0.08)", border: "1px solid rgba(0,102,255,0.2)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#0066FF" />
          <path d="M5 8l2.5 2.5L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm text-vault-text">You&apos;re on the list. We&apos;ll reach out soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          placeholder="you@company.com"
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-xl text-vault-text placeholder-vault-muted text-sm outline-none transition-all disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${status === "error" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
          }}
          aria-label="Work email address"
        />
        {status === "error" && (
          <p className="absolute -bottom-5 left-0 text-[11px] text-red-400">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-shrink-0 px-6 py-3 rounded-2xl text-sm btn-accent disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get Early API Access"}
      </button>
    </form>
  );
}

// ── Partners Page ────────────────────────────────────────────────────────────
export default function PartnersPage() {
  const howRef = useReveal<HTMLDivElement>();
  const propsRef = useReveal<HTMLDivElement>();
  const apiRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────────────── */}
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
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <VaultLogo size={24} />
            <span className="text-vault-text font-semibold text-[15px] tracking-tight">Vault</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">
              For individuals
            </a>
            <a
              href="#get-access"
              className="px-4 py-2 rounded-2xl text-sm btn-accent"
            >
              Get Early API Access
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="min-h-[80vh] flex items-center px-6 pt-20 pb-16 bg-vault-hero hero-grid">
          <div className="max-w-3xl mx-auto w-full text-center">
            <p className="hero-animate delay-0 text-[13px] font-medium mb-6 text-accent uppercase tracking-widest">
              For platforms
            </p>

            <h1 className="hero-animate delay-1 text-[1.65rem] sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-tight text-vault-text mb-6">
              Yield API for fintechs
            </h1>

            <p className="hero-animate delay-2 text-[17px] text-vault-text-dim leading-relaxed mb-10 max-w-lg mx-auto">
              Let your users earn ~5.4% on idle balances. One integration.
              White-label ready. You earn fees on every dollar deployed.
            </p>

            <div className="hero-animate delay-3 flex justify-center mb-4">
              <PartnerWaitlistForm />
            </div>

            <p className="hero-animate delay-4 text-xs text-vault-muted mt-6">
              Preview — API in development
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={howRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                Three steps to embedded yield
              </h2>
            </div>

            <div className="vault-card p-8 sm:p-10">
              <div className="flex flex-col gap-10">
                {[
                  {
                    n: "1",
                    title: "Integrate",
                    desc: "Add a single API call to your deposit flow. Vault handles conversion, deployment, and settlement.",
                    icon: <Zap className="w-4.5 h-4.5" />,
                  },
                  {
                    n: "2",
                    title: "Users earn",
                    desc: "Your users' idle balances are deployed into vetted lending markets. Borrowers pay fees — those fees flow to your users automatically.",
                    icon: <TrendingUp className="w-4.5 h-4.5" />,
                  },
                  {
                    n: "3",
                    title: "You earn fees",
                    desc: "Vault shares revenue on every dollar deployed through your platform. The more your users earn, the more you earn.",
                    icon: <Layers className="w-4.5 h-4.5" />,
                  },
                ].map((step, i, arr) => (
                  <div key={step.n} className={`flex gap-5 items-start ${i < arr.length - 1 ? "step-connector" : ""}`}>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ background: "#0066FF" }}
                    >
                      {step.icon}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[15px] font-semibold text-vault-text mb-1.5">{step.title}</h3>
                      <p className="text-sm text-vault-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── VALUE PROPS ──────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={propsRef} className="reveal max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                Why partner with Vault
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Zap,
                  label: "One integration",
                  body: "Single API call to activate yield on idle balances. No infrastructure build required.",
                },
                {
                  icon: Layers,
                  label: "White-label ready",
                  body: "Users see your product — Vault handles the yield infrastructure behind the scenes.",
                },
                {
                  icon: TrendingUp,
                  label: "~5.4% current yield",
                  body: "Pass through real market rates from vetted lending markets. Rates are variable, not guaranteed.",
                },
                {
                  icon: Shield,
                  label: "Compliance handled",
                  body: "Vault is pursuing FSRA authorisation under ADGM. Regulatory infrastructure is built in.",
                },
              ].map((card) => (
                <div key={card.label} className="vault-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(0,102,255,0.1)] flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-vault-accent" />
                  </div>
                  <p className="text-[15px] font-semibold text-vault-text mt-3">{card.label}</p>
                  <p className="text-sm text-vault-muted leading-relaxed mt-2">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── API PREVIEW ──────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={apiRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">Integration preview</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                One call to deploy capital
              </h2>
            </div>

            <div className="vault-card overflow-hidden">
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wide"
                    style={{ background: "rgba(0,102,255,0.15)", color: "#0066FF" }}
                  >
                    POST
                  </span>
                  <span className="text-sm text-vault-text-dim font-mono">/api/v1/deposit</span>
                </div>
                <span
                  className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#6B7280" }}
                >
                  Preview
                </span>
              </div>

              <pre className="p-5 text-sm leading-relaxed overflow-x-auto" style={{ margin: 0, border: "none", borderRadius: 0, background: "transparent" }}>
                <code style={{ background: "none", padding: 0 }}>
{`curl -X POST https://api.vlt.money/v1/deposit \\
  -H "Authorization: Bearer vlt_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_abc123",
    "amount": 10000.00,
    "currency": "USD"
  }'`}
                </code>
              </pre>

              <div
                className="px-5 py-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <pre className="text-sm leading-relaxed overflow-x-auto" style={{ margin: 0, border: "none", borderRadius: 0, background: "transparent" }}>
                  <code style={{ background: "none", padding: 0, color: "#6B7280" }}>
{`// Response
{
  "id": "dep_xyz789",
  "status": "deployed",
  "amount": 10000.00,
  "estimated_apy": 0.054,
  "withdraw_available": true
}`}
                  </code>
                </pre>
              </div>
            </div>

            <p className="text-xs text-vault-muted text-center mt-4">
              Preview — API in development. Endpoints and schema may change.
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── CTA + CONTACT ────────────────────────────────────────── */}
        <section id="get-access" className="py-28 px-6 scroll-mt-16">
          <div ref={ctaRef} className="reveal max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight mb-4">
              Get early API access
            </h2>
            <p className="text-[17px] text-vault-muted mb-10 leading-relaxed">
              Idle balances are a missed feature. Let&apos;s add one to your product.
            </p>
            <div className="flex justify-center mb-8">
              <PartnerWaitlistForm />
            </div>
            <p className="text-sm text-vault-muted">
              Or reach out directly:{" "}
              <a
                href="mailto:hevar@vlt.money"
                className="font-semibold text-vault-text hover:text-vault-accent transition-colors"
              >
                hevar@vlt.money
              </a>
            </p>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <a href="/" className="flex items-center gap-2.5 no-underline">
              <VaultLogo size={20} />
              <span className="text-vault-text font-semibold text-sm tracking-tight">Vault</span>
            </a>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-[13px] text-vault-muted">Prometheus Labs — Abu Dhabi, UAE · Pursuing FSRA authorisation under ADGM</span>
              <div className="flex items-center gap-4 text-[13px] text-vault-muted">
                <a href="/privacy" className="hover:text-vault-text-dim transition-colors">Privacy</a>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <a href="/terms" className="hover:text-vault-text-dim transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-vault-muted/50 text-center max-w-2xl mx-auto leading-relaxed">
            Vault is a product of Prometheus Labs, incorporated in Abu Dhabi, UAE. Earnings are fees paid by borrowers for access to capital — not interest or guaranteed returns. Rates vary with market conditions.
          </p>
        </footer>
      </main>
    </>
  );
}
