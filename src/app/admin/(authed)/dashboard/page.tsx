import { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import type { AnalyticsResponse } from "@/lib/admin/types";

export const metadata: Metadata = {
  title: "Admin Dashboard — Get Gains",
};

interface DashboardPageProps {
  searchParams: Promise<{ days?: string }>;
}

export default async function AdminDashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { days } = await searchParams;
  const daysParam = days ? Number.parseInt(days, 10) : 30;
  const validDays = [7, 30, 90, 365].includes(daysParam) ? daysParam : 30;

  if (days && Number.parseInt(days, 10) !== validDays) {
    redirect(`/admin/dashboard?days=${validDays}`);
  }

  const analytics = await adminApiRequest<AnalyticsResponse>(
    "GET",
    `/admin/analytics?days=${validDays}`,
  );

  return <DashboardShell analytics={analytics} />;
}
