"use client";

interface EmptyChartStateProps {
  message: string;
}

/**
 * Placeholder shown when a chart has no data for the selected period.
 */
export function EmptyChartState({ message }: EmptyChartStateProps) {
  return (
    <div className="border-border bg-muted/30 flex h-64 items-center justify-center rounded-xl border border-dashed">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
