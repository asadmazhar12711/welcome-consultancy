"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Search, Sparkles, X } from "lucide-react";
import { SERVICES, type ServiceRecord } from "@/lib/services";
import { illustrationForService } from "@/lib/illustrations";

type CategoryFilter =
  | "All Services"
  | "Licensing Services"
  | "Registration Services"
  | "Certification Services"
  | "Other Export Related Work";

const CATEGORIES: { label: string; value: CategoryFilter; shortLabel: string }[] = [
  { label: "All Services", value: "All Services", shortLabel: "All (26)" },
  { label: "Licensing Services", value: "Licensing Services", shortLabel: "Licensing (5)" },
  { label: "Registration Services", value: "Registration Services", shortLabel: "Registration (7)" },
  { label: "Certification Services", value: "Certification Services", shortLabel: "Certification (8)" },
  { label: "Other Export Related Work", value: "Other Export Related Work", shortLabel: "Other Work (6)" },
];

export function ServicesDirectory() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === "All Services" || service.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const matchesTitle = service.title.toLowerCase().includes(query);
      const matchesNavTitle = service.navTitle.toLowerCase().includes(query);
      const matchesDesc = service.shortDesc.toLowerCase().includes(query);
      const matchesChecklist = service.checklist.some((item) =>
        item.toLowerCase().includes(query)
      );

      return matchesTitle || matchesNavTitle || matchesDesc || matchesChecklist;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* ── Filter Controls: Category Tabs & Search Bar ── */}
      <div className="space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count =
              cat.value === "All Services"
                ? SERVICES.length
                : SERVICES.filter((s) => s.category === cat.value).length;

            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-none px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 border ${
                  isActive
                    ? "border-gold-500 bg-gold-muted/60 text-gold-500 shadow-gold"
                    : "border-subtle bg-surface text-theme-secondary hover:border-elevated hover:text-theme-primary hover:bg-fill"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-extrabold ${
                    isActive
                      ? "bg-gold-500 text-black"
                      : "bg-fill border border-subtle text-theme-faint"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Result Indicator */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-subtle pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme or service (e.g. RoDTEP, EPCG, IEC, AEO)..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-elevated border border-subtle text-theme-primary placeholder:text-theme-faint focus:outline-none focus:border-gold-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-faint hover:text-theme-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-theme-muted">
            Showing <span className="font-bold text-gold-500">{filteredServices.length}</span> of{" "}
            {SERVICES.length} Specialized DGFT Services
          </div>
        </div>
      </div>

      {/* ── Services Card Grid View ── */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const art = illustrationForService(service.slug);

            return (
              <article
                key={service.slug}
                className="group relative flex flex-col justify-between overflow-hidden border border-subtle bg-elevated transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]"
              >
                <div>
                  {/* Visual Header with Overlay & Badges */}
                  <Link
                    href={`/service/${service.slug}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-950"
                  >
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-none border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-200 backdrop-blur-md">
                        <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                        {service.category.replace(" Related Work", "")}
                      </span>
                    </div>

                    {/* Turnaround Badge on Image Bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {service.turnaround}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <h2 className="font-display text-xl font-bold tracking-tight text-theme-primary transition-colors group-hover:text-gold-500 leading-snug line-clamp-2">
                      <Link href={`/service/${service.slug}`}>{service.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-theme-muted line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Key Deliverables / Checklist Snippet */}
                    {service.checklist && service.checklist.length > 0 && (
                      <div className="pt-3 border-t border-subtle/80 space-y-1.5">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-theme-faint">
                          Key Deliverables:
                        </p>
                        {service.checklist.slice(0, 2).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-[11px] font-semibold text-theme-secondary line-clamp-1"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/service/${service.slug}`}
                    className="flex w-full items-center justify-between border border-subtle bg-fill px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-theme-primary transition-all duration-200 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-black"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-none border border-dashed border-subtle bg-elevated/50 p-12 text-center">
          <p className="text-base font-bold text-theme-primary">No DGFT services found</p>
          <p className="mt-1 text-xs text-theme-muted">
            No service matches &quot;{searchQuery}&quot; in the selected category.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All Services");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center gap-2 border border-gold-500 bg-gold-muted px-4 py-2 text-xs font-bold text-gold-500 hover:bg-gold-500 hover:text-black transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Bottom Advisory Banner ── */}
      <div className="rounded-none border border-gold/30 bg-surface p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
            Unsure Which Scheme Applies?
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-theme-primary">
            Speak with a Senior DGFT Advisor Today
          </h3>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            We evaluate your product HSN codes, manufacturing inputs, and export destinations to identify all eligible government incentives.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link href="/contact-us" className="w-full sm:w-auto">
            <button
              type="button"
              className="btn-gold-glow w-full sm:w-auto px-6 py-3 text-xs font-extrabold uppercase tracking-wider"
            >
              Book Free DGFT Consultation
            </button>
          </Link>
          <Link href="/#intelligence-desk" className="w-full sm:w-auto">
            <button
              type="button"
              className="btn-glass w-full sm:w-auto px-6 py-3 text-xs font-extrabold uppercase tracking-wider border-subtle text-theme-primary"
            >
              Check Incentives
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
