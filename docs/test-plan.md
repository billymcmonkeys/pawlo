# Pawlo — Test Plan

**App:** Pawlo — neighborhood pet registry with AI-powered photo matching  
**Version:** 0.1.0 (demo-ready)  
**Author:** Daniel (QA)  
**Date:** 2026-04-16  
**Viewport targets:** Mobile 390×844px (iPhone 14) · Desktop 1280px

---

## 1. Scope

### Routes under test
| Route | Description |
|---|---|
| `/` | Home / Landing |
| `/register` | Single-page pet registration form |
| `/register/step-1` | Multi-step register — photo upload |
| `/register/step-2` | Multi-step register — pet details |
| `/register/step-3` | Multi-step register — owner info |
| `/register/review` | Multi-step register — review & confirm |
| `/pets/[id]` | Unified pet profile (static + localStorage) |
| `/pet/[id]` | Legacy pet profile (localStorage only) |
| `/found` | Single-page found-pet report |
| `/found/upload` | Multi-step found — photo upload |
| `/found/details` | Multi-step found — description |
| `/found/processing` | Multi-step found — AI animation |
| `/found/results` | Match results page |
| `/contact/[id]` | Contact owner page |

### Out of scope
- Backend API (none — demo is fully client-side with localStorage)
- Push notifications
- User authentication

---

## 2. Test Environment Setup

```bash
cd /path/to/pawlo
npm install
npm run dev       # http://localhost:3000
```

**Before each session:** Clear localStorage (`localStorage.clear()` in DevTools) to start fresh.

**Mobile simulation:** Chrome DevTools → Toggle device toolbar → iPhone 14 (390×844)

---

## 3. Test Cases

### TC-001: Home Page — Static Content

**Priority:** P1 | **Type:** Smoke

| Step | Expected |
|---|---|
| Open `/` on mobile viewport | Hero section renders, no horizontal scroll |
| See "Register your pet" CTA | Links to `/register/step-1` |
| See "I found a pet" CTA | Links to `/found/upload` |
| See social proof strip | 3 stats visible, scrollable if needed |
| See "How Pawlo works" section | 4 steps in a grid (2×2 on mobile) |
| See "Recently reunited" strip | Horizontal scroll with pet cards |
| See "Currently lost nearby" grid | 2-column grid with 4 lost pets |
| Tap any pet card | Navigates to `/pets/[id]` |
| Footer visible | Links: How it works · Privacy · Contact |

**Edge cases:**
- ❓ All CTA buttons must have min-height 44px (touch target)
- ❓ Long neighborhood names must truncate, not overflow

---

### TC-002: Pet Registration — Multi-step Flow

**Priority:** P1 | **Type:** Happy Path

#### Step 1: Photo Upload (`/register/step-1`)

| Step | Expected |
|---|---|
| Open step 1 | Progress indicator shows step 1/4 |
| Tap upload zone | File picker opens |
| Upload valid JPG (<8 MB) | Photo appears in grid, marked as Cover |
| Upload second photo | Added to grid, can set as cover |
| Tap "Set cover" on photo 2 | Cover badge moves to photo 2 |
| Try to upload 6th photo | Error: "Maximum 5 photos allowed" |
| Tap X on a photo | Photo removed; cover auto-assigned to first if needed |
| Tap Continue without photo | Error: "Please add at least one photo" |
| Upload photo and tap Continue | Navigates to step 2 |

**Edge cases:**
- ❓ Upload non-image file (e.g. PDF) → error "Only image files"
- ❓ Upload >8 MB image → error "Image must be under 8 MB"
- ❓ Navigate back from step 2 → step 1 restores photos (draft in localStorage)

#### Step 2: Pet Details (`/register/step-2`)

| Step | Expected |
|---|---|
| Fields pre-filled from draft | If returning from step 3 |
| Select species (Dog/Cat/Other) | Pill toggles, only one active at a time |
| Leave name empty, tap Continue | Inline error under name field |
| Enter name >40 chars | Error: "Max 40 characters" |
| Fill all fields and Continue | Navigates to step 3 |

