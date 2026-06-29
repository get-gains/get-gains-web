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
  Shield,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  CoachAdminListItem,
  InvitationListItem,
  AdminWithScopes,
  AdminInvitation as AdminInvitationType,
  AdminScope,
} from "@/lib/admin/types";

type MainTab = "coaches" | "admins";
type AdminSubTab = "list" | "invitations";

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

interface AdminsResponse {
  data: {
    admins: AdminWithScopes[];
  };
}

interface AdminInvitationsData {
  data: {
    invitations: AdminInvitationType[];
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
    case "accepted":
      return "bg-success/10 text-success";
    case "revoked":
      return "bg-muted text-muted-foreground";
    case "expired":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-secondary text-foreground";
  }
}

function scopeBadgeClass(): string {
  return "bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium";
}

const ADMIN_SCOPES: AdminScope[] = [
  "manage_coaches",
  "manage_cosmetics",
  "manage_missions",
  "manage_partners",
  "manage_analytics",
  "manage_uploads",
];

function scopeLabel(scope: AdminScope): string {
  return scope.replace("manage_", "").replace("_", " ");
}

export default function AdminManagePage() {
  const [mainTab, setMainTab] = useState<MainTab>("coaches");
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>("list");

  const [coaches, setCoaches] = useState<CoachAdminListItem[]>([]);
  const [invitations, setInvitations] = useState<InvitationListItem[]>([]);
  const [admins, setAdmins] = useState<AdminWithScopes[]>([]);
  const [adminInvitations, setAdminInvitations] = useState<
    AdminInvitationType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteLoading, setInviteLoading] = useState<boolean>(false);
  const [inviteMessage, setInviteMessage] = useState<string>("");

  const [adminInviteEmail, setAdminInviteEmail] = useState<string>("");
  const [adminInviteScopes, setAdminInviteScopes] = useState<Set<AdminScope>>(
    new Set(ADMIN_SCOPES),
  );
  const [adminInviteLoading, setAdminInviteLoading] = useState<boolean>(false);
  const [adminInviteMessage, setAdminInviteMessage] = useState<string>("");

  const [removeLoading, setRemoveLoading] = useState<string | null>(null);

  const [canManageAdmins, setCanManageAdmins] = useState<boolean>(false);
  const [scopesFetched, setScopesFetched] = useState<boolean>(false);

  const [editingAdmin, setEditingAdmin] = useState<AdminWithScopes | null>(
    null,
  );
  const [editScopes, setEditScopes] = useState<Set<AdminScope>>(new Set());
  const [scopesLoading, setScopesLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setLoading(true);
      setError("");

      try {
        const [coachesRes, invitationsRes, ...rest] = await Promise.all([
          fetch("/api/admin/proxy/coaches?limit=100", { cache: "no-store" }),
          fetch("/api/admin/proxy/invitations?limit=100", {
            cache: "no-store",
          }),
          fetch("/api/admin/proxy/auth/me", { cache: "no-store" }),
        ]);

        const isAdminsTab = mainTab === "admins";
        let adminsRes: Response | undefined;
        let adminInvitesRes: Response | undefined;

        if (isAdminsTab) {
          [adminsRes, adminInvitesRes] = await Promise.all([
            fetch("/api/admin/proxy/admins", { cache: "no-store" }),
            fetch("/api/admin/proxy/admins/invitations?limit=100", {
              cache: "no-store",
            }),
          ]);
        }

        if (!cancelled) {
          const coachesJson = (await coachesRes.json()) as CoachesResponse;
          setCoaches(coachesJson.data.coaches);

          const invitationsJson =
            (await invitationsRes.json()) as InvitationsResponse;
          setInvitations(invitationsJson.data.invitations);

          if (isAdminsTab && adminsRes) {
            const adminsJson = (await adminsRes.json()) as AdminsResponse;
            setAdmins(adminsJson.data.admins ?? []);
          }
          if (isAdminsTab && adminInvitesRes) {
            const adminInvJson =
              (await adminInvitesRes.json()) as AdminInvitationsData;
            setAdminInvitations(adminInvJson.data.invitations ?? []);
          }

          const meRes = rest[0];
          if (meRes.ok) {
            const meJson = (await meRes.json()) as {
              data: { user: { scopes: AdminScope[] } };
            };
            const scopes = meJson.data.user.scopes;
            setCanManageAdmins(
              scopes.includes("super_admin") ||
                scopes.includes("manage_admins"),
            );
          }
          setScopesFetched(true);
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
  }, [refreshKey, mainTab]);

  const refresh = (): void => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCreateCoachInvite = async (
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
        setMainTab("coaches");
      }
    } catch (err) {
      setInviteMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevokeCoachInvite = async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `/api/admin/proxy/invitations/${id}/revoke`,
        { method: "PATCH" },
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

  const handleCreateAdminInvite = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (adminInviteScopes.size === 0) return;
    setAdminInviteLoading(true);
    setAdminInviteMessage("");

    try {
      const response = await fetch("/api/admin/proxy/admins/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminInviteEmail,
          scopes: Array.from(adminInviteScopes),
        }),
      });

      const json = (await response.json()) as {
        errors?: Array<{ message?: string }>;
      };

      if (!response.ok) {
        setAdminInviteMessage(
          json.errors?.[0]?.message || "Failed to create admin invite",
        );
      } else {
        setAdminInviteEmail("");
        setAdminInviteScopes(new Set(ADMIN_SCOPES));
        setAdminInviteMessage("Admin invitation created and emailed.");
        refresh();
        setAdminSubTab("invitations");
      }
    } catch (err) {
      setAdminInviteMessage(
        err instanceof Error ? err.message : "Unknown error",
      );
    } finally {
      setAdminInviteLoading(false);
    }
  };

  const handleRevokeAdminInvite = async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `/api/admin/proxy/admins/invitations/${id}/revoke`,
        { method: "PATCH" },
      );
      if (!response.ok) throw new Error("Failed to revoke admin invitation");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleRemoveAdmin = async (userId: string): Promise<void> => {
    if (
      !window.confirm(
        "Are you sure you want to remove this admin? Their scopes will be deleted and they will lose admin access.",
      )
    )
      return;

    setRemoveLoading(userId);
    try {
      const response = await fetch(`/api/admin/proxy/admins/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const json = (await response.json()) as {
          errors?: Array<{ message?: string }>;
        };
        throw new Error(json.errors?.[0]?.message || "Failed to remove admin");
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRemoveLoading(null);
    }
  };

  const handleDeactivateAdmin = async (userId: string): Promise<void> => {
    setRemoveLoading(userId);
    try {
      const response = await fetch(
        `/api/admin/proxy/admins/${userId}/deactivate`,
        { method: "PATCH" },
      );
      if (!response.ok) {
        const json = (await response.json()) as {
          errors?: Array<{ message?: string }>;
        };
        throw new Error(
          json.errors?.[0]?.message || "Failed to deactivate admin",
        );
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRemoveLoading(null);
    }
  };

  const handleActivateAdmin = async (userId: string): Promise<void> => {
    setRemoveLoading(userId);
    try {
      const response = await fetch(
        `/api/admin/proxy/admins/${userId}/activate`,
        { method: "PATCH" },
      );
      if (!response.ok) {
        const json = (await response.json()) as {
          errors?: Array<{ message?: string }>;
        };
        throw new Error(
          json.errors?.[0]?.message || "Failed to reactivate admin",
        );
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRemoveLoading(null);
    }
  };

  const toggleAdminScope = (scope: AdminScope): void => {
    setAdminInviteScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) {
        next.delete(scope);
      } else {
        next.add(scope);
      }
      return next;
    });
  };

  const openEditScopes = (admin: AdminWithScopes): void => {
    const nonSuperAdminScopes = admin.scopes.filter(
      (s) => s !== "super_admin",
    ) as AdminScope[];
    setEditingAdmin(admin);
    setEditScopes(new Set(nonSuperAdminScopes));
  };

  const toggleEditScope = (scope: AdminScope): void => {
    setEditScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) {
        next.delete(scope);
      } else {
        next.add(scope);
      }
      return next;
    });
  };

  const handleUpdateAdminScopes = async (userId: string): Promise<void> => {
    if (editScopes.size === 0) return;
    setScopesLoading(true);
    try {
      const response = await fetch(`/api/admin/proxy/admins/${userId}/scopes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scopes: Array.from(editScopes) }),
      });
      if (!response.ok) {
        const json = (await response.json()) as {
          errors?: Array<{ message?: string }>;
        };
        throw new Error(json.errors?.[0]?.message || "Failed to update scopes");
      }
      setEditingAdmin(null);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setScopesLoading(false);
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
          <h1 className="text-3xl font-bold tracking-tight">Manage</h1>
          <p className="text-muted-foreground">
            Coaches, invitations, and admin users
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

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Main tabs */}
      <div className="border-border flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setMainTab("coaches")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            mainTab === "coaches"
              ? "border-primary text-primary"
              : "text-muted-foreground hover:text-foreground border-transparent"
          }`}
        >
          <Users className="h-4 w-4" />
          Coaches
        </button>
        {(!scopesFetched || canManageAdmins) && (
          <button
            type="button"
            onClick={() => setMainTab("admins")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              mainTab === "admins"
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <Shield className="h-4 w-4" />
            Admins
          </button>
        )}
      </div>

      {/* Coaches tab */}
      {mainTab === "coaches" && (
        <>
          <form
            onSubmit={handleCreateCoachInvite}
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

          {/* Sub-tabs for coaches */}
          <div className="border-border flex gap-2 border-b">
            <button
              type="button"
              onClick={() => {}} // coaches list is always visible
              className="border-primary text-primary flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium"
            >
              <Users className="h-4 w-4" />
              List ({coaches.length})
            </button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : (
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
                      <th className="px-6 py-3 text-right font-medium">
                        Actions
                      </th>
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
                              onClick={() =>
                                void handleDeactivate(coach.userId)
                              }
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

              {/* Invitations table */}
              <div className="border-border bg-card mt-6 overflow-hidden rounded-2xl border">
                <div className="bg-secondary text-muted-foreground border-border border-b px-6 py-3 text-sm font-medium">
                  Coach Invitations
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Expires</th>
                      <th className="px-6 py-3 font-medium">Created by</th>
                      <th className="px-6 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {invitations.map((invite) => (
                      <tr key={invite.id} className="hover:bg-secondary/50">
                        <td className="text-foreground px-6 py-4 font-medium">
                          {invite.email}
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
                              onClick={() =>
                                void handleRevokeCoachInvite(invite.id)
                              }
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
                          colSpan={5}
                          className="text-muted-foreground px-6 py-12 text-center"
                        >
                          No invitations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Admins tab */}
      {mainTab === "admins" && (
        <>
          {/* Admin sub-tabs */}
          <div className="border-border flex gap-2 border-b">
            <button
              type="button"
              onClick={() => setAdminSubTab("list")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                adminSubTab === "list"
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admins ({admins.length})
            </button>
            <button
              type="button"
              onClick={() => setAdminSubTab("invitations")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                adminSubTab === "invitations"
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              <Mail className="h-4 w-4" />
              Invitations ({adminInvitations.length})
            </button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : adminSubTab === "list" ? (
            <div className="space-y-6">
              <div className="border-border bg-card overflow-hidden rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Admin</th>
                      <th className="px-6 py-3 font-medium">Scopes</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Joined</th>
                      <th className="px-6 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {admins.map((admin) => (
                      <tr
                        key={admin.supabase_auth_id}
                        className="hover:bg-secondary/50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-foreground font-medium">
                            {admin.full_name}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {admin.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {admin.scopes.map((scope) => (
                              <span key={scope} className={scopeBadgeClass()}>
                                {scope === "super_admin"
                                  ? "super admin"
                                  : scopeLabel(scope)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              admin.status === "active"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {admin.status}
                          </span>
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {formatDate(admin.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {!admin.scopes.includes("super_admin") && (
                            <div className="flex items-center justify-end gap-1">
                              {admin.status === "active" ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => openEditScopes(admin)}
                                    className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      void handleDeactivateAdmin(
                                        admin.supabase_auth_id,
                                      )
                                    }
                                    disabled={
                                      removeLoading === admin.supabase_auth_id
                                    }
                                    className="bg-warning/10 text-warning hover:bg-warning/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60"
                                  >
                                    {removeLoading ===
                                    admin.supabase_auth_id ? (
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                      <Ban className="h-3.5 w-3.5" />
                                    )}
                                    Deactivate
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      void handleActivateAdmin(
                                        admin.supabase_auth_id,
                                      )
                                    }
                                    disabled={
                                      removeLoading === admin.supabase_auth_id
                                    }
                                    className="bg-success/10 text-success hover:bg-success/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60"
                                  >
                                    {removeLoading ===
                                    admin.supabase_auth_id ? (
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                      <CheckCircle className="h-3.5 w-3.5" />
                                    )}
                                    Reactivate
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      void handleRemoveAdmin(
                                        admin.supabase_auth_id,
                                      )
                                    }
                                    disabled={
                                      removeLoading === admin.supabase_auth_id
                                    }
                                    className="bg-destructive/10 text-destructive hover:bg-destructive/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Remove
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {admins.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-muted-foreground px-6 py-12 text-center"
                        >
                          No admins found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateAdminInvite}
                className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm"
              >
                <div>
                  <label
                    htmlFor="admin-invite-email"
                    className="text-foreground mb-1 block text-sm font-medium"
                  >
                    Invite a new admin
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                      id="admin-invite-email"
                      type="email"
                      required
                      placeholder="admin@example.com"
                      value={adminInviteEmail}
                      onChange={(e) => setAdminInviteEmail(e.target.value)}
                      className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border py-2.5 pr-4 pl-10 focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-foreground mb-2 block text-sm font-medium">
                    Permission Scopes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ADMIN_SCOPES.map((scope) => (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => toggleAdminScope(scope)}
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          adminInviteScopes.has(scope)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {scopeLabel(scope)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <button
                    type="submit"
                    disabled={
                      adminInviteLoading || adminInviteScopes.size === 0
                    }
                    className="bg-primary text-primary-foreground hover:bg-primary-hover flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 font-semibold transition-colors disabled:opacity-60"
                  >
                    {adminInviteLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {adminInviteLoading ? "Creating..." : "Send invitation"}
                  </button>
                </div>
              </form>

              {adminInviteMessage && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    adminInviteMessage.includes("Failed")
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {adminInviteMessage}
                </div>
              )}

              <div className="border-border bg-card overflow-hidden rounded-2xl border">
                <div className="bg-secondary text-muted-foreground border-border border-b px-6 py-3 text-sm font-medium">
                  Admin Invitations
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Scopes</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Expires</th>
                      <th className="px-6 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {adminInvitations.map((invite) => (
                      <tr key={invite.id} className="hover:bg-secondary/50">
                        <td className="text-foreground px-6 py-4 font-medium">
                          {invite.email}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {invite.scopes.map((scope) => (
                              <span key={scope} className={scopeBadgeClass()}>
                                {scopeLabel(scope)}
                              </span>
                            ))}
                          </div>
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
                        <td className="px-6 py-4 text-right">
                          {invite.status === "PENDING" && (
                            <button
                              type="button"
                              onClick={() =>
                                void handleRevokeAdminInvite(invite.id)
                              }
                              className="bg-destructive/10 text-destructive hover:bg-destructive/20 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                            >
                              <Ban className="h-3.5 w-3.5" />
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {adminInvitations.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-muted-foreground px-6 py-12 text-center"
                        >
                          No admin invitations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <Dialog
        open={editingAdmin !== null}
        onOpenChange={(open) => {
          if (!open) setEditingAdmin(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Scopes — {editingAdmin?.full_name ?? editingAdmin?.email}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-muted-foreground text-sm">
              Toggle the permission scopes for this admin. Changes take effect
              on their next login.
            </p>
            <div className="flex flex-wrap gap-2">
              {ADMIN_SCOPES.map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => toggleEditScope(scope)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    editScopes.has(scope)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {scopeLabel(scope)}
                </button>
              ))}
            </div>
            {editScopes.size === 0 && (
              <p className="text-destructive text-xs">
                At least one scope is required.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingAdmin(null)}
              className="border-border text-foreground hover:bg-secondary rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                editingAdmin &&
                void handleUpdateAdminScopes(editingAdmin.supabase_auth_id)
              }
              disabled={scopesLoading || editScopes.size === 0}
              className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {scopesLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {scopesLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
