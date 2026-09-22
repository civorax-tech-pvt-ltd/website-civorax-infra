import {
  FaFacebookF,
  FaFacebookMessenger,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaViber,
  FaYoutube,
} from "react-icons/fa";
import { socialLinks } from "@/entities/social";

type SocialLinksProps = { variant?: "light" | "dark" };

const links = [
  { ...socialLinks.facebook, icon: FaFacebookF },
  { ...socialLinks.messenger, icon: FaFacebookMessenger },
  { ...socialLinks.viber, icon: FaViber },
  { ...socialLinks.instagram, icon: FaInstagram },
  { ...socialLinks.tiktok, icon: FaTiktok },
  { ...socialLinks.linkedin, icon: FaLinkedinIn },
  { ...socialLinks.youtube, icon: FaYoutube },
];

export default function SocialLinks({ variant = "dark" }: SocialLinksProps) {
  const isDark = variant === "dark";
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-[17px] transition-all duration-200 hover:-translate-y-0.5 ${isDark ? "border-white/10 bg-white/7 text-[#77fac7] hover:border-[#77fac7]/35 hover:bg-[#20b486]/14 hover:text-white" : "border-[#006c4e]/10 bg-[#006c4e]/6 text-[#006c4e] hover:border-[#006c4e]/25 hover:bg-[#006c4e]/12"}`}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
