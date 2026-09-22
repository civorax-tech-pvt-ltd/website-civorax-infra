import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

type SeoKey = "home" | "services" | "about" | "contact" | "process" | "ourWork" | "academy";

const KEY_TO_PATH: Record<SeoKey, string> = {
  home: "",
  services: "/services",
  about: "/about",
  contact: "/contact",
  process: "/process",
  ourWork: "/our-work",
  academy: "/academy",
};

export async function buildPageMetadata(
  locale: string,
  key: SeoKey,
  opts?: { image?: string }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const keywords = t(`${key}.keywords`);
  const path = KEY_TO_PATH[key];
  const canonical = canonicalUrl(locale as Locale, path);
  const languages = alternateUrls(path);
  const image = opts?.image ?? "/opengraph-image";

  return {
    title,
    description,
    keywords: keywords.split(",").map((k: string) => k.trim()),
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
  };
}
