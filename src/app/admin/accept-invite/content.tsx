"use client";

import { useEffect, useState, useRef } from "react";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type InviteStatus =
  | "loading"
  | "requires_auth"
  | "success"
  | "error"
  | "no_token";

interface AcceptResponse {
  data?: {
    accepted?: boolean;
    scopes?: string[];
    requiresAuth?: boolean;
    email?: string;
  };
  errors?: Array<{ message?: string }>;
}

interface AcceptInviteContentProps {
  token: string | null;
}

export function AcceptInviteContent({ token }: AcceptInviteContentProps) {
  const router = useRouter();
  const requested = useRef(false);

  const [status, setStatus] = useState<InviteStatus>(
    token ? "loading" : "no_token",
  );
  const [message, setMessage] = useState<string>(
    token ? "" : "No invitation token provided.",
  );
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [acceptedScopes, setAcceptedScopes] = useState<string[]>([]);

  useEffect(() => {
    if (!token || requested.current) return;
    requested.current = true;

    const body = JSON.stringify({ token });

    const tryAccept = async (): Promise<AcceptResponse> => {
      let res = await fetch("/api/admin/proxy/admins/invitations/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        cache: "no-store",
      });

      if (res.status === 401) {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
        res = await fetch(`${apiUrl}/admin/admins/invitations/accept`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          cache: "no-store",
        });
      }

      return res.json() as Promise<AcceptResponse>;
    };

    tryAccept()
      .then((json) => {
        if (json.data?.accepted) {
          setStatus("success");
          setAcceptedScopes(json.data.scopes ?? []);
          setMessage("Invitation accepted! You now have admin access.");
        } else if (json.data?.requiresAuth) {
          setStatus("requires_auth");
          setInviteEmail(json.data.email ?? "");
          setMessage(
            `You've been invited as an admin. Sign in with ${json.data.email ?? "your email"} to accept.`,
          );
        } else if (json.errors?.length) {
          setStatus("error");
          setMessage(json.errors[0]?.message || "Failed to accept invitation.");
        } else {
          setStatus("error");
          setMessage("Failed to accept invitation.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Network error. Please try again.");
      });
  }, [token]);

  useEffect(() => {
    if (status !== "success") return;

    const logoutAndRedirect = async () => {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    };

    const timer = setTimeout(() => {
      void logoutAndRedirect();
    }, 1500);

    return () => clearTimeout(timer);
  }, [status, router]);

  return (
    <div className="from-background via-background to-background/90 flex min-h-screen items-center justify-center bg-gradient-to-b p-8">
      <div className="border-border bg-card mx-auto w-full max-w-md rounded-2xl border p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center">
          <div className="from-primary to-warning text-primary-foreground flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br">
            <Dumbbell className="h-8 w-8" />
          </div>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
            <p className="text-muted-foreground text-sm">
              Verifying your invitation...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle className="text-success h-12 w-12" />
            <h1 className="text-foreground text-xl font-bold">
              Invitation Accepted
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              {message}
            </p>
            {acceptedScopes.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1">
                {acceptedScopes.map((scope) => (
                  <span
                    key={scope}
                    className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium"
                  >
                    {scope.replace("manage_", "").replace("_", " ")}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col items-center gap-2 pt-2">
              <Loader2 className="text-primary h-5 w-5 animate-spin" />
              <p className="text-muted-foreground text-xs">
                Redirecting to login...
              </p>
            </div>
          </div>
        )}

        {status === "requires_auth" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="bg-warning/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Dumbbell className="text-warning h-6 w-6" />
            </div>
            <h1 className="text-foreground text-xl font-bold">
              Admin Invitation
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              {message}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href={`/admin/login?invite_token=${encodeURIComponent(token ?? "")}`}
                className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors"
              >
                Sign in as {inviteEmail || "admin"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-muted-foreground text-center text-xs">
                Don&apos;t have an account? Create one with{" "}
                {inviteEmail || "the invited email"} and then return to this
                link.
              </p>
            </div>
          </div>
        )}

        {(status === "error" || status === "no_token") && (
          <div className="flex flex-col items-center gap-4 py-4">
            <XCircle className="text-destructive h-12 w-12" />
            <h1 className="text-foreground text-xl font-bold">
              Invitation Error
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              {message}
            </p>
            <Link
              href="/admin/login"
              className="text-muted-foreground hover:text-foreground mt-2 text-sm underline underline-offset-4"
            >
              Return to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
