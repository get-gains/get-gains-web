import { createClient as createBrowserClient } from "./supabase/client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export interface ApiResponse<T> {
  data: T;
  errors: Array<{ code: string; message: string; field?: string }>;
}

/**
 * Client-side fetch helper that attaches the current Supabase access token.
 *
 * @param path  API path relative to /api
 * @param init  Fetch init options
 */
export async function apiFetchClient<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const supabase = createBrowserClient();
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
