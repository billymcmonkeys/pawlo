# Pawlo — Component Spec List for Billy

## Overview

This document lists all UI components needed to implement the Pawlo app. Components are grouped by category. Each entry includes: name, props summary, variants, and visual/behavioral notes.

**Stack assumption:** React + TypeScript + Tailwind CSS. Components use design tokens from `docs/design-tokens.md`.

---

## 1. Primitives

### `Button`
**Location:** `components/ui/Button.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and padding |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `loading` | `boolean` | `false` | Shows spinner, disables click |
| `disabled` | `boolean` | `false` | Reduced opacity, no interaction |
| `iconLeft` | `ReactNode` | — | Icon before label |
| `iconRight` | `ReactNode` | — | Icon after label |
| `children` | `ReactNode` | required | Button label |
| `onClick` | `() => void` | — | Click handler |

**Variants:**
- `primary`: `bg-primary-500 text-white shadow-primary` on hover
- `secondary`: `border border-secondary-500 text-secondary-600 bg-transparent`
- `ghost`: `text-neutral-600 bg-transparent` — hover `bg-neutral-100`
- `danger`: `bg-error-500 text-white`

**Sizes:**
- `sm`: h-8, px-3, text-label-sm, radius-md
- `md`: h-11, px-5, text-label, radius-full
- `lg`: h-14, px-6, text-label, radius-full

**Loading state:** Replace children with `<Spinner size="sm" />`, disable pointer events.

---

### `Input`
**Location:** `components/ui/Input.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (above) |
| `hint` | `string` | — | Helper text (below) |
| `error` | `string` | — | Error message (below, replaces hint) |
| `required` | `boolean` | `false` | Adds `*` to label, `aria-required` |
| `disabled` | `boolean` | `false` | — |
| `placeholder` | `string` | — | — |
| `value` | `string` | — | Controlled value |
| `onChange` | `(v: string) => void` | — | — |
| `type` | `HTMLInputElement['type']` | `'text'` | — |
| `maxLength` | `number` | — | — |

**Visual states:** default · focus (primary-500 ring 2px) · filled · error (error-500 border + message) · disabled (neutral-200 bg)

**Note:** Label is always visible (not placeholder-only). Floating label NOT used — adds complexity on mobile keyboards.

---

### `Textarea`
**Location:** `components/ui/Textarea.tsx`

Same props as `Input` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `3` | Initial height |
| `autoGrow` | `boolean` | `true` | Grows with content |
| `showCharCount` | `boolean` | `false` | Shows `N/maxLength` bottom-right |

---

### `Select`
**Location:** `components/ui/Select.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | — |
| `options` | `Array<{value: string, label: string}>` | required | — |
| `value` | `string` | — | — |
| `onChange` | `(v: string) => void` | — | — |
| `placeholder` | `string` | `'Select...'` | Empty option |
| `error` | `string` | — | — |
| `disabled` | `boolean` | `false` | — |

**Note:** Uses native `<select>` on mobile (better UX with virtual keyboard). Custom styled on desktop.

---

### `RadioGroup`
**Location:** `components/ui/RadioGroup.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Group label |
| `options` | `Array<{value: string, label: string}>` | required | — |
| `value` | `string` | — | — |
| `onChange` | `(v: string) => void` | — | — |
| `variant` | `'pills' \| 'radio'` | `'pills'` | Visual style |

**Pills variant:** Renders as toggleable pill buttons in a flex row. Selected: `primary-500` bg, white text. Unselected: `neutral-100` bg, `neutral-700` text.

---

### `Checkbox`
**Location:** `components/ui/Checkbox.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | required | Can include links |
| `checked` | `boolean` | — | — |
| `onChange` | `(v: boolean) => void` | — | — |
| `error` | `string` | — | — |
| `required` | `boolean` | `false` | — |

---

### `Badge`
**Location:** `components/ui/Badge.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'active' \| 'lost' \| 'reunited'` | — | Pet lifecycle status |
| `size` | `'sm' \| 'md'` | `'md'` | — |

**Styles per status:**

| Status | Background | Text | Border | Icon |
|--------|-----------|------|--------|------|
| `active` | `secondary-50` | `secondary-700` | `secondary-300` | `Circle` |
| `lost` | `warning-100` | `warning-800` | `warning-500` | `AlertTriangle` |
| `reunited` | `success-100` | `success-700` | `success-500` | `Heart` |

**Anatomy:** `[icon] Label` — pill shape, `radius-full`, `px-3 py-1`

---

### `Spinner`
**Location:** `components/ui/Spinner.tsx`

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color` | `'primary' \| 'white' \| 'neutral'` | `'primary'` |

