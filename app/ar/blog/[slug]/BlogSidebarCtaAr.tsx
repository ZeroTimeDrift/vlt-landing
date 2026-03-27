"use client";

import { useState, useEffect } from "react";
import WaitlistFormAr from "@/app/_components/WaitlistFormAr";

function VaultLogoSmall() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
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

export default function BlogSidebarCtaAr() {
  const [visible, setVisible] = useState(false);
  const [bottomCtaVisible, setBottomCtaVisible] = useState(false);

  useEffect(() => {
    const header = document.querySelector("article")?.closest("div")?.querySelector("header");
    if (!header) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const bottomCta = document.querySelector("[data-bottom-cta]");
    if (!bottomCta) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBottomCtaVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(bottomCta);
    return () => observer.disconnect();
  }, []);

  const show = visible && !bottomCtaVisible;

  return (
    <div
      className="sticky top-[96px] transition-all duration-[250ms]"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div
        style={{
          width: 240,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <VaultLogoSmall />
          <span className="text-white font-bold text-[13px] tracking-tight">Vault</span>
        </div>

        <p className="mb-1" style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3 }}>
          مدّخراتك تكسب<br />~٥٫٤٪.
        </p>
        <p className="mb-4" style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF" }}>
          بدون عرض. بدون انتهاء.
        </p>

        <WaitlistFormAr id="blog-sidebar" />
      </div>
    </div>
  );
}
