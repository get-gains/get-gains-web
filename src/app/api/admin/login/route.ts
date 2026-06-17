import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  const res = await fetch(`${API_BASE}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = (await res.json()) as {
    data?: { accessToken?: string; refreshToken?: string };
    errors?: Array<{ message: string }>;
  };

  if (!res.ok || json.errors?.length) {
    return NextResponse.json(
      { errors: json.errors ?? [{ message: "Login failed" }] },
      { status: res.status || 401 },
    );
  }

  const { accessToken, refreshToken } = json.data ?? {};

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { errors: [{ message: "Missing tokens" }] },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return NextResponse.json(
      { errors: [{ message: error.message }] },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: { success: true } });
}
