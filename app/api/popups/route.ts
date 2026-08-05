import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, type PopupRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET(request: NextRequest) {
  const wantsAll = request.nextUrl.searchParams.get("all") === "1";
  if (wantsAll) {
    const denied = await adminGate(request);
    if (denied) return denied;
  }

  const db = await getDB();
  const query = wantsAll
    ? "SELECT * FROM popups ORDER BY created_at DESC"
    : "SELECT * FROM popups WHERE is_active = 1 ORDER BY created_at DESC";

  const result = await db.prepare(query).all<PopupRow>();
  return NextResponse.json({ popups: result.results ?? [] });
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

  const title = optionalString(body.title, 120);
  const message = optionalString(body.message, 400);
  const ctaLabel = optionalString(body.ctaLabel, 60) || "Get in touch";
  const ctaHref = optionalString(body.ctaHref, 200) || "/contact-us";
  const delaySeconds = Number(body.delaySeconds);
  const isActive = body.isActive === false ? 0 : 1;

  if (!isNonEmpty(title, 120) || !isNonEmpty(message, 400)) {
    return NextResponse.json({ error: "Title and message are required." }, { status: 400 });
  }

  const db = await getDB();
  const id = newId("popup");
  await db
    .prepare(
      `INSERT INTO popups (id, title, message, cta_label, cta_href, is_active, delay_seconds)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      title,
      message,
      ctaLabel,
      ctaHref,
      isActive,
      Number.isFinite(delaySeconds) && delaySeconds >= 0 ? delaySeconds : 20,
    )
    .run();

  return NextResponse.json({ success: true, id });
}
