import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, type MediaRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const db = await getDB();
  const result = await db.prepare("SELECT * FROM media ORDER BY uploaded_at DESC").all<MediaRow>();
  return NextResponse.json({ media: result.results ?? [] });
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

  const filename = optionalString(body.filename, 200);
  const url = optionalString(body.url, 500);
  const altText = optionalString(body.alt_text, 300);

  if (!isNonEmpty(filename, 200) || !isNonEmpty(url, 500)) {
    return NextResponse.json({ error: "Filename and URL are required." }, { status: 400 });
  }

  const db = await getDB();
  const id = (body.id as string) || newId("media");

  await db
    .prepare(
      `INSERT INTO media (id, filename, url, alt_text)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         filename=excluded.filename,
         url=excluded.url,
         alt_text=excluded.alt_text`
    )
    .bind(id, filename, url, altText || null)
    .run();

  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });

  const db = await getDB();
  await db.prepare("DELETE FROM media WHERE id = ?").bind(id).run();

  return NextResponse.json({ success: true });
}
