"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Award,
  Calendar,
  Dumbbell,
  Mail,
  TrendingUp,
  Users,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodSelector } from "@/components/admin/period-selector";
import { EngagementPanel } from "@/components/admin/panels/engagement-panel";
import { UsersPanel } from "@/components/admin/panels/users-panel";
import { CoachesPanel } from "@/components/admin/panels/coaches-panel";
import { InvitationsPanel } from "@/components/admin/panels/invitations-panel";
import { formatNumber } from "@/components/admin/analytics-constants";
import type { AnalyticsResponse } from "@/lib/admin/types";

type PrimaryTab = "engagement" | "users" | "coaches" | "invitations";

const PRIMARY_TABS: {
  value: PrimaryTab;
  label: string;
  icon: typeof Activity;
}[] = [
  { value: "engagement", label: "Engagement", icon: Activity },
  { value: "users", label: "Users", icon: Users },
  { value: "coaches", label: "Coaches", icon: Dumbbell },
  { value: "invitations", label: "Invitations", icon: Mail },
];

const SECONDARY_TABS: Record<PrimaryTab, string[]> = {
  engagement: ["volume", "consistency"],
  users: ["growth", "composition"],
  coaches: ["roster", "performance"],
  invitations: ["status", "redemptions"],
};

interface DashboardShellProps {
  analytics: AnalyticsResponse;
}

/**
 * Interactive admin dashboard shell with primary/secondary tabs and Recharts visualizations.
 */
