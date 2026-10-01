import { siteConfig } from "@/configs/site.config";
import { projectPath, type Project, type ProjectDetail } from "@/entities/projects";

/**
 * Structured data for a portfolio project page: the project as a CreativeWork by the company,
 * plus the breadcrumb trail Google can show in results.
 */
export function ProjectJsonLd({ project, locale }: { project: ProjectDetail; locale: string }) {
  const base = `${siteConfig.url}/${locale}`;
  const url = `${base}${projectPath(project)}`;
  const images = [project.coverImage, ...project.gallery.map((g) => g.url)].filter(Boolean);

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: project.title,
      headline: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.shortDescription,
      abstract: project.shortDescription,
      url,
      inLanguage: locale,
      image: images,
      genre: project.primaryCategoryName,
      keywords: [...project.seoKeywords, ...project.services].join(", ") || undefined,
      ...(project.year ? { dateCreated: String(project.year) } : {}),
      ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
      ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
      ...(project.location
        ? { locationCreated: { "@type": "Place", name: project.location, address: { "@type": "PostalAddress", addressCountry: "NP" } } }
        : {}),
      creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Our Work", item: `${base}/our-work` },
        { "@type": "ListItem", position: 3, name: project.primaryCategoryName, item: `${base}/our-work/${project.primaryCategory}` },
        { "@type": "ListItem", position: 4, name: project.title, item: url },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Structured data for a list page (Our Work or a category): a collection of project pages.
 */
export function ProjectListJsonLd({
  projects,
  locale,
  name,
  path,
}: {
  projects: Project[];
  locale: string;
  name: string;
  path: string;
}) {
  const base = `${siteConfig.url}/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${base}${path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${base}${projectPath(project)}`,
        name: project.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
