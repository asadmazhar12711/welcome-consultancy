import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getPageBySlug } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  return buildMetadata({
    title: page?.seo_title || "DGFT & EXIM Advisory Mumbai",
    description: page?.meta_description || SITE.description,
    path: "",
    keywords: [
      "DGFT consultant Mumbai",
      "export incentives",
      "IEC registration",
      "EPCG license",
      "RoDTEP claims",
    ],
  });
}

export default async function HomeRoute() {
  const page = await getPageBySlug("home");
  // Optional: you can pass page content down to HomePage if you have dynamic text sections
  // const content = page?.content_json ? JSON.parse(page.content_json) : null;

  return (
    <>
      <JsonLd data={faqJsonLd([...SITE.faqs])} />
      <HomePage />
    </>
  );
}
