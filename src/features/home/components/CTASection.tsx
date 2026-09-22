import Button from "@/shared/ui/Button";
import { consultationLink } from "@/entities/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#fcf9f4] px-5 py-20 text-[#081d30] sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[34px] border border-[#081d30]/10 bg-[#081d30] px-6 py-16 text-center shadow-[0_28px_90px_rgba(8,29,48,0.22)] sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#20b486]/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#e8855d]/18 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-[#77fac7]">
              Start Your Project
            </p>

            <h2 className="font-sora text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-[46px]">
              Planning to Build, Renovate, or Design?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Let&apos;s discuss your project vision, budget range, site condition,
              and planning needs before execution begins.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={consultationLink} size="lg">
                Start a Project Discussion
                <ArrowRight size={18} strokeWidth={2.4} />
              </Button>

              <Button
                href="/contact?type=architect"
                size="lg"
                className="bg-[#808080] text-[#006400] hover:bg-white hover:text-[#007a55]"
              >
                <MessageCircle size={18} strokeWidth={2.3} />
                Send Project Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
