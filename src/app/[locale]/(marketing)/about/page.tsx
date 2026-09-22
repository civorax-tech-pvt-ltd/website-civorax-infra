import type { Metadata } from "next";
import AboutPage from "@/features/about/components/AboutPage";
import { TeamJsonLd } from "@/shared/seo/TeamJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "about");
}

export default function Page() {
  return (
    <>
      <TeamJsonLd />
      <AboutPage />
    </>
  );
}
