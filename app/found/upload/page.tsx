"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload, ArrowRight, X } from "lucide-react";

const FOUND_KEY = "pawlo_found_draft";

export default function FoundUploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function processFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPhoto(dataUrl);
      try {
        const draft = { photoDataUrl: dataUrl };
        localStorage.setItem(FOUND_KEY, JSON.stringify(draft));
      } catch { /* ignore */ }
    };
    reader.readAsDataURL(file);
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  function handleContinue() {
    if (!photo) {
      setError("Please upload a photo first.");
      return;
    }
    router.push("/found/details");
  }

  return (
    <div className="page-container pt-8 pb-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary-100 rounded-2xl mb-4">
          <Camera size={28} className="text-secondary-600" />
        </div>
        <h1
          className="text-h1 text-neutral-800 mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          I found a pet
        </h1>
        <p className="text-body text-neutral-500 max-w-xs mx-auto">
          Upload a clear photo of the pet you found. Our AI will search for matches.
        </p>
      </div>

      {/* Upload zone / Preview */}
      {!photo ? (
        <div
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-normal cursor-pointer min-h-[260px] mb-6 ${
            dragging
              ? "border-secondary-500 bg-secondary-50 scale-[1.01]"
              : "border-neutral-300 bg-neutral-50 hover:border-secondary-400 hover:bg-secondary-50"
          }`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label="Upload photo of found pet"
        >
          <div className="flex flex-col items-center text-center px-6 py-10 pointer-events-none">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              dragging ? "bg-secondary-200" : "bg-secondary-100"
            }`}>
              <Upload size={28} className="text-secondary-600" />
            </div>
            <p className="text-label text-neutral-700 mb-1">
              {dragging ? "Drop the photo here" : "Tap to take or upload a photo"}
            </p>
            <p className="text-body-sm text-neutral-400">
              JPG, PNG, WEBP · max 10 MB
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-secondary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Camera size={16} />
              Choose photo
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt="Found pet"
            className="w-full max-h-72 object-cover"
          />
          <button
            onClick={() => { setPhoto(null); setError(null); }}
            className="absolute top-3 right-3 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Remove photo"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-3 left-3 bg-secondary-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Photo added ✓
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="field-error text-center mb-4">{error}</p>}

      {/* Tips */}
      <div className="bg-neutral-50 rounded-xl p-4 mb-6 space-y-2">
        <p className="text-label-sm text-neutral-500 font-medium mb-2">Tips for a better match</p>
        {[
          "Clear, well-lit photo of the full body",
          "Include a close-up of the face",
          "Avoid blurry or partially blocked shots",
        ].map((tip) => (
          <p key={tip} className="text-body-sm text-neutral-500 flex items-start gap-2">
            <span className="text-secondary-500 mt-0.5">✓</span>
            {tip}
          </p>
        ))}
      </div>

      <button
        onClick={handleContinue}
        className="btn-primary w-full justify-center py-3.5"
      >
        Continue
        <ArrowRight size={18} />
      </button>

      <p className="text-body-sm text-neutral-400 text-center mt-3">
        We&apos;ll analyze the photo and search {"{2,400+}"} registered pets
      </p>
    </div>
  );
}
