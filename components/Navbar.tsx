"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PawPrint, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[200] h-14 transition-all duration-normal ${
        scrolled
          ? "bg-white shadow-sm border-b border-neutral-100"
          : "bg-white/95 backdrop-blur"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 font-display font-bold text-xl text-primary-500 hover:text-primary-600 transition-colors duration-fast"
        >
          <PawPrint size={22} strokeWidth={2} />
          <span style={{ fontFamily: "Nunito, sans-serif" }}>Pawlo</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">
            How it works
          </Link>
          <Link href="/found/upload" className="btn-secondary !py-2 !px-4 text-sm">
            Found a pet
          </Link>
          <Link href="/register/step-1" className="btn-primary !py-2 !px-4 text-sm">
            Register pet
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 inset-x-0 bg-white border-b border-neutral-200 shadow-md z-[200] animate-fade-in">
          <div className="flex flex-col gap-1 px-4 py-4">
            <Link
              href="/how-it-works"
              className="py-2.5 px-3 rounded-md text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/found/upload"
              className="py-2.5 px-3 rounded-md text-secondary-700 font-medium hover:bg-secondary-50 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              I found a pet
            </Link>
            <Link
              href="/register/step-1"
              className="mt-1 btn-primary justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Register my pet
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
