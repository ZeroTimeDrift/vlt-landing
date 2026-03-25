import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Vault",
  description: "Terms of service for Vault by Prometheus Labs.",
};

export default function TermsPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 pt-28 pb-20">
      <article className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-white/30 hover:text-white/50 transition-colors mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-xs text-vault-muted mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-vault-text-dim leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-base mb-3">Overview</h2>
            <p>Vault is operated by Prometheus Labs, a financial technology company incorporated in Abu Dhabi, UAE. By using our website and services, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">Waitlist</h2>
            <p>Signing up for the waitlist does not constitute a financial agreement. It registers your interest in early access to the Vault platform. There is no obligation or commitment on either side.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">No financial advice</h2>
            <p>Nothing on this website constitutes financial, investment, or legal advice. Vault earnings are variable and depend on market conditions. Past performance is not indicative of future results. Rates displayed are approximate and not guaranteed.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">Risk disclosure</h2>
            <p>Depositing funds into lending markets involves risk, including the potential loss of principal. While Vault deploys funds only into audited, institutional-grade markets, no investment is without risk. You should only deposit funds you can afford to have at risk.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">Intellectual property</h2>
            <p>All content on this website — including text, graphics, logos, and software — is the property of Prometheus Labs and protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">Contact</h2>
            <p>Prometheus Labs — Abu Dhabi, UAE.<br />Email: hevar@vlt.money</p>
          </section>
        </div>
      </article>

      <footer className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <svg width={20} height={20} viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="#0066FF" /><circle cx="16" cy="16" r="7.5" stroke="white" strokeWidth="1.8" fill="none" /><circle cx="16" cy="16" r="2.5" fill="white" /><line x1="16" y1="8.5" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="16" y1="21" x2="16" y2="23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="8.5" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="21" y1="16" x2="23.5" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span className="text-white font-bold text-sm tracking-tight">Vault</span>
          </a>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <span className="text-[13px] text-white/40">Prometheus Labs — Abu Dhabi, UAE · Pursuing FSRA authorisation under ADGM</span>
            <div className="flex items-center gap-4 text-[13px] text-white/40">
              <a href="/blog" className="hover:text-white/60 transition-colors">Blog</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-white/20 text-center max-w-2xl mx-auto leading-relaxed">
          Vault is a product of Prometheus Labs, incorporated in Abu Dhabi, UAE. Earnings are fees paid by borrowers for access to capital — not interest or guaranteed returns. Rates vary with market conditions.
        </p>
      </footer>
    </main>
  );
}
