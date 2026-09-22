import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";
import BulletList from "@/shared/ui/BulletList";
import { consultationLink } from "@/entities/navigation";
import type { Service } from "@/entities/services";

type ServiceFeatureRowProps = {
  service: Service;
  align?: "left" | "right";
  background?: "default" | "muted";
};

const backgroundClasses: Record<
  NonNullable<ServiceFeatureRowProps["background"]>,
  string
> = {
  default: "bg-transparent",
  muted: "bg-[#f0ede9]",
};

export default function ServiceFeatureRow({
  service,
  align = "right",
  background = "default",
}: ServiceFeatureRowProps) {
  const isImageLeft = align === "left";

  return (
    <section
      id={service.slug}
      className={`${backgroundClasses[background]} px-5 py-24 sm:px-8 lg:px-16 lg:py-28`}
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-12 lg:gap-16">
        <div
          className={`relative ${
            isImageLeft ? "order-2 md:order-1 md:col-span-7" : "md:col-span-5"
          }`}
        >
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#ffdbce]/25" />

          <Image
            src={service.image}
            alt={`${service.title} planning and execution`}
            width={1000}
            height={800}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-[360px] w-full rounded-[24px] object-cover shadow-[0_20px_70px_rgba(8,29,48,0.12)] sm:h-[460px] lg:h-[500px]"
          />
        </div>

        <div
          className={`${
            isImageLeft ? "order-1 md:order-2 md:col-span-5" : "md:col-span-7"
          }`}
        >
          <span className="mb-6 inline-flex rounded-full bg-[#ffdbce] px-3 py-1 text-xs font-bold text-[#370e00]">
            {labelForCategory(service.category)}
          </span>

          <h2 className="font-sora text-3xl font-semibold tracking-[-0.04em] text-[#1c1c19] sm:text-4xl lg:text-[48px]">
            {service.title}
          </h2>

          <p className="mt-6 text-base leading-8 text-[#3d4a43]">
            {service.description}
          </p>

          <div className="mt-8">
            <BulletList items={service.highlights} />
          </div>

          <LocaleLink
            href={consultationLink}
            className="mt-8 inline-flex h-[50px] items-center justify-center rounded-xl bg-[#006c4e] px-7 text-sm font-bold text-white shadow-[0_16px_45px_rgba(0,108,78,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#20b486] hover:text-[#003f2c]"
          >
            {service.ctaLabel}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}

function labelForCategory(category: Service["category"]): string {
  switch (category) {
    case "build":
      return "Construction Support";
    case "design":
      return "Design Direction";
    case "renovate":
      return "Existing Space Improvement";
    case "plan":
      return "Planning & Site Support";
    case "manage":
      return "Project Coordination";
  }
}
