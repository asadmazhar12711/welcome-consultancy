import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { ANALYTICS_DEFAULTS } from "@/lib/analytics";
import { getDB, getSeoSettings, type SeoSettingsRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { optionalString } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const settings = (await getSeoSettings()) ?? {
    id: 1,
    gtm_id: ANALYTICS_DEFAULTS.gtmId,
    ga4_id: ANALYTICS_DEFAULTS.ga4Id,
    clarity_id: ANALYTICS_DEFAULTS.clarityId,
    meta_pixel_id: ANALYTICS_DEFAULTS.metaPixelId,
    gsc_verification: ANALYTICS_DEFAULTS.gscVerification,
    bing_verification: ANALYTICS_DEFAULTS.bingVerification,
    default_og_image: ANALYTICS_DEFAULTS.defaultOgImage,
    robots_extra: "",
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload: Omit<SeoSettingsRow, "id" | "updated_at"> = {
    gtm_id: optionalString(body.gtm_id, 40),
    ga4_id: optionalString(body.ga4_id, 40) || ANALYTICS_DEFAULTS.ga4Id,
    clarity_id: optionalString(body.clarity_id, 40),
    meta_pixel_id: optionalString(body.meta_pixel_id, 40),
    gsc_verification: optionalString(body.gsc_verification, 120),
    bing_verification: optionalString(body.bing_verification, 120),
    default_og_image:
      optionalString(body.default_og_image, 300) || ANALYTICS_DEFAULTS.defaultOgImage,
    robots_extra: optionalString(body.robots_extra, 2000),
  };

  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO seo_settings (
         id, gtm_id, ga4_id, clarity_id, meta_pixel_id,
         gsc_verification, bing_verification, default_og_image, robots_extra, updated_at
       ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
         gtm_id = excluded.gtm_id,
         ga4_id = excluded.ga4_id,
         clarity_id = excluded.clarity_id,
         meta_pixel_id = excluded.meta_pixel_id,
         gsc_verification = excluded.gsc_verification,
         bing_verification = excluded.bing_verification,
         default_og_image = excluded.default_og_image,
         robots_extra = excluded.robots_extra,
         updated_at = CURRENT_TIMESTAMP`,
    )
    .bind(
      payload.gtm_id,
      payload.ga4_id,
      payload.clarity_id,
      payload.meta_pixel_id,
      payload.gsc_verification,
      payload.bing_verification,
      payload.default_og_image,
      payload.robots_extra,
    )
    .run();

  return NextResponse.json({ success: true, settings: { id: 1, ...payload } });
}
