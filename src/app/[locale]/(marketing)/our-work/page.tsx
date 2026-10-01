import type { Metadata } from "next";
import OurWorkPage from "@/features/our-work/OurWorkPage";
import { getPortfolioCategories, getPortfolioProjects } from "@/features/our-work/api/portfolio";
import { buildPageMetadata } from "@/lib/seo";
import { ProjectListJsonLd } from "@/shared/seo/ProjectJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const featured = (await getPortfolioProjects({ featured: true }))[0];

  return buildPageMetadata(locale, "ourWork", featured?.coverImage ? { image: featured.coverImage } : undefined);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [projects, categories] = await Promise.all([getPortfolioProjects(), getPortfolioCategories()]);

  return (
    <>
      <ProjectListJsonLd projects={projects} locale={locale} name="Our Work" path="/our-work" />
      <OurWorkPage projects={projects} categories={categories} />
    </>
  );
}
