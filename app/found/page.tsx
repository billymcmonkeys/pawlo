"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PhotoUpload from "@/components/PhotoUpload";
import {
  saveFoundReport,
  computeMatches,
  getPets,
  generateId,
  seedDemoData,
  type FoundReport,
} from "@/lib/store";

interface FormErrors {
  description?: string;
  neighborhood?: string;
}

function validate(fields: { description: string; neighborhood: string }): FormErrors {
  const errors: FormErrors = {};
  if (!fields.description.trim()) errors.description = "Please describe the pet.";
  else if (fields.description.trim().length < 10) errors.description = "Add at least 10 characters.";
  if (!fields.neighborhood.trim()) errors.neighborhood = "Neighborhood is required.";
  return errors;
}

export default function FoundPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [fields, setFields] = useState({ description: "", neighborhood: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Ensure demo pets are seeded so there are always results to match against
  useEffect(() => {
    seedDemoData();
  }, []);

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);

    const pets = getPets();
    const reportId = generateId();
    const matches = computeMatches(
      { id: reportId, ...fields, photoDataUrl: photo, createdAt: new Date().toISOString() },
      pets
    );

    const report: FoundReport = {
      id: reportId,
      description: fields.description,
      neighborhood: fields.neighborhood,
      photoDataUrl: photo,
      createdAt: new Date().toISOString(),
      matchScores: matches,
    };

    saveFoundReport(report);
    setSubmitting(false);
    router.push(`/found/results?reportId=${reportId}`);
  }

  return (
    <>

      <main className="page-container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-stone-900 mb-1">I found a pet</h1>
          <p className="text-stone-500 text-sm">
            Tell us about the pet you found. We&apos;ll search our registry to find a match.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <PhotoUpload value={photo} onChange={setPhoto} label="Add a photo (helps find the owner faster)" />

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Describe the pet *</label>
            <textarea
              rows={4}
              placeholder="Species, breed, color, size, collar, distinctive marks, behavior..."
              value={fields.description}
              onChange={update("description")}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none ${
                errors.description ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
              }`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Where did you find them? *</label>
            <input
              type="text"
              placeholder="e.g. Palermo, corner of Thames and Honduras"
              value={fields.neighborhood}
              onChange={update("neighborhood")}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                errors.neighborhood ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
              }`}
            />
            {errors.neighborhood && <p className="text-xs text-red-500">{errors.neighborhood}</p>}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-xs text-orange-700">
            💡 The more detail you provide, the better our matching algorithm works. Include color, breed, any collar or tags.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-base py-4 disabled:opacity-60"
          >
            {submitting ? "Searching…" : "Find the owner"}
          </button>
        </form>
      </main>
    </>
  );
}
