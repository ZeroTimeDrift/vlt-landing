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
        <p className="text-xs text-white/20 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-white/40 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Overview</h2>
            <p>Vault is operated by Prometheus Labs, a financial technology company incorporated in Abu Dhabi, UAE. By using our website and services, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Waitlist</h2>
            <p>Signing up for the waitlist does not constitute a financial agreement. It registers your interest in early access to the Vault platform. There is no obligation or commitment on either side.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">No financial advice</h2>
            <p>Nothing on this website constitutes financial, investment, or legal advice. Vault earnings are variable and depend on market conditions. Past performance is not indicative of future results. Rates displayed are approximate and not guaranteed.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Risk disclosure</h2>
            <p>Depositing funds into lending markets involves risk, including the potential loss of principal. While Vault deploys funds only into audited, institutional-grade markets, no investment is without risk. You should only deposit funds you can afford to have at risk.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Intellectual property</h2>
            <p>All content on this website — including text, graphics, logos, and software — is the property of Prometheus Labs and protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Contact</h2>
            <p>Prometheus Labs — Abu Dhabi, UAE.<br />Email: hevar@vlt.money</p>
          </section>
        </div>
      </article>
    </main>
  );
}
