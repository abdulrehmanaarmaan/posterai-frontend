"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PhotoUploaderProps {
  photos: File[];
  onChange: (files: File[]) => void;
  error?: string;
  disabled?: boolean;
}

const MAX_PHOTOS = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function PhotoUploader({
  photos,
  onChange,
  error,
  disabled = false,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) {
      return;
    }

    const remainingSlots = MAX_PHOTOS - photos.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (validFiles.length >= remainingSlots) {
        break;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        continue;
      }

      validFiles.push(file);
    }

    onChange([...photos, ...validFiles]);

    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updatedPhotos = photos.filter(
      (_, photoIndex) => photoIndex !== index,
    );

    onChange(updatedPhotos);
  };

  const openFilePicker = () => {
    if (disabled || photos.length >= MAX_PHOTOS) {
      return;
    }

    inputRef.current?.click();
  };

  const canUploadMore = photos.length < MAX_PHOTOS;

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Photos</h2>

        <p className="mt-1 text-sm text-slate-600">
          Upload up to 3 photos to include in your poster.
        </p>
      </div>

      {canUploadMore && (
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled}
          className={[
            "flex min-h-40 w-full flex-col items-center justify-center",
            "rounded-2xl border-2 border-dashed px-6 py-8",
            "text-center transition",
            "border-slate-300 bg-slate-50",
            "hover:border-teal-500 hover:bg-teal-50/50",
            "focus:outline-none focus:ring-2 focus:ring-teal-600/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-red-400" : "",
          ].join(" ")}
        >
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-teal-700 shadow-sm">
            ↑
          </span>

          <span className="text-sm font-semibold text-slate-800">
            Click to upload photos
          </span>

          <span className="mt-1 text-xs text-slate-500">
            JPG, PNG or WebP · Maximum 5 MB per image
          </span>

          <span className="mt-3 text-xs font-medium text-teal-700">
            {MAX_PHOTOS - photos.length}{" "}
            {MAX_PHOTOS - photos.length === 1 ? "slot" : "slots"} remaining
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={disabled || !canUploadMore}
        onChange={handleChange}
        className="sr-only"
      />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">Selected photos</p>

        <p className="text-xs font-medium text-slate-500">
          {photos.length} / {MAX_PHOTOS}
        </p>
      </div>

      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((file, index) => (
            <PhotoPreview
              key={`${file.name}-${file.lastModified}-${index}`}
              file={file}
              index={index}
              onRemove={handleRemove}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {photos.length === 0 && (
        <p className="mt-3 text-sm text-slate-500">No photos selected yet.</p>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

interface PhotoPreviewProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  disabled: boolean;
}

function PhotoPreview({
  file,
  index,
  onRemove,
  disabled,
}: PhotoPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      {previewUrl && (
        <Image
          src={previewUrl}
          alt={`Selected photo ${index + 1}`}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover"
        />
      )}

      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={disabled}
        aria-label={`Remove photo ${index + 1}`}
        className={[
          "absolute right-2 top-2 flex h-8 w-8 items-center justify-center",
          "rounded-full bg-slate-900/80 text-sm font-semibold text-white",
          "transition hover:bg-red-600",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" ")}
      >
        ×
      </button>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6">
        <p className="truncate text-xs font-medium text-white">
          Photo {index + 1}
        </p>
      </div>
    </div>
  );
}
