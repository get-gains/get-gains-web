"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

/**
 * Admin login page.
 *
 * Credentials are forwarded to /api/admin/auth/login which sets HttpOnly
 * cookies and returns the admin user on success.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = (await response.json()) as {
        errors?: ApiError[];
      };

      if (!response.ok) {
        setError(json.errors?.[0]?.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-background bg-grid flex min-h-screen items-center justify-center p-4">
      <div className="border-border bg-card w-full max-w-md rounded-2xl border p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="from-primary to-warning text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
            <Dumbbell className="h-7 w-7" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold">Admin Login</h1>
        <p className="text-muted-foreground mb-6 text-center text-sm">
          Get Gains admin dashboard
        </p>

        {error && (
          <div className="bg-destructive/10 text-destructive mb-4 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-foreground mb-1 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:outline-none"
              placeholder="admin@getgains.app"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-foreground mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary-hover flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
