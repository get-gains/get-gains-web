import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
