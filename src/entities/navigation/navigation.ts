import { company } from "@/entities/company";

export const navLinks = [
  { key: "home",    href: "/" },
  { key: "services", href: "/services" },
  { key: "ourWork",  href: "/our-work" },
  { key: "process",  href: "/process" },
  { key: "blog",     href: "/blog" },
  { key: "academy",  href: "/academy" },
  { key: "about",    href: "/about" },
  { key: "contact",  href: "/contact" },
] as const;

export const consultationLink = "/contact?type=consultation";

export const whatsappNumber = company.whatsappNumber;

export const whatsappMessage =
  "Hello CivoraX Infra, I want to discuss a construction/design project.";