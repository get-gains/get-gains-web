import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_REFRESH_COOKIE,
  refreshAdminAccessToken,
} from "@/lib/admin/auth.server";

/**
 * POST /api/admin/auth/refresh
 *
 * Refreshes the admin access token using the HttpOnly refresh cookie
 * (or an explicit refresh token in the body).
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => ({}))) as {
    refreshToken?: string;
  };
  const cookieStore = await cookies();
  const refreshToken =
    body.refreshToken || cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { errors: [{ message: "Refresh token required" }] },
      { status: 401 },
    );
  }

  const session = await refreshAdminAccessToken(refreshToken);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: "Session expired" }] },
      { status: 401 },
    );
  }

  return NextResponse.json({ data: { user: session.user } });
}
