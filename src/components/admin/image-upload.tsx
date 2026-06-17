"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface ImageUploadProps {
  prefix: "missions" | "partners" | "cosmetics";
  entityId: string;
  currentKey?: string | null;
  onUploaded: (key: string) => void;
}

export function ImageUpload({
  prefix,
  entityId,
  currentKey,
  onUploaded,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const formData = new FormData();
      formData.append("image", file);
      formData.append("prefix", prefix);
      formData.append("entityId", entityId);

      const res = await fetch(`${API_BASE}/admin/upload/image`, {
        method: "POST",
        headers: {
          Authorization: session?.access_token
            ? `Bearer ${session.access_token}`
            : "",
        },
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
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      {currentKey && (
        <p className="text-muted-foreground text-xs break-all">{currentKey}</p>
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
    </div>
  );
}
