import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, slugify, type BlogRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

const ROBOTS = [
  "index, follow",
  "noindex, follow",
  "index, nofollow",
  "noindex, nofollow",
] as const;

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

/**
 * Public callers get only Published posts. Passing `all=1` requires an
 * admin session and returns every post regardless of status, for the CMS.
 * Passing `slug=` returns a single published post.
 */
export async function GET(request: NextRequest) {
  const wantsAll = request.nextUrl.searchParams.get("all") === "1";
  const slug = request.nextUrl.searchParams.get("slug");
  const limitParam = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : null;

  if (wantsAll) {
    const denied = await adminGate(request);
    if (denied) return denied;
  }

  const db = await getDB();

  if (slug) {
    const post = await db
      .prepare(
        wantsAll
          ? "SELECT * FROM blog_posts WHERE slug = ? LIMIT 1"
          : "SELECT * FROM blog_posts WHERE slug = ? AND status = 'Published' LIMIT 1",
      )
      .bind(slug)
      .first<BlogRow>();
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ post });
  }

  let query = wantsAll
    ? "SELECT * FROM blog_posts ORDER BY created_at DESC"
    : "SELECT * FROM blog_posts WHERE status = 'Published' ORDER BY published_at DESC";
  if (limit) query += ` LIMIT ${limit}`;

  const result = await db.prepare(query).all<BlogRow>();
  return NextResponse.json({ posts: result.results ?? [] });
}

export async function POST(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const title = optionalString(body.title, 160);
  const category = optionalString(body.category, 60) || "General";
  const excerpt = optionalString(body.excerpt, 600);
  const content = optionalString(body.body, 20000);
  const publishNow = body.status === "Published";
  const customSlug = optionalString(body.slug, 80);
  const seoTitle = optionalString(body.seo_title, 70);
  const metaDescription = optionalString(body.meta_description, 160);
  const canonicalUrl = optionalString(body.canonical_url, 300);
  const metaRobots = optionalString(body.meta_robots, 40) || "index, follow";
  const ogTitle = optionalString(body.og_title, 70);
  const ogDescription = optionalString(body.og_description, 200);
  const ogImage = optionalString(body.og_image, 300);
  const twitterTitle = optionalString(body.twitter_title, 70);
  const twitterDescription = optionalString(body.twitter_description, 200);
  const twitterImage = optionalString(body.twitter_image, 300);
  const imageAlt = optionalString(body.image_alt, 160);

  if (!isNonEmpty(title, 160) || !isNonEmpty(excerpt, 600)) {
    return NextResponse.json({ error: "Title and excerpt are required." }, { status: 400 });
  }

  if (!ROBOTS.includes(metaRobots as (typeof ROBOTS)[number])) {
    return NextResponse.json({ error: "Invalid meta_robots value." }, { status: 400 });
  }

  const db = await getDB();
  const id = newId("post");
  const baseSlug = slugify(customSlug || title) || newId("post");

  let slug = baseSlug;
  for (let attempt = 1; attempt < 20; attempt++) {
    const existing = await db
      .prepare("SELECT id FROM blog_posts WHERE slug = ?")
      .bind(slug)
      .first();
    if (!existing) break;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  const publishedAt = publishNow ? new Date().toISOString().slice(0, 10) : null;
  const bodyText = content || excerpt;

  await db
    .prepare(
      `INSERT INTO blog_posts (
         id, title, slug, category, excerpt, body, status, published_at,
         seo_title, meta_description, canonical_url, meta_robots,
         og_title, og_description, og_image,
         twitter_title, twitter_description, twitter_image, image_alt
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      title,
      slug,
      category,
      excerpt,
      bodyText,
      publishNow ? "Published" : "Draft",
      publishedAt,
      seoTitle || null,
      metaDescription || null,
      canonicalUrl || null,
      metaRobots,
      ogTitle || null,
      ogDescription || null,
      ogImage || null,
      twitterTitle || null,
      twitterDescription || null,
      twitterImage || null,
      imageAlt || null,
    )
    .run();

  return NextResponse.json({ success: true, id, slug });
}
