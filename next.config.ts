import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** Allow optimized images from the CivoraX API (portfolio uploads), whatever its address is. */
function apiImagePattern(): RemotePattern[] {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const url = new URL(apiUrl);
    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
        pathname: "/storage/**",
      },
    ];
  } catch {
    return [];
  }
}

const apiUsesLocalIp = /\/\/(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(process.env.NEXT_PUBLIC_API_URL ?? "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      ...apiImagePattern(),
    ],
    // Next 16 blocks optimizing images from private IPs; allow it only when developing against a local API.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production" && apiUsesLocalIp,
  },
  allowedDevOrigins: ["192.168.100.5"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
