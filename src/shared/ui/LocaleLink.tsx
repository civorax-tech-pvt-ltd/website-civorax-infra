"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import type { Locale } from "@/configs/locale.config";

type LocaleLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function isExternalLink(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export default function LocaleLink({ href, children, className, onClick }: LocaleLinkProps) {
  const locale = useLocale() as Locale;

  let localizedHref = href;
  if (!isExternalLink(href)) {
    // If the path already has a locale prefix, don't duplicate it
    if (href.startsWith("/en/") || href.startsWith("/ne/") || href.startsWith("/ja/") || href === "/en" || href === "/ne" || href === "/ja") {
      localizedHref = href;
    } else {
      localizedHref = href === "/" ? `/${locale}` : `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
    }
  }

  return (
    <Link href={localizedHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}