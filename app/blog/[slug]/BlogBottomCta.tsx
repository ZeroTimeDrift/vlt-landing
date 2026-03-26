"use client";

import WaitlistForm from "@/app/_components/WaitlistForm";

export default function BlogBottomCta() {
  return (
    <div
      id="cta-form"
      data-bottom-cta
      className="card p-8 text-center flex flex-col items-center"
      style={{
        background: "rgba(0,102,255,0.03)",
        borderColor: "rgba(0,102,255,0.10)",
      }}
    >
      <p
        className="text-xs font-medium uppercase tracking-[0.2em] mb-3"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        Ready to earn more?
      </p>
      <p className="text-white text-[17px] font-bold mb-2">
        Put your savings to work.
      </p>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
        Join the waitlist and be first in line when Vault launches.
      </p>
      <WaitlistForm id="blog-bottom" />
    </div>
  );
}
