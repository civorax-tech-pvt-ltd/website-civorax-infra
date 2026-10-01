import type { Project, ProjectCategory } from "@/entities/projects";

import HeroSection from "./components/HeroSection";
import CategoryTabs from "./components/CategoryTabs";
import ProjectGrid from "./components/project/ProjectGrid";
import CTASection from "./components/CTASection";

type Props = {
  category: ProjectCategory;
  categories: ProjectCategory[];
  projects: Project[];
};

export default function CategoryPage({ category, categories, projects }: Props) {
  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <HeroSection
        title={category.label}
        description={category.description ?? "Explore our architectural portfolio."}
      />

      <CategoryTabs categories={categories} activeFilter={category.id} />

      <ProjectGrid projects={projects} featuredLayout={false} />

      <CTASection />
    </main>
  );
}
