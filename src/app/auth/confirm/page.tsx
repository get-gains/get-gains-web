import { AuthError } from "@/components/auth/auth-error";
import { RedirectToApp } from "@/components/auth/redirect-to-app";
import { API_ENDPOINTS, DEEP_LINKS } from "@/lib/constants";

/**
 * Email Verification Page (Server Component)
 *
 * Supabase redirects here after user clicks the verification link in their email.
 * URL format: /auth/confirm?code=xxx
 *
 * Flow:
 * 1. Extract `code` from search params
 * 2. Exchange code for session via server API
 * 3. If successful → deep link back to Flutter app
 * 4. If failed → show error with app store fallback links
 *
 * Security:
 * - The PKCE code is one-time use and short-lived
 * - Exchange happens server-side (server → Supabase)
 * - No auth needed on the web app — it's just a relay
 */
export default async function EmailConfirmPage({
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
        title="Invalid Verification Link"
        message="This verification link is invalid or has expired. Please request a new verification email from the app."
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
        errorData?.errors?.[0]?.message || "Failed to verify email";

      return (
        <AuthError
          title="Verification Failed"
          message={`${errorMessage}. Please try clicking the link again or request a new verification email.`}
        />
      );
    }

    const data = await response.json();
    const result = data.data;

    // A successful code exchange means the email is verified.
    // The server returns { accessToken, refreshToken, user } on success.
    if (!result?.accessToken) {
      return (
        <AuthError
          title="Verification Failed"
          message="We couldn't verify your email. The link may have expired. Please request a new verification email from the app."
        />
      );
    }

    // Success! Deep link back to the Flutter app
    return (
      <RedirectToApp
        deepLink={DEEP_LINKS.emailVerified}
        title="Email Verified!"
        message="Your email has been successfully verified. You can now log in to Get Gains."
      />
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return (
      <AuthError
        title="Something Went Wrong"
        message="We encountered an error while verifying your email. Please try again later."
      />
    );
  }
}
