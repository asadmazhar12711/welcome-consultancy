import type { Metadata } from "next";
import { SITE } from "@/lib/site";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: BuildMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle =
    title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
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
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    description: SITE.description,
    areaServed: "IN",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
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
