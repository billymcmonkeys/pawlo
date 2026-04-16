"use client";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Props {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function FloatingCTA({ href, icon: Icon, label }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-raised pointer-events-none">
      <div className="page-container pb-6 pt-3 pointer-events-none">
        <Link
          href={href}
          className="btn-primary w-full justify-center text-base py-4 shadow-primary shadow-lg pointer-events-auto animate-bounce-in"
        >
          <Icon size={20} strokeWidth={2} />
          {label}
        </Link>
      </div>
      {/* Gradient fade to white at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none -z-10" />
    </div>
  );
}
