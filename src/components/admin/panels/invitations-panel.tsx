"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartCard } from "@/components/admin/chart-card";
import { ChartTooltip } from "@/components/admin/chart-tooltip";
import { EmptyChartState } from "@/components/admin/empty-chart-state";
import {
  COLORS,
  formatDateLabel,
} from "@/components/admin/analytics-constants";
import type { AnalyticsResponse } from "@/lib/admin/types";

interface InvitationsPanelProps {
  analytics: AnalyticsResponse;
  secondaryTab: string;
}

/**
 * Invitation visualizations: status distribution and redemption trends.
 */
export function InvitationsPanel({
  analytics,
  secondaryTab,
}: InvitationsPanelProps) {
  const invitationStatusData = [
    {
      name: "Pending",
      value: analytics.invitations.pending,
      color: COLORS.blue,
    },
    {
      name: "Revoked",
      value: analytics.invitations.revoked,
      color: COLORS.cream,
    },
    {
      name: "Redeemed",
      value: analytics.invitations.totalRedeemed,
      color: COLORS.primary,
    },
  ];

  return (
    <>
      {secondaryTab === "status" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard
            title="Invitation Status"
            subtitle="Lifetime invitation distribution"
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip content={<ChartTooltip />} />
                <Pie
                  data={invitationStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  stroke="none"
                >
                  {invitationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              {invitationStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground text-sm">
                    {item.name}
                  </span>
                  <span className="text-foreground font-[family-name:var(--font-oswald)] text-lg font-semibold">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Invitation Summary" subtitle="Quick breakdown">
            <div className="flex h-[280px] flex-col justify-center gap-5">
              {invitationStatusData.map((item) => (
                <div
                  key={item.name}
                  className="border-border bg-card flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-foreground font-[family-name:var(--font-oswald)] text-2xl font-bold">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {secondaryTab === "redemptions" && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Redemptions"
            subtitle="Invitations redeemed per day"
          >
            {analytics.invitationSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={analytics.invitationSeries}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(1 0 0 / 0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDateLabel}
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="redeemedInvites"
                    name="Redeemed"
                    fill={COLORS.primary}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No redemption data for this period." />
            )}
          </ChartCard>
        </div>
      )}
    </>
  );
}
