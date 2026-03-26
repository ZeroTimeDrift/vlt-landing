# Waitlist Conversion Audit — vlt.money
**Date:** 2026-03-26
**Task:** VAU-813
**Current count:** 5 signups | **Goal:** 100 by April 30

---

## Summary

63 blog posts live. Zero meaningful conversions. The funnel has three specific breaks — in priority order:

---

## Issue 1 — CRITICAL: Fake Social Proof

### What's broken

`client-home.tsx:372–374` hardcodes `+1,200 people already on the waitlist`. Real count from `/api/waitlist/count` is **5**. The `SocialProofStrip` component never fetches the API — the number is static.

```tsx
// Line 372–374 in client-home.tsx — HARDCODED
<><span style={{ color: "#FFFFFF" }}>+1,200</span> people already on the waitlist</>
```

### Why this matters

For a fintech product pursuing ADGM regulation, fake social proof is a credibility and trust issue. UAE expat professionals are the target audience — they will notice. Post-signup, the user sees "You're in — along with 1,200+ others" while the real count is 5. This erodes trust exactly at the moment of conversion.

### Fix

Extract `SocialProofStrip` to call `GET /api/waitlist/count` client-side on mount. If count < 50, render nothing. If ≥ 50, render real number.

**Engineer notes:**
- Add `useEffect` in `SocialProofStrip` to fetch `/api/waitlist/count`
- Store in local state, default to `null`
- `if (count === null || count < 50) return null`
- Otherwise render `+{count.toLocaleString()} people already on the waitlist`
- Same for the success state ("along with X+ others")

---

## Issue 2 — HIGH: Blog CTAs Redirect Users Off the Page

### What's broken

Both conversion touchpoints in blog posts link to `/#waitlist` (homepage):

1. **Mobile sticky bar** — `MobileStickyCtaBar.tsx:52` → `href="/#waitlist"`
2. **Bottom CTA card** — `page.tsx:219` → `href="/#waitlist"`

When a user clicks either CTA from `/blog/[slug]`, they navigate away entirely. This:
- Loses reading context (the specific article that convinced them)
- Adds a second barrier (find the form again on homepage)
- Breaks the conversion moment — they were ready to sign up, then got sent somewhere else

### Fix

Extract `WaitlistForm` from `client-home.tsx` into a shared component at `components/WaitlistForm.tsx`. Embed it inline in the blog post bottom CTA card.

**Engineer notes:**

1. Move `WaitlistForm` component (lines 250–332 in `client-home.tsx`) to `app/_components/WaitlistForm.tsx` — export as default
2. Import in `client-home.tsx` (no change to landing page)
3. Import in `blog/[slug]/page.tsx` — convert bottom CTA section to a `"use client"` component (or extract as a client island)
4. Replace the `<a href="/#waitlist">Get Early Access</a>` button in the bottom CTA card with `<WaitlistForm id="blog-bottom" />`
5. Update `MobileStickyCtaBar` to scroll to the inline form via `href="#cta-form"` instead of `/#waitlist`
6. Add `id="cta-form"` to the bottom CTA `<div>` in `page.tsx`

**Bottom CTA layout after fix:**

```
[Card — full width, background: rgba(0,102,255,0.03), border: rgba(0,102,255,0.10), border-radius: 20px, padding: 32px]
  "READY TO EARN MORE?" [overline — #9CA3AF, 10px, uppercase, tracked]
  "Put your savings to work." [headline — #FFFFFF, 17px, bold]
  "Join the waitlist..." [subtext — #9CA3AF, 14px]
  [WaitlistForm inline — email input + "Get Early Access" button, max-width: 400px, centered]
```

---

## Issue 3 — MEDIUM: No Mid-Article or Blog Index CTA

### What's broken

**Blog posts (desktop):** No persistent conversion prompt between the top nav CTA and the bottom card. The mobile sticky bar doesn't render on desktop (`md:hidden`). Desktop readers who leave mid-article (the majority) see no prompt.

**Blog index page:** The `/blog` page has a hero "Get Early Access" button that links to `/#waitlist`. No inline form. Users browsing the blog who don't click into a post have one chance to convert — a single button that sends them to homepage.

### Fix A — Mid-article compact callout

Add a compact inline CTA card rendered after the article body, before the related posts section. Not a full form — just a rate teaser + scroll-to-form button.

**Design spec:**
```
[Compact callout — full width, height ~56px, border-radius: 16px]
background: rgba(0,102,255,0.05)
border: 1px solid rgba(0,102,255,0.10)
padding: 0 24px

Left:  "Vault earns ~5.4% on your savings." [#FFFFFF, 14px, font-semibold]
Right: [Button — "Get Early Access" → href="#cta-form", btn-accent style, 12px, rounded-2xl]
```

Place in `page.tsx` immediately after `</article>` and before the related posts section. This ensures desktop readers who stop at ~50-70% scroll still see a conversion prompt.

### Fix B — Blog index inline form

On `/blog/page.tsx`, embed `WaitlistForm` directly below the hero section, above the post grid. Replace the "Get Early Access" button in the blog hero with the inline form.

**Design spec:**
```
[Section — py-6, max-width: 480px, centered]
  "Start earning ~5.4% on your savings. Join the waitlist." [#9CA3AF, 14px]
  [WaitlistForm id="blog-index" — compact=true]
```

---

## Implementation Priority

| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 1 | Fix fake social proof (connect to real API or hide) | Critical | Low (~30 min) |
| 2 | Extract WaitlistForm, embed inline in blog bottom CTA + sticky bar anchor | High | Medium (~2h) |
| 3a | Mid-article compact callout (desktop) | Medium | Low (~30 min) |
| 3b | Blog index inline form | Medium | Low (~20 min) |

---

## Design Tokens (all existing, no new tokens needed)

- Background: `rgba(0,102,255,0.05)` / `rgba(0,102,255,0.03)`
- Border: `rgba(0,102,255,0.10)`
- Button: `btn-accent` class (existing)
- Border radius: 20px cards, 16px compact callout, 2xl buttons
- Typography: Inter, all existing vault text classes