**Edge cases:**
- ❓ Age field: enter 0 or negative → validation?
- ❓ Enter only whitespace in name → should be treated as empty

#### Step 3: Owner Info (`/register/step-3`)

| Step | Expected |
|---|---|
| Leave phone empty, tap Continue | Error under phone field |
| Enter invalid email format | Error: "Enter a valid email" |
| Enter invalid phone (letters) | Error: "Enter a valid phone number" |
| Fill all fields, Continue | Navigates to `/register/review` |

**Edge cases:**
- ❓ Phone with country code (+54 11 ...) → accepted
- ❓ Very long email (100+ chars) → accepted if valid format

#### Review & Confirm (`/register/review`)

| Step | Expected |
|---|---|
| Review shows all fields | Name, species, breed, color, neighborhood, photos |
| Photos scrollable horizontally | Thumbnail strip |
| "Back to edit" buttons work | Navigates to appropriate step |
| Tap "Register pet" | Loading spinner visible |
| Registration complete | Navigates to `/pets/{newId}` |
| Pet exists in localStorage | `pawlo_pets` key has the new pet |

---

### TC-003: Single-page Registration Form

**Priority:** P2 | **Type:** Alternative Flow

| Step | Expected |
|---|---|
| Open `/register` | Form renders with all sections visible |
| Tap photo upload area | File picker opens |
| Submit empty form | All required fields show inline errors |
| Fill only pet info, not owner | Owner fields show errors |
| Valid phone format check | Accepts: `+1 555-0100`, `555 0100` |
| Invalid email → error | `notanemail` → error shown |
| Valid submission | Navigates to `/pet/{id}` with success message |
| Pet in localStorage | Stored under `pawlo_pets` |

---

### TC-004: Pet Profile — Status Management

**Priority:** P1 | **Type:** Feature

| Step | Expected |
|---|---|
| Open `/pets/{id}` for any registered pet | Profile renders with photo, name, details |
| Status badge visible | Correct color for Active/Lost/Reunited |
| Tap status badge (localStorage pet) | Dropdown opens with 3 options |
| Tap backdrop outside dropdown | Dropdown closes (mobile-friendly) |
| Select "Lost" | Badge updates to red "Lost"; status persisted in localStorage |
| Select "Reunited" | Celebration banner shown; badge turns green |
| Open same pet in new tab | Status persists (localStorage) |

**Edge cases:**
- ❓ Tap status badge on static pet (from data/pets.ts) → no dropdown (read-only)
- ❓ Navigate to non-existent pet ID → "Pet not found" screen shown

#### Photo carousel (`/pets/[id]`)

| Step | Expected |
|---|---|
| Pet has multiple photos | Left/right arrows visible |
| Tap right arrow | Next photo shown, indicator dot advances |
| Tap thumbnail strip | Jumps to that photo |
| Pet has only one photo | Arrows hidden, no dots |

#### Contact CTAs

| Step | Expected |
|---|---|
| Tap "WhatsApp" button | Opens WhatsApp with pre-filled message |
| Tap "Call" button | Device initiates phone call |
| Tap "Email owner" | Opens mail client with pre-filled subject |

---

### TC-005: Found Pet — Multi-step Flow

**Priority:** P1 | **Type:** Happy Path

#### Upload (`/found/upload`)

| Step | Expected |
|---|---|
| Open `/found/upload` | Upload zone with camera icon |
| Tap zone | File picker opens (with `capture="environment"`) |
| Upload pet photo | Photo preview shown with green badge |
| Tap X to remove | Returns to upload zone |
| Tap Continue without photo | Error: "Please upload a photo first" |
| Upload photo and Continue | Navigates to `/found/details` |

#### Details (`/found/details`)

