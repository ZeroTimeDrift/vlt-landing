"use client";

import { useState, useEffect, useRef } from "react";

export default function MobileStickyCtaBar() {
  const [showBar, setShowBar] = useState(false);
  const [bottomCtaVisible, setBottomCtaVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.4) {
        setShowBar(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const bottomCta = document.querySelector("[data-bottom-cta]");
    if (!bottomCta) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setBottomCtaVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observerRef.current.observe(bottomCta);
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-[250ms] ${
        showBar && !bottomCtaVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        background: "rgba(15,17,23,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        height: 56,
      }}
    >
      <div className="flex items-center justify-between h-full px-5">
        <span className="text-white font-semibold text-[13px]">
          Earn ~5.4% on your savings.
        </span>
        <a
          href="/#waitlist"
          className="btn-accent text-[12px] font-bold rounded-2xl"
          style={{ padding: "7px 14px" }}
        >
          Get Early Access
        </a>
      </div>
    </div>
  );
}
