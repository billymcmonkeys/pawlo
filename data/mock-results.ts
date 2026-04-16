// Mock AI match results for the "found pet" demo flow
// Simulates what the AI matching engine would return after analyzing a found pet photo

export interface MatchResult {
  id: string;
  petId: string;       // references pets.ts Pet.id
  score: number;       // 0-100 similarity percentage
  matchedFeatures: string[];
  uploadedPhotoUrl: string; // the "found" photo that was submitted
  notes?: string;
}

// Simulates a search triggered by uploading a photo of a lost Husky-like dog
export const mockMatchResults: MatchResult[] = [
  {
    id: "match-001",
    petId: "pet-012", // Thor — Siberian Husky
    score: 92,
    matchedFeatures: [
      "Coat color (grey/white)",
      "Eye color (blue)",
      "Ear shape (erect triangular)",
      "Facial markings pattern",
      "Body size (large)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-husky/400/400",
    notes: "Very strong match on facial symmetry and coat pattern.",
  },
  {
    id: "match-002",
    petId: "pet-007", // Zeus — German Shepherd
    score: 81,
    matchedFeatures: [
      "Body size (large)",
      "Ear shape (erect triangular)",
      "Coat pattern (bi-color)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-husky/400/400",
    notes: "Similar build and ear shape, but coat coloring differs.",
  },
  {
    id: "match-003",
    petId: "pet-001", // Mango — Golden Retriever
    score: 74,
    matchedFeatures: [
      "Body size (large)",
      "Fur texture (medium-length)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-husky/400/400",
    notes: "Size matches but color and breed features are different.",
  },
  {
    id: "match-004",
    petId: "pet-005", // Buddy — Labrador
    score: 61,
    matchedFeatures: [
      "Body size (large)",
      "Short coat",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-husky/400/400",
    notes: "Low probability. Different breed characteristics.",
  },
  {
    id: "match-005",
    petId: "pet-003", // Rocky — French Bulldog
    score: 38,
    matchedFeatures: [
      "Ear shape (erect)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-husky/400/400",
    notes: "Unlikely match. Significant size and breed differences.",
  },
];

// Simulates a search triggered by uploading a photo of a tuxedo cat
export const mockCatMatchResults: MatchResult[] = [
  {
    id: "cat-match-001",
    petId: "pet-011", // Oreo — Black/White cat
    score: 95,
    matchedFeatures: [
      "Coat pattern (tuxedo)",
      "Coat colors (black/white)",
      "White chest marking",
      "White paw markings",
      "Body size (small)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-tuxedo/400/400",
    notes: "Extremely high confidence. Distinctive tuxedo pattern matches exactly.",
  },
  {
    id: "cat-match-002",
    petId: "pet-009", // Milo — Maine Coon
    score: 67,
    matchedFeatures: [
      "Eye shape",
      "Face structure",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-tuxedo/400/400",
    notes: "Moderate match on facial features; coat color differs significantly.",
  },
  {
    id: "cat-match-003",
    petId: "pet-002", // Luna — Siamese
    score: 45,
    matchedFeatures: [
      "Body size (small-medium)",
    ],
    uploadedPhotoUrl: "https://picsum.photos/seed/found-tuxedo/400/400",
    notes: "Low confidence. Different breed and coat pattern.",
  },
];

export function getMatchById(id: string): MatchResult | undefined {
  return [...mockMatchResults, ...mockCatMatchResults].find(
    (m) => m.id === id
  );
}

export function getTopMatches(limit = 5): MatchResult[] {
  return mockMatchResults.slice(0, limit);
}
