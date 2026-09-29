import { serviceFaqs } from "@/shared/seo/ServicesJsonLd";
import { HelpCircle, ShieldCheck, Award, Ruler, CheckCircle2 } from "lucide-react";
import LocaleLink from "@/shared/ui/LocaleLink";
import SectionEyebrow from "@/shared/ui/SectionEyebrow";

export default function ServicesWhyUsSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
      {/* High-Intent SEO Content Block */}
      <div className="rounded-[32px] border border-[#e5e2dd] bg-white p-8 shadow-[0_16px_50px_rgba(8,29,48,0.04)] sm:p-12 lg:p-16">
        <div className="max-w-3xl">
          <SectionEyebrow tone="emerald">Why CivoraX Infra</SectionEyebrow>
          <h2 className="font-sora mt-3 text-2xl font-bold leading-tight tracking-tight text-[#1c1c19] sm:text-3xl lg:text-4xl">
            Why CivoraX is Rated the Top Civil Consultancy & Construction Company in Koshi
          </h2>
          <p className="mt-4 text-base leading-8 text-[#3d4a43]">
            From Itahari and Dharan to Biratnagar, Damak, and Birtamode, building a durable structure requires more than raw masonry — it demands licensed structural verification, transparent material auditing, and strict compliance with the Nepal National Building Code.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#f0ede9] bg-[#fcf9f4] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006c4e]/10 text-[#006c4e]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-sora mt-4 text-lg font-bold text-[#1c1c19]">
              NBC 105:2020 Seismic Code
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6d7a72]">
              Ductile structural detailing and earthquake-resistant RCC frame engineering customized for Eastern Nepal soil profiles.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0ede9] bg-[#fcf9f4] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006c4e]/10 text-[#006c4e]">
              <Ruler size={24} />
            </div>
            <h3 className="font-sora mt-4 text-lg font-bold text-[#1c1c19]">
              Transparent BOQ & Zero Hidden Costs
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6d7a72]">
              Itemized material estimates before signing. Calculate early ranges directly on our{" "}
              <LocaleLink href="/process#budget-estimator" className="font-semibold text-[#006c4e] underline">
                Project Cost Estimator
              </LocaleLink>.
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0ede9] bg-[#fcf9f4] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006c4e]/10 text-[#006c4e]">
              <Award size={24} />
            </div>
            <h3 className="font-sora mt-4 text-lg font-bold text-[#1c1c19]">
              Turnkey & Municipal Naksa Pass
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#6d7a72]">
              Complete paperwork, DPC inspections, and building completion certificates (Nirman Sampanna) delivered on schedule.
            </p>
          </div>
        </div>

        {/* FAQs Accordion/List for People Also Ask snippets */}
        <div className="mt-16 border-t border-[#f0ede9] pt-12">
          <div className="flex items-center gap-3 text-[#006c4e]">
            <HelpCircle size={24} />
            <h3 className="font-sora text-2xl font-bold text-[#1c1c19]">
              Frequently Asked Questions About Construction in Nepal
            </h3>
          </div>

          <div className="mt-8 space-y-6 divide-y divide-[#f0ede9]">
            {serviceFaqs.map((faq, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                <h4 className="font-sora text-base font-bold text-[#1c1c19] sm:text-lg">
                  {faq.question}
                </h4>
                <p className="mt-2.5 text-sm leading-7 text-[#3d4a43] sm:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}