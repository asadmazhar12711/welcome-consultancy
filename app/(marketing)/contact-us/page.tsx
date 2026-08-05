import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact Welcome Consultancy Mumbai for DGFT & EXIM advisory. Call ${SITE.phoneDisplay} or book a free consultation.`,
  path: "/contact-us",
  keywords: ["contact DGFT consultant", "EXIM advisory Mumbai", "book consultation"],
});

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact-us" },
          ]),
        ]}
      />
      <ContactPage />
    </>
  );
}
