import Image from "next/image";
import { processSteps } from "@/entities/process";

const processBackground =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85";

export default function ProcessPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ee] px-5 pb-14 pt-24 text-[#081d30] sm:px-8 sm:pb-16 lg:px-16 lg:pb-20 lg:pt-32">
      <div className="absolute inset-0">
        <Image
          src={processBackground}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="h-full w-full object-cover opacity-[1]"
        />

        <div className="absolute inset-0 bg-[#f6f3ee]/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f3ee]/95 via-[#f6f3ee]/72 to-[#f6f3ee]/95" />

        <div className="absolute -left-28 top-10 h-[420px] w-[420px] rounded-full bg-[#20b486]/18 blur-[90px]" />
        <div className="absolute -right-28 bottom-8 h-[420px] w-[420px] rounded-full bg-[#e8855d]/20 blur-[90px]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/28 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mb-20 text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.55em] text-[#984724]">
            The Journey
          </p>

          <h2 className="font-sora text-3xl font-semibold tracking-[-0.04em] text-[#1c1c19] sm:text-4xl lg:text-[44px]">
            How We Build Your Vision
          </h2>
        </div>

        <div className="relative mx-auto max-w-[1100px]">
          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-[#bdb6ab]/80 lg:block" />

          <div className="relative grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="relative z-10 rounded-[24px] border border-white/75 bg-white/78 px-7 py-10 text-center shadow-[0_18px_55px_rgba(8,29,48,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#20b486]/35 hover:bg-white/90 hover:shadow-[0_28px_80px_rgba(8,29,48,0.12)]"
              >
                <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-[#007a55] text-white shadow-[0_18px_45px_rgba(0,108,78,0.26)]">
                  <span className="font-sora text-2xl font-semibold">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-sora mt-8 text-[22px] font-medium tracking-[-0.025em] text-[#1c1c19]">
                  {item.title}
                </h3>

                <p className="mx-auto mt-5 max-w-[220px] text-[16px] leading-7 text-[#3d4a43]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
