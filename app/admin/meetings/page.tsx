"use client";

import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type SlotBooking = {
  id: string;
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_mobile: string;
  service_topic: string | null;
  status: string;
  created_at: string;
};

type SlotConfig = {
  workingDays: string[];
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
};

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MeetingsPage() {
  const [bookings, setBookings] = useState<SlotBooking[]>([]);
  const [config, setConfig] = useState<SlotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/slots", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { config: SlotConfig; bookings: SlotBooking[] };
      setConfig(data.config);
      setBookings(data.bookings ?? []);
    } catch {
      setError("Couldn't load meeting data. Confirm you're signed in and D1 is bound.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function cancelBooking(id: string) {
    if (!window.confirm("Cancel this booking?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/slots?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError("Failed to cancel booking.");
    } finally {
      setBusyId(null);
    }
  }

  function toggleDay(day: string) {
    if (!config) return;
    const has = config.workingDays.includes(day);
    setConfig({
      ...config,
      workingDays: has
        ? config.workingDays.filter((d) => d !== day)
        : [...config.workingDays, day],
    });
  }

  async function saveConfig() {
    if (!config) return;
    setSavingConfig(true);
    setError("");
    try {
      const res = await fetch("/api/slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { config: SlotConfig };
      setConfig(data.config);
    } catch {
      setError("Failed to save availability configuration.");
    } finally {
      setSavingConfig(false);
    }
  }

  const upcoming = bookings
    .filter((b) => b.status !== "Cancelled")
    .slice()
    .sort((a, b) => `${a.booking_date}${a.booking_time}`.localeCompare(`${b.booking_date}${b.booking_time}`));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Meeting Schedule</h1>
          <p className="mt-1 text-theme-secondary">
            Manage your availability and see every consultation booked from the site.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      {error ? <p className="status-err">{error}</p> : null}

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <BentoCard className="flex h-full flex-col">
          <h3 className="mb-6 text-lg font-semibold text-theme-primary">
            Upcoming Consultations ({upcoming.length})
          </h3>
          <div className="flex min-h-[16rem] max-h-[26rem] flex-1 flex-col overflow-y-auto">
            {loading ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-theme-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading…</span>
              </div>
            ) : upcoming.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="max-w-[18rem] text-sm text-theme-muted">
                  No bookings yet. They'll appear the moment a visitor books a slot.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between gap-3 rounded-none border border-subtle bg-fill p-4 transition-colors hover:border-elevated hover:bg-fill-hover"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-theme-primary">
                        {b.service_topic || "Consultation"}
                      </p>
                      <p className="truncate text-sm text-theme-secondary">
                        {b.client_name} ·{" "}
                        <a href={`tel:${b.client_mobile}`} className="hover:text-gold-500">
                          {b.client_mobile}
                        </a>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-theme-primary">
                          {new Date(`${b.booking_date}T12:00:00`).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-sm text-gold-500">{b.booking_time}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => cancelBooking(b.id)}
                        disabled={busyId === b.id}
                        aria-label="Cancel booking"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-subtle text-theme-muted transition-colors hover:border-error hover:text-error"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </BentoCard>

        <BentoCard className="flex h-full flex-col">
          <h3 className="mb-6 text-lg font-semibold text-theme-primary">Availability Config</h3>
          {!config ? (
            <div className="flex min-h-[16rem] flex-1 flex-col items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-theme-muted" />
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-theme-secondary">
                    Working Days
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map((day) => {
                      const active = config.workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`flex h-9 w-16 items-center justify-center rounded-none border text-xs font-semibold transition-colors ${
                            active
                              ? "border-gold bg-gold-muted text-gold-500"
                              : "border-subtle bg-fill text-theme-muted hover:text-theme-primary"
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="field">
                    <label htmlFor="cfg-start">Start Time</label>
                    <input
                      id="cfg-start"
                      type="time"
                      value={config.startTime}
                      onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cfg-end">End Time</label>
                    <input
                      id="cfg-end"
                      type="time"
                      value={config.endTime}
                      onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="cfg-duration">Slot Duration (minutes)</label>
                  <select
                    id="cfg-duration"
                    value={config.slotDurationMinutes}
                    onChange={(e) =>
                      setConfig({ ...config, slotDurationMinutes: Number(e.target.value) })
                    }
                  >
                    {[15, 30, 45, 60].map((m) => (
                      <option key={m} value={m}>
                        {m} minutes
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 border-t border-subtle pt-6">
                <Button onClick={saveConfig} disabled={savingConfig} className="w-full">
                  {savingConfig ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save Availability
                </Button>
              </div>
            </div>
          )}
        </BentoCard>
      </div>
    </div>
  );
}
