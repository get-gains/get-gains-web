"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Plus,
  Loader2,
  Ban,
  CheckCircle,
  RotateCcw,
  Search,
} from "lucide-react";
import type { CoachAdminListItem, InvitationListItem } from "@/lib/admin/types";

type Tab = "coaches" | "invitations";

interface CoachesResponse {
  data: {
    coaches: CoachAdminListItem[];
    pagination: { total: number };
  };
}

interface InvitationsResponse {
  data: {
    invitations: InvitationListItem[];
    pagination: { total: number };
  };
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

function statusBadgeClasses(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-success/10 text-success";
    case "deactivated":
      return "bg-destructive/10 text-destructive";
    case "pending":
      return "bg-warning/10 text-warning";
    case "redeemed":
      return "bg-success/10 text-success";
    case "revoked":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-secondary text-foreground";
  }
}

export default function AdminManagePage() {
  const [activeTab, setActiveTab] = useState<Tab>("coaches");
  const [coaches, setCoaches] = useState<CoachAdminListItem[]>([]);
  const [invitations, setInvitations] = useState<InvitationListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteLoading, setInviteLoading] = useState<boolean>(false);
  const [inviteMessage, setInviteMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setLoading(true);
      setError("");

      try {
        const [coachesRes, invitationsRes] = await Promise.all([
          fetch("/api/admin/proxy/coaches?limit=100", { cache: "no-store" }),
          fetch("/api/admin/proxy/invitations?limit=100", {
            cache: "no-store",
          }),
        ]);

        if (!coachesRes.ok || !invitationsRes.ok) {
          throw new Error("Failed to load admin data");
        }

        const coachesJson = (await coachesRes.json()) as CoachesResponse;
        const invitationsJson =
          (await invitationsRes.json()) as InvitationsResponse;

        if (!cancelled) {
          setCoaches(coachesJson.data.coaches);
          setInvitations(invitationsJson.data.invitations);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const refresh = (): void => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreateInvite = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteMessage("");

    try {
      const response = await fetch("/api/admin/proxy/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });

      const json = (await response.json()) as {
        errors?: Array<{ message?: string }>;
      };

      if (!response.ok) {
        setInviteMessage(
          json.errors?.[0]?.message || "Failed to create invite",
        );
      } else {
        setInviteEmail("");
        setInviteMessage("Invitation created and emailed.");
        refresh();
        setActiveTab("invitations");
      }
    } catch (err) {
      setInviteMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevoke = async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `/api/admin/proxy/invitations/${id}/revoke`,
        {
          method: "PATCH",
        },
      );
      if (!response.ok) throw new Error("Failed to revoke invitation");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleDeactivate = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(
        `/api/admin/proxy/coaches/${userId}/deactivate`,
        { method: "PATCH" },
      );
      if (!response.ok) throw new Error("Failed to deactivate coach");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleActivate = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(
        `/api/admin/proxy/coaches/${userId}/activate`,
        { method: "PATCH" },
      );
      if (!response.ok) throw new Error("Failed to activate coach");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.fullName.toLowerCase().includes(search.toLowerCase()) ||
      coach.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Coaches</h1>
          <p className="text-muted-foreground">
            Invite coaches and manage existing accounts
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="border-border text-foreground hover:bg-secondary flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <form
        onSubmit={handleCreateInvite}
        className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-6 shadow-sm sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label
            htmlFor="invite-email"
            className="text-foreground mb-1 block text-sm font-medium"
          >
            Invite a new coach
          </label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              id="invite-email"
              type="email"
              required
              placeholder="coach@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border py-2.5 pr-4 pl-10 focus:ring-1 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={inviteLoading}
          className="bg-primary text-primary-foreground hover:bg-primary-hover flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 font-semibold transition-colors disabled:opacity-60"
        >
          {inviteLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {inviteLoading ? "Creating..." : "Create invite"}
        </button>
      </form>

      {inviteMessage && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            inviteMessage.includes("Failed")
              ? "bg-destructive/10 text-destructive"
              : "bg-success/10 text-success"
          }`}
        >
          {inviteMessage}
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="border-border flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("coaches")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "coaches"
              ? "border-primary text-primary"
              : "text-muted-foreground hover:text-foreground border-transparent"
          }`}
        >
          <Users className="h-4 w-4" />
          Coaches ({coaches.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("invitations")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "invitations"
              ? "border-primary text-primary"
              : "text-muted-foreground hover:text-foreground border-transparent"
          }`}
        >
          <Mail className="h-4 w-4" />
          Invitations ({invitations.length})
        </button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : activeTab === "coaches" ? (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coaches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border py-2 pr-4 pl-10 focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="border-border bg-card overflow-hidden rounded-2xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Coach</th>
                  <th className="px-6 py-3 font-medium">Experience</th>
                  <th className="px-6 py-3 font-medium">Clients</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {filteredCoaches.map((coach) => (
                  <tr key={coach.userId} className="hover:bg-secondary/50">
                    <td className="px-6 py-4">
                      <div className="text-foreground font-medium">
                        {coach.fullName}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {coach.email}
                      </div>
                    </td>
                    <td className="text-muted-foreground px-6 py-4">
                      {coach.yearsExperience ?? "—"}{" "}
                      {coach.yearsExperience === 1 ? "year" : "years"}
                    </td>
                    <td className="text-muted-foreground px-6 py-4">
                      {coach.activeClients} / {coach.maxClients}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
                          coach.status,
                        )}`}
                      >
                        {coach.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {coach.status === "active" ? (
                        <button
                          type="button"
                          onClick={() => void handleDeactivate(coach.userId)}
                          className="bg-destructive/10 text-destructive hover:bg-destructive/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => void handleActivate(coach.userId)}
                          className="bg-success/10 text-success hover:bg-success/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredCoaches.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground px-6 py-12 text-center"
                    >
                      No coaches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="border-border bg-card overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Code</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Expires</th>
                <th className="px-6 py-3 font-medium">Created by</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {invitations.map((invite) => (
                <tr key={invite.id} className="hover:bg-secondary/50">
                  <td className="text-foreground px-6 py-4 font-medium">
                    {invite.email}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 font-mono">
                    {invite.code}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
                        invite.status,
                      )}`}
                    >
                      {invite.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4">
                    {formatDate(invite.expiresAt)}
                  </td>
                  <td className="text-muted-foreground px-6 py-4">
                    {invite.createdBy?.fullName ||
                      invite.createdBy?.email ||
                      "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {invite.status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() => void handleRevoke(invite.id)}
                        className="bg-destructive/10 text-destructive hover:bg-destructive/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {invitations.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-muted-foreground px-6 py-12 text-center"
                  >
                    No invitations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
