import { redirect } from "next/navigation";
import { API_URL } from "@/lib/constants";
import {
  clearAdminSession,
  getAdminSession,
  refreshAdminAccessToken,
} from "./auth.server";

export type AdminApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

/**
 * Make an authenticated server-side request to the Get Gains admin API.
 *
 * Automatically refreshes the access token on 401 and redirects to login if
 * the refresh token is invalid or missing.
 */
export async function adminApiRequest<T>(
  method: AdminApiMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const makeRequest = (token: string): Promise<Response> => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    const init: RequestInit = {
      method,
      headers,
      cache: "no-store",
    };

    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }

    return fetch(`${API_URL}${path}`, init);
  };

  let response = await makeRequest(session.accessToken);

  if (response.status === 401) {
    const refreshed = await refreshAdminAccessToken(session.refreshToken);
    if (!refreshed) {
      await clearAdminSession();
      redirect("/admin/login");
    }
    response = await makeRequest(refreshed.accessToken);
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as {
      errors?: Array<{ message?: string }>;
    } | null;
    const message =
      errorData?.errors?.[0]?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const json = (await response.json()) as { data: T };
  return json.data;
}
