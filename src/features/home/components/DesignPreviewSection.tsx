import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";
import { ArrowRight, Moon, Play, Sun } from "lucide-react";
import { consultationLink } from "@/entities/navigation";

export default function DesignPreviewSection() {
  return (
    <section className="overflow-hidden bg-[#2f302d] px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="group relative overflow-hidden rounded-[30px] border-[8px] border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <Image
              src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=85"
              alt="Premium interior design preview"
              width={1280}
              height={720}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-video h-full w-full object-cover brightness-90 transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20b486] text-white shadow-lg">
                <Play size={23} fill="currentColor" />
              </div>

              <div>
                <p className="font-sora text-base font-semibold">
                  Live Interactive Preview
                </p>
                <p className="mt-1 text-xs text-white/65">
                  Visualize before execution
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-[#77fac7]">
            Design Preview
          </p>

          <h2 className="font-sora max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-[44px]">
            Visualize Your Space Before Construction
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
            We use drawings, 3D views, material moodboards, and walkthrough-style
            previews to help you understand the design before execution begins.
          </p>

          <div className="mt-9 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Room Type
                </span>

                <select className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none backdrop-blur-md focus:border-[#77fac7]">
                  <option className="text-[#081d30]">Living Hall</option>
                  <option className="text-[#081d30]">Master Bedroom</option>
                  <option className="text-[#081d30]">Modern Kitchen</option>
                  <option className="text-[#081d30]">Office Space</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Floor Finish
                </span>

                <select className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white outline-none backdrop-blur-md focus:border-[#77fac7]">
                  <option className="text-[#081d30]">Polished Teak</option>
                  <option className="text-[#081d30]">Italian Marble</option>
                  <option className="text-[#081d30]">Micro-cement</option>
                  <option className="text-[#081d30]">Stone Texture</option>
                </select>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Lighting Mode
                </span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#20b486] text-[#003f2c] transition-transform hover:scale-105"
                    aria-label="Day lighting mode"
                  >
                    <Sun size={18} />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-105"
                    aria-label="Night lighting mode"
                  >
                    <Moon size={18} />
                  </button>
                </div>
              </div>

              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Theme
                </span>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-[#e8855d] px-4 py-2 text-sm font-bold text-[#370e00]"
                  >
                    Heritage
                  </button>

                  <button
                    type="button"
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white"
                  >
                    Minimal
                  </button>
                </div>
              </div>
            </div>

            <LocaleLink
              href={consultationLink}
              className="inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#20b486] px-6 text-sm font-bold text-[#003f2c] shadow-[0_20px_60px_rgba(32,180,134,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#32CD32] hover:text-[#006c4e] sm:w-auto"
            >
              Start Design Preview Discussion
              <ArrowRight size={18} strokeWidth={2.4} />
            </LocaleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
