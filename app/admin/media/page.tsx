"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaRow } from "@/lib/db";

export default function MediaAdminPage() {
  const [mediaList, setMediaList] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = (await res.json()) as { media: MediaRow[] };
      setMediaList(data.media || []);
    } catch {
      setMessage({ type: "err", text: "Failed to load media items." });
    } finally {
      setLoading(false);
    }
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filename || !url) return;
    setSaving(true);
    setMessage(null);

    try {
      const payload = editingId 
        ? { id: editingId, filename, url, alt_text: altText }
        : { filename, url, alt_text: altText };

      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to add media.");
      }
      setMessage({ type: "ok", text: "Media item registered successfully!" });
      setAdding(false);
      setEditingId(null);
      setFilename("");
      setUrl("");
      setAltText("");
      loadMedia();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving media.";
      setMessage({ type: "err", text: msg });
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Are you sure you want to delete this media reference?")) return;
    try {
      await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      loadMedia();
    } catch {
      setMessage({ type: "err", text: "Failed to delete media item." });
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function startEditing(m: MediaRow) {
    setAdding(false);
    setEditingId(m.id);
    setFilename(m.filename);
    setUrl(m.url);
    setAltText(m.alt_text || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-theme-primary">Media Library</h1>
          <p className="mt-1 text-sm text-theme-secondary">Manage site images and set image ALT text for accessibility & SEO.</p>
        </div>
        <Button onClick={() => {
          setEditingId(null);
          setFilename("");
          setUrl("");
          setAltText("");
          setAdding(!adding);
        }} className="font-bold">
          <Plus className="mr-2 h-4 w-4" /> Register Image
        </Button>
      </div>

      {message && (
        <div className={`p-4 border text-sm font-semibold ${message.type === "ok" ? "status-ok" : "status-err"}`}>
          {message.text}
        </div>
      )}

      {(adding || editingId) && (
        <form onSubmit={onSave} className="space-y-4 border border-subtle bg-elevated p-6 shadow-theme-md">
          <h2 className="text-lg font-bold text-theme-primary">
            {editingId ? "Edit Image Reference" : "Register New Image Reference"}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="field">
              <label>Filename / Title *</label>
              <input
                required
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g. IEC Registration Banner"
                className="field-obsidian"
              />
            </div>
            <div className="field">
              <label>Image URL *</label>
              <input
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://... or /illustrations/hero.webp"
                className="field-obsidian"
              />
            </div>
            <div className="field md:col-span-2">
              <label>Image ALT Text (Accessibility &amp; SEO) *</label>
              <input
                required
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descriptive text for screen readers & search engines"
                className="field-obsidian"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => {
              setAdding(false);
              setEditingId(null);
            }}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="font-bold">
              {saving ? "Saving…" : (editingId ? "Update Reference" : "Save Image Reference")}
            </Button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <div className="col-span-full p-8 text-center text-sm font-semibold text-theme-muted">Loading media items…</div>
        ) : mediaList.length === 0 ? (
          <div className="col-span-full p-8 text-center text-sm font-semibold text-theme-muted">
            No media items registered yet. Click "Register Image" above to add image &amp; ALT text references.
          </div>
        ) : (
          mediaList.map((m) => (
            <div key={m.id} className="group relative border border-subtle bg-elevated p-4 shadow-theme-sm transition-all hover:border-gold">
              <div className="relative mb-3 aspect-video w-full overflow-hidden bg-surface">
                {m.url.startsWith("/") || m.url.startsWith("http") ? (
                  <img src={m.url} alt={m.alt_text || m.filename} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-theme-faint">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <h3 className="truncate font-bold text-theme-primary">{m.filename}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-theme-muted">
                <span className="font-bold text-gold-500">ALT:</span> {m.alt_text || "No ALT text set"}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-subtle pt-3">
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(m.url, m.id)}>
                  {copiedId === m.id ? <Check className="mr-1.5 h-3 w-3 text-success" /> : <Copy className="mr-1.5 h-3 w-3" />}
                  {copiedId === m.id ? "Copied" : "Copy URL"}
                </Button>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEditing(m)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-error hover:bg-error-muted" onClick={() => onDelete(m.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
