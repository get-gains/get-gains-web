"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const PERIODS = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
  { label: "1Y", value: 365 },
] as const;

interface PeriodSelectorProps {
  days: number;
}

/**
 * Pill-style period selector that updates the `days` query parameter.
 */
export function PeriodSelector({ days }: PeriodSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setDays = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", String(value));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="border-border bg-card inline-flex items-center gap-1 rounded-xl border p-1 shadow-sm">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          type="button"
          onClick={() => setDays(period.value)}
          className={cn(
            "relative z-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
            "font-[family-name:var(--font-oswald)] tracking-wide uppercase",
            days === period.value
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary",
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
