# Pawlo — Wireframe: Found Pet Flow

## Flow context
- **Route:** `/found` → `/found/details` → `/found/matching` → `/found/results` → `/found/match/:matchId`
- **Device:** Mobile-first
- **Auth:** Optional at start — user can proceed as guest, account encouraged at results step
- **Goal:** A finder who spotted a lost pet can upload a photo, provide quick details, and connect with the owner as fast as possible — urgency matters

---

## Emotional Design Note

This flow happens in a high-urgency moment. The finder is on the street, probably on mobile, maybe in poor lighting. The UX must:
- Minimize typing — photo is king
- Show clear progress ("we're searching...")
- Create confidence that the system is working
- Give a path forward even when no match is found

---

## Step 1 — Photo Upload

```
┌─────────────────────────────────────┐
│ ← Back                              │
│                                     │
│  I found a pet                      │
│                                     │
│  Upload a photo — we'll search      │
│  registered pets in your area.      │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │     📷                        │  │
│  │  Take a photo                 │  │
│  │  or upload from your gallery  │  │
│  │                               │  │
│  │  JPG, PNG · Max 10MB          │  │
│  └───────────────────────────────┘  │
│                                     │
│  ── OR ──                           │
│                                     │
│  ┌───────────────────────────────┐  │
│  │    📷  Open camera             │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │    🖼  Choose from gallery     │  │
│  └───────────────────────────────┘  │
│                                     │
│  — After upload: —                  │
│  ┌───────────────────────────────┐  │
│  │  [Photo preview — square]     │  │
│  │  [Change]                     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │       Continue →              │  │
│  └───────────────────────────────┘  │
│                                     │
│  Don't have a photo?                │
│  → Describe the pet instead         │
└─────────────────────────────────────┘
```

### Notes
- Two distinct entry points: Camera (immediate) and Gallery — important for mobile UX
- Camera button uses `accept="image/*" capture="environment"` to open rear camera directly
- "Describe the pet instead" is a fallback escape hatch for when the pet ran away or is shy
- Upload zone: same design as registration flow — dashed border, secondary-50 background

---

## Step 2 — Quick Details

```
┌─────────────────────────────────────┐
│ ← Back          Step 2 of 2         │
│                                     │
│  Quick details                      │
│  Just a few things to narrow        │
│  down the search.                   │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ [Pet photo thumbnail — left]  │  │
│  │ Looks good! We'll search by   │  │
│  │ photo + your answers.         │  │
│  └───────────────────────────────┘  │
│                                     │
│  What kind of animal?               │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │  🐶  │  │  🐱  │  │  🐰  │      │
│  │ Dog  │  │ Cat  │  │Other │      │
│  └──────┘  └──────┘  └──────┘      │
│                                     │
│  Approximate size                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ XS  │ │  S  │ │  M  │ │ L+  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
│  Where did you find it?             │
│  ┌───────────────────────────────┐  │
│  │ e.g. Riverside Park, Austin   │  │
│  └───────────────────────────────┘  │
│  [📍 Use my current location]       │
│                                     │
│  Anything distinctive?              │
│  ┌───────────────────────────────┐  │
│  │ e.g. has a red collar, limping│  │
│  │ (optional)                    │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │     Search for owner →        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Notes
- Animal type: icon button group (tap-to-select), not a dropdown — faster on mobile
- Size: pill toggle group (XS / S / M / L+) — tap-to-select
- Location: text field with "Use my current location" shortcut (Geolocation API)
- Optional notes: textarea, auto-grow, 200 char max
- All fields optional except animal type — we need at least that to filter
- "Search for owner" button — enabled from the start (photo already uploaded)

---

## Step 3 — Matching in Progress

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│      🐾                             │
│      [Animated paw print pulse]     │
│                                     │
│   Searching nearby pets...          │
│                                     │
│   Comparing photo with              │
│   registered pets in                │
│   Riverside, Austin TX              │
│                                     │
│   ────────────────────────          │
│   [Progress bar — indeterminate     │
│    amber animated]                  │
│   ────────────────────────          │
│                                     │
│   This usually takes 5–10           │
│   seconds. Don't close the app.     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│   While we search...                │
│   Make sure the pet is safe.        │
│   If it's injured, contact          │
│   your local animal control.        │
│                                     │
└─────────────────────────────────────┘
```

### Notes
- Full-screen focused state — no nav, no back button during processing
- Animated: paw print fades in/out with `motion-spring` timing
- Progress bar: indeterminate (looping amber gradient)
- Location shown: confirms we're searching the right area
- Safety tip at bottom: fills the wait with useful info instead of dead space
- Timeout: if > 20s, auto-transition to results with "partial results" note
- Back is prevented during this step (or shows confirm dialog)

---

## Step 4 — Results List

### State A: Matches Found

