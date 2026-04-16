# Pawlo — Design Tokens

## Brand Identity

**Pawlo** is a lost pet recovery app for neighborhoods. The visual language must feel:
- **Warm** — pets are family; every lost one is an emotional situation
- **Trustworthy** — people are sharing personal data and trusting neighbors
- **Friendly** — approachable, not clinical or bureaucratic
- **Modern consumer** — feels like a well-funded consumer app (not a government tool)

---

## Color Palette

### Primary — Amber/Warm Orange
The "rescue beacon" color. High-energy, visible, associated with urgency and warmth.

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `primary-50` | `#FFF8EE` | `--color-primary-50` |
| `primary-100` | `#FFEECE` | `--color-primary-100` |
| `primary-200` | `#FFD78E` | `--color-primary-200` |
| `primary-300` | `#FFC15A` | `--color-primary-300` |
| `primary-400` | `#FFAA2C` | `--color-primary-400` |
| `primary-500` | `#F59500` | `--color-primary-500` |
| `primary-600` | `#D97D00` | `--color-primary-600` |
| `primary-700` | `#B36200` | `--color-primary-700` |
| `primary-800` | `#8A4A00` | `--color-primary-800` |
| `primary-900` | `#5C3000` | `--color-primary-900` |

**Usage:** CTAs, highlights, active states, badges.

---

### Secondary — Soft Teal
Calm, trustworthy, community-oriented. Pairs with amber to balance urgency with safety.

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `secondary-50` | `#EEF9F8` | `--color-secondary-50` |
| `secondary-100` | `#CCEEE9` | `--color-secondary-100` |
| `secondary-200` | `#99DDD4` | `--color-secondary-200` |
| `secondary-300` | `#66CCBF` | `--color-secondary-300` |
| `secondary-400` | `#33BBAA` | `--color-secondary-400` |
| `secondary-500` | `#00A896` | `--color-secondary-500` |
| `secondary-600` | `#008A7B` | `--color-secondary-600` |
| `secondary-700` | `#006B60` | `--color-secondary-700` |
| `secondary-800` | `#004D45` | `--color-secondary-800` |
| `secondary-900` | `#002E2A` | `--color-secondary-900` |

**Usage:** Secondary actions, informational states, "How it works" section, links.

---

### Neutral — Warm Gray
Not cold-gray or blue-gray. Slightly warm to stay cohesive with the palette.

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `neutral-0` | `#FFFFFF` | `--color-neutral-0` |
| `neutral-50` | `#FAF8F5` | `--color-neutral-50` |
| `neutral-100` | `#F2EFE9` | `--color-neutral-100` |
| `neutral-200` | `#E2DDD5` | `--color-neutral-200` |
| `neutral-300` | `#C9C3B8` | `--color-neutral-300` |
| `neutral-400` | `#A89E91` | `--color-neutral-400` |
| `neutral-500` | `#7D7269` | `--color-neutral-500` |
| `neutral-600` | `#5C5349` | `--color-neutral-600` |
| `neutral-700` | `#3D3730` | `--color-neutral-700` |
| `neutral-800` | `#242019` | `--color-neutral-800` |
| `neutral-900` | `#111109` | `--color-neutral-900` |

---

### Semantic Colors

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| `success-500` | `#22C55E` | `--color-success` | Reunited status, success states |
| `success-100` | `#DCFCE7` | `--color-success-bg` | Success backgrounds |
| `warning-500` | `#F59E0B` | `--color-warning` | Lost status, urgent alerts |
| `warning-100` | `#FEF3C7` | `--color-warning-bg` | Warning backgrounds |
| `error-500` | `#EF4444` | `--color-error` | Form errors, destructive actions |
| `error-100` | `#FEE2E2` | `--color-error-bg` | Error backgrounds |
| `info-500` | `#3B82F6` | `--color-info` | Informational states |
| `info-100` | `#DBEAFE` | `--color-info-bg` | Info backgrounds |

---

## Status Badge Styles

Each pet has a lifecycle status visible throughout the app.

| Status | Background | Text | Border | Icon |
|--------|-----------|------|--------|------|
| **Active** | `#EEF9F8` (secondary-50) | `#006B60` (secondary-700) | `#66CCBF` (secondary-300) | paw-print ✓ |
| **Lost** | `#FEF3C7` (warning-100) | `#B45309` | `#F59E0B` (warning-500) | alert-triangle ⚠ |
| **Reunited** | `#DCFCE7` (success-100) | `#15803D` | `#22C55E` (success-500) | heart ♥ |

**Badge anatomy:** `[icon] Status label` — pill shape, `border-radius: 9999px`, padding `4px 12px`, font-size 12px medium.

---

## Typography

### Font Pair

