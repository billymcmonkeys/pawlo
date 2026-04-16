# Pawlo — UX Copy Document

**Date:** 2026-04-16
**Author:** Juliana
**Scope:** Complete UI copy for Pawlo, a neighborhood lost pet recovery app
**Audience:** English-speaking users (US/UK locale)
**Target tone:** Warm, clear, trustworthy, friendly — urgent when needed
**User types:** Pet owners registering their pet · Finders reporting a found animal
**Flows covered:** Homepage · Register pet · Found pet · Pet profile · Error & empty states · Global micro-copy

---

## 1. Product voice

### What Pawlo is

A neighborhood app that reunites lost pets with their owners using photo matching and local alerts. Two sides: people who lost a pet, and people who found one. Every word should feel like a caring neighbor, not a database.

### Voice dimensions

| Dimension | Position | Notes |
|-----------|----------|-------|
| Formal ↔ Casual | **Casual** | Talks to a person, not a "user" |
| Serious ↔ Playful | **Balanced** | Warm and friendly, but serious when urgency matters |
| Respectful ↔ Irreverent | **Respectful** | Never condescending, never clinical |
| Enthusiastic ↔ Neutral | **Warmly enthusiastic** | Celebrates reunions; doesn't over-hype routine actions |

### Voice rules

- Speak in second person ("your pet", "the animal you found"). No generic "users."
- Avoid cold imperatives. "Add a photo" beats "You must provide a photo."
- Pet loss is emotionally charged. Acknowledge it without dramatizing it.
- The finder may be nervous too — reassure them they're doing the right thing.
- Error messages never blame. They explain what happened and what to do next.
- Words to avoid: "submit," "utilize," "process," "entity," "invalid input."
- Words to prefer: "share," "upload," "add," "find," "connect," "reach out."

---

## 2. App name, tagline, and hero

### Name: Pawlo

