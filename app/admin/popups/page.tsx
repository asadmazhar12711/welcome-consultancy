"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type PopupRow = {
  id: string;
  title: string;
  message: string;
  cta_label: string;
  cta_href: string;
  is_active: number;
  delay_seconds: number;
  created_at: string;
};

export default function PopupsPage() {
  const [popups, setPopups] = useState<PopupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Schedule Free Meeting");
  const [ctaHref, setCtaHref] = useState("/#book-a-meeting");
  const [delaySeconds, setDelaySeconds] = useState(20);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/popups?all=1", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { popups: PopupRow[] };
      setPopups(data.popups ?? []);
    } catch {
      setError("Couldn't load popups. Confirm you're signed in and D1 is bound.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createPopup() {
    if (!title.trim() || !message.trim()) {
      setError("Title and message are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/popups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message, ctaLabel, ctaHref, delaySeconds, isActive: true }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to create popup.");
      }
      setTitle("");
      setMessage("");
      setCtaLabel("Schedule Free Meeting");
      setCtaHref("/#book-a-meeting");
      setDelaySeconds(20);
      setShowForm(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create popup.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(popup: PopupRow) {
    setBusyId(popup.id);
    try {
      const res = await fetch(`/api/popups/${popup.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: popup.is_active !== 1 }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Failed to update popup.");
    } finally {
      setBusyId(null);
    }
  }

  async function deletePopup(popup: PopupRow) {
    if (!window.confirm(`Delete "${popup.title}"?`)) return;
    setBusyId(popup.id);
    try {
      const res = await fetch(`/api/popups/${popup.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Failed to delete popup.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Popups</h1>
          <p className="mt-1 text-theme-secondary">
            Site-wide announcement popups — e.g. "Schedule Free Meeting". Only one active popup
            shows per visit.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "New Popup"}
        </Button>
      </div>

      {error ? <p className="status-err">{error}</p> : null}

      {showForm ? (
        <BentoCard className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="field md:col-span-2">
              <label htmlFor="popup-title">Title</label>
              <input
                id="popup-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Get a Free 1-on-1 Consultation"
                maxLength={120}
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="popup-message">Message</label>
              <textarea
                id="popup-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={400}
                placeholder="A short, persuasive line shown in the popup body."
              />
            </div>
            <div className="field">
              <label htmlFor="popup-cta-label">Button Label</label>
              <input
                id="popup-cta-label"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                maxLength={60}
              />
            </div>
            <div className="field">
              <label htmlFor="popup-cta-href">Button Link</label>
              <input
                id="popup-cta-href"
                value={ctaHref}
                onChange={(e) => setCtaHref(e.target.value)}
                placeholder="/#book-a-meeting or /contact-us"
                maxLength={200}
              />
            </div>
            <div className="field">
              <label htmlFor="popup-delay">Show After (seconds)</label>
              <input
                id="popup-delay"
                type="number"
                min={0}
                value={delaySeconds}
                onChange={(e) => setDelaySeconds(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="mt-6 border-t border-subtle pt-6">
            <Button disabled={saving} onClick={createPopup}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Create &amp; activate
            </Button>
          </div>
        </BentoCard>
      ) : null}

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">Title</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">CTA</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Delay</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Status</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" /> Loading popups…
                  </td>
                </tr>
              ) : popups.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    No popups yet. Create one above.
                  </td>
                </tr>
              ) : (
                popups.map((popup) => (
                  <tr key={popup.id} className="transition-colors hover:bg-fill-hover">
                    <td className="px-6 py-4">
                      <p className="font-medium text-theme-primary">{popup.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-theme-faint">{popup.message}</p>
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">
                      {popup.cta_label}
                      <span className="mt-0.5 block text-xs text-theme-faint">{popup.cta_href}</span>
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">{popup.delay_seconds}s</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        disabled={busyId === popup.id}
                        onClick={() => toggleActive(popup)}
                        className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold transition-colors ${
                          popup.is_active === 1
                            ? "border-gold bg-gold-muted text-gold-500"
                            : "border-subtle bg-fill text-theme-muted"
                        }`}
                      >
                        {popup.is_active === 1 ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busyId === popup.id}
                        onClick={() => deletePopup(popup)}
                        aria-label={`Delete ${popup.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-error" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
}
