"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/blocks/bento-card";

type SeoSettings = {
  gtm_id: string;
  ga4_id: string;
  clarity_id: string;
  meta_pixel_id: string;
  gsc_verification: string;
  bing_verification: string;
  default_og_image: string;
  robots_extra: string;
};

const EMPTY: SeoSettings = {
  gtm_id: "",
  ga4_id: "G-SBVK5GGG6Q",
  clarity_id: "",
  meta_pixel_id: "",
  gsc_verification: "",
  bing_verification: "",
  default_og_image: "/illustrations/hero-global-trade.webp",
  robots_extra: "",
};

export default function SeoAdminPage() {
  const [form, setForm] = useState<SeoSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function setField<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  useEffect(() => {
    fetch("/api/seo-settings", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: unknown) => {
        const payload = data as { settings: SeoSettings };
        setForm({ ...EMPTY, ...payload.settings });
      })
      .catch(() => setError("Couldn't load SEO settings."))
      .finally(() => setLoading(false));
  }, []);

  async function onSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/seo-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Save failed.");
      }
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-theme-primary">
            SEO & Analytics
          </h1>
          <p className="mt-1 text-theme-secondary">
            Edit tracking IDs, Search Console verification, default OG image, and robots extras —
            no code deploy required.
          </p>
        </div>
        <Button disabled={saving} onClick={onSave}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save settings
        </Button>
      </div>

      {error ? <p className="status-err">{error}</p> : null}
      {saved ? (
        <p className="text-sm font-medium text-success">Settings saved. Refresh the site to verify tags.</p>
      ) : null}

      <BentoCard className="p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-theme-muted">
          Analytics & tags
        </h2>
        <p className="mt-1 text-sm text-theme-secondary">
          If GTM ID is set, GA4 should be configured inside GTM (GA4 direct tag is skipped). Otherwise
          GA4 loads directly. Clarity and Meta Pixel load deferred.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="field">
            <label htmlFor="gtm">Google Tag Manager ID</label>
            <input
              id="gtm"
              value={form.gtm_id}
              onChange={(e) => setField("gtm_id", e.target.value)}
              placeholder="GTM-XXXXXXX"
            />
          </div>
          <div className="field">
            <label htmlFor="ga4">Google Analytics 4 Measurement ID</label>
            <input
              id="ga4"
              value={form.ga4_id}
              onChange={(e) => setField("ga4_id", e.target.value)}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div className="field">
            <label htmlFor="clarity">Microsoft Clarity Project ID</label>
            <input
              id="clarity"
              value={form.clarity_id}
              onChange={(e) => setField("clarity_id", e.target.value)}
              placeholder="xxxxxxxxxx"
            />
          </div>
          <div className="field">
            <label htmlFor="pixel">Meta Pixel ID</label>
            <input
              id="pixel"
              value={form.meta_pixel_id}
              onChange={(e) => setField("meta_pixel_id", e.target.value)}
              placeholder="XXXXXXXXXXXXXXX"
            />
          </div>
        </div>
      </BentoCard>

      <BentoCard className="p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-theme-muted">
          Search Console & verification
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="field">
            <label htmlFor="gsc">Google Search Console verification code</label>
            <input
              id="gsc"
              value={form.gsc_verification}
              onChange={(e) => setField("gsc_verification", e.target.value)}
              placeholder="google-site-verification content value"
            />
          </div>
          <div className="field">
            <label htmlFor="bing">Bing Webmaster verification code</label>
            <input
              id="bing"
              value={form.bing_verification}
              onChange={(e) => setField("bing_verification", e.target.value)}
              placeholder="msvalidate.01 content value"
            />
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="og">Default Open Graph image path</label>
            <input
              id="og"
              value={form.default_og_image}
              onChange={(e) => setField("default_og_image", e.target.value)}
              placeholder="/illustrations/hero-global-trade.webp"
            />
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="robots">Extra robots.txt Disallow lines</label>
            <textarea
              id="robots"
              value={form.robots_extra}
              onChange={(e) => setField("robots_extra", e.target.value)}
              rows={4}
              placeholder={"Disallow: /private/\nDisallow: /tmp/"}
            />
            <p className="mt-1 text-xs text-theme-faint">
              One rule per line, e.g. Disallow: /staging/
            </p>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}
