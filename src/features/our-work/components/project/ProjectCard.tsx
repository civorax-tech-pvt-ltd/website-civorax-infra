import Image from "next/image";
import LocaleLink from "@/shared/ui/LocaleLink";

import type { Project } from "@/entities/projects";

type ProjectCardProps = {
  project: Project;
  featuredLayout?: boolean;
};

function getBadge(project: Project): string {
  if (project.categories.includes("home-concepts"))
    return "Concept Design";

  if (project.categories.includes("interior-concepts"))
    return "Interior Preview";

  if (project.categories.includes("commercial"))
    return "Commercial";

  if (project.categories.includes("renovation"))
    return "Renovation";

  return "3D Visualization";
}

function getBadgeStyle(project: Project): string {
  if (project.categories.includes("interior-concepts")) {
    return "bg-[#006c4e]/90 text-white";
  }

  return "bg-[#e8855d]/90 text-[#370e00]";
}

function getStatusLabel(status: Project["status"]): string {
  switch (status) {
    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    case "concept":
      return "Concept";

    default:
      return "";
  }
}

function getGridClass(project: Project, featuredLayout: boolean) {
  if (!featuredLayout) {
    return "md:col-span-6 aspect-[16/10]";
  }

  return project.size === "large"
    ? "md:col-span-8 aspect-[16/9]"
    : "md:col-span-4 aspect-square";
}

export default function ProjectCard({
  project,
  featuredLayout = false,
}: ProjectCardProps) {
  return (
    <article
      className={`group ${getGridClass(project, featuredLayout)}`}
    >
      <LocaleLink
        href={`/our-work/${project.categories[0]}/${project.slug}`}
        className="block h-full"
      >
        <div className="relative h-full overflow-hidden rounded-[18px] bg-[#f0ede9] shadow-[0_16px_55px_rgba(8,29,48,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(0,108,78,0.10)]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur-md ${getBadgeStyle(
                project
              )}`}
            >
              {getBadge(project)}
            </span>

            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-[#006c4e] backdrop-blur-md">
              {getStatusLabel(project.status)}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <h2 className="font-sora text-2xl font-bold leading-tight tracking-[-0.04em] sm:text-3xl">
              {project.title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/82">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </LocaleLink>
    </article>
  );
}