"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/missions", label: "Missions & Partners" },
  { href: "/admin/cosmetics", label: "Cosmetics" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card w-64 border-r p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Get Gains Admin</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={pathname.startsWith(item.href) ? "default" : "ghost"}
            className={cn("w-full justify-start", {
              "bg-primary text-primary-foreground": pathname.startsWith(
                item.href,
              ),
            })}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
