# Hero 3D Bracket — Design

## Purpose

Replace the flat, low-opacity `</>` background glyph in the Hero section
([src/components/Hero.tsx](../../../src/components/Hero.tsx) lines 12–33) with a real,
interactive 3D object — a `</>` bracket rendered in WebGL that tilts toward the cursor.

## Scope

- New component: `src/components/Hero3DBracket.tsx`.
- Layout change to `Hero.tsx`: two-column arrangement (text left, 3D canvas right) with a
  visible gap between them, instead of the current single-column layout with an absolutely
  positioned background glyph.
- New dependencies: `three`, `@react-three/fiber`.
- Repurpose the existing `options.showCodeMotif` toggle in `content.ts` to gate the new 3D
  object (no new option added).
- Out of scope: any other section of the site, the header logo (`<AfnanSohail/>` text, which
  is unrelated and stays as-is).

## The object

Built from primitive `three` geometries rather than extruded font text (avoids bundling a
typeface JSON):

- `<` and `>` chevrons: two angled boxes each, meeting at a point.
- `/`: one rotated box.
- Colors: chevrons in `--color-primary` (yellow), slash in `--color-secondary` (blue) —
  the two accent colors already used elsewhere in the theme.
- Material: `meshStandardMaterial` (picks up lighting instead of looking flat).
- Lighting: one soft ambient light + one directional light.
- Canvas background: transparent, so the object sits directly on the page background with no
  visible panel/box around it.
- Fully opaque (unlike the old glyph's low-opacity background treatment).

## Interaction

- Pointer position over the hero section drives a lerped tilt (rotation) of the object toward
  the cursor, clamped to a small rotation range — no full spin, no auto-rotation.
- Respects `prefers-reduced-motion: reduce` — object renders static (no tilt animation) for
  users who've requested less motion.

## Layout

`Hero.tsx` changes from a single flex column to a two-column layout:

- Left column: existing text content (eyebrow, name, intro, CTAs) — unchanged.
- Right column: `<Hero3DBracket />` in its own fixed-ish area, with explicit gap between the
  columns so the object never overlaps the text.
- Below the `lg` breakpoint, the right column (and the 3D canvas) is hidden entirely — mobile
  gets the text-only layout, no WebGL loaded.

## Dependencies & performance

- Adds `three` and `@react-three/fiber` as dependencies. No `@react-three/drei` — not needed
  for hand-built primitive geometry, keeps the added bundle weight smaller.
- Canvas only mounts at `lg`+ (via conditional rendering, not just CSS `hidden`, so mobile
  doesn't pay the WebGL init cost at all).

## Testing / verification

- `npm run build` must pass (`tsc -b` strict mode) with the new dependencies and component.
- Manual check in dev server: object renders, tilts with the mouse within the hero section,
  stays static under `prefers-reduced-motion`, and is hidden below the `lg` breakpoint.
