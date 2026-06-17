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

interface CoachesPanelProps {
  analytics: AnalyticsResponse;
  secondaryTab: string;
}

/**
 * Coach visualizations: roster health and top performer rankings.
 */
export function CoachesPanel({ analytics, secondaryTab }: CoachesPanelProps) {
  const coachRosterData = [
    { name: "Active", value: analytics.coaches.active, color: COLORS.mint },
    {
      name: "Deactivated",
      value: analytics.coaches.deactivated,
      color: COLORS.cream,
    },
  ];

  return (
    <>
      {secondaryTab === "roster" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard
            title="Roster Status"
            subtitle="Active vs deactivated coaches"
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip content={<ChartTooltip />} />
                <Pie
                  data={coachRosterData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  stroke="none"
                >
                  {coachRosterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-6">
              {coachRosterData.map((item) => (
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

          <ChartCard title="New Coaches" subtitle="Coach onboarding over time">
            {analytics.coachSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={analytics.coachSeries}>
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
                    dataKey="newCoaches"
                    name="New Coaches"
                    fill={COLORS.blue}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No new coach data for this period." />
            )}
          </ChartCard>
        </div>
      )}

      {secondaryTab === "performance" && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Top Coaches"
            subtitle="By client workouts completed this period"
          >
            {analytics.coaches.top5ByClientWorkouts.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={[...analytics.coaches.top5ByClientWorkouts].reverse()}
                  layout="vertical"
                  margin={{ left: 24 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(1 0 0 / 0.08)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="fullName"
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="workouts"
                    name="Workouts"
                    fill={COLORS.primary}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No coach workout data for this period." />
            )}
          </ChartCard>
        </div>
      )}
    </>
  );
}
