"use client";
import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Target, Sparkles, Shield } from "lucide-react";
import type { AdminScope } from "@/lib/admin/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  scope?: AdminScope;
}

const navItems: NavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    scope: "manage_analytics",
  },
  {
    href: "/admin/missions",
    label: "Missions & Partners",
    icon: Target,
    scope: "manage_missions",
  },
  {
    href: "/admin/cosmetics",
    label: "Cosmetics",
    icon: Sparkles,
    scope: "manage_cosmetics",
  },
  {
    href: "/admin/manage",
    label: "Manage",
    icon: Users,
    scope: "manage_coaches",
  },
  {
    href: "/admin/manage",
    label: "Manage Admins",
    icon: Shield,
    scope: "manage_admins",
  },
];

interface AdminNavLinksProps {
  scopes: AdminScope[];
}

function hasScope(scopes: AdminScope[], scope?: AdminScope): boolean {
  if (!scope) return true;
  return scopes.includes("super_admin") || scopes.includes(scope);
}

/**
 * Client-side admin navigation links with active state and scope gating.
 */
export function AdminNavLinks({
  scopes,
}: AdminNavLinksProps): React.JSX.Element {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) => hasScope(scopes, item.scope));

  return (
    <nav className="flex-1 space-y-1 px-4 py-4">
      {visibleItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href + item.label}
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
