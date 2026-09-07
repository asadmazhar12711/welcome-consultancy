"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Menu,
  PhoneCall,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SERVICES, servicesByCategory } from "@/lib/services";
import { SITE, telUrl, whatsappUrl } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (
        megaRef.current &&
        triggerRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }

  function scheduleCloseMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  }

  const licensing = servicesByCategory("Licensing Services");
  const registration = servicesByCategory("Registration Services");
  const certification = servicesByCategory("Certification Services");
  const otherWork = servicesByCategory("Other Export Related Work");

  const isHomePage = pathname === "/";
  const isSolid = !isHomePage || scrolled || mobileOpen || megaOpen;
  const navLinkClass = isSolid
    ? "text-theme-secondary hover:bg-fill hover:text-theme-primary"
    : "text-white/90 hover:bg-white/10 hover:text-white drop-shadow-sm";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] w-full transition-all duration-300 ${
        isSolid
          ? "bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl shadow-md"
          : "bg-gradient-to-b from-black/75 via-black/30 to-transparent shadow-none"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="group flex items-center rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
        >
          <img
            src="/images/logo-light.png"
            alt="Welcome Consultancy"
            width={180}
            height={44}
            decoding="async"
            className={`h-10 sm:h-11 w-auto ${isSolid ? "block dark:hidden" : "hidden"} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
          />
          <img
            src="/images/logo-dark.png"
            alt="Welcome Consultancy"
            width={180}
            height={44}
            decoding="async"
            className={`h-10 sm:h-11 w-auto ${isSolid ? "hidden dark:block" : "block"} object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`rounded-none px-4 py-2 text-sm font-semibold transition-colors ${navLinkClass}`}
          >
            Home
          </Link>

          <div
            className="relative flex items-center"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <Link
              href="/services"
              onClick={() => setMegaOpen(false)}
              className={`flex items-center gap-1.5 rounded-none px-3.5 py-2 text-sm font-semibold transition-colors ${
                pathname === "/services" || (pathname?.startsWith("/service") && !megaOpen)
                  ? "bg-gold-muted text-gold-500"
                  : navLinkClass
              }`}
            >
              <span>Services</span>
              <span className="rounded border border-gold/30 bg-gold-muted px-1.5 py-0.5 text-[10px] font-bold text-gold-500">
                25+
              </span>
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              aria-label="Toggle services menu"
              className={`p-2 transition-colors rounded-none ${
                megaOpen
                  ? "text-gold-500 bg-gold-muted"
                  : isSolid
                  ? "text-theme-secondary hover:text-theme-primary hover:bg-fill"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-none px-4 py-2 text-sm font-semibold transition-colors ${navLinkClass}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={SITE.phones[0].href}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${
              isSolid
                ? "text-theme-secondary hover:text-theme-primary"
                : "text-white hover:text-white/80 drop-shadow-sm"
            }`}
          >
            <PhoneCall className="h-4 w-4 text-gold-500" />
            {SITE.phones[0].display}
          </a>
          <Link href="/contact-us">
            <Button className="rounded-none px-6 font-extrabold shadow-gold">Book Appointment</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-none border transition-colors ${
              isSolid
                ? "border-subtle bg-fill text-theme-primary hover:bg-fill-hover"
                : "border-white/25 bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {megaOpen && (
        <div
          ref={megaRef}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className="mega-menu-panel animate-mega-menu absolute inset-x-0 top-full w-full bg-white/98 dark:bg-[#090D1A]/98 backdrop-blur-2xl text-theme-primary shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.7)] border-b border-subtle border-t border-gold/30"
          role="region"
          aria-label="Services mega menu"
        >
          {/* 4 Clean Equal Columns inside Max-W-7XL container */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Col 1: Licensing Services */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                    Licensing Services
                  </span>
                  <span className="text-[10px] font-bold text-theme-faint bg-surface px-1.5 py-0.5 border border-subtle">
                    {licensing.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {licensing.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between rounded-none px-2.5 py-1.5 transition-colors hover:bg-gold-muted/30"
                      >
                        <span className="text-xs font-semibold text-theme-secondary group-hover:text-gold-500 truncate">
                          {s.navTitle}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: Registration Services */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                    Registration Services
                  </span>
                  <span className="text-[10px] font-bold text-theme-faint bg-surface px-1.5 py-0.5 border border-subtle">
                    {registration.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {registration.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between rounded-none px-2.5 py-1.5 transition-colors hover:bg-gold-muted/30"
                      >
                        <span className="text-xs font-semibold text-theme-secondary group-hover:text-gold-500 truncate">
                          {s.navTitle}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Certification Services */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                    Certification Services
                  </span>
                  <span className="text-[10px] font-bold text-theme-faint bg-surface px-1.5 py-0.5 border border-subtle">
                    {certification.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {certification.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between rounded-none px-2.5 py-1.5 transition-colors hover:bg-gold-muted/30"
                      >
                        <span className="text-xs font-semibold text-theme-secondary group-hover:text-gold-500 truncate">
                          {s.navTitle}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: Other Export Related Work */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-subtle">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                    Other Export Work
                  </span>
                  <span className="text-[10px] font-bold text-theme-faint bg-surface px-1.5 py-0.5 border border-subtle">
                    {otherWork.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {otherWork.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="group flex items-center justify-between rounded-none px-2.5 py-1.5 transition-colors hover:bg-gold-muted/30"
                      >
                        <span className="text-xs font-semibold text-theme-secondary group-hover:text-gold-500 truncate">
                          {s.navTitle}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Integrated Slim Institutional Footer Strip */}
          <div className="border-t border-subtle bg-slate-50 dark:bg-surface/80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-theme-primary">PAN India DGFT &amp; Customs Liaison</span>
                <span className="hidden md:inline text-theme-muted">· Direct Regional Authority representation</span>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href={telUrl()}
                  className="font-semibold text-theme-secondary hover:text-gold-500 transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-gold-500" />
                  {SITE.phoneDisplay}
                </a>
                <Link
                  href="/services"
                  onClick={() => setMegaOpen(false)}
                  className="font-bold text-gold-500 hover:text-theme-primary transition-colors flex items-center gap-1"
                >
                  View all 26 services index <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Height Mobile Drawer with Light Mode, Collapsed Services by Default, and Fixed Bottom Buttons */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 z-[99] bg-white dark:bg-[#030712] text-theme-primary border-t border-subtle lg:hidden flex flex-col justify-between"
          style={{ height: "calc(100dvh - 4rem)" }}
        >
          {/* Scrollable Middle Container: Fits on screen; only scrolls when services catalog is expanded */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2 text-base font-bold text-theme-primary hover:text-gold-500 border-b border-subtle"
            >
              <span>Home</span>
            </Link>

            {/* Collapsible Services (Collapsed by Default) */}
            <div className="border-b border-subtle pb-2">
              <button
                type="button"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="flex w-full items-center justify-between py-2 text-base font-bold text-theme-primary hover:text-gold-500"
              >
                <span className="flex items-center gap-2">
                  <span>DGFT Services</span>
                  <span className="rounded border border-gold/40 bg-gold-muted px-2 py-0.5 text-[10px] font-bold text-gold-500">
                    25+
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gold-500 transition-transform duration-200 ${
                    servicesExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesExpanded && (
                <div className="mt-2 space-y-3 pl-2 animate-fade-in">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                      Catalog Categories
                    </span>
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs font-bold text-gold-500 underline underline-offset-2"
                    >
                      View All 26 Services →
                    </Link>
                  </div>

                  {/* 1. Licensing */}
                  <div className="rounded-none border border-subtle bg-slate-50 dark:bg-surface/60 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === "licensing" ? null : "licensing")}
                      className="flex w-full items-center justify-between text-xs font-bold text-theme-primary"
                    >
                      <span>Licensing Services ({licensing.length})</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-gold-500 transition-transform ${openCategory === "licensing" ? "rotate-180" : ""}`} />
                    </button>
                    {(openCategory === "licensing" || !openCategory) && (
                      <div className="mt-2 grid grid-cols-1 gap-1 pt-2 border-t border-subtle/50">
                        {licensing.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/service/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-gold-500"
                          >
                            <span>{s.navTitle}</span>
                            <ArrowRight className="h-3 w-3 text-gold-500" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Registration */}
                  <div className="rounded-none border border-subtle bg-slate-50 dark:bg-surface/60 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === "registration" ? null : "registration")}
                      className="flex w-full items-center justify-between text-xs font-bold text-theme-primary"
                    >
                      <span>Registration Services ({registration.length})</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-gold-500 transition-transform ${openCategory === "registration" ? "rotate-180" : ""}`} />
                    </button>
                    {openCategory === "registration" && (
                      <div className="mt-2 grid grid-cols-1 gap-1 pt-2 border-t border-subtle/50">
                        {registration.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/service/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-gold-500"
                          >
                            <span>{s.navTitle}</span>
                            <ArrowRight className="h-3 w-3 text-gold-500" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Certification */}
                  <div className="rounded-none border border-subtle bg-slate-50 dark:bg-surface/60 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === "certification" ? null : "certification")}
                      className="flex w-full items-center justify-between text-xs font-bold text-theme-primary"
                    >
                      <span>Certification Services ({certification.length})</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-gold-500 transition-transform ${openCategory === "certification" ? "rotate-180" : ""}`} />
                    </button>
                    {openCategory === "certification" && (
                      <div className="mt-2 grid grid-cols-1 gap-1 pt-2 border-t border-subtle/50">
                        {certification.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/service/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-gold-500"
                          >
                            <span>{s.navTitle}</span>
                            <ArrowRight className="h-3 w-3 text-gold-500" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Other Work */}
                  <div className="rounded-none border border-subtle bg-slate-50 dark:bg-surface/60 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === "other" ? null : "other")}
                      className="flex w-full items-center justify-between text-xs font-bold text-theme-primary"
                    >
                      <span>Other Export Work ({otherWork.length})</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-gold-500 transition-transform ${openCategory === "other" ? "rotate-180" : ""}`} />
                    </button>
                    {openCategory === "other" && (
                      <div className="mt-2 grid grid-cols-1 gap-1 pt-2 border-t border-subtle/50">
                        {otherWork.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/service/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-gold-500"
                          >
                            <span>{s.navTitle}</span>
                            <ArrowRight className="h-3 w-3 text-gold-500" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blogs"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 text-base font-bold text-theme-primary hover:text-gold-500 border-b border-subtle"
            >
              <span>Trade Regulatory Blog</span>
            </Link>
            <Link
              href="/about-us"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 text-base font-bold text-theme-primary hover:text-gold-500 border-b border-subtle"
            >
              <span>About Our Firm</span>
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 text-base font-bold text-theme-primary hover:text-gold-500"
            >
              <span>Contact Desk</span>
            </Link>
          </div>

          {/* Fixed Footer Buttons Inside Drawer */}
          <div className="p-4 border-t border-subtle bg-slate-50 dark:bg-surface/90 space-y-2 shrink-0">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-glow w-full py-3.5 text-center text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              WhatsApp Us · {SITE.phoneDisplay}
            </a>
            <a
              href={telUrl()}
              className="btn-glass w-full py-3 text-center text-xs font-bold text-theme-primary flex items-center justify-center gap-2 border-subtle"
            >
              <PhoneCall className="h-3.5 w-3.5 text-gold-500" /> Call Consultant Directly
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
