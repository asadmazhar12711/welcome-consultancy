import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getDB, newId, type SlotConfigRow, type SlotRow } from "@/lib/db";
import { getEnv } from "@/lib/env";
import {
  isNonEmpty,
  isValidIndianMobile,
  normalizeMobile,
  optionalString,
} from "@/lib/validation";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function adminGate(request: NextRequest) {
  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return requireAdmin(request, secret);
}

async function readConfig(db: D1Database) {
  const row = await db
    .prepare("SELECT * FROM slot_config WHERE id = 1")
    .first<SlotConfigRow>();

  return {
    workingDays: JSON.parse(
      row?.working_days ??
        '["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]',
    ) as string[],
    startTime: row?.start_time ?? "10:00",
    endTime: row?.end_time ?? "18:00",
    slotDurationMinutes: row?.slot_duration_minutes ?? 30,
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isValidSlotTime(time: string, config: Awaited<ReturnType<typeof readConfig>>): boolean {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const start = toMinutes(config.startTime);
  const end = toMinutes(config.endTime);
  const value = toMinutes(time);
  if (value < start || value + config.slotDurationMinutes > end) return false;
  return (value - start) % config.slotDurationMinutes === 0;
}

export async function GET(request: NextRequest) {
  const db = await getDB();
  const config = await readConfig(db);
  const bookings = await db
    .prepare(
      `SELECT id, booking_date, booking_time, client_name, client_mobile, service_topic, status, created_at
       FROM consultation_slots
       WHERE status != 'Cancelled'
       ORDER BY booking_date ASC, booking_time ASC`,
    )
    .all<SlotRow>();

  const env = await getEnv();
  const secret = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  const isAdmin = !(await requireAdmin(request, secret));

  const rows = bookings.results ?? [];
  return NextResponse.json({
    config,
    bookings: isAdmin
      ? rows
      : rows.map((b) => ({
          booking_date: b.booking_date,
          booking_time: b.booking_time,
        })),
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const date = optionalString(body.date, 20);
  const time = optionalString(body.time, 10);
  const clientName = optionalString(body.clientName, 120);
  const mobileRaw = optionalString(body.mobile, 20);
  const service = optionalString(body.service, 120) || "Consultation";

  if (!date || !time || !isNonEmpty(clientName, 120) || !isValidIndianMobile(mobileRaw)) {
    return NextResponse.json(
      { error: "Date, time, client name, and valid mobile are required." },
      { status: 400 },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid booking date." }, { status: 400 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDay = new Date(`${date}T12:00:00`);
  if (Number.isNaN(bookingDay.getTime()) || bookingDay < today) {
    return NextResponse.json({ error: "Booking date must be today or later." }, { status: 400 });
  }

  const db = await getDB();
  const config = await readConfig(db);
  const dayName = DAY_NAMES[bookingDay.getDay()];
  if (!config.workingDays.includes(dayName)) {
    return NextResponse.json({ error: "Selected day is outside working hours." }, { status: 400 });
  }
  if (!isValidSlotTime(time, config)) {
    return NextResponse.json({ error: "Selected time is not an available slot." }, { status: 400 });
  }

  const mobile = normalizeMobile(mobileRaw);
  const slotId = newId("SLOT");
  const leadId = newId("LEAD-BOOK");

  try {
    await db.batch([
      db
        .prepare(
          `INSERT INTO consultation_slots
           (id, booking_date, booking_time, client_name, client_mobile, service_topic, status)
           VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')`,
        )
        .bind(slotId, date, time, clientName, mobile, service),
      db
        .prepare(
          `INSERT INTO leads (id, name, mobile, email, company, service, source, status, details)
           VALUES (?, ?, ?, NULL, 'Consultation Appointment', ?, 'Consultation Booking Calendar', 'New', ?)`,
        )
        .bind(
          leadId,
          clientName,
          mobile,
          service,
          `Booked slot for ${date} at ${time}.`,
        ),
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (/UNIQUE|constraint/i.test(message)) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another." },
        { status: 409 },
      );
    }
    console.error("Slot booking failed", err);
    return NextResponse.json({ error: "Unable to complete booking." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    booking: {
      id: slotId,
      booking_date: date,
      booking_time: time,
      client_name: clientName,
      client_mobile: mobile,
      service_topic: service,
    },
  });
}

export async function PUT(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const workingDays = body.workingDays;
  const startTime = optionalString(body.startTime, 10);
  const endTime = optionalString(body.endTime, 10);
  const slotDurationMinutes = Number(body.slotDurationMinutes);

  if (
    !Array.isArray(workingDays) ||
    !startTime ||
    !endTime ||
    !Number.isFinite(slotDurationMinutes)
  ) {
    return NextResponse.json({ error: "Invalid slot configuration." }, { status: 400 });
  }

  const db = await getDB();
  await db
    .prepare(
      `UPDATE slot_config
       SET working_days = ?, start_time = ?, end_time = ?, slot_duration_minutes = ?
       WHERE id = 1`,
    )
    .bind(JSON.stringify(workingDays), startTime, endTime, slotDurationMinutes)
    .run();

  return NextResponse.json({ success: true, config: await readConfig(db) });
}

export async function DELETE(request: NextRequest) {
  const denied = await adminGate(request);
  if (denied) return denied;

  const id = optionalString(request.nextUrl.searchParams.get("id"), 80);
  if (!id) {
    return NextResponse.json({ error: "Valid booking id is required." }, { status: 400 });
  }

  const db = await getDB();
  const result = await db
    .prepare("UPDATE consultation_slots SET status = 'Cancelled' WHERE id = ?")
    .bind(id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
