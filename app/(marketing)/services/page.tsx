import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesDirectory } from "@/components/services/ServicesDirectory";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "DGFT & EXIM Services (25+ Catalog) | Welcome Consultancy",
  description: `Complete portfolio of ${SITE.metrics.services} DGFT, Customs, and export incentive services from Welcome Consultancy Mumbai.`,
  path: "/services",
  keywords: ["DGFT services", "EXIM services Mumbai", "export license consultants", "RoDTEP", "EPCG", "IEC"],
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <div className="min-h-screen bg-page">
        {/* ── Editorial Header ── */}
        <section className="relative overflow-hidden border-b border-subtle bg-surface pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-gold-500/[0.08] blur-[100px]" />
          <div className="container-site relative z-10">
            <div className="inline-flex items-center gap-2 rounded-none border border-gold/40 bg-gold-muted/40 px-3 py-1 text-xs font-bold text-gold-500 mb-4">
              <span>Comprehensive DGFT &amp; Foreign Trade Portfolio</span>
            </div>
            <h1 className="display-title max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-theme-primary">
              All DGFT &amp; Export Services
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              Explore our 26 specialized trade solutions across licensing, registrations, statutory certifications, and post-shipment duty refunds.
            </p>
          </div>
        </section>

        {/* ── Interactive Directory with Category Tabs & Card Grid ── */}
        <section className="section-pad !pt-10 !pb-24">
          <div className="container-site">
            <ServicesDirectory />
          </div>
        </section>
      </div>
    </>
  );
}
