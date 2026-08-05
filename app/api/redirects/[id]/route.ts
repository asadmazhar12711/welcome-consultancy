import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { normalizePathname } from "@/lib/legacy-redirects";
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

  const toRaw = optionalString(body.to_path, 200);
  if (toRaw) {
    sets.push("to_path = ?");
    binds.push(normalizePathname(toRaw.startsWith("/") ? toRaw : `/${toRaw}`));
  }

  if (body.status_code === 301 || body.status_code === 302) {
    sets.push("status_code = ?");
    binds.push(Number(body.status_code));
  }

  if (typeof body.is_active === "boolean" || body.is_active === 0 || body.is_active === 1) {
    sets.push("is_active = ?");
    binds.push(body.is_active === true || body.is_active === 1 ? 1 : 0);
  }

  if (!sets.length) {
    return NextResponse.json({ error: "No updatable fields provided." }, { status: 400 });
  }

  sets.push("updated_at = CURRENT_TIMESTAMP");

  const result = await db
    .prepare(`UPDATE redirects SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...binds, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Redirect not found." }, { status: 404 });
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
  const result = await db.prepare("DELETE FROM redirects WHERE id = ?").bind(id).run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Redirect not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
