"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-sticky bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-mobile" : "border-b border-neutral-100"
      }`}
    >
      <div className="page-container flex items-center justify-between h-12 md:h-14">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-black text-lg md:text-xl text-primary-500 font-rounded"
        >
          <PawPrint size={20} className="text-primary-500" />
          Pawlo
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 border-2 border-primary-300 rounded-full px-3 py-1.5 md:px-4 md:py-2 active:scale-95 transition-all hover:bg-primary-50"
          aria-label="Register your pet"
        >
          <span className="hidden sm:inline">Register pet</span>
          <PawPrint size={16} className="sm:hidden" />
        </Link>
      </div>
    </header>
  );
}
