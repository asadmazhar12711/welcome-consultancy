import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Footer() {
  const mid = Math.ceil(SERVICES.length / 2);
  const col1 = SERVICES.slice(0, mid);
  const col2 = SERVICES.slice(mid);

  return (
    <footer className="navy-panel relative overflow-hidden pb-10 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_50%)]" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center lg:justify-start">
              <img
                src="/images/logo-dark.png"
                alt="Welcome Consultancy"
                width={196}
                height={48}
                decoding="async"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-slate-400 mx-auto lg:mx-0">
              {SITE.mission.intro}
            </p>
            <ul className="space-y-4 text-sm font-semibold text-slate-300 flex flex-col items-center lg:items-start">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center justify-center lg:justify-start gap-3 transition-colors hover:text-[#e5c158]"
                >
                  <Mail className="h-4 w-4 text-[#d4af37]" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phones[0].href}
                  className="inline-flex items-center justify-center lg:justify-start gap-3 transition-colors hover:text-[#e5c158]"
                >
                  <Phone className="h-4 w-4 text-[#d4af37]" aria-hidden />
                  {SITE.phones[0].display} / {SITE.phones[1].display}
                </a>
              </li>
              <li className="flex flex-col sm:flex-row items-center lg:items-start gap-2 sm:gap-3 text-center lg:text-left">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" aria-hidden />
                <span className="max-w-[280px] leading-relaxed">{SITE.address.full}</span>
              </li>
              <li className="inline-flex items-center justify-center lg:justify-start gap-3">
                <Clock className="h-4 w-4 text-[#d4af37]" aria-hidden />
                {SITE.hours}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <h3 className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#d4af37]">
              Explore
            </h3>
            <ul className="space-y-4 text-sm font-semibold text-slate-400">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "All Services (25+)", href: "/services" },
                { label: "Contact", href: "/contact-us" },
                { label: "Blogs & Circulars", href: "/blogs" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 text-center lg:text-left">
            <h3 className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#d4af37]">
              DGFT Services
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[col1, col2].map((col, i) => (
                <ul key={i} className="space-y-3 text-sm font-semibold text-slate-400 text-center sm:text-left">
                  {col.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className="block truncate transition-colors hover:text-[#e5c158]"
                      >
                        {s.navTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-slate-500 sm:flex-row text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 animate-pulse-glow rounded-none bg-[var(--success)]" aria-hidden />
            <p>Serving exporters PAN India since {SITE.metrics.since}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
