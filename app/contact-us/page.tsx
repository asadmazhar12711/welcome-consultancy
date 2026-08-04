"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisualFrame } from "@/components/visual/VisualFrame";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { SERVICES } from "@/lib/services";
import { SITE, whatsappUrl } from "@/lib/site";

function ContactForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.get("firstName")} ${form.get("lastName")}`.trim(),
          email: form.get("email"),
          mobile: form.get("phone"),
          company: form.get("location") || undefined,
          service: form.get("service"),
          details: form.get("message"),
          source: "Website Contact Form",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="field">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            name="firstName"
            required
            className="field-obsidian"
            placeholder="Enter your first name"
            autoComplete="given-name"
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            name="lastName"
            required
            className="field-obsidian"
            placeholder="Enter your last name"
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="field-obsidian"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone / Mobile *</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="field-obsidian"
          placeholder="10-digit mobile number"
          autoComplete="tel"
          inputMode="numeric"
        />
      </div>
      <div className="field">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          className="field-obsidian"
          placeholder="City / State"
          autoComplete="address-level2"
        />
      </div>
      <div className="field">
        <label htmlFor="service">Service Required *</label>
        <select
          id="service"
          name="service"
          defaultValue={preselected}
          required
          className="field-obsidian"
        >
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.navTitle}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field-obsidian resize-y"
          placeholder="Tell us about your requirements…"
        />
      </div>
      <Button
        type="submit"
        disabled={status === "sending"}
        size="lg"
        className="h-14 w-full rounded-xl text-base font-extrabold"
      >
        {status === "sending" ? "Submitting…" : "Submit enquiry"}
      </Button>
      {status === "sent" && (
        <div className="status-ok" role="status">
          Thank you — our DGFT desk will contact you shortly.
        </div>
      )}
      {status === "error" && (
        <div className="status-err" role="alert">
          Something went wrong. Please call us or try WhatsApp.
        </div>
      )}
    </form>
  );
}

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-page">
      {/* Visual-first contact hero */}
      <section className="relative isolate min-h-[65vh] overflow-hidden">
        <Image
          src={ILLUSTRATIONS.contact.src}
          alt={ILLUSTRATIONS.contact.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="hero-visual__scrim" aria-hidden />
        <div className="container-site relative z-10 flex min-h-[65vh] flex-col justify-end pb-16 pt-28 md:pb-20">
          <p className="eyebrow !text-[#D4AF37]">Connect with experts</p>
          <h1 className="display-title max-w-2xl text-4xl !text-white md:text-6xl">Contact Us</h1>
          <p className="mt-5 max-w-lg text-lg font-medium leading-relaxed text-slate-200">
            Absolute clarity on DGFT compliance and EXIM policy — senior advisors ready to assist.
          </p>
        </div>
      </section>

      <section className="section-pad !pt-16">
        <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Illustration + reach — primary visual column */}
          <div>
            <VisualFrame
              src={ILLUSTRATIONS.decoRoutes.src}
              alt="Global trade route network connecting exporters worldwide"
              className="mb-10 aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            <p className="eyebrow">Reach us</p>
            <h2 className="display-title text-3xl md:text-4xl">Get in touch</h2>
            <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-theme-muted">
              We typically respond within business hours ({SITE.hours}).
            </p>

            <ul className="mt-10 space-y-6">
              {[
                {
                  icon: Phone,
                  title: "Phone Numbers",
                  body: SITE.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="block min-h-11 py-1 font-semibold text-theme-secondary transition-colors hover:text-gold-500"
                    >
                      {p.display}
                    </a>
                  )),
                },
                {
                  icon: MessageSquare,
                  title: "WhatsApp",
                  body: (
                    <Link
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-semibold text-theme-secondary transition-colors hover:text-gold-500"
                    >
                      {SITE.phoneDisplay} <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  ),
                },
                {
                  icon: Mail,
                  title: "Email Address",
                  body: (
                    <>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="block min-h-11 py-1 font-semibold text-theme-secondary transition-colors hover:text-gold-500"
                      >
                        {SITE.email}
                      </a>
                      <a
                        href={`mailto:${SITE.emailOwner}`}
                        className="block min-h-11 py-1 font-semibold text-theme-secondary transition-colors hover:text-gold-500"
                      >
                        {SITE.emailOwner}
                      </a>
                    </>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Office Address",
                  body: (
                    <p className="font-semibold leading-relaxed text-theme-secondary">
                      {SITE.address.full}
                    </p>
                  ),
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  body: (
                    <p className="font-semibold leading-relaxed text-theme-secondary">{SITE.hours}</p>
                  ),
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="icon-well-gold h-12 w-12">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="mb-1 font-extrabold text-theme-primary">{item.title}</h3>
                    {item.body}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form secondary */}
          <div className="rounded-[2rem] border border-subtle bg-elevated p-7 shadow-theme-xl md:p-10 lg:sticky lg:top-28 lg:self-start">
            <div className="mb-8">
              <h3 className="font-display text-2xl font-semibold text-theme-primary md:text-3xl">
                Send a message
              </h3>
              <p className="mt-2 text-sm font-medium text-theme-muted">
                We will get back to you as soon as possible.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex h-64 items-center justify-center text-sm font-bold text-theme-faint">
                  Loading form…
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