Animated SVG ring. sm=16px, md=24px, lg=40px.

---

### `Avatar`
**Location:** `components/ui/Avatar.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `name` | `string` | — | Fallback initials |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 24/32/40/56px |

Fallback: initials on `primary-100` bg.

---

## 2. Layout

### `PageLayout`
**Location:** `components/layout/PageLayout.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Page content |
| `showNav` | `boolean` | Default `true` |
| `showFooter` | `boolean` | Default `true` |

Wraps `<TopNav>` + `<main>` + `<Footer>`. Handles page max-width and horizontal padding.

---

### `TopNav`
**Location:** `components/layout/TopNav.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `transparent` | `boolean` | Glass effect for hero overlap |
| `showBack` | `boolean` | Shows back arrow (uses `router.back()`) |
| `title` | `string` | Center title (for inner pages) |
| `actions` | `ReactNode` | Right slot |

**Sticky behavior:** Adds `bg-neutral-0 shadow-sm` when scrolled > 60px (via `IntersectionObserver`).

---

### `BottomSheet`
**Location:** `components/layout/BottomSheet.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onClose` | `() => void` | — | — |
| `title` | `string` | — | Sheet heading |
| `children` | `ReactNode` | — | Sheet content |
| `snapPoints` | `number[]` | `[0.5, 0.9]` | Drag snap positions (as % of screen) |

Overlay: `rgba(0,0,0,0.5)`. Drag handle at top. Dismissible by tap-outside or drag down.

---

### `StepProgress`
**Location:** `components/layout/StepProgress.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `steps` | `string[]` | Step labels |
| `currentStep` | `number` | 0-indexed current step |

Used in Register flow and implicitly in Found flow. Renders connected dot steps with labels.

---

## 3. Cards

### `PetCard`
**Location:** `components/pet/PetCard.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pet` | `Pet` | required | Pet data object |
| `matchPercent` | `number` | — | Shows match % badge if provided |
| `isBestMatch` | `boolean` | `false` | Adds elevated style + "⭐ Best match" label |
| `onClick` | `() => void` | — | — |

**`Pet` type:**
```ts
type Pet = {
  id: string
  name: string
  species: 'dog' | 'cat' | 'rabbit' | 'bird' | 'other'
  breed?: string
  color: string
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
  age: string
  gender: 'male' | 'female' | 'unknown'
  status: 'active' | 'lost' | 'reunited'
  photoUrl?: string
  location: string
  distanceMi?: number
}
```

**Anatomy:** Horizontal layout — photo left (64×64px, radius-lg) + info right. Status badge bottom-left of photo. Arrow right.

---

### `InfoCard`
**Location:** `components/pet/InfoCard.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Card section title |
| `icon` | `ReactNode` | Lucide icon |
| `rows` | `Array<{label: string, value: ReactNode}>` | Data rows |
| `action` | `{ label: string, onClick: () => void }` | Optional top-right link |

Uses `<dl>` / `<dt>` / `<dd>` semantics. Empty values rendered as `—`.

---

### `OwnerContactCard`
**Location:** `components/pet/OwnerContactCard.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `owner` | `{ name: string, phone?: string, location: string, memberSince: string }` | — |
| `petStatus` | `'active' \| 'lost' \| 'reunited'` | Controls phone visibility |
| `onCall` | `() => void` | Opens tel: link |
| `onMessage` | `() => void` | Opens message flow |

Phone and action buttons only visible when `petStatus === 'lost'`.

---

### `ReunitedPetCard`
**Location:** `components/pet/ReunitedPetCard.tsx`

Compact card for "Recently Reunited" scroll row.

| Prop | Type | Description |
|------|------|-------------|
| `pet` | `Pet` | — |
| `onClick` | `() => void` | — |

80×80px photo + name + Reunited badge. `radius-lg`.

---

### `MatchComparisonCard`
**Location:** `components/found/MatchComparisonCard.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `finderPhotoUrl` | `string` | Photo uploaded by finder |
| `registeredPhotoUrl` | `string` | Pet's registered photo |
| `matchPercent` | `number` | 0-100 |

Side-by-side 50/50 layout. Similarity bar below. Labels: "You found" / "Registered".

---

## 4. Upload

### `PhotoUploader`
**Location:** `components/upload/PhotoUploader.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `File \| null` | — | Controlled value |
| `onChange` | `(file: File \| null) => void` | — | — |
| `accept` | `string` | `'image/jpeg,image/png'` | — |
| `maxSizeMb` | `number` | `10` | Validates client-side |
| `hint` | `string` | — | Below dropzone |

