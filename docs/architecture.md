# Pawlo — Architecture Document

**Version:** 0.1  
**Author:** Claudio (Tech Lead)  
**Date:** 2026-04-16

---

## 1. Project Overview

Pawlo is a mobile-first web application for lost pet identification and neighborhood pet registration. It uses AI photo matching (simulated via mock data in this phase) to help people find lost pets in their neighborhood.

**Phase 0 scope (this scaffolding):** No backend, no database. All data is mock. The goal is to unblock UX and Frontend agents with a stable structure they can build on.

---

## 2. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | File-based routing, RSC for perf, future API routes when backend is added |
| Styling | Tailwind CSS 3 | Utility-first, fast iteration, works great with design tokens |
| Language | TypeScript 5 | Type safety across data models and components |
| Data (phase 0) | Static mock files in `data/` | Zero infra cost, unblocks all other agents |
| Images | picsum.photos | Free, stable, no API key needed for placeholder pet photos |
| Deployment target | Vercel (future) | Zero-config Next.js deploy |

**Not included yet (intentional):**
- Database (Prisma / Supabase — add when backend agent starts)
- Auth (add when owner contact/messaging features are built)
- Real AI matching API (add after UX is validated)
- State management library (Context API is sufficient for phase 0)

---

## 3. Folder Structure

```
pawlo/
├── app/                    # Next.js App Router — all routes live here
│   ├── layout.tsx          # Root layout — fonts, global metadata, theme color
│   ├── globals.css         # Tailwind directives + design token CSS vars
│   ├── page.tsx            # / — Home / Landing
│   ├── how-it-works/
│   │   └── page.tsx        # /how-it-works
│   ├── register/
│   │   ├── step-1/page.tsx # /register/step-1
│   │   ├── step-2/page.tsx # /register/step-2
│   │   ├── step-3/page.tsx # /register/step-3
│   │   └── review/page.tsx # /register/review
│   ├── pets/
│   │   └── [id]/page.tsx   # /pets/[id] — dynamic pet profile
│   └── found/
│       ├── upload/page.tsx     # /found/upload
│       ├── details/page.tsx    # /found/details
│       ├── processing/page.tsx # /found/processing
│       ├── results/page.tsx    # /found/results
│       └── match/
│           └── [id]/page.tsx   # /found/match/[id]
│
├── components/             # Shared UI components (to be built by Frontend agent)
│   └── (empty — see Component Inventory below)
│
├── data/                   # Mock data — source of truth for phase 0
│   ├── pets.ts             # 12 registered pets with photos, status, owner info
│   └── mock-results.ts     # Pre-built match result sets with similarity scores
│
├── lib/                    # Re-exports + utility functions for data access
│   ├── pets.ts             # Pet helpers: search, filter by status, counts
│   └── matches.ts          # Match helpers: getMatchById, getTopMatches
│
├── docs/
│   └── architecture.md     # This document
│
├── public/                 # Static assets
│   └── (icons, og-image to be added)
│
├── next.config.ts
├── tailwind.config.ts      # Design tokens: colors, fonts, radius
├── tsconfig.json
└── package.json
```

---

## 4. Routing Map — All 12 Screens

### Information / Discovery flow

| Screen | Route | Description |
|--------|-------|-------------|
| 1. Home | `/` | Hero with two primary CTAs. Lost pet strip (filter: Lost). |
| 2. How It Works | `/how-it-works` | Step-by-step explainer of AI matching. Builds trust pre-registration. |
| 7. Pet Profile | `/pets/[id]` | Full detail view for a registered pet. Photos, status, breed info, owner contact. |

### Register a Pet flow (4 steps)

| Screen | Route | Description |
|--------|-------|-------------|
| 3. Upload Photos | `/register/step-1` | Upload 3-5 pet photos. Progress: 1/4. |
| 4. Pet Info | `/register/step-2` | Name, species, breed, color, size, age. Progress: 2/4. |
| 5. Owner & Location | `/register/step-3` | Owner name, phone, email, neighborhood. Progress: 3/4. |
| 6. Review & Confirm | `/register/review` | Summary of all data before submission. Progress: 4/4. |

### Found a Pet flow (5 steps)

