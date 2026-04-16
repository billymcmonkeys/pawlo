# Pawlo — Wireframe: Homepage

## Screen context
- **Route:** `/` (public, no auth required)
- **Device:** Mobile-first (375px base)
- **User states:** First-time visitor OR returning user (not logged in)
- **Goal:** Immediate clarity on what Pawlo does + low-friction entry to both primary flows

---

## User Intent Analysis

Two types of users land on the homepage:
1. **Pet owner** — their pet is missing / they want to preemptively register it
2. **Finder** — they found a pet and want to return it

The homepage must serve both without confusion. The two CTAs must be visually equal in weight (no hierarchy between them — we don't know who is visiting).

---

## Screen Layout — Mobile

```
┌─────────────────────────────────┐
│ HEADER / NAV                    │
│ ┌─────────────────────────────┐ │
│ │ 🐾 Pawlo          [Log in] │ │
│ └─────────────────────────────┘ │
│                                 │
│ HERO SECTION                    │
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │  [Illustration — pet +      │ │
│ │   neighborhood feel]        │ │
│ │                             │ │
│ │  Every pet deserves         │ │
│ │  to come home.              │ │
│ │                             │ │
│ │  Pawlo connects your        │ │
│ │  neighborhood to bring      │ │
│ │  lost pets back safely.     │ │
│ │                             │ │
│ │  ┌─────────────────────┐    │ │
│ │  │  Register your pet  │    │ │
│ │  └─────────────────────┘    │ │
│ │  ┌─────────────────────┐    │ │
│ │  │   I found a pet     │    │ │
│ │  └─────────────────────┘    │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ SOCIAL PROOF STRIP              │
│ ┌─────────────────────────────┐ │
│ │  🐶 2,400+ pets reunited   │ │
│ │  🏘️ 180+ neighborhoods     │ │
│ │  ⏱️ Avg. 4h to find       │ │
│ └─────────────────────────────┘ │
│                                 │
│ HOW IT WORKS                    │
│ ┌─────────────────────────────┐ │
│ │  How Pawlo works            │ │
│ │                             │ │
│ │  [1] Register               │ │
│ │  ┌───────────────────────┐  │ │
│ │  │ 📷 icon               │  │ │
│ │  │ Add your pet's photo, │  │ │
│ │  │ info, and your        │  │ │
│ │  │ contact details.      │  │ │
│ │  └───────────────────────┘  │ │
│ │                             │ │
│ │  [2] If lost, alert         │ │
│ │  ┌───────────────────────┐  │ │
│ │  │ 📢 icon               │  │ │
│ │  │ Mark your pet as Lost │  │ │
│ │  │ — neighbors get       │  │ │
│ │  │ notified instantly.   │  │ │
│ │  └───────────────────────┘  │ │
│ │                             │ │
│ │  [3] Community finds        │ │
│ │  ┌───────────────────────┐  │ │
│ │  │ 🤝 icon               │  │ │
│ │  │ A neighbor spots your │  │ │
│ │  │ pet and sends you a   │  │ │
│ │  │ photo and location.   │  │ │
│ │  └───────────────────────┘  │ │
│ │                             │ │
│ │  [4] Reunited 🎉           │ │
│ │  ┌───────────────────────┐  │ │
│ │  │ ❤️ icon               │  │ │
│ │  │ Connect, pick up your │  │ │
│ │  │ pet, and mark them    │  │ │
│ │  │ as Reunited.          │  │ │
│ │  └───────────────────────┘  │ │
│ └─────────────────────────────┘ │
│                                 │
│ TESTIMONIAL / RECENT REUNIONS   │
│ ┌─────────────────────────────┐ │
│ │  Recently reunited 🐾       │ │
│ │                             │ │
│ │  ┌──────┐ ┌──────┐ ┌─────┐ │ │
│ │  │ IMG  │ │ IMG  │ │ IMG │ │ │
│ │  │Buddy │ │ Luna │ │ Max │ │ │
│ │  │ ✅   │ │  ✅  │ │ ✅  │ │ │
│ │  └──────┘ └──────┘ └─────┘ │ │
│ │                             │ │
│ │  [← scroll for more →]      │ │
│ └─────────────────────────────┘ │
│                                 │
│ SECONDARY CTA                   │
│ ┌─────────────────────────────┐ │
│ │  Ready to protect your pet? │ │
│ │  ┌───────────────────────┐  │ │
│ │  │   Register your pet   │  │ │
│ │  └───────────────────────┘  │ │
│ │  It's free and takes 2 min  │ │
│ └─────────────────────────────┘ │
│                                 │
│ FOOTER                          │
│ ┌─────────────────────────────┐ │
│ │ About · Privacy · Contact   │ │
│ │ © 2026 Pawlo                │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## Section Specs

### Header / Nav
- **Left:** Logo mark + wordmark "Pawlo" (paw print icon, amber)
- **Right:** "Log in" text link (neutral-600)
- **Behavior:** Sticky on scroll. Background becomes `neutral-0` with `shadow-sm` when scrolled > 60px
- **Height:** 56px

---

### Hero Section
- **Background:** `neutral-50` (warm off-white), full width
- **Illustration:** Friendly vector illustration — a dog and cat sitting in front of a neighborhood. Warm amber + teal tones. Positioned above the headline on mobile, side-by-side on desktop.
- **Headline:** `text-display` / Nunito 800 / `neutral-800` — max 6 words
- **Subheadline:** `text-body-lg` / Inter 400 / `neutral-600` — 2 lines max
- **CTA layout (mobile):** Stacked vertically, full width, `space-3` gap between them
- **CTA layout (desktop):** Side by side, auto width

#### Primary CTA — "Register your pet"
- Style: Filled button, `primary-500` background, white text, `radius-full`, `shadow-primary` on hover
- Icon: `paw-print` (Lucide), 16px, left of text

#### Secondary CTA — "I found a pet"
- Style: Outlined button, `secondary-500` border + text, transparent background, `radius-full`
- Icon: `search` (Lucide), 16px, left of text
- Hover: `secondary-50` background fill

> **UX Note:** Both CTAs are equal visual weight. The difference is color (amber vs teal), NOT size or prominence. This prevents the app from appearing biased toward one user type.

---

### Social Proof Strip
- **Background:** `primary-500`
- **Text:** White, `text-body` weight 600
- **Layout:** Horizontal scroll on mobile (3 stats), centered row on desktop
- **Separator:** Vertical bar `|` in `primary-300`

---

### How It Works

- **Section title:** "How Pawlo works" — `text-h2` / Nunito 700 / `neutral-800`
- **Layout:** Vertical steps on mobile (numbered), 4-column grid on desktop
- **Step card anatomy:**
  - Step number circle: `primary-100` background, `primary-700` text, `text-label`, 28px circle
  - Icon: 32px, `secondary-500` color
  - Step title: `text-h3` / Nunito 600 / `neutral-800`
  - Description: `text-body` / Inter 400 / `neutral-600`
  - Connector line between steps (desktop only): dashed `neutral-200`

#### Steps
| # | Title | Description |
|---|-------|-------------|
| 1 | Register | Add your pet's photo, info, and your contact details. |
| 2 | Alert neighbors | Mark your pet as Lost — your neighborhood gets notified instantly. |
| 3 | Community spots | A neighbor spots your pet and sends you a photo and location. |
| 4 | Reunited | Connect, pick up your pet, and mark them as Reunited. |

---

### Recently Reunited
- **Purpose:** Social proof with emotional resonance
- **Layout:** Horizontal scroll card row
- **Card anatomy:**
  - Pet photo (square, `radius-lg`, 80×80px)
  - Pet name (`text-label-sm` / neutral-700)
  - "Reunited" badge (green, pill)
- **Empty state:** Hidden (only shown if ≥ 3 reunited pets exist)

---

### Secondary CTA Section
- **Background:** `secondary-50`
- **Headline:** `text-h2` / Nunito 700 / `neutral-800`
- **Button:** Same as hero primary CTA
- **Subtext:** `text-body-sm` / `neutral-500` — "It's free and takes 2 minutes"

---

## States

| State | Behavior |
|-------|----------|
| Loading | Skeleton placeholders for "Recently Reunited" cards |
| No reunited pets yet | "Recently Reunited" section is hidden |
| User is logged in | Nav shows avatar + "My pets" link; CTAs still visible |
| Mobile landscape | Hero becomes 2-col, illustration smaller |

---

## Accessibility Notes
- Hero headline must be `<h1>` (only one per page)
- Section headings are `<h2>`
- CTA buttons have descriptive aria-labels (not just "Register")
- Illustration has meaningful `alt` text
- Social proof stats read naturally in screen readers
- Color contrast: all text passes WCAG AA minimum (4.5:1 for body, 3:1 for large text)
