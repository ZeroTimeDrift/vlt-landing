"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import { TrendingUp, ArrowDownLeft, ArrowUpRight, ArrowRight, Landmark, Wallet, Shield, Scale, Building2, Clock, Zap, Layers } from "lucide-react";

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
function LiveBalanceCard({ compact = false }: { compact?: boolean }) {
  const [earned, setEarned] = useState(0);
  const DAILY_EARN = 12450 * 0.054 / 365;
  const TICK_SEC = 3;
  const TICK_AMOUNT = DAILY_EARN / 86400 * TICK_SEC;

  useEffect(() => {
    const id = setInterval(() => {
      setEarned(prev => prev + TICK_AMOUNT);
    }, TICK_SEC * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`vault-card w-full ${compact ? "p-4" : "p-6 max-w-sm"}`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${compact ? "mb-4" : "mb-6"}`}>
        <div className="flex items-center gap-2">
          <VaultLogo size={compact ? 16 : 20} />
          <span className={`text-vault-text-dim font-medium uppercase tracking-wider ${compact ? "text-[10px]" : "text-xs"}`}>Your Vault</span>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${compact ? "text-[9px]" : "text-[10px]"}`}
          style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
          Active
        </span>
      </div>

      {/* Balance */}
      <div className={compact ? "mb-4" : "mb-6"}>
        <p className={`text-vault-muted ${compact ? "text-[10px] mb-1.5" : "text-xs mb-2"}`}>Total balance</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-vault-text-dim font-medium ${compact ? "text-sm" : "text-lg"}`}>$</span>
          <span className={`font-bold tabular tracking-tight text-vault-text ${compact ? "text-3xl" : "text-5xl"}`}>
            12,450
          </span>
          <span className={`font-bold tabular text-vault-text-dim ${compact ? "text-sm" : "text-xl"}`}>.00</span>
        </div>

        {/* Earned today ticker */}
        <div className={compact ? "mt-2" : "mt-3"}>
          <p className={`text-vault-muted ${compact ? "text-[10px]" : "text-xs"}`}>Earned today</p>
          <span className={`font-semibold tabular ${compact ? "text-xs" : "text-sm"}`} style={{ color: "#10B981" }}>
            ${earned.toFixed(4)}
          </span>
        </div>

        {/* APY badge */}
        <div className={`flex items-center gap-2 ${compact ? "mt-2" : "mt-3"}`}>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
          >
            <TrendingUp className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} style={{ color: "#10B981" }} />
            <span className={`font-bold tabular ${compact ? "text-xs" : "text-sm"}`} style={{ color: "#10B981" }}>
              ~5.4% current
            </span>
          </div>
          {!compact && <span className="text-xs text-vault-muted">via vetted markets</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className={`flex-1 flex items-center justify-center gap-2 btn-accent rounded-2xl text-sm ${compact ? "py-2.5" : "py-3"}`}>
          <ArrowDownLeft className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
          Deposit
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 border rounded-2xl text-sm font-bold transition-colors hover:border-vault-accent/40 hover:text-vault-accent-light ${compact ? "py-2.5" : "py-3"}`}
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#9CA3AF" }}
        >
          <ArrowUpRight className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
          Withdraw
        </button>
      </div>
    </div>
  );
}

// ── Savings Calculator ────────────────────────────────────────────────────────
const CURRENCY_CONFIG = {
  AED: { prefix: "AED ", min: 5000, max: 1800000, step: 5000, defaultVal: 180000, bankRate: 0.02, bankLabel: "~2% UAE bank" },
  USD: { prefix: "$", min: 1000, max: 500000, step: 1000, defaultVal: 50000, bankRate: 0.015, bankLabel: "~1.5% rate" },
} as const;