**States:** empty (dashed drop zone) · dragging over (border primary-500) · preview (photo fills zone) · error (border error-500 + message)

**Preview actions:** "Change photo" (pencil icon, top-right overlay) + "Remove" (x icon).

---

### `CameraCapture`
**Location:** `components/upload/CameraCapture.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `onCapture` | `(file: File) => void` | — |
| `onError` | `(err: string) => void` | — |

Wraps `<input type="file" accept="image/*" capture="environment">`. On mobile opens rear camera.

---

## 5. Feedback

### `Toast`
**Location:** `components/ui/Toast.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `message` | `string` | — |
| `type` | `'success' \| 'error' \| 'info' \| 'warning'` | — |
| `duration` | `number` | Auto-dismiss in ms. Default 4000. |

Rendered via a `<ToastProvider>` portal at the top of the viewport. Stacks multiple toasts.

---

### `Skeleton`
**Location:** `components/ui/Skeleton.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Width/height via Tailwind |
| `variant` | `'rect' \| 'circle' \| 'text'` | Shape |

Animated shimmer with `neutral-100` → `neutral-200` gradient.

---

### `EmptyState`
**Location:** `components/ui/EmptyState.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Lucide icon, 48px |
| `title` | `string` | — |
| `description` | `string` | — |
| `action` | `{ label: string, onClick: () => void }` | Optional CTA |

Centered vertically, neutral-400 icon, neutral-600 title, neutral-500 description.

---

### `MatchingAnimation`
**Location:** `components/found/MatchingAnimation.tsx`

Full-screen processing state for the "Matching in Progress" step.

| Prop | Type | Description |
|------|------|-------------|
| `location` | `string` | Shows "Searching in [location]" |
| `onTimeout` | `() => void` | Called after 20s |

Paw print icon (amber) with CSS keyframe pulse + indeterminate progress bar.

---

### `SuccessScreen`
**Location:** `components/ui/SuccessScreen.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `emoji` | `string` | Large emoji or icon |
| `title` | `string` | — |
| `description` | `string` | — |
| `primaryAction` | `{ label: string, onClick: () => void }` | — |
| `secondaryAction` | `{ label: string, onClick: () => void }` | Optional |

Full-screen centered layout. Heart / paw animation on mount.

---

## 6. Navigation

### `Tabs`
**Location:** `components/ui/Tabs.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `Array<{id: string, label: string, icon?: ReactNode}>` | — |
| `activeTab` | `string` | — |
| `onChange` | `(id: string) => void` | — |

Bottom-border indicator style. Full width.

---

### `DropdownMenu`
**Location:** `components/ui/DropdownMenu.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `trigger` | `ReactNode` | Trigger element (e.g. ⋮ button) |
| `items` | `Array<{label: string, icon?: ReactNode, onClick: () => void, danger?: boolean}>` | — |

Closes on outside click and Escape key. Danger items render in `error-500` red.

---

## 7. Page-Level Sections (Homepage)

### `HeroSection`
**Location:** `components/home/HeroSection.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `onRegister` | `() => void` | "Register your pet" CTA |
| `onFound` | `() => void` | "I found a pet" CTA |

Contains illustration, headline, subheadline, two CTAs.

---

### `SocialProofStrip`
**Location:** `components/home/SocialProofStrip.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `stats` | `Array<{icon: string, label: string, value: string}>` | — |

Amber background strip. Horizontal scroll on mobile.

---

### `HowItWorksSection`
**Location:** `components/home/HowItWorksSection.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `steps` | `Array<{number: number, icon: ReactNode, title: string, description: string}>` | — |

Vertical on mobile, 4-col grid on desktop. Connector lines desktop-only.

---

