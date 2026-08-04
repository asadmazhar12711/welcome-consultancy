import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs & Regulatory Updates",
  description:
    "Stay updated with the latest DGFT and Customs circulars, policy changes, and export incentives from Welcome Consultancy.",
};

const BLOG_ART = [
  "dgft",
  "rodtep",
  "epcg",
  "compliance",
  "iec",
  "aeo",
] as const;

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-page">
      <section className="relative isolate min-h-[55vh] overflow-hidden">
        <Image
          src={ILLUSTRATIONS.decoRoutes.src}
          alt="Global trade routes — regulatory intelligence network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-visual__scrim" aria-hidden />
        <div className="container-site relative z-10 flex min-h-[55vh] flex-col justify-end pb-14 pt-28 md:pb-20">
          <p className="eyebrow !text-[#D4AF37]">Blog</p>
          <h1 className="display-title max-w-3xl text-4xl !text-white md:text-5xl lg:text-6xl">
            Regulatory Updates
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-200">
            DGFT circulars, customs policy, and export incentive changes — for compliance managers
            and exporters.
          </p>
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-site space-y-4">
          {SITE.blogs.map((post, i) => {
            const key = BLOG_ART[i % BLOG_ART.length];
            const art = ILLUSTRATIONS.services[key];
            return (
              <article
                key={post.title}
                className="group grid grid-cols-1 overflow-hidden rounded-none border border-subtle bg-elevated shadow-theme-sm transition-all duration-300 hover:border-gold hover:shadow-theme-md md:grid-cols-[280px_1fr]"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[200px]">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-9">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-500">
                      {post.category}
                    </span>
                    <span className="text-xs font-medium text-theme-faint">{post.date}</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-theme-primary md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-theme-muted">
                    {post.excerpt}
                  </p>
                  <Link
                    href="/contact-us"
                    className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-gold-500 transition-colors hover:text-theme-primary"
                  >
                    Discuss with desk <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
