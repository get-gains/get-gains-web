"use client";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className="hover-lift group border-border/50 bg-surface-1/80 hover:border-primary/50 relative rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gradient Background on Hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          gradient,
        )}
      />

      <div className="relative">
        <div className="bg-surface-2 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
