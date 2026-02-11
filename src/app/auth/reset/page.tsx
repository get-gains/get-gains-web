import { AuthError } from "@/components/auth/auth-error";
import { RedirectToApp } from "@/components/auth/redirect-to-app";
import { API_ENDPOINTS, DEEP_LINKS } from "@/lib/constants";

/**
 * Password Reset Relay Page (Server Component)
 *
 * Supabase redirects here after user clicks the reset password link in their email.
 * URL format: /auth/reset?code=xxx
 *
 * Flow:
 * 1. Extract `code` from search params
 * 2. Exchange code for session via server API (gets access + refresh tokens)
 * 3. Deep link back to Flutter app with the tokens
 * 4. Flutter app uses the access token to call POST /auth/reset-password
 *
 * Security:
 * - The PKCE code is one-time use and short-lived
 * - Exchange happens server-side (server → Supabase)
 * - Tokens are passed via deep link (device-local, not over network)
 * - The access token is a recovery token scoped to password reset
 */
export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const code = typeof params.code === "string" ? params.code : undefined;

  // No code provided — invalid link
  if (!code) {
    return (
      <AuthError
        title="Invalid Reset Link"
        message="This password reset link is invalid or has expired. Please request a new password reset from the app."
      />
    );
  }

  // Exchange the code for a session via the server
  try {
    const response = await fetch(API_ENDPOINTS.exchangeCode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.errors?.[0]?.message || "Failed to process reset link";

      return (
        <AuthError
          title="Reset Link Failed"
          message={`${errorMessage}. Please request a new password reset from the app.`}
        />
      );
    }

    const data = await response.json();
    const result = data.data;

    if (!result?.accessToken) {
      return (
        <AuthError
          title="Reset Link Expired"
          message="This password reset link has expired. Please request a new one from the app."
        />
      );
    }

    // Success! Deep link back to the Flutter app with the tokens
    const deepLink = DEEP_LINKS.resetPassword(
      result.accessToken,
      result.refreshToken,
    );

    return (
      <RedirectToApp
        deepLink={deepLink}
        title="Reset Your Password"
        message="You're being redirected to the app to set your new password."
      />
    );
  } catch (error) {
    console.error("Password reset relay error:", error);
    return (
      <AuthError
        title="Something Went Wrong"
        message="We encountered an error. Please try requesting a new password reset from the app."
      />
    );
  }
}
