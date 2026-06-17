"use client";
import * as React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { adminFetchClient } from "@/lib/admin/api-client";
import type {
  Cosmetic,
  CosmeticCategory,
  CosmeticStatus,
} from "@/lib/admin/types";

interface CosmeticFormProps {
  cosmetic?: Cosmetic | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const CATEGORIES: CosmeticCategory[] = [
  "HEADWEAR",
  "TOP",
  "BOTTOM",
  "ACCESSORY",
];

interface CosmeticPayload {
  name: string;
  description: string;
  tier: number;
  price: number;
  category: CosmeticCategory;
  previewImageKey: string;
  unityAssetRef: string;
  status: CosmeticStatus;
  sortOrder: number;
}

export function CosmeticForm({
  cosmetic,
  open,
  onOpenChange,
  onSaved,
}: CosmeticFormProps): React.JSX.Element {
  const [name, setName] = useState<string>(cosmetic?.name ?? "");
  const [description, setDescription] = useState<string>(
    cosmetic?.description ?? "",
  );
  const [tier, setTier] = useState<number>(cosmetic?.tier ?? 1);
  const [price, setPrice] = useState<number>(cosmetic?.price ?? 0);
  const [category, setCategory] = useState<CosmeticCategory>(
    cosmetic?.category ?? "HEADWEAR",
  );
  const [previewImageKey, setPreviewImageKey] = useState<string>(
    cosmetic?.previewImageKey ?? "",
  );
  const [unityAssetRef, setUnityAssetRef] = useState<string>(
    cosmetic?.unityAssetRef ?? "",
  );
  const [status, setStatus] = useState<CosmeticStatus>(
    cosmetic?.status ?? "ACTIVE",
  );
  const [sortOrder, setSortOrder] = useState<number>(cosmetic?.sortOrder ?? 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const entityId = cosmetic?.id ?? "new";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: CosmeticPayload = {
        name,
        description,
        tier,
        price,
        category,
        previewImageKey,
        unityAssetRef,
        status,
        sortOrder,
      };

      if (cosmetic) {
        await adminFetchClient(`/cosmetics/${cosmetic.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetchClient("/cosmetics", {
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
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {cosmetic ? "Edit Cosmetic" : "New Cosmetic"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cosmetic-name">Name</Label>
            <Input
              id="cosmetic-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cosmetic-description">Description</Label>
            <Textarea
              id="cosmetic-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cosmetic-tier">Tier</Label>
              <Input
                id="cosmetic-tier"
                type="number"
                min={1}
                value={tier}
                onChange={(e) => setTier(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cosmetic-price">Price (coins)</Label>
              <Input
                id="cosmetic-price"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as CosmeticCategory)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cosmetic-unity-ref">Unity Asset Ref</Label>
            <Input
              id="cosmetic-unity-ref"
              value={unityAssetRef}
              onChange={(e) => setUnityAssetRef(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Preview Image</Label>
            <ImageUpload
              prefix="cosmetics"
              entityId={entityId}
              currentKey={previewImageKey}
              onUploaded={setPreviewImageKey}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cosmetic-sort">Sort Order</Label>
              <Input
                id="cosmetic-sort"
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as CosmeticStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Cosmetic"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
