"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  Gauge,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldOrb, GridMesh } from "@/components/visual/Decor";
import RodtepCalculator from "@/components/tools/RodtepCalculator";
import EpcgEstimator from "@/components/tools/EpcgEstimator";
import ChecklistGenerator from "@/components/tools/ChecklistGenerator";
import BookingCalendar from "@/components/tools/BookingCalendar";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { SITE } from "@/lib/site";

const CATEGORIES = [
  {
    icon: Calculator,
    title: "Trade Intelligence",
    body: "RoDTEP, RoSCTL, and EPCG estimators modeling incentive value before you file.",
    tag: "Live calculators",
  },
  {
    icon: FileCheck2,
    title: "Documentation",
    body: "Custom document checklists by service — IEC, RCMC, AD Code, DSC, and Certificate of Origin.",
    tag: "Checklist engine",
  },
  {
    icon: CalendarClock,
    title: "Scheduling",
    body: "Real-time advisory slot booking synced with our DGFT desk's working calendar.",
    tag: "Slot scheduler",
  },
  {
    icon: Landmark,
    title: "Government Portals",
    body: "Direct-filing coordination across DGFT, ICEGATE, e-SANCHIT, and customs systems.",
    tag: "16 services",
  },
];

const WORKFLOW = [
  {
    icon: Gauge,
    title: "Model the number",
    body: "Run RoDTEP or EPCG estimators against your FOB turnover and capital goods value.",
  },
  {
    icon: ClipboardList,
    title: "Generate your checklist",
    body: "Select a service and receive the exact regulatory document list — nothing missed.",
  },
  {
    icon: ShieldCheck,
    title: "Lock the filing slot",
    body: "Book a live advisory session; our desk confirms and prepares before you arrive.",
  },
];

type ToolTab = "rodtep" | "epcg" | "checklist" | "booking";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>("rodtep");

  const tabs: { id: ToolTab; label: string }[] = [
    { id: "rodtep", label: "RoDTEP" },
    { id: "epcg", label: "EPCG" },
    { id: "checklist", label: "Checklist" },
    { id: "booking", label: "Booking" },
  ];

  return (
    <div className="min-h-screen bg-page">
      {/* ── Compact intro, no giant banner ── */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <GoldOrb className="-left-24 top-10 h-80 w-80" />
        <div className="container-site relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Tools & platforms</p>
            <h1 className="display-title max-w-xl text-4xl md:text-5xl lg:text-6xl">
              The desk&apos;s working software, in your hands
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              The same estimators, checklists, and scheduling systems our advisory team uses
              internally — now open for exporters to model incentives before engaging us.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#workspace">
                <Button size="lg" className="font-extrabold">
                  Open the workspace <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/contact-us">
                <Button size="lg" variant="outline" className="font-bold">
                  Talk to the desk
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="collage-frame relative ml-auto aspect-[4/5] w-[80%]">
              <Image
                src={ILLUSTRATIONS.incentives.src}
                alt={ILLUSTRATIONS.incentives.alt}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-center"
              />
            </div>
            <div className="collage-frame absolute -bottom-8 left-0 aspect-[5/4] w-[52%]">
              <Image
                src={ILLUSTRATIONS.decoRoutes.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 55vw, 260px"
                className="object-cover object-center"
              />
            </div>
            <div className="stat-float right-0 top-4 sm:-right-6">
              <div className="icon-well-gold h-11 w-11 shrink-0">
                <Gauge className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="stat-float__value">4</p>
                <p className="stat-float__label">Live tools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category grid ── */}
      <section className="relative overflow-hidden border-y border-subtle bg-surface py-16 md:py-20">
        <GridMesh />
        <div className="container-site relative z-10">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">What&apos;s inside</p>
            <h2 className="display-title text-3xl md:text-4xl">
              Four systems, one advisory desk
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="flow-card !flex-col !items-start">
                <div className="icon-well-gold h-11 w-11">
                  <cat.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <span className="pill-tag">{cat.tag}</span>
                  <h3 className="mt-3 text-base font-extrabold text-theme-primary">{cat.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-theme-muted">
                    {cat.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow rail ── */}
      <section className="section-pad relative overflow-hidden">
        <GoldOrb className="-right-32 top-1/3 h-96 w-96 opacity-60" />
        <div className="container-site relative z-10">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">How exporters use it</p>
            <h2 className="display-title text-3xl md:text-5xl">
              From estimate to booked filing in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {WORKFLOW.map((step, i) => (
              <div key={step.title} className="process-step">
                <div className="step-index">{i + 1}</div>
                <div className="mb-2 flex items-center gap-2">
                  <step.icon className="h-4 w-4 text-gold-500" aria-hidden />
                </div>
                <h3 className="text-lg font-extrabold text-theme-primary">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-theme-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live workspace: dashboard-style tabbed tool preview ── */}
      <section id="workspace" className="section-pad relative overflow-hidden border-t border-subtle bg-surface">
        <div className="container-site relative z-10">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Live workspace</p>
            <h2 className="display-title text-3xl md:text-5xl">Run it yourself, right now</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-theme-muted md:text-lg">
              No signup. Model your numbers, generate your checklist, and reserve a filing slot —
              all before you speak to us.
            </p>
          </div>

          <div className="tool-shell mx-auto max-w-4xl">
            <div className="tool-shell-tabs flex-wrap" role="tablist" aria-label="Exporter tools">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-11 flex-1 rounded-none px-4 py-2.5 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
                    activeTab === tab.id
                      ? "bg-gold-fill text-theme-on-gold shadow-gold"
                      : "text-theme-muted hover:bg-fill-hover hover:text-theme-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6" role="tabpanel">
              {activeTab === "rodtep" ? <RodtepCalculator /> : null}
              {activeTab === "epcg" ? <EpcgEstimator /> : null}
              {activeTab === "checklist" ? <ChecklistGenerator /> : null}
              {activeTab === "booking" ? <BookingCalendar /> : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="navy-panel relative isolate overflow-hidden">
        <div className="container-site relative z-10 flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <p className="eyebrow !text-[#D4AF37]">Next step</p>
          <h2 className="display-title max-w-2xl text-3xl !text-white md:text-5xl">
            Prefer a human to run the numbers with you?
          </h2>
          <p className="max-w-lg text-base font-medium leading-relaxed text-slate-300">
            Every estimate here is a starting point. {SITE.founder} and the desk verify eligibility
            against your exact product chapter and shipping history.
          </p>
          <Link href="/contact-us">
            <Button size="lg" className="h-14 px-10 text-base font-extrabold">
              Book free consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
