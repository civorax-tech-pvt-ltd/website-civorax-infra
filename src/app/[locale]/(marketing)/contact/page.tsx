import type { Metadata } from "next";
import ContactPage from "@/features/contact/components/ContactPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact");
}

export default function Page() {
  return <ContactPage />;
}
