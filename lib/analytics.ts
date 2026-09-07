import type { SeoSettingsRow } from "@/lib/db";

export type AnalyticsConfig = {
  gtmId: string;
  ga4Id: string;
  clarityId: string;
  metaPixelId: string;
  gscVerification: string;
  bingVerification: string;
  defaultOgImage: string;
};

/** Defaults from the client technical specification — overridable via CMS / env. */
export const ANALYTICS_DEFAULTS: AnalyticsConfig = {
  gtmId: "GTM-WTLN3WJJ",
  ga4Id: "G-SY495SGMRF",
  clarityId: "",
  metaPixelId: "",
  gscVerification: "kX413ojJFJn5gq4v81KWui4jEV35NvBBs9Vqj5xyn-Q",
  bingVerification: "",
  defaultOgImage: "/illustrations/hero-global-trade.webp",
};

export function mergeAnalyticsConfig(
  row?: Partial<SeoSettingsRow> | null,
  env?: {
    GTM_ID?: string;
    GA4_ID?: string;
    CLARITY_ID?: string;
    META_PIXEL_ID?: string;
    GSC_VERIFICATION?: string;
    BING_VERIFICATION?: string;
  },
): AnalyticsConfig {
  const envGa4 = env?.GA4_ID?.trim();
  const rowGa4 = row?.ga4_id?.trim();
  const resolvedGa4 =
    envGa4 && envGa4 !== "G-SBVK5GGG6Q"
      ? envGa4
      : rowGa4 && rowGa4 !== "G-SBVK5GGG6Q"
      ? rowGa4
      : envGa4 || ANALYTICS_DEFAULTS.ga4Id;

  return {
    gtmId: (env?.GTM_ID || row?.gtm_id || ANALYTICS_DEFAULTS.gtmId).trim(),
    ga4Id: resolvedGa4.trim(),
    clarityId: (row?.clarity_id || env?.CLARITY_ID || ANALYTICS_DEFAULTS.clarityId).trim(),
    metaPixelId: (
      row?.meta_pixel_id ||
      env?.META_PIXEL_ID ||
      ANALYTICS_DEFAULTS.metaPixelId
    ).trim(),
    gscVerification: (
      env?.GSC_VERIFICATION ||
      row?.gsc_verification ||
      ANALYTICS_DEFAULTS.gscVerification
    ).trim(),
    bingVerification: (
      env?.BING_VERIFICATION ||
      row?.bing_verification ||
      ANALYTICS_DEFAULTS.bingVerification
    ).trim(),
    defaultOgImage: (
      row?.default_og_image ||
      ANALYTICS_DEFAULTS.defaultOgImage
    ).trim(),
  };
}