### `ReunitedScrollRow`
**Location:** `components/home/ReunitedScrollRow.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `pets` | `Pet[]` | — |
| `onPetClick` | `(id: string) => void` | — |
| `loading` | `boolean` | Shows skeletons |

Horizontal scroll, hides if `pets.length < 3`.

---

## 8. Form Sections (Registration Steps)

### `RegisterPhotoStep`
**Location:** `components/register/RegisterPhotoStep.tsx`

Wraps `PhotoUploader` + tips + Continue button. Step 1.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `File \| null` | — |
| `onChange` | `(file: File \| null) => void` | — |
| `onContinue` | `() => void` | — |

---

### `RegisterPetDataStep`
**Location:** `components/register/RegisterPetDataStep.tsx`

Full step 2 form.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `PetFormData` | — |
| `onChange` | `(data: PetFormData) => void` | — |
| `onContinue` | `() => void` | — |
| `onBack` | `() => void` | — |

```ts
type PetFormData = {
  name: string
  species: string
  breed?: string
  color: string
  size: string
  age: string
  gender: string
  microchip?: string
  notes?: string
}
```

---

### `RegisterOwnerStep`
**Location:** `components/register/RegisterOwnerStep.tsx`

Step 3.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `OwnerFormData` | — |
| `onChange` | `(data: OwnerFormData) => void` | — |
| `onContinue` | `() => void` | — |
| `onBack` | `() => void` | — |

```ts
type OwnerFormData = {
  name: string
  phone: string
  email?: string
  location: string
  consentGiven: boolean
}
```

---

### `RegisterReviewStep`
**Location:** `components/register/RegisterReviewStep.tsx`

Step 4 — review + submit.

| Prop | Type | Description |
|------|------|-------------|
| `petData` | `PetFormData` | — |
| `ownerData` | `OwnerFormData` | — |
| `photoUrl` | `string` | Preview URL |
| `onSubmit` | `() => void` | — |
| `onEditStep` | `(step: number) => void` | Deep-link back to step |
| `loading` | `boolean` | — |
| `error` | `string \| null` | — |

---

## 9. Found Pet Flow Components

### `FoundPhotoStep`
**Location:** `components/found/FoundPhotoStep.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `File \| null` | — |
| `onChange` | `(file: File \| null) => void` | — |
| `onContinue` | `() => void` | — |
| `onDescribeInstead` | `() => void` | Escape hatch |

---

### `FoundDetailsStep`
**Location:** `components/found/FoundDetailsStep.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `FoundDetails` | — |
| `onChange` | `(d: FoundDetails) => void` | — |
| `onSearch` | `() => void` | — |
| `photoUrl` | `string` | Thumbnail preview |

```ts
type FoundDetails = {
  species: string
  size: string
  location: string
  notes?: string
}
```

---

### `FoundResultsList`
**Location:** `components/found/FoundResultsList.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `matches` | `PetMatch[]` | — |
| `loading` | `boolean` | — |
| `onSelectMatch` | `(match: PetMatch) => void` | — |
| `onNewSearch` | `() => void` | — |
| `onReportFound` | `() => void` | No-match CTA |

```ts
type PetMatch = Pet & { matchPercent: number; isBestMatch: boolean }
```

---

### `FoundMatchDetail`
**Location:** `components/found/FoundMatchDetail.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `match` | `PetMatch` | — |
| `finderPhotoUrl` | `string` | — |
| `onConfirm` | `() => void` | "Yes, I found this pet" |
| `onReject` | `() => void` | "Not the right pet" → back |

---

### `FoundContactReveal`
**Location:** `components/found/FoundContactReveal.tsx`

| Prop | Type | Description |
|------|------|-------------|
| `owner` | `{ name: string, phone: string }` | — |
| `petName` | `string` | — |
| `onCall` | `() => void` | — |
| `onMessage` | `() => void` | — |
| `onBackToHome` | `() => void` | — |

---

## Icon Usage Reference

| Context | Icon (Lucide) |
|---------|--------------|
| Register CTA | `PawPrint` |
| Found CTA | `Search` |
| Lost status | `AlertTriangle` |
| Active status | `Circle` |
| Reunited status | `Heart` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Location | `MapPin` |
| Phone | `Phone` |
| Message | `MessageCircle` |
| Camera | `Camera` |
| Gallery | `Image` |
| More menu | `MoreVertical` |
| Back | `ChevronLeft` |
| Success | `CheckCircle2` |
| Share | `Share2` |
| Add photo | `Plus` |
| Info | `Info` |

---

## Component Checklist for Billy

- [ ] All interactive elements have `:hover`, `:focus-visible`, `:active`, `:disabled` states
- [ ] Buttons have min-height 44px (touch target — WCAG 2.5.5)
- [ ] All form fields linked to labels via `htmlFor` / `id`
- [ ] Colors pass WCAG AA contrast (4.5:1 body, 3:1 large)
- [ ] `motion-*` tokens used for all transitions (not arbitrary values)
- [ ] Loading skeletons for every async data section
- [ ] Empty states for every list/gallery
- [ ] Error states for every form and async action
- [ ] Mobile-first: components work at 375px min-width before adding desktop styles
