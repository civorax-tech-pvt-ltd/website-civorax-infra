import LocaleLink from "@/shared/ui/LocaleLink";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { consultationLink } from "@/entities/navigation";
import { company } from "@/entities/company";
import SocialLinks from "./SocialLinks";

const serviceLinks = [
  { label: "Building Construction", href: "/services" },
  { label: "Interior Design", href: "/services" },
  { label: "Renovation", href: "/services" },
  { label: "Project Management", href: "/services" },
];

const companyLinks = [
  { label: "About CivoraX", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Process & Cost", href: "/process" },
  { label: "Blog & Guides", href: "/blog" },
  { label: "Academy", href: "/academy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2f302d] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-16 lg:py-20">
        <div>
          <span className="font-sora block text-[32px] font-extrabold leading-none tracking-[-0.06em] transition-colors">
            Civora<span className="text-[#2f7d32]">X</span>
          </span>
          <span className="mt-0.5 block pl-[1px] text-[10px] font-bold uppercase leading-none tracking-[0.45em] text-[#6d7a72]">INFRA PVT. LTD.</span>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
            {company.name} is focused on construction, design, renovation, planning, and project execution with clarity and trust.
          </p>
          <div className="mt-6"><SocialLinks variant="dark" /></div>
          <div className="mt-7 space-y-3 text-sm text-white/70">
            <div className="flex items-center gap-3"><MapPin size={17} className="text-[#77fac7]" /><span>{company.location}</span></div>
            <div className="flex items-center gap-3"><Phone size={17} className="text-[#77fac7]" /><a href={company.phoneHref} className="transition-colors hover:text-[#77fac7]">{company.phoneDisplay}</a></div>
            <div className="flex items-center gap-3"><Mail size={17} className="text-[#77fac7]" /><a href={`mailto:${company.email}`} className="transition-colors hover:text-[#77fac7]">{company.email}</a></div>
          </div>
        </div>

        <div>
          <h3 className="font-sora text-lg font-semibold">Services</h3>
          <ul className="mt-6 space-y-4">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <LocaleLink href={link.href} className="text-sm text-white/68 transition-colors hover:text-[#77fac7]">{link.label}</LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sora text-lg font-semibold">Company</h3>
          <ul className="mt-6 space-y-4">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <LocaleLink href={link.href} className="text-sm text-white/68 transition-colors hover:text-[#77fac7]">{link.label}</LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sora text-lg font-semibold">Start a Project</h3>
          <p className="mt-6 text-sm leading-7 text-white/68">Share your project idea, location, and budget. We will help you understand the next practical step.</p>
          <LocaleLink href={consultationLink} className="mt-7 inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#20b486] px-6 text-sm font-bold text-[#003f2c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#32CD32]">
            Book Consultation
            <ArrowRight size={17} strokeWidth={2.4} />
          </LocaleLink>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-6 text-sm text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Built with clarity, trust, and better construction.</p>
        </div>
      </div>
    </footer>
  );
}