# Pawlo — Wireframe: Pet Profile Screen

## Screen context
- **Route:** `/pets/:petId`
- **Device:** Mobile-first
- **Viewers:** Owner (full controls) · Logged-in neighbor (contact only) · Public visitor (limited)
- **Goal:** Give neighbors all the info to identify the pet + a clear way to contact the owner

---

## Layout — Mobile (Owner View)

```
┌─────────────────────────────────────┐
│ NAV                                 │
│ ← Back              ⋮ (More menu)  │
│                                     │
│ HERO IMAGE                          │
│ ┌───────────────────────────────┐   │
│ │                               │   │
│ │                               │   │
│ │   [Main pet photo]            │   │
│ │   Full width, 260px tall      │   │
│ │   object-fit: cover           │   │
│ │                               │   │
│ │              [Active ●]       │   │
│ │              Status badge     │   │
│ └───────────────────────────────┘   │
│                                     │
│ PHOTO GALLERY (if >1 photo)         │
│ ┌───────────────────────────────┐   │
│ │ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │   │
│ │ │IMG │ │IMG │ │IMG │ │ +3 │  │   │
│ │ └────┘ └────┘ └────┘ └────┘  │   │
│ └───────────────────────────────┘   │
│                                     │
│ PET HEADER                          │
│ ┌───────────────────────────────┐   │
│ │ Buddy                         │   │
│ │ Golden Retriever · Male · 3y  │   │
│ │ 📍 Riverside, Austin TX       │   │
│ └───────────────────────────────┘   │
│                                     │
│ ACTION BUTTONS (Owner only)         │
│ ┌───────────────────────────────┐   │
│ │ ┌──────────┐ ┌─────────────┐ │   │
│ │ │  ✏ Edit  │ │ ⚠ Mark Lost │ │   │
│ │ └──────────┘ └─────────────┘ │   │
│ └───────────────────────────────┘   │
│                                     │
│ PET INFO CARDS                      │
│ ┌───────────────────────────────┐   │
│ │ 🎨 Appearance                 │   │
│ │ ─────────────────────────────│   │
│ │ Color       Golden coat       │   │
│ │ Markings    White patch chest │   │
│ │ Size        Medium (20–45 lb) │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 📋 Details                    │   │
│ │ ─────────────────────────────│   │
│ │ Breed       Golden Retriever  │   │
│ │ Age         3 years           │   │
│ │ Gender      Male              │   │
│ │ Microchip   #985112000123     │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ 📝 Notes                      │   │
│ │ ─────────────────────────────│   │
│ │ "Responds to 'Buddy'. Very    │   │
│ │  friendly with children.      │   │
│ │  Loves fetch."                │   │
│ └───────────────────────────────┘   │
│                                     │
│ OWNER CONTACT SUMMARY               │
│ ┌───────────────────────────────┐   │
│ │ 👤 Owner                      │   │
│ │ ─────────────────────────────│   │
│ │ Sarah M.          📞 Call     │   │
│ │ Riverside, Austin             │   │
│ │ Member since March 2026       │   │
│ └───────────────────────────────┘   │
│                                     │
│ DANGER ZONE (Owner only)            │
│ ┌───────────────────────────────┐   │
│ │ [Mark as Reunited ❤]         │   │
│ │ [Remove this pet profile]     │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Status Badge — Visual States

The badge appears in the hero image, bottom-right corner, with a semi-transparent white pill background.

| Status | Badge style | Hero image overlay |
|--------|------------|-------------------|
| **Active** | Teal pill · "Active ●" | No overlay |
| **Lost** | Amber pill · "Lost ⚠" | Subtle amber gradient bottom-bar with "LOST" text |
| **Reunited** | Green pill · "Reunited ❤" | Green gradient checkmark overlay, briefly animated |

When status is **Lost**, the entire card gets an additional amber left border (4px) to signal urgency at list-level.

---

## Hero Image Area

- **Height:** 260px mobile, 360px tablet+
- **Fit:** `object-fit: cover`, `object-position: top center`
- **Gradient overlay:** Linear, transparent → `rgba(0,0,0,0.35)` at bottom, for legibility of badge
- **Tap behavior:** Opens full-screen image lightbox (pinch-to-zoom)
- **Empty state:** Warm gray placeholder with paw print icon centered

---

## Photo Gallery

- **Shown:** Only when pet has 2+ photos
- **Layout:** Horizontal scroll row, 64×64px thumbnails, `radius-md`, `gap-2`
- **Overflow indicator:** Last visible slot shows `+N` in `neutral-600` on `neutral-100` bg
- **Tap:** Opens lightbox at tapped index
- **Owner view:** Last slot shows `+` add button (neutral-200 dashed border)

---

## Pet Info Cards

Common anatomy for all info cards:
- Background: `neutral-0`
- Border: `neutral-100`
- `radius-lg`
- `shadow-xs`
- Header row: icon + label — `text-label` / `neutral-500`
- Divider: `neutral-100`
- Data rows: `text-body` / `neutral-700`, label `text-body-sm` / `neutral-500`

**Missing optional fields** (breed, microchip): show "—" placeholder in `neutral-400`. Not hidden.

---

## Action Buttons (Owner)

### "Edit" button
- Style: Outlined, `secondary-500` border + text, `radius-md`
- Icon: `pencil` (Lucide), 16px
- Action: Opens edit flow with pre-filled form

### "Mark as Lost" button
- Style: Filled, `warning-500` background, white text, `radius-md`
- Icon: `alert-triangle` (Lucide), 16px
- Action: Opens confirmation bottom sheet before executing

#### Mark as Lost — Confirmation Bottom Sheet
```
┌───────────────────────────────────┐
│ ─────                             │ ← drag handle
│                                   │
│ Mark Buddy as Lost?               │
│                                   │
│ Your neighborhood will get a      │
│ notification with Buddy's photo   │
│ and your contact info.            │
│                                   │
│ ┌───────────────────────────────┐ │
│ │  Yes, mark as Lost ⚠         │ │ ← warning fill
│ └───────────────────────────────┘ │
│         Cancel                    │
└───────────────────────────────────┘
```

### "Mark as Reunited" button
- Style: Outlined, `success-500` border + text, `radius-md`
- Icon: `heart` (Lucide), 16px
- Action: Opens simple confirmation — "Is Buddy home safe?" → Yes/No
- After confirm: status updates, success animation plays, option to share to social

---

## Owner Contact Summary (Neighbor View)

When pet is **Active**: Contact is hidden. Shows only "Registered in Riverside, Austin."

When pet is **Lost**: Full contact card shows:
```
┌───────────────────────────────┐
│ 👤 Owner                      │
│ ──────────────────────────────│
│ Sarah M.                      │
│ 📞 +1 (555) 000-0000          │
│ 📍 Riverside, Austin TX       │
│                               │
│ ┌──────────────────────────┐  │
│ │  📞  Call owner           │  │  ← tel: link
│ └──────────────────────────┘  │
│ ┌──────────────────────────┐  │
│ │  💬  Send a message       │  │  ← in-app message or WhatsApp
│ └──────────────────────────┘  │
└───────────────────────────────┘
```

> **Privacy note:** Phone number is only shown if the pet is `Lost`. If `Active` or `Reunited`, owner's surname and phone are hidden. This prevents misuse.

---

## View Differences by Role

| Section | Owner | Logged-in neighbor | Public visitor |
|---------|-------|-------------------|----------------|
| Hero + gallery | Full | Full | Full |
| Pet info cards | Full | Full | Full |
| Owner contact | Full (own details) | Shown if Lost | Hidden |
| Edit button | Visible | Hidden | Hidden |
| Mark as Lost | Visible | Hidden | Hidden |
| Mark as Reunited | Visible | Hidden | Hidden |
| Remove profile | Visible | Hidden | Hidden |

---

## More Menu (⋮ — Owner only)

```
┌──────────────────────┐
│ Edit pet profile      │
│ Add photos            │
│ Share profile link    │
│ ─────────────────    │
│ Remove profile        │  ← red text
└──────────────────────┘
```

---

## Empty & Edge States

| State | Behavior |
|-------|----------|
| No photo | Warm gray placeholder with paw icon |
| Single photo | Gallery row hidden |
| No notes | Notes card hidden |
| No breed | Shows "Mixed / Unknown" |
| No microchip | Shows "—" |
| Pet removed | 404 screen with "This profile is no longer available" + CTA to homepage |
| Loading | Skeleton: hero image, 3 info card skeletons, action buttons |

---

## Accessibility Notes
- Pet name is `<h1>`
- Status badge has `role="status"` and `aria-label="Pet status: Lost"`
- "Call owner" link uses `href="tel:..."` (native mobile behavior)
- Photo lightbox traps focus, closeable via Escape
- Action buttons have explicit `aria-label` ("Mark Buddy as Lost")
- Info cards use `<dl>` / `<dt>` / `<dd>` semantic structure
