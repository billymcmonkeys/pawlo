"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, User, Phone, Mail, MapPin } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";

const DRAFT_KEY = "pawlo_register_draft";

const NEIGHBORHOODS = [
  "Palermo", "Belgrano", "Recoleta", "Villa Crespo", "Caballito",
  "Flores", "San Telmo", "Almagro", "Colegiales", "Núñez",
  "Villa Devoto", "Saavedra", "Liniers", "Parque Chacabuco", "Other",
];

interface Step3Fields {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  neighborhood: string;
  showWhatsApp: boolean;
}

function readDraft(): Step3Fields {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { ownerName: "", ownerPhone: "", ownerEmail: "", neighborhood: "", showWhatsApp: true };
    const d = JSON.parse(raw);
    return {
      ownerName: d.ownerName ?? "",
      ownerPhone: d.ownerPhone ?? "",
      ownerEmail: d.ownerEmail ?? "",
      neighborhood: d.neighborhood ?? "",
      showWhatsApp: d.showWhatsApp ?? true,
    };
  } catch {
    return { ownerName: "", ownerPhone: "", ownerEmail: "", neighborhood: "", showWhatsApp: true };
  }
}

function isValidPhone(v: string): boolean {
  return v.replace(/\D/g, "").length >= 7;
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function RegisterStep3() {
  const router = useRouter();
  const [fields, setFields] = useState<Step3Fields>({
    ownerName: "", ownerPhone: "", ownerEmail: "", neighborhood: "", showWhatsApp: true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Step3Fields, string>>>({});

  useEffect(() => {
    setFields(readDraft());
  }, []);

  function set<K extends keyof Step3Fields>(key: K, value: Step3Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function saveDraft(f: Step3Fields) {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? JSON.parse(raw) : {};
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, ...f }));
    } catch { /* ignore */ }
  }

  function validate(): boolean {
    const e: Partial<Record<keyof Step3Fields, string>> = {};
    if (!fields.ownerName.trim()) e.ownerName = "Name is required";
    if (!fields.ownerPhone.trim()) e.ownerPhone = "Phone is required";
    else if (!isValidPhone(fields.ownerPhone)) e.ownerPhone = "Enter a valid phone number";
    if (fields.ownerEmail && !isValidEmail(fields.ownerEmail)) e.ownerEmail = "Enter a valid email";
    if (!fields.neighborhood) e.neighborhood = "Select a neighborhood";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    saveDraft(fields);
    router.push("/register/review");
  }

  return (
    <div className="page-container pt-8 pb-16">
      <div className="mb-8">
        <ProgressIndicator currentStep={3} />
      </div>

      <div className="mb-6">
        <h1 className="text-h1 text-neutral-800 mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          Your contact info
        </h1>
        <p className="text-body text-neutral-500">
          This is how neighbors will reach you if they find your pet.
        </p>
      </div>

      <div className="space-y-5">
        {/* Owner name */}
        <div>
          <label htmlFor="owner-name" className="field-label">
            <span className="inline-flex items-center gap-1.5"><User size={14} />Your name *</span>
          </label>
          <input
            id="owner-name"
            type="text"
            value={fields.ownerName}
            onChange={(e) => set("ownerName", e.target.value)}
            className="field-input"
            placeholder="e.g. Laura Méndez"
            maxLength={80}
          />
          {errors.ownerName && <p className="field-error">{errors.ownerName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="owner-phone" className="field-label">
            <span className="inline-flex items-center gap-1.5"><Phone size={14} />Phone *</span>
          </label>
          <input
            id="owner-phone"
            type="tel"
            value={fields.ownerPhone}
            onChange={(e) => set("ownerPhone", e.target.value)}
            className="field-input"
            placeholder="+54 11 1234-5678"
          />
          {errors.ownerPhone && <p className="field-error">{errors.ownerPhone}</p>}

          {/* WhatsApp toggle */}
          <label className="flex items-center gap-2.5 mt-2 cursor-pointer">
            <div
              onClick={() => set("showWhatsApp", !fields.showWhatsApp)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-fast ${
                fields.showWhatsApp ? "bg-primary-500" : "bg-neutral-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-fast ${
                  fields.showWhatsApp ? "left-5" : "left-0.5"
                }`}
              />
            </div>
            <span className="text-body text-neutral-700">Also available on WhatsApp</span>
          </label>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="owner-email" className="field-label">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} />
              Email
              <span className="text-neutral-400 font-normal">(optional)</span>
            </span>
          </label>
          <input
            id="owner-email"
            type="email"
            value={fields.ownerEmail}
            onChange={(e) => set("ownerEmail", e.target.value)}
            className="field-input"
            placeholder="laura@email.com"
          />
          {errors.ownerEmail && <p className="field-error">{errors.ownerEmail}</p>}
        </div>

        {/* Neighborhood */}
        <div>
          <label htmlFor="neighborhood" className="field-label">
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} />Neighborhood *</span>
          </label>
          <select
            id="neighborhood"
            value={fields.neighborhood}
            onChange={(e) => set("neighborhood", e.target.value)}
            className="field-select"
          >
            <option value="">Select neighborhood…</option>
            {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          {errors.neighborhood && <p className="field-error">{errors.neighborhood}</p>}
        </div>

        {/* Privacy note */}
        <div className="bg-secondary-50 rounded-lg p-3">
          <p className="text-body-sm text-secondary-700">
            🔒 Your contact info is only shown to neighbors who upload a photo that matches your pet.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => router.back()}
          className="btn-outline !px-4"
          aria-label="Go back to step 2"
        >
          <ArrowLeft size={18} />
        </button>
        <button onClick={handleNext} className="btn-primary flex-1 justify-center">
          Review registration
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
