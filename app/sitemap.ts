import type { MetadataRoute } from "next";
import { listPublishedBlogSlugs, listPublishedServices } from "@/lib/db";
import { SERVICE_SLUGS } from "@/lib/services";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about-us",
    "/contact-us",
    "/services",
    "/blogs",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dbServices = await listPublishedServices();
  const activeServiceSlugs = Array.from(
    new Set([...SERVICE_SLUGS, ...dbServices.map((s) => s.slug)])
  );

  const serviceRoutes = activeServiceSlugs.map((slug) => ({
    url: `${SITE.url}/service/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRows = await listPublishedBlogSlugs();
  const blogRoutes = blogRows.map((row) => ({
    url: `${SITE.url}/blogs/${row.slug}`,
    lastModified: new Date(row.updated_at || row.published_at || now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
