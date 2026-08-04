import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisualFrame } from "@/components/visual/VisualFrame";
import { GoldOrb, TradeRouteLines } from "@/components/visual/Decor";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Welcome Consultancy Mumbai — leading Export Incentives & DGFT consulting firm since 2011, serving 1000+ clients PAN India.",
};

const STATS = [
  { value: SITE.metrics.team, label: "Team members" },
  { value: SITE.metrics.awards, label: "Winning Awards" },
  { value: SITE.metrics.feedback, label: "Client's Feedback" },
  { value: SITE.metrics.completed, label: "Completed Works" },
];

const TIMELINE = [
  {
    year: "2011",
    title: "Founded in Mumbai",
    body: "Opened the Malad West desk to help exporters navigate Foreign Trade Policy with clarity.",
  },
  {
    year: "Growth",
    title: "PAN India coverage",
    body: "Expanded advisory operations to serve manufacturers and traders across India.",
  },
  {
    year: "Today",
    title: `${SITE.metrics.clients} active clients`,
    body: "Sixteen specialized EXIM services — licensing, incentives, and customs — under one roof.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-page">
      {/* Full-bleed about hero */}
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <Image
          src={ILLUSTRATIONS.about.src}
          alt={ILLUSTRATIONS.about.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-visual__scrim" aria-hidden />
        <div className="container-site relative z-10 flex min-h-[70vh] flex-col justify-end pb-16 pt-28 md:pb-24">
          <p className="eyebrow !text-[#D4AF37]">About · Est. {SITE.metrics.since}</p>
          <h1 className="display-title max-w-3xl text-4xl !text-white md:text-5xl lg:text-6xl">
            About Welcome Consultancy
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-200">
            {SITE.mission.intro}
          </p>
        </div>
      </section>

      <section className="trust-strip relative overflow-hidden py-14" aria-label="Firm metrics">
        <TradeRouteLines className="pointer-events-none absolute inset-x-0 top-1/2 h-36 -translate-y-1/2 text-gold-500 opacity-30" />
        <div className="container-site relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-theme-primary">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-theme-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + advisory visual */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-left-20 top-10 h-72 w-72" />
        <div className="container-site relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Mission</p>
            <h2 className="display-title text-3xl md:text-4xl">Our Mission</h2>
            <div className="mt-6 space-y-5 text-base font-medium leading-relaxed text-theme-muted">
              <p>{SITE.mission.detail}</p>
              <p>{SITE.mission.experience}</p>
              <p>{SITE.mission.team}</p>
            </div>
            <Link href="/contact-us" className="mt-8 inline-block">
              <Button size="lg" className="font-extrabold">
                Talk to {SITE.founder} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <VisualFrame
            src={ILLUSTRATIONS.consultancy.src}
            alt={ILLUSTRATIONS.consultancy.alt}
            className="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Timeline illustration as primary */}
      <section className="section-pad border-y border-subtle bg-surface">
        <div className="container-site">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Journey</p>
            <h2 className="display-title text-3xl md:text-4xl">Built for exporters over time</h2>
          </div>

          <div className="infographic-stage mb-12 aspect-[16/9]">
            <Image
              src={ILLUSTRATIONS.about.src}
              alt={ILLUSTRATIONS.about.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
          </div>

          <div className="process-caption">
            {TIMELINE.map((item) => (
              <article key={item.year}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-theme-primary">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-theme-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles with contact visual */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <VisualFrame
            src={ILLUSTRATIONS.contact.src}
            alt={ILLUSTRATIONS.contact.alt}
            className="aspect-[4/3] order-2 lg:order-1"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="order-1 lg:order-2">
            <p className="eyebrow">Principles</p>
            <h2 className="display-title mb-8 text-3xl md:text-4xl">Why exporters choose us</h2>
            <div className="space-y-8">
              {SITE.valueProps.map((prop, i) => (
                <div key={prop.title} className="border-l-2 border-gold pl-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                    {String(i + 1).padStart(2, "0")} · {prop.title}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-theme-muted">
                    {prop.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
