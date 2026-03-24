import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VERCEL_TEAM = "team_96UJEWVeB79OIQIXeGB5MbcX";

export async function GET() {
  const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID!;
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
  try {
    const res = await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items?teamId=${VERCEL_TEAM}`,
      {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error(`Edge Config read failed: ${res.status}`);
    const items = await res.json();
    // Count only waitlist entries (keys starting with "wl_")
    const count = Array.isArray(items)
      ? items.filter((item: { key: string }) => item.key.startsWith("wl_")).length
      : 0;
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[waitlist/count] error:", err);
    return NextResponse.json({ count: 0 });
  }
}
