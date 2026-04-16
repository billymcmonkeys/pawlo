// Re-exports and helper functions for pet data
// Components should import from here, not from data/ directly

export { pets, getPetById, getPetsByStatus } from "@/data/pets";
export type { Pet, PetStatus, PetSpecies, PetSize } from "@/data/pets";

import { pets } from "@/data/pets";
import type { PetStatus } from "@/data/pets";

export function getPetStatusCounts(): Record<PetStatus, number> {
  return pets.reduce(
    (acc, pet) => {
      acc[pet.status] = (acc[pet.status] ?? 0) + 1;
      return acc;
    },
    { Active: 0, Lost: 0, Reunited: 0 } as Record<PetStatus, number>
  );
}

export function searchPets(query: string) {
  const q = query.toLowerCase();
  return pets.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q) ||
      p.neighborhood.toLowerCase().includes(q) ||
      p.primaryColor.toLowerCase().includes(q)
  );
}
