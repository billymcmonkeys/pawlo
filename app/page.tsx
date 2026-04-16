"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PawPrint, Search, Camera, Bell, Users, Heart, ChevronRight, MapPin, Clock, Home } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import PetCard from "@/components/PetCard";
import FloatingCTA from "@/components/FloatingCTA";
import HeroCarousel from "@/components/HeroCarousel";
import { pets } from "@/data/pets";

const reunited = pets.filter((p) => p.status === "Reunited");
const lostPets = pets.filter((p) => p.status === "Lost").slice(0, 4);

const STATS = [
  { icon: PawPrint, value: "2,400+", label: "pets reunited" },
  { icon: Home, value: "180+", label: "neighborhoods" },
  { icon: Clock, value: "4h avg", label: "to reunite" },
];

const HOW_STEPS = [
  {
    number: 1,
    icon: Camera,
    title: "Register",
    desc: "Add your pet's photo, info, and your contact details.",
  },
  {
    number: 2,
    icon: Bell,
    title: "Alert neighbors",
    desc: "Mark your pet as Lost — your neighborhood gets notified instantly.",
  },
  {
    number: 3,
    icon: Users,
    title: "Community spots",
    desc: "A neighbor spots your pet and sends you a photo and location.",
  },
  {
    number: 4,
    icon: Heart,
    title: "Reunited",
    desc: "Connect, pick up your pet, and mark them as Reunited.",
  },
];

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    alt: "Happy golden retriever",
    stat: "2,400+",
    label: "pets reunited",
  },
  {
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    alt: "Cute tabby cat",
    stat: "4h avg",
    label: "time to reunite",
  },
  {
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    alt: "Playful dog",
    stat: "180+",
    label: "neighborhoods",
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setScrolled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-hidden pb-28">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-neutral-50 px-4 md:px-6 pt-6 pb-8 md:pt-12 md:pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Carousel for mobile */}
          <div className="mb-6 animate-fade-in">
            <HeroCarousel slides={HERO_SLIDES} />
          </div>

          {/* Text */}
          <div className="text-center md:text-left animate-slide-up">
            <h1 className="text-display-xl md:text-5xl font-black text-neutral-800 leading-tight mb-3 font-rounded">
              Reunite.{" "}
              <span className="text-primary-500">Rescue.</span>{" "}
              Repeat.
            </h1>
            <p className="text-body text-neutral-600 mb-6 max-w-md mx-auto md:mx-0">
              Connect with your neighborhood to bring lost pets back home safely.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center md:justify-start">
              <Link
                href="/register/step-1"
                className="btn-primary text-base py-3.5 px-6"
                aria-label="Register your pet with Pawlo"
              >
                <PawPrint size={18} strokeWidth={2} />
                Register your pet
              </Link>
              <Link
                href="/found/upload"
                className="btn-secondary text-base py-3.5 px-6"
                aria-label="Report a pet you found"
              >
                <Search size={18} strokeWidth={2} />
                I found a pet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ───────────────────────────────── */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-4 shadow-md">
        <div className="max-w-5xl mx-auto">
          {/* Horizontal scroll on mobile */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto md:justify-center snap-x snap-mandatory pb-1" style={{ scrollbarWidth: "none" }}>
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5 flex-shrink-0 snap-start">
                  {i > 0 && (
                    <span className="hidden md:block text-primary-300 mr-2">|</span>
                  )}
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-black text-base font-rounded">{stat.value}</div>
                    <div className="text-primary-100 text-xs font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-white py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-h1 text-neutral-800 mb-6 text-center font-rounded font-black">
            How Pawlo works
          </h2>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2" style={{ scrollbarWidth: "none" }}>
            {HOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex-shrink-0 w-64 snap-start bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-rounded font-bold text-neutral-800">
                      {step.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-mobile flex items-center justify-center mb-3 border border-neutral-100">
                    <Icon size={24} className="text-secondary-600" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-6 stagger">
            {HOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center p-4">
                    {/* Step number */}
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center mb-3">
                      {step.number}
                    </div>
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-secondary-50 flex items-center justify-center mb-4">
                      <Icon size={28} className="text-secondary-500" />
                    </div>
                    {/* Text */}
                    <h3 className="text-h3 text-neutral-800 mb-2 font-rounded font-bold">
                      {step.title}
                    </h3>
                    <p className="text-body text-neutral-600">{step.desc}</p>
                  </div>
                  {/* Connector arrow (desktop) */}
                  {step.number < 4 && (
                    <ChevronRight
                      size={20}
                      className="absolute top-[60px] -right-3 text-neutral-300"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RECENTLY REUNITED ─────────────────────────────────── */}
      {reunited.length >= 1 && (
        <section className="bg-neutral-50 py-10 md:py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h1 text-neutral-800 mb-5 font-rounded font-black">
              Recently reunited
            </h2>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              {reunited.map((pet) => (
                <Link
                  key={pet.id}
                  href={`/pets/${pet.id}`}
                  className="flex-shrink-0 snap-start bg-white rounded-2xl overflow-hidden shadow-mobile border border-neutral-100 w-32 hover:shadow-md transition-shadow"
                >
                  <div className="w-full aspect-square bg-neutral-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pet.photos[0]}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-sm font-rounded font-bold text-neutral-700 truncate mb-1">
                      {pet.name}
                    </p>
                    <StatusBadge status={pet.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LOST PETS NEARBY ─────────────────────────────────── */}
      {lostPets.length > 0 && (
        <section className="bg-warning-50 py-10 md:py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-h1 text-neutral-800 font-rounded font-black">
                Lost nearby
              </h2>
              <Link
                href="/found/upload"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 transition-colors"
              >
                Help find <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {lostPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} href={`/pets/${pet.id}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECONDARY CTA ─────────────────────────────────────── */}
      <section className="bg-secondary-50 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-display-lg text-neutral-800 mb-3 font-rounded font-black">
            Ready to protect your pet?
          </h2>
          <p className="text-body text-neutral-600 mb-6">
            It&apos;s free and takes 2 minutes.
          </p>
          <Link href="/register/step-1" className="btn-primary text-base py-3.5 px-8">
            <PawPrint size={18} strokeWidth={2} />
            Register your pet
          </Link>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-neutral-800 text-neutral-400 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-200">
            <PawPrint size={18} className="text-primary-400" strokeWidth={2} />
            <span className="font-black text-lg font-rounded">
              Pawlo
            </span>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/how-it-works" className="hover:text-neutral-200 transition-colors">
              How it works
            </Link>
            <span>·</span>
            <a href="#" className="hover:text-neutral-200 transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-200 transition-colors">Contact</a>
          </nav>
          <p className="text-xs">© 2026 Pawlo</p>
        </div>
      </footer>

      {/* Floating CTA for mobile */}
      <div className="md:hidden">
        <FloatingCTA href="/found/upload" icon={Search} label="I found a pet" />
      </div>
    </main>
  );
}
