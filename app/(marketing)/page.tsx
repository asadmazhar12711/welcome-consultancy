import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "DGFT & EXIM Advisory Mumbai",
  description: SITE.description,
  path: "",
  keywords: [
    "DGFT consultant Mumbai",
    "export incentives",
    "IEC registration",
    "EPCG license",
    "RoDTEP claims",
  ],
});

export default function HomeRoute() {
  return (
    <>
      <JsonLd data={faqJsonLd([...SITE.faqs])} />
      <HomePage />
    </>
  );
}
