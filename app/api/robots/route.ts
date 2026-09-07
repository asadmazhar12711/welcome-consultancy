import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, type RobotsConfigRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET() {
  const db = await getDB();
  const config = await db.prepare("SELECT * FROM robots_config WHERE id = 1").first<RobotsConfigRow>();
  return NextResponse.json({
    content: config?.content || "User-agent: *\nDisallow: /admin/\nAllow: /\nSitemap: https://welcomeconsultancy.in/sitemap.xml",
  });
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

  const content = optionalString(body.content, 5000) || "";

  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO robots_config (id, content, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET content=excluded.content, updated_at=CURRENT_TIMESTAMP`
    )
    .bind(content)
    .run();

  return NextResponse.json({ success: true });
}
