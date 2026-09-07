import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, slugify, type ServiceRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const wantsAll = request.nextUrl.searchParams.get("all") === "1";

  if (wantsAll) {
    const denied = await adminGate(request);
    if (denied) return denied;
  }

  const db = await getDB();

  if (slug) {
    const service = await db
      .prepare(
        wantsAll
          ? "SELECT * FROM services WHERE slug = ? LIMIT 1"
          : "SELECT * FROM services WHERE slug = ? AND status = 'Published' LIMIT 1"
      )
      .bind(slug)
      .first<ServiceRow>();

    if (!service) return NextResponse.json({ error: "Service not found." }, { status: 404 });
    return NextResponse.json({ service });
  }

  const query = wantsAll
    ? "SELECT * FROM services ORDER BY title ASC"
    : "SELECT * FROM services WHERE status = 'Published' ORDER BY title ASC";

  const result = await db.prepare(query).all<ServiceRow>();
  return NextResponse.json({ services: result.results ?? [] });
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
  const customSlug = optionalString(body.slug, 80);
  const shortDescription = optionalString(body.short_description, 300);
  const contentJson = typeof body.content_json === "string" ? body.content_json : JSON.stringify(body.content_json || {});
  const faqsJson = typeof body.faqs_json === "string" ? body.faqs_json : JSON.stringify(body.faqs_json || []);
  const benefitsJson = typeof body.benefits_json === "string" ? body.benefits_json : JSON.stringify(body.benefits_json || []);
  const documentsJson = typeof body.documents_json === "string" ? body.documents_json : JSON.stringify(body.documents_json || []);
  const bodyJson = typeof body.body_json === "string" ? body.body_json : JSON.stringify(body.body_json || []);
  const imageUrl = optionalString(body.image_url, 500);
  const status = body.status === "Published" ? "Published" : "Draft";

  const seoTitle = optionalString(body.seo_title, 70);
  const metaDescription = optionalString(body.meta_description, 160);
  const canonicalUrl = optionalString(body.canonical_url, 300);
  const metaRobots = optionalString(body.meta_robots, 40) || "index, follow";
  const ogTitle = optionalString(body.og_title, 70);
  const ogDescription = optionalString(body.og_description, 200);
  const ogImage = optionalString(body.og_image, 300);

  if (!isNonEmpty(title, 160)) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const db = await getDB();
  const id = (body.id as string) || newId("service");
  const slug = slugify(customSlug || title) || id;

  await db
    .prepare(
      `INSERT INTO services (
         id, title, slug, short_description, content_json, faqs_json,
         benefits_json, documents_json, body_json, image_url, status,
         seo_title, meta_description, canonical_url, meta_robots,
         og_title, og_description, og_image, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
         title=excluded.title,
         slug=excluded.slug,
         short_description=excluded.short_description,
         content_json=excluded.content_json,
         faqs_json=excluded.faqs_json,
         benefits_json=excluded.benefits_json,
         documents_json=excluded.documents_json,
         body_json=excluded.body_json,
         image_url=excluded.image_url,
         status=excluded.status,
         seo_title=excluded.seo_title,
         meta_description=excluded.meta_description,
         canonical_url=excluded.canonical_url,
         meta_robots=excluded.meta_robots,
         og_title=excluded.og_title,
         og_description=excluded.og_description,
         og_image=excluded.og_image,
         updated_at=CURRENT_TIMESTAMP`
    )
    .bind(
      id,
      title,
      slug,
      shortDescription || null,
      contentJson,
      faqsJson,
      benefitsJson,
      documentsJson,
      bodyJson,
      imageUrl || null,
      status,
      seoTitle || null,
      metaDescription || null,
      canonicalUrl || null,
      metaRobots,
      ogTitle || null,
      ogDescription || null,
      ogImage || null
    )
    .run();

  return NextResponse.json({ success: true, id, slug });
}
