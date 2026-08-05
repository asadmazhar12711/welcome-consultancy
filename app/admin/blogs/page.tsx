"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  status: string;
  published_at: string | null;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  meta_robots: string;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  image_alt: string | null;
};

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: "DGFT Policy",
  excerpt: "",
  body: "",
  seo_title: "",
  meta_description: "",
  canonical_url: "",
  meta_robots: "index, follow",
  og_title: "",
  og_description: "",
  og_image: "",
  twitter_title: "",
  twitter_description: "",
  twitter_image: "",
  image_alt: "",
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function setField<K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blogs?all=1", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load posts.");
      const data = (await res.json()) as { posts: BlogRow[] };
      setPosts(data.posts ?? []);
    } catch {
      setError("Couldn't load posts. Confirm you're signed in and D1 is bound.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(post: BlogRow) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      body: post.body || "",
      seo_title: post.seo_title || "",
      meta_description: post.meta_description || "",
      canonical_url: post.canonical_url || "",
      meta_robots: post.meta_robots || "index, follow",
      og_title: post.og_title || "",
      og_description: post.og_description || "",
      og_image: post.og_image || "",
      twitter_title: post.twitter_title || "",
      twitter_description: post.twitter_description || "",
      twitter_image: post.twitter_image || "",
      image_alt: post.image_alt || "",
    });
    setShowForm(true);
  }

  async function savePost(status: "Draft" | "Published") {
    if (!form.title.trim() || !form.excerpt.trim()) {
      setError("Title and excerpt are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, status };
      const res = await fetch(editingId ? `/api/blogs/${editingId}` : "/api/blogs", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to save post.");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      await loadPosts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(post: BlogRow) {
    setBusyId(post.id);
    try {
      const nextStatus = post.status === "Published" ? "Draft" : "Published";
      const res = await fetch(`/api/blogs/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error();
      await loadPosts();
    } catch {
      setError("Failed to update post status.");
    } finally {
      setBusyId(null);
    }
  }

  async function deletePost(post: BlogRow) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusyId(post.id);
    try {
      const res = await fetch(`/api/blogs/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await loadPosts();
    } catch {
      setError("Failed to delete post.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">Blog CMS</h1>
          <p className="mt-1 text-theme-secondary">
            Content, SEO metadata, and publishing for /blogs and individual article pages.
          </p>
        </div>
        <Button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditingId(null);
            } else {
              openCreate();
            }
          }}
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Write New Post"}
        </Button>
      </div>

      {error ? <p className="status-err">{error}</p> : null}

      {showForm ? (
        <BentoCard className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="field">
              <label htmlFor="post-title">Title</label>
              <input
                id="post-title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. New RoDTEP Guidelines 2026"
                maxLength={160}
              />
            </div>
            <div className="field">
              <label htmlFor="post-category">Category</label>
              <select
                id="post-category"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
              >
                {["DGFT Policy", "Incentives", "Customs", "Documentation", "Compliance"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="post-slug">URL slug</label>
              <input
                id="post-slug"
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value)}
                placeholder="auto-generated-from-title"
                maxLength={80}
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="post-excerpt">Excerpt / meta summary</label>
              <textarea
                id="post-excerpt"
                value={form.excerpt}
                onChange={(e) => setField("excerpt", e.target.value)}
                rows={3}
                maxLength={600}
                placeholder="Shown on listing cards and used as default meta description."
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="post-body">Article body</label>
              <textarea
                id="post-body"
                value={form.body}
                onChange={(e) => setField("body", e.target.value)}
                rows={8}
                maxLength={20000}
                placeholder="Full article content. Separate paragraphs with a blank line."
              />
            </div>
            <div className="field">
              <label htmlFor="post-image-alt">Image alt text</label>
              <input
                id="post-image-alt"
                value={form.image_alt}
                onChange={(e) => setField("image_alt", e.target.value)}
                maxLength={160}
              />
            </div>
            <div className="field">
              <label htmlFor="post-robots">Meta robots</label>
              <select
                id="post-robots"
                value={form.meta_robots}
                onChange={(e) => setField("meta_robots", e.target.value)}
              >
                {[
                  "index, follow",
                  "noindex, follow",
                  "index, nofollow",
                  "noindex, nofollow",
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-theme-muted">
            SEO metadata
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="field">
              <label htmlFor="seo-title">SEO title</label>
              <input
                id="seo-title"
                value={form.seo_title}
                onChange={(e) => setField("seo_title", e.target.value)}
                maxLength={70}
                placeholder="Defaults to post title"
              />
            </div>
            <div className="field">
              <label htmlFor="canonical">Canonical URL</label>
              <input
                id="canonical"
                value={form.canonical_url}
                onChange={(e) => setField("canonical_url", e.target.value)}
                maxLength={300}
                placeholder="Leave blank for auto /blogs/{slug}"
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="meta-desc">Meta description</label>
              <textarea
                id="meta-desc"
                value={form.meta_description}
                onChange={(e) => setField("meta_description", e.target.value)}
                rows={2}
                maxLength={160}
                placeholder="Defaults to excerpt"
              />
            </div>
            <div className="field">
              <label htmlFor="og-title">Open Graph title</label>
              <input
                id="og-title"
                value={form.og_title}
                onChange={(e) => setField("og_title", e.target.value)}
                maxLength={70}
              />
            </div>
            <div className="field">
              <label htmlFor="og-image">Open Graph image URL/path</label>
              <input
                id="og-image"
                value={form.og_image}
                onChange={(e) => setField("og_image", e.target.value)}
                maxLength={300}
                placeholder="/illustrations/hero-global-trade.webp"
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="og-desc">Open Graph description</label>
              <textarea
                id="og-desc"
                value={form.og_description}
                onChange={(e) => setField("og_description", e.target.value)}
                rows={2}
                maxLength={200}
              />
            </div>
            <div className="field">
              <label htmlFor="tw-title">Twitter title</label>
              <input
                id="tw-title"
                value={form.twitter_title}
                onChange={(e) => setField("twitter_title", e.target.value)}
                maxLength={70}
              />
            </div>
            <div className="field">
              <label htmlFor="tw-image">Twitter image URL/path</label>
              <input
                id="tw-image"
                value={form.twitter_image}
                onChange={(e) => setField("twitter_image", e.target.value)}
                maxLength={300}
              />
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="tw-desc">Twitter description</label>
              <textarea
                id="tw-desc"
                value={form.twitter_description}
                onChange={(e) => setField("twitter_description", e.target.value)}
                rows={2}
                maxLength={200}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-subtle pt-6">
            <Button disabled={saving} onClick={() => savePost("Published")}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {editingId ? "Update & publish" : "Publish now"}
            </Button>
            <Button variant="outline" disabled={saving} onClick={() => savePost("Draft")}>
              Save as draft
            </Button>
          </div>
        </BentoCard>
      ) : null}

      <BentoCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-subtle bg-fill uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold text-theme-muted">Title</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Slug</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Status</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Published</th>
                <th className="px-6 py-4 font-semibold text-theme-muted">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" /> Loading posts…
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-theme-muted">
                    No posts yet. Write your first one above.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="transition-colors hover:bg-fill-hover">
                    <td className="px-6 py-4 font-medium text-theme-primary">{post.title}</td>
                    <td className="px-6 py-4 text-theme-secondary">
                      <Link
                        href={`/blogs/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 hover:text-gold-500"
                      >
                        /blogs/{post.slug}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${
                          post.status === "Published"
                            ? "border-gold bg-gold-muted text-gold-500"
                            : "border-subtle bg-fill text-theme-muted"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-theme-secondary">
                      {post.published_at || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === post.id}
                          onClick={() => openEdit(post)}
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === post.id}
                          onClick={() => toggleStatus(post)}
                        >
                          {post.status === "Published" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={busyId === post.id}
                          onClick={() => deletePost(post)}
                          aria-label={`Delete ${post.title}`}
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
    </div>
  );
}
