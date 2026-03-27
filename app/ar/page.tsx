import ClientHomeAr from "../_components/client-home-ar";
import { getLatestPosts } from "@/lib/blog";

export default function HomeAr() {
  const blogPosts = getLatestPosts(3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Vault",
    url: "https://vlt.money/ar",
    description:
      "Vault يضع مدّخراتك في أسواق إقراض موثّقة. اكسب ~٥٫٤٪ بدون تجميد وبدون حد أدنى للإيداع.",
    areaServed: "Worldwide",
    serviceType: "Savings Management",
    offers: {
      "@type": "Offer",
      description: "~٥٫٤٪ على الودائع عبر أسواق إقراض موثّقة",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف تُحمى أموالي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vault لا يحتفظ بأموالك. أموالك محفوظة مباشرة في أسواق إقراض مؤسسية تديرها Sentora. الأرباح تأتي من رسوم يدفعها مقترضون مؤسسيون موثّقون.",
        },
      },
      {
        "@type": "Question",
        name: "كيف يكسب Vault المال؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتقاضى Vault رسوم منصّة صغيرة على أرباحك. نحن نكسب فقط عندما تكسب أنت.",
        },
      },
      {
        "@type": "Question",
        name: "ماذا لو أردت أموالي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "اسحب رصيدك الكامل مع الأرباح خلال ٢٤ ساعة. بدون غرامات، بدون تجميد، بدون أسئلة.",
        },
      },
      {
        "@type": "Question",
        name: "هل المعدّلات مضمونة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لا. المعدّلات متغيّرة لأنها تعكس نشاط السوق الفعلي — مقترضون يدفعون رسوماً للوصول إلى رأس المال. المعدّل الحالي حوالي ٥٫٤٪، لكنه يتغيّر مع الطلب.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ClientHomeAr blogPosts={blogPosts} />
    </>
  );
}
