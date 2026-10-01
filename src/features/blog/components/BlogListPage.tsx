import type { BlogCategory, BlogPost } from "@/entities/blog";
import BlogCard from "./BlogCard";
import SectionEyebrow from "@/shared/ui/SectionEyebrow";
import LocaleLink from "@/shared/ui/LocaleLink";

export default function BlogListPage({
  currentCategory = "all",
  posts,
  categories,
}: {
  currentCategory?: string;
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const activeCategoryObj = categories.find((c) => c.slug === currentCategory);

  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-20 sm:px-8 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow tone="emerald">CivoraX Insights</SectionEyebrow>
          <h1 className="font-sora text-[38px] font-bold leading-[1.08] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]">
            {activeCategoryObj
              ? `${activeCategoryObj.label} Guides & Insights`
              : "Construction & House Design Knowledge Base"}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#3d4a43] sm:text-lg">
            {activeCategoryObj?.description ??
              "Engineering tips, municipal permits, BOQ estimates, and modern architectural insights for homeowners and developers across Koshi and Nepal."}
          </p>
        </div>

        {/* Real Crawlable Category Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          <LocaleLink
            href="/blog"
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
              currentCategory === "all"
                ? "bg-[#006c4e] text-white shadow-md"
                : "bg-white text-[#3d4a43] hover:bg-[#006c4e]/10 hover:text-[#006c4e]"
            }`}
          >
            All Articles
          </LocaleLink>
          {categories.map((cat) => (
            <LocaleLink
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all sm:text-sm ${
                currentCategory === cat.slug
                  ? "bg-[#006c4e] text-white shadow-md"
                  : "bg-white text-[#3d4a43] hover:bg-[#006c4e]/10 hover:text-[#006c4e]"
              }`}
            >
              {cat.label}
            </LocaleLink>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto max-w-[1280px] px-5 pb-28 sm:px-8 lg:px-16">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-[#e5e2dd] bg-white p-12 text-center">
            <p className="text-base text-[#6d7a72]">No articles found in this category yet.</p>
            <LocaleLink
              href="/blog"
              className="mt-4 inline-block font-bold text-[#006c4e] hover:underline"
            >
              ← View all articles
            </LocaleLink>
          </div>
        )}
      </section>
    </main>
  );
}