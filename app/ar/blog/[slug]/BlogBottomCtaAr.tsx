"use client";

import WaitlistFormAr from "@/app/_components/WaitlistFormAr";

export default function BlogBottomCtaAr() {
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
        مستعد لكسب المزيد؟
      </p>
      <p className="text-white text-[17px] font-bold mb-2">
        اجعل مدّخراتك تعمل.
      </p>
      <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
        انضم لقائمة الانتظار وكن أول من يصله Vault عند الإطلاق.
      </p>
      <WaitlistFormAr id="blog-bottom" />
    </div>
  );
}
