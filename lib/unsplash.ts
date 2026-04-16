// Unsplash API helper for fetching pet photos
// Free tier: 50 requests/hour

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "";
const UNSPLASH_API_URL = "https://api.unsplash.com";

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
}

/**
 * Fetch random pet photos from Unsplash
 * @param query - Search query (e.g., "golden retriever", "tabby cat", "dog", "cat")
 * @param count - Number of photos to fetch (default: 1, max: 30)
 */
export async function getRandomPetPhotos(
  query: string,
  count: number = 1
): Promise<string[]> {
  // Fallback to curated Unsplash photos if no API key
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn("Unsplash API key not found. Using placeholder images.");
    return getFallbackPhotos(query, count);
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&count=${count}&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.statusText);
      return getFallbackPhotos(query, count);
    }

    const data: UnsplashPhoto[] = Array.isArray(await response.json())
      ? await response.json()
      : [await response.json()];

    return data.map((photo) => `${photo.urls.regular}&w=800&q=80`);
  } catch (error) {
    console.error("Failed to fetch from Unsplash:", error);
    return getFallbackPhotos(query, count);
  }
}

/**
 * Get a single random pet photo
 */
export async function getRandomPetPhoto(query: string): Promise<string> {
  const photos = await getRandomPetPhotos(query, 1);
  return photos[0];
}

/**
 * Fallback photos from Unsplash (no API key required)
 * Uses direct Unsplash Source URLs
 */
function getFallbackPhotos(query: string, count: number): string[] {
  const photos: string[] = [];
  
  // Pre-curated Unsplash photo IDs for common pet breeds
  const photoSets: Record<string, string[]> = {
    dog: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80", // Golden retriever
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80", // Husky
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80", // Labrador
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80", // Border collie
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80", // German shepherd
    ],
    cat: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80", // Tabby cat
      "https://images.unsplash.com/photo-1573865526739-10c1de0d3a29?w=800&q=80", // White cat
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&q=80", // Gray cat
      "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=800&q=80", // Orange cat
      "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&q=80", // Black cat
    ],
    "golden retriever": [
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
    ],
    "tabby cat": [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
      "https://images.unsplash.com/photo-1506755594592-349d12a7c52a?w=800&q=80",
    ],
  };

  // Find matching photo set
  const matchedSet = 
    photoSets[query.toLowerCase()] || 
    photoSets[query.toLowerCase().includes("cat") ? "cat" : "dog"] ||
    photoSets.dog;

  // Return random selection
  for (let i = 0; i < count; i++) {
    photos.push(matchedSet[i % matchedSet.length]);
  }

  return photos;
}

/**
 * Get curated hero photos for homepage carousel
 */
export function getHeroPhotos(): string[] {
  return [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80", // Happy golden retriever
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80", // Tabby cat
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80", // Playful husky
    "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80", // Labrador
  ];
}
