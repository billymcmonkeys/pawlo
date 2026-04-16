"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Star, ArrowRight } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";

const DRAFT_KEY = "pawlo_register_draft";

interface PhotoItem {
  dataUrl: string;
  isCover: boolean;
}

export default function RegisterStep1() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // Restore from draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.photos) setPhotos(draft.photos);
      }
    } catch {
      /* ignore */
    }
  }, []);

  function saveDraft(newPhotos: PhotoItem[]) {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? JSON.parse(raw) : {};
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, photos: newPhotos }));
    } catch {
      /* ignore */
    }
  }

  function addFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Only image files are accepted.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be under 8 MB.");
      return;
    }
    if (photos.length >= 5) {
      setError("Maximum 5 photos allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newPhotos: PhotoItem[] = [
        ...photos,
        { dataUrl, isCover: photos.length === 0 },
      ];
      setPhotos(newPhotos);
      saveDraft(newPhotos);
    };
    reader.readAsDataURL(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    Array.from(e.target.files ?? []).forEach(addFile);
    e.target.value = "";
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      Array.from(e.dataTransfer.files).forEach(addFile);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photos]
  );

  function removePhoto(i: number) {
    const next = photos.filter((_, idx) => idx !== i);
    // Ensure there's always a cover
    if (next.length > 0 && !next.some((p) => p.isCover)) {
      next[0].isCover = true;
    }
    setPhotos(next);
    saveDraft(next);
  }

  function setCover(i: number) {
    const next = photos.map((p, idx) => ({ ...p, isCover: idx === i }));
    setPhotos(next);
    saveDraft(next);
  }

  function handleNext() {
    if (photos.length === 0) {
      setError("Please add at least one photo.");
      return;
    }
    router.push("/register/step-2");
  }

  return (
    <div className="page-container pt-8 pb-16">
      {/* Progress */}
      <div className="mb-8">
        <ProgressIndicator currentStep={1} />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-h1 text-neutral-800 mb-1"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Add your pet&apos;s photos
        </h1>
        <p className="text-body text-neutral-500">
          Add 1–5 photos. Good photos help neighbors recognize your pet.
        </p>
      </div>

      {/* Upload zone */}
      {photos.length < 5 && (
        <div
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-normal cursor-pointer min-h-[180px] mb-4 ${
            dragging
              ? "border-primary-500 bg-primary-50 scale-[1.01]"
              : "border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50"
          }`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label="Upload pet photos"
        >
          <div className="flex flex-col items-center px-4 py-8 text-center pointer-events-none">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
              <Upload size={22} className="text-primary-600" />
            </div>
            <p className="text-label text-neutral-700 mb-1">
              {dragging ? "Drop photos here" : "Tap or drag photos here"}
            </p>
            <p className="text-body-sm text-neutral-400">
              JPG, PNG, WEBP · max 8 MB · up to 5 photos
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                photo.isCover ? "border-primary-500" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.dataUrl}
                alt={`Pet photo ${i + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Cover badge */}
              {photo.isCover && (
                <div className="absolute bottom-1.5 left-1.5 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Star size={10} fill="white" />
                  Cover
                </div>
              )}

              {/* Set cover button */}
              {!photo.isCover && (
                <button
                  type="button"
                  onClick={() => setCover(i)}
                  className="absolute bottom-1.5 left-1.5 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Set as cover photo"
                >
                  Set cover
                </button>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label={`Remove photo ${i + 1}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Add more slot */}
          {photos.length < 5 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-all"
              aria-label="Add another photo"
            >
              <Upload size={20} className="text-neutral-400" />
            </button>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-secondary-50 rounded-lg p-3 mb-6">
        <p className="text-body-sm text-secondary-700 font-medium mb-1">Photo tips</p>
        <ul className="text-body-sm text-secondary-600 space-y-0.5 list-disc list-inside">
          <li>Include a clear face shot</li>
          <li>Add photos from different angles</li>
          <li>Good lighting helps AI matching</li>
        </ul>
      </div>

      {error && <p className="field-error mb-4">{error}</p>}

      {/* Next button */}
      <button
        onClick={handleNext}
        className="btn-primary w-full justify-center py-3.5"
      >
        Continue
        <ArrowRight size={18} />
      </button>

      <p className="text-body-sm text-neutral-400 text-center mt-3">
        Step 1 of 4 · Photos are stored locally on your device
      </p>
    </div>
  );
}
