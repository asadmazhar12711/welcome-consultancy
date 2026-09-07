"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Save, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageRow, MediaRow } from "@/lib/db";

export default function PagesAdminPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [mediaList, setMediaList] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<PageRow> | null>(null);
  const [heroObj, setHeroObj] = useState<{
    hero_title?: string;
    hero_subtitle?: string;
    hero_image?: string;
  }>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    loadPages();
    loadMedia();
  }, []);

  async function loadPages() {
    setLoading(true);
    try {
      const res = await fetch("/api/pages?all=1");
      const data = (await res.json()) as { pages: PageRow[] };
      setPages(data.pages || []);
    } catch {
      setMessage({ type: "err", text: "Failed to load pages." });
    } finally {
      setLoading(false);
    }
  }

  async function loadMedia() {
    try {
      const res = await fetch("/api/media");
      const data = (await res.json()) as { media: MediaRow[] };
      setMediaList(data.media || []);
    } catch {
      // ignore
    }
  }

  function startEditing(p: Partial<PageRow>) {
    setEditing(p);
    try {
      setHeroObj(p.content_json ? JSON.parse(p.content_json) : {});
    } catch {
      setHeroObj({});
    }
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing?.title) return;
    setSaving(true);
    setMessage(null);

    const payload = {
      ...editing,
      content_json: JSON.stringify(heroObj),
    };

    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Save failed.");
      }
      setMessage({ type: "ok", text: "Page saved successfully!" });
      setEditing(null);
      loadPages();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving page.";
      setMessage({ type: "err", text: msg });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-theme-primary">Pages CMS</h1>
          <p className="mt-1 text-sm text-theme-secondary">
            Edit hero copy, hero images, and SEO settings for static pages (Home, About Us, Contact Us, etc.).
          </p>
        </div>
        <Button
          onClick={() =>
            startEditing({
              title: "New Page",
              slug: "new-page",
              status: "Draft",
              meta_robots: "index, follow",
            })
          }
          className="font-bold"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Page
        </Button>
      </div>

      {message && (
        <div className={`p-4 border text-sm font-semibold ${message.type === "ok" ? "status-ok" : "status-err"}`}>
          {message.text}
        </div>
      )}

      {editing ? (
        <form onSubmit={onSave} className="space-y-6 border border-subtle bg-elevated p-6 shadow-theme-md">
          <div className="flex items-center justify-between border-b border-subtle pb-4">
            <h2 className="text-lg font-bold text-theme-primary">
              {editing.id ? `Editing Page: ${editing.title}` : "Create New Page"}
            </h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="font-bold">
                <Save className="mr-2 h-4 w-4" /> {saving ? "Saving…" : "Save Page"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="field">
              <label>Page Name / Title *</label>
              <input
                required
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="field-obsidian"
              />
            </div>
            <div className="field">
              <label>URL Slug *</label>
              <input
                required
                value={editing.slug || ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="field-obsidian"
              />
            </div>
            <div className="field">
              <label>Status</label>
              <select
                value={editing.status || "Draft"}
                onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                className="field-obsidian"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          {/* Hero Section Config */}
          <div className="border-t border-subtle pt-4 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500">Page Content & Hero Banner</h3>
            <div className="field">
              <label>Hero Banner Title</label>
              <input
                value={heroObj.hero_title || ""}
                onChange={(e) => setHeroObj({ ...heroObj, hero_title: e.target.value })}
                placeholder="e.g. Welcome Consultancy"
                className="field-obsidian"
              />
            </div>
            <div className="field">
              <label>Hero Subtitle / Tagline</label>
              <textarea
                rows={2}
                value={heroObj.hero_subtitle || ""}
                onChange={(e) => setHeroObj({ ...heroObj, hero_subtitle: e.target.value })}
                placeholder="e.g. Maximize export incentives with absolute precision..."
                className="field-obsidian"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
              <div className="field">
                <label className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-gold-500" /> Hero Background Image
                </label>
                <select
                  value={heroObj.hero_image || ""}
                  onChange={(e) => setHeroObj({ ...heroObj, hero_image: e.target.value })}
                  className="field-obsidian"
                >
                  <option value="">-- Select Image from Media Library --</option>
                  {mediaList.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.filename} ({m.alt_text || "No Alt"})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or paste custom image URL..."
                  value={heroObj.hero_image || ""}
                  onChange={(e) => setHeroObj({ ...heroObj, hero_image: e.target.value })}
                  className="field-obsidian mt-2 font-mono text-xs"
                />
              </div>
              {heroObj.hero_image && (
                <div className="relative aspect-video w-full max-w-xs overflow-hidden border border-gold bg-black/40">
                  <Image src={heroObj.hero_image} alt="Hero Preview" fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
          </div>

          {/* SEO Section */}
          <div className="border-t border-subtle pt-4">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-gold-500">SEO & Metadata Settings</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="field">
                <label>SEO Title</label>
                <input
                  value={editing.seo_title || ""}
                  onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })}
                  className="field-obsidian"
                />
              </div>
              <div className="field">
                <label>Canonical URL</label>
                <input
                  value={editing.canonical_url || ""}
                  onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value })}
                  className="field-obsidian"
                />
              </div>
              <div className="field md:col-span-2">
                <label>Meta Description</label>
                <textarea
                  rows={2}
                  value={editing.meta_description || ""}
                  onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })}
                  className="field-obsidian"
                />
              </div>
              <div className="field">
                <label>Robots Directive</label>
                <select
                  value={editing.meta_robots || "index, follow"}
                  onChange={(e) => setEditing({ ...editing, meta_robots: e.target.value })}
                  className="field-obsidian"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">Noindex, Follow</option>
                  <option value="index, nofollow">Index, Nofollow</option>
                  <option value="noindex, nofollow">Noindex, Nofollow</option>
                </select>
              </div>
              <div className="field">
                <label>OG Image URL</label>
                <input
                  value={editing.og_image || ""}
                  onChange={(e) => setEditing({ ...editing, og_image: e.target.value })}
                  className="field-obsidian"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="border border-subtle bg-elevated shadow-theme-sm">
          {loading ? (
            <div className="p-8 text-center text-sm font-semibold text-theme-muted">Loading pages…</div>
          ) : pages.length === 0 ? (
            <div className="p-8 text-center text-sm font-semibold text-theme-muted">
              No pages created yet. Click "Add Page" above.
            </div>
          ) : (
            <div className="divide-y divide-subtle">
              {pages.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 hover:bg-fill">
                  <div>
                    <span className="font-bold text-theme-primary">{p.title}</span>
                    <span className="ml-3 text-xs font-mono text-theme-muted">/{p.slug}</span>
                    <span
                      className={`ml-3 rounded-none px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                        p.status === "Published" ? "bg-success-muted text-success" : "bg-warning-muted text-warning"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => startEditing(p)}>
                    <Edit2 className="mr-1.5 h-3.5 w-3.5" /> Edit Page
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
