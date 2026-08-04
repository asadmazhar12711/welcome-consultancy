"use client";

import { FormEvent, useEffect, useState } from "react";
import { isValidIndianMobile } from "@/lib/validation";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (shown) return;

    const timer = window.setTimeout(() => {
      if (!shown) {
        setOpen(true);
        setShown(true);
      }
    }, 45000);

    function onMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    }

    document.addEventListener("mouseout", onMouseLeave);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseLeave);
    };
  }, [shown]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();

    if (!name || !isValidIndianMobile(mobile)) {
      setStatus("err");
      setMessage("Enter name and a valid 10-digit mobile.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          service: "quick-callback",
          source: "Exit-Intent Popup",
          details: "Requested quick callback from exit-intent modal.",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error ?? "Callback request failed.");
        return;
      }
      setStatus("ok");
      setMessage("Callback requested. We will ring you shortly.");
      window.setTimeout(() => setOpen(false), 1600);
    } catch (err) {
      console.error("Exit-intent submit failed", err);
      setStatus("err");
      setMessage("Network error. Please call +91 98671 73397.");
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="exit-title">
      <div className="modal">
        <div className="modal-head">
          <div>
            <p className="eyebrow">Quick Callback</p>
            <h2 id="exit-title" style={{ fontSize: "1.25rem" }}>
              Need DGFT help before you leave?
            </h2>
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Close popup"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <p className="muted" style={{ marginBottom: "1rem", fontSize: "0.95rem" }}>
          Share your mobile number — a Welcome Consultancy advisor will call within business hours.
        </p>
        <form onSubmit={onSubmit}>
          <div className="field" style={{ marginBottom: "0.75rem" }}>
            <label htmlFor="exit-name">Name *</label>
            <input id="exit-name" name="name" required autoComplete="name" />
          </div>
          <div className="field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="exit-mobile">Mobile *</label>
            <input
              id="exit-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              required
              autoComplete="tel"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Request Callback"}
          </button>
          {message ? (
            <p className={`form-status ${status === "ok" ? "ok" : "err"}`} role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
