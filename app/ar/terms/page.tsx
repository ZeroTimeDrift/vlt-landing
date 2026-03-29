export const metadata = {
  title: "شروط الخدمة — Vault",
  description: "شروط خدمة Vault من Prometheus Labs.",
};

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

export default function TermsPageAr() {
  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: "rgba(15,17,23,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/ar" className="flex items-center gap-2 no-underline">
            <VaultLogo size={24} />
            <span className="text-white font-bold text-[15px] tracking-tight">Vault</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/ar/blog" className="hidden md:inline text-sm text-white/40 hover:text-white/60 transition-colors">المدوّنة</a>
            <a href="/ar#waitlist" className="px-4 py-2 rounded-2xl text-sm btn-accent">
              احصل على وصول مبكر
            </a>
          </div>
        </div>
      </nav>

    <main className="relative z-10 min-h-screen px-6 pt-28 pb-20">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">شروط الخدمة</h1>
        <p className="text-xs text-vault-muted mb-10">آخر تحديث: مارس ٢٠٢٦</p>

        <div className="space-y-8 text-sm text-vault-text-dim leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-base mb-3">نظرة عامة</h2>
            <p>Vault تديره Prometheus Labs، شركة تكنولوجيا مالية مسجّلة في أبوظبي، الإمارات. باستخدامك لموقعنا وخدماتنا، فإنك توافق على هذه الشروط.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">قائمة الانتظار</h2>
            <p>التسجيل في قائمة الانتظار لا يُشكّل اتفاقية مالية. إنه يسجّل اهتمامك بالوصول المبكر لمنصّة Vault. لا يوجد التزام من أي طرف.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">ليست نصيحة مالية</h2>
            <p>لا يُشكّل أي محتوى على هذا الموقع نصيحة مالية أو استثمارية أو قانونية. أرباح Vault متغيّرة وتعتمد على ظروف السوق. الأداء السابق لا يدل على النتائج المستقبلية. المعدّلات المعروضة تقريبية وليست مضمونة.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">إفصاح المخاطر</h2>
            <p>إيداع الأموال في أسواق الإقراض ينطوي على مخاطر، بما في ذلك احتمال خسارة رأس المال. بينما ينشر Vault الأموال فقط في أسواق مؤسسية مُدقّقة، لا يوجد استثمار بدون مخاطر. يجب أن تودع فقط الأموال التي يمكنك تحمّل مخاطرها.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">الملكية الفكرية</h2>
            <p>جميع المحتويات على هذا الموقع — بما في ذلك النصوص والرسومات والشعارات والبرمجيات — هي ملك لـ Prometheus Labs ومحمية بموجب قوانين الملكية الفكرية المعمول بها.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">التواصل</h2>
            <p>Prometheus Labs — أبوظبي، الإمارات.<br />البريد الإلكتروني: hevar@vlt.money</p>
          </section>
        </div>
      </article>

      <footer className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="/ar" className="flex items-center gap-2.5 no-underline">
            <svg width={20} height={20} viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="#0066FF" /><circle cx="16" cy="16" r="7.5" stroke="white" strokeWidth="1.8" fill="none" /><circle cx="16" cy="16" r="2.5" fill="white" /><line x1="16" y1="8.5" x2="16" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="16" y1="21" x2="16" y2="23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="8.5" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><line x1="21" y1="16" x2="23.5" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span className="text-white font-bold text-sm tracking-tight">Vault</span>
          </a>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-[13px] text-white/40">Prometheus Labs — أبوظبي، الإمارات · نسعى لترخيص FSRA تحت ADGM</span>
            <div className="flex items-center gap-4 text-[13px] text-white/40">
              <a href="/ar/blog" className="hover:text-white/60 transition-colors">المدوّنة</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/ar/privacy" className="hover:text-white/60 transition-colors">الخصوصية</a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <a href="/ar/terms" className="hover:text-white/60 transition-colors">الشروط</a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[11px] text-white/20 text-center max-w-2xl mx-auto leading-relaxed">
          Vault هو منتج من Prometheus Labs، المسجّلة في أبوظبي، الإمارات. الأرباح هي رسوم يدفعها المقترضون للوصول إلى رأس المال — وليست فوائد أو عوائد مضمونة. المعدّلات تتغيّر مع ظروف السوق.
        </p>
      </footer>
    </main>
    </>
  );
}
