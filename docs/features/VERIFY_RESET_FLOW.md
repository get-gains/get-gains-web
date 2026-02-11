# Email Verification & Password Reset Flows — Web App Implementation

> **Status**: 🔮 Ready for Implementation  
> **Last Updated**: February 11, 2026  
> **Covers**: Supabase client setup, `/auth/confirm` page, `/auth/reset` page, deep linking to Flutter app  
> **Depends On**: [CONTEXT.md](../CONTEXT.md), [Server VERIFY_RESET_FLOW.md](../../get-gains-server/docs/features/VERIFY_RESET_FLOW.md)

---

## Overview

### Purpose

The web app acts as an **intermediary** between Supabase email links and the Flutter mobile app. It handles two flows:

1. **Email Verification** — User clicks verification link in email → lands on web app → web app exchanges code with server → deep links back to Flutter app with success status.
2. **Password Reset** — User clicks reset link in email → lands on web app → web app exchanges code with server to get access token → deep links back to Flutter app with the access token for the reset password screen.

### Current State

| Component             | Status       | Notes                                                         |
| --------------------- | ------------ | ------------------------------------------------------------- |
| Supabase packages     | ✅ Installed | `@supabase/ssr` and `@supabase/supabase-js` in `package.json` |
| Supabase client setup | ❌ Missing   | No `src/lib/supabase/` directory exists                       |
| `/auth/confirm` route | ❌ Missing   | No auth routes exist                                          |
| `/auth/reset` route   | ❌ Missing   | No auth routes exist                                          |
| Environment variables | ❌ Missing   | No `.env.local` or `.env.example` file                        |
| Deep link logic       | ❌ Missing   | No deep linking code exists                                   |
| Constants file        | ❌ Missing   | No `src/lib/constants.ts`                                     |

### What Gets Created

| File                                      | Type      | Purpose                                        |
| ----------------------------------------- | --------- | ---------------------------------------------- |
| `.env.example`                            | Config    | Document required environment variables        |
| `.env.local`                              | Config    | Local environment variable values              |
| `src/lib/constants.ts`                    | Utility   | App-wide constants (API URL, deep link scheme) |
| `src/app/auth/confirm/page.tsx`           | Page      | Email verification handler (Server Component)  |
| `src/app/auth/reset/page.tsx`             | Page      | Password reset handler (Server Component)      |
| `src/components/auth/redirect-to-app.tsx` | Component | Client component for deep link + fallback UI   |
| `src/components/auth/auth-error.tsx`      | Component | Error state UI component                       |
| `src/components/auth/auth-loading.tsx`    | Component | Loading state UI component                     |

---

## Architecture

### Email Verification Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                        USER'S EMAIL INBOX                           │
│                                                                     │
│   "Click here to verify your email"                                │
│    Link: https://web-app.com/auth/confirm?code=pkce-code-xxx       │
└────────────────────────────────────────┬───────────────────────────┘
                                         │
                                    User clicks
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────┐
│                    WEB APP: /auth/confirm                           │
│                    (Server Component)                               │
│                                                                     │
│   1. Extract `code` from URL search params                         │
│   2. POST to server: /api/auth/exchange-code { code }              │
│   3. Server exchanges code with Supabase → returns session         │
│   4. Check response.emailVerified === true                          │
│                                                                     │
│   Success:                                                          │
│   → Render <RedirectToApp> with deep link:                         │
│     getgains://auth/email-verified                                 │
│                                                                     │
│   Error:                                                            │
│   → Render <AuthError> with retry / app store links                │
└────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────┐
│                    FLUTTER APP                                      │
│                                                                     │
│   Deep link received: getgains://auth/email-verified               │
│   → Show "Email Verified" screen                                   │
│   → Navigate to login                                              │
└────────────────────────────────────────────────────────────────────┘
```

### Password Reset Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                        USER'S EMAIL INBOX                           │
│                                                                     │
│   "Click here to reset your password"                              │
│    Link: https://web-app.com/auth/reset?code=pkce-code-xxx         │
└────────────────────────────────────────┬───────────────────────────┘
                                         │
                                    User clicks
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────┐
│                    WEB APP: /auth/reset                             │
│                    (Server Component)                               │
│                                                                     │
│   1. Extract `code` from URL search params                         │
│   2. POST to server: /api/auth/exchange-code { code }              │
│   3. Server exchanges code with Supabase → returns session         │
│   4. Get accessToken + refreshToken from response                  │
│                                                                     │
│   Success:                                                          │
│   → Render <RedirectToApp> with deep link:                         │
│     getgains://auth/reset-password                                 │
│       ?access_token=xxx&refresh_token=xxx                          │
│                                                                     │
│   Error:                                                            │
│   → Render <AuthError> with retry / support info                   │
└────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌────────────────────────────────────────────────────────────────────┐
│                    FLUTTER APP                                      │
│                                                                     │
│   Deep link received: getgains://auth/reset-password?...           │
│   → Extract access_token                                           │
│   → Show Reset Password screen (new password + confirm)            │
│   → POST /auth/reset-password with Bearer token                   │
│   → On success: logout → navigate to login                        │
└────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### Step 1: Environment Variables

**File**: `.env.example` (create)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Web App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Get Gains Server API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Flutter App Deep Link Scheme
NEXT_PUBLIC_APP_DEEP_LINK_SCHEME=getgains

# App Store URLs (for fallback when deep link fails)
NEXT_PUBLIC_IOS_APP_STORE_URL=https://apps.apple.com/app/get-gains/id0000000000
NEXT_PUBLIC_ANDROID_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.getgains.app
```

