import { siteConfig } from "@/configs/site.config";
import { teamDepartments, teamMembers } from "@/entities/team";

/**
 * Emits an ItemList of Person entities for the CivoraX team so search
 * engines and AI systems can attribute expertise (engineers, architects,
 * designers) to real team members in Itahari, Koshi.
 */
export function TeamJsonLd() {
  const departmentLabel = (slug: string) =>
    teamDepartments.find((d) => d.slug === slug)?.label ?? slug;

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CivoraX Infra Pvt. Ltd. team — engineers, architects and builders in Itahari, Koshi",
    itemListElement: teamMembers.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        worksFor: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
        },
        workLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Itahari",
            addressRegion: "Koshi",
            addressCountry: "NP",
          },
        },
        knowsAbout: member.expertise,
        ...(member.image ? { image: member.image } : {}),
        description: `${member.name}, ${member.role} (${member.qualification}) — ${departmentLabel(member.department)} at CivoraX Infra, Itahari, Koshi, Nepal.`,
      },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
