export const company = {
  name: "CivoraX Infra Pvt. Ltd.",
  shortName: "CivoraX Infra",
  tagline: "Building with clarity, planning, and trust.",

  location: "Morang, Koshi, Nepal",
  registeredText: "Registered company in Nepal",
  startedYear: "2026",

  phoneDisplay: "+977 9761008090",
  phoneHref: "tel:+9779761008090",

  whatsappNumber: "9779761008090",

  email: "info@civoraxinfra.com",
  projectEmail: "projects@civoraxinfra.com",

  websiteUrl: "https://civoraxinfra.com",
} as const;

export function createWhatsappLink(message: string): string {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
