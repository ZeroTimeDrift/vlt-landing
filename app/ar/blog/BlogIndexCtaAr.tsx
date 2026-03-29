"use client";

import WaitlistFormAr from "@/app/_components/WaitlistFormAr";

export default function BlogIndexCtaAr() {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <p className="text-sm font-semibold text-white mb-3">
        ابدأ بكسب ~5.4% على مدّخراتك. انضم لقائمة الانتظار.
      </p>
      <WaitlistFormAr id="blog-index" compact />
    </div>
  );
}
