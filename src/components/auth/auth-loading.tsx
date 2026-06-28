import Image from "next/image";

/**
 * Loading state shown while the web app processes the auth token.
 * Displayed briefly before redirecting to the Flutter app.
 */
export function AuthLoading({ message }: { message: string }) {
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