**File**: `.env.local` (create from `.env.example` with actual values)

---

### Step 2: Constants File

**File**: `src/lib/constants.ts` (create)

```typescript
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
```

---

### Step 3: Shared Auth Components

#### Loading Component

**File**: `src/components/auth/auth-loading.tsx` (create)

```tsx
/**
 * Loading state shown while the web app processes the auth token.
 * Displayed briefly before redirecting to the Flutter app.
 */
export function AuthLoading({ message }: { message: string }) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <img
          src="/getgains-logo.png"
          alt="Get Gains"
          className="mx-auto h-16 w-16"
        />

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
        </div>

        {/* Message */}
        <p className="text-muted-foreground text-lg">{message}</p>
      </div>
    </div>
  );
}
```

#### Error Component

**File**: `src/components/auth/auth-error.tsx` (create)

```tsx
import { IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from "@/lib/constants";

/**
 * Error state shown when token exchange fails.
 * Provides app store links as fallback.
 */
export function AuthError({
  title,
  message,
  showAppLinks = true,
}: {
  title: string;
  message: string;
  showAppLinks?: boolean;
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <img
          src="/getgains-logo.png"
          alt="Get Gains"
          className="mx-auto h-16 w-16"
        />

        {/* Error Icon */}
        <div className="bg-destructive/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-destructive h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-foreground text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        {/* App Store Links */}
        {showAppLinks && (
          <div className="space-y-4 pt-4">
            <p className="text-muted-foreground text-sm">
              Download the Get Gains app:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={IOS_APP_STORE_URL}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 text-sm font-medium transition-colors"
              >
                App Store
              </a>
              <a
                href={ANDROID_PLAY_STORE_URL}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 text-sm font-medium transition-colors"
              >
                Google Play
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Redirect to App Component (Client Component)

**File**: `src/components/auth/redirect-to-app.tsx` (create)

```tsx
"use client";

