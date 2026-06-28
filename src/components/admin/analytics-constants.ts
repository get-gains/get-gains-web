export const COLORS = {
  primary: "#E8844A",
  cream: "#F5E6B3",
  mint: "#4ADE80",
  blue: "#3B82F6",
  purple: "#A855F7",
  muted: "#71717A",
} as const;

export function formatDateLabel(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function formatNumber(value: number) {
  return Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1);
}
