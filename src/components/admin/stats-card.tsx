import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
}

/**
 * Large metric card for the admin dashboard.
 */
export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="border-border from-card to-secondary rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-transform hover:-translate-y-1">
      <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
      <p className="text-foreground mt-1 text-3xl font-bold tracking-tight">
        {value}
      </p>
      {subtitle && (
        <p className="text-muted-foreground mt-2 text-xs">{subtitle}</p>
      )}
    </div>
  );
}
