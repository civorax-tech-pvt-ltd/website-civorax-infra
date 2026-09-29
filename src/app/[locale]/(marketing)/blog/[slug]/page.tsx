import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/entities/blog";
import BlogPostPage from "@/features/blog/components/BlogPostPage";
import { BlogPostJsonLd } from "@/shared/seo/BlogJsonLd";
import { canonicalUrl, alternateUrls, siteConfig } from "@/configs/site.config";
import { ogLocale, locales, type Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const path = `/blog/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.tags,
    alternates: { canonical, languages },
    openGraph: {
      title: `${post.title} | CivoraX Infra`,
      description: post.seoDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.coverImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.featured))
    .slice(0, 3);

  return (
    <>
      <BlogPostJsonLd post={post} locale={locale} />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}