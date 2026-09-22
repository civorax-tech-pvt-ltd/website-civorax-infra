import type { MetadataRoute } from "next";
import { siteConfig } from "@/configs/site.config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/en/dashboard", "/ne/dashboard", "/ja/dashboard"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: ["/", "/en/our-work/", "/ne/our-work/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
