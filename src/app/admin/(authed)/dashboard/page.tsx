import {
  Dumbbell,
  Users,
  Mail,
  Activity,
  TrendingUp,
  Award,
} from "lucide-react";
import { adminApiRequest } from "@/lib/admin/api";
import { StatsCard } from "@/components/admin/stats-card";
import type { AnalyticsResponse } from "@/lib/admin/types";

export const metadata = {
  title: "Admin Dashboard — Get Gains",
};

export default async function AdminDashboardPage() {
  const analytics = await adminApiRequest<AnalyticsResponse>(
    "GET",
    "/admin/analytics",
  );

  const periodLabel = `${new Date(analytics.period.start).toLocaleDateString()} — ${new Date(analytics.period.end).toLocaleDateString()}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">{periodLabel}</p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Coaches</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Coaches"
            value={analytics.coaches.total}
            subtitle={`${analytics.coaches.active} active · ${analytics.coaches.deactivated} deactivated`}
            icon={Dumbbell}
          />
          <StatsCard
            title="Onboarded (30d)"
            value={analytics.coaches.onboardedThisPeriod}
            subtitle="New coach profiles"
            icon={TrendingUp}
          />
          <StatsCard
            title="Avg Clients / Coach"
            value={analytics.coaches.avgClientsPerCoach}
            subtitle="Active client relationships"
            icon={Users}
          />
          <StatsCard
            title="Pending Invites"
            value={analytics.invitations.pending}
            subtitle={`${analytics.invitations.redeemedThisPeriod} redeemed this period`}
            icon={Mail}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Users</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={analytics.users.total}
            subtitle={`${analytics.users.newThisPeriod} new this period`}
            icon={Users}
          />
          <StatsCard
            title="Subscribed"
            value={analytics.users.subscribed}
            subtitle={`${analytics.users.free} free users`}
            icon={Award}
          />
          <StatsCard
            title="Subscribed w/ Coach"
            value={analytics.users.subscribedWithCoach}
            subtitle={`${analytics.users.subscribedWithoutCoach} without a coach`}
            icon={Users}
          />
          <StatsCard
            title="Subscribed w/ Program"
            value={analytics.users.subscribedWithProgram}
            subtitle={`${analytics.users.subscribedWithoutProgram} without a program`}
            icon={Activity}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Engagement</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Workouts (30d)"
            value={analytics.engagement.workoutsCompletedThisPeriod}
            subtitle="Completed sessions"
            icon={Activity}
          />
          <StatsCard
            title="Avg Workouts / User"
            value={analytics.engagement.avgWorkoutsPerUserThisPeriod}
            subtitle="Over the last 30 days"
            icon={TrendingUp}
          />
        </div>
      </section>

      {analytics.coaches.top5ByClientWorkouts.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            Top Coaches by Client Workouts
          </h2>
          <div className="border-border bg-card overflow-hidden rounded-2xl border">
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
                  <tr key={coach.coachId} className="hover:bg-secondary/50">
                    <td className="text-foreground px-6 py-3 font-medium">
                      {coach.fullName}
                    </td>
                    <td className="text-muted-foreground px-6 py-3">
                      {coach.email}
                    </td>
                    <td className="text-primary px-6 py-3 text-right font-bold">
                      {coach.workouts}
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
