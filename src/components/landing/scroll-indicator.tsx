"use client";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
      <span className="text-muted-foreground text-xs tracking-widest uppercase">
        Scroll
      </span>
      <div className="border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2 pt-2">
        <div className="bg-primary h-3 w-1.5 animate-pulse rounded-full" />
      </div>
    </div>
  );
}