| Step | Expected |
|---|---|
| Select Dog / Cat / Unknown | Only one selectable at a time |
| Select neighborhood from dropdown | Value stored |
| Add description (optional) | Character count visible (max 300) |
| Tap Continue | Navigates to `/found/processing` |
| Tap Continue with no fields filled | Proceeds (all optional) |

#### Processing (`/found/processing`)

| Step | Expected |
|---|---|
| Animation plays | Spinner ring, progress bar fills |
| 3 steps animate in sequence | Scan → Search → Rank |
| After ~2.5s | Navigates to `/found/results?reportId=...` |
| Demo pets in localStorage | `pawlo_pets` seeded if empty |
| Report saved | `pawlo_found_reports` has the new report |

#### Results (`/found/results`)

| Step | Expected |
|---|---|
| Matches shown | Up to 5 pets ranked by % score |
| First result highlighted | Gold rank badge |
| Match score bar visible | Width proportional to score |
| "View profile" button | Opens `/pets/{id}` |
| "Contact owner" button | Opens `/contact/{id}` |
| No matches scenario | "No matches found" with retry CTA |

**Edge cases:**
- ❓ Navigate to `/found/results` without `reportId` → redirects to `/found`
- ❓ Describe a very specific pet → at least 1 match expected (demo seeds Milo/Lost/Palermo)
- ❓ Describe "golden retriever palermo" → Milo should be #1 match

---

### TC-006: Found Pet — Single-page Flow

**Priority:** P2 | **Type:** Alternative Flow

| Step | Expected |
|---|---|
| Open `/found` | Photo upload + description in one screen |
| Submit empty form | Both fields show errors |
| Description < 10 chars | Error: "Add at least 10 characters" |
| Fill description + neighborhood | No errors |
| Submit | Navigates to `/found/results?reportId=...` |
| Demo pets available | Seeded on mount → matches found |

---

### TC-007: Contact Owner

**Priority:** P1 | **Type:** Feature

| Step | Expected |
|---|---|
| Open `/contact/{id}` for seeded pet | Pet summary card shown with status badge |
| Tap "Call" | `tel:` link triggers device call |
| Tap "Email" | `mailto:` link opens with pre-filled subject |
| Type message and tap Send | Success confirmation: "Message sent!" |
| Tap "Call directly" on success screen | `tel:` link works |
| Tap "Back to home" | Returns to `/` |

**Edge cases:**
- ❓ Navigate to `/contact/{unknown-id}` → "Pet not found" screen
- ❓ Send empty message → button disabled (no submit)

---

### TC-008: Mobile Viewport Spot-checks

**Priority:** P1 | **Type:** Visual / Layout  
**Device:** 390×844 (iPhone 14 equivalent)

| Check | Pass Criteria |
|---|---|
| Home hero text | No truncation, no overflow |
| Home CTA buttons | Full width on mobile, stacked vertically |
| Navbar | Logo + Register button visible; hamburger menu works |
| Registration form | All inputs full-width, labels visible |
| Photo upload zone | Visible, tap-able, no clipping |
| Results page | Each match card fits without horizontal scroll |
| Contact page | All 3 CTAs readable and tappable |
| Status badge dropdown | Opens below badge, not clipped by viewport |
| Status menu backdrop | Tapping outside closes menu |
| Pet profile photo | Full-bleed hero, content padded below |

---

### TC-009: Navigation and Back Behavior

**Priority:** P2 | **Type:** Navigation

| Scenario | Expected |
|---|---|
| Navbar logo on any page | Returns to `/` |
| Browser back from `/found/results` | Goes to `/found/processing` |
| Browser back from `/pets/[id]` | Goes to previous page |
| Direct URL access `/pets/[id]` | Loads pet profile correctly |
| Navigate to non-existent route | Next.js 404 page |

---

### TC-010: Mock-Persist Behavior

**Priority:** P2 | **Type:** Data Integrity

