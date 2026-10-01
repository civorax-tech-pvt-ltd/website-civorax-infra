/**
 * Portfolio ("Our Work") types. The data itself comes from the CivoraX API
 * (managed in the admin under Website › Portfolio) — see features/our-work/api/portfolio.ts.
 */

export type ProjectStatus = "concept" | "ongoing" | "completed";

export type ProjectSize = "large" | "small";

export type ProjectVideo = {
  title: string;
  type: "youtube" | "mp4";
  url: string;
};

export type ProjectImage = {
  url: string;
  alt: string;
};

export type Project = {
  // Basic information
  id: string;
  slug: string;
  title: string;

  /** Short description (card). */
  shortDescription: string;

  // Categorization
  /** Slug of the main category: decides the canonical URL /our-work/{primaryCategory}/{slug}. */
  primaryCategory: string;
  primaryCategoryName: string;
  /** Every category slug the project appears under (main category included). */
  categories: string[];

  status: ProjectStatus;
  featured: boolean;
  size: ProjectSize;

  // Project information
  location?: string;
  year?: number;

  // Images
  thumbnail: string | null;
  coverImage: string | null;

  publishedAt?: string;
  updatedAt?: string;
};

/** Full project for the detail page. */
export type ProjectDetail = Project & {
  /** Full description; blank lines separate paragraphs. */
  overview: string;
  client?: string;
  services: string[];
  gallery: ProjectImage[];
  videos: ProjectVideo[];

  // Case study
  challenge?: string;
  solution?: string;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];

  related: Project[];
};

/** Canonical path of a project page (without locale). */
export function projectPath(project: Pick<Project, "primaryCategory" | "slug">): string {
  return `/our-work/${project.primaryCategory}/${project.slug}`;
}
