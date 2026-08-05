"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  status: string;
  published_at: string | null;
  created_at: string;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DGFT Policy");
  const [excerpt, setExcerpt] = useState("");

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

  async function createPost(status: "Draft" | "Published") {
    if (!title.trim() || !excerpt.trim()) {
      setError("Title and excerpt are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, excerpt, status }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Failed to create post.");
      }
      setTitle("");
      setExcerpt("");
      setShowForm(false);
      await loadPosts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create post.");
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
            Write and manage authoritative EXIM content — publishes live on /blogs and the homepage.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New RoDTEP Guidelines 2026"
                maxLength={160}
              />
            </div>
            <div className="field">
              <label htmlFor="post-category">Category</label>
              <select
                id="post-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              <label htmlFor="post-excerpt">Excerpt</label>
              <textarea
                id="post-excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                maxLength={600}
                placeholder="A concise summary shown on the blog listing and homepage card."
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-subtle pt-6">
            <Button disabled={saving} onClick={() => createPost("Published")}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Publish now
            </Button>
            <Button variant="outline" disabled={saving} onClick={() => createPost("Draft")}>
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
                <th className="px-6 py-4 font-semibold text-theme-muted">Category</th>
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
                    <td className="px-6 py-4 text-theme-secondary">{post.category}</td>
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