| Scenario | Expected |
|---|---|
| Register pet, close tab, reopen | Pet still in localStorage, visible |
| Change status, refresh | Status persisted |
| Submit found report, refresh | Report in `pawlo_found_reports` |
| Clear localStorage, go to `/found` | `seedDemoData()` re-seeds demo pets |
| Multiple registrations | All pets preserved in localStorage array |

---

### TC-011: Error Paths and Edge Cases

**Priority:** P2 | **Type:** Negative Testing

| Scenario | Expected |
|---|---|
| Photo > 8 MB on registration | Error message shown, upload blocked |
| Non-image file (PDF, HEIC) | Error: "Only image files accepted" |
| Name with only emoji | Passes validation (emoji are valid UTF-8) |
| Email: `a@b` | Valid by RFC 5321, accepted |
| Email: `@b.com` | Invalid, error shown |
| Phone: `123` | Invalid (too short), error shown |
| Phone: `+54 11 1234-5678` | Valid, accepted |
| Submit found report, then submit again | Two separate reports created |

---

### TC-012: Security Spot-checks

**Priority:** P3 | **Type:** Security

| Scenario | Expected |
|---|---|
| XSS: enter `<script>alert(1)</script>` in name | Displayed as text, not executed (React escapes by default) |
| XSS: in description | Same — React escaping protects |
| Direct pet contact link for another user | No auth needed (demo) — visible; note for production |
| Inspect localStorage | Pet data visible; not a concern for demo (no secrets) |

---

## 4. Bugs Found and Fixed (QA Session 2026-04-16)

| ID | Severity | Description | Fix Applied |
|---|---|---|---|
| BUG-001 | Critical | App had no implementation — only home page stub | Built all routes: register, pet profile, found, results, contact |
| BUG-002 | High | Double navbar — per-page `<Header />` AND global `<Navbar />` | Removed `<Header />` from all page components |
| BUG-003 | High | `/found/processing` navigated to `/found/results` without `reportId` | Updated processing page to compute matches and create report before navigating |
| BUG-004 | Medium | Pet profile content had no horizontal padding after full-bleed photo | Wrapped content in `page-container` div |
| BUG-005 | Medium | Status menu had no backdrop dismiss (hard to close on mobile) | Added fixed-inset backdrop overlay that closes menu on tap |
| BUG-006 | Medium | `lucide-react` in package.json but not installed | Ran `npm install` |
| BUG-007 | Low | Status badge touch target too small | Added `p-1 -m-1` to expand hitbox |
| BUG-008 | Low | `/found/page.tsx` didn't seed demo data — no matches shown | Added `seedDemoData()` call on mount |

---

## 5. Test Coverage Summary

| Flow | Covered | Critical Paths |
|---|---|---|
| Home / Landing | ✓ TC-001 | Hero CTAs, pet grid, navigation |
| Pet Registration (multi-step) | ✓ TC-002 | All 4 steps, validation, draft persist |
| Pet Registration (single-page) | ✓ TC-003 | Form validation, success redirect |
| Pet Profile | ✓ TC-004 | Status toggle, photo carousel, contact CTAs |
| Found Pet (multi-step) | ✓ TC-005 | Upload → Details → Processing → Results |
| Found Pet (single-page) | ✓ TC-006 | Form → Results |
| Contact Owner | ✓ TC-007 | Call, email, in-app message |
| Mobile Layout | ✓ TC-008 | All pages on 390px viewport |
| Navigation | ✓ TC-009 | Back behavior, direct URLs |
| Data Persistence | ✓ TC-010 | localStorage round-trips |
| Error Paths | ✓ TC-011 | Negative cases for all forms |
| Security | ✓ TC-012 | XSS, auth notes |

**Risk areas for production:**
1. No server-side validation — all validation is client-only
2. Photo data stored as base64 in localStorage — will hit 5-10MB storage limit quickly
3. No real AI matching — word-overlap heuristic only
4. No auth — any user can see any pet's owner contact info
