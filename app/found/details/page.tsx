"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Dog, Cat, HelpCircle } from "lucide-react";

const FOUND_KEY = "pawlo_found_draft";

const NEIGHBORHOODS = [
  "Palermo", "Belgrano", "Recoleta", "Villa Crespo", "Caballito",
  "Flores", "San Telmo", "Almagro", "Colegiales", "Núñez",
  "Villa Devoto", "Saavedra", "Liniers", "Parque Chacabuco", "Other",
];

export default function FoundDetailsPage() {
  const router = useRouter();
  const [species, setSpecies] = useState<"Dog" | "Cat" | "Unknown">("Unknown");
  const [neighborhood, setNeighborhood] = useState("");
  const [description, setDescription] = useState("");

  function handleContinue() {
    try {
      const raw = localStorage.getItem(FOUND_KEY);
      const draft = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        FOUND_KEY,
        JSON.stringify({ ...draft, species, neighborhood, description })
      );
    } catch { /* ignore */ }
    router.push("/found/processing");
  }

  return (
    <div className="page-container pt-8 pb-16">
      <div className="mb-6">
        <h1
          className="text-h1 text-neutral-800 mb-2"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Quick details
        </h1>
        <p className="text-body text-neutral-500">
          Optional — these help narrow down the match. Skip if unsure.
        </p>
      </div>

      <div className="space-y-6">
        {/* Species */}
        <div>
          <label className="field-label">What kind of pet?</label>
          <div className="flex gap-3">
            {([
              { val: "Dog" as const, Icon: Dog, label: "Dog" },
              { val: "Cat" as const, Icon: Cat, label: "Cat" },
              { val: "Unknown" as const, Icon: HelpCircle, label: "Not sure" },
            ]).map(({ val, Icon, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => setSpecies(val)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-md border-2 text-sm font-medium transition-all duration-fast ${
                  species === val
                    ? "border-secondary-500 bg-secondary-50 text-secondary-700"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <label htmlFor="neighborhood" className="field-label">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              Where did you find them?
            </span>
          </label>
          <select
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="field-select"
          >
            <option value="">Select neighborhood…</option>
            {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="field-label">
            Anything notable?{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="field-textarea"
            rows={3}
            placeholder="Collar color, markings, temperament, where exactly…"
            maxLength={300}
          />
          <p className="text-caption text-neutral-400 text-right mt-1">{description.length}/300</p>
        </div>

        {/* Skip notice */}
        <p className="text-body-sm text-neutral-400 text-center">
          All fields are optional. The AI can match using the photo alone.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => router.back()}
          className="btn-outline !px-4"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <button onClick={handleContinue} className="btn-primary flex-1 justify-center">
          Find matches
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
