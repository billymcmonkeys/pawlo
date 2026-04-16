"use client";
import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

interface Props {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  label?: string;
}

export default function PhotoUpload({ value, onChange, label = "Add photo" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Only image files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      <div
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 transition-all cursor-pointer min-h-[180px] ${
          value
            ? "border-primary-200 bg-primary-50/50"
            : "border-neutral-200 bg-neutral-50 hover:border-primary-300 hover:bg-primary-50/30 active:scale-[0.99]"
        }`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        aria-label={label}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Uploaded preview" className="w-full h-56 object-cover rounded-xl" />
            <button
              type="button"
              className="absolute top-3 right-3 bg-white/95 backdrop-blur text-neutral-700 rounded-full w-8 h-8 flex items-center justify-center shadow-sm border border-neutral-200 hover:bg-white active:scale-95 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              aria-label="Remove photo"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="text-center px-4 py-8">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary-100 flex items-center justify-center">
              <Camera size={28} className="text-primary-600" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-neutral-700 mb-1">{label}</p>
            <p className="text-xs text-neutral-500">JPG, PNG, WEBP · max 5 MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error-500 font-medium">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
