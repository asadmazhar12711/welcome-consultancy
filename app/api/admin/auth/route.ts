import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import {
  createAdminSessionToken,
  timingSafeEqualString,
} from "@/lib/admin-auth";
import { optionalString } from "@/lib/validation";

export const runtime = "edge";

async function sessionSecret(): Promise<string> {
  const env = await getEnv();
  return env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const password = optionalString(body.password, 120);
  const expected = await sessionSecret();

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the Worker." },
      { status: 503 },
    );
  }

  if (!timingSafeEqualString(password, expected)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = await createAdminSessionToken(expected);
  const secure = new URL(request.url).protocol === "https:";
  const response = NextResponse.json({ success: true });
  response.cookies.set("wc_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  const secure = new URL(request.url).protocol === "https:";
  const response = NextResponse.json({ success: true });
  response.cookies.set("wc_admin", "", {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 0,
  });
  return response;
}
