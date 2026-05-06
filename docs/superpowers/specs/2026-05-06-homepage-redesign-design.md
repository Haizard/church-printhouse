# Homepage Redesign Design

## Goal

Redesign the homepage into a premium ministry landing page with a classic-modern feel. The page should lead with church identity and atmosphere first, make stronger use of local photography, and avoid placing `events`, `sermons`, and `blog` as repetitive back-to-back content blocks.

## Design Direction

The chosen direction is `Modern Premium Ministry` with a `Church Identity First` content strategy.

The experience should feel:

- Cinematic rather than purely informational
- Elegant and editorial rather than card-heavy
- Warm, reverent, and polished rather than generic SaaS-like
- Rich with church photography from `src/images`

## Homepage Structure

### 1. Hero

A full-height cinematic hero remains at the top, but it should become more premium:

- stronger layered overlay and improved text contrast
- cleaner spacing and tighter type hierarchy
- supporting copy that feels more editorial
- clearer primary and secondary actions
- local photography only

### 2. Mission Band

Immediately after the hero, keep a concise mission section, but style it as a refined identity band instead of a plain three-card strip.

It should:

- communicate the church’s three core themes
- use softer glass or panel treatment
- feel connected to the hero rather than like a separate generic card grid

### 3. Identity / About Section With Image Background

This becomes the first major story section and should carry the homepage’s identity-first strategy.

It should include:

- a full-width or boxed background image using a local church photo
- a text panel describing the church’s calling, atmosphere, and spiritual vision
- one or two supporting actions such as `Kuhusu` and `Mawasiliano`

This section should feel stately and immersive.

### 4. Featured Events

Events should appear before sermons and blog because they are the clearest participation entry point after identity.

The section should:

- keep upcoming events visible
- use a distinct background from the previous section
- avoid feeling like the same carousel pattern repeated from other content areas

Preferred direction:

- either a refined horizontal event rail or a staggered editorial card layout

### 5. Worship / Scripture Highlight Section

Insert a non-content section after events so the homepage rhythm breaks away from content stacking.

This section should:

- use a strong local background image
- feature scripture, worship language, or a spiritual invitation
- act as an emotional pause between event content and media content

This is one of the key sections that gives the homepage a premium narrative flow.

### 6. Recent Sermons

Sermons should appear after the spiritual highlight section, not directly after events.

The section should:

- feel media-rich
- include stronger imagery and cleaner card composition
- remain easy to scan without dominating the homepage

### 7. Community Photography Section

Add a dedicated image-led section using local photography from `src/images`.

This section can function as:

- a gallery mosaic
- a split editorial image layout
- or a story-driven photography strip with supporting text

Its job is to make the homepage feel alive, local, and visually full.

### 8. Blog Section

Blog should appear later in the homepage so it feels like secondary reading rather than a primary conversion step.

The section should:

- be visually distinct from sermons and events
- show fewer but better-presented entries
- feel like reflective reading rather than another repeated content slider

### 9. Final CTA Band

The closing CTA should remain, but be restyled to match the new premium system:

- deeper contrast
- stronger typography
- cleaner button treatment
- potentially a subtle image or texture layer

## Visual System

### Typography

Keep the general serif-plus-sans direction, but increase sophistication through scale, rhythm, and hierarchy.

- Headlines: continue using the serif display feel for authority and elegance
- Body: keep the readable sans, but tighten spacing and weight choices
- Section labels: use refined uppercase editorial kicker styling

The page should feel more like a premium editorial site and less like a starter-template church site.

### Background Strategy

Each major section should have a deliberate visual identity.

Target mix:

- some sections with soft cream or stone-tinted backgrounds
- some with green-toned gradients
- some with full-bleed or framed photography backgrounds
- some with clean light surfaces to give the eye a rest

The backgrounds should alternate thoughtfully so the page feels composed rather than monotonous.

### Imagery

Use local images from `src/images` throughout the homepage, not only in the hero.

Images should be used in three ways:

- hero slides
- background-image sections
- editorial cards, mosaics, and split-image layouts

Priority should be given to photos that communicate worship, people, church life, and sacred atmosphere.

### Components

The redesign should reduce repetition in section patterns.

Instead of every content area feeling like the same carousel block, the page should mix:

- image-background sections
- editorial split layouts
- premium cards
- gallery or mosaic layouts
- occasional carousels only where they genuinely help

## Content and Data Use

The homepage should continue using live Firestore data for:

- sermons
- events
- blog posts

However, the layout should gracefully handle sparse datasets. If content is limited, the design should still look intentional.

## Responsive Behavior

The redesign must work well on both desktop and mobile.

On mobile:

- stacked layouts should remain elegant
- image sections should preserve impact without becoming too tall
- text blocks should remain readable
- carousels and cards should still be touch-friendly

## Risks and Constraints

### Risk: Overusing Carousels

The current homepage already leans heavily on repeated carousel sections. The redesign should intentionally reduce that repetition.

### Risk: Too Many Images Without Hierarchy

Because the homepage will use more local photography, image choice and section contrast must stay disciplined so the page still feels premium rather than busy.

### Risk: Live Data Inconsistency

Sermons, events, and blog images may vary in quality or availability. The design should still remain visually stable when records are incomplete.

## Testing Strategy

Implementation should verify:

- hero remains visible and full-height
- local images render correctly across the new sections
- homepage section order matches the approved narrative
- desktop and mobile layouts both feel intentional
- no major visual regressions occur when live Firestore content is missing or limited

## Recommended Implementation Scope

This redesign should be implemented primarily in:

- `src/app/page.tsx`
- `src/app/globals.css`

Small supporting changes are acceptable if needed, but the goal is to keep the redesign focused and not expand into unrelated refactors.
