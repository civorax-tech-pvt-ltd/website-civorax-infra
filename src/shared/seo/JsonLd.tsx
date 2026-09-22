import { siteConfig } from "@/configs/site.config";
import { company } from "@/entities/company/company";
import { socialLinks } from "@/entities/social";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    url: siteConfig.url,
    telephone: company.phoneDisplay,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itahari",
      addressRegion: "Koshi",
      addressCountry: "NP",
    },
    areaServed: ["Itahari", "Dharan", "Damak", "Biratnagar", "Birtamode", "Koshi", "Nepal"],
    sameAs: [
      socialLinks.facebook.href,
      socialLinks.instagram.href,
      socialLinks.tiktok.href,
      socialLinks.linkedin.href,
      socialLinks.youtube.href,
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
