import type { Metadata } from "next";
import BlogListPage from "@/features/blog/components/BlogListPage";
import { canonicalUrl, alternateUrls, siteConfig } from "@/configs/site.config";
import { ogLocale, type Locale } from "@/configs/locale.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = canonicalUrl(locale as Locale, "/blog");
  const languages = alternateUrls("/blog");

  const localizedTitles: Record<string, { title: string; desc: string }> = {
    en: {
      title: "Construction Guides, House Designs & BOQ Insights | CivoraX Blog",
      desc: "Articles and practical guides on house construction costs, municipal bylaws, modern Vastu shastra, and 3D architectural design in Nepal.",
    },
    ne: {
      title: "घर निर्माण गाइड, नक्सा डिजाइन र लागत विश्लेषण | सिभोराएक्स ब्लग",
      desc: "नेपाल तथा कोशी प्रदेशमा घर निर्माण लागत, नगरपालिकाको नक्सा पास प्रक्रिया, वास्तु शास्त्र र आधुनिक डिजाइन सम्बन्धी महत्वपूर्ण जानकारी।",
    },
    ja: {
      title: "建築ガイド、住宅設計、積算情報 | CivoraX ブログ",
      desc: "ネパールおよびコシ州における住宅建設費、自治体の建築許可プロセス、現代風水、3D建築設計に関する実践的なガイド。",
    },
  };

  const meta = localizedTitles[locale] ?? localizedTitles.en;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function Page() {
  return <BlogListPage />;
}