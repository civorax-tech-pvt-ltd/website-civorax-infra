import type { Metadata } from "next";
import BudgetEstimatorSection from "@/features/process/components/BudgetEstimatorSection";
import ProcessAfterEstimateSection from "@/features/process/components/ProcessAfterEstimateSection";
import ProcessCTASection from "@/features/process/components/ProcessCTASection";
import ProcessHeroSection from "@/features/process/components/ProcessHeroSection";
import ProcessStepsSection from "@/features/process/components/ProcessStepsSection";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "process");
}

export default function ProcessPage() {
  return (
    <main>
      <ProcessHeroSection />
      <ProcessStepsSection />
      <BudgetEstimatorSection />
      <ProcessAfterEstimateSection />
      <ProcessCTASection />
    </main>
  );
}
