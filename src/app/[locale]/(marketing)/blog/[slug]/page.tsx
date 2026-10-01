import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/features/blog/components/BlogPostPage";
import { getBlogPost, getBlogPosts } from "@/features/blog/api/blog";
import { BlogPostJsonLd } from "@/shared/seo/BlogJsonLd";
import { canonicalUrl, alternateUrls, siteConfig } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/** Pre-render every published post (new ones render on first visit). */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Article not found", robots: { index: false } };
  }

  const path = `/blog/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);
  const title = post.seoTitle ?? post.title;

  return {
    // A custom SEO title is used exactly as written (it usually already ends with the brand);
    // otherwise the layout's "%s | CivoraX Infra" template is applied to the post title.
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.seoDescription,
    ...(post.tags.length ? { keywords: post.tags } : {}),
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
      section: post.categoryLabel,
      tags: post.tags,
      ...(post.coverImage ? { images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.coverAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.seoDescription,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostJsonLd post={post} locale={locale} />
      <BlogPostPage post={post} relatedPosts={post.related} />
    </>
  );
}
