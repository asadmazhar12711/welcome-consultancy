"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileSearch,
  Landmark,
  Newspaper,
  ShieldCheck,
  Ship,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RodtepCalculator from "@/components/tools/RodtepCalculator";
import EpcgEstimator from "@/components/tools/EpcgEstimator";
import BookingCalendar from "@/components/tools/BookingCalendar";
import { HeroVisual, VisualFrame } from "@/components/visual/VisualFrame";
import { GoldOrb, GridMesh, TradeRouteLines } from "@/components/visual/Decor";
import { ILLUSTRATIONS, illustrationForService } from "@/lib/illustrations";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

const FEATURED = SERVICES.slice(0, 6);

const PROCESS = [
  {
    icon: FileSearch,
    title: "Diagnose eligibility",
    body: "Map product chapter, shipping pattern, and scheme fit against current Foreign Trade Policy.",
  },
  {
    icon: ClipboardList,
    title: "File with precision",
    body: "DGFT portals, customs coordination, and documentation desk — handled end to end.",
  },
  {
    icon: CheckCircle2,
    title: "Realize incentives",
    body: "Track scrips and duty savings until cash or credit lands with you.",
  },
];

const INCENTIVE_FLOW = [
  {
    icon: Landmark,
    title: "Government scheme",
    body: "RoDTEP, RoSCTL, Duty Drawback, and EPCG notified under Foreign Trade Policy.",
  },
  {
    icon: Building2,
    title: "Business eligibility",
    body: "Product chapter, sector, and shipping pattern mapped to the right scheme.",
  },
  {
    icon: Ship,
    title: "Export realization",
    body: "Shipping bills filed and reconciled with customs & DGFT systems.",
  },
  {
    icon: Wallet,
    title: "Cash to you",
    body: "Scrips, remissions, and duty savings tracked until they land in your account.",
  },
];

type BlogCard = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
};

