"use client";

import { useState, useCallback, useEffect } from "react";
import { ar } from "@/lib/i18n/ar";

export default function WaitlistFormAr({
  id,
  compact = false,
  onSuccess,
}: {
  id?: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === "success") {
      fetch("/api/waitlist/count")
        .then((r) => r.json())
        .then((d) => setWaitlistCount(d.count))
        .catch(() => {});
    }
  }, [status]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMsg(ar.formError);
        setStatus("error");
        return;
      }
      setStatus("loading");
      setErrorMsg("");
      try {
        const params = new URLSearchParams(window.location.search);
        const utm = params.get("utm_source") || params.get("ref") || "";
        const source = utm ? `${id || "hero"}:${utm}:ar` : `${id || "hero"}:ar`;
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source }),
        });
        if (!res.ok) throw new Error("fail");
        setStatus("success");
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "waitlist_signup", {
            source,
            referrer: document.referrer || "(direct)",
            locale: "ar",
          });
        }
        onSuccess?.();
      } catch {
        setErrorMsg(ar.formGenericError);
        setStatus("error");
      }
    },
    [email, id, onSuccess],
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://vlt.money");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = "https://vlt.money";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (status === "success") {
    const whatsappText = encodeURIComponent(
      "وجدت طريقة لكسب ~5.4% على مدّخراتك في الإمارات — بدون تجميد. vlt.money \u{1F512}"
    );

    return (
      <div className="w-full max-w-md">
        <div
          className="flex items-center gap-3 px-5 py-3.5 rounded-xl w-full"
          style={{
            background: "rgba(0,102,255,0.08)",
            border: "1px solid rgba(0,102,255,0.2)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#0066FF" />
            <path
              d="M5 8l2.5 2.5L11 6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-vault-text">
            {ar.formSuccess}
          </span>
        </div>

        {waitlistCount !== null && waitlistCount >= 50 && (
          <div className="mt-3" dir="rtl">
            <p className="text-[12px] text-vault-muted mb-2">
              تعرف أحداً بمدّخرات عالقة في 2%؟
            </p>
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] text-white/60 hover:text-white transition-colors no-underline"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                واتساب
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("وجدت طريقة لكسب ~5.4% على مدّخراتك في الإمارات — بدون تجميد. vlt.money")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] text-white/60 hover:text-white transition-colors no-underline"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                نشر
              </a>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] text-white/60 hover:text-white transition-colors cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
                {copied ? "تم النسخ!" : "نسخ الرابط"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${compact ? "gap-2" : "flex-col sm:flex-row gap-3"} w-full max-w-md`}
      dir="rtl"
    >
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={ar.formPlaceholder}
          disabled={status === "loading"}
          className="w-full px-4 py-3 rounded-xl text-vault-text placeholder-vault-muted text-sm outline-none transition-all disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${status === "error" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
            direction: "ltr",
            textAlign: "left",
          }}
          aria-label="البريد الإلكتروني"
        />
        {status === "error" && (
          <p className="absolute -bottom-5 right-0 text-[11px] text-red-400">
            {errorMsg}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex-shrink-0 px-6 py-3 rounded-2xl text-sm btn-accent disabled:opacity-60"
      >
        {status === "loading" ? ar.formLoading : ar.formSubmit}
      </button>
    </form>
  );
}
