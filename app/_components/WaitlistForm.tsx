"use client";

import { useState, useCallback } from "react";

export default function WaitlistForm({
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
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "waitlist_signup", {
            source,
            referrer: document.referrer || "(direct)",
          });
        }
        onSuccess?.();
      } catch {
        setErrorMsg("Something went wrong.");
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
          You&apos;re on the list. We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${compact ? "gap-2" : "flex-col sm:flex-row gap-3"} w-full max-w-md`}
    >
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
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
          <p className="absolute -bottom-5 left-0 text-[11px] text-red-400">
            {errorMsg}
          </p>
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
