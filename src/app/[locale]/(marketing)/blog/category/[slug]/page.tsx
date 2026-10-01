import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListPage from "@/features/blog/components/BlogListPage";
import { getBlogCategories, getBlogPosts } from "@/features/blog/api/blog";
import { BlogListJsonLd } from "@/shared/seo/BlogJsonLd";
import { canonicalUrl, alternateUrls, siteConfig } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = (await getBlogCategories()).find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category not found", robots: { index: false } };
  }

  const path = `/blog/category/${slug}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);

  const title = category.seoTitle ?? `${category.label} Guides & Cost Estimates | CivoraX Blog`;
  const description =
    category.seoDescription ??
    category.description ??
    `Articles, guides, and engineering tips regarding ${category.label.toLowerCase()} in Nepal and Koshi Province.`;

  return {
    title: { absolute: title },
    description,
    // Empty categories are thin content: keep them out of search results until they have posts.
    ...(category.postsCount === 0 ? { robots: { index: false, follow: true } } : {}),
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
  const { locale, slug } = await params;
  const [categories, posts] = await Promise.all([getBlogCategories(), getBlogPosts({ category: slug })]);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <BlogListJsonLd
        posts={posts}
        locale={locale}
        path={`/blog/category/${slug}`}
        name={`${category.label} | CivoraX Blog`}
      />
      <BlogListPage currentCategory={slug} posts={posts} categories={categories} />
    </>
  );
}
