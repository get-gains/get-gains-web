"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Glassmorphism card wrapper for dashboard charts.
 */
export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-card/80 relative overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-sm",
        "hover:shadow-primary/5 transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="via-primary/30 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mb-5">
        <h3 className="text-foreground font-[family-name:var(--font-oswald)] text-xl font-semibold tracking-wide uppercase">
          {title}
        </h3>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
