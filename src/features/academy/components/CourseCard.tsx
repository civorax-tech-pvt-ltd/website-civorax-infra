import Image from "next/image";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import LocaleLink from "@/shared/ui/LocaleLink";
import { formatNpr } from "@/lib/utils";
import type { Course } from "../types/academy.types";

const fallbackImage =
  "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=85";

export default function CourseCard({ course }: { course: Course }) {
  const hasDiscount =
    course.discount_fee !== null && course.discount_fee < course.fee;

  return (
    <LocaleLink
      href={`/academy/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-[#e5e2dd] bg-white shadow-[0_14px_45px_rgba(8,29,48,0.045)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(8,29,48,0.08)]"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.cover_image_url ?? fallbackImage}
          alt={course.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {hasDiscount ? (
          <span className="absolute left-4 top-4 rounded-full bg-[#e8855d] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-lg">
            Sale
          </span>
        ) : null}

        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {course.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sora text-lg font-bold tracking-[-0.02em] text-[#1c1c19]">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[#6d7a72]">
          {course.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-[#6d7a72]">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap size={14} />
            {course.type}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#f0ede9] pt-4">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-[#9ca3af] line-through">
                  NPR {formatNpr(course.fee)}
                </span>
                <span className="font-sora text-lg font-bold text-[#006c4e]">
                  NPR {formatNpr(course.discount_fee!)}
                </span>
              </>
            ) : (
              <span className="font-sora text-lg font-bold text-[#1c1c19]">
                {course.fee > 0 ? `NPR ${formatNpr(course.fee)}` : "Free"}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006c4e] transition-all group-hover:gap-2.5">
            View
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </LocaleLink>
  );
}
