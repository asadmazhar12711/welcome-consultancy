import type { Metadata } from "next";
import ToolsPage from "@/components/pages/ToolsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "EXIM Tools — RoDTEP, EPCG & Booking",
  description:
    "Free RoDTEP incentive calculator, EPCG duty estimator, EXIM document checklist generator, and consultation booking from Welcome Consultancy.",
  path: "/tools",
  keywords: [
    "RoDTEP calculator",
    "EPCG duty estimator",
    "EXIM checklist",
    "book DGFT consultation",
  ],
});

export default function ToolsRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <ToolsPage />
    </>
  );
}
