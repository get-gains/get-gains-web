import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/admin/auth.server";

/**
 * POST /api/admin/auth/logout
 *
 * Clears all admin session cookies.
 */
export async function POST(): Promise<NextResponse> {
  await clearAdminSession();
  return NextResponse.json({ data: { success: true } });
}
