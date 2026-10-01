import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Called by the CivoraX API (civorax-api) whenever portfolio or blog content changes, so the affected
 * pages, the sitemap and the RSS feed are rebuilt on their next visit instead of waiting for the hourly refresh.
 *
 * POST /api/revalidate  {"tag": "portfolio" | "blog"}   header: x-revalidate-secret: <REVALIDATE_SECRET>
 */
const ALLOWED_TAGS = new Set(["portfolio", "blog"]);

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tag = typeof body?.tag === "string" ? body.tag : "";

  if (!ALLOWED_TAGS.has(tag)) {
    return Response.json({ revalidated: false, message: "Unknown tag" }, { status: 400 });
  }

  // Webhook from another system: expire immediately so the next request fetches fresh data.
  revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: true, tag, now: Date.now() });
}
