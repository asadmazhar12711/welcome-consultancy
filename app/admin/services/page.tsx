"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Save, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceRow, MediaRow } from "@/lib/db";

type FaqItem = { q: string; a: string };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [mediaList, setMediaList] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ServiceRow> | null>(null);

  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [bodyParagraphs, setBodyParagraphs] = useState<string[]>([]);
  const [answerSummary, setAnswerSummary] = useState("");
  const [pageDescription, setPageDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    loadServices();
    loadMedia();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const res = await fetch("/api/services?all=1");
      const data = (await res.json()) as { services: ServiceRow[] };
      setServices(data.services || []);
    } catch {
      setMessage({ type: "err", text: "Failed to load services." });
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
      // media fallback
    }
  }

  function startEditing(s: Partial<ServiceRow>) {
    setEditing(s);
    try {
      setFaqs(s.faqs_json ? JSON.parse(s.faqs_json) : []);
    } catch {
      setFaqs([]);
    }
    try {
      setBodyParagraphs(s.body_json ? JSON.parse(s.body_json) : []);
    } catch {
      setBodyParagraphs([]);
    }
    try {
      const content = s.content_json ? JSON.parse(s.content_json) : {};
      setAnswerSummary(content.answerSummary || "");
      setPageDescription(content.pageDescription || "");
    } catch {
      setAnswerSummary("");
      setPageDescription("");
    }
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing?.title) return;
    setSaving(true);
    setMessage(null);

    const payload = {
      ...editing,
      faqs_json: JSON.stringify(faqs),
      body_json: JSON.stringify(bodyParagraphs),
      content_json: JSON.stringify({
        ...(editing.content_json ? JSON.parse(editing.content_json) : {}),
        answerSummary,
        pageDescription,
      }),
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Save failed.");
      }
      setMessage({ type: "ok", text: "Service SEO & metadata updated successfully!" });
      setEditing(null);
      loadServices();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving service.";
      setMessage({ type: "err", text: msg });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-theme-primary">Services SEO &amp; Meta CMS</h1>
          <p className="mt-1 text-sm text-theme-secondary">
            Manage custom SEO titles, meta descriptions, canonical URLs, featured images &amp; FAQs per service.
          </p>
        </div>
        <Button
          onClick={() =>
            startEditing({
              title: "New EXIM Service",
              slug: "new-exim-service",
              short_description: "",
              status: "Draft",
              image_url: "/illustrations/service-dgft.webp",
              meta_robots: "index, follow",
            })
          }
          className="font-bold"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Service Entry
        </Button>
      </div>

      {message && (
        <div className={`p-4 border text-sm font-semibold ${message.type === "ok" ? "status-ok" : "status-err"}`}>
          {message.text}
        </div>
      )}

      {editing ? (
        <form onSubmit={onSave} className="space-y-8 border border-subtle bg-elevated p-6 shadow-theme-md">
          <div className="flex items-center justify-between border-b border-subtle pb-4">
            <h2 className="text-lg font-bold text-theme-primary">
              {editing.id ? `Editing Service: ${editing.title}` : "Create New Service Entry"}
            </h2>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="font-bold">
                <Save className="mr-2 h-4 w-4" /> {saving ? "Saving…" : "Save Service Meta"}
              </Button>
            </div>
          </div>

          {/* 1. Basic Info & URL */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500">1. Service Identification</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="field">
                <label>Service Title *</label>
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
              <div className="field md:col-span-2">
                <label>Short Description (Card Summary)</label>
                <textarea
                  rows={2}
                  value={editing.short_description || ""}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  className="field-obsidian"
                />
              </div>
              <div className="field">
                <label>Publishing Status</label>
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
          </div>

          {/* 2. Featured Image */}
          <div className="space-y-4 border-t border-subtle pt-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> 2. Featured Banner Image
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
              <div className="field">
                <label>Select Image from Media Library</label>
                <select
                  value={editing.image_url || ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  className="field-obsidian"
                >
                  <option value="">-- Select Registered Image --</option>
                  {mediaList.map((m) => (
                    <option key={m.id} value={m.url}>
                      {m.filename} ({m.alt_text || "No Alt"})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter image URL directly..."
                  value={editing.image_url || ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  className="field-obsidian mt-2 font-mono text-xs"
                />
              </div>
              {editing.image_url && (
                <div className="relative aspect-[16/10] w-full max-w-xs overflow-hidden border border-gold bg-black/40 rounded-none">
                  <Image
                    src={editing.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>

          {/* 3. Overview & Strategic Value (Body) */}
          <div className="space-y-4 border-t border-subtle pt-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500">
              3. Overview &amp; Strategic Value
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="field">
                <label>Answer Summary (Bold intro text)</label>
                <textarea
                  rows={2}
                  value={answerSummary}
                  onChange={(e) => setAnswerSummary(e.target.value)}
                  placeholder="Welcome Consultancy provides..."
                  className="field-obsidian"
                />
              </div>
              <div className="field">
                <label>Page Description (Secondary intro text)</label>
                <textarea
                  rows={2}
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  placeholder="Detailed context..."
                  className="field-obsidian"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-theme-secondary">Body Paragraphs</label>
                <Button type="button" size="sm" variant="outline" onClick={() => setBodyParagraphs([...bodyParagraphs, ""])}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add Paragraph
                </Button>
              </div>
              {bodyParagraphs.length === 0 ? (
                <p className="text-xs text-theme-muted italic">No paragraphs configured. Click "Add Paragraph".</p>
              ) : (
                <div className="space-y-3">
                  {bodyParagraphs.map((para, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const copy = [...bodyParagraphs];
                          copy[idx] = e.target.value;
                          setBodyParagraphs(copy);
                        }}
                        className="field-obsidian flex-1"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="text-red-400 hover:bg-red-400/10 shrink-0"
                        onClick={() => setBodyParagraphs(bodyParagraphs.filter((_, i) => i !== idx))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Structured FAQs */}
          <div className="space-y-4 border-t border-subtle pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500">4. Service FAQs &amp; Schema Markup</h3>
              <Button type="button" size="sm" variant="outline" onClick={() => setFaqs([...faqs, { q: "", a: "" }])}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add FAQ
              </Button>
            </div>
            {faqs.length === 0 ? (
              <p className="text-xs text-theme-muted italic">No FAQs configured yet. Click "Add FAQ".</p>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 border border-subtle bg-black/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-500">FAQ #{idx + 1}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" /> Remove
                      </Button>
                    </div>
                    <input
                      value={faq.q}
                      onChange={(e) => {
                        const copy = [...faqs];
                        copy[idx].q = e.target.value;
                        setFaqs(copy);
                      }}
                      placeholder="Question?"
                      className="field-obsidian font-bold"
                    />
                    <textarea
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const copy = [...faqs];
                        copy[idx].a = e.target.value;
                        setFaqs(copy);
                      }}
                      placeholder="Answer details..."
                      className="field-obsidian"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. SEO & Metadata */}
          <div className="border-t border-subtle pt-6 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold-500">5. Technical SEO &amp; Social Meta</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="field">
                <label>SEO Meta Title</label>
                <input
                  value={editing.seo_title || ""}
                  onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })}
                  placeholder="e.g. IEC Registration Mumbai | DGFT Advisory"
                  className="field-obsidian"
                />
              </div>
              <div className="field">
                <label>Canonical URL</label>
                <input
                  value={editing.canonical_url || ""}
                  onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value })}
                  placeholder="https://welcomeconsultancy.in/service/..."
                  className="field-obsidian"
                />
              </div>
              <div className="field md:col-span-2">
                <label>Meta Description (Search Snippet)</label>
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
                <label>OG Social Image URL</label>
                <input
                  value={editing.og_image || ""}
                  onChange={(e) => setEditing({ ...editing, og_image: e.target.value })}
                  placeholder="/illustrations/service-iec.webp"
                  className="field-obsidian"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="border border-subtle bg-elevated shadow-theme-sm">
          {loading ? (
            <div className="p-8 text-center text-sm font-semibold text-theme-muted">Loading services…</div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center text-sm font-semibold text-theme-muted">
              No services found in database. Click "Add Service Entry" above.
            </div>
          ) : (
            <div className="divide-y divide-subtle">
              {services.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 hover:bg-fill">
                  <div className="flex items-center gap-4">
                    {s.image_url ? (
                      <div className="relative h-12 w-16 overflow-hidden border border-subtle shrink-0">
                        <Image src={s.image_url} alt="" fill className="object-cover" unoptimized />
                      </div>
                    ) : null}
                    <div>
                      <span className="font-bold text-theme-primary">{s.title}</span>
                      <span className="ml-3 text-xs font-mono text-theme-muted">/service/{s.slug}</span>
                      <span
                        className={`ml-3 rounded-none px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                          s.status === "Published" ? "bg-success-muted text-success" : "bg-warning-muted text-warning"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => startEditing(s)}>
                    <Edit2 className="mr-1.5 h-3.5 w-3.5" /> Edit SEO &amp; Meta
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
