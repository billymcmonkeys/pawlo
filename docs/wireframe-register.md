# Pawlo — Wireframe: Pet Registration Flow (4 Steps)

## Flow context
- **Route:** `/register` → `/register/pet-data` → `/register/owner` → `/register/review`
- **Device:** Mobile-first
- **Auth required:** Yes — user must be logged in or creates account in step 1 overlay
- **Goal:** Register a pet with photo, data, and owner contact so it has a profile before an emergency

---

## Progress Indicator (Persistent)

Appears at the top of all 4 steps, below the nav.

```
┌──────────────────────────────────────┐
│  ●━━━━━━━━●━━━━━━━━●━━━━━━━━●        │
│  Photo   Info   Owner   Review       │
└──────────────────────────────────────┘
```

- Active step: `primary-500` filled circle + label in `primary-700`
- Completed step: `secondary-500` check icon + label `neutral-500`
- Upcoming step: `neutral-300` circle + label `neutral-400`
- Connector line: `neutral-200` (completed segment turns `secondary-300`)

---

## Step 1 — Photo Upload

```
┌─────────────────────────────────────┐
│ ← Back          Step 1 of 4         │
│                                     │
│  [Progress bar — step 1 active]     │
│                                     │
│  Add your pet's photo               │
│  A clear, recent photo helps        │
│  neighbors identify them.           │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │        [Upload zone]          │  │
│  │                               │  │
│  │   📷  Tap to upload a photo   │  │
│  │   or drag & drop here         │  │
│  │                               │  │
│  │   JPG, PNG · Max 10MB         │  │
│  └───────────────────────────────┘  │
│                                     │
│  — After upload: —                  │
│  ┌───────────────────────────────┐  │
│  │  ┌──────────────────────────┐ │  │
│  │  │  [Pet photo preview]     │ │  │
│  │  │  (fills area, cropped    │ │  │
│  │  │   to square)             │ │  │
│  │  └──────────────────────────┘ │  │
│  │  [Change photo] [Remove]       │  │
│  └───────────────────────────────┘  │
│                                     │
│  Tips for a good photo:             │
│  · Face visible and not blurry      │
│  · Natural light if possible        │
│  · Recent — from the last 6 months  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │       Continue →              │  │
│  └───────────────────────────────┘  │
│  (disabled until photo uploaded)    │
└─────────────────────────────────────┘
```

### Component notes
- **Upload zone:** Dashed border `neutral-300`, `radius-xl`, `secondary-50` background. Hover/drag: border `secondary-500`, background `secondary-100`
- **Photo preview:** Fills the same zone. Square crop with `radius-xl`. Replace icon (pencil) top-right corner, 32px circle button `neutral-0` with `shadow-sm`
- **"Continue" button:** Full width, `primary-500`, `radius-full`, disabled state is `neutral-200` bg / `neutral-400` text
- **Error state:** "File too large" or "Invalid format" — inline below the zone, `error-500` text + icon

---

## Step 2 — Pet Data Form

