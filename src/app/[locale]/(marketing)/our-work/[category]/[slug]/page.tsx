import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProjectDetailPage from "@/features/our-work/ProjectDetailPage";
import { getPortfolioProject, getPortfolioProjects } from "@/features/our-work/api/portfolio";
import { projectPath } from "@/entities/projects";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale } from "@/configs/locale.config";
import type { Locale } from "@/configs/locale.config";
import { ProjectJsonLd } from "@/shared/seo/ProjectJsonLd";

type Props = {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
};

/** Pre-render every published project at its canonical URL (new ones render on first visit). */
export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ category: p.primaryCategory, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getPortfolioProject(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false } };
  }

  const title = project.seoTitle ?? project.title;
  const description = project.seoDescription ?? project.shortDescription;
  // Always the canonical address, even if the page was reached through another category.
  const path = projectPath(project);
  const canonical = canonicalUrl(locale as Locale, path);
  const image = project.coverImage;

  return {
    // A custom SEO title is used exactly as written (it usually already ends with the brand);
    // otherwise the layout's "%s | CivoraX Infra" template is applied to the project title.
    title: project.seoTitle ? { absolute: project.seoTitle } : title,
    description,
    ...(project.seoKeywords.length ? { keywords: project.seoKeywords } : {}),
    alternates: { canonical, languages: alternateUrls(path) },
    openGraph: {
      title: `${title} | CivoraX Infra`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "article",
      ...(project.publishedAt ? { publishedTime: project.publishedAt } : {}),
      ...(project.updatedAt ? { modifiedTime: project.updatedAt } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: project.title }] } : {}),
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
  const { locale, category, slug } = await params;
  const project = await getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  // One address per project: other category paths permanently redirect to the canonical one (no duplicate content).
  if (category !== project.primaryCategory) {
    permanentRedirect(`/${locale}${projectPath(project)}`);
  }

  return (
    <>
      <ProjectJsonLd project={project} locale={locale} />
      <ProjectDetailPage project={project} />
    </>
  );
}
