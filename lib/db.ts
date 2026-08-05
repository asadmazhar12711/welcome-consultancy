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
  status: string;
  published_at: string | null;
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
