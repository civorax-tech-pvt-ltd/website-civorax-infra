import Image from "next/image";
import { Clock, GraduationCap } from "lucide-react";
import LocaleLink from "@/shared/ui/LocaleLink";
import { siteConfig } from "@/configs/site.config";
import { formatNpr } from "@/lib/utils";
import type { CourseDetail } from "../types/academy.types";

const fallbackImage =
  "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=85";

export default function CourseDetailPage({ course }: { course: CourseDetail }) {
  const hasDiscount =
    course.discount_fee !== null && course.discount_fee < course.fee;

  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px]">
        <Image
          src={course.cover_image_url ?? fallbackImage}
          alt={course.title}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-5 pb-10 sm:px-8 lg:px-16">
          <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {course.type}
          </span>
          <h1 className="font-sora text-[36px] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-[48px]">
            {course.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-sora text-2xl font-bold tracking-[-0.03em]">
              About This Course
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3d4a43]">
              {course.description}
            </p>

            <h2 className="mt-10 font-sora text-2xl font-bold tracking-[-0.03em]">
              Syllabus
            </h2>
            <p className="mt-4 whitespace-pre-line text-base leading-7 text-[#3d4a43]">
              {course.syllabus}
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-8 rounded-[24px] border border-[#e5e2dd] bg-white p-7 shadow-[0_18px_60px_rgba(8,29,48,0.07)]">
              <div className="flex items-baseline gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-base font-medium text-[#9ca3af] line-through">
                      NPR {formatNpr(course.fee)}
                    </span>
                    <span className="font-sora text-3xl font-bold text-[#006c4e]">
                      NPR {formatNpr(course.discount_fee!)}
                    </span>
                  </>
                ) : (
                  <span className="font-sora text-3xl font-bold text-[#1c1c19]">
                    {course.fee > 0 ? `NPR ${formatNpr(course.fee)}` : "Free"}
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-3 border-t border-[#f0ede9] pt-6 text-sm text-[#3d4a43]">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#006c4e]" />
                  Duration: {course.duration}
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={16} className="text-[#006c4e]" />
                  Mode: {course.type}
                </div>
              </div>

              <a
                href={`${siteConfig.appUrl}/student/enroll/${course.id}`}
                className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#006c4e] px-6 text-sm font-bold text-white transition-colors hover:bg-[#00543c]"
              >
                Enroll Now
              </a>

              <p className="mt-3 text-center text-xs text-[#9ca3af]">
                Already logged in? You&apos;ll be enrolled instantly — otherwise
                you&apos;ll be asked to log in or create a student account first.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <LocaleLink
            href="/academy"
            className="text-sm font-bold text-[#006c4e] hover:underline"
          >
            ← Back to all courses
          </LocaleLink>
        </div>
      </section>
    </main>
  );
}