function SavingsCalculator() {
  const [currency, setCurrency] = useState<"AED" | "USD">("AED");
  const cfg = CURRENCY_CONFIG[currency];
  const [balance, setBalance] = useState<number>(cfg.defaultVal);
  const [animatedVault, setAnimatedVault] = useState(0);
  const hasAnimated = useRef(false);

  const VAULT_RATE = 0.054;
  const bankEarnings = Math.round(balance * cfg.bankRate);
  const vaultEarnings = Math.round(balance * VAULT_RATE);
  const delta = vaultEarnings - bankEarnings;

  const fmt = (n: number) => n.toLocaleString("en-US");

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const target = Math.round(CURRENCY_CONFIG.AED.defaultVal * VAULT_RATE);
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimatedVault(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleCurrencyChange = (next: "AED" | "USD") => {
    if (next === currency) return;
    setCurrency(next);
    setBalance(CURRENCY_CONFIG[next].defaultVal);
  };

  const isDefaultBalance = currency === "AED" && balance === CURRENCY_CONFIG.AED.defaultVal;
  const displayVault = hasAnimated.current && isDefaultBalance ? animatedVault : vaultEarnings;
  const sliderPct = ((balance - cfg.min) / (cfg.max - cfg.min)) * 100;

  return (
    <div className="vault-card p-6 sm:p-8 mt-6">
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <p className="text-xs text-vault-muted uppercase tracking-[0.15em]">My savings balance</p>
          <div className="flex rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px" }}>
            {(["AED", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => handleCurrencyChange(c)}
                className="text-xs font-semibold rounded-full transition-colors"
                style={{
                  padding: "4px 12px",
                  background: currency === c ? "#0066FF" : "rgba(255,255,255,0.05)",
                  color: currency === c ? "#FFFFFF" : "#9CA3AF",
                  border: currency === c ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="text-2xl font-bold text-vault-text tabular">{cfg.prefix}{fmt(balance)}</p>
      </div>

      <input
        type="range"
        min={cfg.min}
        max={cfg.max}
        step={cfg.step}
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer mb-1"
        style={{
          background: `linear-gradient(to right, #0066FF ${sliderPct}%, rgba(255,255,255,0.1) ${sliderPct}%)`,
        }}
      />
      <div className="flex justify-between text-[11px] text-vault-muted mb-6">
        <span>{cfg.prefix}{fmt(cfg.min)}</span>
        <span>{cfg.prefix}{fmt(cfg.max)}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[11px] text-vault-muted uppercase tracking-wider">Traditional bank</p>
          <p className="text-xs text-vault-muted mt-1">{cfg.bankLabel}</p>
          <p className="text-3xl font-bold tabular text-vault-text-dim mt-3">
            {cfg.prefix}{fmt(bankEarnings)} <span className="text-sm font-medium text-vault-muted">/ yr</span>
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: "rgba(0,102,255,0.04)", border: "1px solid rgba(0,102,255,0.15)" }}>
          <p className="text-[11px] text-vault-accent uppercase tracking-wider">Vault</p>
          <p className="text-xs text-vault-muted mt-1">~5.4% current</p>
          <p className="text-3xl font-bold tabular text-vault-text mt-3">
            {cfg.prefix}{fmt(isDefaultBalance ? displayVault : vaultEarnings)} <span className="text-sm font-medium text-vault-muted">/ yr</span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-vault-muted">
        You could earn <span className="font-bold" style={{ color: "#10B981" }}>{cfg.prefix}{fmt(delta)}</span> more per year with Vault
      </p>
    </div>
  );
}

// ── Waitlist Form ─────────────────────────────────────────────────────────────
function WaitlistForm({ id, compact = false, onSuccess }: { id?: string; compact?: boolean; onSuccess?: () => void }) {
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
      onSuccess?.();
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
        className="flex-shrink-0 px-6 py-3 rounded-2xl text-sm btn-accent disabled:opacity-60"
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
  heroImage?: string;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
// ── Social Proof Strip ────────────────────────────────────────────────────────
function SocialProofStrip({ joined = false }: { joined?: boolean }) {
  const avatarStyles: CSSProperties[] = [
    { background: "linear-gradient(135deg, #0066FF, #3385FF)", zIndex: 3 },
    { background: "linear-gradient(135deg, #10B981, #059669)", zIndex: 2, marginLeft: -8 },
    { background: "linear-gradient(135deg, #6366F1, #4F46E5)", zIndex: 1, marginLeft: -8 },
  ];
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center">
        {avatarStyles.map((style, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "1.5px solid #0F1117",
              flexShrink: 0,
              position: "relative",
              ...style,
            }}
          />
        ))}
      </div>
      <span className="text-[13px] font-medium" style={{ color: "#9CA3AF" }}>
        {joined ? (
          <>You&apos;re in — along with <span style={{ color: "#FFFFFF" }}>1,200+</span> others.</>
        ) : (
          <><span style={{ color: "#FFFFFF" }}>+1,200</span> people already on the waitlist</>
        )}
      </span>
    </div>
  );
}