```
┌─────────────────────────────────────┐
│ ← New search                        │
│                                     │
│  We found possible matches          │
│  3 pets registered nearby           │
│  match your description.            │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ ⭐ Best match                 │  │
│  │ ┌──────────┐  Buddy           │  │
│  │ │  PHOTO   │  Golden Retriever│  │
│  │ │          │  Male · 3 years  │  │
│  │ └──────────┘  Riverside · 0.2mi│ │
│  │                               │  │
│  │ [Lost ⚠]    94% match        │  │
│  │                               │  │
│  │ ┌───────────────────────────┐ │  │
│  │ │  This is the pet →        │ │  │
│  │ └───────────────────────────┘ │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ ┌──────────┐  Luna            │  │
│  │ │  PHOTO   │  Labrador Mix    │  │
│  │ │          │  Female · 2 years│  │
│  │ └──────────┘  Riverside · 0.4mi│ │
│  │ [Active ●]    71% match       │  │
│  │ →                             │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ ┌──────────┐  Max             │  │
│  │ │  PHOTO   │  Mixed breed     │  │
│  │ │          │  Male · 5 years  │  │
│  │ └──────────┘  Oak Hill · 1.1mi│  │
│  │ [Active ●]    58% match       │  │
│  │ →                             │  │
│  └───────────────────────────────┘  │
│                                     │
│  Not the right pet?                 │
│  [Report a new lost pet]            │
└─────────────────────────────────────┘
```

### State B: No Matches Found

```
┌─────────────────────────────────────┐
│ ← Back                              │
│                                     │
│  No matches yet                     │
│                                     │
│  We couldn't find a registered      │
│  pet matching your photo in         │
│  Riverside, Austin TX.              │
│                                     │
│  This can happen if:                │
│  · The owner hasn't registered yet  │
│  · The pet is from another area     │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  📢 Post a "Found Pet" alert  │  │ ← primary CTA
│  └───────────────────────────────┘  │
│                                     │
│  We'll notify your neighborhood and │
│  alert you if the owner registers.  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Try a different photo        │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Contact animal control       │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Result Card Notes
- **Best match** card: elevated with `shadow-md`, amber left border 4px, "⭐ Best match" label
- Match percentage: shown as text + color (>80% green, 60-79% amber, <60% gray)
- Distance: calculated from finder's location to pet's registered neighborhood
- Status badge on each result card
- Tap anywhere on card → opens Match Detail

---

## Step 5 — Match Detail + Contact

```
┌─────────────────────────────────────┐
│ ← Results                           │
│                                     │
│  Is this the pet you found?         │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  [Your photo]  [Buddy's photo]│  │
│  │  You found     Registered     │  │
│  │                               │  │
│  │  94% visual similarity        │  │
│  │  ████████████████████░░ 94%  │  │
│  └───────────────────────────────┘  │
│                                     │
│  About Buddy                        │
│  ┌───────────────────────────────┐  │
│  │ Golden Retriever · Male · 3y  │  │
│  │ Medium · Golden coat          │  │
│  │ White patch on chest          │  │
│  │ [Lost ⚠] — missing since     │  │
│  │ April 15, 2026                │  │
│  └───────────────────────────────┘  │
│                                     │
│  Notes from owner:                  │
│  "Responds to 'Buddy'. Very         │
│  friendly with children."           │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ✅ Yes, I found Buddy        │  │
│  └───────────────────────────────┘  │
│                                     │
│  Owner will be contacted            │
│  immediately.                       │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  ✕ Not the right pet         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### After "Yes, I found Buddy"

```
┌─────────────────────────────────────┐
│                                     │
│      ❤️                             │
│   [Heart animation — spring]        │
│                                     │
│   You're a hero!                    │
│                                     │
│   Sarah has been notified.          │
│   She'll contact you shortly.       │
│                                     │
│   ┌──────────────────────────────┐  │
│   │ Owner contact                │  │
│   │ Sarah M. · +1 (555) 000-0000 │  │
│   │                              │  │
│   │ ┌──────────────────────────┐ │  │
│   │ │  📞  Call Sarah           │ │  │
│   │ └──────────────────────────┘ │  │
│   │ ┌──────────────────────────┐ │  │
│   │ │  💬  Message Sarah        │ │  │
│   │ └──────────────────────────┘ │  │
│   └──────────────────────────────┘  │
│                                     │
│   While you wait for Sarah:         │
│   · Keep Buddy safe and calm        │
│   · Stay in the same area           │
│   · Don't give food/water yet       │
│                                     │
│   [Back to home]                    │
└─────────────────────────────────────┘
```

### Component Notes
- Photo comparison: side-by-side 50/50 split with label under each
- Similarity bar: `primary-500` fill on `neutral-200` bg, animated fill on enter
- "Yes, I found" button: `primary-500` filled, full width, `radius-full`
- "Not the right pet" button: ghost/text button, `neutral-600`, returns to results list
- Contact reveal: only shown after confirmation (privacy protection)
- Tips while waiting: informational card, `secondary-50` bg

---

## Flow State Machine

```
PHOTO UPLOAD
     ↓
QUICK DETAILS
     ↓
MATCHING IN PROGRESS
     ↓ (result)
     ├──[Matches found]──→ RESULTS LIST ──→ MATCH DETAIL ──→ CONTACT REVEAL
     │
     └──[No matches]────→ NO MATCH STATE ──→ POST FOUND ALERT
                                         └─→ TRY AGAIN (back to photo)
```

---

## Accessibility Notes
- "Matching in progress" screen: `aria-live="polite"` announces when results are ready
- Photo comparison: both images have descriptive `alt` text
- Match percentage is conveyed via text, not color alone
- "Call owner" uses `href="tel:..."` for native phone dialer
- No-match state: links to animal control resource (external, opens in new tab with `rel="noopener"`)
- Similarity progress bar: `role="progressbar"` with `aria-valuenow` and `aria-label`
