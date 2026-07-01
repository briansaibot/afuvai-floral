# Plan: Afuvai Floral Society — Round 3 Improvements

## Context
Afuvai Floral Society (afuvai.com) is a Las Vegas luxury floral brand. The site is being rebuilt with the existing Sage/Ivory/Gold palette. This round adds: a Bouqs-style product page, add-on photos, reordered parties page, bulk flowers page, collaborations + classes on home, footer nav fixes, hero overlap fix, and real business content from afuvai.com (fetches failed — content incorporated from known context + placeholders marked).

**Critical constraint: Do NOT change the existing design system, palette, or layout patterns. Only add/fix within the existing ecosystem.**

---

## File to modify
`src/app/App.tsx` — single-file SPA. All changes live here.

---

## 1. Fix: Hero text overlap on home page

**Problem:** The hero section (`<section className="relative min-h-screen flex items-end">`) starts at `top: 0` with no padding-top. The fixed nav is 64px tall + ~26px marquee = ~90px. The announcement pill is positioned at `pt-[80px]` which overlaps the nav on mobile, and the hero text near the bottom can clip on short viewports.

**Fix:**
- Change hero section to `min-h-[100dvh]` for dynamic viewport height
- Add `pt-[90px]` to the hero section itself so content isn't hidden under the nav
- Give the announcement pill `top-[90px]` instead of `pt-[80px]`
- On mobile (`clamp` floor is 3rem ≈ 48px), the h1 is fine, but add `pb-safe` padding at bottom

---

## 2. Fix: Footer navigation links not working

