import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID!;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_TEAM = "team_96UJEWVeB79OIQIXeGB5MbcX";
const EDGE_CONFIG_API = `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items?teamId=${VERCEL_TEAM}`;

// Edge Config keys must be alphanumeric + _ and - only.
// Use a sha256 hash prefix to keep keys unique and valid.
function emailKey(email: string): string {
  return "wl_" + createHash("sha256").update(email).digest("hex").slice(0, 40);
}

async function emailExists(email: string): Promise<boolean> {
  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/item/${emailKey(email)}`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  );
  // 200 = found, 204 = not found (Edge Config returns 204 for missing items)
  if (res.status === 204 || res.status === 404) return false;
  if (!res.ok) throw new Error(`Edge Config read failed: ${res.status}`);
  return true;
}

async function addEmail(email: string, source: string): Promise<void> {
  const res = await fetch(EDGE_CONFIG_API, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key: emailKey(email),
          value: { email, source: source || "unknown", createdAt: new Date().toISOString() },
        },
      ],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Edge Config write failed: ${res.status} ${body}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(normalized)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (await emailExists(normalized)) {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }

    await addEmail(normalized, source);

    console.log(`[waitlist] new signup: ${normalized} source=${source || "unknown"}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
