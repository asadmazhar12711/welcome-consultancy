import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageView } from "@/components/services/ServicePageView";
import {
  SERVICE_SLUGS,
  getServiceDetail,
} from "@/lib/services";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { getServiceBySlug } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staticService = getServiceDetail(slug);
  const dbService = await getServiceBySlug(slug);

  if (!staticService && !dbService) {
    return { title: "Service not found" };
  }

  const title = dbService?.seo_title || staticService?.navTitle || "";
  const description = dbService?.meta_description || staticService?.pageDescription?.slice(0, 160) || "";

  return buildMetadata({
    title,
    description,
    path: `/service/${slug}`,
    keywords: [title, staticService?.category || "", "DGFT", "EXIM"],
  });
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const staticService = getServiceDetail(slug);
  const dbService = await getServiceBySlug(slug);

  if (!staticService && !dbService) notFound();

  // Merge DB data over static fallback
  let parsedContent: Record<string, any> = {};
  let parsedFaqs = [];
  let parsedBenefits = [];
  let parsedDocuments = [];
  let parsedBody = [];

  try {
    if (dbService?.content_json) parsedContent = JSON.parse(dbService.content_json);
    if (dbService?.faqs_json) parsedFaqs = JSON.parse(dbService.faqs_json);
    if (dbService?.benefits_json) parsedBenefits = JSON.parse(dbService.benefits_json);
    if (dbService?.documents_json) parsedDocuments = JSON.parse(dbService.documents_json);
    if (dbService?.body_json) parsedBody = JSON.parse(dbService.body_json);
  } catch (e) {}

  const mergedService = {
    ...(staticService || {}),
    ...parsedContent,
    slug,
    navTitle: dbService?.title || staticService?.navTitle || "",
    title: dbService?.title || staticService?.title || "",
    shortDesc: dbService?.short_description || staticService?.shortDesc || "",
    faqs: parsedFaqs.length > 0 ? parsedFaqs : staticService?.faqs || [],
    benefits: parsedBenefits.length > 0 ? parsedBenefits : staticService?.benefits || [],
    documents: parsedDocuments.length > 0 ? parsedDocuments : staticService?.documents || staticService?.checklist || [],
    checklist: parsedDocuments.length > 0 ? parsedDocuments : staticService?.checklist || [],
    body: parsedBody.length > 0 ? parsedBody : staticService?.body || [],
    imageUrl: dbService?.image_url || null,
  };

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: mergedService.title,
            description: mergedService.pageDescription || mergedService.shortDesc || "",
            path: `/service/${mergedService.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: mergedService.navTitle, path: `/service/${mergedService.slug}` },
          ]),
          ...(mergedService.faqs.length > 0 ? [faqJsonLd(mergedService.faqs)] : []),
        ]}
      />
      {/* @ts-ignore */}
      <ServicePageView service={mergedService} />
    </>
  );
}