```
┌─────────────────────────────────────┐
│ ← Back          Step 2 of 4         │
│                                     │
│  [Progress bar — step 2 active]     │
│                                     │
│  Tell us about your pet             │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Pet's name *                   │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. Buddy               │   │ │
│  │ └──────────────────────────┘   │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Animal type *                  │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ [Dog ▼]                  │   │ │
│  │ └──────────────────────────┘   │ │
│  │ Options: Dog · Cat · Rabbit    │ │
│  │          Bird · Other          │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Breed                          │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. Golden Retriever    │   │ │
│  │ └──────────────────────────┘   │ │
│  │ (optional — skip if mixed)     │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Color / markings *             │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. Golden with white   │   │ │
│  │ │ patch on chest           │   │ │
│  │ └──────────────────────────┘   │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Size *             Age         │ │
│  │ ┌─────────────┐ ┌───────────┐  │ │
│  │ │[Small ▼]    │ │ 3 years   │  │ │
│  │ └─────────────┘ └───────────┘  │ │
│  │ XS · S · M · L · XL           │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Gender *                       │ │
│  │  ○ Male   ● Female   ○ Unknown │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Microchip number               │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ (optional)               │   │ │
│  │ └──────────────────────────┘   │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Additional notes               │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. responds to "Luna", │   │ │
│  │ │ friendly with children   │   │ │
│  │ │                          │   │ │
│  │ └──────────────────────────┘   │ │
│  │ (optional · 280 char max)      │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐  │
│  │       Continue →              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Component notes
- Required fields marked with `*` — show inline error on blur if empty
- `Select` for animal type and size — native select on mobile for better UX
- Age field: free text (accepts "3 years", "8 months", "Puppy") — don't force dropdown
- Gender: radio group as pill toggles (not standard radio circles)
- Textarea for notes: auto-grows, char counter in bottom-right corner
- All inputs: `radius-md`, border `neutral-300`, focus ring `primary-500 / 2px`

---

## Step 3 — Owner Contact Form

```
┌─────────────────────────────────────┐
│ ← Back          Step 3 of 4         │
│                                     │
│  [Progress bar — step 3 active]     │
│                                     │
│  Your contact info                  │
│  Only shared with neighbors when    │
│  your pet is marked as Lost.        │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Your name *                    │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. Sarah               │   │ │
│  │ └──────────────────────────┘   │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Phone number *                 │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ +1 (555) 000-0000        │   │ │
│  │ └──────────────────────────┘   │ │
│  │ ℹ️ We'll send match alerts     │ │
│  │    via SMS                     │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Email address                  │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. sarah@email.com     │   │ │
│  │ └──────────────────────────┘   │ │
│  │ (optional · for account alerts)│ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ Neighborhood / Area *          │ │
│  │ ┌──────────────────────────┐   │ │
│  │ │ e.g. Riverside, Austin   │   │ │
│  │ └──────────────────────────┘   │ │
│  │ [Use my location 📍]           │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ ☑ I agree that Pawlo may      │ │
│  │   share my contact info with   │ │
│  │   finders when my pet is marked│ │
│  │   as Lost.                     │ │
│  │   Privacy Policy               │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐  │
│  │       Continue →              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Component notes
- Phone field: `type="tel"` with auto-format mask
- "Use my location" triggers Geolocation API — formats neighborhood + city from coords
- Privacy consent checkbox: required. Continue disabled until checked
- If user already has contact info in their account, fields pre-fill (editable)

---

## Step 4 — Review & Submit

```
┌─────────────────────────────────────┐
│ ← Back          Step 4 of 4         │
│                                     │
│  [Progress bar — step 4 active]     │
│                                     │
│  Review your pet's profile          │
│  Looks good? Hit Register!          │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ PET DETAILS                [Edit]│
│  │ ┌─────────┐  Buddy           │  │
│  │ │  PHOTO  │  Dog · Golden    │  │
│  │ │         │  3 years · Male  │  │
│  │ └─────────┘  Medium size     │  │
│  │             Microchip: N/A   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ COLOR & MARKINGS          [Edit]│
│  │ Golden coat with white patch  │  │
│  │ on chest                      │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ NOTES                     [Edit]│
│  │ Responds to "Buddy", friendly │  │
│  │ with children.                │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ YOUR CONTACT INFO         [Edit]│
│  │ Sarah · +1 (555) 000-0000    │  │
│  │ Riverside, Austin TX          │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ✅ Register Buddy            │  │
│  └───────────────────────────────┘  │
│                                     │
│  By registering, you agree to the   │
│  Terms of Service and Privacy Policy│
└─────────────────────────────────────┘
```

### Success State (after submit)

```
┌─────────────────────────────────────┐
│                                     │
│         🎉                          │
│                                     │
│   Buddy is registered!              │
│                                     │
│   Your pet now has a Pawlo          │
│   profile. If Buddy ever goes       │
│   missing, just tap "Mark as Lost"  │
│   and your neighborhood will know   │
│   instantly.                        │
│                                     │
│  ┌───────────────────────────────┐  │
│  │     View Buddy's profile      │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │   Register another pet        │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Component notes
- Review cards: each section is a summary card with `[Edit]` link that deep-links back to that step with current data pre-filled
- Submit button: "Register [Pet name]" — personalized
- Submit loading state: spinner inside button, button disabled
- Submit error state: toast at top — "Something went wrong. Please try again."
- Success: full-screen success state, no nav, two next actions

---

## Navigation & Back Behavior

| Step | Back action | Forward guard |
|------|-------------|---------------|
| Step 1 | Leave flow (confirm dialog if photo uploaded) | Photo required |
| Step 2 | → Step 1, data preserved | Required fields valid |
| Step 3 | → Step 2, data preserved | Phone + consent required |
| Step 4 | → Step 3, data preserved | None (just review) |

Data is preserved in memory across steps. Not persisted to server until final submit.

---

## Accessibility Notes
- Each step has a unique `<h1>` title
- Progress indicator uses `aria-label="Step 2 of 4: Pet information"` on the container
- Required fields have `aria-required="true"`
- Error messages linked via `aria-describedby`
- Photo upload zone is keyboard-accessible (Enter/Space triggers file picker)
- Success state announces via `aria-live="polite"`
