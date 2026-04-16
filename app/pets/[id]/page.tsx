"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Heart,
  Pencil,
  MessageCircle,
  PawPrint,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { getPetById as getStaticPet } from "@/data/pets";
import { getPetById as getStorePet, updatePetStatus, type PetStatus } from "@/lib/store";
import type { Pet as StaticPet } from "@/data/pets";
import type { Pet as StorePet } from "@/lib/store";

type UnifiedPet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age?: string | number;
  size?: string;
  color: string;
  neighborhood: string;
  status: "Active" | "Lost" | "Reunited";
  photos: string[];
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  showWhatsApp?: boolean;
  source: "static" | "store";
};

function fromStatic(p: StaticPet): UnifiedPet {
  return {
    id: p.id,
    name: p.name,
    species: p.species,
    breed: p.breed,
    age: p.age,
    size: p.size,
    color: [p.primaryColor, p.secondaryColor].filter(Boolean).join(" / "),
    neighborhood: p.neighborhood,
    status: p.status,
    photos: p.photos,
    description: p.description,
    ownerName: p.owner.name,
    ownerPhone: p.owner.phone,
    ownerEmail: p.owner.email,
    source: "static",
  };
}

function fromStore(p: StorePet): UnifiedPet {
  const statusMap: Record<PetStatus, "Active" | "Lost" | "Reunited"> = {
    active: "Active",
    lost: "Lost",
    reunited: "Reunited",
  };
  return {
    id: p.id,
    name: p.name,
    species: p.species,
    breed: p.breed,
    color: p.color,
    neighborhood: p.neighborhood,
    status: statusMap[p.status],
    photos: p.photoDataUrl ? [p.photoDataUrl] : [],
    description: p.description,
    ownerName: p.ownerName,
    ownerPhone: p.ownerPhone,
    ownerEmail: p.ownerEmail,
    source: "store",
  };
}

