"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";
import { LEAD_STATUSES } from "@/lib/site";

type LeadRow = {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  company: string | null;
  service: string;
  source: string;
  status: string;
  details: string | null;
  created_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  New: "border-gold bg-gold-muted text-gold-500",
  Contacted: "border-subtle bg-fill text-theme-primary",
  "In Progress": "border-subtle bg-fill text-theme-primary",
  Converted: "border-success bg-success/10 text-success",
  Archived: "border-subtle bg-fill text-theme-faint",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { leads: LeadRow[] };
      setLeads(data.leads ?? []);
    } catch {
      setError("Couldn't load leads. Confirm you're signed in and D1 is bound.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const sources = useMemo(
    () => Array.from(new Set(leads.map((l) => l.source))).sort(),
    [leads],
  );

  const visible = sourceFilter ? leads.filter((l) => l.source === sourceFilter) : leads;

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch {
      setError("Failed to update lead status.");
    } finally {
      setBusyId(null);
    }
  }

  function exportCsv() {
    const header = ["Name", "Mobile", "Email", "Company", "Service", "Source", "Status", "Date"];
    const rows = visible.map((l) => [
      l.name,
      l.mobile,
      l.email ?? "",
      l.company ?? "",
      l.service,
      l.source,
      l.status,
      l.created_at,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Leads Management</h1>
          <p className="mt-1 text-theme-secondary">
            Every inquiry — contact form, tools, and booking calendar — lands here in real time.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={loadLeads} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={exportCsv} disabled={!visible.length}>
            Export CSV
          </Button>
        </div>
      </div>

      {error ? <p className="status-err">{error}</p> : null}

      {sources.length > 1 ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSourceFilter("")}
            className={`rounded-none border px-3 py-1.5 text-xs font-semibold transition-colors ${
              !sourceFilter
                ? "border-gold bg-gold-muted text-gold-500"
                : "border-subtle bg-fill text-theme-muted hover:text-theme-primary"
            }`}
          >
            All sources ({leads.length})
          </button>
          {sources.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSourceFilter(s)}
              className={`rounded-none border px-3 py-1.5 text-xs font-semibold transition-colors ${
                sourceFilter === s
                  ? "border-gold bg-gold-muted text-gold-500"
                  : "border-subtle bg-fill text-theme-muted hover:text-theme-primary"
              }`}
            >
              {s} ({leads.filter((l) => l.source === s).length})
            </button>
          ))}
        </div>
      ) : null}

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">Name</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Contact</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Service</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Source</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Date</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-theme-muted">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" /> Loading leads…
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-theme-muted">
                    No leads yet. They'll appear here as visitors use the contact form, tools, or
                    booking calendar.
                  </td>
                </tr>
              ) : (
                visible.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-fill-hover">
                    <td className="px-6 py-4 font-medium text-theme-primary">
                      {lead.name}
                      {lead.company ? (
                        <span className="mt-0.5 block text-xs font-normal text-theme-faint">
                          {lead.company}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">
                      <a href={`tel:${lead.mobile}`} className="hover:text-gold-500">
                        {lead.mobile}
                      </a>
                      {lead.email ? (
                        <span className="mt-0.5 block text-xs text-theme-faint">{lead.email}</span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">{lead.service}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-none border border-subtle bg-fill px-2.5 py-1 text-xs font-semibold text-theme-muted">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        disabled={busyId === lead.id}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`rounded-none border px-2.5 py-1.5 text-xs font-semibold ${
                          STATUS_STYLE[lead.status] ?? "border-subtle bg-fill text-theme-muted"
                        }`}
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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
