import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Vault",
  description: "How Vault handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="relative z-10 min-h-screen px-6 pt-28 pb-20">
      <article className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-white/30 hover:text-white/50 transition-colors mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-xs text-vault-muted mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-sm text-vault-text-dim leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">What we collect</h2>
            <p>When you sign up for the Vault waitlist, we collect your email address and the referral source (if any). We do not collect payment information, identity documents, or browsing data at this stage.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">How we use it</h2>
            <p>Your email is used solely to notify you when Vault launches and to send product updates. We do not sell, rent, or share your email address with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Data storage</h2>
            <p>Waitlist data is stored securely via encrypted cloud infrastructure. We use industry-standard encryption in transit (TLS) and at rest.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">Your rights</h2>
            <p>You may request deletion of your data at any time by emailing us. We will remove your information within 30 days of receiving your request.</p>
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
