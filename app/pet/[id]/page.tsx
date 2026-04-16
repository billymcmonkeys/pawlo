"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import StatusBadge from "@/components/StatusBadge";
import { getPetById, updatePetStatus, type Pet, type PetStatus } from "@/lib/store";

const STATUS_OPTIONS: { value: PetStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "lost", label: "Lost" },
  { value: "reunited", label: "Reunited 🎉" },
];

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const p = getPetById(id);
    setPet(p);
    setLoading(false);
  }, [id]);

  function changeStatus(status: PetStatus) {
    if (!pet) return;
    setUpdating(true);
    updatePetStatus(pet.id, status);
    setPet({ ...pet, status });
    setShowStatusMenu(false);
    setUpdating(false);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  if (loading) {
    return (
      <>

        <main className="page-container pt-16 text-center">
          <div className="text-4xl mb-3">🐾</div>
          <p className="text-stone-400">Loading profile…</p>
        </main>
      </>
    );
  }

  if (!pet) {
    return (
      <>

        <main className="page-container pt-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-stone-800 mb-2">Pet not found</h1>
          <p className="text-stone-400 mb-6">This pet profile doesn&apos;t exist or was removed.</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Back to home
          </button>
        </main>
      </>
    );
  }

  return (
    <>

      <main className="pb-16">
        {/* Photo — full bleed */}
        <div className="w-full h-64 bg-orange-50 flex items-center justify-center overflow-hidden mb-4">
          {pet.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pet.photoDataUrl} alt={pet.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">{pet.species === "cat" ? "🐱" : pet.species === "dog" ? "🐶" : "🐾"}</span>
          )}
        </div>

        {/* Padded content wrapper */}
        <div className="page-container">
        {/* Header row */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">{pet.name}</h1>
            <p className="text-stone-400 text-sm mt-0.5">
              {pet.breed} · {pet.color} · {pet.neighborhood}
            </p>
          </div>
          <div className="relative mt-1">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="focus:outline-none p-1 -m-1"
              aria-label="Change status"
              disabled={updating}
            >
              <StatusBadge status={pet.status} />
            </button>
            {showStatusMenu && (
              <>
                {/* Backdrop — closes menu on tap outside (mobile-friendly) */}
                <div
                  className="fixed inset-0 z-[9]"
                  onClick={() => setShowStatusMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-8 bg-white border border-stone-200 rounded-xl shadow-lg z-10 py-1 min-w-[140px]">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => changeStatus(opt.value)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors ${
                        pet.status === opt.value ? "font-semibold text-orange-500" : "text-stone-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-xs text-stone-400 mb-5">Registered {formatDate(pet.createdAt)}</p>

        {pet.status === "lost" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-700">
            🚨 This pet is currently <strong>lost</strong>. If you&apos;ve seen them, please{" "}
            <a href="/found" className="underline font-medium">report it here</a>.
          </div>
        )}

        {pet.status === "reunited" && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 mb-5 text-sm text-indigo-700">
            🎉 Great news — {pet.name} has been reunited with their owner!
          </div>
        )}

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">About</h2>
          <p className="text-stone-700 text-sm leading-relaxed">{pet.description}</p>
        </section>

        {/* Details */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Details</h2>
          <div className="space-y-2">
            {[
              { label: "Species", value: pet.species.charAt(0).toUpperCase() + pet.species.slice(1) },
              { label: "Breed", value: pet.breed },
              { label: "Color", value: pet.color },
              { label: "Neighborhood", value: pet.neighborhood },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm border-b border-stone-100 pb-1.5">
                <span className="text-stone-400">{label}</span>
                <span className="text-stone-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Owner contact */}
        <section className="bg-stone-50 rounded-2xl p-4">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Owner</h2>
          <p className="font-semibold text-stone-800 mb-3">{pet.ownerName}</p>
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${pet.ownerPhone}`}
              className="btn-primary text-center text-sm py-3"
            >
              📞 Call {pet.ownerPhone}
            </a>
            <a
              href={`mailto:${pet.ownerEmail}`}
              className="btn-secondary text-center text-sm py-3"
            >
              ✉️ Send email
            </a>
          </div>
        </section>

        {/* Status change hint */}
        <p className="text-center text-xs text-stone-400 mt-6">
          Tap the status badge to update it (Active / Lost / Reunited)
        </p>
        </div>{/* end page-container */}
      </main>
    </>
  );
}
