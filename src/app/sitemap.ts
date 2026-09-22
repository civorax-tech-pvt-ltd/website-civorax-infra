import type { MetadataRoute } from "next";
import { locales } from "@/configs/locale.config";
import { siteConfig } from "@/configs/site.config";
import { categories } from "@/entities/projects/categories";
import { projects } from "@/entities/projects/projects";

const STATIC_PATHS = ["", "/services", "/about", "/contact", "/process", "/our-work", "/academy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
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

    for (const category of categories.filter((c) => c.slug !== "all")) {
      entries.push({
        url: `${base}/${locale}/our-work/${category.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const project of projects) {
      const primaryCategory = project.categories[0] ?? "home-concepts";
      entries.push({
        url: `${base}/${locale}/our-work/${primaryCategory}/${project.slug}`,
        lastModified: project.year ? new Date(`${project.year}-01-01`) : now,
        changeFrequency: "yearly",
        priority: 0.5,
        ...(project.coverImage.startsWith("http")
          ? { images: [project.coverImage] }
          : {}),
      });
    }
  }

  return entries;
}
