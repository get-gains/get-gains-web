import { Oswald } from "next/font/google";
import { AdminSidebar } from "@/components/admin/sidebar";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminAuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${oswald.variable} bg-background flex min-h-screen`}>
      <AdminSidebar />
      <main className="bg-gradient-mesh bg-grid relative flex-1 overflow-auto p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.66_0.2_38/0.06),transparent_50%)]" />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
