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
  Newspaper,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCalendar from "@/components/tools/BookingCalendar";
import ExportIncentiveAssessment from "@/components/tools/ExportIncentiveAssessment";
import { HeroVisual, VisualFrame } from "@/components/visual/VisualFrame";
import { GoldOrb, GridMesh, TradeRouteLines } from "@/components/visual/Decor";
import { ILLUSTRATIONS, illustrationForService } from "@/lib/illustrations";
import { SERVICES } from "@/lib/services";
import { SITE, whatsappUrl } from "@/lib/site";

const FEATURED = SERVICES.slice(0, 6);

const PROCESS = [
  {
    icon: FileSearch,
    title: "Consultation",
    body: "Understanding your export business requirement & applicable govt schemes and benefits.",
  },
  {
    icon: ClipboardList,
    title: "Documentation & Processing",
    body: "Complete documentation, registration requirement, filing and compliance support.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Support",
    body: "Follow-up, coordination, benefit claim and ongoing support until completion.",
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

  function triggerScripPopup(role: "buyer" | "supplier") {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-scrip-popup", { detail: { role } })
      );
    }
  }

  return (
    <div className="min-h-screen bg-page -mt-16 sm:-mt-20">
      {/* ── Cinematic Visual Hero: original high-impact full video / image ── */}
      <HeroVisual
        src={ILLUSTRATIONS.hero.src}
        alt={ILLUSTRATIONS.hero.alt}
        videoSrc="/videos/hero-bg.mp4"
        videoWebm="/videos/hero-bg.webm"
      >
        <div className="animate-fade-in max-w-2xl text-center sm:text-left mx-auto sm:mx-0 pt-8 sm:pt-12">
          <p className="eyebrow inline-flex items-center justify-center sm:justify-start gap-2 !text-gold-400 mx-auto sm:mx-0">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Est. {SITE.metrics.since} · {SITE.metrics.clients} Exporters · PAN India
          </p>
          <h1 className="display-title mt-2 text-5xl leading-[1.05] !text-white md:text-6xl lg:text-[4.25rem] text-center sm:text-left">
            Welcome Consultancy
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-200 md:text-xl text-center sm:text-left mx-auto sm:mx-0">
            Maximize export incentives with absolute precision — DGFT licensing,
            customs compliance, and government benefit claims under Foreign Trade Policy.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3">
            <Link href="/#intelligence-desk" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 w-full sm:w-auto px-8 text-sm font-extrabold shadow-gold">
                <Calculator className="h-4 w-4" /> Check Incentives
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => triggerScripPopup("supplier")}
              className="h-14 w-full sm:w-auto px-8 text-sm font-extrabold text-white bg-black/60 hover:bg-black/80 border border-gold/60 hover:border-gold transition-all duration-200 flex items-center justify-center gap-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] rounded-none active:scale-[0.98]"
            >
              <Tag className="h-4 w-4 text-gold-500" />
              <span>Sell / Buy Scrips</span>
            </button>
            <Link href="/contact-us" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full sm:w-auto border-white/30 bg-black/40 px-8 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20"
              >
                Book Consultation <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Transparent numerical trust stats floating directly over video ── */}
        <div className="mt-12 sm:mt-16 w-full pt-6 pb-2 border-t border-white/15 bg-transparent">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { v: SITE.metrics.clients, l: "Active customers" },
              { v: SITE.metrics.years, l: "Years experience" },
              { v: "25+", l: "DGFT services" },
              { v: "PAN India", l: "Coverage" },
            ].map((stat) => (
              <div key={stat.l} className="text-center sm:text-left">
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {stat.v}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-slate-200 drop-shadow-sm">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </HeroVisual>

      {/* ── Live Scrip & DGFT Trade Terminal ── */}
      <section className="relative overflow-hidden py-16 md:py-20 border-b border-subtle bg-gradient-to-b from-page via-surface to-page">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-gold-500/[0.05] blur-[100px]" />
        <GridMesh />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-none border border-gold/40 bg-gold-muted/40 px-3.5 py-1 text-xs font-bold text-gold-500 mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Duty Credit Scrip Realization & ICEGATE Liquidity</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-theme-primary leading-tight text-center lg:text-left">
                Direct Trading Desk for <span className="text-gradient-gold">RoDTEP & RoSCTL</span> Scrips
              </h2>
              <p className="text-base font-medium leading-relaxed text-theme-muted max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                Whether you hold surplus duty credit scrips needing immediate RTGS cash realization, or you are an importer seeking to lower Basic Customs Duty on incoming shipments, our verified ledger desk executes same-day ICEGATE transfers.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => triggerScripPopup("supplier")}
                  className="btn-gold-glow w-full sm:w-auto py-3 px-6 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Tag className="h-4 w-4" /> I Want to Sell Scrips (Exporters)
                </button>
                <button
                  type="button"
                  onClick={() => triggerScripPopup("buyer")}
                  className="btn-glass w-full sm:w-auto py-3 px-6 text-xs font-extrabold text-theme-primary hover:text-gold-500 flex items-center justify-center gap-2 border-subtle"
                >
                  <Tag className="h-4 w-4 text-gold-500" /> I Want to Buy Scrips (Importers)
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-none border border-gold/30 bg-elevated/90 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-subtle pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-theme-primary">
                    Live Benchmark Rates
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                    Updated FY 2026-27
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="border border-subtle bg-surface/60 p-3">
                    <p className="text-theme-faint text-[10px] font-bold uppercase">RoDTEP Scrips</p>
                    <p className="text-base font-mono font-extrabold text-gold-500 mt-1">Up to 4.3%</p>
                    <p className="text-[10px] text-theme-muted mt-0.5">FOB realization across eligible tariff lines</p>
                  </div>
                  <div className="border border-subtle bg-surface/60 p-3">
                    <p className="text-theme-faint text-[10px] font-bold uppercase">Duty Savings</p>
                    <p className="text-base font-mono font-extrabold text-emerald-400 mt-1">2% – 4%</p>
                    <p className="text-[10px] text-theme-muted mt-0.5">Direct margin savings on BCD customs duty</p>
                  </div>
                </div>
                <p className="text-[11px] text-theme-muted leading-relaxed">
                  100% verified ledger-to-ledger electronic transfer on ICEGATE with full regulatory documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── How we work: 3 client steps from consultation to post shipment incentive ── */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-left-24 top-20 h-72 w-72" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="display-title text-3xl md:text-5xl">
                From Consultation to Post-Shipment Incentive
              </h2>
              <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-theme-muted md:text-lg">
                We provide end to end export consultancy, covering consultation, documentation,
                registration, applications, compliance &amp; post-shipment support.
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
                      <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-theme-muted">
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Regulatory Updates (replaces Incentive Architecture) ── */}
      <section className="relative overflow-hidden border-y border-subtle bg-surface section-pad">
        <GridMesh />
        <div className="container-site relative z-10">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between text-center md:text-left">
            <div className="max-w-xl mx-auto md:mx-0">
              <p className="eyebrow justify-center md:justify-start">
                <Newspaper className="mr-2 inline h-3.5 w-3.5 text-gold-500" /> Regulatory updates
              </p>
              <h2 className="display-title text-3xl md:text-5xl">
                Trade Notices, Circulars & Policy Shifts
              </h2>
              <p className="mt-4 text-base font-medium text-theme-muted md:text-lg">
                DGFT circulars, customs notifications, and export incentive policy revisions — tracked and explained by our advisory desk.
              </p>
            </div>
            <Link href="/blogs" className="mx-auto md:mx-0">
              <Button variant="outline" className="font-bold">
                View all circulars <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
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
                      Read analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services: 25+ DGFT services ── */}
      <section id="services" className="section-pad relative">
        <GoldOrb className="-right-32 bottom-40 h-96 w-96 opacity-70" />
        <div className="container-site relative z-10">
          <div className="mb-6 flex flex-col gap-6 md:mb-4 md:flex-row md:items-end md:justify-between text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="eyebrow justify-center md:justify-start">Comprehensive DGFT Catalogue</p>
              <h2 className="display-title text-3xl md:text-5xl">
                25+ Specialized EXIM &amp; DGFT Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center justify-center md:justify-start text-sm font-bold text-theme-secondary transition-colors hover:text-gold-500 mx-auto md:mx-0"
            >
              View all {SERVICES.length} services index <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 lg:py-24 text-center lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Advisory desk</p>
            <h2 className="display-title text-3xl md:text-5xl">
              Compliance without the fog
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-theme-muted md:text-lg mx-auto lg:mx-0">
              Documentation, DGFT portals, and incentive claims orchestrated as one system —
              so exporters see clarity, not bureaucracy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/about-us" className="w-full sm:w-auto">
                <Button variant="outline" className="font-bold w-full sm:w-auto">
                  Our story <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => triggerScripPopup("buyer")}
                className="btn-gold-glow px-6 py-3 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Tag className="h-3.5 w-3.5" /> Scrip Buyer &amp; Seller Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intelligence desk: Check your export incentive ── */}
      <section id="intelligence-desk" className="section-pad relative overflow-hidden">
        <GoldOrb className="right-0 top-0 h-[520px] w-[520px]" />
        <div className="container-site relative z-10">
          <div className="mb-10 max-w-2xl text-center mx-auto">
            <p className="eyebrow justify-center mx-auto">Intelligence desk</p>
            <h2 className="display-title text-3xl md:text-5xl text-center">Check Your Export Incentive</h2>
            <p className="mt-4 text-base md:text-lg font-medium text-theme-muted text-center mx-auto">
              Enter your product name, HSN codes, turnover, and export finance details. Our DGFT advisory desk will evaluate your case and connect with an actionable benefit audit.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <ExportIncentiveAssessment />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-theme-secondary hover:text-gold-500"
            >
              <ShieldCheck className="h-4 w-4 text-gold-500" /> Explore 25+ DGFT Service Catalog
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-theme-secondary hover:text-gold-500"
            >
              <CalendarDays className="h-4 w-4 text-gold-500" /> Priority Consultation Booking
            </Link>
          </div>
        </div>
      </section>

      {/* ── Book a free meeting: 2-Column Multi-Column Layout ── */}
      <section id="book-a-meeting" className="section-pad relative overflow-hidden border-t border-subtle bg-surface">
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Heading, Value Props, Direct Contact */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-none border border-gold/40 bg-gold-muted/40 px-3 py-1 text-xs font-bold text-gold-500 mx-auto lg:mx-0">
                <Sparkles className="h-3 w-3" /> Free DGFT Consultation
              </div>

              <h2 className="display-title text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left">
                Pick a slot. Talk to an expert.
              </h2>

              <p className="text-base font-medium leading-relaxed text-theme-muted max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                No cost, no obligation — schedule a 1-on-1 direct session with our senior DGFT consultants to assess your export licensing, pending benefits, or customs SCN notices.
              </p>

              <div className="space-y-3 pt-4 border-t border-subtle">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-theme-primary">30-Minute Technical Session</p>
                    <p className="text-[11px] text-theme-muted">Direct discussion with an accredited Foreign Trade Policy specialist.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-theme-primary">Statutory Scheme Roadmap</p>
                    <p className="text-[11px] text-theme-muted">Tailored eligibility review for RoDTEP, EPCG, and Advance Authorization.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-theme-primary">Immediate Confirmation</p>
                    <p className="text-[11px] text-theme-muted">Slot confirmed directly on WhatsApp and calendar invite sent to your inbox.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-none border border-subtle bg-elevated/80 p-4">
                <p className="text-xs font-bold text-theme-primary">Urgent Customs or SCN Notice?</p>
                <p className="text-[11px] text-theme-muted mt-0.5">Call our senior consultant directly without waiting for a scheduled slot.</p>
                <a
                  href={`tel:${SITE.phone}`}
                  className="mt-2 text-xs font-extrabold text-gold-500 hover:text-theme-primary transition-colors flex items-center gap-1.5"
                >
                  Direct: {SITE.phoneDisplay} →
                </a>
              </div>
            </div>

            {/* Right Column: Compact Booking Calendar Form */}
            <div className="lg:col-span-7">
              <BookingCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust: metrics grid + verified testimonials (310 files removed) ── */}
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

          <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { v: SITE.metrics.clients, l: "Active Exporters Served", icon: Users },
              { v: SITE.metrics.years, l: "Years of DGFT Practice", icon: Award },
              { v: SITE.metrics.team, l: "Advisory Team & Associates", icon: Building2 },
            ].map((stat) => (
              <div key={stat.l} className="metric-tile p-6">
                <stat.icon className="relative z-10 h-6 w-6 text-gold-500" aria-hidden />
                <div className="relative z-10 mt-4">
                  <p className="font-display text-3xl font-semibold tracking-tight text-theme-primary md:text-4xl">
                    {stat.v}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-theme-faint">
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

          <div className="text-center lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Clarity</p>
            <h2 className="display-title mb-8 text-3xl md:text-4xl text-center lg:text-left">Questions, answered</h2>
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

      {/* ── CTA: High-Converting Obsidian Terminal ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-t border-subtle bg-gradient-to-b from-surface via-elevated to-surface">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="container-site relative z-10 text-center max-w-3xl mx-auto">
          <span className="pill-tag !border-gold/50 !bg-gold-muted !text-gold-500 font-bold mb-4 inline-block">
            Next Step · Priority EXIM Onboarding
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-theme-primary">
            Ready to secure your incentives?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg font-medium leading-relaxed text-theme-muted">
            Complex DGFT compliance — handled by certified practitioners. You focus on scaling international trade.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact-us">
              <Button size="lg" className="h-14 px-8 text-base font-extrabold shadow-gold w-full sm:w-auto">
                Engage Expert Desk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a
              href={whatsappUrl(`Hello Welcome Consultancy, I want to discuss export incentives for our firm.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass h-14 px-8 text-base font-bold text-theme-primary hover:text-gold-500 flex items-center justify-center gap-2 border-subtle w-full sm:w-auto"
            >
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
