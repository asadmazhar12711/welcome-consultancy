"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, FileSearch, HelpCircle, Landmark, ShieldCheck, Sparkles } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export default function ExportIncentiveAssessment() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const [formData, setFormData] = useState({
    productsAndHsn: "",
    turnover: "₹1 Crore – ₹5 Crore",
    shipmentType: "Under LUT",
    hasExportLoan: "No",
    name: "",
    mobile: "",
    email: "",
    company: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const details = [
        `Product & HSN Codes: ${formData.productsAndHsn}`,
        `Yearly Turnover: ${formData.turnover}`,
        `Shipment Scheme: ${formData.shipmentType}`,
        `Export Loan / OD Facility: ${formData.hasExportLoan}`,
      ].join(" | ");

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          company: formData.company,
          service: "rodtep-rosctl-application",
          source: "Export Incentive Assessment",
          details,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-none border border-gold/40 bg-elevated p-8 text-center sm:p-12 shadow-gold animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="pill-tag mx-auto mt-6 !border-gold/50 !bg-gold-muted !text-gold-500 font-bold">
          Assessment Registered
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-theme-primary mt-3">
          Incentive Assessment Under Evaluation
        </h3>
        <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base font-medium leading-relaxed text-theme-muted">
          Thank you, <strong className="text-theme-primary">{formData.name}</strong>. Our DGFT & EXIM specialists will evaluate your product HSN codes, turnover bracket, and eligible incentive schemes (RoDTEP, RoSCTL, Duty Drawback, Interest Equalization) and contact you directly on{" "}
          <strong className="text-gold-500">{formData.mobile}</strong>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl(
              `Hello Welcome Consultancy, I just submitted an export incentive evaluation request for ${formData.company || formData.name}. My mobile is ${formData.mobile}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-glow w-full sm:w-auto px-7 py-3 text-sm font-extrabold"
          >
            Connect on WhatsApp with Senior Advisor
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs font-semibold text-theme-muted hover:text-theme-primary py-2 underline underline-offset-4"
          >
            Submit another query
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-none border border-subtle bg-elevated p-6 sm:p-8 lg:p-10 shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Heading, Subheading, Tag, Trust Badges */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="flex items-center justify-start gap-2">
            <span className="pill-tag !border-gold/50 !bg-gold-muted !text-gold-500 font-bold">
              <Sparkles className="h-3 w-3" /> DGFT Incentive Audit
            </span>
            <span className="text-[11px] font-bold text-theme-faint uppercase tracking-wider">
              Free Evaluation
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-theme-primary leading-tight text-left">
            Check Your Export Incentive Potential
          </h3>

          <p className="text-sm text-theme-muted leading-relaxed max-w-md text-left">
            Enter your export details. Our DGFT compliance desk will manually verify current Foreign Trade Policy rates, notification limits, and duty drawbacks for your specific product tariff lines.
          </p>

          <div className="space-y-3 pt-4 border-t border-subtle">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-theme-primary">Tariff Line Mapping</p>
                <p className="text-[11px] text-theme-muted">Evaluated against the latest RoDTEP schedule and Chapter-wise rate caps.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-theme-primary">Confidential Review</p>
                <p className="text-[11px] text-theme-muted">Strict client data confidentiality. Evaluated by senior DGFT practitioners.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-theme-primary">Prompt Advisory Response</p>
                <p className="text-[11px] text-theme-muted">Our team contacts you directly with a tailored assessment report within business hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact Form (fits cleanly on screen with clean selectors) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Product Name & HSN Code */}
            <div className="field">
              <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary flex items-center justify-between">
                <span>Product Name(s) & HSN Code(s) *</span>
                <span className="text-[10px] text-gold-500 font-semibold lowercase">
                  Multiple products accepted
                </span>
              </label>
              <input
                type="text"
                required
                value={formData.productsAndHsn}
                onChange={(e) => setFormData({ ...formData, productsAndHsn: e.target.value })}
                placeholder="e.g. Cotton Fabrics (HSN 5208), Stainless Steel Flanges (HSN 7307)"
                className="field-obsidian !py-2.5 text-xs sm:text-sm"
              />
            </div>

            {/* Field 2 & 3: Turnover & Shipment Under Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Approx. Yearly Export Turnover *
                </label>
                <select
                  value={formData.turnover}
                  onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                >
                  <option value="Under ₹1 Crore">Under ₹1 Crore</option>
                  <option value="₹1 Crore – ₹5 Crore">₹1 Crore – ₹5 Crore</option>
                  <option value="₹5 Crore – ₹25 Crore">₹5 Crore – ₹25 Crore</option>
                  <option value="₹25 Crore – ₹100 Crore">₹25 Crore – ₹100 Crore</option>
                  <option value="Above ₹100 Crore">Above ₹100 Crore</option>
                </select>
              </div>

              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Shipment Under *
                </label>
                <select
                  value={formData.shipmentType}
                  onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value })}
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                >
                  <option value="Under LUT">Under LUT (Letter of Undertaking)</option>
                  <option value="Under IGST">Under IGST (Tax Payment with Refund)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Loan / OD Facility Selector */}
            <div className="field">
              <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                Taking Any Loan for Export or OD / Packing Credit Facility? *
              </label>
              <select
                value={formData.hasExportLoan}
                onChange={(e) => setFormData({ ...formData, hasExportLoan: e.target.value })}
                className="field-obsidian !py-2.5 text-xs sm:text-sm"
              >
                <option value="Yes">Yes, Active Loan / OD (Eligible for 3% IES Subvention)</option>
                <option value="No">No / Self-Funded (Standard credit line)</option>
                <option value="Planning to Apply">Planning to Apply (Need bank sanction guidance)</option>
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                />
              </div>
              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. 98330 62670"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                />
              </div>
              <div className="field">
                <label className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Exports Pvt Ltd"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-xs text-rose-400">
                Unable to submit. Please call us directly at {SITE.phoneDisplay}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold-glow w-full py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                "Submitting for Evaluation…"
              ) : (
                <>
                  Submit for Expert Incentive Evaluation <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-theme-muted flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-500" /> Handled directly by DGFT consultants · Data privacy guaranteed
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
