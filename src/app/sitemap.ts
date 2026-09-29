import type { MetadataRoute } from "next";
import { locales } from "@/configs/locale.config";
import { siteConfig } from "@/configs/site.config";
import { categories } from "@/entities/projects/categories";
import { projects } from "@/entities/projects/projects";
import { blogPosts, blogCategories } from "@/entities/blog";

const STATIC_PATHS = ["", "/services", "/about", "/contact", "/process", "/our-work", "/blog", "/academy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // 1. Static Routes
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${base}/en${path}`,
            ne: `${base}/ne${path}`,
            ja: `${base}/ja${path}`,
            "x-default": `${base}/en${path}`,
          },
        },
      });
    }

    // 2. Portfolio Categories
    for (const category of categories.filter((c) => c.slug !== "all")) {
      const catPath = `/our-work/${category.slug}`;
      entries.push({
        url: `${base}/${locale}${catPath}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${base}/en${catPath}`,
            ne: `${base}/ne${catPath}`,
            ja: `${base}/ja${catPath}`,
            "x-default": `${base}/en${catPath}`,
          },
        },
      });
    }

    // 3. Project Detail Pages
    for (const project of projects) {
      const primaryCategory = project.categories[0] ?? "home-concepts";
      const projPath = `/our-work/${primaryCategory}/${project.slug}`;
      entries.push({
        url: `${base}/${locale}${projPath}`,
        lastModified: project.year ? new Date(`${project.year}-01-01`) : now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: {
            en: `${base}/en${projPath}`,
            ne: `${base}/ne${projPath}`,
            ja: `${base}/ja${projPath}`,
            "x-default": `${base}/en${projPath}`,
          },
        },
      });
    }

    // 4. Blog Categories
    for (const cat of blogCategories) {
      const catPath = `/blog/category/${cat.slug}`;
      entries.push({
        url: `${base}/${locale}${catPath}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${base}/en${catPath}`,
            ne: `${base}/ne${catPath}`,
            ja: `${base}/ja${catPath}`,
            "x-default": `${base}/en${catPath}`,
          },
        },
      });
    }

    // 5. Blog Posts
    for (const post of blogPosts) {
      const blogPath = `/blog/${post.slug}`;
      entries.push({
        url: `${base}/${locale}${blogPath}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${base}/en${blogPath}`,
            ne: `${base}/ne${blogPath}`,
            ja: `${base}/ja${blogPath}`,
            "x-default": `${base}/en${blogPath}`,
          },
        },
      });
    }
  }

  return entries;
}