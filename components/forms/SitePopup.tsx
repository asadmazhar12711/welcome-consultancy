"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, DollarSign, ShieldCheck, Tag, Users, X } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

const POPUP_DISMISS_KEY = "wc_scrip_popup_dismissed_v1";

export function SitePopup() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<"buyer" | "supplier">("supplier");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    company: "",
    scripValue: "",
    notes: "",
  });

  useEffect(() => {
    // Check if previously dismissed in this session
    if (typeof window !== "undefined" && sessionStorage.getItem(POPUP_DISMISS_KEY)) {
      return;
    }

    // Auto-open after 2 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);

    // Listen for custom trigger event so any button on the site can open it
    const handleTrigger = (e: CustomEvent<{ role?: "buyer" | "supplier" }>) => {
      if (e.detail?.role) {
        setRole(e.detail.role);
      }
      setOpen(true);
    };

    window.addEventListener("open-scrip-popup" as never, handleTrigger);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-scrip-popup" as never, handleTrigger);
    };
  }, []);

  function close() {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(POPUP_DISMISS_KEY, "1");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const leadSource =
        role === "buyer"
          ? "RoDTEP/RoSCTL Scrip Desk - Buyer"
          : "RoDTEP/RoSCTL Scrip Desk - Supplier";

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || (role === "buyer" ? "Scrip Buyer" : "Scrip Seller"),
          mobile: formData.mobile,
          company: formData.company,
          service: "sale-purchase-duty-credit-scrips",
          source: leadSource,
          details: `Role: ${role.toUpperCase()} | Approx Scrip Value: ${formData.scripValue || "Not specified"} | Notes: ${formData.notes || "None"}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="modal-backdrop z-[200] p-3 sm:p-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scrip-popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal max-w-lg w-full max-h-[90dvh] rounded-none border border-gold/40 bg-elevated shadow-2xl relative animate-modal flex flex-col overflow-hidden"
        style={{
          boxShadow: "0 0 50px rgba(212, 175, 55, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Fixed Header: Title, Close, and Dual Role Buttons */}
        <div className="p-4 sm:p-6 pb-3 border-b border-subtle bg-elevated shrink-0 relative">
          <button
            type="button"
            className="absolute right-3 top-3 text-theme-muted hover:text-theme-primary p-2 transition-colors z-10"
            aria-label="Close popup"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-8">
            <span className="pill-tag inline-flex items-center gap-1.5 mb-1.5 !border-gold/50 !bg-gold-muted !text-gold-500 font-bold text-[10px]">
              <Tag className="h-3 w-3" /> Duty Credit Scrip Desk
            </span>
            <h2
              id="scrip-popup-title"
              className="font-display text-lg sm:text-2xl font-bold tracking-tight text-theme-primary leading-tight"
            >
              Sell / Purchase of RoDTEP & RoSCTL Scrips
            </h2>
          </div>

          {/* Dual Role Selector Buttons: FIXED AT TOP */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => setRole("supplier")}
              className={`h-11 px-3 text-xs sm:text-sm font-extrabold transition-all border text-center flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                role === "supplier"
                  ? "bg-gold-fill text-theme-on-gold border-gold shadow-gold"
                  : "border-subtle bg-surface text-theme-secondary hover:border-gold/50 hover:text-theme-primary"
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>I Want to Sell</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`h-11 px-3 text-xs sm:text-sm font-extrabold transition-all border text-center flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                role === "buyer"
                  ? "bg-gold-fill text-theme-on-gold border-gold shadow-gold"
                  : "border-subtle bg-surface text-theme-secondary hover:border-gold/50 hover:text-theme-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>I Want to Buy</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        {status === "sent" ? (
          <div className="p-6 text-center space-y-4 overflow-y-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-theme-primary">
              Requirement Received Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-theme-muted max-w-sm mx-auto">
              Our Scrip Desk team will verify current market premium rates and contact you on{" "}
              <strong className="text-gold-500">{formData.mobile}</strong> within 15–30 minutes.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappUrl(
                  `Hello Welcome Consultancy, I am looking to ${role === "buyer" ? "BUY" : "SELL"} RoDTEP/RoSCTL scrips. My mobile is ${formData.mobile}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-glow w-full sm:w-auto px-6 py-2.5 text-xs font-extrabold"
              >
                Chat on WhatsApp Now
              </a>
              <button
                type="button"
                onClick={close}
                className="text-xs font-semibold text-theme-muted hover:text-theme-primary py-2"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            {/* Scrollable Middle Body: Form Input Fields ONLY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5" style={{ scrollbarWidth: "thin" }}>
              <p className="text-[11px] sm:text-xs text-theme-muted">
                {role === "supplier"
                  ? "Get instant RTGS liquidity for unused duty credit scrips. Same-day ICEGATE transfer."
                  : "Direct 2% to 4% discount savings on Basic Customs Duty (BCD) on upcoming imported shipments."}
              </p>

              <div className="field">
                <label className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                  inputMode="numeric"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="field">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contact person"
                    className="field-obsidian !py-2.5 text-xs sm:text-sm"
                  />
                </div>

                <div className="field">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary">
                    Company / Firm Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="field-obsidian !py-2.5 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="field">
                <label className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary">
                  Approx Scrip Value (₹)
                </label>
                <input
                  type="text"
                  value={formData.scripValue}
                  onChange={(e) => setFormData({ ...formData, scripValue: e.target.value })}
                  placeholder="e.g. ₹5 Lakhs, ₹25 Lakhs, ₹1 Crore"
                  className="field-obsidian !py-2.5 text-xs sm:text-sm"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-rose-400">
                  Submission failed. Please call us directly at {SITE.phoneDisplay}.
                </p>
              )}
            </div>

            {/* Fixed Footer: Submit Button PINNED TO BOTTOM */}
            <div className="p-4 sm:p-6 pt-3 border-t border-subtle bg-elevated shrink-0 space-y-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold-glow w-full py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  "Connecting to Desk…"
                ) : (
                  <>
                    {role === "supplier" ? "Get Best Seller Rate" : "Get Best Buyer Quote"}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-theme-faint flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-gold-500" /> 100% ICEGATE Verified · No Intermediary Risk
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
