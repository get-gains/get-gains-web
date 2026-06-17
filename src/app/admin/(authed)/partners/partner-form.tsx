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
import { ImageUpload } from "@/components/admin/image-upload";
import { adminFetchClient } from "@/lib/admin/api-client";
import type { Partner } from "@/lib/admin/types";

interface PartnerFormProps {
  partner?: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

interface PartnerPayload {
  name: string;
  bio: string;
  logoKey: string;
  socialLinks: string[];
}

export function PartnerForm({
  partner,
  open,
  onOpenChange,
  onSaved,
}: PartnerFormProps): React.JSX.Element {
  const [name, setName] = useState<string>(partner?.name ?? "");
  const [bio, setBio] = useState<string>(partner?.bio ?? "");
  const [logoKey, setLogoKey] = useState<string>(partner?.logoKey ?? "");
  const [socialLinks, setSocialLinks] = useState<string>(
    partner?.socialLinks?.join("\n") ?? "",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const entityId = partner?.id ?? "new";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: PartnerPayload = {
        name,
        bio,
        logoKey,
        socialLinks: socialLinks
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (partner) {
        await adminFetchClient(`/admin/partners/${partner.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetchClient("/admin/partners", {
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{partner ? "Edit Partner" : "New Partner"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partner-name">Name</Label>
            <Input
              id="partner-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner-bio">Bio</Label>
            <Textarea
              id="partner-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <ImageUpload
              prefix="partners"
              entityId={entityId}
              currentKey={logoKey}
              onUploaded={setLogoKey}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner-social">Social Links (one per line)</Label>
            <Textarea
              id="partner-social"
              value={socialLinks}
              onChange={(e) => setSocialLinks(e.target.value)}
              rows={3}
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Partner"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
