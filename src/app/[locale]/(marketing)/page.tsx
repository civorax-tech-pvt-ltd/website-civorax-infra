import type { Metadata } from "next";
import CTASection from "@/features/home/components/CTASection";
import DesignPreviewSection from "@/features/home/components/DesignPreviewSection";
import HeroSection from "@/features/home/components/HeroSection";
import MinimalTrustSection from "@/features/home/components/MinimalTrustSection";
import ProcessPreviewSection from "@/features/home/components/ProcessPreviewSection";
import ServicesPreviewSection from "@/features/home/components/ServicesPreviewSection";
import WorkPreviewSection from "@/features/home/components/WorkPreviewSection";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "home");
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesPreviewSection />
      <DesignPreviewSection />
      <ProcessPreviewSection />
      <WorkPreviewSection />
      <MinimalTrustSection />
      <CTASection />
    </main>
  );
}
