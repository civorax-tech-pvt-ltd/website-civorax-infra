import type { Project, ProjectCategory } from "@/entities/projects";

import HeroSection from "./components/HeroSection";
import CategoryTabs from "./components/CategoryTabs";
import CTASection from "./components/CTASection";
import ProjectGrid from "./components/project/ProjectGrid";

type Props = {
  projects: Project[];
  categories: ProjectCategory[];
};

/**
 * Server-rendered so every project card and link is in the HTML search engines read.
 * Category tabs are links to the category pages (/our-work/{slug}).
 */
export default function OurWorkPage({ projects, categories }: Props) {
  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <HeroSection
        title="Concepts, Visualizations & Design Directions"
        description="Exploring the synergy between technical precision and Nepali architectural heritage. Our conceptual portfolio showcases the future of infrastructure through the lens of innovation and cultural soul."
      />

      <CategoryTabs categories={categories} activeFilter="all" />

      <ProjectGrid projects={projects} featuredLayout />

      <CTASection />
    </main>
  );
}
