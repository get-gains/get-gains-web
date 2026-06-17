"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { apiFetchClient } from "@/lib/api-client";
import type { Mission, Partner } from "@/lib/admin-types";

interface MissionFormProps {
  mission?: Mission | null;
  partners: Partner[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

export function MissionForm({
  mission,
  partners,
  open,
  onOpenChange,
  onSaved,
}: MissionFormProps) {
  const [partnerId, setPartnerId] = useState(mission?.partnerId ?? "");
  const [title, setTitle] = useState(mission?.title ?? "");
  const [description, setDescription] = useState(mission?.description ?? "");
  const [goalType, setGoalType] = useState(
    mission?.goalType ?? "COMPLETE_WORKOUTS",
  );
  const [goalToReach, setGoalToReach] = useState(mission?.goalToReach ?? 1);
  const [rewardType, setRewardType] = useState<Mission["rewardType"]>(
    mission?.rewardType ?? "COINS",
  );
  const [rewardCoins, setRewardCoins] = useState(mission?.rewardCoins ?? 0);
  const [rewardTitle, setRewardTitle] = useState(mission?.rewardTitle ?? "");
  const [rewardDescription, setRewardDescription] = useState(
    mission?.rewardDescription ?? "",
  );
  const [rewardImageKey, setRewardImageKey] = useState(
    mission?.rewardImageKey ?? "",
  );
  const [maxWinners, setMaxWinners] = useState<number | "">(
    mission?.maxWinners ?? "",
  );
  const [isRepeatable, setIsRepeatable] = useState(
    mission?.isRepeatable ?? false,
  );
  const [startsAt, setStartsAt] = useState(
    mission?.startsAt ? mission.startsAt.slice(0, 16) : "",
  );
  const [endsAt, setEndsAt] = useState(
    mission?.endsAt ? mission.endsAt.slice(0, 16) : "",
  );
  const [offerTag, setOfferTag] = useState(mission?.coupon?.offerTag ?? "");
  const [couponDescription, setCouponDescription] = useState(
    mission?.coupon?.description ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const entityId = mission?.id ?? "new";

  const isCoupon = rewardType === "COUPON";
  const isRaffle = rewardType === "RAFFLE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        partnerId: partnerId || null,
        title,
        description,
        goalType,
        goalToReach,
        rewardType,
        rewardCoins: isCoupon ? 0 : rewardCoins,
        rewardTitle: rewardTitle || null,
        rewardDescription: rewardDescription || null,
        rewardImageKey: rewardImageKey || null,
        maxWinners: isRaffle ? Number(maxWinners) || null : null,
        isRepeatable: isCoupon ? false : isRepeatable,
        startsAt: startsAt ? new Date(startsAt).toISOString() : null,
        endsAt: endsAt ? new Date(endsAt).toISOString() : null,
        offerTag: isCoupon ? offerTag || "mission-20-off" : null,
        couponDescription: isCoupon ? couponDescription || null : null,
      };

      if (mission) {
        await apiFetchClient(`/admin/missions/${mission.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetchClient("/admin/missions", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      onSaved();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mission ? "Edit Mission" : "New Mission"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission-title">Title</Label>
            <Input
              id="mission-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission-description">Description</Label>
            <Textarea
              id="mission-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Partner</Label>
            <Select value={partnerId} onValueChange={setPartnerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a partner (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {partners.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal-type">Goal Type</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMPLETE_WORKOUTS">
                    Complete Workouts
                  </SelectItem>
                  <SelectItem value="EARN_COINS">Earn Coins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-to-reach">Goal to Reach</Label>
              <Input
                id="goal-to-reach"
                type="number"
                min={1}
                value={goalToReach}
                onChange={(e) => setGoalToReach(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reward Type</Label>
            <Select
              value={rewardType}
              onValueChange={(v) => setRewardType(v as Mission["rewardType"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COINS">Coins</SelectItem>
                <SelectItem value="RAFFLE">Raffle</SelectItem>
                <SelectItem value="COUPON">Coupon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rewardType === "COINS" && (
            <div className="space-y-2">
              <Label htmlFor="reward-coins">Reward Coins</Label>
              <Input
                id="reward-coins"
                type="number"
                min={0}
                value={rewardCoins}
                onChange={(e) => setRewardCoins(Number(e.target.value))}
                required
              />
            </div>
          )}

          {rewardType === "RAFFLE" && (
            <div className="space-y-2">
              <Label htmlFor="max-winners">Max Winners</Label>
              <Input
                id="max-winners"
                type="number"
                min={1}
                value={maxWinners}
                onChange={(e) =>
                  setMaxWinners(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                required
              />
            </div>
          )}

          {rewardType === "COUPON" && (
            <div className="border-border space-y-4 rounded-lg border p-4">
              <div className="space-y-2">
                <Label htmlFor="offer-tag">RevenueCat Offer Tag</Label>
                <Input
                  id="offer-tag"
                  value={offerTag}
                  placeholder="mission-20-off"
                  onChange={(e) => setOfferTag(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coupon-description">Coupon Description</Label>
                <Input
                  id="coupon-description"
                  value={couponDescription}
                  onChange={(e) => setCouponDescription(e.target.value)}
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Coupon missions are always non-repeatable.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reward-title">Reward Title (optional)</Label>
            <Input
              id="reward-title"
              value={rewardTitle}
              onChange={(e) => setRewardTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward-description">
              Reward Description (optional)
            </Label>
            <Textarea
              id="reward-description"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Reward Image</Label>
            <ImageUpload
              prefix="missions"
              entityId={entityId}
              currentKey={rewardImageKey}
              onUploaded={setRewardImageKey}
            />
          </div>

          {!isCoupon && (
            <div className="flex items-center space-x-2">
              <Switch
                id="is-repeatable"
                checked={isRepeatable}
                onCheckedChange={setIsRepeatable}
              />
              <Label htmlFor="is-repeatable">Repeatable</Label>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="starts-at">Starts At</Label>
              <Input
                id="starts-at"
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ends-at">Ends At</Label>
              <Input
                id="ends-at"
                type="datetime-local"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Mission"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
