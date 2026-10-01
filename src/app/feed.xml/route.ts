import { getBlogPosts } from "@/features/blog/api/blog";
import { siteConfig } from "@/configs/site.config";
import { company } from "@/entities/company";

/** Rebuilt at most hourly, or right away when a post changes ("blog" cache tag). */
export const revalidate = 3600;

export async function GET() {
  const blogPosts = await getBlogPosts();
  const siteUrl = siteConfig.url;
  const now = (blogPosts[0] ? new Date(blogPosts[0].publishedAt) : new Date()).toUTCString();

  const itemsXml = blogPosts
    .map((post) => {
      const postUrl = `${siteUrl}/en/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${company.email} (${post.author.name})</author>
      <category>${post.categoryLabel}</category>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} — Blog &amp; Insights</title>
    <link>${siteUrl}/en/blog</link>
    <description>${siteConfig.description}</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}