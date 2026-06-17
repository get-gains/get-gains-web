"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiFetchClient } from "@/lib/api-client";
import type { Mission } from "@/lib/admin-types";

interface DrawWinnersDialogProps {
  mission: Mission;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDrawn: () => void;
}

export function DrawWinnersDialog({
  mission,
  open,
  onOpenChange,
  onDrawn,
}: DrawWinnersDialogProps) {
  const [winnerCount, setWinnerCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiFetchClient(`/admin/missions/${mission.id}/draw-winners`, {
        method: "POST",
        body: JSON.stringify({ winnerCount }),
      });
      onDrawn();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Draw failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Draw Winners</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Drawing winners for <strong>{mission.title}</strong>. This will
            close the mission.
          </p>
          <div className="space-y-2">
            <Label htmlFor="winner-count">Number of Winners</Label>
            <Input
              id="winner-count"
              type="number"
              min={1}
              max={mission.maxWinners ?? undefined}
              value={winnerCount}
              onChange={(e) => setWinnerCount(Number(e.target.value))}
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Drawing..." : "Draw Winners"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
