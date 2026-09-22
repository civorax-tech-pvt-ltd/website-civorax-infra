import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";
import { resolveLocale } from "./src/middleware/locale.middleware";
import { handleAuthMiddleware } from "./src/middleware/auth.middleware";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Resolve the locale for this request (cookie → Accept-Language → default)
  const locale = resolveLocale(request);

  // Auth guard — runs before i18n so redirect URLs are locale-prefixed
  const authResponse = handleAuthMiddleware(request, locale);
  if (authResponse) return authResponse;

  // Redirect bare "/" to the resolved locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Hand off to next-intl for locale routing, prefix handling, and cookie writing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next/static|_next/image|favicon.ico|llms.txt|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|mp4|mp3|webmanifest|json)).*)",
  ],
};
