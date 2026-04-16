"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import StatusBadge from "@/components/StatusBadge";
import { getPetById, type Pet } from "@/lib/store";

export default function ContactPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const p = getPetById(id);
    setPet(p);
    setLoading(false);
  }, [id]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    // In a real app this would POST to an API; for demo we just show confirmation
    setMessageSent(true);
  }

  if (loading) {
    return (
      <>

        <main className="page-container pt-16 text-center">
          <p className="text-stone-400">Loading…</p>
        </main>
      </>
    );
  }

  if (!pet) {
    return (
      <>

        <main className="page-container pt-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-stone-500 mb-6">Pet not found.</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Back to home
          </button>
        </main>
      </>
    );
  }

  if (messageSent) {
    return (
      <>

        <main className="page-container pt-12 text-center">
          <div className="text-6xl mb-4">📬</div>
          <h1 className="text-2xl font-extrabold text-stone-900 mb-2">Message sent!</h1>
          <p className="text-stone-500 text-sm mb-8 max-w-xs mx-auto">
            {pet.ownerName} will be notified that someone may have found {pet.name}. They&apos;ll contact you shortly.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <a href={`tel:${pet.ownerPhone}`} className="btn-primary">
              📞 Call directly
            </a>
            <Link href="/" className="btn-secondary text-center">
              Back to home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>

      <main className="page-container py-8 pb-16">
        <h1 className="text-2xl font-extrabold text-stone-900 mb-1">Contact owner</h1>
        <p className="text-stone-500 text-sm mb-6">
          Reach out to {pet.ownerName} about {pet.name}.
        </p>

        {/* Pet summary card */}
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-orange-100 flex items-center justify-center flex-shrink-0">
            {pet.photoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pet.photoDataUrl} alt={pet.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">{pet.species === "cat" ? "🐱" : "🐶"}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-bold text-stone-900">{pet.name}</span>
              <StatusBadge status={pet.status} />
            </div>
            <p className="text-xs text-stone-500">{pet.breed} · {pet.neighborhood}</p>
          </div>
        </div>

        {/* Direct contact */}
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Quick contact</h2>
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${pet.ownerPhone}`}
              className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-xl active:scale-95 transition-transform"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-stone-800 text-sm">Call</p>
                <p className="text-stone-500 text-xs">{pet.ownerPhone}</p>
              </div>
            </a>
            <a
              href={`mailto:${pet.ownerEmail}?subject=I may have found ${encodeURIComponent(pet.name)}`}
              className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-xl active:scale-95 transition-transform"
            >
              <span className="text-2xl">✉️</span>
              <div>
                <p className="font-semibold text-stone-800 text-sm">Email</p>
                <p className="text-stone-500 text-xs">{pet.ownerEmail}</p>
              </div>
            </a>
          </div>
        </section>

        {/* In-app message */}
        <section>
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Or send a message</h2>
          <form onSubmit={handleSend} className="space-y-3">
            <textarea
              rows={4}
              placeholder={`Tell ${pet.ownerName} where and when you found ${pet.name}…`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn-primary w-full disabled:opacity-40"
            >
              Send message
            </button>
          </form>
        </section>

        <div className="mt-6 text-center">
          <Link href={`/pet/${pet.id}`} className="text-sm text-orange-500 underline">
            View {pet.name}&apos;s full profile
          </Link>
        </div>
      </main>
    </>
  );
}
