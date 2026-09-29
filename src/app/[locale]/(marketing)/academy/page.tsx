import type { Metadata } from "next";
import AcademyPage from "@/features/academy/components/AcademyPage";
import { AcademyJsonLd } from "@/shared/seo/AcademyJsonLd";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "/academy";
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);

  const localizedTitles: Record<string, { title: string; desc: string }> = {
    en: {
      title: "CivoraX Academy — AutoCAD & Design Software Training in Koshi",
      desc: "Hands-on courses in design software, drafting, and site practice — taught by our own working team at CivoraX Infra in Koshi, Nepal.",
    },
    ne: {
      title: "सिभोराएक्स एकेडेमी — डिजाइन सफ्टवेयर तथा प्राविधिक तालिम",
      desc: "सिभोराएक्स इन्फ्राका इन्जिनियरहरूद्वारा सञ्चालित डिजाइन सफ्टवेयर, ड्राफ्टिङ र साइट प्राक्टिस सम्बन्धी व्यावहारिक तालिम।",
    },
    ja: {
      title: "CivoraX Academy — 建築設計・ソフトウェア実務研修",
      desc: "CivoraX Infraの実務チームによる設計ソフトウェア、製図、現場実務の実践的なコース。",
    },
  };

  const meta = localizedTitles[locale] ?? localizedTitles.en;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <AcademyJsonLd locale={locale} />
      <AcademyPage />
    </>
  );
}