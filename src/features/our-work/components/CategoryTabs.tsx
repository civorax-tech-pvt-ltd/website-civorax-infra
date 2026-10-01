import { allCategory, type ProjectCategory } from "@/entities/projects";
import LocaleLink from "@/shared/ui/LocaleLink";

type CategoryTabsProps = {
  categories: ProjectCategory[];
  /** Slug of the current category, or "all". */
  activeFilter: string;
};

/**
 * Filter tabs as real links, so each category page is crawlable and shareable.
 */
export default function CategoryTabs({
  categories,
  activeFilter,
}: CategoryTabsProps) {
  const tabs = [allCategory, ...categories.filter((c) => c.visible).sort((a, b) => a.order - b.order)];

  return (
    <nav aria-label="Portfolio categories" className="mx-auto max-w-[1280px] px-5 pb-10 sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-center gap-4">
        {tabs.map((category) => {
          const isActive = activeFilter === category.id;
          const targetHref = category.id === "all" ? "/our-work" : `/our-work/${category.slug}`;

          return (
            <LocaleLink
              key={category.id}
              href={targetHref}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#006c4e] text-white shadow-[0_12px_35px_rgba(0,108,78,0.16)]"
                  : "bg-[#f0ede9] text-[#3d4a43] hover:bg-[#20b486]/10 hover:text-[#006c4e]"
              }`}
            >
              {category.label}
            </LocaleLink>
          );
        })}
      </div>
    </nav>
  );
}
