import FloatingWhatsApp from "@/shared/layout/FloatingWhatsApp";
import Footer from "@/shared/layout/Footer";
import Navbar from "@/shared/layout/Navbar";
import ScrollToTop from "@/shared/layout/ScrollToTop";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/shared/seo/JsonLd";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Navbar />
      {children}
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </>
  );
}
