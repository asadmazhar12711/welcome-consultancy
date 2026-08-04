import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { illustrationForService } from "@/lib/illustrations";
import type { ServiceDetail } from "@/lib/services";
import { SERVICES, serviceInquiryHref } from "@/lib/services";
import { SITE, whatsappUrl } from "@/lib/site";

export function ServicePageView({ service }: { service: ServiceDetail }) {
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 5);
  const documents =
    service.documents.length > 0 ? service.documents : service.checklist;
  const art = illustrationForService(service.slug);

  return (
    <div className="min-h-screen bg-page">
      <section className="relative overflow-hidden border-b border-subtle pb-16 pt-10 md:pb-20">
        <div className="container-site relative z-10">
          <nav
            className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-theme-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-theme-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-theme-muted" />
            <Link href="/services" className="transition-colors hover:text-theme-primary">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-theme-muted" />
            <span className="text-gold-500">{service.navTitle}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="eyebrow mb-2">
                {service.category} · {service.turnaround}
              </p>
              <h1 className="display-title max-w-3xl text-4xl md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-theme-muted">
                {service.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={serviceInquiryHref(service.slug)}>
                  <Button size="lg" className="font-extrabold">
                    Get started now
                  </Button>
                </Link>
                <a href={SITE.phones[0].href}>
                  <Button size="lg" variant="outline" className="font-bold">
                    <Phone className="h-4 w-4 text-gold-500" /> Call expert
                  </Button>
                </a>
              </div>
              <div className="mt-8 inline-flex items-center gap-3 rounded-none border border-subtle bg-elevated px-5 py-3">
                <Clock className="h-5 w-5 text-gold-500" aria-hidden />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-theme-faint">
                    Typical turnaround
                  </p>
                  <p className="text-sm font-extrabold text-theme-primary">{service.turnaround}</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-none border border-subtle shadow-theme-xl sm:aspect-[4/3] lg:aspect-square">
              <Image
                src={art.src}
                alt={art.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad !pt-16">
        <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            <article>
              <h2 className="display-title mb-5 text-3xl">
                Overview & strategic value
              </h2>
              <div className="space-y-4 text-base font-medium leading-relaxed text-theme-muted">
                <p className="text-theme-secondary">{service.answerSummary}</p>
                <p>{service.pageDescription}</p>
                {service.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 64)}>{paragraph}</p>
                ))}
              </div>
            </article>

            {service.benefits.length > 0 && (
              <div className="bento-card border-gold bg-gradient-to-br from-elevated to-page p-8 md:p-10">
                <h2 className="mb-8 flex items-center gap-3 text-2xl font-extrabold tracking-tight text-theme-primary">
                  <ShieldCheck className="h-7 w-7 text-gold-500" />
                  Key benefits & incentives
                </h2>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 rounded-none border border-subtle bg-elevated p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                      <span className="text-sm font-semibold text-theme-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="mb-6 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-theme-primary">
                <FileText className="h-7 w-7 text-gold-500" />
                Required documents
              </h2>
              <div className="rounded-none border border-subtle bg-elevated p-8 md:p-10">
                <p className="mb-6 text-sm font-medium text-theme-muted">
                  Keep the following ready to initiate processing of {service.navTitle}:
                </p>
                <ul className="space-y-4">
                  {documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-3 border-b border-subtle pb-4 text-sm font-medium text-theme-secondary last:border-0 last:pb-0"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0 text-gold-500" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {service.checklist.length > 0 &&
              JSON.stringify(service.checklist) !== JSON.stringify(documents) && (
                <div className="rounded-none border border-gold bg-gold-muted p-8">
                  <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-theme-primary">
                    <FileText className="h-5 w-5 text-gold-500" />
                    Additional checklist
                  </h2>
                  <ul className="space-y-3">
                    {service.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-theme-secondary">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {service.faqs.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-theme-primary">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq) => (
                    <details
                      key={faq.q}
                      className="group rounded-none border border-subtle bg-elevated p-5 open:border-gold"
                    >
                      <summary className="cursor-pointer list-none font-bold text-theme-primary marker:content-none">
                        {faq.q}
                      </summary>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-theme-muted">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="sticky top-28 rounded-none border border-gold bg-elevated p-8 shadow-theme-xl">
              <div className="icon-well-gold mx-auto mb-6 h-16 w-16">
                <Phone className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="text-center font-display text-2xl font-semibold tracking-tight text-theme-primary">
                Expert consultation
              </h3>
              <p className="mt-3 text-center text-sm font-medium leading-relaxed text-theme-muted">
                Speak with {SITE.founder}&apos;s DGFT desk about {service.navTitle}. We typically
                respond within business hours.
              </p>
              <Link href={serviceInquiryHref(service.slug)} className="mt-6 block">
                <Button className="h-12 w-full font-extrabold">
                  Inquire now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={SITE.phones[0].href} className="mt-3 block">
                <Button variant="outline" className="h-12 w-full font-bold">
                  Call {SITE.phones[0].display}
                </Button>
              </a>
              <a
                href={whatsappUrl(
                  `Hello Welcome Consultancy, I need assistance with ${service.navTitle}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center text-sm font-semibold text-theme-muted transition-colors hover:text-gold-500"
              >
                WhatsApp {SITE.phoneDisplay}
              </a>
            </div>

            <div className="rounded-none border border-subtle bg-elevated p-6">
              <h3 className="mb-4 font-extrabold text-theme-primary">Related services</h3>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/service/${item.slug}`}
                      className="group flex items-center justify-between text-sm font-semibold text-theme-muted transition-colors hover:text-gold-500"
                    >
                      {item.navTitle}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
