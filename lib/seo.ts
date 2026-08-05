import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const DEFAULT_OG_IMAGE = "/illustrations/hero-global-trade.webp";

export type RobotsDirective =
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow"
  | "noindex, nofollow";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  canonical?: string;
  robots?: RobotsDirective;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  type?: "website" | "article";
};

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE.url}${path}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  canonical,
  robots = "index, follow",
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  twitterTitle,
  twitterDescription,
  twitterImage,
  type = "website",
}: BuildMetaInput): Metadata {
  const url = canonical
    ? absoluteUrl(canonical)
    : `${SITE.url}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
  const fullTitle =
    title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgImage = absoluteUrl(ogImage);
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage = absoluteUrl(twitterImage || ogImage);

  const indexable = robots.startsWith("index");
  const followable = robots.includes("follow") && !robots.includes("nofollow");

  return {
    title: { absolute: fullTitle },
    description,
    keywords: [
      "DGFT",
      "EXIM",
      "IEC",
      "EPCG",
      "RoDTEP",
      "Welcome Consultancy",
      ...keywords,
    ],
    robots: {
      index: indexable,
      follow: followable,
      googleBot: {
        index: indexable,
        follow: followable,
      },
    },
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_IN",
      url,
      siteName: SITE.name,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      images: [resolvedTwitterImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    description: SITE.description,
    foundingDate: SITE.metrics.since,
    areaServed: "IN",
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl("/images/logo-dark.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneDisplay,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/blogs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      telephone: SITE.phoneDisplay,
      url: SITE.url,
    },
    areaServed: "IN",
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    image: absoluteUrl(input.image || DEFAULT_OG_IMAGE),
    datePublished: input.publishedAt || undefined,
    dateModified: input.modifiedAt || input.publishedAt || undefined,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo-dark.png"),
      },
    },
    articleSection: input.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${input.path}`,
    },
  };
}
