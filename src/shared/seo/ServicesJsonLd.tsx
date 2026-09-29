import { siteConfig } from "@/configs/site.config";

export const serviceFaqs = [
  {
    question: "Why is CivoraX considered one of the best construction companies in Koshi?",
    answer: "CivoraX Infra combines licensed structural engineering, NBC 105:2020 seismic compliance, transparent Bill of Quantities (BOQ) with zero hidden fees, and hands-on site supervision across Itahari, Dharan, Damak, Biratnagar, and Birtamode.",
  },
  {
    question: "What is the difference between a turnkey construction contract and a labor contract?",
    answer: "A turnkey contract means CivoraX manages end-to-end material procurement (TMT rebar, cement, aggregates, tiles, sanitary) and construction execution under strict engineering oversight. A labor contract means the homeowner supplies materials while our certified engineers and masons execute construction according to the approved architectural drawings.",
  },
  {
    question: "Do you assist with municipal building permits (Naksa Pass) in Itahari and Dharan?",
    answer: "Yes, our team drafts complete municipal architectural and structural drawings, prepares soil and structural stability reports, and coordinates with local ward and municipal engineering desks for provisional permit, DPC check, and final Nirman Sampanna (building completion certificate).",
  },
  {
    question: "How does CivoraX ensure earthquake-resilient construction in Nepal?",
    answer: "All structural designs strictly adhere to NBC 105:2020 and Indian Standard ductile detailing IS 13920. We specify high-grade Fe500 TMT rebar, design deep column ties, and conduct routine slump and cube compression tests for concrete.",
  },
];

export function ServicesJsonLd({ locale }: { locale: string }) {
  const url = `${siteConfig.url}/${locale}/services`;

  const serviceCatalog = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Civil Engineering & Building Construction",
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: "+977 9761008090",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Itahari",
        addressRegion: "Koshi",
        addressCountry: "NP",
      },
    },
    areaServed: [
      { "@type": "City", name: "Itahari" },
      { "@type": "City", name: "Dharan" },
      { "@type": "City", name: "Damak" },
      { "@type": "City", name: "Biratnagar" },
      { "@type": "City", name: "Birtamode" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential & Commercial Building Construction",
            description: "End-to-end turnkey construction and site management in Koshi, Nepal.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Modern House Design & 3D Architectural Visualization",
            description: "Vastu-compliant residential floor plans, elevation design, and 3D modeling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Municipal Building Permit (Naksa Pass) Support",
            description: "Architectural drawings and municipal compliance in Itahari, Dharan, and Biratnagar.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}