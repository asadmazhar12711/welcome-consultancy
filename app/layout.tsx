import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/seo/SkipLink";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { mergeAnalyticsConfig } from "@/lib/analytics";
import { getSeoSettings } from "@/lib/db";
import { getEnv } from "@/lib/env";
import {
  DEFAULT_OG_IMAGE,
  buildMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  let env: Awaited<ReturnType<typeof getEnv>> | null = null;
  try {
    settings = await getSeoSettings();
    env = await getEnv();
  } catch {
    // Build / static contexts without D1 bindings fall back to defaults.
  }

  const analytics = mergeAnalyticsConfig(settings, {
    GTM_ID: env?.GTM_ID || process.env.GTM_ID,
    GA4_ID: env?.GA4_ID || process.env.GA4_ID,
    CLARITY_ID: env?.CLARITY_ID || process.env.CLARITY_ID,
    META_PIXEL_ID: env?.META_PIXEL_ID || process.env.META_PIXEL_ID,
    GSC_VERIFICATION: env?.GSC_VERIFICATION || process.env.GSC_VERIFICATION,
    BING_VERIFICATION: env?.BING_VERIFICATION || process.env.BING_VERIFICATION,
  });

  const base = buildMetadata({
    title: `${SITE.name} | DGFT & EXIM Advisory`,
    description: SITE.description,
    path: "",
    ogImage: analytics.defaultOgImage || DEFAULT_OG_IMAGE,
  });

  return {
    ...base,
    title: {
      default: `${SITE.name} | DGFT & EXIM Advisory`,
      template: `%s | ${SITE.name}`,
    },
    metadataBase: new URL(SITE.url),
    verification: {
      ...(analytics.gscVerification
        ? { google: analytics.gscVerification }
        : {}),
      ...(analytics.bingVerification
        ? { other: { "msvalidate.01": analytics.bingVerification } }
        : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let analytics = mergeAnalyticsConfig();
  try {
    const settings = await getSeoSettings();
    const env = await getEnv();
    analytics = mergeAnalyticsConfig(settings, {
      GTM_ID: env.GTM_ID || process.env.GTM_ID,
      GA4_ID: env.GA4_ID || process.env.GA4_ID,
      CLARITY_ID: env.CLARITY_ID || process.env.CLARITY_ID,
      META_PIXEL_ID: env.META_PIXEL_ID || process.env.META_PIXEL_ID,
      GSC_VERIFICATION: env.GSC_VERIFICATION || process.env.GSC_VERIFICATION,
      BING_VERIFICATION: env.BING_VERIFICATION || process.env.BING_VERIFICATION,
    });
  } catch {
    // Fall back to GA4 default from legacy site.
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${manrope.variable} ${newsreader.variable} min-h-screen bg-page font-sans text-theme-primary antialiased`}
      >
        <ThemeProvider>
          <SkipLink />
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          <Analytics config={analytics} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
