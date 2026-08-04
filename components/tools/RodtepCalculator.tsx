"use client";

import React, { useState, useId } from "react";

interface SectorRate {
  id: string;
  name: string;
  rate: number;
  capPerKg: number | null;
}

const SECTOR_RATES: SectorRate[] = [
  { id: "textiles", name: "Textiles & Garments (Ch. 61–63)", rate: 4.3, capPerKg: null },
  { id: "chemicals", name: "Specialty Chemicals (Ch. 28–38)", rate: 1.2, capPerKg: null },
  { id: "auto", name: "Automotive Components (Ch. 87)", rate: 2.0, capPerKg: null },
  { id: "leather", name: "Leather & Footwear (Ch. 64)", rate: 3.1, capPerKg: null },
  { id: "engineering", name: "Engineering Goods (Ch. 72–84)", rate: 1.5, capPerKg: null },
  { id: "pharma", name: "Pharmaceutical Products (Ch. 30)", rate: 0.8, capPerKg: null },
  { id: "agri", name: "Agricultural & Food Processing (Ch. 02–21)", rate: 2.5, capPerKg: null },
];

export default function RodtepCalculator() {
  const [fobValue, setFobValue] = useState<number>(5000000);
  const [sectorId, setSectorId] = useState<string>("textiles");
  const [exportFrequency, setExportFrequency] = useState<string>("monthly");

  const fobInputId = useId();
  const sectorInputId = useId();
  const frequencyInputId = useId();

  const selectedSector = SECTOR_RATES.find((s) => s.id === sectorId) || SECTOR_RATES[0];

  const singleExportIncentive = (fobValue * selectedSector.rate) / 100;
  const annualIncentive =
    exportFrequency === "monthly"
      ? singleExportIncentive * 12
      : exportFrequency === "quarterly"
      ? singleExportIncentive * 4
      : singleExportIncentive;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const whatsappMessage = encodeURIComponent(
    `Hello Welcome Consultancy, I tested the RoDTEP Calculator for the ${selectedSector.name} sector. My FOB value is ${formatCurrency(fobValue)} (${exportFrequency}) and estimated annual refund is ${formatCurrency(annualIncentive)}. I would like professional assistance to claim my RoDTEP scrips.`
  );

  return (
    <div className="bento-card p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-metric">
            DGFT Scrip Estimator
          </span>
          <h3 className="text-xl font-bold tracking-tight text-theme-primary">
            RoDTEP Incentive Refund Calculator
          </h3>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-subtle bg-fill px-3 py-1.5 text-xs font-mono text-metric sm:flex">
          <span>Rate: {selectedSector.rate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="field">
            <label htmlFor={sectorInputId}>1. Select Product / Chapter Sector</label>
            <select
              id={sectorInputId}
              value={sectorId}
              onChange={(e) => setSectorId(e.target.value)}
              className="field-obsidian"
            >
              {SECTOR_RATES.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.name} ({sec.rate}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={fobInputId}
                className="text-xs font-semibold uppercase tracking-wider text-theme-secondary"
              >
                2. Shipment FOB Value (INR)
              </label>
              <span className="text-sm font-mono font-bold text-gold-500">
                {formatCurrency(fobValue)}
              </span>
            </div>
            <input
              id={fobInputId}
              type="range"
              min={500000}
              max={50000000}
              step={250000}
              value={fobValue}
              onChange={(e) => setFobValue(Number(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-lg accent-gold-500"
              aria-valuemin={500000}
              aria-valuemax={50000000}
              aria-valuenow={fobValue}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-theme-faint">
              <span>₹5 Lakh</span>
              <span>₹2.5 Cr</span>
              <span>₹5 Cr+</span>
            </div>
          </div>

          <div>
            <span
              id={frequencyInputId}
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-theme-secondary"
            >
              3. Export Shipment Frequency
            </span>
            <div
              className="grid grid-cols-3 gap-2"
              role="group"
              aria-labelledby={frequencyInputId}
            >
              {[
                { id: "monthly", label: "Monthly" },
                { id: "quarterly", label: "Quarterly" },
                { id: "annual", label: "Single / Annual" },
              ].map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setExportFrequency(freq.id)}
                  aria-pressed={exportFrequency === freq.id}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    exportFrequency === freq.id
                      ? "border-gold-fill bg-gold-muted text-gold-500 shadow-gold"
                      : "border-subtle bg-fill text-theme-muted hover:border-elevated hover:bg-fill-hover hover:text-theme-primary"
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-subtle bg-elevated p-6 shadow-theme-md">
            <span className="mb-1 block text-[11px] uppercase tracking-widest text-theme-muted">
              Estimated Annual Scrip Refund
            </span>
            <div className="mb-5 font-mono text-3xl font-extrabold tracking-tight text-metric sm:text-4xl">
              {formatCurrency(annualIncentive)}
            </div>

            <div className="mb-6 space-y-2.5 border-y border-subtle py-4 text-xs">
              <div className="flex justify-between text-theme-secondary">
                <span>Per-Shipment Refund:</span>
                <span className="font-mono text-theme-primary">{formatCurrency(singleExportIncentive)}</span>
              </div>
              <div className="flex justify-between text-theme-secondary">
                <span>RoDTEP Chapter Rate:</span>
                <span className="font-mono text-metric">{selectedSector.rate}% FOB</span>
              </div>
            </div>

            <a
              href={`https://wa.me/919867173397?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-glow block w-full rounded-xl py-3 text-center text-sm"
            >
              Claim RoDTEP Scrips via Advisory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RodtepCalculator };
