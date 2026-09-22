import type { Metadata } from "next";
import CategoryPage from "@/features/our-work/CategoryPage";
import { categories } from "@/entities/projects/categories";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale } from "@/configs/locale.config";
import type { Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const found = categories.find((c) => c.slug === category);
  const title = found
    ? `${found.label} House Designs in Nepal`
    : "Our Work — Portfolio & Visualizations";
  const description =
    found?.description ??
    "Explore our portfolio of architectural concepts, 3D visualizations, and design directions.";
  const path = `/our-work/${category}`;
  const canonical = canonicalUrl(locale as Locale, path);
  return {
    title,
    description,
    alternates: { canonical, languages: alternateUrls(path) },
    openGraph: {
      title: `${title} | CivoraX Infra`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  return <CategoryPage categorySlug={category} />;
}