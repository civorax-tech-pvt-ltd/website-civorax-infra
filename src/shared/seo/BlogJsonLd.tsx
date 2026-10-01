import { siteConfig } from "@/configs/site.config";
import type { BlogPost, BlogPostDetail } from "@/entities/blog";

/** Blog index / category pages: the list of articles for search engines. */
export function BlogListJsonLd({
  posts,
  locale,
  name,
  path,
}: {
  posts: BlogPost[];
  locale: string;
  name: string;
  path: string;
}) {
  const base = `${siteConfig.url}/${locale}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    url: `${base}${path}`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${base}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.author.name },
      ...(post.coverImage ? { image: post.coverImage } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostJsonLd({ post, locale }: { post: BlogPostDetail; locale: string }) {
  const postUrl = `${siteConfig.url}/${locale}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: locale === "ne" ? "ne-NP" : locale === "ja" ? "ja-JP" : "en-US",
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbLabels: Record<string, { home: string; blog: string }> = {
    en: { home: "Home", blog: "Blog" },
    ne: { home: "गृहपृष्ठ", blog: "लेखहरू" },
    ja: { home: "ホーム", blog: "ブログ" },
  };

  const labels = breadcrumbLabels[locale] ?? breadcrumbLabels.en;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels.home,
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels.blog,
        item: `${siteConfig.url}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}