export type AdminApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface AdminApiResponse<T> {
  data: T;
  errors: Array<{ code: string; message: string; field?: string }>;
}

/**
 * Client-side fetch helper for the admin proxy.
 *
 * Sends requests to `/api/admin/proxy/*` so the browser automatically includes
 * the admin session cookies. Unwraps the standard `{ data, errors }` envelope.
 *
 * @param path   API path relative to `/api/admin/proxy`
 * @param init   Fetch init options
 * @returns      Unwrapped `data`
 * @throws       Error with the first error message on failure
 */
export async function adminFetchClient<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body !== undefined && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`/api/admin/proxy${path}`, {
    ...init,
    headers,
  });

  const json = (await res.json()) as AdminApiResponse<T>;

  if (!res.ok || json.errors?.length) {
    const message =
      json.errors?.[0]?.message ?? `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return json.data;
}
