import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { optionalString } from "@/lib/validation";

const STATUSES = ["Draft", "Published"] as const;

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
  const binds: (string | null)[] = [];

  const title = optionalString(body.title, 160);
  if (title) {
    sets.push("title = ?");
    binds.push(title);
  }
  const category = optionalString(body.category, 60);
  if (category) {
    sets.push("category = ?");
    binds.push(category);
  }
  const excerpt = optionalString(body.excerpt, 600);
  if (excerpt) {
    sets.push("excerpt = ?");
    binds.push(excerpt);
  }

  const status = optionalString(body.status, 20);
  if (status) {
    if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
      return NextResponse.json({ error: "Status must be Draft or Published." }, { status: 400 });
    }
    sets.push("status = ?");
    binds.push(status);
    if (status === "Published") {
      sets.push("published_at = COALESCE(published_at, ?)");
      binds.push(new Date().toISOString().slice(0, 10));
    }
  }

  if (!sets.length) {
    return NextResponse.json({ error: "No updatable fields provided." }, { status: 400 });
  }

  sets.push("updated_at = CURRENT_TIMESTAMP");

  const result = await db
    .prepare(`UPDATE blog_posts SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...binds, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
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
  const result = await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