**Problem:** The footer uses `navigate(target as Page)` correctly but "All Arrangements" maps to `"home"` — if already on home, nothing visible happens. Also, some links are conceptually wrong (e.g., "Bulk Orders" doesn't exist yet).

**Fix:**
- "All Arrangements" → `navigate("home")` then after 100ms `document.getElementById("collections")?.scrollIntoView()` — use a helper `goToSection(page, id)`
- Add `"bulk"` page to Page type and footer Shop column
- Add `"classes"` page to the footer Company column
- Collaborations → scroll to a new `#collaborations` section on home
- All existing `navigate()` calls in footer are actually correct — the user's perception of "not working" is likely because navigating to "home" when already on home doesn't visibly change anything. The fix is using `goToSection` for anchor-based destinations.

---

## 3. Product Page — Bouqs-style redesign

**Reference image shows:**
- "PURCHASING OPTIONS" header
- Subscribe toggle first (prominent, with "Best Value: Save up to 30%", "Flat Plan", "No Obligations" bullet points)
- One-time purchase as secondary option
- "Most Popular Size" badge on the middle size option
- Size pills shown for both subscribe and one-time options
- Pricing shown per size per option
- Add-ons below with photos

**Changes to ProductPage component:**

### a. Reorder right panel
New order (top to bottom):
1. Product name, category, description
2. **PURCHASING OPTIONS** — two-tab toggle: "Subscribe & Save" | "One-Time Purchase"
   - Subscribe tab: shows savings %, bullet points (Best Value / Flexible Schedule / No Obligations), size selection with subscribe price
   - One-time tab: shows regular price, size selection
3. Size selection (3 pills with "Most Popular" badge on Standard)
4. Delivery date
5. Zip code
6. Gift note
7. Add-ons **with photos**
8. Total + CTA button

### b. Add-on images
Add `img` field to `ADDONS` array using existing Unsplash stock images:
```
{ id: "vase",      img: MIXED_VASE,     label: "Premium Glass Vase",    price: 28 }
{ id: "choc",      img: GARDEN_MIX,     label: "Artisan Chocolates",    price: 22 }  // warm earthy tones
{ id: "card",      img: PETAL_MACRO,    label: "Handwritten Note Card", price: 8  }
{ id: "preserved", img: ROSE_IMG,       label: "Preserved Rose Add-on", price: 35 }
```

Each add-on renders as: thumbnail (48×48 square image) | label | price toggle checkbox — instead of current plain text row.

### c. Subscribe section styling
Render the subscribe section as a distinct bordered panel (gold border when selected, same sage accent) with:
- "✦ Subscribe & Save 15%" headline
- Three bullet points: "Best Value — save on every delivery", "Flexible — choose your schedule", "No Obligations — cancel anytime"
- Prominent price diff shown

---

## 4. Parties Page — reorder form vs details

**Problem:** The inquiry form appears before the experience cards. Users should see what's available first, then inquire.

**New order:**
1. Hero (keep)
2. Experience cards grid ("Choose your experience") — moved up
3. FAQ accordion — moved up
4. Inquiry form — moved to bottom with headline "Ready to book? Tell us about your event"
5. Contact CTA strip (keep at bottom)

---

## 5. New Page: Bulk Flowers ("bulk")

**Add `"bulk"` to Page type and NAV (under a "Shop" dropdown or standalone). Add to footer Shop column.**

**Page structure:**
- Hero: full-bleed `ORCHID_DARK` image, headline "Flowers in Bulk — for makers, events & trade"
- Who it's for: 4-up grid — Event Planners, Restaurants & Hotels, DIY Brides, Floral Studios
- How it works: 3 steps (Inquiry → Curated Quote → Delivery)
- What we supply: stem types, greenery, arrangements by the dozen
- Minimums: Starting at 25 stems · Lead time 48–72 hrs · Custom palettes available
- Inquiry form: name, email, phone, occasion, stem count, preferred date, notes
- No storefront — Las Vegas Valley delivery only

---

## 6. New: Collaborations & Classes section on Home

**Add two new sections to the top of HomeP age, right after the trust badge strip and before the occasion filter:**

### a. Collaborations strip
A horizontal scrollable row of partner brands/venues (The Venetian, Wynn, Four Seasons, local brands). Minimal — logo placeholder with name, linked to Portfolio filtered by Corporate.

### b. Classes teaser section
A full-width editorial section:
- Label: "Learn · Create · Connect"
- Heading: "Floral Design Classes"
- Body: "Join AmiDayne for intimate hands-on workshops — learn the language of flowers in a beautifully styled setting."
- Subtext: In-studio and private group sessions available · Las Vegas, NV
- CTA: "View Classes" → navigate to `"classes"` page
- Image: `WORKSHOP_IMG` on the right

**Add `"classes"` to Page type.** New page structure:
- Hero with `WORKSHOP_IMG`
- Class types: Beginner Bouquet ($85/person), Seasonal Design ($110/person), Advanced Arrangement ($145/person), Private Group (custom)
- Each class: image, title, duration, price, description, "Book Your Spot" CTA
- Form: name, email, phone, class interest, date, group size

---

## 7. Incorporate afuvai.com content

afuvai.com was unreachable (ECONNREFUSED). Content incorporated from known context:
- Business name: Afuvai Floral Society / Afuvai Society
- Tagline: "Floral Design · VIP Experiences" (from logo)
- Founder: AmiDayne Nelsen
- Location: Las Vegas, NV — delivery only
- Email: admin@afuvai.com
- Hours: 9am–5pm daily
- Social: @afuvaifloral (Instagram)

**Action:** Placeholder copy already reflects these. Once afuvai.com is accessible, swap in real testimonials, real class names, and real collaboration partners.

---

## 8. Add "classes" page to NAV_LINKS and nav

Add to `NAV_LINKS`:
```
{ label: "Classes", page: "classes" }
```

Add to mobile menu and footer Company column.

---

## Implementation Notes

- **No design changes**: Keep all color constants (SAGE, GOLD, IVORY), SectionHead component, FaqBlock, typography, spacing patterns exactly as-is.
- **New page type**: Extend `type Page = ... | "bulk" | "classes"`
- **goToSection helper**: `const goToSection = (p: Page, id: string) => { navigate(p); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150); }`
- **Product page**: Keep existing state variables, just reorder JSX and upgrade add-on rendering.
- **Add-on images**: Use 48×48 `object-cover` thumbnails, rounded-sm, inside the add-on label rows.

---

## Verification
- Click footer "All Arrangements" → lands on home and scrolls to #collections
- Click "Bulk Orders" → opens bulk page
- Product page: subscribe tab shows 15% savings, one-time tab shows full price
- Add-on rows show thumbnail images
- Parties page: experience cards appear before the inquiry form
- Home page: no text cutoff on mobile (375px width)
- Classes link in nav and home section both open classes page


## Context
Business: **Afuvai Floral Society** — Las Vegas, delivery-only luxury florist.
Services: arrangements, weddings/events, subscriptions, hosted floral parties (public & private).
Palette: Sage `#5A6B54` · Ivory `#FAF8F3` · Gold `#B8995A`.
Photos: placeholder Unsplash until client provides real assets.

## Files
- `src/app/App.tsx` — all changes
- `src/styles/theme.css` — palette tokens
- `src/styles/fonts.css` — no changes

## Palette
| Constant | Value |
|---|---|
| SAGE | #5A6B54 |
| GOLD | #B8995A |
| IVORY | #FAF8F3 |
| CARD | #EEEADC |
| INK | #1A1A14 |
| MUTED | #6B6B58 |
| BORDER | rgba(90,107,84,0.2) |

## Sections / Pages (tab-based SPA routing via React state)

### Main page
1. Marquee announcement bar — slow scroll, pauses on hover
2. Fixed nav — logo left, links center, icons right; full-screen mobile overlay
3. Hero — split canvas: sage left with text, image right
4. Trust badges row — 4 icons: Sustainably Sourced, Same-Day LV Delivery, Bespoke Design, 4.9★
5. Occasion filter + collections grid (unchanged structure, new palette)
6. "As Featured At" venue strip — Bellagio, Wynn, Venetian, Four Seasons, MGM Grand
7. How It Works — 3-step numbered editorial
8. Studio / About section
9. Floral Parties teaser — links to Parties page
10. Weddings section
11. Subscriptions tier selector
12. Testimonials
13. Instagram grid
14. Newsletter — sage background
15. Footer — LV delivery-only note

### Parties page (new)
- Quick inquiry form: name, email, phone, event type (public/private), guest count, date, occasion, notes — submits with success toast
- Detailed experience breakdown below: Bouquet Bar, Floral Crown Bar, Arrangement Workshop, Private Dinner Florals, Bachelorette Pop-Up, Birthday Party
- Each experience: name, description, starting price, ideal group size, duration
- FAQ accordion at bottom

### Additional UX upgrades
- Product quick-view modal (click card → modal with larger image + add to cart)
- Floating "Book a Party" CTA button (appears after scroll, links to Parties page)
- Full-screen mobile nav overlay
- Staggered scroll-reveal animations on section entry
- Cart drawer with quantity controls (existing, keep)
- Las Vegas copy throughout
