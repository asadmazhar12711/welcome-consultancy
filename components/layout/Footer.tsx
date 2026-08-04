import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Footer() {
  const mid = Math.ceil(SERVICES.length / 2);
  const col1 = SERVICES.slice(0, mid);
  const col2 = SERVICES.slice(mid);

  return (
    <footer className="relative overflow-hidden border-t border-subtle bg-page pb-10 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--mesh-gold)_0%,transparent_55%)]" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center">
              <img
                src="/images/logo-light.png"
                alt="Welcome Consultancy"
                className="h-12 w-auto block dark:hidden object-contain"
              />
              <img
                src="/images/logo-dark.png"
                alt="Welcome Consultancy"
                className="h-12 w-auto hidden dark:block object-contain"
              />
            </div>
            <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-theme-muted">
              {SITE.mission.intro}
            </p>
            <ul className="space-y-4 text-sm font-semibold text-theme-secondary">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-500"
                >
                  <Mail className="h-4 w-4 text-gold-500" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phones[0].href}
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-500"
                >
                  <Phone className="h-4 w-4 text-gold-500" aria-hidden />
                  {SITE.phones[0].display} / {SITE.phones[1].display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                <span className="max-w-[280px] leading-relaxed">{SITE.address.full}</span>
              </li>
              <li className="inline-flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold-500" aria-hidden />
                {SITE.hours}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-semibold text-theme-muted">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "All Services", href: "/services" },
                { label: "Contact", href: "/contact-us" },
                { label: "Exporter Tools", href: "/#tools" },
                { label: "Blogs", href: "/blogs" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-theme-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <h3 className="eyebrow mb-6">DGFT Services</h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[col1, col2].map((col, i) => (
                <ul key={i} className="space-y-3 text-sm font-semibold text-theme-muted">
                  {col.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/service/${s.slug}`}
                        className="block truncate transition-colors hover:text-gold-500"
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

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-subtle pt-8 text-sm font-semibold text-theme-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-glow rounded-none bg-[var(--success)]" aria-hidden />
            <p>Serving exporters PAN India since {SITE.metrics.since}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
