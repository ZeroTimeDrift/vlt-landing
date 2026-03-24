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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientHome blogPosts={blogPosts} />
    </>
  );
}
