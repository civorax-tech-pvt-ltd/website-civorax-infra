import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig, alternateUrls, canonicalUrl } from "@/configs/site.config";
import { ogLocale } from "@/configs/locale.config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = canonicalUrl(locale as never, "");
  const languages = alternateUrls("");
  return {
    alternates: { canonical, languages },
    openGraph: {
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as keyof typeof ogLocale] ?? "en_US",
      alternateLocale: Object.values(ogLocale).filter(
        (l) => l !== (ogLocale[locale as keyof typeof ogLocale] ?? "en_US")
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
