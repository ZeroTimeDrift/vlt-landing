"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TrendingUp, ArrowDownLeft, ArrowUpRight } from "lucide-react";

// ── Hooks ────────────────────────────────────────────────────────────────────
function useWaitlistCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => { if (d.count > 0) setCount(d.count); })
      .catch(() => {});
  }, []);
  return count;
}

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

// ── Vault Logo ────────────────────────────────────────────────────────────────
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

// ── Live Balance Card (matches app design exactly) ────────────────────────────
function LiveBalanceCard() {
  const BASE = 10_432.67;
  const [balance, setBalance] = useState(BASE);
  const [totalEarned, setTotalEarned] = useState(12.84);
  const [flash, setFlash] = useState(false);
  const APY = 5.42;

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = 0.01 + Math.random() * 0.03;
      setBalance((prev) => Math.round((prev + delta) * 100) / 100);
      setTotalEarned((prev) => Math.round((prev + delta) * 10000) / 10000);
      setFlash(true);
      setTimeout(() => setFlash(false), 700);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const dollars = Math.floor(balance);
  const cents = String(Math.round((balance - dollars) * 100)).padStart(2, "0");

  return (
    <div className="vault-card glow-accent p-6 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <VaultLogo size={20} />
          <span className="text-vault-text-dim text-xs font-medium uppercase tracking-wider">Your Vault</span>
        </div>
        <span
          className="text-[10px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5"
          style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
          Active
        </span>
      </div>

      {/* Balance */}
      <div className="mb-6">
        <p className="text-xs text-vault-muted mb-2">Total balance</p>
        <div className="flex items-baseline gap-1">
          <span className="text-vault-text-dim text-lg font-medium">$</span>
          <span className="text-5xl font-bold tabular tracking-tight text-vault-text">
            {dollars.toLocaleString()}
          </span>
          <span className="text-xl font-semibold tabular text-vault-text-dim">.{cents}</span>
        </div>

        {/* APY badge */}
        <div className="flex items-center gap-2 mt-3">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
          >
            <TrendingUp className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
            <span className="text-sm font-semibold tabular" style={{ color: "#10B981" }}>
              {APY.toFixed(2)}% APY
            </span>
          </div>
          <span className="text-xs text-vault-muted">via vetted markets</span>
        </div>
      </div>

      {/* Stats */}
      <div
        className={`grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl transition-all duration-500`}
        style={{
          background: flash ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${flash ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <div>
          <p className="text-xs text-vault-muted mb-1">Total earned</p>
          <p
            className={`text-sm font-semibold tabular transition-colors duration-300`}
            style={{ color: flash ? "#10B981" : "#34D399" }}
          >
            +${totalEarned.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-vault-muted mb-1">Earning since</p>
          <p className="text-sm font-medium text-vault-text-dim">Today</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 btn-accent py-3 rounded-xl text-sm">
          <ArrowDownLeft className="w-4 h-4" />
          Deposit
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 border border-vault-border text-vault-text-dim py-3 rounded-xl text-sm font-semibold transition-colors hover:border-vault-accent/40 hover:text-vault-accent-light"
        >
          <ArrowUpRight className="w-4 h-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
}

// ── Waitlist Form ─────────────────────────────────────────────────────────────
function WaitlistForm({ id, compact = false }: { id?: string; compact?: boolean }) {
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
      const params = new URLSearchParams(window.location.search);
      const utm = params.get("utm_source") || params.get("ref") || "";
      const source = utm ? `${id || "hero"}:${utm}` : id || "hero";
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong.");
      setStatus("error");
    }
  }, [email, id]);

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
        <span className="text-sm text-vault-text">You&apos;re on the list. We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${compact ? "gap-2" : "flex-col sm:flex-row gap-3"} w-full max-w-md`}>
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          placeholder="you@email.com"
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-xl text-vault-text placeholder-vault-muted text-sm outline-none transition-all disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${status === "error" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
          }}
          aria-label="Email address"
        />
        {status === "error" && (
          <p className="absolute -bottom-5 left-0 text-[11px] text-red-400">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-shrink-0 px-6 py-3 rounded-xl text-sm btn-accent disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime?: string;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ClientHome({ blogPosts = [] }: { blogPosts?: BlogPostData[] }) {
  const waitlistCount = useWaitlistCount();
  const howRef = useReveal<HTMLDivElement>();
  const compareRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>();
  const blogRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <VaultLogo size={24} />
            <span className="text-vault-text font-semibold text-[15px] tracking-tight">Vault</span>
          </div>
          <a
            href="#waitlist"
            className="px-4 py-2 rounded-lg text-sm btn-accent"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          id="waitlist"
          className="min-h-screen flex items-center px-6 pt-20 pb-16 bg-vault-hero"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Left: Copy + Form */}
              <div className="flex-1 text-center lg:text-left">
                <p className="hero-animate delay-0 text-[13px] font-medium mb-6 text-accent uppercase tracking-widest">
                  Early access · Now open
                </p>

                <h1 className="hero-animate delay-1 text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-tight text-vault-text mb-6">
                  Your savings account
                  <br />
                  earns 0.5%.
                  <br />
                  <span style={{ color: "#0066FF" }}>Yours could earn&nbsp;~5.4%.</span>
                </h1>

                <p className="hero-animate delay-2 text-[17px] text-vault-text-dim leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                  Vault puts your money to work in vetted lending markets.
                  Borrowers pay fees — you keep them. Withdraw anytime.
                </p>

                <div className="hero-animate delay-3 flex justify-center lg:justify-start mb-6">
                  <WaitlistForm id="hero" />
                </div>

                <div className="hero-animate delay-4 flex items-center justify-center lg:justify-start gap-5 text-xs text-vault-muted flex-wrap">
                  <span>No minimum deposit</span>
                  <span className="text-vault-border">·</span>
                  <span>Withdraw anytime</span>
                  <span className="text-vault-border">·</span>
                  <span>ADGM regulation in progress</span>
                  {waitlistCount > 0 && (
                    <>
                      <span className="text-vault-border">·</span>
                      <span>{waitlistCount.toLocaleString()}+ on waitlist</span>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Live Balance Card */}
              <div className="card-animate delay-card flex-shrink-0 w-full max-w-sm">
                <LiveBalanceCard />
              </div>

            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={howRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                Three steps. That&apos;s it.
              </h2>
            </div>

            <div className="vault-card p-8 sm:p-10 mb-6">
              <div className="flex flex-col gap-10">
                {[
                  {
                    n: "1",
                    title: "Connect your bank",
                    desc: "Link your bank account. Deposit in USD, AED, or any major currency. No minimum.",
                  },
                  {
                    n: "2",
                    title: "Your balance earns automatically",
                    desc: "Your money goes into vetted lending markets. Borrowers pay fees to access it — those fees flow directly to your balance. ~5.4% currently.",
                  },
                  {
                    n: "3",
                    title: "Withdraw anytime",
                    desc: "Pull your full balance plus earnings within 24 hours. No lock-ups, no penalties.",
                  },
                ].map((step, i, arr) => (
                  <div key={step.n} className={`flex gap-5 items-start ${i < arr.length - 1 ? "step-connector" : ""}`}>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "#0066FF" }}
                    >
                      {step.n}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[15px] font-semibold text-vault-text mb-1.5">{step.title}</h3>
                      <p className="text-sm text-vault-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Fees, not interest",
                  body: "Your earnings come from real borrowers paying fees to access capital — not interest manufactured by Vault. Rates are variable because they reflect real market activity.",
                },
                {
                  label: "Completely hands-off",
                  body: "No technical setup required. Your balance is always shown in your local currency. Vault handles everything.",
                },
              ].map((item) => (
                <div key={item.label} className="vault-card p-6">
                  <p className="text-xs text-vault-muted font-medium uppercase tracking-wide mb-3">{item.label}</p>
                  <p className="text-sm text-vault-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── COMPARISON ───────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={compareRef} className="reveal max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                Your bank earns more from your money than it pays you.
              </h2>
            </div>

            <div className="vault-card overflow-hidden mb-4">
              <div
                className="grid grid-cols-3 py-3.5 px-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div />
                <div className="text-center text-[11px] text-vault-muted font-medium uppercase tracking-wider">Traditional bank</div>
                <div className="text-center text-[11px] font-medium uppercase tracking-wider" style={{ color: "#0066FF" }}>Vault</div>
              </div>
              {[
                { label: "Returns",    bank: "~0.5% per year",  vault: "~5.4% current",     win: true },
                { label: "Access",     bank: "Limited",          vault: "Withdraw anytime", win: true },
                { label: "Minimum",    bank: "Often $1,000+",   vault: "No minimum",       win: true },
                { label: "Complexity", bank: "Simple",           vault: "Simple",            win: false },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 px-6 py-4"
                  style={i < 3 ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : undefined}
                >
                  <span className="text-sm text-vault-text-dim font-medium">{row.label}</span>
                  <span className="text-center text-sm text-vault-muted">{row.bank}</span>
                  <span
                    className="text-center text-sm font-semibold"
                    style={row.win ? { color: "#10B981" } : undefined}
                  >
                    {row.win ? `✓ ${row.vault}` : row.vault}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-vault-muted text-center">
              ~5.4% is current, not guaranteed. Earnings vary with market activity.
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={faqRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">Common questions</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                You should ask these
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  q: "Is my money safe?",
                  a: "Your funds are deployed into independently audited lending markets with strong collateral requirements and proven track records. Vault never holds your principal — you maintain control at all times.",
                },
                {
                  q: "How does Vault make money?",
                  a: "Vault charges a small platform fee on your earnings. We only make money when you do.",
                },
                {
                  q: "What if I want my money back?",
                  a: "Withdraw your full balance plus earnings within 24 hours. No penalties, no lock-ups, no questions asked.",
                },
                {
                  q: "Are the rates guaranteed?",
                  a: "No. Rates are variable because they reflect real market activity — borrowers paying fees for access to capital. Current rate is approximately 5.4%, but it fluctuates with demand.",
                },
              ].map((item) => (
                <div key={item.q} className="vault-card p-6">
                  <h3 className="text-[15px] font-semibold text-vault-text mb-2">{item.q}</h3>
                  <p className="text-sm text-vault-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── BLOG ───────────────────────────────────────────────────── */}
        {blogPosts.length > 0 && (
          <>
            <section className="py-28 px-6">
              <div ref={blogRef} className="reveal max-w-4xl mx-auto">
                <div className="text-center mb-14">
                  <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">From the team</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                    Think clearer about your money
                  </h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {blogPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="vault-card p-6 flex flex-col no-underline group"
                      style={{ textDecoration: "none" }}
                    >
                      <h3 className="text-[15px] font-semibold text-vault-text mb-2 leading-snug group-hover:text-white transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-vault-muted leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-vault-muted">
                        {post.date && (
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        {post.readingTime && (
                          <>
                            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                            <span>{post.readingTime}</span>
                          </>
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <a
                    href="/blog"
                    className="text-sm font-medium transition-colors hover:text-white"
                    style={{ color: "#0066FF" }}
                  >
                    See all posts →
                  </a>
                </div>
              </div>
            </section>

            <div className="section-divider max-w-5xl mx-auto" />
          </>
        )}

        {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={ctaRef} className="reveal max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight mb-4">
              Start earning more on your savings.
            </h2>
            <p className="text-[17px] text-vault-muted mb-10 leading-relaxed">
              Join the waitlist. No commitment, no minimum, no lock-ups.
            </p>
            <div className="flex justify-center">
              <WaitlistForm id="bottom" />
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <VaultLogo size={20} />
              <span className="text-vault-text font-semibold text-sm tracking-tight">Vault</span>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-[13px] text-vault-muted">Prometheus Labs · Abu Dhabi, UAE · Pursuing ADGM regulation</span>
              <div className="flex items-center gap-4 text-[13px] text-vault-muted">
                <a href="/privacy" className="hover:text-vault-text-dim transition-colors">Privacy</a>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <a href="/terms" className="hover:text-vault-text-dim transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-vault-muted/50 text-center max-w-2xl mx-auto leading-relaxed">
            Vault earnings are fees paid by borrowers for access to capital — not interest or guaranteed returns. Rates vary with market conditions.
          </p>
        </footer>
      </main>
    </>
  );
}
