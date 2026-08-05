import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { optionalString } from "@/lib/validation";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const db = await getDB();
  const sets: string[] = [];
  const binds: (string | number)[] = [];

  const title = optionalString(body.title, 120);
  if (title) {
    sets.push("title = ?");
    binds.push(title);
  }
  const message = optionalString(body.message, 400);
  if (message) {
    sets.push("message = ?");
    binds.push(message);
  }
  const ctaLabel = optionalString(body.ctaLabel, 60);
  if (ctaLabel) {
    sets.push("cta_label = ?");
    binds.push(ctaLabel);
  }
  const ctaHref = optionalString(body.ctaHref, 200);
  if (ctaHref) {
    sets.push("cta_href = ?");
    binds.push(ctaHref);
  }
  if (typeof body.isActive === "boolean") {
    sets.push("is_active = ?");
    binds.push(body.isActive ? 1 : 0);
  }
  if (body.delaySeconds !== undefined) {
    const delaySeconds = Number(body.delaySeconds);
    if (Number.isFinite(delaySeconds) && delaySeconds >= 0) {
      sets.push("delay_seconds = ?");
      binds.push(delaySeconds);
    }
  }

  if (!sets.length) {
    return NextResponse.json({ error: "No updatable fields provided." }, { status: 400 });
  }

  sets.push("updated_at = CURRENT_TIMESTAMP");

  const result = await db
    .prepare(`UPDATE popups SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...binds, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Popup not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const { id } = await params;
  const db = await getDB();
  const result = await db.prepare("DELETE FROM popups WHERE id = ?").bind(id).run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Popup not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
