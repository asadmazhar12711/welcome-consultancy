import "./globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
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

  const siteTitle = settings?.site_title || SITE.name;
  const siteDesc = settings?.default_meta_description || SITE.description;
  const siteUrl = settings?.site_url || SITE.url;

  const base = buildMetadata({
    title: `${siteTitle} | DGFT & EXIM Advisory`,
    description: siteDesc,
    path: "",
    ogImage: analytics.defaultOgImage || DEFAULT_OG_IMAGE,
  });

  return {
    ...base,
    title: {
      default: `${siteTitle} | DGFT & EXIM Advisory`,
      template: `%s | ${siteTitle}`,
    },
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.png",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Welcome EXIM",
      startupImage: "/favicon.png",
    },
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: "/images/og-main.jpg",
          width: 1200,
          height: 630,
          alt: `${siteTitle} | India's Premier DGFT & EXIM Advisory`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteTitle} | DGFT & EXIM Advisory`,
      description: siteDesc,
      images: ["/images/og-main.jpg"],
    },
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
        {analytics.gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analytics.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
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
