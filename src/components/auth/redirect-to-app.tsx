/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IOS_APP_STORE_URL, ANDROID_PLAY_STORE_URL } from "@/lib/constants";

/**
 * Client component that attempts to open the Flutter app via deep link.
 * Shows a fallback UI with manual "Open App" button and app store links
 * if the deep link doesn't trigger within a timeout.
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
        <Image
          src="/getgains-logo.png"
          alt="Get Gains"
          width={64}
          height={64}
          className="mx-auto"
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
