import type { BlogCategory, BlogPost, BlogPostDetail } from "@/entities/blog";

/**
 * Blog data from the CivoraX API (admin: Website › Blog posts).
 *
 * Cached for an hour and tagged "blog": the API calls /api/revalidate whenever a post is published,
 * edited or unpublished, so changes show up within seconds while pages stay static and fast for SEO.
 * Scheduled posts appear with the next hourly refresh after their publish time.
 * If the API is unreachable these return empty results instead of breaking the page.
 */

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const BLOG_TAG = "blog";

const cacheOptions = { next: { revalidate: 3600, tags: [BLOG_TAG] } };

type ApiPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  category_name: string;
  tags: string[];
  cover_url: string | null;
  cover_alt: string | null;
  author: { name: string | null; role: string | null; avatar: string | null };
  is_featured: boolean;
  reading_minutes: number;
  published_at: string | null;
  updated_at: string | null;
};

type ApiPostDetail = ApiPost & {
  content: string;
  seo: { title: string | null; description: string | null };
  faqs: { question: string; answer: string }[];
  related_services: { label: string; href: string }[];
  related_projects: { slug: string; title: string; category: string }[];
  show_estimator_cta: boolean;
  related: ApiPost[];
};

type ApiCategory = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  posts_count: number;
};

async function get<T>(path: string): Promise<T | null> {
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/api/v1/blog${path}`, cacheOptions);

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

function toPost(p: ApiPost): BlogPost {
  const publishedAt = p.published_at ?? p.updated_at ?? new Date().toISOString();

  return {
    slug: p.slug,
    title: p.title,
    seoDescription: p.excerpt,
    excerpt: p.excerpt,
    category: p.category,
    categoryLabel: p.category_name,
    tags: p.tags ?? [],
    coverImage: p.cover_url,
    coverAlt: p.cover_alt || p.title,
    publishedAt,
    updatedAt: p.updated_at ?? publishedAt,
    publishedDate: publishedAt.slice(0, 10),
    readingTime: `${p.reading_minutes} min read`,
    author: {
      name: p.author.name || "CivoraX Infra",
      role: p.author.role ?? undefined,
      avatar: p.author.avatar,
    },
    featured: p.is_featured,
  };
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const data = await get<ApiCategory[]>("/categories");

  return (data ?? []).map((c) => ({
    slug: c.slug,
    label: c.name,
    description: c.description ?? undefined,
    seoTitle: c.seo_title ?? undefined,
    seoDescription: c.seo_description ?? undefined,
    postsCount: c.posts_count,
  }));
}

export async function getBlogCategory(slug: string): Promise<BlogCategory | null> {
  const categories = await getBlogCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getBlogPosts(filters: { category?: string; featured?: boolean } = {}): Promise<BlogPost[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.featured) params.set("featured", "1");

  const query = params.toString();
  const data = await get<ApiPost[]>(`/posts${query ? `?${query}` : ""}`);
  return (data ?? []).map(toPost);
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const p = await get<ApiPostDetail>(`/posts/${encodeURIComponent(slug)}`);
  if (!p) return null;

  return {
    ...toPost(p),
    seoTitle: p.seo.title ?? undefined,
    seoDescription: p.seo.description ?? p.excerpt,
    content: p.content,
    relatedServices: p.related_services ?? [],
    relatedProjects: p.related_projects ?? [],
    relatedEstimatorAnchor: p.show_estimator_cta,
    faqs: p.faqs ?? [],
    related: (p.related ?? []).map(toPost),
  };
}
