import Image from "next/image";
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
        <Image
          src="/getgains-logo.png"
          alt="Get Gains"
          width={64}
          height={64}
          className="mx-auto"
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
