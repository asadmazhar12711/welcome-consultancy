import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/db";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let extraDisallow: string[] = [];
  try {
    const settings = await getSeoSettings();
    if (settings?.robots_extra) {
      extraDisallow = settings.robots_extra
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("Disallow:"))
        .map((line) => line.replace(/^Disallow:\s*/i, "").trim())
        .filter(Boolean);
    }
  } catch {
    // Defaults only when D1 unavailable.
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", ...extraDisallow],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
