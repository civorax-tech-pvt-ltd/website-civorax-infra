import LocaleLink from "@/shared/ui/LocaleLink";
import { ArrowRight, Calendar, Clock, UserRound } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "@/entities/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-[#e5e2dd] bg-white shadow-[0_14px_45px_rgba(8,29,48,0.045)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(8,29,48,0.08)]">
      <div className="relative h-56 w-full overflow-hidden bg-[#f0ede9]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <LocaleLink
          href={`/blog/category/${post.category}`}
          className="absolute left-4 top-4 rounded-full bg-[#006c4e] px-3.5 py-1 text-xs font-bold text-white shadow-md transition-opacity hover:opacity-90"
        >
          {post.categoryLabel}
        </LocaleLink>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-4 text-xs font-medium text-[#6d7a72]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {post.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>
        <h2 className="font-sora mt-3 text-xl font-bold leading-snug tracking-[-0.03em] text-[#1c1c19] transition-colors group-hover:text-[#006c4e]">
          <LocaleLink href={`/blog/${post.slug}`}>
            {post.title}
          </LocaleLink>
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[#3d4a43]">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-[#f0ede9] pt-4">
          <div className="flex items-center gap-2.5">
            {post.author.avatar ? (
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#006c4e]/20 bg-[#006c4e]/10">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="28px"
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#006c4e]/10 text-[#006c4e]">
                <UserRound size={14} />
              </div>
            )}
            <span className="text-xs font-semibold text-[#1c1c19]">
              {post.author.name}
            </span>
          </div>
          <LocaleLink
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006c4e] transition-all group-hover:gap-2.5"
          >
            Read Article
            <ArrowRight size={15} />
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}