import type { Metadata } from "next";
import ProjectDetailPage from "@/features/our-work/ProjectDetailPage";
import { projects } from "@/entities/projects/projects";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale } from "@/configs/locale.config";
import type { Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const title =
    project?.seoTitle ?? project?.title ?? "Project Details";
  const description =
    project?.seoDescription ??
    project?.overview ??
    "Explore this CivoraX architecture concept, 3D visualization and design details.";
  const path = `/our-work/${category}/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const image = project?.coverImage;
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
      type: "article",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const { category, slug } = await params;

  return (
    <ProjectDetailPage
      categorySlug={category}
      projectSlug={slug}
    />
  );
}