**Rationale:**
"Paw" (an animal's paw — immediately signals pets) + "-lo" (a soft, familiar suffix — like a nickname, like a friend calling out to you). The name does three things at once: it tells you what it's about, it feels warm and human, and it's short enough to become a verb ("just Pawlo it"). It also quietly rhymes with "halo" — a circle of protection, of community looking out for each other.

**Name usage:**
- Full name: **Pawlo**
- In running copy: "Pawlo," "the app"
- Never: "PAWLO", "pawlo" (in UI), "Pawlo App"

---

### Taglines — options

**Option A (emotional, owner-first):**
> Every paw finds its way home.

**Rationale:** Speaks directly to the fear and hope behind a lost pet. "Way home" is concrete and warm. Works as a promise, not a slogan.

**Option B (community-first, action-oriented):**
> Your neighborhood is already looking.

**Rationale:** Shifts the frame from individual loss to collective action. Reassuring for owners, and empowering for finders. Highlights the network effect that makes Pawlo work.

**Recommendation:** Option A for emotional contexts (onboarding, reunion confirmation, app store copy). Option B for growth messaging and community-facing campaigns.

---

### Hero — homepage

**Headline:**
> Lost a pet? Someone nearby may have seen them.

**Subheadline:**
> Pawlo connects pet owners and neighbors to reunite lost animals — fast. Post an alert, or report a pet you found.

**Rationale for headline:** Opens with a direct question that immediately qualifies the right user. "Someone nearby may have seen them" introduces hope and the community angle in one breath. "Them" is intentionally gender-neutral and humanizes the animal.

**Primary CTA:**
> I lost my pet

**Secondary CTA:**
> I found a pet

**Rationale for CTA split:** Two clear paths from the very first screen — no guessing which button is for whom. Active first person ("I lost," "I found") is more human than "Report lost pet" or "Register found animal."

---

### How It Works — section

**Section label:** `How Pawlo works`

**Step 1**
> **Register your pet**
> Add a photo and basic info. If your pet ever goes missing, Pawlo is ready to help you find them.

**Step 2**
> **Post an alert or report a find**
> Lost your pet? Post an alert to your neighborhood in seconds. Found one wandering? Upload a photo — we'll search for a match.

**Step 3**
> **Get connected**
> Pawlo notifies neighbors nearby and uses photo matching to connect found pets with their owners. One tap to reach out.

**Section closing line:**
> It works because neighbors help neighbors.

---

## 3. Register your pet flow

### Flow overview

Four steps: Pet basics → Photo → Your contact info → Review & confirm.

**Progress indicator format:** `Step {n} of 4 — {Step name}`

---

### Step 1 of 4 — Pet basics

**Step label:** `About your pet`
**Progress indicator:** `Step 1 of 4 — About your pet`

**Page title:** `Tell us about your pet`
**Subtitle:** `This information helps us identify your pet if they're ever found.`

#### Form fields

| Field | Label | Placeholder | Helper text |
|-------|-------|-------------|-------------|
| Pet's name | `Name` | `e.g. Biscuit` | — |
| Species | `Species` | `Select a species` | — |
| Breed | `Breed` | `e.g. Golden Retriever` | `Not sure? Approximate is fine.` |
| Color / markings | `Color & markings` | `e.g. Orange tabby with white paws` | `The more detail, the better.` |
| Size | `Size` | `Select a size` | — |
| Age | `Age` | `e.g. 3` | `Approximate is fine.` |
| Age unit | — | `Years / Months` | — |
| Sex | `Sex` | `Select` | — |
| Microchip number *(optional)* | `Microchip number` | `e.g. 985112345678903` | `Optional, but speeds up official identification.` |
| Distinguishing features *(optional)* | `Any other details?` | `Missing an eye, always wears a red collar, loves strangers...` | `Quirks help people recognize your pet.` |

#### Species options

| Value | Label |
|-------|-------|
| `dog` | Dog |
| `cat` | Cat |
| `rabbit` | Rabbit |
| `bird` | Bird |
| `other` | Other |

#### Size options

| Value | Label |
|-------|-------|
| `tiny` | Tiny (under 5 lbs) |
| `small` | Small (5–20 lbs) |
| `medium` | Medium (20–60 lbs) |
| `large` | Large (60–100 lbs) |
| `extra_large` | Extra large (100+ lbs) |

#### Sex options

`Male · Female · Unknown`

**CTA:** `Continue`
**Back link:** `Back`

---

### Step 2 of 4 — Photo

**Step label:** `Photo`
**Progress indicator:** `Step 2 of 4 — Photo`

**Page title:** `Add a photo of your pet`
**Subtitle:** `A clear, recent photo makes it much easier to identify your pet.`

#### Upload area (empty state)

**Illustration:** paw print outline
**Primary prompt:** `Upload a photo`
**Secondary prompt:** `or drag and drop here`
**Accepted formats note:** `JPG, PNG or WEBP · Max 10 MB`

#### Upload tips (shown below the upload zone)

**Tips header:** `Tips for the best photo`

| Tip |
|-----|
| Use a recent photo — within the last year if possible |
| Make sure your pet's face is clearly visible |
| Natural light works best |
| Avoid filters or heavy cropping |

#### After photo is added

**Preview alt text:** `Photo of {pet name}`
**Change photo link:** `Use a different photo`
**Remove photo link:** `Remove`

#### Multiple photos note *(shown after first photo)*
> You can add up to 3 photos. More angles help with matching.
**Add another:** `+ Add another photo`

**CTA:** `Continue`
**Back link:** `Back`
**Skip link:** `Skip for now` *(available, shown below CTA, with tooltip: "You can add a photo later from your pet's profile.")*

---

### Step 3 of 4 — Your contact info

**Step label:** `Your contact info`
**Progress indicator:** `Step 3 of 4 — Your contact info`

**Page title:** `How should people reach you?`
**Subtitle:** `This is only shared with people who may have found your pet.`

#### Form fields

| Field | Label | Placeholder | Helper text |
|-------|-------|-------------|-------------|
| Your name | `Your name` | `e.g. Jamie Rodriguez` | `First name is fine.` |
| Phone number | `Phone number` | `e.g. (555) 867-5309` | `We'll never share this publicly.` |
| Email | `Email` | `e.g. jamie@email.com` | — |
| Neighborhood / area | `Your neighborhood` | `e.g. Oak Park, Austin TX` | `Helps narrow the search to the right area.` |
| Preferred contact method | `Preferred contact` | `Select` | — |

#### Preferred contact options

`Phone call · Text message · Email · Any`

**Privacy note (below form):**
> Your contact details are only shown to verified users who report finding a pet matching yours. We never share or sell your information.

**CTA:** `Continue`
**Back link:** `Back`

---

### Step 4 of 4 — Review & confirm

**Step label:** `Review`
**Progress indicator:** `Step 4 of 4 — Review`

**Page title:** `Does everything look right?`
**Subtitle:** `Take a moment to check — this is what people will see if they find your pet.`

#### Review sections

| Section | Header | Edit action |
|---------|--------|-------------|
| Pet details | `About {pet name}` | `Edit` |
| Photos | `Photos` | `Edit` |
| Contact info | `Your contact info` | `Edit` |

#### Privacy reminder (inline, below review)
> Your phone number and email are hidden from the public. They're only shared when someone reports a match.

**Submit CTA:** `Register {pet name}`

*(If pet has no name: `Register my pet`)*

**Back link:** `Back`

---

### Success screen — pet registered

**Illustration:** paw print inside a heart, or a happy animal

**Headline:** `{Pet name} is registered!`

*(If no name: `Your pet is registered!`)*

**Body:**
> If {pet name} goes missing, you can post an alert from their profile in seconds. Pawlo will notify neighbors and start searching for a match right away.

**Primary CTA:** `View {pet name}'s profile`
**Secondary CTA:** `Register another pet`

**Tip (below CTAs):**
> Keep {pet name}'s photo up to date. A recent picture makes all the difference.

---

## 4. Pet profile screen

### Header

**Back link:** `My pets`
**Status badge:** *(see badge labels below)*
**Menu / options:** `···` *(aria-label: `More options for {pet name}`)*

---

### Status badge labels

| Status | Badge label | Badge color |
|--------|-------------|-------------|
| Safe at home | `Safe` | Green |
| Lost — alert active | `Lost` | Red |
| Possibly found | `Possible match` | Amber |
| Found & reunited | `Reunited` | Blue |

---

### Profile sections

| Section | Header |
|---------|--------|
| Pet details | `About {pet name}` |
| Photos | `Photos` |
| Alert status | `Alert status` |
| Contact summary | `Your contact info` |
| Activity | `Recent activity` |

---

### Section: About {pet name}

| Detail label | Format |
|--------------|--------|
| Species | `Species` |
| Breed | `Breed` |
| Color & markings | `Color & markings` |
| Size | `Size` |
| Age | `Age` |
| Sex | `Sex` |
| Microchip | `Microchip #` |
| Other details | `Details` |

**Edit button:** `Edit profile`

---

### Section: Alert status

#### When pet is safe

**Status line:** `{Pet name} is home safe.`
**CTA:** `Post a lost alert`
**CTA helper text:** `If {pet name} goes missing, tap here to alert your neighborhood instantly.`

#### When alert is active

**Status line:** `Lost alert active since {date}.`
**Active since format:** `April 14, 2026 at 3:22 PM`
**CTA:** `Mark as found`
**Secondary CTA:** `Edit alert details`
**Tip:** `Share this profile link to reach more people.`
**Share link label:** `Copy profile link`

#### When marked as found

**Status line:** `{Pet name} has been marked as found.`
**CTA:** `Mark as safe at home`
**Note below:** `This will close the alert and notify people who were helping.`

---

### Section: Contact summary

> People who find a match can reach you by {preferred contact method}. Your full contact details are never shown publicly.

**Edit button:** `Edit contact info`

---

### Action buttons

| Action | Label | Confirmation |
|--------|-------|-------------|
| Post lost alert | `My pet is missing` | *(goes to alert flow, no modal)* |
| Mark as found | `I found my pet!` | `Mark {pet name} as found? This will close the active alert and let helpers know they've been reunited.` · CTA: `Yes, we're reunited!` / `Cancel` |
| Edit profile | `Edit profile` | — |
| Delete profile | `Remove {pet name}` | `Remove {pet name} from Pawlo? This will delete their profile and close any active alerts. This can't be undone.` · CTA: `Yes, remove` / `Cancel` |
| Share profile | `Share profile` | — |

---

### Section: Recent activity

**Empty state (no activity):**
> No activity yet. Activity will appear here when your alert is active.

**Activity item labels:**

| Event | Copy |
|-------|------|
| Profile created | `Profile created` |
| Alert posted | `Lost alert posted` |
| Alert updated | `Alert updated` |
| Possible match found | `A possible match was reported nearby` |
| Match dismissed | `Match dismissed` |
| Marked as found | `Marked as found` |
| Alert closed | `Alert closed` |

---

## 5. Found pet flow

### Entry point copy

**Prompt on homepage:** `Found a pet?`
**Subtext:** `Help them get home. It only takes a minute.`
**CTA:** `Report a found pet`

---

### Step 1 — Upload a photo

**Page title:** `Upload a photo of the animal`
**Subtitle:** `We'll search for a match in your area. No account needed.`

#### Upload area (empty state)

**Illustration:** camera outline or magnifying glass over a paw
**Primary prompt:** `Upload a photo`
**Secondary prompt:** `or drag and drop here`
**Formats note:** `JPG, PNG or WEBP · Max 10 MB`

#### Upload tips

**Tips header:** `For the best match results`

| Tip |
|-----|
| Take the photo in good light |
| Get as close as the animal will let you |
| Try to capture the face and any markings |
| If safe to do so, take a few angles |

#### After upload — preview state

**Alt text:** `Photo of found animal`
**Change photo:** `Use a different photo`
**Remove:** `Remove`

**CTA:** `Search for a match`

---

### Step 2 — Quick details

**Page title:** `A few quick details`
**Subtitle:** `This helps narrow the search. Answer what you can — nothing is required.`

#### Form fields

| Field | Label | Placeholder | Helper text |
|-------|-------|-------------|-------------|
| Species | `Species` | `Select` | — |
| Approximate size | `Size` | `Select` | — |
| Color / markings | `Color & markings` | `e.g. Brown dog with white spot on chest` | `Any details you noticed` |
| Where you found them | `Where you found them` | `e.g. Oak Ave near the park, Austin TX` | `Street, neighborhood, or landmark` |
| When you found them | `When` | `Select date and time` | `Approximate is fine.` |
| Is the animal with you now? | `Is the animal with you?` | `Yes / No / Nearby` | — |
| Any collar or tags? | `Collar or tags?` | `Select` | — |

#### Collar options

`Yes, with info · Yes, blank · No collar · Not sure`

#### Is the animal with you options

`Yes, I have them · No, but I know where they are · I'm not sure where they went`

**CTA:** `Continue`
**Skip link:** `Skip — just search with the photo`

---

### Processing screen

**This screen appears while Pawlo runs photo matching.**

**Illustration:** animated paw print or subtle pulse animation

**Stage 1 (0–2 s):**
> Uploading your photo…

**Stage 2 (2–5 s):**
> Analyzing possible matches…

**Stage 3 (5–10 s):**
> Checking pets reported missing nearby…

**Stage 4 (if taking longer than 10 s):**
> Almost there — this one's taking a moment…

**Stage 5 (timeout fallback, > 20 s):**
> Taking longer than expected. We're still searching — hang tight.

**Cancel link (visible after 8 s):** `Cancel`

---

### Results screen — matches found

**Page title:** `We found some possible matches`

**Subheadline (1 result):**
> There's 1 pet in your area that could be a match.

**Subheadline (2+ results):**
> There are {n} pets in your area that could be a match.

**Sort label:** `Sort by`
**Sort options:** `Best match · Most recent · Closest`

---

#### Match card labels

| Element | Copy |
|---------|------|
| Card header | `{Pet name}` *(or "Unknown name" if unlisted)* |
| Species chip | `Dog` / `Cat` / etc. |
| Distance label | `{n} mile away` / `{n} miles away` |
| Reported missing | `Missing since {date}` |
| Owner label | `Owner` |
| Match score label | `Match confidence` |

---

#### Similarity / match score language

Avoid percentages — they feel false-precise. Use descriptive language instead:

| Score range | Label | Supporting text |
|-------------|-------|-----------------|
| 90–100% | `Very likely match` | `Strong visual match — markings and features are very similar.` |
| 70–89% | `Likely match` | `Several features match. Worth reaching out to the owner.` |
| 50–69% | `Possible match` | `Some features are similar. The owner can help confirm.` |
| Below 50% | `Low similarity` | `Features differ from the animal you found.` |

**Disclaimer below results:**
> Pawlo's photo matching is a guide, not a guarantee. Always confirm with the owner before assuming a match.

---

#### Contact owner CTA

**Primary CTA on card:** `Contact owner`
**CTA after expanding card:** `Reach out to the owner`

**Modal title:** `Reaching out about {pet name}`
**Modal body:**
> You're about to contact {pet name}'s owner. They'll be notified that someone may have found their pet. Only proceed if you genuinely believe this could be a match.

**Confirm CTA:** `Send a message`
**Cancel:** `Not this one`

**Message field label:** `Your message`
**Message placeholder:** `Hi, I think I may have found your pet — I found them near {location}. Let me know if you'd like to connect.`
**Message helper text:** `Keep it brief. The owner will be able to see your photo of the animal.`

**Send CTA:** `Send`

---

### Results screen — no matches found

**Illustration:** searching dog silhouette or empty magnifying glass
**Headline:** `No matches found right now`
**Body:**
> We don't have a registered pet matching this description in your area — but that doesn't mean there isn't one. People register their missing pets at different times.

**Options:**

| Action | Label |
|--------|-------|
| Submit the report anyway | `Submit this sighting` |
| Be notified if a match comes in | `Notify me if a match appears` |
| Return to home | `Back to home` |

**Submit sighting helper text:**
> We'll keep your photo on file and alert you if a matching pet gets registered. No account needed.

---

### Sighting submitted — confirmation

**Headline:** `Thank you for helping`
**Body:**
> Your sighting has been submitted. If a pet matching the one you found gets registered nearby, we'll let you know.

> If the animal is with you and needs care, your local animal shelter can help.

**CTA:** `Find a nearby shelter` *(external link, opens new tab)*
**Secondary:** `Back to home`

---

### Reunion confirmation (when match is confirmed by owner)

**Notification text (push / in-app):**
> {Pet name}'s owner confirmed a match. They're on their way home. Thank you for helping reunite them.

**In-app screen headline:** `They made it home.`
**Body:** `{Pet name} is back with their family thanks to you. That's a really good thing you did.`
**CTA:** `Back to home`

---

## 6. Error states, empty states, and validation messages

### Validation messages — general rules

- Show inline, below the relevant field — not at the top of the form.
- Trigger on blur (leaving the field), not on every keystroke.
- Never say "invalid," "error," or "failed" as a standalone word.

---

### Form validation messages

| Field | Rule | Message |
|-------|------|---------|
| Pet name | Required | `What's your pet's name? (A nickname works fine.)` |
| Species | Required | `Please select a species to continue.` |
| Color / markings | Too short (< 3 chars) | `Add a bit more detail — color, pattern, any unique markings.` |
| Age | Not a number | `Enter a number for your pet's age.` |
| Age | Zero or negative | `Age should be greater than 0.` |
| Phone number | Invalid format | `That doesn't look like a valid phone number. Try a format like (555) 867-5309.` |
| Email | Invalid format | `That doesn't look like a valid email address.` |
| Neighborhood | Required | `Add a neighborhood or city so we can alert the right area.` |
| Photo | File too large | `That photo is too large. Please use an image under 10 MB.` |
| Photo | Unsupported format | `Pawlo accepts JPG, PNG, and WEBP photos only.` |
| Photo | Upload failed | `We couldn't upload that photo. Check your connection and try again.` |
| Message | Empty on send | `Write a short message before sending.` |
| Message | Too long (> 500 chars) | `Keep your message under 500 characters.` |

---

### System error messages

| Situation | Message |
|-----------|---------|
| Generic server error | `Something went wrong on our end. Your info is safe — try again in a moment.` |
| Network error | `Can't reach Pawlo right now. Check your connection and try again.` |
| Search failed | `We couldn't run the search right now. Try again in a moment.` |
| Profile load failed | `We couldn't load this profile. Try refreshing the page.` |
| Alert post failed | `We couldn't post your alert. Your pet's info is saved — try again in a moment.` |
| Message send failed | `Your message didn't send. Try again, or copy it and reach out another way.` |
| Session expired | `Your session expired. Sign in again to continue — your changes are saved.` |
| Photo not loadable | `Photo unavailable` *(alt text fallback)* |

---

### Empty states

#### My pets — no pets registered

**Illustration:** empty pet bed or paw print outline
**Headline:** `You haven't registered a pet yet`
**Body:** `Register your pet now so you're ready if they ever go missing.`
**CTA:** `Register a pet`

---

#### My pets — pets registered, no active alerts

**Headline:** `All your pets are home safe.`
**Body:** `If one of them ever goes missing, you can post an alert from their profile.`
*(No CTA needed — this is a reassuring empty state)*

---

#### Nearby alerts — no alerts in the area

**Illustration:** quiet neighborhood
**Headline:** `No lost pets reported nearby`
**Body:** `That's a good thing. If you spot a stray, you can report them in seconds.`
**CTA:** `Report a found pet`

---

#### Search results — no matches

*(See Section 5 — Results screen, no matches found)*

---

#### Activity feed — no activity

**Text:** `No activity yet.`

---

#### Messages — no conversations

**Headline:** `No messages yet`
**Body:** `When you contact a pet owner or someone reaches out about your pet, messages will appear here.`

---

#### Notifications — none

**Text:** `You're all caught up.`

---

### Loading states

| Situation | Message |
|-----------|---------|
| Loading pet profile | `Loading profile…` |
| Posting an alert | `Posting your alert…` |
| Saving changes | `Saving…` |
| Uploading photo | `Uploading photo…` |
| Running match search | *(see Processing screen in Section 5)* |
| Sending message | `Sending…` |

---

### Success toasts (inline, auto-dismiss)

| Action | Toast |
|--------|-------|
| Pet registered | `{Pet name} is registered.` |
| Profile updated | `Changes saved.` |
| Alert posted | `Alert is live — neighbors will be notified.` |
| Alert closed | `Alert closed.` |
| Message sent | `Message sent.` |
| Photo removed | `Photo removed.` |
| Link copied | `Link copied.` |
| Sighting submitted | `Sighting submitted. We'll let you know if a match appears.` |

---

## 7. Navigation labels and global micro-copy

### Main navigation

| Item | Label | Icon |
|------|-------|------|
| Home | `Home` | house |
| My pets | `My pets` | paw |
| Report found | `Found a pet` | search |
| Alerts nearby | `Nearby` | location pin |
| Messages | `Messages` | chat bubble |
| Account | `Account` | person |

---

### Header / top bar

| Element | Label |
|---------|-------|
| Logo | `Pawlo` *(link to home)* |
| Post an alert CTA (quick action) | `My pet is missing` |
| Report found CTA (quick action) | `I found a pet` |
| Notifications | `Notifications` *(sr-only)* |
| Account menu toggle | `Account menu` *(sr-only)* |

---

### Account menu (dropdown)

```
My pets
My account
Notification settings
Help & FAQ
Sign out
```

---

### Breadcrumbs

| Screen | Breadcrumb |
|--------|------------|
| Pet profile | `My pets / {Pet name}` |
| Edit pet profile | `My pets / {Pet name} / Edit` |
| Register new pet | `My pets / New pet` |
| Found pet results | `Found a pet / Results` |

---

### Page titles (for `<title>` tag and screen readers)

| Page | Title |
|------|-------|
| Home | `Pawlo — Find lost pets in your neighborhood` |
| My pets | `My pets — Pawlo` |
| Pet profile | `{Pet name} — Pawlo` |
| Register pet | `Register a pet — Pawlo` |
| Found a pet | `I found a pet — Pawlo` |
| Match results | `Match results — Pawlo` |
| Nearby alerts | `Nearby alerts — Pawlo` |
| Messages | `Messages — Pawlo` |
| Account | `My account — Pawlo` |
| 404 | `Page not found — Pawlo` |

---

### Accessibility labels (aria-label)

| Element | `aria-label` |
|---------|-------------|
| Upload photo button | `Upload a photo` |
| Remove photo | `Remove photo` |
| Change photo | `Use a different photo` |
| Post alert button | `Post a lost alert for {pet name}` |
| Mark as found button | `Mark {pet name} as found` |
| Match card contact button | `Contact owner of {pet name}` |
| Match card expand | `See more about {pet name}` |
| Match score badge | `Match confidence: {label}` |
| Close modal button | `Close` |
| Delete pet profile | `Remove {pet name} from Pawlo` |
| Navigation item (active) | `{Label}, current page` |
| Notification badge | `{n} unread notifications` |

---

### Global buttons (common actions)

| Action | Label |
|--------|-------|
| Save | `Save` |
| Save changes | `Save changes` |
| Cancel | `Cancel` |
| Continue | `Continue` |
| Back | `Back` |
| Close | `Close` |
| Done | `Done` |
| Try again | `Try again` |
| Confirm | `Confirm` |
| Edit | `Edit` |
| Remove | `Remove` |
| Share | `Share` |
| Copy link | `Copy link` |

---

### Error pages

#### 404

**Headline:** `This page doesn't exist`
**Body:** `The link might be broken, or the page may have been removed.`
**CTA:** `Go home`

---

#### 500

**Headline:** `Something went wrong`
**Body:** `We're looking into it. Refresh the page or try again in a moment.`
**CTA:** `Refresh`

---

#### Offline

**Headline:** `No internet connection`
**Body:** `Pawlo needs a connection to work. Check your Wi-Fi or mobile data and try again.`
**CTA:** `Try again`

---

### Notification copy

| Trigger | Notification text |
|---------|------------------|
| Possible match found (owner) | `Someone may have found {pet name}. Tap to see the report.` |
| New message received | `You have a new message about {pet name}.` |
| Alert shared nearby | `Your alert for {pet name} was shared with {n} neighbors.` |
| Match confirmed (finder) | `Great news — {pet name} is heading home. Thank you for helping.` |
| Sighting match (finder) | `A pet was just registered that matches your sighting. Tap to see.` |

---

## 8. Onboarding (first-time user)

### Welcome screen (after sign-up)

**Illustration:** friendly neighborhood scene, or paw + house icon

**Headline:** `Welcome to Pawlo`
**Body:**
> Pawlo helps neighbors find lost pets together. Register your pet now, and if they ever go missing, getting help is as fast as one tap.

**Primary CTA:** `Register my pet`
**Secondary CTA:** `I'll do this later`

---

### First-time "Found a pet" (no account)

**Headline:** `You're helping someone's family`
**Body:**
> No account needed to report a found pet. Just upload a photo and we'll search for a match right away.

**CTA:** `Continue`

---

### Push notification permission prompt

**Title:** `Stay in the loop`
**Body:** `Allow notifications so Pawlo can alert you the moment a match is found — or someone reaches out about your pet.`
**Allow CTA:** `Turn on notifications`
**Decline link:** `Not now`

---

## 9. Product glossary

Consistent terminology across all UI copy and communications:

| Use | Instead of |
|-----|------------|
| `pet` | "animal," "creature," "fur baby" *(too informal for functional copy)* |
| `register` | "add," "create," "submit" *(in the context of adding a pet)* |
| `post an alert` | "report," "flag," "create a listing" |
| `report a find` | "submit," "log," "report a found animal" |
| `match` | "result," "hit," "potential owner" |
| `contact owner` | "reach out to," "message" *(for CTAs)* |
| `profile` | "listing," "record," "entry" |
| `sighting` | "report," "submission" *(for finders who didn't find the pet, but spotted it)* |
| `neighborhood` | "area," "zone," "radius" *(in user-facing copy)* |
| `reunited` | "found," "returned," "recovered" *(specific to confirmed match)* |

---

*Document by Juliana · Copy v1.0 · Pawlo*
