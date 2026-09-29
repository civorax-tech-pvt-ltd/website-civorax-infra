import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListPage from "@/features/blog/components/BlogListPage";
import { blogPosts, blogCategories } from "@/entities/blog";
import { canonicalUrl, alternateUrls, siteConfig } from "@/configs/site.config";
import { ogLocale, locales, type Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const cat of blogCategories) {
      params.push({ locale, slug: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) return {};

  const path = `/blog/category/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);

  const title = `${category.label} Guides & Cost Estimates | CivoraX Blog`;
  const description = `Articles, guides, and engineering tips regarding ${category.label.toLowerCase()} in Nepal and Koshi Province.`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const posts = blogPosts.filter((p) => p.category === slug);

  return <BlogListPage currentCategory={slug} posts={posts} />;
}