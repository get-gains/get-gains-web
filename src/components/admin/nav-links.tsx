"use client";
import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Target, Sparkles } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/missions", label: "Missions & Partners", icon: Target },
  { href: "/admin/cosmetics", label: "Cosmetics", icon: Sparkles },
  { href: "/admin/manage", label: "Manage Coaches", icon: Users },
];

/**
 * Client-side admin navigation links with active state.
 */
export function AdminNavLinks(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-4 py-4">
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
