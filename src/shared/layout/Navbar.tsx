"use client";

import Button from "@/shared/ui/Button";
import LocaleLink from "@/shared/ui/LocaleLink";
import { consultationLink, navLinks } from "@/entities/navigation";
import { ArrowRight, Menu, User, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "@/widgets/LanguageSwitcher";
import SiteLogo from "./SiteLogo";
import { locales } from "@/configs/locale.config";

function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((locales as readonly string[]).includes(seg)) {
    const rest = "/" + pathname.split("/").slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

function isActive(pathname: string, href: string): boolean {
  const clean = stripLocale(pathname);
  return href === "/" ? clean === "/" : clean.startsWith(href);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  return (
    <header className="w-full border-b border-[#e5e2dd] bg-[#fcf9f4]">
      <div className="mx-auto flex h-[68px] max-w-[1512px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-16">
        <div className="flex min-w-[170px] items-center">
          <SiteLogo />
        </div>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[14px] font-semibold transition-colors duration-200 xl:text-[15px] ${active ? "text-[#006c4e]" : "text-[#081d30] hover:text-[#006c4e]"}`}
              >
                {t(link.key)}
                {active && <span className="absolute -bottom-1 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#e8855d]" />}
              </LocaleLink>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden min-w-[320px] items-center justify-end gap-3 lg:flex">
          <LanguageSwitcher />
          <LocaleLink
            href="/login"
            className="inline-flex h-[42px] items-center gap-2 rounded-[13px] border border-[#e5e2dd] px-4 text-[13px] font-semibold text-[#081d30] transition-colors hover:border-[#006c4e] hover:text-[#006c4e]"
          >
            <User size={15} />
            Portal Login
          </LocaleLink>
          <Button href={consultationLink} size="sm" className="h-[42px] rounded-[13px] bg-[#2f7d32] px-4 text-[13px] text-white hover:bg-[#256b2a] hover:text-white">
            {t("cta")}
            <ArrowRight size={16} strokeWidth={2.4} />
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher variant="mobile" />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e2dd] bg-white text-[#081d30] shadow-sm"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#e5e2dd] bg-[#fcf9f4] px-5 py-5 shadow-[0_18px_50px_rgba(8,29,48,0.08)] sm:px-8 lg:hidden">
          <nav className="mx-auto flex max-w-[1512px] flex-col gap-2">
            {navLinks.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${isActive(pathname, link.href) ? "bg-[#006c4e]/10 text-[#006c4e]" : "text-[#081d30] hover:bg-[#f0ede9] hover:text-[#006c4e]"}`}
              >
                {t(link.key)}
              </LocaleLink>
            ))}
            <LocaleLink
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e2dd] text-sm font-semibold text-[#081d30]"
            >
              <User size={16} />
              Portal Login
            </LocaleLink>
            <LocaleLink
              href={consultationLink}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center gap-3 rounded-xl bg-[#2f7d32] px-5 text-sm font-bold text-white"
            >
              {t("cta")}
              <ArrowRight size={17} />
            </LocaleLink>
          </nav>
        </div>
      )}
    </header>
  );
}