"use client";

import React, { useState } from "react";
import { LeadCaptureInline } from "@/components/forms/LeadCaptureInline";

interface DocItem {
  id: string;
  name: string;
  category: "mandatory" | "licensing" | "customs";
  description: string;
}

const DOCUMENT_ITEMS: DocItem[] = [
  {
    id: "iec",
    name: "IEC Code Certificate (DGFT)",
    category: "mandatory",
    description: "Importer-Exporter Code issued by DGFT; mandatory for all cross-border transactions.",
  },
  {
    id: "rcmc",
    name: "RCMC Certificate (Export Promotion Council)",
    category: "mandatory",
    description: "Required to claim RoDTEP, Duty Drawback, or export incentive scrips.",
  },
  {
    id: "adcode",
    name: "AD Code & IFS Customs Registration",
    category: "customs",
    description: "Authorized Dealer Code registered at port ICEGATE for foreign exchange remittance.",
  },
  {
    id: "dsc",
    name: "Class 3 Digital Signature Certificate (DSC)",
    category: "mandatory",
    description: "Encrypted token required for signing DGFT portal applications and ICEGATE filings.",
  },
  {
    id: "coo",
    name: "Certificate of Origin (Preferential / Non-Preferential)",
    category: "customs",
    description: "Required by importing nation customs for tariff concessions under FTAs/CEPA.",
  },
  {
    id: "epcg",
    name: "EPCG / Advance License Authorization",
    category: "licensing",
    description: "Duty exemption license for capital goods or raw material import without duty.",
  },
];

export default function ChecklistGenerator() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([
    "iec",
    "rcmc",
    "adcode",
    "dsc",
  ]);

  const toggleDoc = (id: string) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((item) => item !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const selectedCount = selectedDocs.length;
  const totalCount = DOCUMENT_ITEMS.length;
  const progressPercent = Math.round((selectedCount / totalCount) * 100);

  const selectedNames = DOCUMENT_ITEMS.filter((d) =>
    selectedDocs.includes(d.id)
  ).map((d) => d.name);

  const whatsappMessage = encodeURIComponent(
    `Hello Welcome Consultancy, I generated an EXIM Compliance Document Checklist on your portal (${selectedCount}/${totalCount} items selected:\n- ${selectedNames.join(
      "\n- "
    )}).\nI need advisory support to complete my DGFT and ICEGATE documentation.`
  );

  return (
    <div className="bento-card p-6 sm:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gold-500">
            DGFT &amp; Customs Readiness
          </span>
          <h3 className="text-xl font-bold tracking-tight text-theme-primary">
            EXIM Compliance Document Checklist Generator
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-3 w-32 overflow-hidden rounded-none border border-subtle bg-fill">
            <div
              className="h-full bg-gold-fill transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className="text-xs font-mono font-bold text-theme-primary">
            {selectedCount}/{totalCount} Ready
          </span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {DOCUMENT_ITEMS.map((doc) => {
          const isChecked = selectedDocs.includes(doc.id);
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => toggleDoc(doc.id)}
              aria-pressed={isChecked}
              className={`rounded-none border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                isChecked
                  ? "border-gold bg-gold-muted shadow-gold"
                  : "border-subtle bg-fill hover:border-elevated hover:bg-fill-hover"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-none border text-xs ${
                    isChecked
                      ? "border-gold-fill bg-gold-fill font-bold text-theme-on-gold"
                      : "border-elevated bg-elevated"
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && "✓"}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-theme-primary">
                    {doc.name}
                  </h4>
                  <p className="text-xs leading-relaxed text-theme-secondary">
                    {doc.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-subtle pt-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-xs text-theme-secondary sm:max-w-xs">
          Selected <span className="font-bold text-theme-primary">{selectedCount}</span> mandatory EXIM certificates required for Indian Customs clearance.
        </p>
        <div className="w-full sm:max-w-sm">
          <LeadCaptureInline
            source="Document Checklist Generator"
            service="Compliance Documentation"
            details={`Checklist (${selectedCount}/${totalCount}): ${selectedNames.join(", ")}.`}
            whatsappHref={`https://wa.me/919867173397?text=${whatsappMessage}`}
            ctaLabel="Send Checklist to Advisor"
          />
        </div>
      </div>
    </div>
  );
}

export { ChecklistGenerator };
