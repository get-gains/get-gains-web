import { createClient as createServerClient } from "./supabase/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export interface ApiResponse<T> {
  data: T;
  errors: Array<{ code: string; message: string; field?: string }>;
}

/**
 * Server-side fetch helper that attaches the current Supabase access token.
 *
 * @param path  API path relative to /api (e.g. /admin/missions)
 * @param init  Fetch init options
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || json.errors?.length) {
    const message =
      json.errors?.[0]?.message ?? `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return json.data;
}
