import type { Metadata } from "next";
import AcademyPage from "@/features/academy/components/AcademyPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "academy");
}

export default function Page() {
  return <AcademyPage />;
}