export default function ClientHome({ blogPosts = [] }: { blogPosts?: BlogPostData[] }) {
  const [heroJoined, setHeroJoined] = useState(false);
  const trustRef = useReveal<HTMLDivElement>();
  const howRef = useReveal<HTMLDivElement>();
  const compareRef = useReveal<HTMLDivElement>();
  const b2bRef = useReveal<HTMLDivElement>();
  const faqRef = useReveal<HTMLDivElement>();
  const blogRef = useReveal<HTMLDivElement>();
  const founderRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────────────────── */}
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
          <div className="flex items-center gap-2.5">
            <VaultLogo size={24} />
            <span className="text-vault-text font-bold text-[15px] tracking-tight">Vault</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">How it works</a>
            <a href="#faq" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">FAQ</a>
            <a href="/blog" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">Blog</a>
            <a
              href="#waitlist"
              className="px-4 py-2 rounded-2xl text-sm btn-accent"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          id="waitlist"
          className="min-h-screen flex items-center px-6 pt-20 pb-16 hero-grid"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Left: Copy + Form */}
              <div className="flex-1 text-center lg:text-left">
                <p className="hero-animate delay-0 text-[13px] font-medium mb-6 text-accent uppercase tracking-widest">
                  Early access · Now open
                </p>

                <h1 className="hero-animate delay-1 text-[1.65rem] sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-tight text-vault-text mb-6 break-words">
                  Your savings account
                  <br />
                  earns 1–2%.
                  <br />
                  <span style={{ color: "#0066FF" }}>Yours could earn ~5.4%.</span>
                </h1>

                <p className="hero-animate delay-2 text-[17px] text-vault-text-dim leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                  Vault puts your money to work in vetted lending markets.
                  Borrowers pay fees to access capital. You keep those fees. Withdraw anytime.
                </p>

                <div className="hero-animate delay-3 flex justify-center lg:justify-start mb-4">
                  <SocialProofStrip joined={heroJoined} />
                </div>

                <div className="hero-animate delay-3 flex justify-center lg:justify-start mb-6">
                  <WaitlistForm id="hero" onSuccess={() => setHeroJoined(true)} />
                </div>

                <div className="hero-animate delay-4 flex items-center justify-center lg:justify-start gap-5 text-xs text-vault-muted flex-wrap">
                  <span>No minimum deposit</span>
                  <span className="text-vault-muted">·</span>
                  <span>Withdraw anytime</span>
                </div>
              </div>

              {/* Right: Phone Frame + LiveBalanceCard */}
              <div className="card-animate delay-card flex-shrink-0 w-full max-w-sm">
                {/* Phone mockup with LiveBalanceCard — desktop */}
                <div className="hidden lg:block">
                  <div
                    className="relative mx-auto overflow-hidden"
                    style={{ width: 280, height: 560, borderRadius: 40, background: "#0F1117" }}
                  >
                    {/* LiveBalanceCard inside phone frame */}
                    <div className="absolute inset-0 flex items-center justify-center p-4" style={{ zIndex: 0 }}>
                      <LiveBalanceCard compact />
                    </div>
                    {/* Phone frame overlay */}
                    <svg
                      viewBox="0 0 280 560"
                      fill="none"
                      className="absolute inset-0 w-full h-full"
                      style={{ zIndex: 1, pointerEvents: "none" }}
                    >
                      <rect x="2" y="2" width="276" height="556" rx="38" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
                      <rect x="104" y="12" width="72" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
                    </svg>
                  </div>
                </div>
                {/* LiveBalanceCard on mobile and tablet */}
                <div className="lg:hidden">
                  <LiveBalanceCard />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TRUST BAR ────────────────────────────────────────────────── */}
        <section className="py-10 px-6">
          <div ref={trustRef} className="reveal max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Shield className="w-5 h-5 text-vault-accent" />,
                label: "Your money, your control",
                desc: "Vault never holds your funds",
              },
              {
                icon: <Scale className="w-5 h-5 text-vault-accent" />,
                label: "Pursuing ADGM regulation",
                desc: "USDC, our on-ramp currency, is already ADGM-licensed",
              },
              {
                icon: <Building2 className="w-5 h-5 text-vault-accent" />,
                label: "Institutional-grade infrastructure",
                desc: "Vetted institutional lending markets",
              },
              {
                icon: <Clock className="w-5 h-5 text-vault-accent" />,
                label: "Withdraw anytime",
                desc: "No lock-ups, 24-hour access",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="vault-card flex flex-col items-center text-center gap-2 py-4 px-3"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "rgba(0,102,255,0.1)" }}>
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-vault-text">{item.label}</p>
                <p className="text-xs text-vault-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-28 px-6 scroll-mt-16">
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
                    desc: "Link your bank account. Deposit in USD or any major currency. No minimum.",
                    icon: <Landmark className="w-4 h-4" />,
                  },
                  {
                    n: "2",
                    title: "Your balance earns automatically",
                    desc: "Your money goes into vetted, overcollateralised lending markets. Institutional borrowers pay fees to access capital — those fees flow directly to your balance. ~5.4% currently.",
                    icon: <TrendingUp className="w-4 h-4" />,
                  },
                  {
                    n: "3",
                    title: "Withdraw anytime",
                    desc: "Pull your full balance plus earnings within 24 hours. No lock-ups, no penalties.",
                    icon: <Wallet className="w-4 h-4" />,
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
                      <h3 className="text-[15px] font-bold text-vault-text mb-1.5">{step.title}</h3>
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
                { label: "Returns",    bank: "~1–2% per year",   vault: "~5.4% current",     win: true },
                { label: "Access",     bank: "Limited",          vault: "Withdraw anytime", win: true },
                { label: "Minimum",    bank: "Often $1,000+",   vault: "No minimum",       win: true },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 px-6 py-4"
                  style={i < arr.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.08)" } : undefined}
                >
                  <span className="text-sm text-vault-text-dim font-medium">{row.label}</span>
                  <span className="text-center text-sm text-vault-muted">{row.bank}</span>
                  <span
                    className="text-center text-sm font-bold"
                    style={row.win ? { color: "#10B981" } : undefined}
                  >
                    {row.win ? `✓ ${row.vault}` : row.vault}
                  </span>
                </div>
              ))}
            </div>
            <SavingsCalculator />
            <p className="text-xs text-vault-muted text-center mt-2">
              ~5.4% is current, not guaranteed. Earnings vary with market activity.
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── FOR PLATFORMS (B2B) ────────────────────────────────────── */}
        <section id="for-platforms" className="py-28 px-6">
          <div ref={b2bRef} className="reveal max-w-4xl mx-auto text-center">
            <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">For platforms</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
              One API. Your users earn ~5.4%.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {[
                {
                  icon: Zap,
                  label: "One integration",
                  body: "Single API call to activate yield on idle balances. No infrastructure build required.",
                },
                {
                  icon: Layers,
                  label: "Your brand, our rails",
                  body: "White-label ready. Users see your product — Vault handles the yield infrastructure.",
                },
                {
                  icon: TrendingUp,
                  label: "~5.4% current yield",
                  body: "Pass through real market rates. We earn only when your users earn.",
                },
              ].map((card) => (
                <div key={card.label} className="vault-card p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(0,102,255,0.1)] flex items-center justify-center mx-auto mb-3">
                    <card.icon className="w-5 h-5 text-vault-accent" />
                  </div>
                  <p className="text-[15px] font-bold text-vault-text mt-3">{card.label}</p>
                  <p className="text-sm text-vault-muted leading-relaxed mt-2">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-vault-muted mb-5">
                Idle balances are a missed feature. Let&apos;s add one to your product.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm btn-accent"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:hevar@vlt.money"
                  className="text-sm font-medium text-vault-muted hover:text-vault-text-dim transition-colors"
                >
                  hevar@vlt.money
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="py-28 px-6 scroll-mt-16">
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
                  a: "Your funds are deployed into established, audited lending markets with collateral requirements and institutional borrowers. Vault never takes custody of your balance — you maintain the right to withdraw at all times.",
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
                  <h3 className="text-[15px] font-bold text-vault-text mb-2">{item.q}</h3>
                  <p className="text-sm text-vault-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── FOUNDER ────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={founderRef} className="reveal max-w-lg mx-auto">
            <div className="vault-card p-8 text-center">
              <p className="text-lg font-bold text-vault-text mb-2">Hevar</p>
              <p className="text-sm text-vault-muted leading-relaxed mb-4">
                Building Vault to close the savings gap for UAE and the world.
              </p>
              <a
                href="https://linkedin.com/in/ZeroTimeDrift"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-vault-muted hover:text-vault-text-dim transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
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
                      className="vault-card overflow-hidden flex flex-col no-underline group"
                      style={{ textDecoration: "none" }}
                    >
                      {post.heroImage && (
                        <div className="w-full h-40 overflow-hidden">
                          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[15px] font-bold text-vault-text mb-2 leading-snug group-hover:text-white transition-colors">
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
              <span className="text-vault-text font-bold text-sm tracking-tight">Vault</span>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-[13px] text-vault-muted">Prometheus Labs — Abu Dhabi, UAE · Pursuing FSRA authorisation under ADGM</span>
              <div className="flex items-center gap-4 text-[13px] text-vault-muted">
                <a href="/blog" className="hover:text-vault-text-dim transition-colors">Blog</a>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
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
