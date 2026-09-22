import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/features/academy/api/courses";
import CourseDetailPage from "@/features/academy/components/CourseDetailPage";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const course = await getCourse(id);

  const title = course ? `${course.title} — CivoraX Academy` : "Course Not Found";
  const description =
    course?.description ??
    "Explore hands-on AutoCAD and design software training from CivoraX Infra.";
  const path = `/academy/${id}`;
  const canonical = canonicalUrl(locale as Locale, path);
  const image = course?.cover_image_url ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical, languages: alternateUrls(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
