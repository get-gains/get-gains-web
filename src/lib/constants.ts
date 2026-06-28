/**
 * App-wide constants for the Get Gains web app.
 */

/** Get Gains Server API base URL */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/** Flutter app deep link scheme */
export const DEEP_LINK_SCHEME =
  process.env.NEXT_PUBLIC_APP_DEEP_LINK_SCHEME || "getgains";

/** App Store URLs for fallback */
export const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_STORE_URL ||
  "https://apps.apple.com/app/get-gains/id0000000000";
export const ANDROID_PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.getgains.app";

/** Deep link paths */
export const DEEP_LINKS = {
  emailVerified: `${DEEP_LINK_SCHEME}://auth/email-verified`,
  resetPassword: (accessToken: string, refreshToken: string) =>
    `${DEEP_LINK_SCHEME}://auth/reset-password?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`,
} as const;

/** Server API endpoints */
export const API_ENDPOINTS = {
  exchangeCode: `${API_URL}/auth/exchange-code`,
} as const;
