import { getEnv } from "@/lib/env";

export type LeadRow = {
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

export type SlotRow = {
  id: string;
  booking_date: string;
  booking_time: string;
  client_name: string;
  client_mobile: string;
  service_topic: string | null;
  status: string;
  created_at: string;
};

export type TickerRow = {
  id: number;
  announcement: string;
  is_active: number;
  updated_at: string;
};

export type SlotConfigRow = {
  id: number;
  working_days: string;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
};

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body?: string | null;
  status: string;
  published_at: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  meta_robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  image_alt?: string | null;
  created_at: string;
  updated_at: string;
};

export type PopupRow = {
  id: string;
  title: string;
  message: string;
  cta_label: string;
  cta_href: string;
  is_active: number;
  delay_seconds: number;
  created_at: string;
  updated_at: string;
};

export type RedirectRow = {
  id: string;
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type SeoSettingsRow = {
  id: number;
  site_title: string;
  default_meta_description: string;
  site_url: string;
  gtm_id: string;
  ga4_id: string;
  clarity_id: string;
  meta_pixel_id: string;
  gsc_verification: string;
  bing_verification: string;
  default_og_image: string;
  robots_extra: string;
  updated_at: string;
};

export type PageRow = {
  id: string;
  title: string;
  slug: string;
  content_json: string;
  status: string;
  seo_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  meta_robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  created_at: string;
  updated_at: string;
};

export type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  short_description?: string | null;
  content_json: string;
  faqs_json: string;
  benefits_json?: string | null;
  documents_json?: string | null;
  body_json?: string | null;
  image_url?: string | null;
  status: string;
  seo_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  meta_robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaRow = {
  id: string;
  filename: string;
  url: string;
  alt_text?: string | null;
  uploaded_at: string;
};

export type RobotsConfigRow = {
  id: number;
  content: string;
  updated_at: string;
};

export async function getDB(): Promise<D1Database> {
  const env = await getEnv();
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is missing. Run `npm run db:local` and use `npm run preview` or configure wrangler.jsonc.",
    );
  }
  return env.DB;
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function getSeoSettings(): Promise<SeoSettingsRow | null> {
  try {
    const db = await getDB();
    return (
      (await db
        .prepare("SELECT * FROM seo_settings WHERE id = 1")
        .first<SeoSettingsRow>()) ?? null
    );
  } catch {
    return null;
  }
}

export async function getActiveRedirect(fromPath: string): Promise<RedirectRow | null> {
  try {
    const db = await getDB();
    return (
      (await db
        .prepare(
          "SELECT * FROM redirects WHERE from_path = ? AND is_active = 1 LIMIT 1",
        )
        .bind(fromPath)
        .first<RedirectRow>()) ?? null
    );
  } catch {
    return null;
  }
}

export async function listPublishedBlogSlugs(): Promise<
  { slug: string; updated_at: string; published_at: string | null }[]
> {
  try {
    const db = await getDB();
    const result = await db
      .prepare(
        `SELECT slug, updated_at, published_at FROM blog_posts
         WHERE status = 'Published' ORDER BY published_at DESC`,
      )
      .all<{ slug: string; updated_at: string; published_at: string | null }>();
    return result.results ?? [];
  } catch {
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<PageRow | null> {
  try {
    const db = await getDB();
    return (
      (await db
        .prepare("SELECT * FROM pages WHERE slug = ? AND status = 'Published' LIMIT 1")
        .bind(slug)
        .first<PageRow>()) ?? null
    );
  } catch {
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  try {
    const db = await getDB();
    return (
      (await db
        .prepare("SELECT * FROM services WHERE slug = ? AND status = 'Published' LIMIT 1")
        .bind(slug)
        .first<ServiceRow>()) ?? null
    );
  } catch {
    return null;
  }
}

export async function listPublishedServices(): Promise<ServiceRow[]> {
  try {
    const db = await getDB();
    const result = await db
      .prepare("SELECT * FROM services WHERE status = 'Published' ORDER BY title ASC")
      .all<ServiceRow>();
    return result.results ?? [];
  } catch {
    return [];
  }
}
