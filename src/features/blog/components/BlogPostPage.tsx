import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";
import { ArrowRight, Calculator, Calendar, Clock, HelpCircle, UserRound } from "lucide-react";
import type { BlogPost } from "@/entities/blog";
import { consultationLink } from "@/entities/navigation";
import { MarkdownContent } from "./MarkdownContent";

export default function BlogPostPage({
  post,
  relatedPosts = [],
}: {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}) {
  return (
    <article className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      {/* Header */}
      <header className="mx-auto max-w-[960px] px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="mb-4">
          <LocaleLink href="/blog" className="text-xs font-bold uppercase tracking-widest text-[#006c4e] hover:underline">
            ← Back to Knowledge Hub
          </LocaleLink>
        </div>
        <LocaleLink
          href={`/blog/category/${post.category}`}
          className="inline-block rounded-full bg-[#006c4e]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#006c4e] transition-colors hover:bg-[#006c4e]/20"
        >
          {post.categoryLabel}
        </LocaleLink>
        <h1 className="font-sora mt-4 text-[34px] font-bold leading-[1.12] tracking-[-0.04em] text-[#1c1c19] sm:text-[46px] lg:text-[52px]">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-[#e5e2dd] pb-8 text-sm text-[#6d7a72]">
          <div className="flex items-center gap-3">
            {post.author.avatar ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#006c4e]/20 bg-[#006c4e]/10 shadow-sm">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#006c4e]/10 text-[#006c4e]">
                <UserRound size={20} />
              </div>
            )}
            <div>
              <p className="font-bold text-[#1c1c19]">{post.author.name}</p>
              <p className="text-xs text-[#6d7a72]">{post.author.role}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5"><Calendar size={16} /> {post.publishedAt}</span>
          <span className="flex items-center gap-1.5"><Clock size={16} /> {post.readingTime}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mx-auto my-8 max-w-[1100px] px-5 sm:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content and Sticky Sidebar */}
      <div className="mx-auto grid max-w-[1100px] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Extended Markdown Body */}
          <MarkdownContent content={post.content} />

          {/* Author Bio Box for E-E-A-T Authority */}
          <div className="my-10 flex items-center gap-5 rounded-2xl border border-[#e5e2dd] bg-white p-6 shadow-sm">
            {post.author.avatar ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#006c4e]/20 shadow-sm">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#006c4e]/10 text-[#006c4e]">
                <UserRound size={28} />
              </div>
            )}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006c4e]">Written by</span>
              <h3 className="font-sora text-base font-bold text-[#1c1c19]">{post.author.name}</h3>
              <p className="text-xs text-[#6d7a72]">{post.author.role} at CivoraX Infra</p>
            </div>
          </div>

          {/* Interlinking Anchor: Process Budget Estimator Banner */}
          {post.relatedEstimatorAnchor && (
            <div className="my-10 rounded-2xl border border-[#20b486]/30 bg-gradient-to-br from-[#e6f7f2] to-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-[#006c4e]">
                <Calculator size={24} />
                <h4 className="font-sora text-lg font-bold">Calculate Your Own Construction Cost</h4>
              </div>
              <p className="mt-2 text-sm text-[#3d4a43]">
                Try our interactive <strong>Project Budget Estimator</strong> to get instant sq. ft. and total budget estimates based on land area in Aana.
              </p>
              <LocaleLink
                href="/process#budget-estimator"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#006c4e] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#20b486] hover:text-[#003f2c]"
              >
                Open Project Estimator Tool <ArrowRight size={14} />
              </LocaleLink>
            </div>
          )}

          {/* Frequently Asked Questions (FAQ Section) */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="my-12 rounded-[24px] border border-[#e5e2dd] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#006c4e]">
                <HelpCircle size={22} />
                <h3 className="font-sora text-xl font-bold text-[#1c1c19]">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="mt-6 space-y-5 divide-y divide-[#f0ede9]">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-5" : ""}>
                    <h4 className="font-sora text-base font-bold text-[#1c1c19]">
                      {faq.question}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-[#3d4a43]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-[#e5e2dd] pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-[#f0ede9] px-3 py-1 text-xs font-medium text-[#6d7a72]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar: Interlinking Hub */}
        <aside className="space-y-6 lg:col-span-4">
          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="rounded-[24px] border border-[#e5e2dd] bg-white p-6 shadow-sm">
              <h4 className="font-sora text-base font-bold text-[#1c1c19]">Related Guides</h4>
              <ul className="mt-4 space-y-3">
                {relatedPosts.map((rPost) => (
                  <li key={rPost.slug}>
                    <LocaleLink
                      href={`/blog/${rPost.slug}`}
                      className="group block rounded-xl border border-[#e5e2dd] p-3.5 transition-all hover:border-[#006c4e]"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#006c4e]">
                        {rPost.categoryLabel}
                      </span>
                      <p className="font-sora mt-1 line-clamp-2 text-sm font-bold text-[#1c1c19] group-hover:text-[#006c4e]">
                        {rPost.title}
                      </p>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Services */}
          <div className="rounded-[24px] border border-[#e5e2dd] bg-white p-6 shadow-sm">
            <h4 className="font-sora text-base font-bold text-[#1c1c19]">Related Services</h4>
            <p className="mt-1 text-xs text-[#6d7a72]">Work with our engineers and architects</p>
            <ul className="mt-4 space-y-3">
              {post.relatedServices.map((svc, sIdx) => (
                <li key={`${svc.href}-${svc.label}-${sIdx}`}>
                  <LocaleLink
                    href={svc.href}
                    className="flex items-center justify-between rounded-xl bg-[#fcf9f4] p-3 text-sm font-semibold text-[#006c4e] transition-colors hover:bg-[#006c4e]/8"
                  >
                    <span>{svc.label}</span>
                    <ArrowRight size={14} />
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Case Studies */}
          {post.relatedProjects && post.relatedProjects.length > 0 && (
            <div className="rounded-[24px] border border-[#e5e2dd] bg-white p-6 shadow-sm">
              <h4 className="font-sora text-base font-bold text-[#1c1c19]">Featured Case Study</h4>
              <ul className="mt-4 space-y-3">
                {post.relatedProjects.map((proj) => (
                  <li key={proj.slug}>
                    <LocaleLink
                      href={`/our-work/${proj.category}/${proj.slug}`}
                      className="group block rounded-xl border border-[#e5e2dd] p-3.5 transition-all hover:border-[#006c4e]"
                    >
                      <p className="text-xs font-bold uppercase text-[#984724]">Portfolio Concept</p>
                      <p className="font-sora mt-1 text-sm font-bold text-[#1c1c19] group-hover:text-[#006c4e]">
                        {proj.title}
                      </p>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick CTA Card */}
          <div className="rounded-[24px] bg-[#081d30] p-6 text-white shadow-lg">
            <h4 className="font-sora text-lg font-bold">Have a Project in Mind?</h4>
            <p className="mt-2 text-xs leading-5 text-white/75">
              Discuss your site requirements, floor plans, and estimate with our team in Itahari.
            </p>
            <LocaleLink
              href={consultationLink}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#20b486] text-xs font-bold text-[#003f2c] transition-all hover:bg-white hover:text-[#006c4e]"
            >
              Book Free Consultation
              <ArrowRight size={14} />
            </LocaleLink>
          </div>
        </aside>
      </div>
    </article>
  );
}