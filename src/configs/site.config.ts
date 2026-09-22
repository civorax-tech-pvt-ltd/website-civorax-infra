import { Locale } from "./locale.config";

export const siteConfig = {
  name: "CivoraX Infra Pvt. Ltd.",
  shortName: "CivoraX",
  description:
    "Best construction company in Koshi — house designs, civil consultancy, building construction, renovation and interiors in Itahari, Dharan, Damak, Biratnagar and Birtamode.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://civoraxinfra.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.civoraxinfra.com",
  twitterHandle: "@civoraxinfra",
  locale: "en_US",
} as const;

export const canonicalUrl = (locale: Locale, path = ""): string => {
  const base = siteConfig.url;
  return `${base}/${locale}${path}`;
};

export const alternateUrls = (path = ""): Record<string, string> => {
  return {
    en: `${siteConfig.url}/en${path}`,
    ne: `${siteConfig.url}/ne${path}`,
    ja: `${siteConfig.url}/ja${path}`,
    "x-default": `${siteConfig.url}/en${path}`,
  };
};