| Screen | Route | Description |
|--------|-------|-------------|
| 8. Upload Found Photo | `/found/upload` | Single photo capture or upload of the found animal. |
| 9. Add Details | `/found/details` | Where/when found, species guess, free-text notes. |
| 10. Processing | `/found/processing` | Loading screen while AI analysis runs (mocked with setTimeout). |
| 11. Match Results | `/found/results` | Ranked list of registry matches with similarity scores. |
| 12. Match Detail | `/found/match/[id]` | Side-by-side comparison. Contact owner CTA. |

---

## 5. Data Models

### Pet (data/pets.ts)

```typescript
interface Pet {
  id: string;
  name: string;
  species: "Dog" | "Cat";
  breed: string;
  age: number;
  size: "Small" | "Medium" | "Large";
  primaryColor: string;
  secondaryColor?: string;
  neighborhood: string;
  status: "Active" | "Lost" | "Reunited";
  photos: string[];         // 3-5 photo URLs
  description: string;
  owner: { name, phone, email };
  registeredAt: string;
  lostAt?: string;
}
```

**Status semantics:**
- `Active` — registered and at home, not lost
- `Lost` — owner has reported this pet as missing
- `Reunited` — was lost, now found (success story)

### MatchResult (data/mock-results.ts)

```typescript
interface MatchResult {
  id: string;
  petId: string;            // links to Pet.id
  score: number;            // 0-100 similarity %
  matchedFeatures: string[]; // human-readable matched traits
  uploadedPhotoUrl: string;  // the found pet photo
  notes?: string;
}
```

---

## 6. Design Token Conventions

Tokens are defined in two places (must stay in sync):
1. `tailwind.config.ts` — for Tailwind utility classes
2. `app/globals.css` — as CSS custom properties for non-Tailwind usage

**Current palette (placeholder — UX agent will finalize):**

| Token | Value | Usage |
|-------|-------|-------|
| `brand.primary` | `#F97316` (orange) | Primary CTAs, highlights |
| `brand.secondary` | `#14B8A6` (teal) | Secondary actions, links |
| `brand.accent` | `#FBBF24` (amber) | Badges, warnings |
| `status.active` | `#22C55E` | Active status badge |
| `status.lost` | `#EF4444` | Lost status badge |
| `status.reunited` | `#6366F1` | Reunited status badge |

---

## 7. Component Inventory (to be built by Frontend agent)

These are the expected shared components. Frontend agent should create them in `components/`.

| Component | Description |
|-----------|-------------|
| `PetCard` | Thumbnail card with photo, name, status badge, neighborhood |
| `StatusBadge` | Color-coded pill for Active / Lost / Reunited |
| `PhotoUploader` | Multi-photo upload with preview grid |
| `StepProgress` | Step indicator (1/4, 2/4, etc.) for register flow |
| `MatchCard` | Match result card with score bar, matched features list |
| `ScoreBar` | Animated progress bar for similarity % |
| `BottomNav` | Mobile bottom navigation (Home, Register, Found) |
| `PageHeader` | Reusable top bar with back button + title |

---

## 8. Key Technical Decisions

### No backend in phase 0 (ADR-001)
All data is imported from `data/` static files. No API calls, no database. This lets UX and Frontend agents work independently and ship a fully clickable prototype before backend work begins. When backend is added, `lib/pets.ts` helpers become the adapter layer — components don't need to change.

### Mock photo processing (not real AI)
`/found/processing` will simulate a delay with `setTimeout` + `useRouter().push('/found/results')`. The match results come from `data/mock-results.ts`. Real AI integration is out of scope for phase 0.

### Mobile-first layout
Max content width: `max-w-lg` (512px). All tap targets minimum 44×44px. No horizontal scroll. Bottom navigation on mobile, potential sidebar on desktop — deferred to Frontend agent.

### Static params for dynamic routes
`/pets/[id]` and `/found/match/[id]` export `generateStaticParams()` returning an empty array for now. This prevents Next.js build errors and makes it easy to add static generation later.

---

## 9. Adding a Backend (future)

When ready, the migration path is:
1. Add Prisma + your DB of choice
2. Create `app/api/` route handlers
3. Update `lib/pets.ts` to call the API instead of importing from `data/`
4. Delete `data/pets.ts` mock (or keep for tests)

Components stay untouched because they only import from `lib/`, not `data/` directly.
