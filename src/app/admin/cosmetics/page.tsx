"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetchClient } from "@/lib/api-client";
import type { Cosmetic } from "@/lib/admin-types";
import { CosmeticForm } from "./cosmetic-form";

export default function AdminCosmeticsPage() {
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Cosmetic | null>(null);

  const fetchCosmetics = async () => {
    try {
      const res = await apiFetchClient<{ cosmetics: Cosmetic[] }>(
        "/admin/cosmetics?limit=100",
      );
      setCosmetics(res.cosmetics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCosmetics();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cosmetic?")) return;
    await apiFetchClient(`/admin/cosmetics/${id}`, { method: "DELETE" });
    fetchCosmetics();
  };

  const filtered = cosmetics.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cosmetics</h1>
        <Button onClick={() => setFormOpen(true)}>New Cosmetic</Button>
      </div>

      <Input
        placeholder="Search cosmetics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {loading ? (
        <p className="text-muted-foreground">Loading cosmetics...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cosmetic) => (
                <TableRow key={cosmetic.id}>
                  <TableCell className="font-medium">{cosmetic.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{cosmetic.category}</Badge>
                  </TableCell>
                  <TableCell>{cosmetic.tier}</TableCell>
                  <TableCell>{cosmetic.price}</TableCell>
                  <TableCell>
                    {cosmetic.status === "ACTIVE" ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(cosmetic);
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cosmetic.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CosmeticForm
        cosmetic={editing}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditing(null);
        }}
        onSaved={fetchCosmetics}
      />
    </div>
  );
}
