import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Quote, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
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
  { value: SITE.metrics.team, label: "Team members", icon: Users },
  { value: SITE.metrics.awards, label: "Winning awards", icon: Award },
  { value: SITE.metrics.feedback, label: "Client feedback", icon: Sparkles },
  { value: SITE.metrics.completed, label: "Completed works", icon: ShieldCheck },
];

const TIMELINE = [
  {
    year: "2011",
    title: "Founded in Mumbai",
    body: "Opened the Malad West desk to help exporters navigate Foreign Trade Policy with clarity.",
    art: ILLUSTRATIONS.services.iec,
  },
  {
    year: "Growth",
    title: "PAN India coverage",
    body: "Expanded advisory operations to serve manufacturers and traders across India.",
    art: ILLUSTRATIONS.services.dgft,
  },
  {
    year: "Today",
    title: `${SITE.metrics.clients} active clients`,
    body: "Sixteen specialized EXIM services — licensing, incentives, and customs — under one roof.",
    art: ILLUSTRATIONS.services.rodtep,
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-page">
      {/* ── Compact intro: no giant banner — copy leads, collage supports ── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GoldOrb className="-right-24 top-10 h-80 w-80" />
        <div className="container-site relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">About · Est. {SITE.metrics.since}</p>
            <h1 className="display-title max-w-xl text-4xl md:text-5xl lg:text-6xl">
              A decade of clarity for Indian exporters
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              {SITE.mission.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us">
                <Button size="lg" className="font-extrabold">
                  Talk to {SITE.founder} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="font-bold">
                  View our services
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="collage-frame relative aspect-[4/5] w-[80%]">
              <Image
                src={ILLUSTRATIONS.about.src}
                alt={ILLUSTRATIONS.about.alt}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-center"
              />
            </div>
            <div className="collage-frame absolute -bottom-8 -right-2 aspect-[5/4] w-[52%] sm:-right-6">
              <Image
                src={ILLUSTRATIONS.consultancy.src}
                alt={ILLUSTRATIONS.consultancy.alt}
                fill
                sizes="(max-width: 1024px) 55vw, 260px"
                className="object-cover object-center"
              />
            </div>
            <div className="stat-float left-0 top-4 sm:-left-6">
              <div className="icon-well-gold h-11 w-11 shrink-0">
                <Award className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="stat-float__value">{SITE.metrics.years}</p>
                <p className="stat-float__label">Years of practice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip relative overflow-hidden py-14" aria-label="Firm metrics">
        <TradeRouteLines className="pointer-events-none absolute inset-x-0 top-1/2 h-36 -translate-y-1/2 text-gold-500 opacity-30" />
        <div className="container-site relative z-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
              <stat.icon className="h-4 w-4 shrink-0 text-gold-500 md:mb-3" aria-hidden />
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-theme-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-theme-faint">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission + advisory visual */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-site relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Mission</p>
            <h2 className="display-title text-3xl md:text-4xl">Our Mission</h2>
            <div className="mt-6 space-y-5 text-base font-medium leading-relaxed text-theme-muted">
              <p>{SITE.mission.detail}</p>
              <p>{SITE.mission.experience}</p>
            </div>
          </div>
          <VisualFrame
            src={ILLUSTRATIONS.faq.src}
            alt={ILLUSTRATIONS.faq.alt}
            className="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Leadership — founder desk, no invented bios */}
      <section className="section-pad border-y border-subtle bg-surface relative overflow-hidden">
        <div className="container-site relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto mb-10 w-full max-w-sm lg:mx-0">
            <div className="collage-frame relative aspect-[4/5] w-full">
              <Image
                src="/images/founder-nandkumar.png"
                alt={`${SITE.founder}, Founder of Welcome Consultancy`}
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover object-top"
              />
            </div>
            <div className="navy-panel card-sheen absolute -bottom-10 left-4 right-4 z-20 rounded-none p-6 sm:left-8 sm:right-8">
              <Quote className="relative z-10 h-7 w-7 text-gold-500/70" aria-hidden />
              <p className="relative z-10 mt-3 font-display text-base font-medium leading-relaxed text-white/90">
                &ldquo;Our clients&apos; most trusted provider — by consistently exceeding
                expectations.&rdquo;
              </p>
              <p className="relative z-10 mt-4 text-sm font-bold text-white">{SITE.founder}</p>
              <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.14em] text-gold-500">
                Founder, Welcome Consultancy
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="display-title text-3xl md:text-4xl">Led from the front by {SITE.founder}</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              {SITE.mission.team}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="trust-badge flex-col gap-2 !items-start !justify-start !text-left">
                <Target className="h-4 w-4 text-gold-500" aria-hidden />
                <p className="text-sm font-bold text-theme-primary">Hands-on DGFT expertise</p>
              </div>
              <div className="trust-badge flex-col gap-2 !items-start !justify-start !text-left">
                <ShieldCheck className="h-4 w-4 text-gold-500" aria-hidden />
                <p className="text-sm font-bold text-theme-primary">Direct authority follow-up</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — elegant rail, smaller thumbnail images per era */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-left-24 bottom-10 h-72 w-72" />
        <div className="container-site relative z-10">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Journey</p>
            <h2 className="display-title text-3xl md:text-5xl">Built for exporters over time</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
            {TIMELINE.map((item, i) => (
              <article key={item.year} className="flow-card group !flex-col !items-stretch">
                {i < TIMELINE.length - 1 ? (
                  <span className="flow-card__arrow">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                ) : null}
                <div className="relative -m-6 mb-0 aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.art.src}
                    alt={item.art.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-500">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-theme-primary">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-theme-muted">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values with contact visual */}
      <section className="section-pad border-t border-subtle bg-surface relative overflow-hidden">
        <div className="container-site relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
            <Link href="/contact-us" className="mt-9 inline-block">
              <Button size="lg" className="font-extrabold">
                Talk to {SITE.founder} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
