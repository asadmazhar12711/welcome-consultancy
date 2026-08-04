"use client";

import { FormEvent, useState } from "react";
import { SERVICES } from "@/lib/services";
import { isValidIndianMobile } from "@/lib/validation";

type Props = {
  defaultService?: string;
  source?: string;
  compact?: boolean;
};

export function InquiryForm({
  defaultService = "",
  source = "Website Contact Form",
  compact = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required.";
    if (!isValidIndianMobile(mobile)) {
      nextErrors.mobile = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!service) nextErrors.service = "Select a service.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("err");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          email,
          company,
          service,
          source,
          details,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error ?? "Unable to submit inquiry.");
        return;
      }
      setStatus("ok");
      setMessage("Thank you. Our DGFT advisor will call you shortly.");
      event.currentTarget.reset();
    } catch (err) {
      console.error("Inquiry submit failed", err);
      setStatus("err");
      setMessage("Network error. Please try WhatsApp or call us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="inq-name">Full Name *</label>
          <input id="inq-name" name="name" autoComplete="name" required />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="inq-mobile">Mobile Number *</label>
          <input
            id="inq-mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile"
            required
          />
          {errors.mobile ? <span className="field-error">{errors.mobile}</span> : null}
        </div>
        {!compact ? (
          <>
            <div className="field">
              <label htmlFor="inq-email">Email</label>
              <input id="inq-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="inq-company">Company</label>
              <input id="inq-company" name="company" autoComplete="organization" />
            </div>
          </>
        ) : null}
        <div className="field" style={compact ? undefined : { gridColumn: "1 / -1" }}>
          <label htmlFor="inq-service">Service Required *</label>
          <select id="inq-service" name="service" defaultValue={defaultService} required>
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="general-consultation">General Trade Consultation</option>
          </select>
          {errors.service ? <span className="field-error">{errors.service}</span> : null}
        </div>
        {!compact ? (
          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="inq-details">Requirement Details</label>
            <textarea id="inq-details" name="details" rows={4} />
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: "1rem", width: "100%" }}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Submit Inquiry"}
      </button>
      {message ? (
        <p className={`form-status ${status === "ok" ? "ok" : "err"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
