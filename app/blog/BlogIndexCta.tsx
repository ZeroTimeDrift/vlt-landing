"use client";

import WaitlistForm from "@/app/_components/WaitlistForm";

export default function BlogIndexCta() {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <p className="text-sm font-semibold text-white mb-3">
        Start earning ~5.4% on your savings. Join the waitlist.
      </p>
      <WaitlistForm id="blog-index" compact />
    </div>
  );
}
