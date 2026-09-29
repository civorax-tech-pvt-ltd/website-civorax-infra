import { siteConfig } from "@/configs/site.config";

export const academyFaqs = [
  {
    question: "Do you provide hands-on AutoCAD training in Itahari?",
    answer: "Yes, CivoraX Academy runs physical and blended practical AutoCAD 2D/3D courses in Itahari covering architectural drafting, structural detailing, municipal Naksa Pass layouts, and municipal submission standards.",
  },
  {
    question: "Is the ETABS course aligned with the Nepal National Building Code (NBC 105:2020)?",
    answer: "Absolutely. Our ETABS structural analysis masterclass focuses entirely on earthquake-resilient RCC building modeling, modal analysis, response spectrum analysis, and ductile reinforcement detailing conforming to NBC 105:2020 and IS 13920.",
  },
  {
    question: "Can beginners or civil engineering diploma students enroll?",
    answer: "Yes, our curriculum starts from foundational drafting conventions up to live project modeling. Students work on actual building blueprints handled by CivoraX Infra's practicing engineers.",
  },
  {
    question: "Will I receive a course completion certificate?",
    answer: "Yes, all students receive an industry-recognized certificate from CivoraX Infra upon completing the practical project submission and viva defense.",
  },
];

export function AcademyJsonLd({ locale }: { locale: string }) {
  const url = `${siteConfig.url}/${locale}/academy`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: academyFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}