"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

interface UsersPanelProps {
  analytics: AnalyticsResponse;
  secondaryTab: string;
}

/**
 * User visualizations: growth trends and subscription composition.
 */
export function UsersPanel({ analytics, secondaryTab }: UsersPanelProps) {
  const userCompositionData = [
    {
      name: "Subscribed",
      value: analytics.users.subscribed,
      color: COLORS.primary,
    },
    { name: "Free", value: analytics.users.free, color: COLORS.muted },
  ];

  const subscriptionComparisonData = [
    {
      name: "Coach",
      with: analytics.users.subscribedWithCoach,
      without: analytics.users.subscribedWithoutCoach,
    },
    {
      name: "Program",
      with: analytics.users.subscribedWithProgram,
      without: analytics.users.subscribedWithoutProgram,
    },
  ];

  return (
    <>
      {secondaryTab === "growth" && (
        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="User Growth"
            subtitle="New signups and cumulative users"
          >
            {analytics.userSeries.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={analytics.userSeries}>
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
                    yAxisId="left"
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="oklch(1 0 0 / 0.3)"
                    tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: 16 }}
                    formatter={(value) => (
                      <span className="text-muted-foreground text-xs">
                        {value}
                      </span>
                    )}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="newUsers"
                    name="New Users"
                    fill={COLORS.primary}
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulativeUsers"
                    name="Cumulative Users"
                    stroke={COLORS.cream}
                    strokeWidth={3}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState message="No user growth data for this period." />
            )}
          </ChartCard>
        </div>
      )}

      {secondaryTab === "composition" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard
            title="Subscription Mix"
            subtitle="Subscribed vs free users"
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip content={<ChartTooltip />} />
                <Pie
                  data={userCompositionData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  stroke="none"
                >
                  {userCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-6">
              {userCompositionData.map((item) => (
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

          <ChartCard
            title="Subscription Services"
            subtitle="Subscribed users with coach or program"
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={subscriptionComparisonData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(1 0 0 / 0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="oklch(1 0 0 / 0.3)"
                  tick={{ fill: "oklch(0.7 0 0)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="oklch(1 0 0 / 0.3)"
                  tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 16 }}
                  formatter={(value) => (
                    <span className="text-muted-foreground text-xs">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="with"
                  name="With"
                  fill={COLORS.mint}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="without"
                  name="Without"
                  fill={COLORS.muted}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </>
  );
}
