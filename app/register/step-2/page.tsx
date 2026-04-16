"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Dog, Cat } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";

const DRAFT_KEY = "pawlo_register_draft";

const BREEDS_DOG = [
  "Golden Retriever", "Labrador Retriever", "German Shepherd", "French Bulldog",
  "Bulldog", "Poodle", "Beagle", "Rottweiler", "Siberian Husky", "Dachshund",
  "Shih Tzu", "Border Collie", "Doberman", "Boxer", "Mixed / Unknown",
];
const BREEDS_CAT = [
  "Siamese", "Persian", "Maine Coon", "Ragdoll", "Bengal",
  "British Shorthair", "Domestic Shorthair", "Domestic Longhair",
  "Abyssinian", "Russian Blue", "Tabby Mix", "Mixed / Unknown",
];
const SIZES = ["Small (< 10 kg)", "Medium (10–25 kg)", "Large (> 25 kg)"];
const COLORS = [
  "Black", "White", "Golden", "Brown", "Grey", "Orange", "Cream",
  "Brindle", "Tricolor", "Spotted", "Tabby", "Other",
];

interface Step2Fields {
  name: string;
  species: "Dog" | "Cat" | "";
  breed: string;
  age: string;
  size: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
}

function readDraft(): Step2Fields {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { name: "", species: "", breed: "", age: "", size: "", primaryColor: "", secondaryColor: "", description: "" };
    const d = JSON.parse(raw);
    return {
      name: d.name ?? "",
      species: d.species ?? "",
      breed: d.breed ?? "",
      age: d.age ?? "",
      size: d.size ?? "",
      primaryColor: d.primaryColor ?? "",
      secondaryColor: d.secondaryColor ?? "",
      description: d.description ?? "",
    };
  } catch {
    return { name: "", species: "", breed: "", age: "", size: "", primaryColor: "", secondaryColor: "", description: "" };
  }
}

export default function RegisterStep2() {
  const router = useRouter();
  const [fields, setFields] = useState<Step2Fields>({
    name: "", species: "", breed: "", age: "", size: "", primaryColor: "", secondaryColor: "", description: "",
  });
  const [errors, setErrors] = useState<Partial<Step2Fields>>({});

  useEffect(() => {
    setFields(readDraft());
  }, []);

  function set<K extends keyof Step2Fields>(key: K, value: Step2Fields[K]) {
    const next = { ...fields, [key]: value };
    // Reset breed if species changes
    if (key === "species") next.breed = "";
    setFields(next);
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function saveDraft(f: Step2Fields) {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? JSON.parse(raw) : {};
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, ...f }));
    } catch { /* ignore */ }
  }

  function validate(): boolean {
    const e: Partial<Step2Fields> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.species) e.species = "Select a species" as Step2Fields["species"];
    if (!fields.breed) e.breed = "Select a breed";
    if (!fields.primaryColor) e.primaryColor = "Select a color";
    if (!fields.description.trim()) e.description = "Add a short description";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    saveDraft(fields);
    router.push("/register/step-3");
  }

  const breeds = fields.species === "Dog" ? BREEDS_DOG : fields.species === "Cat" ? BREEDS_CAT : [];

  return (
    <div className="page-container pt-8 pb-16">
      <div className="mb-8">
        <ProgressIndicator currentStep={2} />
      </div>

      <div className="mb-6">
        <h1 className="text-h1 text-neutral-800 mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          Pet profile
        </h1>
        <p className="text-body text-neutral-500">Tell us about your pet so we can find them.</p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="pet-name" className="field-label">Pet name *</label>
          <input
            id="pet-name"
            type="text"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            className="field-input"
            placeholder="e.g. Mango"
            maxLength={40}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        {/* Species */}
        <div>
          <label className="field-label">Species *</label>
          <div className="flex gap-3">
            {(["Dog", "Cat"] as const).map((sp) => {
              const Icon = sp === "Dog" ? Dog : Cat;
              const active = fields.species === sp;
              return (
                <button
                  key={sp}
                  type="button"
                  onClick={() => set("species", sp)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md border-2 font-medium text-sm transition-all duration-fast ${
                    active
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <Icon size={18} />
                  {sp}
                </button>
              );
            })}
          </div>
          {errors.species && <p className="field-error">{errors.species}</p>}
        </div>

        {/* Breed */}
        {breeds.length > 0 && (
          <div>
            <label htmlFor="breed" className="field-label">Breed *</label>
            <select
              id="breed"
              value={fields.breed}
              onChange={(e) => set("breed", e.target.value)}
              className="field-select"
            >
              <option value="">Select breed…</option>
              {breeds.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.breed && <p className="field-error">{errors.breed}</p>}
          </div>
        )}

        {/* Age + Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="field-label">Age (years)</label>
            <input
              id="age"
              type="number"
              min="0"
              max="30"
              value={fields.age}
              onChange={(e) => set("age", e.target.value)}
              className="field-input"
              placeholder="e.g. 3"
            />
          </div>
          <div>
            <label htmlFor="size" className="field-label">Size</label>
            <select
              id="size"
              value={fields.size}
              onChange={(e) => set("size", e.target.value)}
              className="field-select"
            >
              <option value="">Select…</option>
              {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="field-label">Primary color *</label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => set("primaryColor", color)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-fast ${
                  fields.primaryColor === color
                    ? "border-primary-500 bg-primary-100 text-primary-700"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          {errors.primaryColor && <p className="field-error">{errors.primaryColor}</p>}
        </div>

        <div>
          <label className="field-label">Secondary color <span className="text-neutral-400 font-normal">(optional)</span></label>
          <div className="flex flex-wrap gap-2">
            {["None", ...COLORS].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => set("secondaryColor", color === "None" ? "" : color)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-fast ${
                  (color === "None" ? "" : color) === fields.secondaryColor
                    ? "border-primary-500 bg-primary-100 text-primary-700"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="field-label">Description *</label>
          <textarea
            id="description"
            value={fields.description}
            onChange={(e) => set("description", e.target.value)}
            className="field-textarea"
            rows={3}
            placeholder="Distinctive marks, personality, collar, microchip, last seen location…"
            maxLength={400}
          />
          <div className="flex justify-between mt-1">
            {errors.description ? (
              <p className="field-error">{errors.description}</p>
            ) : <span />}
            <span className="text-caption text-neutral-400">{fields.description.length}/400</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => router.back()}
          className="btn-outline !px-4"
          aria-label="Go back to step 1"
        >
          <ArrowLeft size={18} />
        </button>
        <button onClick={handleNext} className="btn-primary flex-1 justify-center">
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