const BLOG_FALLBACK: BlogCard[] = SITE.blogs.slice(0, 3).map((b) => ({
  title: b.title,
  slug: b.slug,
  category: b.category,
  excerpt: b.excerpt,
  date: b.date,
}));
const BLOG_ART = ["dgft", "rodtep", "epcg"] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"rodtep" | "epcg">("rodtep");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [blogPosts, setBlogPosts] = useState<BlogCard[]>(BLOG_FALLBACK);

  React.useEffect(() => {
    let active = true;
    type BlogApiResponse = {
      posts?: {
        title: string;
        slug: string;
        category: string;
        excerpt: string;
        published_at: string | null;
      }[];
    };
    fetch("/api/blogs?limit=3")
      .then((res) => (res.ok ? (res.json() as Promise<BlogApiResponse>) : null))
      .then((data) => {
        if (!active || !data?.posts?.length) return;
        setBlogPosts(
          data.posts.map((p) => ({
            title: p.title,
            slug: p.slug,
            category: p.category,
            excerpt: p.excerpt,
            date: p.published_at
              ? new Date(p.published_at).toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })
              : "",
          })),
        );
      })
      .catch(() => {
        /* keep static fallback content */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-page">
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

      {/* ── How we work: editorial split — rail steps + layered image composition ── */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-left-24 top-20 h-72 w-72" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="display-title text-3xl md:text-5xl">
                From eligibility to realized scrips
              </h2>
              <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-theme-muted md:text-lg">
                The same disciplined process whether you&apos;re claiming a first RoDTEP
                remission or renewing an EPCG obligation.
              </p>

              <div className="mt-11">
                {PROCESS.map((step, i) => (
                  <div key={step.title} className="rail-step">
                    <div className="rail-step__index">{i + 1}</div>
                    <div className="pb-1 pt-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <step.icon className="h-3.5 w-3.5 text-gold-500" aria-hidden />
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold tracking-tight text-theme-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-theme-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md pb-10 pt-4 lg:mx-0 lg:max-w-none lg:pt-8">
              <div className="collage-frame relative ml-auto aspect-[4/5] w-[82%]">
                <Image
                  src={ILLUSTRATIONS.process.src}
                  alt={ILLUSTRATIONS.process.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover object-center"
                />
              </div>
              <div className="collage-frame absolute -bottom-8 left-0 aspect-[5/4] w-[54%] sm:-bottom-10">
                <Image
                  src={ILLUSTRATIONS.decoRoutes.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 60vw, 260px"
                  className="object-cover object-center"
                />
              </div>
              <div className="stat-float right-0 top-0 sm:-right-4">
                <div className="icon-well-gold h-11 w-11 shrink-0">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="stat-float__value">{SITE.metrics.completed}</p>
                  <p className="stat-float__label">Filings closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Incentives: layered flow cards + supporting visual, not one giant infographic ── */}
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
                RoDTEP, Duty Drawback, and EPCG mapped as one system — not a wall of policy text.
              </p>
            </div>
            <Link href="/service/export-incentives">
              <Button variant="outline" className="font-bold">
                Explore incentives <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INCENTIVE_FLOW.map((stage, i) => (
                <div key={stage.title} className="flow-card">
                  {i < INCENTIVE_FLOW.length - 1 && (i + 1) % 2 !== 0 ? (
                    <span className="flow-card__arrow">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  ) : null}
                  <div className="icon-well-gold h-11 w-11">
                    <stage.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-500">
                      0{i + 1}
                    </p>
                    <h3 className="mt-1 text-base font-extrabold tracking-tight text-theme-primary">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-theme-muted">
                      {stage.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="collage-frame aspect-[4/5] w-full">
              <Image
                src={ILLUSTRATIONS.incentives.src}
                alt={ILLUSTRATIONS.incentives.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-center"
              />
            </div>
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

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:[grid-template-rows:auto_auto]">
            {FEATURED.map((service, index) => {
              const art = illustrationForService(service.slug);

              if (index === 0) {
                return (
                  <Link
                    key={service.slug}
                    href={`/service/${service.slug}`}
                    className="group relative col-span-1 flex flex-col overflow-hidden rounded-none border transition-all duration-300 hover:-translate-y-1 md:col-span-2 md:row-span-2"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: "var(--bg-elevated)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={art.src}
                        alt={art.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span
                        className="pill-tag absolute left-5 top-5 backdrop-blur-sm"
                        style={{ background: "color-mix(in srgb, var(--bg-elevated) 88%, transparent)" }}
                      >
                        Featured service
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                        01 · {service.category} · {service.turnaround}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-theme-primary md:text-3xl">
                        {service.navTitle}
                      </h3>
                      <p className="mt-3 max-w-lg text-base font-medium leading-relaxed text-theme-muted">
                        {service.shortDesc}
                      </p>
                      <span className="mt-6 inline-flex items-center text-sm font-bold text-gold-500 transition-colors group-hover:text-theme-primary">
                        Explore service{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              }

              if (index === 1 || index === 2) {
                return (
                  <Link
                    key={service.slug}
                    href={`/service/${service.slug}`}
                    className="editorial-row group flex-col items-start sm:flex-col sm:items-start"
                  >
                    <div
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-none border"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <Image
                        src={art.src}
                        alt={art.alt}
                        fill
                        loading="lazy"
                        sizes="96px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="icon-well-gold absolute bottom-1.5 right-1.5 h-7 w-7 border">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-500">
                        0{index + 1} · {service.category}
                      </p>
                      <h3 className="mt-1.5 text-base font-extrabold text-theme-primary">
                        {service.navTitle}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] font-medium text-theme-muted">
                        {service.shortDesc}
                      </p>
                      <span className="mt-3 inline-flex items-center text-xs font-bold text-gold-500 transition-colors group-hover:text-theme-primary">
                        Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={service.slug}
                  href={`/service/${service.slug}`}
                  className="group flex items-center gap-4 rounded-none border p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--bg-elevated)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none border" style={{ borderColor: "var(--border-subtle)" }}>
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      loading="lazy"
                      sizes="80px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-500">
                      0{index + 1} · {service.turnaround}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-extrabold text-theme-primary">
                      {service.navTitle}
                    </h3>
                    <span className="mt-1.5 inline-flex items-center text-xs font-bold text-gold-500 transition-colors group-hover:text-theme-primary">
                      Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
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
            <Link
              href="/tools"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold-500 hover:text-theme-primary"
            >
              View full tools workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Book a free meeting: live slot picker wired to the admin calendar ── */}
      <section id="book-a-meeting" className="section-pad relative overflow-hidden">
        <div className="container-site relative z-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mx-auto">Free consultation</p>
            <h2 className="display-title mt-3 text-3xl md:text-4xl">
              Pick a slot. Talk to an expert.
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-theme-secondary">
              No cost, no obligation — book a live slot below and our DGFT desk confirms within
              business hours.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* ── Trust: metrics grid + verified testimonials, image as supporting accent only ── */}
      <section className="section-pad border-y border-subtle bg-surface relative overflow-hidden">
        <div className="container-site relative z-10">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Institutional trust</p>
              <h2 className="display-title text-3xl md:text-5xl">
                Trusted by leading exporters
              </h2>
              <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-theme-muted md:text-lg">
                A decade of DGFT filings, incentive claims, and customs coordination — measured in
                outcomes, not promises.
              </p>
            </div>
            <div className="collage-frame aspect-[16/9] w-full lg:aspect-[4/3]">
              <Image
                src={ILLUSTRATIONS.testimonials.src}
                alt={ILLUSTRATIONS.testimonials.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: SITE.metrics.clients, l: "Exporters served", icon: Users },
              { v: SITE.metrics.years, l: "Years of practice", icon: Award },
              { v: SITE.metrics.team, l: "Advisory team", icon: Building2 },
              { v: SITE.metrics.completed, l: "Cases completed", icon: CheckCircle2 },
            ].map((stat) => (
              <div key={stat.l} className="metric-tile">
                <stat.icon className="relative z-10 h-5 w-5 text-gold-500" aria-hidden />
                <div className="relative z-10 mt-4">
                  <p className="font-display text-2xl font-semibold tracking-tight text-theme-primary md:text-3xl">
                    {stat.v}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-theme-faint">
                    {stat.l}
                  </p>
                </div>
              </div>
            ))}
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

      {/* ── Blog: latest regulatory intelligence, admin-managed ── */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-site">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">
                <Newspaper className="mr-2 inline h-3.5 w-3.5" /> From the desk
              </p>
              <h2 className="display-title mt-3 text-3xl md:text-4xl">Regulatory updates</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-theme-secondary">
                DGFT circulars, customs policy shifts, and incentive changes — tracked and
                explained by our compliance desk.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold-500 transition-colors hover:text-theme-primary"
            >
              View all updates <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post, i) => {
              const art = ILLUSTRATIONS.services[BLOG_ART[i % BLOG_ART.length]];
              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-none border border-subtle bg-elevated shadow-theme-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-theme-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                        {post.category}
                      </span>
                      {post.date ? (
                        <span className="text-xs font-medium text-theme-faint">{post.date}</span>
                      ) : null}
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-theme-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-theme-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center text-sm font-bold text-gold-500 transition-colors group-hover:text-theme-primary">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
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
