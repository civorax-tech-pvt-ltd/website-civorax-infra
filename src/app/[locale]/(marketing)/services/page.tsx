import type { Metadata } from "next";
import ServicesPage from "@/features/services/components/ServicesPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "services");
}

export default function Page() {
  return <ServicesPage />;
}