export function DashboardShell({ analytics }: DashboardShellProps) {
  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>("engagement");
  const [secondaryTabRaw, setSecondaryTabRaw] = useState<string>(
    SECONDARY_TABS.engagement[0],
  );

  const secondaryTab = useMemo(() => {
    const valid = SECONDARY_TABS[primaryTab];
    return valid.includes(secondaryTabRaw) ? secondaryTabRaw : valid[0];
  }, [primaryTab, secondaryTabRaw]);

  const periodLabel = useMemo(
    () =>
      `${new Date(analytics.period.start).toLocaleDateString()} — ${new Date(analytics.period.end).toLocaleDateString()}`,
    [analytics.period],
  );

  const engagementPeak = useMemo(() => {
    if (!analytics.engagementSeries.length) return 0;
    return Math.max(
      ...analytics.engagementSeries.map((d) => d.workoutsCompleted),
    );
  }, [analytics.engagementSeries]);

  const engagementActiveDays = useMemo(
    () =>
      analytics.engagementSeries.filter((d) => d.workoutsCompleted > 0).length,
    [analytics.engagementSeries],
  );

  const kpiCards = useMemo(() => {
    switch (primaryTab) {
      case "engagement":
        return [
          {
            label: "Workouts",
            value: formatNumber(
              analytics.engagement.workoutsCompletedThisPeriod,
            ),
            subtitle: "Completed sessions",
            icon: Activity,
          },
          {
            label: "Avg / User",
            value: formatNumber(
              analytics.engagement.avgWorkoutsPerUserThisPeriod,
            ),
            subtitle: "Across all users",
            icon: TrendingUp,
          },
          {
            label: "Peak Day",
            value: formatNumber(engagementPeak),
            subtitle: "Most workouts in one day",
            icon: Calendar,
          },
          {
            label: "Active Days",
            value: formatNumber(engagementActiveDays),
            subtitle: "Days with completed workouts",
            icon: Dumbbell,
          },
        ];
      case "users":
        return [
          {
            label: "Total Users",
            value: formatNumber(analytics.users.total),
            subtitle: `${formatNumber(analytics.users.newThisPeriod)} new this period`,
            icon: Users,
          },
          {
            label: "Subscribed",
            value: formatNumber(analytics.users.subscribed),
            subtitle: `${formatNumber(analytics.users.free)} free users`,
            icon: Award,
          },
          {
            label: "With Coach",
            value: formatNumber(analytics.users.subscribedWithCoach),
            subtitle: `${formatNumber(analytics.users.subscribedWithoutCoach)} without a coach`,
            icon: Users,
          },
          {
            label: "With Program",
            value: formatNumber(analytics.users.subscribedWithProgram),
            subtitle: `${formatNumber(analytics.users.subscribedWithoutProgram)} without a program`,
            icon: Activity,
          },
        ];
      case "coaches":
        return [
          {
            label: "Total Coaches",
            value: formatNumber(analytics.coaches.total),
            subtitle: `${formatNumber(analytics.coaches.active)} active · ${formatNumber(analytics.coaches.deactivated)} deactivated`,
            icon: Dumbbell,
          },
          {
            label: "Onboarded",
            value: formatNumber(analytics.coaches.onboardedThisPeriod),
            subtitle: "New coach profiles",
            icon: TrendingUp,
          },
          {
            label: "Avg Clients / Coach",
            value: formatNumber(analytics.coaches.avgClientsPerCoach),
            subtitle: "Active client relationships",
            icon: Users,
          },
          {
            label: "Pending Invites",
            value: formatNumber(analytics.invitations.pending),
            subtitle: `${formatNumber(analytics.invitations.redeemedThisPeriod)} redeemed this period`,
            icon: Mail,
          },
        ];
      case "invitations":
        return [
          {
            label: "Pending",
            value: formatNumber(analytics.invitations.pending),
            subtitle: "Awaiting redemption",
            icon: Mail,
          },
          {
            label: "Redeemed (period)",
            value: formatNumber(analytics.invitations.redeemedThisPeriod),
            subtitle: "New coach signups",
            icon: TrendingUp,
          },
          {
            label: "Revoked",
            value: formatNumber(analytics.invitations.revoked),
            subtitle: "Canceled invitations",
            icon: Activity,
          },
          {
            label: "Total Redeemed",
            value: formatNumber(analytics.invitations.totalRedeemed),
            subtitle: "All-time coach invites",
            icon: Award,
          },
        ];
      default:
        return [];
    }
  }, [primaryTab, analytics, engagementPeak, engagementActiveDays]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-foreground font-[family-name:var(--font-oswald)] text-4xl font-bold tracking-tight uppercase">
            Command Center
          </h1>
          <p className="text-muted-foreground">{periodLabel}</p>
        </div>
        <PeriodSelector days={analytics.period.days} />
      </div>

      <div className="border-border bg-card/50 rounded-2xl border p-2 backdrop-blur-sm">
        <Tabs
          value={primaryTab}
          onValueChange={(v) => setPrimaryTab(v as PrimaryTab)}
        >
          <TabsList className="h-auto w-full flex-wrap gap-2 bg-transparent p-0 sm:flex-nowrap">
            {PRIMARY_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:text-primary flex-1 gap-2 rounded-xl border border-transparent py-3 text-base tracking-wide uppercase data-[state=active]:shadow"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="border-border bg-card/80 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="via-primary/30 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
            <div className="bg-primary/10 text-primary mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
              <kpi.icon className="h-4 w-4" />
            </div>
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {kpi.label}
            </p>
            <p className="text-foreground font-[family-name:var(--font-oswald)] text-3xl font-bold tracking-tight">
              {kpi.value}
            </p>
            {kpi.subtitle && (
              <p className="text-muted-foreground mt-1 text-xs">
                {kpi.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-border bg-card/30 rounded-2xl border p-2 backdrop-blur-sm">
        <Tabs value={secondaryTab} onValueChange={setSecondaryTabRaw}>
          <TabsList className="h-auto w-full flex-wrap gap-2 bg-transparent p-0 sm:w-auto">
            {SECONDARY_TABS[primaryTab].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-5 py-2 text-sm font-medium tracking-wide uppercase"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {primaryTab === "engagement" && (
        <EngagementPanel analytics={analytics} secondaryTab={secondaryTab} />
      )}
      {primaryTab === "users" && (
        <UsersPanel analytics={analytics} secondaryTab={secondaryTab} />
      )}
      {primaryTab === "coaches" && (
        <CoachesPanel analytics={analytics} secondaryTab={secondaryTab} />
      )}
      {primaryTab === "invitations" && (
        <InvitationsPanel analytics={analytics} secondaryTab={secondaryTab} />
      )}

      {analytics.coaches.top5ByClientWorkouts.length > 0 && (
        <section>
          <h2 className="text-foreground mb-4 font-[family-name:var(--font-oswald)] text-2xl font-bold tracking-wide uppercase">
            Top Coaches by Client Workouts
          </h2>
          <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Coach</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 text-right font-medium">Workouts</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {analytics.coaches.top5ByClientWorkouts.map((coach) => (
                  <tr
                    key={coach.coachId}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <td className="text-foreground px-6 py-3 font-medium">
                      {coach.fullName}
                    </td>
                    <td className="text-muted-foreground px-6 py-3">
                      {coach.email}
                    </td>
                    <td className="text-primary px-6 py-3 text-right font-bold">
                      {coach.workouts.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
