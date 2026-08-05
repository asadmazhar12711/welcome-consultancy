import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, type RedirectRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { LEGACY_REDIRECTS, normalizePathname } from "@/lib/legacy-redirects";
import { isNonEmpty, optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

function normalizeFromPath(value: string): string {
  const path = normalizePathname(value.startsWith("/") ? value : `/${value}`);
  return path;
}

/** Public lookup used by middleware/edge; admin list with ?all=1 */
export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from");
  const wantsAll = request.nextUrl.searchParams.get("all") === "1";

  if (wantsAll) {
    const denied = await adminGate(request);
    if (denied) return denied;
    const db = await getDB();
    const result = await db
      .prepare("SELECT * FROM redirects ORDER BY updated_at DESC")
      .all<RedirectRow>();
    return NextResponse.json({
      redirects: result.results ?? [],
      legacy: Object.entries(LEGACY_REDIRECTS).map(([from_path, to_path]) => ({
        from_path,
        to_path,
        status_code: 301,
        is_active: 1,
        source: "legacy",
      })),
    });
  }

  if (from) {
    const path = normalizeFromPath(from);
    const legacy = LEGACY_REDIRECTS[path];
    if (legacy) {
      return NextResponse.json({
        redirect: { from_path: path, to_path: legacy, status_code: 301 },
      });
    }
    try {
      const db = await getDB();
      const row = await db
        .prepare(
          "SELECT * FROM redirects WHERE from_path = ? AND is_active = 1 LIMIT 1",
        )
        .bind(path)
        .first<RedirectRow>();
      if (row) {
        return NextResponse.json({
          redirect: {
            from_path: row.from_path,
            to_path: row.to_path,
            status_code: row.status_code,
          },
        });
      }
    } catch {
      // D1 unavailable
    }
    return NextResponse.json({ redirect: null });
  }

  return NextResponse.json({ error: "Provide ?from= or ?all=1" }, { status: 400 });
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

  const fromRaw = optionalString(body.from_path, 200);
  const toRaw = optionalString(body.to_path, 200);
  const statusCode = Number(body.status_code) === 302 ? 302 : 301;

  if (!isNonEmpty(fromRaw, 200) || !isNonEmpty(toRaw, 200)) {
    return NextResponse.json(
      { error: "from_path and to_path are required." },
      { status: 400 },
    );
  }

  const from_path = normalizeFromPath(fromRaw);
  const to_path = normalizeFromPath(toRaw);

  if (from_path === to_path) {
    return NextResponse.json(
      { error: "from_path and to_path must be different." },
      { status: 400 },
    );
  }

  const db = await getDB();
  const id = newId("redir");

  try {
    await db
      .prepare(
        `INSERT INTO redirects (id, from_path, to_path, status_code, is_active)
         VALUES (?, ?, ?, ?, 1)`,
      )
      .bind(id, from_path, to_path, statusCode)
      .run();
  } catch {
    return NextResponse.json(
      { error: "A redirect from this path already exists." },
      { status: 409 },
    );
  }

  return NextResponse.json({ success: true, id, from_path, to_path });
}