import { useEffect, useState } from "react";
import { IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from "@/lib/constants";

/**
 * Client component that attempts to open the Flutter app via deep link.
 * Shows a fallback UI with manual "Open App" button and app store links
 * if the deep link doesn't trigger within a timeout.
 *
 * Props:
 * - deepLink: The full deep link URL (e.g., getgains://auth/email-verified)
 * - title: Success message title
 * - message: Success message body
 */
export function RedirectToApp({
  deepLink,
  title,
  message,
}: {
  deepLink: string;
  title: string;
  message: string;
}) {
  const [showFallback, setShowFallback] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (attempted) return;
    setAttempted(true);

    // Attempt to open the app via deep link
    window.location.href = deepLink;

    // If the deep link didn't open the app within 2 seconds, show fallback
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [deepLink, attempted]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <img
          src="/getgains-logo.png"
          alt="Get Gains"
          className="mx-auto h-16 w-16"
        />

        {/* Success Icon */}
        <div className="bg-accent mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-accent-foreground h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-foreground text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        {/* Redirect Status */}
        {!showFallback ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
            <p className="text-muted-foreground text-sm">
              Opening Get Gains app...
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            {/* Manual Open Button */}
            <a
              href={deepLink}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block w-full rounded-md px-6 py-3 text-sm font-medium transition-colors"
            >
              Open in Get Gains App
            </a>

            {/* Fallback: App not installed */}
            <div className="border-border space-y-3 border-t pt-4">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have the app? Download it:
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={IOS_APP_STORE_URL}
                  className="border-border text-foreground hover:bg-secondary rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                >
                  App Store
                </a>
                <a
                  href={ANDROID_PLAY_STORE_URL}
                  className="border-border text-foreground hover:bg-secondary rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Step 4: Email Verification Page

**File**: `src/app/auth/confirm/page.tsx` (create)

This is a **Server Component** that handles the email verification flow.

```tsx
import { AuthError } from "@/components/auth/auth-error";
import { AuthLoading } from "@/components/auth/auth-loading";
import { RedirectToApp } from "@/components/auth/redirect-to-app";
import { API_ENDPOINTS, DEEP_LINKS } from "@/lib/constants";

/**
 * Email Verification Page
 *
 * Supabase redirects here after user clicks the verification link in their email.
 * URL format: /auth/confirm?code=xxx
 *
 * Flow:
 * 1. Extract `code` from search params
 * 2. Exchange code for session via server API
 * 3. If successful, deep link back to Flutter app
 * 4. If failed, show error with app store fallback links
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

    if (!result?.emailVerified) {
      return (
        <AuthError
          title="Email Not Verified"
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
```

---

### Step 5: Password Reset Page

**File**: `src/app/auth/reset/page.tsx` (create)

This is a **Server Component** that handles the password reset relay.

```tsx
import { AuthError } from "@/components/auth/auth-error";
import { RedirectToApp } from "@/components/auth/redirect-to-app";
import { API_ENDPOINTS, DEEP_LINKS } from "@/lib/constants";

/**
 * Password Reset Relay Page
 *
 * Supabase redirects here after user clicks the reset password link in their email.
 * URL format: /auth/reset?code=xxx
 *
 * Flow:
 * 1. Extract `code` from search params
 * 2. Exchange code for session via server API (gets access token)
 * 3. Deep link back to Flutter app with the access token
 * 4. Flutter app uses the access token to call POST /auth/reset-password
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
```

---

## Page Design

Both pages follow the same visual pattern, using the app's dark theme:

```
┌─────────────────────────────────────────┐
│              (dark background)           │
│                                         │
│           [Get Gains Logo]              │
│                                         │
│           ✅ (or ❌ for error)          │
│                                         │
│        Email Verified!                  │
│   Your email has been successfully      │
│   verified. You can now log in.         │
│                                         │
│        ⏳ Opening Get Gains app...      │
│                                         │
│   ─ ─ ─ after 2s timeout ─ ─ ─         │
│                                         │
│     [ Open in Get Gains App ]           │
│                                         │
│     Don't have the app?                 │
│     [ App Store ] [ Google Play ]       │
│                                         │
└─────────────────────────────────────────┘
```

---

## File Structure

After implementation:

```
src/
├── app/
│   ├── auth/
│   │   ├── confirm/
│   │   │   └── page.tsx          ← Email verification (Server Component)
│   │   └── reset/
│   │       └── page.tsx          ← Password reset relay (Server Component)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   │   ├── auth-error.tsx        ← Error state UI
│   │   ├── auth-loading.tsx      ← Loading state UI
│   │   └── redirect-to-app.tsx   ← Deep link + fallback (Client Component)
│   ├── landing/
│   ├── layout/
│   ├── three/
│   └── ui/
├── lib/
│   ├── constants.ts              ← API URLs, deep link scheme, store links
│   └── utils.ts                  ← Existing cn() utility
└── hooks/
```

---

## Deep Link Format

| Flow           | Deep Link URL                                                       | Purpose                            |
| -------------- | ------------------------------------------------------------------- | ---------------------------------- |
| Email Verified | `getgains://auth/email-verified`                                    | Tell app email was verified        |
| Password Reset | `getgains://auth/reset-password?access_token=xxx&refresh_token=xxx` | Give app tokens for password reset |

> **Note**: The deep link scheme (`getgains`) must match what's configured in the Flutter app's Android manifest and iOS Info.plist. See the [Flutter App VERIFY_RESET_FLOW.md](../../get_gains_app/docs/features/VERIFY_RESET_FLOW.md) for deep link setup.

---

## Environment Variables Summary

| Variable                             | Description                  | Example                       |
| ------------------------------------ | ---------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`           | Supabase project URL         | `https://xxx.supabase.co`     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase anonymous key       | `eyJ...`                      |
| `NEXT_PUBLIC_APP_URL`                | This web app's URL           | `http://localhost:3000`       |
| `NEXT_PUBLIC_API_URL`                | Get Gains Server API URL     | `http://localhost:3001/api`   |
| `NEXT_PUBLIC_APP_DEEP_LINK_SCHEME`   | Flutter app deep link scheme | `getgains`                    |
| `NEXT_PUBLIC_IOS_APP_STORE_URL`      | iOS App Store link           | `https://apps.apple.com/...`  |
| `NEXT_PUBLIC_ANDROID_PLAY_STORE_URL` | Google Play Store link       | `https://play.google.com/...` |

---

## Implementation Checklist

- [ ] Create `.env.example` with all required variables
- [ ] Create `.env.local` with actual development values
- [ ] Create `src/lib/constants.ts` with API URLs, deep link scheme, store links
- [ ] Create `src/components/auth/auth-loading.tsx`
- [ ] Create `src/components/auth/auth-error.tsx`
- [ ] Create `src/components/auth/redirect-to-app.tsx` (Client Component with deep link logic)
- [ ] Create `src/app/auth/confirm/page.tsx` (Server Component — email verification)
- [ ] Create `src/app/auth/reset/page.tsx` (Server Component — password reset relay)
- [ ] Test email verification flow end-to-end
- [ ] Test password reset flow end-to-end
- [ ] Test fallback UI when app is not installed
- [ ] Verify deep links work on both Android and iOS
- [ ] Update [FEATURE_INDEX.md](../FEATURE_INDEX.md) with new routes

---

## Testing

### Local Development

1. Set `NEXT_PUBLIC_API_URL` to your local server (e.g., `http://localhost:3001/api`)
2. In Supabase Dashboard, add `http://localhost:3000/auth/confirm` and `http://localhost:3000/auth/reset` to redirect URLs
3. Register a new user → check email → click verification link → should land on `localhost:3000/auth/confirm?code=xxx`
4. Request password reset → check email → click reset link → should land on `localhost:3000/auth/reset?code=xxx`

### Deep Link Testing

- **Android**: Deep links won't work in browser unless app is installed. Test the fallback UI shows correctly after 2s timeout.
- **iOS**: Same as Android. Test deep link behavior in Safari.
- **Desktop browser**: Deep link will fail (expected). Verify fallback UI with app store links renders properly.

---

## Error Handling

| Scenario                            | Behavior                                              |
| ----------------------------------- | ----------------------------------------------------- |
| No `code` in URL                    | Show "Invalid Link" error with app store links        |
| Expired/invalid code                | Show "Link Expired" error with retry suggestion       |
| Server unreachable                  | Show "Something Went Wrong" error                     |
| Deep link fails (app not installed) | After 2s, show "Open in App" button + app store links |
| Network error during fetch          | Caught by try/catch, shows generic error              |

---

## Related Documentation

| Document                                                                                 | Purpose                           |
| ---------------------------------------------------------------------------------------- | --------------------------------- |
| [CONTEXT.md](../CONTEXT.md)                                                              | Web app architecture and patterns |
| [Server VERIFY_RESET_FLOW.md](../../get-gains-server/docs/features/VERIFY_RESET_FLOW.md) | Server-side implementation        |
| [Flutter VERIFY_RESET_FLOW.md](../../get_gains_app/docs/features/VERIFY_RESET_FLOW.md)   | Flutter app implementation        |
| [Flutter DESIGN_STYLE.md](../../get_gains_app/docs/DESIGN_STYLE.md)                      | Shared design system              |

---

_Last updated: February 11, 2026_
