import type {
  Project,
  ProjectCategory,
  ProjectDetail,
} from "@/entities/projects";

/**
 * "Our Work" data from the CivoraX API (admin: Website › Portfolio).
 *
 * Cached for an hour and tagged "portfolio": the API calls /api/revalidate on every change,
 * so edits show up within seconds while pages stay static and fast for SEO.
 * If the API is unreachable these return empty results instead of breaking the page.
 */

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const PORTFOLIO_TAG = "portfolio";

const cacheOptions = { next: { revalidate: 3600, tags: [PORTFOLIO_TAG] } };

type ApiProject = {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  primary_category: string;
  primary_category_name: string;
  categories: string[];
  status: Project["status"];
  size: Project["size"];
  is_featured: boolean;
  location: string | null;
  year: number | null;
  thumbnail_url: string | null;
  cover_url: string | null;
  published_at: string | null;
  updated_at: string | null;
};

type ApiProjectDetail = ApiProject & {
  overview: string;
  client: string | null;
  services: string[];
  gallery: { url: string; alt: string }[];
  videos: ProjectDetail["videos"];
  challenge: string | null;
  solution: string | null;
  seo: { title: string | null; description: string | null; keywords: string[] };
  related: ApiProject[];
};

type ApiCategory = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort: number;
  projects_count: number;
  updated_at: string | null;
};

async function get<T>(path: string): Promise<T | null> {
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/api/v1/portfolio${path}`, cacheOptions);

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

function toProject(p: ApiProject): Project {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    shortDescription: p.short_description,
    primaryCategory: p.primary_category,
    primaryCategoryName: p.primary_category_name,
    categories: p.categories,
    status: p.status,
    featured: p.is_featured,
    size: p.size,
    location: p.location ?? undefined,
    year: p.year ?? undefined,
    thumbnail: p.thumbnail_url,
    coverImage: p.cover_url,
    publishedAt: p.published_at ?? undefined,
    updatedAt: p.updated_at ?? undefined,
  };
}

function toCategory(c: ApiCategory): ProjectCategory {
  return {
    id: c.slug,
    slug: c.slug,
    label: c.name,
    description: c.description ?? undefined,
    seoTitle: c.seo_title ?? undefined,
    seoDescription: c.seo_description ?? undefined,
    order: c.sort,
    visible: true,
    projectsCount: c.projects_count,
    updatedAt: c.updated_at ?? undefined,
  };
}

export async function getPortfolioCategories(): Promise<ProjectCategory[]> {
  const data = await get<ApiCategory[]>("/categories");
  return (data ?? []).map(toCategory);
}

export async function getPortfolioCategory(slug: string): Promise<ProjectCategory | null> {
  const categories = await getPortfolioCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getPortfolioProjects(filters: { category?: string; featured?: boolean } = {}): Promise<Project[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.featured) params.set("featured", "1");

  const query = params.toString();
  const data = await get<ApiProject[]>(`/projects${query ? `?${query}` : ""}`);
  return (data ?? []).map(toProject);
}

export async function getPortfolioProject(slug: string): Promise<ProjectDetail | null> {
  const p = await get<ApiProjectDetail>(`/projects/${encodeURIComponent(slug)}`);
  if (!p) return null;

  return {
    ...toProject(p),
    overview: p.overview,
    client: p.client ?? undefined,
    services: p.services ?? [],
    gallery: p.gallery ?? [],
    videos: p.videos ?? [],
    challenge: p.challenge ?? undefined,
    solution: p.solution ?? undefined,
    seoTitle: p.seo.title ?? undefined,
    seoDescription: p.seo.description ?? undefined,
    seoKeywords: p.seo.keywords ?? [],
    related: (p.related ?? []).map(toProject),
  };
}
