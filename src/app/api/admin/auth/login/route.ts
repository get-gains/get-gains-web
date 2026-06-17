import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/constants";
import { setAdminSession } from "@/lib/admin/auth.server";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      supabase_auth_id: string;
      email: string;
      full_name: string;
    };
  };
}

/**
 * POST /api/admin/auth/login
 *
 * Forwards admin credentials to the Get Gains API and stores the returned
 * Supabase tokens in HttpOnly cookies.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as { email?: string; password?: string };

  const response = await fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({
      errors: [{ message: "Login failed" }],
    }))) as { errors?: Array<{ message?: string }> };
    return NextResponse.json(data, { status: response.status });
  }

  const json = (await response.json()) as LoginResponse;
  const { accessToken, refreshToken, user } = json.data;

  await setAdminSession(accessToken, refreshToken, user);

  return NextResponse.json({ data: { user } });
}
