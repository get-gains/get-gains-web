import { Suspense } from "react";
import { AcceptInviteContent } from "./content";

interface AcceptInvitePageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function AcceptInvitePage({
  searchParams,
}: AcceptInvitePageProps) {
  const params = await searchParams;
  const token = params.token ?? null;

  return (
    <Suspense
      fallback={
        <div className="from-background via-background to-background/90 flex min-h-screen items-center justify-center bg-gradient-to-b p-8">
          <div className="border-border bg-card mx-auto w-full max-w-md rounded-2xl border p-8 shadow-lg">
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="bg-muted h-10 w-10 animate-pulse rounded-xl" />
              <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <AcceptInviteContent token={token} />
    </Suspense>
  );
}
