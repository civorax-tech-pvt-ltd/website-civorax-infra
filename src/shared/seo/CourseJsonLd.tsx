import { siteConfig } from "@/configs/site.config";
import type { CourseDetail } from "@/features/academy/types/academy.types";

export function CourseJsonLd({ course, locale }: { course: CourseDetail; locale: string }) {
  const courseUrl = `${siteConfig.url}/${locale}/academy/${course.id}`;
  const effectivePrice = course.discount_fee !== null ? course.discount_fee : course.fee;

  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: `${siteConfig.name} Academy`,
      sameAs: siteConfig.url,
    },
    url: courseUrl,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.type,
      courseWorkload: course.duration,
      offers: {
        "@type": "Offer",
        price: effectivePrice,
        priceCurrency: "NPR",
        category: "Paid",
        availability: "https://schema.org/InStock",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}