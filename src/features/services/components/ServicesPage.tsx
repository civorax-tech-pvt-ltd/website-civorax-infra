import ServicesHero from "./ServicesHero";
import ServiceOverviewGrid from "./ServiceOverviewGrid";
import ServiceFeatureRows from "./ServiceFeatureRows";
import ServicesWhyUsSection from "./ServicesWhyUsSection";
import ServicesProcessGrid from "./ServicesProcessGrid";
import ServicesBudgetCta from "./ServicesBudgetCta";

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <ServicesHero />
      <ServiceOverviewGrid />
      <ServiceFeatureRows />
      <ServicesWhyUsSection />
      <ServicesProcessGrid />
      <ServicesBudgetCta />
    </main>
  );
}