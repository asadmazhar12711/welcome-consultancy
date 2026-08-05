"use client";

import { useState, type FormEvent } from "react";
import { isValidIndianMobile } from "@/lib/validation";

type Props = {
  source: string;
  service: string;
  details: string;
  whatsappHref: string;
  ctaLabel: string;
};

export function LeadCaptureInline({ source, service, details, whatsappHref, ctaLabel }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !isValidIndianMobile(mobile)) {
      setStatus("err");
      setMessage("Enter your name and a valid 10-digit mobile number.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, service, source, details }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "Unable to submit. Please try WhatsApp directly.");
        return;
      }
      setStatus("ok");
      setMessage("Sent to our advisory desk — opening WhatsApp.");
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("err");
      setMessage("Network error. Please try WhatsApp directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field-obsidian"
          aria-label="Your name"
          required
        />
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="field-obsidian"
          aria-label="Mobile number"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold-glow block w-full rounded-none py-3 text-center text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : ctaLabel}
      </button>
      {message ? (
        <p className={`form-status ${status === "ok" ? "ok" : "err"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
