import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LEGACY_REDIRECTS, normalizePathname } from "@/lib/legacy-redirects";

async function lookupCmsRedirect(
  pathname: string,
): Promise<{ to_path: string; status_code: number } | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as { DB?: D1Database }).DB;
    if (!db) return null;
    const row = await db
      .prepare(
        "SELECT to_path, status_code FROM redirects WHERE from_path = ? AND is_active = 1 LIMIT 1",
      )
      .bind(pathname)
      .first<{ to_path: string; status_code: number }>();
    return row ?? null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/illustrations") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const normalized = normalizePathname(pathname);

  if (pathname !== normalized) {
    const url = request.nextUrl.clone();
    url.pathname = normalized;
    return NextResponse.redirect(url, 301);
  }

  const legacyTarget = LEGACY_REDIRECTS[normalized];
  if (legacyTarget && legacyTarget !== normalized) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 301);
  }

  const cms = await lookupCmsRedirect(normalized);
  if (cms && cms.to_path && cms.to_path !== normalized) {
    const url = request.nextUrl.clone();
    url.pathname = normalizePathname(cms.to_path);
    const status = cms.status_code === 302 ? 302 : 301;
    return NextResponse.redirect(url, status);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|.*\\..*).*)"],
};
