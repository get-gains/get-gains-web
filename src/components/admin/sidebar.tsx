import Link from "next/link";
import { LayoutDashboard, Users, Dumbbell } from "lucide-react";
import { requireAdminSession } from "@/lib/admin/auth.server";
import { AdminLogoutButton } from "./logout-button";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/manage", label: "Manage Coaches", icon: Users },
];

/**
 * Admin sidebar with navigation and user info.
 */
export async function AdminSidebar() {
  const session = await requireAdminSession();

  return (
    <aside className="border-border bg-card flex h-screen w-64 flex-col border-r">
      <div className="flex items-center gap-2 p-6">
        <div className="from-primary to-warning text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
          <Dumbbell className="h-6 w-6" />
        </div>
        <span className="text-lg font-bold tracking-tight">Get Gains</span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-border border-t p-4">
        <p className="text-foreground truncate text-sm font-semibold">
          {session.user.full_name || session.user.email}
        </p>
        <p className="text-muted-foreground truncate text-xs">
          {session.user.email}
        </p>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
