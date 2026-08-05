"use client";

import React, { useEffect, useMemo, useState, useId } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { isValidIndianMobile } from "@/lib/validation";

type SlotConfig = {
  workingDays: string[];
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
};

type BookedSlot = {
  booking_date: string;
  booking_time: string;
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TOPICS = [
  "IEC / RoDTEP Advisory",
  "EPCG / Advance License",
  "AD Code & ICEGATE Support",
  "AEO Tier Certification",
  "Urgent Customs Notice Resolution",
];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minutesToLabel(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function defaultDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function BookingCalendar() {
  const [config, setConfig] = useState<SlotConfig | null>(null);
  const [booked, setBooked] = useState<BookedSlot[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(defaultDate());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [serviceTopic, setServiceTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const nameInputId = useId();
  const phoneInputId = useId();
  const dateInputId = useId();
  const topicInputId = useId();
  const slotsGroupId = useId();

  useEffect(() => {
    let active = true;
    fetch("/api/slots", { cache: "no-store" })
      .then((res) =>
        res.ok
          ? (res.json() as Promise<{ config?: SlotConfig; bookings?: BookedSlot[] }>)
          : null,
      )
      .then((data) => {
        if (!active || !data) return;
        if (data.config) setConfig(data.config);
        if (data.bookings) setBooked(data.bookings);
      })
      .catch(() => {
        /* keep defaults; form still degrades to WhatsApp-only guidance */
      })
      .finally(() => {
        if (active) setLoadingConfig(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const dayName = useMemo(() => {
    const d = new Date(`${selectedDate}T12:00:00`);
    return DAY_NAMES[d.getDay()];
  }, [selectedDate]);

  const isWorkingDay = !config || config.workingDays.includes(dayName);

  const availableSlots = useMemo(() => {
    if (!config) return [];
    const start = toMinutes(config.startTime);
    const end = toMinutes(config.endTime);
    const step = config.slotDurationMinutes;
    const slots: { time: string; label: string; taken: boolean }[] = [];
    for (let m = start; m + step <= end; m += step) {
      const hh = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      const time = `${hh}:${mm}`;
      const taken = booked.some(
        (b) => b.booking_date === selectedDate && b.booking_time === time,
      );
      slots.push({ time, label: minutesToLabel(m), taken });
    }
    return slots;
  }, [config, booked, selectedDate]);

  useEffect(() => {
    if (!selectedTime && availableSlots.length) {
      const firstOpen = availableSlots.find((s) => !s.taken);
      if (firstOpen) setSelectedTime(firstOpen.time);
    }
  }, [availableSlots, selectedTime]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!clientName.trim() || !isValidIndianMobile(clientPhone)) {
      setStatus("err");
      setMessage("Enter your name and a valid 10-digit mobile number.");
      return;
    }
    if (!selectedTime) {
      setStatus("err");
      setMessage("Select an available time slot.");
      return;
    }

    try {
      const res = await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          clientName,
          mobile: clientPhone,
          service: serviceTopic,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "Unable to complete booking.");
        if (res.status === 409) {
          setBooked((prev) => [...prev, { booking_date: selectedDate, booking_time: selectedTime }]);
          setSelectedTime("");
        }
        return;
      }
      setStatus("ok");
      setMessage("Booked! Our desk will confirm shortly. Add it to your calendar now.");
      setBooked((prev) => [...prev, { booking_date: selectedDate, booking_time: selectedTime }]);
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again or WhatsApp us directly.");
    }
  }

  const selectedLabel =
    availableSlots.find((s) => s.time === selectedTime)?.label || "Select a slot";

  if (status === "ok") {
    return (
      <div className="bento-card flex flex-col items-center justify-center p-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none border border-success bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-theme-primary">Appointment Confirmed</h3>
        <p className="mt-2 max-w-sm text-sm text-theme-secondary">{message}</p>
        <p className="mt-4 text-sm font-semibold text-theme-primary">
          {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          at <span className="text-gold-500">{selectedLabel}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bento-card p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gold-500">
            Direct Expert Advisory
          </span>
          <h3 className="text-xl font-bold tracking-tight text-theme-primary">
            Schedule 1-on-1 DGFT Consultation
          </h3>
        </div>
        <div className="hidden items-center gap-1.5 rounded-none border border-gold bg-gold-muted px-3 py-1.5 text-xs font-mono text-gold-500 sm:flex">
          <span>Free · No obligation</span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-6">
            <div className="field">
              <label htmlFor={dateInputId}>1. Select Preferred Consultation Date</label>
              <input
                id={dateInputId}
                type="date"
                min={defaultDate()}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
                className="field-obsidian"
              />
              {!isWorkingDay ? (
                <span className="field-error">
                  We're closed that day. Working days:{" "}
                  {config?.workingDays.join(", ")}
                </span>
              ) : null}
            </div>

            <div>
              <span
                id={slotsGroupId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-theme-secondary"
              >
                2. Select Available Time Slot (IST)
              </span>
              {loadingConfig ? (
                <div className="flex items-center gap-2 py-4 text-sm text-theme-muted">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading live availability…
                </div>
              ) : !isWorkingDay || availableSlots.length === 0 ? (
                <p className="py-2 text-sm text-theme-muted">
                  No slots available for this date. Try another date.
                </p>
              ) : (
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                  role="group"
                  aria-labelledby={slotsGroupId}
                >
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.taken}
                      onClick={() => setSelectedTime(slot.time)}
                      aria-pressed={selectedTime === slot.time}
                      className={`rounded-none border px-3 py-2.5 text-left text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                        slot.taken
                          ? "cursor-not-allowed border-subtle bg-fill text-theme-faint line-through opacity-50"
                          : selectedTime === slot.time
                            ? "border-gold-fill bg-gold-muted text-theme-primary shadow-gold"
                            : "border-subtle bg-fill text-theme-muted hover:border-elevated hover:bg-fill-hover hover:text-theme-primary"
                      }`}
                    >
                      {slot.label}
                      {slot.taken ? " · Booked" : ""}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5 lg:col-span-6">
            <div className="field">
              <label htmlFor={nameInputId}>3. Your Name / Company Name</label>
              <input
                id={nameInputId}
                type="text"
                placeholder="e.g. Rajesh Kumar (Apex Exports)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="field-obsidian"
                required
              />
            </div>

            <div className="field">
              <label htmlFor={phoneInputId}>4. Mobile Number (for confirmation)</label>
              <input
                id={phoneInputId}
                type="tel"
                inputMode="numeric"
                placeholder="e.g. 98765 43210"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="field-obsidian"
                required
              />
            </div>

            <div className="field">
              <label htmlFor={topicInputId}>5. Consultation Topic</label>
              <select
                id={topicInputId}
                value={serviceTopic}
                onChange={(e) => setServiceTopic(e.target.value)}
                className="field-obsidian"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-subtle pt-6 sm:flex-row">
          <p className="text-xs text-theme-secondary">
            Selected Slot:{" "}
            <span className="font-semibold text-theme-primary">{selectedDate}</span> at{" "}
            <span className="font-semibold text-gold-500">{selectedLabel}</span>
          </p>

          <button
            type="submit"
            disabled={status === "loading" || !isWorkingDay || !selectedTime}
            className="btn-gold-glow block w-full rounded-none py-3 px-8 text-center text-sm disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {status === "loading" ? "Booking…" : "Confirm Appointment"}
          </button>
        </div>
        {message && status === "err" ? (
          <p className="status-err mt-3" role="status">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

export { BookingCalendar };