export default function PetProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pet, setPet] = useState<UnifiedPet | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Check static data first
    const staticPet = getStaticPet(id);
    if (staticPet) {
      setPet(fromStatic(staticPet));
      return;
    }
    // Check localStorage store
    const storePet = getStorePet(id);
    if (storePet) {
      setPet(fromStore(storePet));
      return;
    }
    setNotFound(true);
  }, [id]);

  function handlePrevPhoto() {
    if (!pet) return;
    setPhotoIdx((i) => (i - 1 + pet.photos.length) % pet.photos.length);
  }

  function handleNextPhoto() {
    if (!pet) return;
    setPhotoIdx((i) => (i + 1) % pet.photos.length);
  }

  async function handleStatusChange(newStatus: "lost" | "reunited") {
    if (!pet || pet.source !== "store") return;
    setUpdating(true);
    await new Promise((r) => setTimeout(r, 400));
    updatePetStatus(pet.id, newStatus);
    setPet((p) => p ? { ...p, status: newStatus === "lost" ? "Lost" : "Reunited" } : p);
    setUpdating(false);
  }

  if (notFound) {
    return (
      <div className="page-container pt-20 pb-16 text-center">
        <div className="text-5xl mb-4">🐾</div>
        <h1 className="text-h1 text-neutral-800 mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
          Pet not found
        </h1>
        <p className="text-body text-neutral-500 mb-8">
          This pet profile doesn&apos;t exist or may have been removed.
        </p>
        <Link href="/" className="btn-primary">
          <PawPrint size={18} />
          Go home
        </Link>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="page-container pt-20 text-center">
        <div className="w-10 h-10 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin-slow mx-auto" />
      </div>
    );
  }

  const photo = pet.photos[photoIdx];
  const isStaticPhoto = photo?.startsWith("http");
  const whatsappLink = `https://wa.me/${pet.ownerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi! I think I found your pet ${pet.name}. Can we talk?`
  )}`;

  return (
    <div className="pb-16">
      {/* Hero photo */}
      <div className="relative bg-neutral-100" style={{ height: 320 }}>
        {photo ? (
          isStaticPhoto ? (
            <Image
              src={photo}
              alt={pet.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
              priority
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={pet.name} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {pet.species.toLowerCase() === "cat" ? "🐱" : "🐕"}
          </div>
        )}

        {/* Nav overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          {pet.photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="pointer-events-auto w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextPhoto}
                className="pointer-events-auto w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Status badge overlay */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={pet.status} />
        </div>

        {/* Photo indicator dots */}
        {pet.photos.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {pet.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === photoIdx ? "bg-white w-4" : "bg-white/60"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Gallery strip */}
      {pet.photos.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-neutral-100">
          {pet.photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                i === photoIdx ? "border-primary-500" : "border-transparent"
              }`}
            >
              {src.startsWith("http") ? (
                <Image src={src} alt="" width={56} height={56} className="object-cover w-full h-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="page-container pt-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-h1 text-neutral-800" style={{ fontFamily: "Nunito, sans-serif" }}>
              {pet.name}
            </h1>
            <p className="text-body text-neutral-500">
              {pet.breed}{pet.color ? ` · ${pet.color}` : ""}
            </p>
          </div>
          {pet.source === "store" && (
            <button className="btn-ghost text-neutral-400">
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Species", value: pet.species },
            { label: "Age", value: pet.age ? `${pet.age} yr` : "—" },
            { label: "Size", value: pet.size ?? "—" },
            { label: "Neighborhood", value: pet.neighborhood },
          ].map((item) => (
            <div key={item.label} className="bg-neutral-50 rounded-lg p-3">
              <p className="text-caption text-neutral-400 uppercase tracking-wide mb-0.5">{item.label}</p>
              <p className="text-body font-medium text-neutral-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        {pet.description && (
          <div className="card mb-5">
            <p className="text-label-sm text-neutral-400 uppercase tracking-wide mb-2">About</p>
            <p className="text-body text-neutral-700 leading-relaxed">{pet.description}</p>
          </div>
        )}

        {/* Owner contact */}
        <div className="card mb-5">
          <p className="text-label-sm text-neutral-400 uppercase tracking-wide mb-3">Owner</p>
          <p className="font-semibold text-neutral-800 mb-3">{pet.ownerName}</p>

          <div className="flex items-center gap-2 text-body text-neutral-600 mb-2">
            <MapPin size={14} className="text-neutral-400 flex-shrink-0" />
            {pet.neighborhood}
          </div>
          {pet.ownerPhone && (
            <div className="flex items-center gap-2 text-body text-neutral-600 mb-2">
              <Phone size={14} className="text-neutral-400 flex-shrink-0" />
              {pet.ownerPhone}
            </div>
          )}
          {pet.ownerEmail && (
            <div className="flex items-center gap-2 text-body text-neutral-600">
              <Mail size={14} className="text-neutral-400 flex-shrink-0" />
              {pet.ownerEmail}
            </div>
          )}
        </div>

        {/* Contact CTAs */}
        <div className="space-y-3 mb-6">
          {pet.ownerPhone && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3.5"
              style={{ background: "#25D366", borderColor: "#25D366" }}
            >
              <MessageCircle size={18} />
              WhatsApp {pet.ownerName.split(" ")[0]}
            </a>
          )}
          {pet.ownerPhone && (
            <a href={`tel:${pet.ownerPhone}`} className="btn-outline w-full justify-center">
              <Phone size={18} />
              Call {pet.ownerPhone}
            </a>
          )}
          {pet.ownerEmail && (
            <a href={`mailto:${pet.ownerEmail}`} className="btn-ghost w-full justify-center">
              <Mail size={18} />
              Email owner
            </a>
          )}
        </div>

        {/* Status transition buttons (only for user-registered pets) */}
        {pet.source === "store" && (
          <div className="border-t border-neutral-100 pt-5">
            <p className="text-label-sm text-neutral-500 mb-3">Update status</p>
            <div className="flex gap-3">
              {pet.status !== "Lost" && (
                <button
                  onClick={() => handleStatusChange("lost")}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border-2 border-warning-500 text-amber-700 text-sm font-medium hover:bg-warning-100 transition-colors disabled:opacity-50"
                >
                  <AlertTriangle size={16} />
                  Mark as Lost
                </button>
              )}
              {pet.status !== "Reunited" && (
                <button
                  onClick={() => handleStatusChange("reunited")}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border-2 border-success-500 text-green-700 text-sm font-medium hover:bg-success-100 transition-colors disabled:opacity-50"
                >
                  <Heart size={16} />
                  Mark as Reunited
                </button>
              )}
            </div>
          </div>
        )}

        {/* Found a similar pet? CTA */}
        <div className="mt-6 bg-secondary-50 rounded-xl p-4 text-center">
          <p className="text-body text-neutral-600 mb-3">Did you spot this pet?</p>
          <Link href="/found/upload" className="btn-secondary">
            Upload a photo to match
          </Link>
        </div>
      </div>
    </div>
  );
}
