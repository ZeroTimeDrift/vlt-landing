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

// ── Partner Waitlist Form (Arabic) ───────────────────────────────────────────
function PartnerWaitlistFormAr() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("أدخل بريداً إلكترونياً صالحاً.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "partners:ar" }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setErrorMsg("حدث خطأ ما.");
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
        <span className="text-sm text-vault-text">أنت في القائمة. سنتواصل معك قريباً.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md" dir="rtl">
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
            direction: "ltr",
            textAlign: "left",
          }}
          aria-label="البريد الإلكتروني للعمل"
        />
        {status === "error" && (
          <p className="absolute -bottom-5 right-0 text-[11px] text-red-400">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-shrink-0 px-6 py-3 rounded-2xl text-sm btn-accent disabled:opacity-60"
      >
        {status === "loading" ? "جارٍ التسجيل…" : "احصل على وصول API المبكر"}
      </button>
    </form>
  );
}

// ── Partner Revenue Estimator (Arabic) ───────────────────────────────────────
const REV_SHARE_RATE = 0.10;
const YIELD_RATE = 0.054;

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function PartnerRevenueEstimatorAr() {
  const [users, setUsers] = useState(10000);
  const [avgBalance, setAvgBalance] = useState(500);

  const totalBalance = users * avgBalance;
  const userEarnings = totalBalance * YIELD_RATE;
  const platformEarnings = userEarnings * REV_SHARE_RATE;

  return (
    <div className="vault-card p-6 sm:p-8 mt-6">
      <p className="text-[11px] text-vault-muted font-medium uppercase tracking-[0.2em] mb-6">
        قدّر إمكانات أرباح منصّتك
      </p>

      {/* Sliders */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-vault-text-dim">المستخدمون النشطون شهرياً</label>
            <span className="text-sm font-bold text-vault-text tabular">{fmt(users)} مستخدم</span>
          </div>
          <input
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #0066FF ${((users - 1000) / (500000 - 1000)) * 100}%, rgba(255,255,255,0.1) ${((users - 1000) / (500000 - 1000)) * 100}%)` }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-vault-text-dim">متوسط الرصيد الخامل / مستخدم</label>
            <span className="text-sm font-bold text-vault-text tabular">${fmt(avgBalance)}</span>
          </div>
          <input
            type="range"
            min={100}
            max={10000}
            step={100}
            value={avgBalance}
            onChange={(e) => setAvgBalance(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #0066FF ${((avgBalance - 100) / (10000 - 100)) * 100}%, rgba(255,255,255,0.1) ${((avgBalance - 100) / (10000 - 100)) * 100}%)` }}
          />
        </div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-[11px] text-vault-muted font-medium uppercase tracking-[0.2em] mb-1">
            مستخدموك يكسبون
          </p>
          <p className="text-xs text-vault-muted mb-3">~5.4% حالياً</p>
          <p className="text-2xl sm:text-3xl font-bold text-vault-text tabular">
            ${fmt(userEarnings)}
          </p>
          <p className="text-xs text-vault-muted mt-1">/ سنوياً إجمالي</p>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(0,102,255,0.04)", border: "1px solid rgba(0,102,255,0.15)" }}
        >
          <p className="text-[11px] text-vault-accent font-medium uppercase tracking-[0.2em] mb-1">
            منصّتك تكسب
          </p>
          <p className="text-xs text-vault-muted mb-3">حصة الإيرادات</p>
          <p className="text-2xl sm:text-3xl font-bold text-vault-text tabular">
            ${fmt(platformEarnings)}
          </p>
          <p className="text-xs text-vault-muted mt-1">/ سنوياً</p>
        </div>
      </div>

      <p className="text-xs text-vault-muted text-center mb-4">
        بناءً على معدّل ~5.4% الحالي. حصة الإيرادات إرشادية — تواصل معنا للشروط الدقيقة. المعدّلات متغيّرة.
      </p>

      <div className="text-center">
        <a
          href="#get-access"
          className="text-sm text-vault-accent font-medium hover:text-vault-accent-light transition-colors"
        >
          مهتم بهذه الأرقام لمنصّتك؟ احصل على وصول API المبكر &darr;
        </a>
      </div>
    </div>
  );
}

// ── Partners Page (Arabic) ──────────────────────────────────────────────────
export default function PartnersPageAr() {
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
          <a href="/ar" className="flex items-center gap-2.5 no-underline">
            <VaultLogo size={24} />
            <span className="text-vault-text font-bold text-[15px] tracking-tight">Vault</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/ar" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">
              للأفراد
            </a>
            <a href="/partners" className="hidden md:inline text-sm text-vault-muted hover:text-vault-text-dim transition-colors">
              English
            </a>
            <a
              href="#get-access"
              className="px-4 py-2 rounded-2xl text-sm btn-accent"
            >
              احصل على وصول API المبكر
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="min-h-[80vh] flex items-center px-6 pt-20 pb-16 hero-grid">
          <div className="max-w-3xl mx-auto w-full text-center">
            <p className="hero-animate delay-0 text-[13px] font-medium mb-6 text-accent uppercase tracking-widest">
              للمنصّات
            </p>

            <h1 className="hero-animate delay-1 text-[1.65rem] sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-tight text-vault-text mb-6">
              واجهة أرباح للتكنولوجيا المالية
            </h1>

            <p className="hero-animate delay-2 text-[17px] text-vault-text-dim leading-relaxed mb-10 max-w-lg mx-auto">
              اجعل مستخدميك يكسبون ~5.4% على أرصدتهم الخاملة. تكامل واحد.
              جاهز للعلامة البيضاء. تكسب رسوماً على كل دولار يُنشر.
            </p>

            <div className="hero-animate delay-3 flex justify-center mb-4">
              <PartnerWaitlistFormAr />
            </div>

            <p className="hero-animate delay-4 text-xs text-vault-muted mt-6">
              معاينة — API قيد التطوير
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={howRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">كيف يعمل</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                ثلاث خطوات للأرباح المدمجة
              </h2>
            </div>

            <div className="vault-card p-8 sm:p-10">
              <div className="flex flex-col gap-10">
                {[
                  {
                    n: "1",
                    title: "ادمج",
                    desc: "أضف استدعاء API واحد لتدفق الإيداع. Vault يتولى التحويل والنشر والتسوية.",
                    icon: <Zap className="w-4 h-4" />,
                  },
                  {
                    n: "2",
                    title: "المستخدمون يكسبون",
                    desc: "أرصدة مستخدميك الخاملة تُنشر في أسواق إقراض موثّقة. المقترضون يدفعون رسوماً — هذه الرسوم تتدفق لمستخدميك تلقائياً.",
                    icon: <TrendingUp className="w-4 h-4" />,
                  },
                  {
                    n: "3",
                    title: "أنت تكسب رسوماً",
                    desc: "Vault يشارك الإيرادات على كل دولار يُنشر عبر منصّتك. كلما كسب مستخدموك أكثر، كسبت أنت أكثر.",
                    icon: <Layers className="w-4 h-4" />,
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
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── VALUE PROPS ──────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={propsRef} className="reveal max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                لماذا تشارك مع Vault
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Zap,
                  label: "تكامل واحد",
                  body: "استدعاء API واحد لتفعيل الأرباح على الأرصدة الخاملة. لا حاجة لبناء بنية تحتية.",
                },
                {
                  icon: Layers,
                  label: "جاهز للعلامة البيضاء",
                  body: "المستخدمون يرون منتجك — Vault يدير بنية الأرباح خلف الكواليس.",
                },
                {
                  icon: TrendingUp,
                  label: "~5.4% المعدّل الحالي",
                  body: "مرّر معدّلات السوق الحقيقية من أسواق إقراض موثّقة. المعدّلات متغيّرة، وليست مضمونة.",
                },
                {
                  icon: Shield,
                  label: "الامتثال مُتضمّن",
                  body: "يسعى Vault لترخيص FSRA تحت ADGM. البنية التنظيمية مدمجة.",
                },
              ].map((card) => (
                <div key={card.label} className="vault-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(0,102,255,0.1)] flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-vault-accent" />
                  </div>
                  <p className="text-[15px] font-bold text-vault-text mt-3">{card.label}</p>
                  <p className="text-sm text-vault-muted leading-relaxed mt-2">{card.body}</p>
                </div>
              ))}
            </div>

            <PartnerRevenueEstimatorAr />
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── API PREVIEW ──────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div ref={apiRef} className="reveal max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs text-vault-muted font-medium uppercase tracking-[0.2em] mb-4">معاينة التكامل</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
                استدعاء واحد لنشر رأس المال
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
                  style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}
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
              معاينة — API قيد التطوير. النقاط النهائية والمخطط قد يتغيران.
            </p>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ── CTA + CONTACT ────────────────────────────────────────── */}
        <section id="get-access" className="py-28 px-6 scroll-mt-16">
          <div ref={ctaRef} className="reveal max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight mb-4">
              احصل على وصول API المبكر
            </h2>
            <p className="text-[17px] text-vault-muted mb-10 leading-relaxed">
              الأرصدة الخاملة ميزة مفقودة. لنضفها إلى منتجك.
            </p>
            <div className="flex justify-center mb-8">
              <PartnerWaitlistFormAr />
            </div>
            <p className="text-sm text-vault-muted">
              أو تواصل معنا مباشرة:{" "}
              <a
                href="mailto:hevar@vlt.money"
                className="font-bold text-vault-text hover:text-vault-accent transition-colors"
              >
                hevar@vlt.money
              </a>
            </p>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <a href="/ar" className="flex items-center gap-2.5 no-underline">
              <VaultLogo size={20} />
              <span className="text-vault-text font-bold text-sm tracking-tight">Vault</span>
            </a>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[13px] text-white/40">Prometheus Labs — أبوظبي، الإمارات · نسعى لترخيص FSRA تحت ADGM</span>
              <div className="flex items-center gap-4 text-[13px] text-white/40">
                <a href="/ar/blog" className="hover:text-white/60 transition-colors">المدوّنة</a>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <a href="/ar/privacy" className="hover:text-white/60 transition-colors">الخصوصية</a>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                <a href="/ar/terms" className="hover:text-white/60 transition-colors">الشروط</a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-white/20 text-center max-w-2xl mx-auto leading-relaxed">
            Vault هو منتج من Prometheus Labs، المسجّلة في أبوظبي، الإمارات. الأرباح هي رسوم يدفعها المقترضون للوصول إلى رأس المال — وليست فوائد أو عوائد مضمونة. المعدّلات تتغيّر مع ظروف السوق.
          </p>
        </footer>
      </main>
    </>
  );
}
