"use client";
import * as React from "react";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  prefix: "missions" | "partners" | "cosmetics";
  entityId: string;
  currentKey?: string | null;
  onUploaded: (key: string) => void;
}

/**
 * Image upload widget for admin entities.
 *
 * Uploads through `/api/admin/proxy/upload/image` so the HttpOnly admin
 * session cookie is included automatically.
 */
export function ImageUpload({
  prefix,
  entityId,
  currentKey,
  onUploaded,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolveUrl(key: string) {
      try {
        const res = await fetch(
          `/api/admin/proxy/upload/image-url?key=${encodeURIComponent(key)}`,
        );
        const json = (await res.json()) as {
          data?: { url: string };
          errors?: Array<{ message: string }>;
        };
        if (!cancelled && json.data?.url) {
          setPreviewUrl(json.data.url);
        }
      } catch {
        if (!cancelled) setPreviewUrl(null);
      }
    }

    if (currentKey) {
      resolveUrl(currentKey);
    } else {
      setPreviewUrl(null);
    }

    return () => {
      cancelled = true;
    };
  }, [currentKey]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prefix", prefix);
      formData.append("entityId", entityId);

      const res = await fetch("/api/admin/proxy/upload/image", {
        method: "POST",
        body: formData,
      });

      const json = (await res.json()) as {
        data?: { key: string };
        errors?: Array<{ message: string }>;
      };

      if (!res.ok || json.errors?.length) {
        throw new Error(json.errors?.[0]?.message ?? "Upload failed");
      }

      onUploaded(json.data!.key);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      {previewUrl && (
        <div className="relative h-32 w-32 overflow-hidden rounded-md border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && (
        <p className="text-muted-foreground text-xs">Uploading...</p>
      )}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
