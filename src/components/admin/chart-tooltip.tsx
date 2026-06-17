"use client";

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

/**
 * Custom Recharts tooltip styled for the dark athletic command center theme.
 */
export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const formattedLabel =
    typeof label === "string" && label.includes("T")
      ? new Date(label).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })
      : label;

  return (
    <div className="border-border bg-card/95 rounded-xl border p-3 shadow-xl backdrop-blur-md">
      <p className="text-foreground mb-2 text-sm font-medium">
        {formattedLabel}
      </p>
      <div className="space-y-1">
        {payload.map((entry: TooltipPayloadItem, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="text-foreground font-semibold">
              {typeof entry.value === "number"
                ? entry.value.toLocaleString()
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
