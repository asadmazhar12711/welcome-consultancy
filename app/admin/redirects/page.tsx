"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type RedirectRow = {
  id: string;
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: number;
};

type LegacyRow = {
  from_path: string;
  to_path: string;
  status_code: number;
  source: string;
};

export default function RedirectsAdminPage() {
  const [rows, setRows] = useState<RedirectRow[]>([]);
  const [legacy, setLegacy] = useState<LegacyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [statusCode, setStatusCode] = useState(301);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/redirects?all=1", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as {
        redirects: RedirectRow[];
        legacy: LegacyRow[];
      };
      setRows(data.redirects ?? []);
      setLegacy(data.legacy ?? []);
    } catch {
      setError("Couldn't load redirects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createRedirect() {
    if (!fromPath.trim() || !toPath.trim()) {
      setError("Both paths are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_path: fromPath,
          to_path: toPath,
          status_code: statusCode,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to create redirect.");
      }
      setFromPath("");
      setToPath("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create redirect.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(row: RedirectRow) {
    await fetch(`/api/redirects/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: row.is_active ? 0 : 1 }),
    });
    await load();
  }

  async function remove(row: RedirectRow) {
    if (!window.confirm(`Delete redirect ${row.from_path} → ${row.to_path}?`)) return;
    await fetch(`/api/redirects/${row.id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-theme-primary">
          Redirect management
        </h1>
        <p className="mt-1 text-theme-secondary">
          Create 301/302 redirects without code changes. Legacy WordPress slug renames are built-in.
        </p>
      </div>

      {error ? <p className="status-err">{error}</p> : null}

      <BentoCard className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="field">
            <label htmlFor="from">From path</label>
            <input
              id="from"
              value={fromPath}
              onChange={(e) => setFromPath(e.target.value)}
              placeholder="/old-page"
            />
          </div>
          <div className="field">
            <label htmlFor="to">To path</label>
            <input
              id="to"
              value={toPath}
              onChange={(e) => setToPath(e.target.value)}
              placeholder="/new-page"
            />
          </div>
          <div className="field">
            <label htmlFor="code">Status</label>
            <select
              id="code"
              value={statusCode}
              onChange={(e) => setStatusCode(Number(e.target.value))}
            >
              <option value={301}>301 Permanent</option>
              <option value={302}>302 Temporary</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button disabled={saving} onClick={createRedirect} className="w-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add redirect
            </Button>
          </div>
        </div>
      </BentoCard>

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">From</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">To</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Code</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Active</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    No CMS redirects yet. Built-in legacy redirects still apply.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 font-medium text-theme-primary">{row.from_path}</td>
                    <td className="px-6 py-4 text-theme-secondary">{row.to_path}</td>
                    <td className="px-6 py-4 text-theme-secondary">{row.status_code}</td>
                    <td className="px-6 py-4 text-theme-secondary">
                      {row.is_active ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleActive(row)}>
                          {row.is_active ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(row)}
                          aria-label={`Delete ${row.from_path}`}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </BentoCard>

      <div>
        <h2 className="text-lg font-bold text-theme-primary">Built-in legacy redirects</h2>
        <p className="mt-1 text-sm text-theme-secondary">
          WordPress slug renames and path aliases — always active, no CMS edit required.
        </p>
        <BentoCard className="mt-4 !p-0 overflow-hidden">
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 border-b border-subtle bg-fill uppercase">
                <tr>
                  <th className="px-6 py-3 font-semibold text-theme-muted">From</th>
                  <th className="px-6 py-3 font-semibold text-theme-muted">To</th>
                  <th className="px-6 py-3 font-semibold text-theme-muted">Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {legacy.map((row) => (
                  <tr key={row.from_path}>
                    <td className="px-6 py-3 text-theme-primary">{row.from_path}</td>
                    <td className="px-6 py-3 text-theme-secondary">{row.to_path}</td>
                    <td className="px-6 py-3 text-theme-secondary">{row.status_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
