"use client";

import { useState, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onChange(data.secure_url || data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || isUploading) return;

      const file = e.dataTransfer.files?.[0];
      if (file) {
        await uploadFile(file);
      }
    },
    [disabled, isUploading]
  );

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-4 w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-8 min-h-[200px] gap-4",
          isDragging
            ? "border-primary bg-primary/5 scale-[0.99]"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled || isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          disabled={disabled || isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          title=""
        />

        {value ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
            <img
              src={value}
              alt="Uploaded content"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
            ) : (
              <Upload className={cn("h-10 w-10 mb-2 transition-colors", isDragging ? "text-primary" : "text-muted-foreground")} />
            )}
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, JPEG or GIF up to 10MB
            </p>
          </div>
        )}
      </div>

      {value && !isUploading && (
        <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/50">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs truncate flex-1 font-mono text-muted-foreground">
            {value}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={removeImage}
          >
            Replace
          </Button>
        </div>
      )}
    </div>
  );
}
