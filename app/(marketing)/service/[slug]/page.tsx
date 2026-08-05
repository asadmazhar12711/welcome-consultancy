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

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) {
    return { title: "Service not found" };
  }
  return buildMetadata({
    title: service.navTitle,
    description: service.pageDescription.slice(0, 160),
    path: `/service/${service.slug}`,
    keywords: [service.navTitle, service.category, "DGFT", "EXIM"],
  });
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.title,
            description: service.pageDescription,
            path: `/service/${service.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.navTitle, path: `/service/${service.slug}` },
          ]),
          ...(service.faqs.length > 0 ? [faqJsonLd(service.faqs)] : []),
        ]}
      />
      <ServicePageView service={service} />
    </>
  );
}
