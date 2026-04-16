"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PawPrint, CheckCircle2, User, Phone, Mail, MapPin, Pencil } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";
import StatusBadge from "@/components/StatusBadge";
import { savePet, generateId, type Pet } from "@/lib/store";

const DRAFT_KEY = "pawlo_register_draft";

interface Draft {
  photos: { dataUrl: string; isCover: boolean }[];
  name: string;
  species: string;
  breed: string;
  age: string;
  size: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  neighborhood: string;
  showWhatsApp: boolean;
}

function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function RegisterReview() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = readDraft();
    if (!d || !d.name || !d.photos?.length) {
      router.replace("/register/step-1");
      return;
    }
    setDraft(d);
  }, [router]);

  if (!draft) return null;

  const coverPhoto = draft.photos?.find((p) => p.isCover) ?? draft.photos?.[0];

  async function handleSubmit() {
    if (!draft) return;
    setSubmitting(true);

    // Simulate async save
    await new Promise((r) => setTimeout(r, 800));

    const pet: Pet = {
      id: generateId(),
      name: draft.name,
      species: (draft.species?.toLowerCase() ?? "dog") as Pet["species"],
      breed: draft.breed,
      color: [draft.primaryColor, draft.secondaryColor].filter(Boolean).join(" / "),
      description: draft.description,
      photoDataUrl: coverPhoto?.dataUrl ?? null,
      status: "active",
      ownerName: draft.ownerName,
      ownerPhone: draft.ownerPhone,
      ownerEmail: draft.ownerEmail,
      neighborhood: draft.neighborhood,
      createdAt: new Date().toISOString(),
    };

    savePet(pet);
    localStorage.removeItem(DRAFT_KEY);

    setDone(true);
    setTimeout(() => {
      router.push(`/pets/${pet.id}`);
    }, 1200);
  }

  if (done) {
    return (
      <div className="page-container pt-20 pb-16 flex flex-col items-center text-center animate-fade-in-scale">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-success-500" />
        </div>
        <h2 className="text-h1 text-neutral-800 mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
          {draft.name} is registered! 🎉
        </h2>
        <p className="text-body text-neutral-500">Redirecting to their profile…</p>
      </div>
    );
  }

  return (
    <div className="page-container pt-8 pb-16">
      <div className="mb-8">
        <ProgressIndicator currentStep={4} />
      </div>

      <div className="mb-6">
        <h1 className="text-h1 text-neutral-800 mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          Review & confirm
        </h1>
        <p className="text-body text-neutral-500">Everything look good? Submit to register.</p>
      </div>

      {/* Review card */}
      <div className="card mb-4">
        {/* Cover photo */}
        {coverPhoto && (
          <div className="w-full h-48 rounded-lg overflow-hidden bg-neutral-100 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverPhoto.dataUrl} alt={draft.name} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Photo strip */}
        {draft.photos && draft.photos.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {draft.photos.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.dataUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Pet header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-h2 text-neutral-800" style={{ fontFamily: "Nunito, sans-serif" }}>
              {draft.name}
            </h2>
            <p className="text-body text-neutral-500">
              {draft.breed} · {draft.primaryColor}{draft.secondaryColor ? ` / ${draft.secondaryColor}` : ""}
            </p>
          </div>
          <StatusBadge status="Active" />
        </div>

        {/* Pet details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Species", value: draft.species || "—" },
            { label: "Age", value: draft.age ? `${draft.age} yr` : "—" },
            { label: "Size", value: draft.size || "—" },
            { label: "Neighborhood", value: draft.neighborhood || "—" },
          ].map((item) => (
            <div key={item.label} className="bg-neutral-50 rounded-md p-3">
              <p className="text-caption text-neutral-400 uppercase tracking-wide mb-0.5">{item.label}</p>
              <p className="text-body font-medium text-neutral-700">{item.value}</p>
            </div>
          ))}
        </div>

        {draft.description && (
          <div className="bg-neutral-50 rounded-md p-3 mb-4">
            <p className="text-caption text-neutral-400 uppercase tracking-wide mb-1">Description</p>
            <p className="text-body text-neutral-700">{draft.description}</p>
          </div>
        )}

        {/* Owner info */}
        <div className="border-t border-neutral-100 pt-4">
          <p className="text-label-sm text-neutral-400 uppercase tracking-wide mb-3">Owner contact</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-body text-neutral-700">
              <User size={14} className="text-neutral-400 flex-shrink-0" />
              {draft.ownerName}
            </div>
            <div className="flex items-center gap-2 text-body text-neutral-700">
              <Phone size={14} className="text-neutral-400 flex-shrink-0" />
              {draft.ownerPhone}
            </div>
            {draft.ownerEmail && (
              <div className="flex items-center gap-2 text-body text-neutral-700">
                <Mail size={14} className="text-neutral-400 flex-shrink-0" />
                {draft.ownerEmail}
              </div>
            )}
            <div className="flex items-center gap-2 text-body text-neutral-700">
              <MapPin size={14} className="text-neutral-400 flex-shrink-0" />
              {draft.neighborhood}
            </div>
          </div>
        </div>
      </div>

      {/* Edit link */}
      <button
        onClick={() => router.push("/register/step-1")}
        className="btn-ghost w-full justify-center mb-6 text-neutral-500"
      >
        <Pencil size={14} />
        Edit registration
      </button>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="btn-outline !px-4"
          aria-label="Go back to step 3"
          disabled={submitting}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary flex-1 justify-center py-3.5 disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin-slow" />
              Registering…
            </>
          ) : (
            <>
              <PawPrint size={18} />
              Register {draft.name}
            </>
          )}
        </button>
      </div>

      <p className="text-caption text-neutral-400 text-center mt-4">
        By registering you agree to our community guidelines.
      </p>
    </div>
  );
}
