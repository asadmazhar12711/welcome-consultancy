import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ILLUSTRATIONS, illustrationForService } from "@/lib/illustrations";
import { SERVICES } from "@/lib/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "DGFT & EXIM Services",
  description: `Complete portfolio of ${SITE.metrics.services} DGFT, Customs, and export incentive services from Welcome Consultancy Mumbai.`,
  path: "/services",
  keywords: ["DGFT services", "EXIM services Mumbai", "export license consultants"],
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
      <section className="relative isolate min-h-[60vh] overflow-hidden">
        <Image
          src={ILLUSTRATIONS.hero.src}
          alt={ILLUSTRATIONS.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-visual__scrim" aria-hidden />
        <div className="container-site relative z-10 flex min-h-[60vh] flex-col justify-end pb-14 pt-28 md:pb-20">
          <p className="eyebrow !text-[#D4AF37]">Services</p>
          <h1 className="display-title max-w-3xl text-4xl !text-white md:text-5xl lg:text-6xl">
            We are dedicated to serve you all time
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-slate-200">
            Complete DGFT & EXIM portfolio — licensing, incentives, and customs under one desk.
          </p>
        </div>
      </section>

      <section className="section-pad !pt-8">
        <div className="container-site">
          {SERVICES.map((service, index) => {
            const art = illustrationForService(service.slug);
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.slug}
                className={`service-visual-row ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Link
                  href={`/service/${service.slug}`}
                  className="service-visual-row__media group relative block"
                >
                  <Image
                    src={art.src}
                    alt={art.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="max-w-lg">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                    {String(index + 1).padStart(2, "0")} · {service.category} ·{" "}
                    {service.turnaround}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-theme-primary md:text-3xl">
                    <Link
                      href={`/service/${service.slug}`}
                      className="transition-colors hover:text-gold-500"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-base font-medium leading-relaxed text-theme-muted">
                    {service.shortDesc}
                  </p>
                  <Link
                    href={`/service/${service.slug}`}
                    className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-gold-500 transition-colors hover:text-theme-primary"
                  >
                    View details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
}
