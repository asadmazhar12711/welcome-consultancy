"use client";

import React, { useState, useId } from "react";

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("2026-07-30");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM – 11:30 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [serviceTopic, setServiceTopic] = useState<string>("IEC / RoDTEP Advisory");

  const nameInputId = useId();
  const phoneInputId = useId();
  const dateInputId = useId();
  const topicInputId = useId();
  const slotsGroupId = useId();

  const availableSlots = [
    "10:00 AM – 10:30 AM",
    "11:00 AM – 11:30 AM",
    "02:00 PM – 02:30 PM",
    "04:00 PM – 04:30 PM",
    "05:30 PM – 06:00 PM",
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello Welcome Consultancy, I would like to book an expert DGFT consultation slot.\n- Date: ${selectedDate}\n- Slot: ${selectedSlot}\n- Topic: ${serviceTopic}\n- Name: ${clientName || "Exporter"}\n- Mobile: ${clientPhone || "Provided on Chat"}\nPlease confirm appointment.`
  );

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
        <div className="hidden items-center gap-1.5 rounded-full border border-gold bg-gold-muted px-3 py-1.5 text-xs font-mono text-gold-500 sm:flex">
          <span>Priority Booking</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-6">
          <div className="field">
            <label htmlFor={dateInputId}>1. Select Preferred Consultation Date</label>
            <input
              id={dateInputId}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="field-obsidian"
            />
          </div>

          <div>
            <span
              id={slotsGroupId}
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-theme-secondary"
            >
              2. Select Available Time Slot (IST)
            </span>
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              role="group"
              aria-labelledby={slotsGroupId}
            >
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  aria-pressed={selectedSlot === slot}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    selectedSlot === slot
                      ? "border-gold-fill bg-gold-muted text-theme-primary shadow-gold"
                      : "border-subtle bg-fill text-theme-muted hover:border-elevated hover:bg-fill-hover hover:text-theme-primary"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
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
            />
          </div>

          <div className="field">
            <label htmlFor={phoneInputId}>4. Mobile Number (for Instant WhatsApp Confirmation)</label>
            <input
              id={phoneInputId}
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="field-obsidian"
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
              <option value="IEC / RoDTEP Advisory">IEC / RoDTEP Advisory</option>
              <option value="EPCG / Advance License">EPCG / Advance License</option>
              <option value="AD Code & ICEGATE Support">AD Code &amp; ICEGATE Support</option>
              <option value="AEO Tier Certification">AEO Tier Certification</option>
              <option value="Urgent Customs Notice Resolution">Urgent Customs Notice Resolution</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-subtle pt-6 sm:flex-row">
        <p className="text-xs text-theme-secondary">
          Selected Slot:{" "}
          <span className="font-semibold text-theme-primary">{selectedDate}</span> at{" "}
          <span className="font-semibold text-gold-500">{selectedSlot}</span>
        </p>

        <a
          href={`https://wa.me/919867173397?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-glow block w-full rounded-full py-3 px-8 text-center text-sm sm:w-auto"
        >
          Confirm Appointment on WhatsApp
        </a>
      </div>
    </div>
  );
}

export { BookingCalendar };
