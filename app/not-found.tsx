import Link from "next/link";

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

export default function NotFound() {
  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(2,8,16,0.80)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline">
            <VaultLogo size={24} />
            <span className="text-white font-bold text-[15px]">Vault</span>
          </a>
          <a href="/#waitlist" className="px-4 py-2 rounded-2xl text-sm btn-accent">
            Get Early Access
          </a>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center px-6 pt-14">
        <div className="text-center max-w-sm">
          <div
            className="text-[160px] font-bold leading-none select-none mb-2"
            style={{ color: "rgba(255,255,255,0.03)" }}
          >
            404
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            Page not found
          </h1>

          <p className="text-vault-text-dim text-[16px] mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-2xl text-sm font-bold text-white btn-accent"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </>
  );
}
