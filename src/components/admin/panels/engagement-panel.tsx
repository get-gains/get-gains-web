"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartCard } from "@/components/admin/chart-card";
import { ChartTooltip } from "@/components/admin/chart-tooltip";
import { EmptyChartState } from "@/components/admin/empty-chart-state";
import {
  COLORS,
  formatDateLabel,
} from "@/components/admin/analytics-constants";
import type { AnalyticsResponse } from "@/lib/admin/types";

interface EngagementPanelProps {
  analytics: AnalyticsResponse;
  secondaryTab: string;
}

/**
 * Engagement visualizations: workout volume and per-user consistency.
 */
export function EngagementPanel({
  analytics,
  secondaryTab,
}: EngagementPanelProps) {
  return (
    <>
      {secondaryTab === "volume" && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Workout Volume"
            subtitle="Completed workouts per day"
          >
            {analytics.engagementSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={analytics.engagementSeries}>
                  <defs>
                    <linearGradient
                      id="workoutGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS.primary}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS.primary}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="workoutsCompleted"
                    name="Workouts"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    fill="url(#workoutGradient)"
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No workout data for this period." />
            )}
          </ChartCard>
        </div>
      )}

      {secondaryTab === "consistency" && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Consistency"
            subtitle="Average workouts per user per day"
          >
            {analytics.engagementSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={analytics.engagementSeries}>
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
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="avgWorkoutsPerUser"
                    name="Avg / User"
                    stroke={COLORS.mint}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No consistency data for this period." />
            )}
          </ChartCard>
        </div>
      )}
    </>
  );
}
