import Link from "next/link";
import { MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Pet } from "@/data/pets";

interface Props {
  pet: Pet;
  href?: string;
}

export default function PetCard({ pet, href }: Props) {
  const content = (
    <>
      {/* Pet Photo */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pet.photos[0]}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={pet.status} />
        </div>
      </div>

      {/* Pet Info */}
      <div className="p-4">
        {/* Pet Name - Playful Font */}
        <h3 className="text-xl font-rounded font-bold text-neutral-800 mb-1">
          {pet.name}
        </h3>

        {/* Breed & Age */}
        <p className="text-sm text-neutral-600 mb-2">
          {pet.breed} · {pet.age} {pet.age === 1 ? "year" : "years"} old
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin size={14} strokeWidth={2} />
          <span>{pet.neighborhood}</span>
        </div>

        {/* Lost Date (if applicable) */}
        {pet.status === "Lost" && pet.lostAt && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-xs text-warning-600 font-medium">
              Lost since {new Date(pet.lostAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </>
  );

  const cardClassName = "block bg-white rounded-2xl overflow-hidden shadow-mobile border border-neutral-100 transition-all duration-normal hover:shadow-md hover:-translate-y-1 active:scale-[0.98]";

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      {content}
    </div>
  );
}
