import { siteConfig } from "@/configs/site.config";
import { company } from "@/entities/company/company";
import { socialLinks } from "@/entities/social";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: company.name,
    legalName: company.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon/android-chrome-512x512.png`,
    image: `${siteConfig.url}/opengraph-image`,
    telephone: company.phoneDisplay,
    email: company.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Itahari Main Area",
      addressLocality: "Itahari",
      addressRegion: "Koshi",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.6666",
      longitude: "87.2833",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Itahari" },
      { "@type": "City", name: "Dharan" },
      { "@type": "City", name: "Damak" },
      { "@type": "City", name: "Biratnagar" },
      { "@type": "City", name: "Birtamode" },
      { "@type": "AdministrativeArea", name: "Koshi Province" },
    ],
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