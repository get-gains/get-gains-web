"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

/**
 * Client-only logout button for the admin sidebar.
 */
export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="border-border text-foreground hover:bg-secondary mt-4 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}
