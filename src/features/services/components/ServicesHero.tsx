import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LocaleLink from "@/shared/ui/LocaleLink";
import { BadgeCheck } from "lucide-react";
import { company } from "@/entities/company";
import { consultationLink } from "@/entities/navigation";

const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";

export default function ServicesHero() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-5 pb-24 pt-20 sm:px-8 lg:px-16 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(circle_at_2px_2px,rgba(152,71,36,0.07)_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="mb-5 inline-flex rounded-full bg-[#006c4e]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#006c4e]">
            Our Services
          </span>

          <h1 className="font-sora max-w-3xl text-[42px] font-bold leading-[1.06] tracking-[-0.05em] text-[#1c1c19] sm:text-[56px] lg:text-[64px]">
            Building-related services with clarity before execution.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#3d4a43] sm:text-lg">
            {company.name} helps clients plan, design, renovate, visualize, and
            build better spaces through field understanding, budget-aware
            guidance, and clear communication.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <LocaleLink
              href={consultationLink}
              className="inline-flex h-[54px] items-center justify-center gap-3 rounded-full bg-[#20b486] px-7 text-sm font-bold text-[#003f2c] shadow-[0_18px_50px_rgba(32,180,134,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#006c4e] hover:text-white"
            >
              Discuss Your Project
              <ArrowRight size={18} />
            </LocaleLink>

            <LocaleLink
              href="/process"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-[#006c4e]/25 bg-white px-7 text-sm font-bold text-[#006c4e] transition-all hover:-translate-y-0.5 hover:bg-[#f0ede9]"
            >
              See Our Process
            </LocaleLink>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="aspect-square overflow-hidden rounded-[28px] shadow-[0_30px_90px_rgba(8,29,48,0.16)]">
            <Image
              src={heroImage}
              alt="Modern building design and construction planning"
              width={800}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden max-w-[260px] rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(8,29,48,0.14)] md:block">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ffdbce] text-[#984724]">
                <BadgeCheck size={24} />
              </div>

              <div>
                <p className="font-sora text-lg font-semibold leading-tight text-[#1c1c19]">
                  Honest service guidance
                </p>
                <p className="mt-1 text-xs leading-5 text-[#6d7a72]">
                  We help clients understand what they need before committing
                  to execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
