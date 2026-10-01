import type { MetadataRoute } from "next";
import { locales } from "@/configs/locale.config";
import { siteConfig } from "@/configs/site.config";
import { projectPath } from "@/entities/projects";
import { getPortfolioCategories, getPortfolioProjects } from "@/features/our-work/api/portfolio";
import { getBlogCategories, getBlogPosts } from "@/features/blog/api/blog";

const STATIC_PATHS = ["", "/services", "/about", "/contact", "/process", "/our-work", "/blog", "/academy"];

/** Rebuilt at most hourly; portfolio and blog edits also refresh it through their cache tags. */
export const revalidate = 3600;

function languages(base: string, path: string) {
  return {
    en: `${base}/en${path}`,
    ne: `${base}/ne${path}`,
    ja: `${base}/ja${path}`,
    "x-default": `${base}/en${path}`,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const [categories, projects, blogCategories, blogPosts] = await Promise.all([
    getPortfolioCategories(),
    getPortfolioProjects(),
    getBlogCategories(),
    getBlogPosts(),
  ]);

  for (const locale of locales) {
    // 1. Static Routes
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages: languages(base, path) },
      });
    }

    // 2. Portfolio Categories (from the API)
    for (const category of categories) {
      const catPath = `/our-work/${category.slug}`;
      entries.push({
        url: `${base}/${locale}${catPath}`,
        lastModified: category.updatedAt ? new Date(category.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: languages(base, catPath) },
      });
    }

    // 3. Project Detail Pages (canonical URL only, with images for Google Images)
    for (const project of projects) {
      const projPath = projectPath(project);
      const images = [project.coverImage, project.thumbnail].filter((url): url is string => Boolean(url));

      entries.push({
        url: `${base}/${locale}${projPath}`,
        lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
        changeFrequency: "monthly",
        priority: project.featured ? 0.8 : 0.6,
        alternates: { languages: languages(base, projPath) },
        ...(images.length ? { images: [...new Set(images)] } : {}),
      });
    }

    // 4. Blog Categories (from the API)
    for (const cat of blogCategories) {
      const catPath = `/blog/category/${cat.slug}`;
      entries.push({
        url: `${base}/${locale}${catPath}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: languages(base, catPath) },
      });
    }

    // 5. Blog Posts (with cover images for Google Images)
    for (const post of blogPosts) {
      const blogPath = `/blog/${post.slug}`;
      entries.push({
        url: `${base}/${locale}${blogPath}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: languages(base, blogPath) },
        ...(post.coverImage ? { images: [post.coverImage] } : {}),
      });
    }
  }

  return entries;
}
