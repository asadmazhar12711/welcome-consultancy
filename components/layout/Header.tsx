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
import { SITE, whatsappUrl } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#tools", label: "Tools" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const core = [
    ...servicesByCategory("Core Licensing"),
    ...servicesByCategory("Export Incentives"),
    ...servicesByCategory("Status Recognition"),
  ];
  const compliance = [
    ...servicesByCategory("Customs Compliance"),
    ...servicesByCategory("Specialized Compliance"),
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3.5 transition-all duration-300 ${
          scrolled || megaOpen ? "glass-nav" : "border border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-gradient font-display text-xl font-semibold text-theme-on-gold shadow-gold transition-transform duration-300 group-hover:scale-105">
            W
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[17px] font-semibold tracking-tight text-theme-primary transition-colors group-hover:text-gold-500">
              {SITE.name}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-muted">
              DGFT & EXIM
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-theme-secondary transition-colors hover:bg-fill hover:text-theme-primary"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                megaOpen || pathname?.startsWith("/service")
                  ? "bg-gold-muted text-gold-500"
                  : "text-theme-secondary hover:bg-fill hover:text-theme-primary"
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-theme-secondary transition-colors hover:bg-fill hover:text-theme-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={SITE.phones[0].href}
            className="flex items-center gap-2 text-sm font-bold text-theme-secondary transition-colors hover:text-theme-primary"
          >
            <PhoneCall className="h-4 w-4 text-gold-500" />
            {SITE.phones[0].display}
          </a>
          <Link href="/contact-us">
            <Button className="rounded-full px-6 font-extrabold">Book Appointment</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-subtle bg-fill text-theme-primary transition-colors hover:bg-fill-hover"
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
          className="mega-menu-panel animate-mega-menu mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl"
          role="region"
          aria-label="Services mega menu"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-2 grid grid-cols-1 gap-10 p-8 md:grid-cols-2 md:p-10">
              <div>
                <h3 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500">
                  Licensing & Incentives
                </h3>
                <ul className="space-y-1">
                  {core.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-fill"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-subtle bg-fill transition-colors group-hover:border-gold group-hover:bg-gold-muted">
                          <ArrowRight className="h-3.5 w-3.5 text-theme-muted group-hover:text-gold-500" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-theme-secondary group-hover:text-theme-primary">
                            {s.navTitle}
                          </span>
                          <span className="mt-0.5 block text-xs text-theme-faint">{s.turnaround}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500">
                  Customs & Compliance
                </h3>
                <ul className="space-y-1">
                  {compliance.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-fill"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-subtle bg-fill transition-colors group-hover:border-gold group-hover:bg-gold-muted">
                          <ArrowRight className="h-3.5 w-3.5 text-theme-muted group-hover:text-gold-500" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-theme-secondary group-hover:text-theme-primary">
                            {s.navTitle}
                          </span>
                          <span className="mt-0.5 block text-xs text-theme-faint">{s.turnaround}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="relative flex flex-col justify-between overflow-hidden border-t border-subtle bg-gradient-to-b from-elevated to-page p-8 md:p-10 lg:border-l lg:border-t-0">
              <ShieldCheck className="pointer-events-none absolute -right-4 top-4 h-36 w-36 text-gold-500 opacity-[0.06]" />
              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold bg-gold-muted">
                  <Zap className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="mb-2 text-xl font-extrabold tracking-tight text-theme-primary">
                  Need expert help?
                </h3>
                <p className="mb-6 text-sm font-medium leading-relaxed text-theme-muted">
                  Our DGFT desk evaluates incentives, licensing, and customs compliance — typically
                  within business hours.
                </p>
                <Link href="/contact-us" className="mb-3 block">
                  <Button className="w-full font-extrabold">Consult now</Button>
                </Link>
                <Link href="/services" className="block text-center text-sm font-semibold text-theme-muted transition-colors hover:text-gold-500">
                  View all {SERVICES.length} services →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="glass-panel animate-mega-menu mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-3xl p-4 lg:hidden">
          <Link href="/" className="rounded-xl px-4 py-3.5 text-sm font-bold text-theme-primary hover:bg-fill-hover">
            Home
          </Link>
          <div className="px-4 py-2">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-500">
              All Services
            </p>
            <div className="max-h-[45vh] space-y-1 overflow-y-auto border-l border-subtle pl-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/service/${s.slug}`}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-theme-secondary hover:text-theme-primary"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-theme-faint" />
                  {s.navTitle}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#tools" className="rounded-xl px-4 py-3.5 text-sm font-bold text-theme-primary hover:bg-fill-hover">
            Tools
          </Link>
          <Link href="/about-us" className="rounded-xl px-4 py-3.5 text-sm font-bold text-theme-primary hover:bg-fill-hover">
            About Us
          </Link>
          <Link href="/contact-us" className="rounded-xl px-4 py-3.5 text-sm font-bold text-theme-primary hover:bg-fill-hover">
            Contact
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-glow mt-3 rounded-xl px-4 py-4 text-center text-sm font-extrabold"
          >
            WhatsApp {SITE.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
