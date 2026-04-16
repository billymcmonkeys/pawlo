"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/PhotoUpload";
import { savePet, generateId, type Pet, type PetStatus } from "@/lib/store";

interface FormErrors {
  name?: string;
  breed?: string;
  color?: string;
  description?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  neighborhood?: string;
}

function validate(fields: Partial<Pet>): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name?.trim()) errors.name = "Pet name is required.";
  else if (fields.name.trim().length > 40) errors.name = "Max 40 characters.";

  if (!fields.breed?.trim()) errors.breed = "Breed is required.";
  if (!fields.color?.trim()) errors.color = "Color is required.";
  if (!fields.description?.trim()) errors.description = "Description is required.";
  else if (fields.description.trim().length < 10) errors.description = "Please add at least 10 characters.";

  if (!fields.ownerName?.trim()) errors.ownerName = "Your name is required.";

  const phone = fields.ownerPhone?.trim() ?? "";
  if (!phone) errors.ownerPhone = "Phone is required.";
  else if (!/^\+?[\d\s\-().]{7,20}$/.test(phone)) errors.ownerPhone = "Enter a valid phone number.";

  const email = fields.ownerEmail?.trim() ?? "";
  if (!email) errors.ownerEmail = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.ownerEmail = "Enter a valid email.";

  if (!fields.neighborhood?.trim()) errors.neighborhood = "Neighborhood is required.";

  return errors;
}

export default function RegisterPage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [species, setSpecies] = useState<"dog" | "cat" | "other">("dog");
  const [status, setStatus] = useState<PetStatus>("active");
  const [fields, setFields] = useState({
    name: "",
    breed: "",
    color: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    neighborhood: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate({ ...fields, species, status });
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const id = generateId();
    const pet: Pet = {
      id,
      ...fields,
      species,
      status,
      photoDataUrl: photo,
      createdAt: new Date().toISOString(),
    };
    savePet(pet);
    setSavedId(id);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted && savedId) {
    return (
      <>
        <main className="page-container pt-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-extrabold text-stone-900 mb-2">Pet registered!</h1>
          <p className="text-stone-500 mb-8">
            {fields.name} is now on Pawlo. Neighbors in your area will be notified if someone reports a matching pet.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <button
              onClick={() => router.push(`/pet/${savedId}`)}
              className="btn-primary"
            >
              View {fields.name}&apos;s profile
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn-secondary"
            >
              Back to home
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="page-container py-8">
        <h1 className="text-2xl font-extrabold text-stone-900 mb-1">Register your pet</h1>
        <p className="text-stone-500 text-sm mb-6">Create a profile so neighbors can recognize them.</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Photo */}
          <PhotoUpload value={photo} onChange={setPhoto} label="Add a photo of your pet" />

          {/* Pet info */}
          <section className="space-y-4">
            <h2 className="font-semibold text-stone-700">About your pet</h2>

            <Field label="Pet name *" error={errors.name}>
              <input
                type="text"
                placeholder="e.g. Milo"
                value={fields.name}
                onChange={update("name")}
                maxLength={40}
                className={input(errors.name)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Species">
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as "dog" | "cat" | "other")}
                  className={input()}
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PetStatus)}
                  className={input()}
                >
                  <option value="active">Active</option>
                  <option value="lost">Lost</option>
                </select>
              </Field>
            </div>

            <Field label="Breed *" error={errors.breed}>
              <input
                type="text"
                placeholder="e.g. Golden Retriever"
                value={fields.breed}
                onChange={update("breed")}
                className={input(errors.breed)}
              />
            </Field>

            <Field label="Color *" error={errors.color}>
              <input
                type="text"
                placeholder="e.g. golden, black and white"
                value={fields.color}
                onChange={update("color")}
                className={input(errors.color)}
              />
            </Field>

            <Field label="Description *" error={errors.description}>
              <textarea
                rows={3}
                placeholder="Distinctive marks, collar, behavior..."
                value={fields.description}
                onChange={update("description")}
                className={input(errors.description) + " resize-none"}
              />
            </Field>

            <Field label="Neighborhood *" error={errors.neighborhood}>
              <input
                type="text"
                placeholder="e.g. Palermo, Belgrano"
                value={fields.neighborhood}
                onChange={update("neighborhood")}
                className={input(errors.neighborhood)}
              />
            </Field>
          </section>

          {/* Owner info */}
          <section className="space-y-4">
            <h2 className="font-semibold text-stone-700">Your contact info</h2>

            <Field label="Your name *" error={errors.ownerName}>
              <input
                type="text"
                placeholder="Full name"
                value={fields.ownerName}
                onChange={update("ownerName")}
                className={input(errors.ownerName)}
              />
            </Field>

            <Field label="Phone *" error={errors.ownerPhone}>
              <input
                type="tel"
                placeholder="+1 555-0100"
                value={fields.ownerPhone}
                onChange={update("ownerPhone")}
                className={input(errors.ownerPhone)}
              />
            </Field>

            <Field label="Email *" error={errors.ownerEmail}>
              <input
                type="email"
                placeholder="you@example.com"
                value={fields.ownerEmail}
                onChange={update("ownerEmail")}
                className={input(errors.ownerEmail)}
              />
            </Field>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-base py-4 disabled:opacity-60"
          >
            {submitting ? "Saving…" : "Register pet"}
          </button>
        </form>
      </main>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-stone-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
    error ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
  }`;
}
