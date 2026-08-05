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

/** Defaults from the legacy WordPress site — overridable via CMS / env. */
export const ANALYTICS_DEFAULTS: AnalyticsConfig = {
  gtmId: "",
  ga4Id: "G-SBVK5GGG6Q",
  clarityId: "",
  metaPixelId: "",
  gscVerification: "",
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
  return {
    gtmId: (row?.gtm_id || env?.GTM_ID || ANALYTICS_DEFAULTS.gtmId).trim(),
    ga4Id: (row?.ga4_id || env?.GA4_ID || ANALYTICS_DEFAULTS.ga4Id).trim(),
    clarityId: (row?.clarity_id || env?.CLARITY_ID || ANALYTICS_DEFAULTS.clarityId).trim(),
    metaPixelId: (
      row?.meta_pixel_id ||
      env?.META_PIXEL_ID ||
      ANALYTICS_DEFAULTS.metaPixelId
    ).trim(),
    gscVerification: (
      row?.gsc_verification ||
      env?.GSC_VERIFICATION ||
      ANALYTICS_DEFAULTS.gscVerification
    ).trim(),
    bingVerification: (
      row?.bing_verification ||
      env?.BING_VERIFICATION ||
      ANALYTICS_DEFAULTS.bingVerification
    ).trim(),
    defaultOgImage: (
      row?.default_og_image ||
      ANALYTICS_DEFAULTS.defaultOgImage
    ).trim(),
  };
}
