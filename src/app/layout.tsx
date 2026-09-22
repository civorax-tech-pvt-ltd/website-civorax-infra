import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans, Manrope, Sora } from "next/font/google";
import { siteConfig } from "@/configs/site.config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Best House Designs & Construction Company in Koshi, Nepal (2026) | CivoraX Infra",
    template: "%s | CivoraX Infra",
  },
  description: siteConfig.description,
  keywords: [
    "best house designs Nepal",
    "best construction company in Koshi",
    "best civil consultancy in Koshi",
    "best infrastructure company in Koshi",
    "construction company in Itahari",
    "construction company in Dharan",
    "construction company in Damak",
    "construction company in Biratnagar",
    "construction company in Birtamode",
    "architects in Itahari",
    "interior design Itahari",
    "renovation Dharan",
    "3D house design Nepal",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    title: "Best House Designs & Construction Company in Koshi, Nepal (2026) | CivoraX Infra",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#006c4e",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("X-NEXT-INTL-LOCALE") ?? "en";

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={`${sora.variable} ${manrope.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}