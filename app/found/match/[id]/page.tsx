"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Phone, Mail, MessageCircle, CheckCircle2, XCircle, User, MapPin } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { getMatchById } from "@/lib/matches";
import { getPetById } from "@/data/pets";
import type { MatchResult } from "@/data/mock-results";
import type { Pet } from "@/data/pets";

export default function FoundMatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [pet, setPet] = useState<Pet | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const m = getMatchById(id);
    if (!m) { setNotFound(true); return; }
    const p = getPetById(m.petId);
    if (!p) { setNotFound(true); return; }
    setMatch(m);
    setPet(p);
  }, [id]);

  if (notFound) {
    return (
      <div className="page-container pt-20 pb-16 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-h1 text-neutral-800 mb-4" style={{ fontFamily: "Nunito, sans-serif" }}>
          Match not found
        </h1>
        <button onClick={() => router.back()} className="btn-primary">
          Go back
        </button>
      </div>
    );
  }

  if (!match || !pet) {
    return (
      <div className="page-container pt-20 text-center">
        <div className="w-10 h-10 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin-slow mx-auto" />
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${pet.owner.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi ${pet.owner.name.split(" ")[0]}! I found a pet that looks like ${pet.name}. Are you looking for them?`
  )}`;

  const scoreColor =
    match.score >= 80 ? "text-green-700 bg-success-100" :
    match.score >= 60 ? "text-amber-700 bg-warning-100" :
    "text-neutral-600 bg-neutral-100";

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="sticky top-14 z-10 bg-white border-b border-neutral-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-neutral-700" />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-neutral-800 text-sm leading-tight">{pet.name}</h1>
          <p className="text-xs text-neutral-500">{match.score}% match confidence</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scoreColor}`}>
          {match.score}%
        </span>
      </div>

      <div className="page-container pt-6">
        {/* Photo comparison */}
        <div className="mb-6">
          <p className="text-label-sm text-neutral-400 uppercase tracking-wide mb-3">Photo comparison</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Found photo */}
            <div>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                <Image
                  src={match.uploadedPhotoUrl}
                  alt="Found pet"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs text-center py-1.5 font-medium">
                  You found
                </div>
              </div>
            </div>

            {/* Registered photo */}
            <div>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                <Image
                  src={pet.photos[0]}
                  alt={pet.name}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs text-center py-1.5 font-medium">
                  Registered
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Match score */}
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-label font-semibold text-neutral-700">Match confidence</p>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${scoreColor}`}>
              {match.score}%
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden mb-3">
            <div
              className={`h-full rounded-full ${
                match.score >= 80 ? "bg-success-500" : match.score >= 60 ? "bg-warning-500" : "bg-neutral-400"
              }`}
              style={{ width: `${match.score}%` }}
            />
          </div>

          {/* Matched features */}
          <p className="text-label-sm text-neutral-500 mb-2">Matched features</p>
          <div className="space-y-1.5">
            {match.matchedFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-success-500 flex-shrink-0" />
                <span className="text-body text-neutral-700">{f}</span>
              </div>
            ))}
          </div>

          {match.notes && (
            <div className="mt-3 pt-3 border-t border-neutral-100">
              <p className="text-body-sm text-neutral-500 italic">{match.notes}</p>
            </div>
          )}
        </div>

        {/* Pet info */}
        <div className="card mb-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-h3 text-neutral-800" style={{ fontFamily: "Nunito, sans-serif" }}>
                {pet.name}
              </h2>
              <p className="text-body text-neutral-500">{pet.breed} · {pet.primaryColor}</p>
            </div>
            <StatusBadge status={pet.status} />
          </div>
          <div className="flex items-center gap-2 text-body text-neutral-600 mb-1">
            <MapPin size={14} className="text-neutral-400" />
            {pet.neighborhood}
          </div>
          <p className="text-body text-neutral-600 mt-2">{pet.description}</p>
        </div>

        {/* Owner contact */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-neutral-400" />
            <p className="text-label font-semibold text-neutral-700">Owner: {pet.owner.name}</p>
          </div>

          {/* 3 contact CTAs */}
          <div className="space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3.5"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={18} />
              WhatsApp {pet.owner.name.split(" ")[0]}
            </a>

            <a
              href={`tel:${pet.owner.phone}`}
              className="btn-outline w-full justify-center"
            >
              <Phone size={18} />
              Call {pet.owner.phone}
            </a>

            <a
              href={`mailto:${pet.owner.email}?subject=I found ${pet.name}&body=Hi ${pet.owner.name.split(" ")[0]}! I found a pet that looks like ${pet.name}. Please contact me to confirm.`}
              className="btn-ghost w-full justify-center text-neutral-600"
            >
              <Mail size={16} />
              Send email
            </a>
          </div>
        </div>

        {/* Not a match? */}
        <div className="text-center">
          <p className="text-body-sm text-neutral-400 mb-2">This isn&apos;t the right pet?</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 font-medium"
          >
            <XCircle size={14} />
            See other matches
          </button>
        </div>
      </div>
    </div>
  );
}
