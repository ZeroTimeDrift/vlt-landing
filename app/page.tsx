import ClientHome from "./_components/client-home";
import { getLatestPosts } from "@/lib/blog";

export default function Home() {
  const blogPosts = getLatestPosts(3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Vault",
    url: "https://vlt.money",
    description:
      "Vault puts your savings to work in vetted lending markets. Earn ~5.4% with no lock-ups and no minimum deposit.",
    areaServed: "Worldwide",
    serviceType: "Savings Management",
    offers: {
      "@type": "Offer",
      description: "~5.4% on deposits via vetted lending markets",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my money safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your funds are deployed into established, audited lending markets with collateral requirements and institutional borrowers. Vault never takes custody of your balance \u2014 you maintain the right to withdraw at all times.",
        },
      },
      {
        "@type": "Question",
        name: "How does Vault make money?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vault charges a small platform fee on your earnings. We only make money when you do.",
        },
      },
      {
        "@type": "Question",
        name: "What if I want my money back?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Withdraw your full balance plus earnings within 24 hours. No penalties, no lock-ups, no questions asked.",
        },
      },
      {
        "@type": "Question",
        name: "Are the rates guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rates are variable because they reflect real market activity \u2014 borrowers paying fees for access to capital. Current rate is approximately 5.4%, but it fluctuates with demand.",
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
      <ClientHome blogPosts={blogPosts} />
    </>
  );
}
