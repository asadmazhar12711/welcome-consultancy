"use client";

import React, { useState, useId } from "react";

export default function EpcgEstimator() {
  const [machineryCost, setMachineryCost] = useState<number>(10000000);
  const [dutyRate, setDutyRate] = useState<number>(26.85);

  const costInputId = useId();
  const dutyInputId = useId();

  const dutySaved = (machineryCost * dutyRate) / 100;
  const exportObligation = dutySaved * 6;
  const annualObligation = exportObligation / 6;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const whatsappMessage = encodeURIComponent(
    `Hello Welcome Consultancy, I calculated my EPCG License savings. For capital goods worth ${formatCurrency(machineryCost)}, estimated duty saved is ${formatCurrency(dutySaved)} and 6-year Export Obligation is ${formatCurrency(exportObligation)}. Please assist with EPCG License issuance.`
  );

  return (
    <div className="bento-card p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-success">
            Capital Goods Exemption
          </span>
          <h3 className="text-xl font-bold tracking-tight text-theme-primary">
            EPCG Zero-Duty License Estimator
          </h3>
        </div>
        <div className="hidden items-center gap-1.5 rounded-none border border-subtle bg-fill px-3 py-1.5 text-xs font-mono text-success sm:flex">
          <span>Duty Saved: {dutyRate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={costInputId}
                className="text-xs font-semibold uppercase tracking-wider text-theme-secondary"
              >
                1. CIF Cost of Capital Goods / Machinery (INR)
              </label>
              <span className="text-sm font-mono font-bold text-gold-500">
                {formatCurrency(machineryCost)}
              </span>
            </div>
            <input
              id={costInputId}
              type="range"
              min={1000000}
              max={100000000}
              step={1000000}
              value={machineryCost}
              onChange={(e) => setMachineryCost(Number(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-none accent-gold-500"
              aria-valuemin={1000000}
              aria-valuemax={100000000}
              aria-valuenow={machineryCost}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-theme-faint">
              <span>₹10 Lakh</span>
              <span>₹5 Cr</span>
              <span>₹10 Cr+</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={dutyInputId}
                className="text-xs font-semibold uppercase tracking-wider text-theme-secondary"
              >
                2. Applicable Customs Duty + IGST Rate (%)
              </label>
              <span className="text-sm font-mono font-bold text-success">
                {dutyRate}%
              </span>
            </div>
            <input
              id={dutyInputId}
              type="range"
              min={10}
              max={40}
              step={0.5}
              value={dutyRate}
              onChange={(e) => setDutyRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-none accent-success"
              aria-valuemin={10}
              aria-valuemax={40}
              aria-valuenow={dutyRate}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-theme-faint">
              <span>10%</span>
              <span>26.85% (Avg BCD+IGST)</span>
              <span>40%</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-none border border-subtle bg-elevated p-6 shadow-theme-md">
            <span className="mb-1 block text-[11px] uppercase tracking-widest text-theme-muted">
              Total Customs Duty Exempted
            </span>
            <div className="mb-5 font-mono text-3xl font-extrabold tracking-tight text-success sm:text-4xl">
              {formatCurrency(dutySaved)}
            </div>

            <div className="mb-6 space-y-2.5 border-y border-subtle py-4 text-xs">
              <div className="flex justify-between text-theme-secondary">
                <span>6-Year Export Obligation (6x):</span>
                <span className="font-mono text-theme-primary">{formatCurrency(exportObligation)}</span>
              </div>
              <div className="flex justify-between text-theme-secondary">
                <span>Annual Export Target:</span>
                <span className="font-mono text-theme-secondary">{formatCurrency(annualObligation)}/yr</span>
              </div>
            </div>

            <a
              href={`https://wa.me/919867173397?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-glow block w-full rounded-none py-3 text-center text-sm"
            >
              Apply for 0% Duty EPCG License
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EpcgEstimator };
