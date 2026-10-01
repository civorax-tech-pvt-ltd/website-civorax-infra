import Image from "next/image";

import type { ProjectDetail } from "@/entities/projects";
import LocaleLink from "@/shared/ui/LocaleLink";

import CTASection from "./components/CTASection";
import ProjectGrid from "./components/project/ProjectGrid";

type Props = {
  project: ProjectDetail;
};

function paragraphs(text?: string): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** YouTube watch / short links → privacy-friendly embed URL. */
function youtubeEmbed(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

export default function ProjectDetailPage({ project }: Props) {
  const facts = [
    { label: "Location", value: project.location },
    { label: "Year", value: project.year?.toString() },
    { label: "Client", value: project.client },
    { label: "Status", value: project.status.charAt(0).toUpperCase() + project.status.slice(1) },
  ].filter((fact) => fact.value);

  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      {/* Hero Image */}
      <section className="relative h-[520px] w-full bg-[#1c1c19]">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-12 left-1/2 w-full max-w-[1280px] -translate-x-1/2 px-5 sm:px-8 lg:px-16">
          {/* Visible breadcrumb (also described in JSON-LD for search results) */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li><LocaleLink href="/our-work" className="hover:text-white">Our Work</LocaleLink></li>
              <li aria-hidden="true">/</li>
              <li><LocaleLink href={`/our-work/${project.primaryCategory}`} className="hover:text-white">{project.primaryCategoryName}</LocaleLink></li>
            </ol>
          </nav>

          <h1 className="font-sora text-4xl font-bold text-white sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-white/90">
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-[1100px] px-5 py-20">
        <h2 className="font-sora text-3xl font-bold">
          Project Overview
        </h2>

        <div className="mt-6 space-y-5 leading-8 text-[#3d4a43]">
          {paragraphs(project.overview).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      {/* Project Info */}
      {facts.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-5 pb-20">
          <dl className="grid gap-6 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-semibold">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Services */}
      {project.services.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-5 pb-20">
          <h2 className="font-sora text-3xl font-bold">
            Services
          </h2>

          <ul className="mt-8 flex flex-wrap gap-3">
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full bg-[#006c4e] px-5 py-2 text-white"
              >
                {service}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-5 pb-24">
          <h2 className="mb-8 font-sora text-3xl font-bold">
            Gallery
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((image) => (
              <figure key={image.url}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[16/10] w-full rounded-2xl object-cover"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {project.videos.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-5 pb-24">
          <h2 className="mb-8 font-sora text-3xl font-bold">
            Videos
          </h2>

          <div className="grid gap-6">
            {project.videos.map((video) => {
              const embed = video.type === "youtube" ? youtubeEmbed(video.url) : null;

              return (
                <div key={video.url} className="overflow-hidden rounded-2xl bg-black">
                  {embed ? (
                    <iframe
                      src={embed}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="aspect-video w-full"
                    />
                  ) : (
                    <video src={video.url} controls preload="metadata" className="aspect-video w-full" title={video.title} />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Challenge */}
      {project.challenge && (
        <section className="mx-auto max-w-[1100px] px-5 pb-16">
          <h2 className="font-sora text-3xl font-bold">
            Challenge
          </h2>

          <div className="mt-5 space-y-5 leading-8 text-[#3d4a43]">
            {paragraphs(project.challenge).map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="mx-auto max-w-[1100px] px-5 pb-24">
          <h2 className="font-sora text-3xl font-bold">
            Solution
          </h2>

          <div className="mt-5 space-y-5 leading-8 text-[#3d4a43]">
            {paragraphs(project.solution).map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
        </section>
      )}

      {/* Related projects (internal links help visitors and search engines discover more work) */}
      {project.related.length > 0 && (
        <section className="pb-8">
          <h2 className="mx-auto mb-8 max-w-[1280px] px-5 font-sora text-3xl font-bold sm:px-8 lg:px-16">
            Related Projects
          </h2>

          <ProjectGrid projects={project.related} featuredLayout={false} />
        </section>
      )}

      <CTASection />
    </main>
  );
}
