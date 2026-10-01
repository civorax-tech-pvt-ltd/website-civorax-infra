import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "@/features/our-work/CategoryPage";
import {
  getPortfolioCategories,
  getPortfolioProjects,
} from "@/features/our-work/api/portfolio";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale } from "@/configs/locale.config";
import type { Locale } from "@/configs/locale.config";
import { ProjectListJsonLd } from "@/shared/seo/ProjectJsonLd";

type Props = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

/** Pre-render every category page at build time (new ones render on first visit). */
export async function generateStaticParams() {
  const categories = await getPortfolioCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const categories = await getPortfolioCategories();
  const found = categories.find((c) => c.slug === category);

  if (!found) {
    return { title: "Our Work", robots: { index: false } };
  }

  const title = found.seoTitle ?? `${found.label} House Designs in Nepal`;
  const description =
    found.seoDescription ??
    found.description ??
    "Explore our portfolio of architectural concepts, 3D visualizations, and design directions.";
  const path = `/our-work/${category}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const cover = (await getPortfolioProjects({ category }))[0]?.coverImage;

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
      ...(cover ? { images: [{ url: cover, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(cover ? { images: [cover] } : {}) },
  };
}

export default async function Page({ params }: Props) {
  const { locale, category } = await params;
  const [categories, projects] = await Promise.all([
    getPortfolioCategories(),
    getPortfolioProjects({ category }),
  ]);
  const found = categories.find((c) => c.slug === category);

  if (!found) {
    notFound();
  }

  return (
    <>
      <ProjectListJsonLd projects={projects} locale={locale} name={found.label} path={`/our-work/${category}`} />
      <CategoryPage category={found} categories={categories} projects={projects} />
    </>
  );
}
