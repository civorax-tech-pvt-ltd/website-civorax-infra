import Image from "next/image";
import { notFound } from "next/navigation";

import { projects } from "@/entities/projects";

import CTASection from "./components/CTASection";

type Props = {
  categorySlug: string;
  projectSlug: string;
};

export default function ProjectDetailPage({
  categorySlug,
  projectSlug,
}: Props) {
  const project = projects.find(
    (item) =>
      item.slug === projectSlug &&
      item.categories.includes(categorySlug)
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      {/* Hero Image */}
      <section className="relative h-[520px] w-full">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-12 left-1/2 w-full max-w-[1280px] -translate-x-1/2 px-5 sm:px-8 lg:px-16">
          <h1 className="font-sora text-5xl font-bold text-white">
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

        <p className="mt-6 leading-8 text-[#3d4a43]">
          {project.overview}
        </p>
      </section>

      {/* Project Info */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{project.location ?? "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Year</h3>
            <p>{project.year ?? "-"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Client</h3>
            <p>{project.client ?? "-"}</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20">
        <h2 className="font-sora text-3xl font-bold">
          Services
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-[#006c4e] px-5 py-2 text-white"
            >
              {service}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24">
        <h2 className="mb-8 font-sora text-3xl font-bold">
          Gallery
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {project.gallery.map((image) => (
            <Image
              key={image}
              src={image}
              alt={project.title}
              width={1280}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      {/* Challenge */}
      {project.challenge && (
        <section className="mx-auto max-w-[1100px] px-5 pb-16">
          <h2 className="font-sora text-3xl font-bold">
            Challenge
          </h2>

          <p className="mt-5 leading-8 text-[#3d4a43]">
            {project.challenge}
          </p>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="mx-auto max-w-[1100px] px-5 pb-24">
          <h2 className="font-sora text-3xl font-bold">
            Solution
          </h2>

          <p className="mt-5 leading-8 text-[#3d4a43]">
            {project.solution}
          </p>
        </section>
      )}

      <CTASection />
    </main>
  );
}