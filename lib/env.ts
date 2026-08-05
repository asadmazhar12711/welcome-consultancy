import { getCloudflareContext } from "@opennextjs/cloudflare";

export type AppEnv = {
  DB: D1Database;
  SITE_URL?: string;
  ADMIN_PASSWORD?: string;
  ASSETS?: Fetcher;
  GTM_ID?: string;
  GA4_ID?: string;
  CLARITY_ID?: string;
  META_PIXEL_ID?: string;
  GSC_VERIFICATION?: string;
  BING_VERIFICATION?: string;
};

export async function getEnv(): Promise<AppEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as AppEnv;
}
