"use client";

import { useState, useCallback } from "react";
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

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-xl w-full max-w-md"
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
