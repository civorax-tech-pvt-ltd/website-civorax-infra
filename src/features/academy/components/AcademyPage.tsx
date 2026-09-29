import { siteConfig } from "@/configs/site.config";
import { getCourses } from "../api/courses";
import CourseCard from "./CourseCard";
import { academyFaqs } from "@/shared/seo/AcademyJsonLd";
import { HelpCircle } from "lucide-react";

export default async function AcademyPage() {
  const courses = await getCourses();

  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      {/* Original Authentic Hero Section */}
      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-20 sm:px-8 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex rounded-full bg-[#006c4e]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#006c4e]">
            CivoraX Academy
          </span>

          <h1 className="font-sora text-[40px] font-bold leading-[1.08] tracking-[-0.05em] text-[#1c1c19] sm:text-[52px]">
            Build Real Skills for Architecture & Construction
          </h1>

          <p className="mt-6 text-base leading-8 text-[#3d4a43] sm:text-lg">
            Hands-on courses in design software, drafting, and site practice —
            taught by our own working team.
          </p>
        </div>
      </section>

      {/* Real Live Courses (Directly from API / Database) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 lg:px-16">
        {courses.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#bccac1] bg-white/60 p-16 text-center">
            <p className="text-sm text-[#6d7a72]">
              No courses are open for enrollment right now — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Frequently Asked Questions (FAQ Section with Schema.org alignment) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 lg:px-16">
        <div className="rounded-[28px] border border-[#e5e2dd] bg-white p-8 sm:p-12">
          <div className="flex items-center gap-3 text-[#006c4e]">
            <HelpCircle size={24} />
            <h2 className="font-sora text-2xl font-bold text-[#1c1c19]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-6 divide-y divide-[#f0ede9]">
            {academyFaqs.map((faq, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                <h3 className="font-sora text-base font-bold text-[#1c1c19] sm:text-lg">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#3d4a43]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Portal CTA Banner */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 lg:px-16">
        <div className="rounded-[28px] bg-[#006c4e] p-10 text-center text-white shadow-[0_18px_70px_rgba(0,108,78,0.16)] sm:p-14">
          <h2 className="font-sora text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
            Already enrolled?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Track your classes, payments, and materials in the student portal.
          </p>
          <a
            href={`${siteConfig.appUrl}/student/login`}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-[#006c4e] transition-transform hover:scale-105"
          >
            Go to Student Portal
          </a>
        </div>
      </section>
    </main>
  );
}