| Role | Font | Source | Weights |
|------|------|--------|---------|
| **Display / Headings** | `Nunito` | Google Fonts | 600, 700, 800 |
| **Body / UI** | `Inter` | Google Fonts | 400, 500, 600 |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
```

**Rationale:**
- Nunito is round, friendly, modern — perfect for an app about pets and community
- Inter is the industry standard for clean, readable UI text
- Together they balance personality with legibility

---

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-display` | `32px` | `1.2` | Nunito 800 | Hero headline |
| `text-h1` | `28px` | `1.25` | Nunito 700 | Page titles |
| `text-h2` | `22px` | `1.3` | Nunito 700 | Section headings |
| `text-h3` | `18px` | `1.35` | Nunito 600 | Card headings, form labels groups |
| `text-body-lg` | `16px` | `1.6` | Inter 400 | Primary body text |
| `text-body` | `14px` | `1.6` | Inter 400 | Secondary body text |
| `text-body-sm` | `12px` | `1.5` | Inter 400 | Captions, meta info |
| `text-label` | `14px` | `1.4` | Inter 500 | Form labels, button text |
| `text-label-sm` | `12px` | `1.4` | Inter 500 | Small labels, tags |
| `text-caption` | `11px` | `1.4` | Inter 400 | Legal text, timestamps |

---

## Spacing Scale

Base unit: **4px**

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `space-0` | `0px` | `--space-0` |
| `space-1` | `4px` | `--space-1` |
| `space-2` | `8px` | `--space-2` |
| `space-3` | `12px` | `--space-3` |
| `space-4` | `16px` | `--space-4` |
| `space-5` | `20px` | `--space-5` |
| `space-6` | `24px` | `--space-6` |
| `space-8` | `32px` | `--space-8` |
| `space-10` | `40px` | `--space-10` |
| `space-12` | `48px` | `--space-12` |
| `space-16` | `64px` | `--space-16` |
| `space-20` | `80px` | `--space-20` |
| `space-24` | `96px` | `--space-24` |

**Component-level spacing conventions:**
- Page horizontal padding: `space-4` (16px) on mobile, `space-6` (24px) on ≥tablet
- Section vertical gap: `space-12` (48px)
- Card internal padding: `space-4` (16px)
- Form field gap: `space-4` (16px)
- Inline element gap: `space-2` (8px)

---

## Border Radius

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| `radius-sm` | `4px` | `--radius-sm` | Small inputs, tags |
| `radius-md` | `8px` | `--radius-md` | Cards, modals, medium inputs |
| `radius-lg` | `12px` | `--radius-lg` | Large cards, bottom sheets |
| `radius-xl` | `16px` | `--radius-xl` | Feature cards, hero sections |
| `radius-2xl` | `24px` | `--radius-2xl` | Image containers |
| `radius-full` | `9999px` | `--radius-full` | Pills, avatars, badges |

---

## Shadows

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.06)` | `--shadow-xs` | Subtle cards on white |
| `shadow-sm` | `0 2px 8px rgba(0,0,0,0.08)` | `--shadow-sm` | Default card elevation |
| `shadow-md` | `0 4px 16px rgba(0,0,0,0.10)` | `--shadow-md` | Modals, popovers, dropdowns |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | `--shadow-lg` | Bottom sheets, focused elements |
| `shadow-xl` | `0 16px 48px rgba(0,0,0,0.14)` | `--shadow-xl` | Full-screen overlays |
| `shadow-primary` | `0 4px 16px rgba(245,149,0,0.30)` | `--shadow-primary` | Primary CTA hover state |

---

## Iconography

- **Library:** Lucide Icons (MIT, tree-shakeable, React-native compatible)
- **Default size:** 20px stroke width 1.5px
- **Sizes:** 16px (inline), 20px (UI), 24px (prominent), 32px (hero)
- **Color:** inherits from parent text color unless overridden

---

## Motion

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `motion-instant` | `100ms` | `ease-out` | Toggle switches, checkbox |
| `motion-fast` | `150ms` | `ease-out` | Button states, badge changes |
| `motion-normal` | `250ms` | `ease-in-out` | Card hover, menu open |
| `motion-slow` | `400ms` | `ease-in-out` | Page transitions, modals |
| `motion-spring` | `500ms` | `cubic-bezier(0.34,1.56,0.64,1)` | Success animations |

---

## Breakpoints

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `bp-sm` | `375px` | `--bp-sm` |
| `bp-md` | `768px` | `--bp-md` |
| `bp-lg` | `1024px` | `--bp-lg` |
| `bp-xl` | `1280px` | `--bp-xl` |

**Mobile-first.** All layouts default to mobile. Tablet and desktop use `@media (min-width: ...)`.

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | `0` | Default content |
| `z-raised` | `10` | Cards on scroll |
| `z-dropdown` | `100` | Dropdowns, tooltips |
| `z-sticky` | `200` | Sticky nav |
| `z-modal` | `300` | Modals, bottom sheets |
| `z-overlay` | `400` | Full-screen overlays |
| `z-toast` | `500` | Toast notifications |
