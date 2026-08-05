"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Popup = {
  id: string;
  title: string;
  message: string;
  cta_label: string;
  cta_href: string;
  delay_seconds: number;
};

const DISMISS_KEY_PREFIX = "wc_popup_dismissed_";

export function SitePopup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    fetch("/api/popups")
      .then((res) => (res.ok ? (res.json() as Promise<{ popups?: Popup[] }>) : null))
      .then((data) => {
        if (!active || !data?.popups?.length) return;
        const candidate = data.popups.find(
          (p) => !sessionStorage.getItem(`${DISMISS_KEY_PREFIX}${p.id}`),
        );
        if (!candidate) return;
        setPopup(candidate);
        timer = setTimeout(() => setOpen(true), Math.max(0, candidate.delay_seconds) * 1000);
      })
      .catch(() => {
        /* fail silently — popups are non-critical */
      });

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  function close() {
    setOpen(false);
    if (popup) sessionStorage.setItem(`${DISMISS_KEY_PREFIX}${popup.id}`, "1");
  }

  if (!open || !popup) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-popup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <p className="eyebrow">Limited Availability</p>
            <h2 id="site-popup-title" style={{ fontSize: "1.25rem" }}>
              {popup.title}
            </h2>
          </div>
          <button type="button" className="modal-close" aria-label="Close popup" onClick={close}>
            ×
          </button>
        </div>
        <p className="muted" style={{ marginBottom: "1.25rem", fontSize: "0.95rem" }}>
          {popup.message}
        </p>
        <Link
          href={popup.cta_href}
          onClick={close}
          className="btn-gold-glow block w-full rounded-none py-3 px-8 text-center text-sm"
        >
          {popup.cta_label}
        </Link>
      </div>
    </div>
  );
}
