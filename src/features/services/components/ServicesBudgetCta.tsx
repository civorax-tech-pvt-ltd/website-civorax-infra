import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";
import BulletList from "@/shared/ui/BulletList";
import { consultationLink } from "@/entities/navigation";

const supervisionImage =
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85";

const budgetPoints = [
  "Budget-based design discussion",
  "Material and finishing guidance",
  "Priority-based planning",
  "Practical next-step recommendation",
];

export default function ServicesBudgetCta() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-28 sm:px-8 lg:px-16">
      <div className="overflow-hidden rounded-[42px] bg-[#e5e2dd] shadow-[0_24px_90px_rgba(8,29,48,0.10)] md:grid md:grid-cols-12">
        <div className="flex flex-col justify-center p-8 sm:p-10 md:col-span-5 lg:p-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#006c4e]">
            Budget Guidance
          </p>

          <h2 className="font-sora text-3xl font-semibold tracking-[-0.04em] text-[#1c1c19] sm:text-4xl lg:text-[44px]">
            Helping clients choose better homes and spaces under budget.
          </h2>

          <p className="mt-6 text-base leading-8 text-[#3d4a43]">
            We help clients think practically about design, materials,
            construction priorities, and finishing choices so they can make
            better decisions within their budget range.
          </p>

          <div className="mt-8">
            <BulletList
              items={budgetPoints}
              textClassName="text-sm leading-7 text-[#3d4a43]"
            />
          </div>

          <LocaleLink
            href={consultationLink}
            className="mt-9 inline-flex h-[52px] w-fit items-center justify-center rounded-full bg-[#006c4e] px-7 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,108,78,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#20b486] hover:text-[#003f2c]"
          >
            Start Budget Discussion
          </LocaleLink>
        </div>

        <div className="min-h-[360px] md:col-span-7">
          <Image
            src={supervisionImage}
            alt="Project supervision and planning discussion"
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
