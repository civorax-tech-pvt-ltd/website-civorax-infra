import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";
import { ArrowRight } from "lucide-react";

import { projects, categories } from "@/entities/projects";

export default function WorkPreviewSection() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="bg-[#fcf9f4] px-5 pb-24 pt-14 text-[#081d30] sm:px-8 sm:pt-16 lg:px-16 lg:pb-32 lg:pt-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-[#984724]">
              Our Work
            </p>

            <h2 className="font-sora text-3xl font-semibold tracking-[-0.035em] text-[#1c1c19] sm:text-4xl lg:text-[44px]">
              Building Concepts
            </h2>
          </div>

          <LocaleLink
            href="/our-work"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#006c4e] transition-all duration-200 hover:gap-3"
          >
            Browse Full Portfolio
            <ArrowRight size={17} strokeWidth={2.4} />
          </LocaleLink>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {featuredProjects.map((project, index) => {
            const isLarge = project.size === "large";

            const category = categories.find(
              (c) => c.id === project.categories[0]
            );

            return (
              <LocaleLink
                key={project.id}
                href={`/our-work/${project.categories[0]}/${project.slug}`}
                className={`group relative min-h-[280px] overflow-hidden rounded-[28px] shadow-[0_20px_70px_rgba(8,29,48,0.10)] ${
                  isLarge ? "md:col-span-8" : "md:col-span-4"
                } ${index === 1 ? "md:min-h-[390px]" : ""}`}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute left-6 top-6 rounded-full bg-[#e8855d]/90 px-4 py-1.5 text-xs font-bold text-[#370e00] backdrop-blur-md">
                  {category?.label}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <h3
                    className={`font-sora font-semibold tracking-[-0.035em] ${
                      isLarge ? "text-2xl sm:text-3xl" : "text-2xl"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/78">
                    {project.shortDescription}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#77fac7] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View Details
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </span>
                </div>
              </LocaleLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}