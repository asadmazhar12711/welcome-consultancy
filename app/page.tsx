"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import RodtepCalculator from "@/components/tools/RodtepCalculator";
import EpcgEstimator from "@/components/tools/EpcgEstimator";
import { HeroVisual, VisualFrame } from "@/components/visual/VisualFrame";
import { GoldOrb, GridMesh, TradeRouteLines } from "@/components/visual/Decor";
import { ILLUSTRATIONS, illustrationForService } from "@/lib/illustrations";
import { SERVICES } from "@/lib/services";
import { faqJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const FEATURED = SERVICES.slice(0, 6);

const PROCESS = [
  {
    icon: FileSearch,
    title: "Diagnose eligibility",
    body: "Map product chapter, shipping pattern, and scheme fit.",
  },
  {
    icon: ClipboardList,
    title: "File with precision",
    body: "DGFT portals, customs coordination, documentation desk.",
  },
  {
    icon: CheckCircle2,
    title: "Realize incentives",
    body: "Track scrips and duty savings until cash lands with you.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"rodtep" | "epcg">("rodtep");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-page">
      <JsonLd data={faqJsonLd([...SITE.faqs])} />

      {/* ── Hero: full-bleed cinematic trade visual ── */}
      <HeroVisual src={ILLUSTRATIONS.hero.src} alt={ILLUSTRATIONS.hero.alt}>
        <div className="animate-fade-in max-w-xl">
          <p className="eyebrow inline-flex items-center gap-2 !text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Est. {SITE.metrics.since} · {SITE.metrics.clients} exporters · PAN India
          </p>
          <h1 className="display-title mt-2 text-5xl leading-[1.05] !text-white md:text-6xl lg:text-[4.5rem]">
            Welcome Consultancy
          </h1>
          <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
            Maximize export incentives with absolute precision — DGFT licensing,
            customs compliance, and government benefit claims.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#tools">
              <Button size="lg" className="h-14 w-full px-7 text-base font-extrabold sm:w-auto">
                <Calculator className="h-5 w-5" /> Estimate incentives
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full border-white/25 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              >
                Book consultation <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroVisual>

      {/* ── Trust strip over trade-route atmosphere ── */}
      <section className="trust-strip relative overflow-hidden py-12" aria-label="Key metrics">
        <TradeRouteLines className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 text-gold-500 opacity-40" />
        <div className="container-site relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {[
            { v: SITE.metrics.clients, l: "Active customers" },
            { v: SITE.metrics.years, l: "Years experience" },
            { v: SITE.metrics.services, l: "DGFT services" },
            { v: "PAN India", l: "Coverage" },
          ].map((stat) => (
            <div key={stat.l} className="text-center md:text-left">
              <p className="font-display text-3xl font-semibold tracking-tight text-theme-primary md:text-4xl">
                {stat.v}
              </p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-theme-faint">
                {stat.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process: workflow illustration leads ── */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-left-24 top-20 h-72 w-72" />
        <div className="container-site relative z-10">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="display-title text-3xl md:text-5xl">
              From eligibility to realized scrips
            </h2>
          </div>

          <div className="infographic-stage aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={ILLUSTRATIONS.process.src}
              alt={ILLUSTRATIONS.process.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>

          <div className="process-caption">
            {PROCESS.map((step, i) => (
              <article key={step.title}>
                <div className="mb-3 flex items-center gap-3">
                  <step.icon className="h-5 w-5 text-gold-500" aria-hidden />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold tracking-tight text-theme-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-theme-muted">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Incentives: interactive-scale infographic ── */}
      <section className="relative overflow-hidden border-y border-subtle bg-surface section-pad">
        <GridMesh />
        <div className="container-site relative z-10">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Incentive architecture</p>
              <h2 className="display-title text-3xl md:text-5xl">
                Government → Business → Export → Cash
              </h2>
              <p className="mt-4 text-base font-medium text-theme-muted md:text-lg">
                RoDTEP, Duty Drawback, and EPCG mapped as one visual system — not a wall of policy text.
              </p>
            </div>
            <Link href="/service/export-incentives">
              <Button variant="outline" className="font-bold">
                Explore incentives <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="infographic-stage aspect-[16/9]">
            <Image
              src={ILLUSTRATIONS.incentives.src}
              alt={ILLUSTRATIONS.incentives.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── Services: each with its own illustration ── */}
      <section id="services" className="section-pad relative">
        <GoldOrb className="-right-32 bottom-40 h-96 w-96 opacity-70" />
        <div className="container-site relative z-10">
          <div className="mb-6 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Services</p>
              <h2 className="display-title text-3xl md:text-5xl">
                Every filing has a visual language
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-bold text-theme-secondary transition-colors hover:text-gold-500"
            >
              View all {SERVICES.length} services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div>
            {FEATURED.map((service, index) => {
              const art = illustrationForService(service.slug);
              const reverse = index % 2 === 1;
              return (
                <article
                  key={service.slug}
                  className={`service-visual-row ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="service-visual-row__media">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className="object-cover"
                    />
                  </div>
                  <div className="max-w-md">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                      {String(index + 1).padStart(2, "0")} · {service.category} ·{" "}
                      {service.turnaround}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-theme-primary md:text-3xl">
                      {service.navTitle}
                    </h3>
                    <p className="mt-4 text-base font-medium leading-relaxed text-theme-muted">
                      {service.shortDesc}
                    </p>
                    <Link
                      href={`/service/${service.slug}`}
                      className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-gold-500 transition-colors hover:text-theme-primary"
                    >
                      Explore service{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Advisory / consultancy visual bridge ── */}
      <section className="relative overflow-hidden border-y border-subtle bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src={ILLUSTRATIONS.consultancy.src}
              alt={ILLUSTRATIONS.consultancy.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24">
            <p className="eyebrow">Advisory desk</p>
            <h2 className="display-title text-3xl md:text-5xl">
              Compliance without the fog
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              Documentation, DGFT portals, and incentive claims orchestrated as one system —
              so exporters see clarity, not bureaucracy.
            </p>
            <Link href="/about-us" className="mt-8">
              <Button variant="outline" className="font-bold">
                Our story <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tools: product utility with visual stage ── */}
      <section id="tools" className="section-pad relative overflow-hidden">
        <GoldOrb className="right-0 top-0 h-[520px] w-[520px]" />
        <div className="container-site relative z-10">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="max-w-xl">
              <p className="eyebrow">Intelligence desk</p>
              <h2 className="display-title text-3xl md:text-5xl">Model your incentives</h2>
              <p className="mt-4 text-lg font-medium text-theme-muted">
                Live RoDTEP & EPCG estimators — then book a slot to lock filings.
              </p>
            </div>
            <VisualFrame
              src={ILLUSTRATIONS.decoRoutes.src}
              alt="Global shipping routes connecting export markets"
              className="aspect-[21/9] hidden lg:block"
              sizes="50vw"
            />
          </div>

          <div
            className="tool-shell mx-auto max-w-3xl"
            id="tools-preview"
          >
            <div className="tool-shell-tabs" role="tablist" aria-label="Incentive calculators">
              {(
                [
                  ["rodtep", "RoDTEP"],
                  ["epcg", "EPCG"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => setActiveTab(id)}
                  className={`min-h-11 flex-1 rounded-none px-4 py-2.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
                    activeTab === id
                      ? "bg-gold-fill text-theme-on-gold shadow-gold"
                      : "text-theme-muted hover:bg-fill-hover hover:text-theme-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="p-3 sm:p-4" role="tabpanel">
              {activeTab === "rodtep" ? <RodtepCalculator /> : <EpcgEstimator />}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-theme-secondary hover:text-gold-500"
            >
              <ShieldCheck className="h-4 w-4 text-gold-500" /> Document checklists
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-theme-secondary hover:text-gold-500"
            >
              <CalendarDays className="h-4 w-4 text-gold-500" /> Priority booking
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials: editorial + branded imagery ── */}
      <section className="section-pad border-y border-subtle bg-surface relative overflow-hidden">
        <div className="container-site relative z-10">
          <div className="mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Institutional trust</p>
              <h2 className="display-title text-3xl md:text-5xl">
                Trusted by leading exporters
              </h2>
            </div>
            <VisualFrame
              src={ILLUSTRATIONS.testimonials.src}
              alt={ILLUSTRATIONS.testimonials.alt}
              className="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {SITE.testimonials.slice(0, 3).map((t) => (
              <article key={t.name} className="quote-editorial">
                <span className="quote-editorial__mark" aria-hidden>
                  “
                </span>
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none border border-gold bg-gold-muted text-base font-extrabold text-gold-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-theme-primary">{t.name}</h3>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-theme-faint">
                      {t.company} · Verified
                    </p>
                  </div>
                </div>
                <p className="relative z-10 text-sm font-medium leading-relaxed text-theme-secondary">
                  {t.quote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + clarity illustration ── */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-site grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative lg:sticky lg:top-28">
            <VisualFrame
              src={ILLUSTRATIONS.faq.src}
              alt={ILLUSTRATIONS.faq.alt}
              className="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div>
            <p className="eyebrow">Clarity</p>
            <h2 className="display-title mb-8 text-3xl md:text-4xl">Questions, answered</h2>
            <div className="space-y-3">
              {SITE.faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-none border border-subtle bg-elevated shadow-theme-sm transition-colors hover:border-elevated"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-theme-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
                  >
                    {faq.q}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-none transition-all ${
                        openFaq === i
                          ? "rotate-180 border border-gold bg-gold-muted text-gold-500"
                          : "bg-fill text-theme-muted"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-subtle bg-fill px-6 pb-6 pt-4 text-sm font-medium leading-relaxed text-theme-muted">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA: full-bleed horizon visual ── */}
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <Image
          src={ILLUSTRATIONS.cta.src}
          alt={ILLUSTRATIONS.cta.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-visual__scrim hero-visual__scrim--soft" aria-hidden />
        <div className="container-site relative z-10 flex min-h-[70vh] flex-col items-center justify-end pb-20 text-center md:pb-28">
          <p className="eyebrow !text-[#D4AF37]">Next step</p>
          <h2 className="display-title mt-4 max-w-3xl text-4xl !text-white md:text-6xl">
            Ready to secure your incentives?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg font-medium leading-relaxed text-slate-200">
            Complex DGFT compliance — handled. You scale international trade.
          </p>
          <Link href="/contact-us" className="mt-10 inline-block">
            <Button size="lg" className="h-14 px-10 text-base font-extrabold md:h-16 md:px-12 md:text-lg">
              Engage expert desk
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
