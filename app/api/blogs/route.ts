import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, slugify, type BlogRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

/**
 * Public callers get only Published posts. Passing `all=1` requires an
 * admin session and returns every post regardless of status, for the CMS.
 */
export async function GET(request: NextRequest) {
  const wantsAll = request.nextUrl.searchParams.get("all") === "1";
  const limitParam = Number(request.nextUrl.searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 50) : null;

  if (wantsAll) {
    const denied = await adminGate(request);
    if (denied) return denied;
  }

  const db = await getDB();
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
  const publishNow = body.status === "Published";

  if (!isNonEmpty(title, 160) || !isNonEmpty(excerpt, 600)) {
    return NextResponse.json({ error: "Title and excerpt are required." }, { status: 400 });
  }

  const db = await getDB();
  const id = newId("post");
  const baseSlug = slugify(title) || newId("post");

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

  await db
    .prepare(
      `INSERT INTO blog_posts (id, title, slug, category, excerpt, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, title, slug, category, excerpt, publishNow ? "Published" : "Draft", publishedAt)
    .run();

  return NextResponse.json({ success: true, id, slug });
}
