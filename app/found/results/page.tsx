"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MessageCircle, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { mockMatchResults } from "@/data/mock-results";
import { getPetById as getStaticPet } from "@/data/pets";
import type { MatchResult } from "@/data/mock-results";
import type { Pet } from "@/data/pets";

interface RankedResult {
  match: MatchResult;
  pet: Pet;
}

function ResultsContent() {
  useSearchParams(); // read reportId if needed in the future
  const [results, setResults] = useState<RankedResult[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Use the rich static mock results (data/mock-results.ts + data/pets.ts)
    // These simulate what the AI would return after analyzing the uploaded photo
    const ranked = mockMatchResults
      .map((m) => {
        const pet = getStaticPet(m.petId);
        return pet ? { match: m, pet } : null;
      })
      .filter(Boolean) as RankedResult[];
    setResults(ranked);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="page-container pt-20 text-center">
        <div className="w-10 h-10 border-2 border-secondary-300 border-t-secondary-500 rounded-full animate-spin-slow mx-auto mb-4" />
        <p className="text-body text-neutral-500">Loading results…</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="page-container pt-20 pb-16 text-center">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="text-h1 text-neutral-800 mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
          No matches found
        </h1>
        <p className="text-body text-neutral-500 mb-8 max-w-xs mx-auto">
          We didn&apos;t find any registered pets matching your photo. The pet might not be registered yet.
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/found/upload" className="btn-primary justify-center">Try with another photo</Link>
          <Link href="/" className="btn-outline justify-center">Back to home</Link>
        </div>
      </div>
    );
  }

  const topMatch = results[0];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-neutral-50 px-4 md:px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Search size={18} className="text-secondary-500" />
            <span className="text-label text-secondary-600 font-medium">
              {results.length} possible match{results.length !== 1 ? "es" : ""} found
            </span>
          </div>
          <h1 className="text-h1 text-neutral-800 mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
            Possible matches
          </h1>
          <p className="text-body text-neutral-500">
            Ranked by photo similarity. Check each profile and contact the owner.
          </p>
        </div>
      </div>

      {/* Top match banner */}
      {topMatch.match.score >= 80 && (
        <div className="px-4 md:px-6 pt-4">
          <div className="max-w-lg mx-auto bg-primary-50 border border-primary-200 rounded-xl p-3 text-center">
            <p className="text-sm font-semibold text-primary-700">
              🎯 Strong match — {topMatch.pet.name} at {topMatch.match.score}% similarity
            </p>
          </div>
        </div>
      )}

      {/* Results list */}
      <div className="px-4 md:px-6 pt-4">
        <div className="max-w-lg mx-auto space-y-3 stagger">
          {results.map(({ match, pet }, i) => {
            const scoreColor =
              match.score >= 80
                ? "bg-success-500"
                : match.score >= 60
                ? "bg-warning-500"
                : "bg-neutral-400";

            return (
              <div key={match.id} className="card !p-0 overflow-hidden animate-fade-in">
                <div className="flex items-start gap-3 p-4">
                  {/* Rank badge */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0
                        ? "bg-primary-500 text-white"
                        : i === 1
                        ? "bg-primary-200 text-primary-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {/* Pet photo */}
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-neutral-100">
                    <Image
                      src={pet.photos[0]}
                      alt={pet.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-bold text-neutral-900">{pet.name}</span>
                      <StatusBadge status={pet.status} />
                    </div>
                    <p className="text-xs text-neutral-500 mb-1 truncate">
                      {pet.breed} · {pet.primaryColor} · {pet.neighborhood}
                    </p>
                    <p className="text-xs text-neutral-600 line-clamp-2">{pet.description}</p>
                  </div>
                </div>

                {/* Match score */}
                <div className="px-4 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColor}`}
                        style={{ width: `${match.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-neutral-500 tabular-nums">
                      {match.score}% match
                    </span>
                  </div>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {match.matchedFeatures.slice(0, 3).map((f) => (
                      <span key={f} className="text-caption px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {f}
                      </span>
                    ))}
                    {match.matchedFeatures.length > 3 && (
                      <span className="text-caption px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400">
                        +{match.matchedFeatures.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/pets/${pet.id}`}
                      className="flex-1 flex items-center justify-center gap-1 text-sm border border-neutral-200 rounded-full py-2.5 font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      View profile
                      <ChevronRight size={14} />
                    </Link>
                    <Link
                      href={`/found/match/${match.id}`}
                      className="flex-1 btn-primary !rounded-full !py-2.5 justify-center text-sm"
                    >
                      <MessageCircle size={16} />
                      Contact owner
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 md:px-6 mt-8 text-center">
        <p className="text-body-sm text-neutral-400 mb-2">Not the right pet?</p>
        <Link href="/found/upload" className="text-sm text-primary-500 font-medium hover:text-primary-600">
          Try with a different photo
        </Link>
      </div>
    </div>
  );
}

export default function FoundResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="page-container pt-20 text-center">
          <div className="w-10 h-10 border-2 border-secondary-300 border-t-secondary-500 rounded-full animate-spin-slow mx-auto mb-4" />
          <p className="text-body text-neutral-500">Loading…</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
