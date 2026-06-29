import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/constants";
import type { AdminScope } from "@/lib/admin/types";

export const ADMIN_ACCESS_COOKIE = "admin_access_token";
export const ADMIN_REFRESH_COOKIE = "admin_refresh_token";
export const ADMIN_USER_COOKIE = "admin_user";

export interface AdminUser {
  supabase_auth_id: string;
  email: string;
  full_name: string;
  scopes: AdminScope[];
}

export interface AdminSession {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

interface RefreshResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: AdminUser;
  };
}

const isProduction = process.env.NODE_ENV === "production";

const baseCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict" as const,
  path: "/",
};

/**
 * Read the current admin session from HttpOnly cookies.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;
  const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;
  const userRaw = cookieStore.get(ADMIN_USER_COOKIE)?.value;

  if (!accessToken || !refreshToken || !userRaw) {
    return null;
  }

  try {
    const user = JSON.parse(decodeURIComponent(userRaw)) as AdminUser;
    return { accessToken, refreshToken, user };
  } catch {
    return null;
  }
}

/**
 * Check whether an admin session holds a specific scope.
 * `super_admin` scope automatically grants all scopes.
 */
export function hasScope(session: AdminSession, scope: AdminScope): boolean {
  return (
    session.user.scopes.includes("super_admin") ||
    session.user.scopes.includes(scope)
  );
}

/**
 * Require an admin session or redirect to the login page.
 */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

/**
 * Set all admin session cookies.
 */
export async function setAdminSession(
  accessToken: string,
  refreshToken: string,
  user: AdminUser,
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_ACCESS_COOKIE, accessToken, {
    ...baseCookieOptions,
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set(ADMIN_REFRESH_COOKIE, refreshToken, {
    ...baseCookieOptions,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  cookieStore.set(ADMIN_USER_COOKIE, encodeURIComponent(JSON.stringify(user)), {
    ...baseCookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });
}

/**
 * Clear all admin session cookies.
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ACCESS_COOKIE);
  cookieStore.delete(ADMIN_REFRESH_COOKIE);
  cookieStore.delete(ADMIN_USER_COOKIE);
}

/**
 * Exchange a refresh token for a new access/refresh token pair.
 * Updates cookies on success.
 */
export async function refreshAdminAccessToken(
  refreshToken: string,
): Promise<AdminSession | null> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as RefreshResponse;
    const { accessToken, refreshToken: newRefreshToken, user } = json.data;

    await setAdminSession(accessToken, newRefreshToken, user);

    return { accessToken, refreshToken: newRefreshToken, user };
  } catch {
    return null;
  }
}
