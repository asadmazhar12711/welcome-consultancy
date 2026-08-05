import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, type LeadRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { LEAD_STATUSES } from "@/lib/site";
import {
  isNonEmpty,
  isValidIndianMobile,
  normalizeMobile,
  optionalString,
} from "@/lib/validation";

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

export async function GET(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const db = await getDB();
  const source = request.nextUrl.searchParams.get("source");
  const status = request.nextUrl.searchParams.get("status");

  let query = "SELECT * FROM leads";
  const clauses: string[] = [];
  const binds: string[] = [];

  if (source) {
    clauses.push("source = ?");
    binds.push(source);
  }
  if (status) {
    clauses.push("status = ?");
    binds.push(status);
  }
  if (clauses.length) query += ` WHERE ${clauses.join(" AND ")}`;
  query += " ORDER BY created_at DESC";

  const stmt = db.prepare(query);
  const result = await (binds.length ? stmt.bind(...binds) : stmt).all<LeadRow>();
  return NextResponse.json({ leads: result.results ?? [] });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = optionalString(body.name, 120);
  const mobileRaw = optionalString(body.mobile, 20);
  const email = optionalString(body.email, 160);
  const company = optionalString(body.company, 160) || "Direct Inquiry";
  const service = optionalString(body.service, 120) || "General Consultation";
  const source = optionalString(body.source, 120) || "Website Contact Form";
  const details = optionalString(body.details, 2000);

  if (!isNonEmpty(name, 120) || !isValidIndianMobile(mobileRaw)) {
    return NextResponse.json(
      { error: "Name and a valid 10-digit Indian mobile number are required." },
      { status: 400 },
    );
  }

  const id = newId("LEAD");
  const mobile = normalizeMobile(mobileRaw);
  const db = await getDB();

  await db
    .prepare(
      `INSERT INTO leads (id, name, mobile, email, company, service, source, status, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'New', ?)`,
    )
    .bind(id, name, mobile, email || null, company, service, source, details || null)
    .run();

  return NextResponse.json({
    success: true,
    lead: { id, name, mobile, email, company, service, source, status: "New", details },
  });
}

export async function PATCH(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const id = optionalString(body.id, 80);
  const status = optionalString(body.status, 40);
  if (!id || !LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    return NextResponse.json({ error: "Valid id and status are required." }, { status: 400 });
  }

  const db = await getDB();
  const result = await db
    .prepare("UPDATE leads SET status = ? WHERE id = ?")
    .bind(status, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
