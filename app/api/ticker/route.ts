import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, type TickerRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { optionalString } from "@/lib/validation";

export const runtime = "edge";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET() {
  const db = await getDB();
  const rows = await db
    .prepare(
      `SELECT id, announcement, is_active, updated_at
       FROM news_ticker
       WHERE is_active = 1
       ORDER BY updated_at DESC`,
    )
    .all<TickerRow>();

  return NextResponse.json({
    items: (rows.results ?? []).map((r) => r.announcement),
    rows: rows.results ?? [],
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

  const announcement = optionalString(body.announcement, 400);
  if (!announcement) {
    return NextResponse.json({ error: "Announcement text is required." }, { status: 400 });
  }

  const db = await getDB();
  await db
    .prepare(`INSERT INTO news_ticker (announcement, is_active) VALUES (?, 1)`)
    .bind(announcement)
    .run();

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const id = Number(request.nextUrl.searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Valid id is required." }, { status: 400 });
  }

  const db = await getDB();
  await db.prepare(`UPDATE news_ticker SET is_active = 0 WHERE id = ?`).bind(id).run();
  return NextResponse.json({ success: true });
}
