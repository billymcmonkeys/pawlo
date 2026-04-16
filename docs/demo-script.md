# Pawlo — 3-Minute Demo Script

**Purpose:** Live product demo — register a pet, simulate finding it, show match results and contact flow  
**Duration:** 2:45–3:15 minutes  
**Audience:** Investors, potential users, product stakeholders  
**Setup:** Browser on mobile viewport (390×844) or actual phone  

---

## Pre-Demo Checklist

- [ ] Clear localStorage: open DevTools → Application → Storage → `Clear site data`
- [ ] Open `http://localhost:3000` (or the deployed URL)
- [ ] Set browser to mobile emulation: iPhone 14 (390×844)
- [ ] Have a pet photo ready (any clear photo of a dog or cat)
- [ ] Test run completed — app responds correctly

---

## Scene 1: The Problem (0:00–0:30)

> **Say:** "Every day, thousands of pets get lost in our neighborhoods. Owners are heartbroken, neighbors don't know who to contact. Pawlo solves this with a simple registry and AI-powered photo matching."

**On screen:** The Pawlo home page loads.

- Point to the hero: *"Every pet deserves to come home."*
- Show the "2,400+ pets reunited" stats strip
- Scroll briefly to show the lost pets grid

> **Highlight:** "Here you can see pets currently reported as lost in the area. But let's start from the beginning — what a pet owner does BEFORE their pet goes missing."

---

## Scene 2: Register Your Pet (0:30–1:30)

> **Say:** "As a pet owner, the first thing you do is register your pet — takes 2 minutes."

**Actions:**
1. Tap **"Register your pet"** CTA on the hero
2. The multi-step form opens at Step 1 (photo upload)

> **Highlight:** "Upload 1 to 5 photos. The AI uses these for visual matching later."

3. Tap the upload zone → select your pet photo
4. Photo appears with a "Cover" badge
5. Tap **Continue**

6. On Step 2 (pet details):
   - Select **Dog**
   - Name: **"Mango"**
   - Breed: **"Golden Retriever"**
   - Color: **"Golden"**
   - Description: *"Loves fetch, very friendly, wears a red collar with a bell"*
   - Status: **Lost** *(to demonstrate the lost flow)*
   - Neighborhood: **"Palermo"**
   - Tap **Continue**

7. On Step 3 (owner info):
   - Name: **"Laura"**
   - Phone: **"+54 11 4567-8901"**
   - Email: **"laura@demo.com"**
   - Tap **Continue**

8. Review screen — all data visible
9. Tap **"Register pet"**

> **Best moment to highlight:** *"In under 2 minutes, Mango is now in the Pawlo registry. If anyone spots him, they can contact Laura directly."*

---

## Scene 3: The Pet's Profile (1:30–1:50)

After registration → pet profile opens automatically.

> **Say:** "Each pet gets a shareable profile page with all the details."

**On screen:**
- Scroll through the profile: photo, status badge (Lost), breed, description
- Point to the **status badge** — tap it → show the dropdown (Active / Lost / Reunited)
- Close dropdown without changing

> **Highlight:** "Owners can update the status at any time. When the pet is found, they mark it Reunited — and the community knows."

- Show the **Contact** section at the bottom (call + email CTAs)

> **Say:** "Now let's switch perspectives — you're a neighbor who found a lost dog."

---

## Scene 4: Found a Pet — Report the Finding (1:50–2:30)

**Actions:**
1. Tap the **Pawlo logo** in the navbar → back to home
2. Tap **"I found a pet"** CTA

> **Say:** "A neighbor spots a lost dog. They open Pawlo and report it."

3. On `/found/upload`:
   - Upload any clear pet photo (same photo or a different one)
   - Tap **Continue**

4. On `/found/details`:
   - Select **Dog**
   - Neighborhood: **"Palermo"**
   - Description: *"Golden retriever, red collar, very friendly, found near the park"*
   - Tap **"Find matches"**

5. Processing screen plays (~2.5 seconds):
   - The spinner and 3 steps animate

> **Best moment to highlight:** *"This is where AI does its job — scanning registered pets, comparing photos and descriptions, and ranking by similarity."*

---

## Scene 5: Match Results (2:30–2:50)

Results page loads with ranked matches.

> **Say:** "Results in under 3 seconds."

**On screen:**
- Show the ranked list — Mango should appear as the top result
- Point to the **match score bar** and percentage
- Point to the gold **#1** badge on the best match

> **Highlight:** *"The match score is based on photo similarity, breed, color, and neighborhood overlap. The most likely owner is at the top."*

- Scroll to see additional matches below

---

## Scene 6: Contact the Owner (2:50–3:10)

1. Tap **"Contact owner"** on the top result (Mango)

**Contact page shows:**
- Pet summary card (photo, name, status badge)
- **WhatsApp** button with pre-filled message
- **Call** button with phone number
- **Email** button
- In-app message field

> **Say:** "One tap and you're talking to the owner. WhatsApp, call, or email — whichever works best. No apps to install, no accounts needed on the finder's side."

2. Type a short message: *"Hi! I found a golden retriever near Parque Las Heras. I think it might be Mango!"*
3. Tap **"Send message"**
4. Confirmation screen: **"Message sent! 📬"**

> **Best moment to highlight:** *"The whole process — from spotting a lost pet to contacting the owner — takes less than 60 seconds."*

---

## Scene 7: The Reunion (3:10–3:20, optional)

Back on the pet profile (`/pets/{id}`):

1. Navigate to the pet profile
2. Tap the status badge → select **"Reunited 🎉"**
3. A celebration banner appears: *"Great news — Mango has been reunited with their owner!"*

> **Close with:** "Pawlo connects neighbors and brings pets home. One registration, one photo, one tap."

---

## Key Metrics to Mention During Demo

| Metric | Value | When to mention |
|---|---|---|
| Registration time | ~2 minutes | After completing step 4 |
| Processing time | ~2.5 seconds | Processing animation |
| Pets in registry (demo) | 2,400+ | Stats strip on home |
| Neighborhoods covered | 180+ | Stats strip on home |
| Average reunion time | 4 hours | Stats strip on home |

---

## Common Questions & Answers

**Q: Is the photo matching real AI?**  
A: The current demo uses keyword + neighborhood matching as a placeholder. Production will use computer vision (pet face recognition + color/breed classification).

**Q: Where is the data stored?**  
A: Demo stores everything locally in the browser. Production will have a secure backend with user accounts and privacy controls.

**Q: Can anyone see my contact info?**  
A: In the demo, yes — it's intentionally open to show the flow. Production will have a messaging layer so owners never expose their personal contact details.

**Q: Does it work on Android?**  
A: Yes — it's a progressive web app. Works on any modern browser, iOS or Android. Can be added to the home screen.

---

## Timing Reference

```
0:00–0:30  Problem framing + home page
0:30–1:30  Register Mango (multi-step form)
1:30–1:50  Pet profile + status management
1:50–2:30  Found-pet report (upload + details)
2:30–2:50  Match results
2:50–3:10  Contact owner flow
3:10–3:20  Reunion (optional, if time allows)
```
