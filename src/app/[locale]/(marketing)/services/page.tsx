import type { Metadata } from "next";
import ServicesPage from "@/features/services/components/ServicesPage";
import { ServicesJsonLd } from "@/shared/seo/ServicesJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "services");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ServicesJsonLd locale={locale} />
      <ServicesPage />
    </>
  );
}