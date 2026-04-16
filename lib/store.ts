// Mock-persist store using localStorage
// All data lives client-side — no backend required for demo

export type PetStatus = "active" | "lost" | "reunited";

export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  color: string;
  description: string;
  photoDataUrl: string | null;
  status: PetStatus;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  neighborhood: string;
  createdAt: string;
}

export interface FoundReport {
  id: string;
  description: string;
  photoDataUrl: string | null;
  neighborhood: string;
  createdAt: string;
  matchScores?: { petId: string; score: number }[];
}

const PETS_KEY = "pawlo_pets";
const FOUND_KEY = "pawlo_found_reports";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return localStorage;
}

// --- Pets ---

export function getPets(): Pet[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(PETS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getPetById(id: string): Pet | null {
  return getPets().find((p) => p.id === id) ?? null;
}

export function savePet(pet: Pet): void {
  const pets = getPets();
  const idx = pets.findIndex((p) => p.id === pet.id);
  if (idx >= 0) {
    pets[idx] = pet;
  } else {
    pets.push(pet);
  }
  getStorage()?.setItem(PETS_KEY, JSON.stringify(pets));
}

export function updatePetStatus(id: string, status: PetStatus): void {
  const pet = getPetById(id);
  if (!pet) return;
  savePet({ ...pet, status });
}

// --- Found reports ---

export function getFoundReports(): FoundReport[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(FOUND_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getFoundReportById(id: string): FoundReport | null {
  return getFoundReports().find((r) => r.id === id) ?? null;
}

export function saveFoundReport(report: FoundReport): void {
  const reports = getFoundReports();
  const idx = reports.findIndex((r) => r.id === report.id);
  if (idx >= 0) {
    reports[idx] = report;
  } else {
    reports.push(report);
  }
  getStorage()?.setItem(FOUND_KEY, JSON.stringify(reports));
}

// --- Mock matching ---
// Computes a naive score based on overlapping words in description / neighborhood

export function computeMatches(
  report: FoundReport,
  pets: Pet[]
): { petId: string; score: number }[] {
  const reportWords = new Set(
    [report.description, report.neighborhood]
      .join(" ")
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean)
  );

  const activePets = pets.filter((p) => p.status === "lost" || p.status === "active");

  return activePets
    .map((pet) => {
      const petWords = [
        pet.name,
        pet.breed,
        pet.color,
        pet.description,
        pet.neighborhood,
        pet.species,
      ]
        .join(" ")
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean);

      const matches = petWords.filter((w) => reportWords.has(w)).length;
      const neighborhoodBonus = report.neighborhood
        .toLowerCase()
        .includes(pet.neighborhood.toLowerCase())
        ? 2
        : 0;
      const score = Math.min(100, Math.round(((matches + neighborhoodBonus) / 8) * 100));
      return { petId: pet.id, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// --- Seed demo data ---

export function seedDemoData(): void {
  const existing = getPets();
  if (existing.length > 0) return; // already seeded

  const demos: Pet[] = [
    {
      id: "demo-1",
      name: "Milo",
      species: "dog",
      breed: "Golden Retriever",
      color: "golden",
      description: "Friendly golden retriever, loves fetch, wears a red collar.",
      photoDataUrl: null,
      status: "lost",
      ownerName: "Sara M.",
      ownerPhone: "+1 555-0101",
      ownerEmail: "sara@example.com",
      neighborhood: "Palermo",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "demo-2",
      name: "Luna",
      species: "cat",
      breed: "Siamese",
      color: "cream and brown",
      description: "Small siamese cat, very shy, blue eyes, no collar.",
      photoDataUrl: null,
      status: "lost",
      ownerName: "Carlos R.",
      ownerPhone: "+1 555-0102",
      ownerEmail: "carlos@example.com",
      neighborhood: "Belgrano",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo-3",
      name: "Rocky",
      species: "dog",
      breed: "Labrador",
      color: "black",
      description: "Young black Labrador, very energetic, no tags.",
      photoDataUrl: null,
      status: "active",
      ownerName: "Mia T.",
      ownerPhone: "+1 555-0103",
      ownerEmail: "mia@example.com",
      neighborhood: "Palermo",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];

  demos.forEach(savePet);
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
