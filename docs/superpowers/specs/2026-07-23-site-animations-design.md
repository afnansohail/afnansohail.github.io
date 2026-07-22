# Site-wide animation pass (Motion)

## Purpose

Add polished, purposeful motion across the portfolio site — section entrances, hover/tap feedback, and navigation polish — using Motion (formerly Framer Motion). Keep every animation subtle, short, and consistent; avoid anything flashy, slow, or that risks regressing existing working interactions.

## Library

Install `motion` (current package name; `framer-motion` is the legacy name for the same library, now deprecated in favor of `motion`). Import from `motion/react`.

Rationale: every component in this codebase is a small presentational function with no existing imperative animation code. Motion's declarative props (`whileInView`, `whileHover`, `whileTap`, `layoutId`) map directly onto existing JSX with minimal restructuring. It also has built-in `prefers-reduced-motion` support via `MotionConfig`, so accessibility is handled once, globally, rather than per component.

## Global setup

- Wrap `App` in `<MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: EASE }}>`. This disables transform/layout animations automatically for users with OS-level reduced motion enabled (opacity-only fades still play), and gives every `motion` component the same default transition unless overridden.
- Add `src/lib/motion.ts` exporting the shared animation vocabulary so the site reads as one system:
  - `EASE = [0.16, 1, 0.3, 1]` — snappy ease-out-expo curve
  - `DURATION = 0.35`
  - `fadeUp` variant — `{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }`
  - `staggerContainer` variant — `{ visible: { transition: { staggerChildren: 0.08 } } }`
  - `viewport = { once: true, margin: "-80px 0px" }` — shared `whileInView` trigger config, used everywhere entrances are scroll-triggered

## Per-component plan

**Header** (`src/components/Header.tsx`)

- Fades/slides down once on initial mount (not scroll-triggered — it's sticky and visible from load).
- Nav links (`work` / `experience` / `say hi`) get a shared sliding-underline indicator via Motion `layoutId`, animating between links on hover instead of an instant color snap.
- Résumé link gets `whileHover={{ scale: 1.03 }}` / `whileTap={{ scale: 0.97 }}`.

**Hero** (`src/components/Hero.tsx`)

- Eyebrow → name → intro paragraph → CTA row reveal as one staggered sequence on mount, using `staggerContainer` + `fadeUp` on each child.
- Both CTAs get the same hover/tap scale treatment as the résumé button.

**Skills** (`src/components/Skills.tsx`)

- **Left as-is.** The existing drag-to-scroll marquee, pixel-measured seamless loop, pause-on-hover, and tooltip logic are hand-tuned and already working — reworking them onto Motion primitives (`useAnimationFrame`, native `drag`) was considered but rejected as not worth the regression risk for a purely cosmetic pass.
- Only addition: the section wrapper gets a simple one-time `whileInView` fade-in (`fadeUp`), consistent with other sections. No internal logic changes.

**Experience** (`src/components/Experience.tsx`)

- Each role row fades/rises in via `whileInView`, staggered slightly by index (via `staggerContainer` on the list wrapper) so rows cascade rather than pop in together.

**Projects** (`src/components/Projects.tsx`)

- The card grid uses `staggerContainer` so cards cascade in together on scroll.
- Each card's existing hover-lift (`hover:-translate-y-1` CSS) is replaced with a Motion `whileHover={{ y: -6 }}` spring transition — same visual distance, snappier feel.

**Contact** (`src/components/Contact.tsx`)

- Heading, email link, and social row cascade in via `whileInView` + `staggerContainer` on scroll.
- Email link and social links get a small hover polish: underline animates in via a `scaleX` transform rather than an instant border/color change.

## Accessibility & performance

- All animations only touch `opacity` and `transform` — no layout-triggering properties, GPU-friendly.
- `MotionConfig reducedMotion="user"` handles OS-level reduced-motion preference globally; no per-component checks needed.
- `viewport={{ once: true }}` on every scroll-triggered entrance — animations do not replay or accumulate cost on repeated scrolling.
- Durations stay short (~0.3–0.5s including stagger) so the site continues to feel fast, not slow or decorative.

## Explicitly out of scope

- No rework of Skills marquee internals (drag physics, loop measurement, tooltip positioning) — kept exactly as-is.
- No new UI elements (scroll-progress bar, mobile hamburger menu, page transitions) — none were requested and none are needed for this pass.
- No changes to `content.ts` copy or `index.css` design tokens beyond what's needed to support animation (e.g. removing the now-unused `marquee` keyframe is NOT included, since Skills keeps its current CSS-driven marquee).

## Testing

`npm run build` (`tsc -b` in strict mode) is the only automated check in this repo. After implementation, manually verify in the dev server: entrance animations on first scroll, hover/tap feedback on nav/buttons/cards, and that reduced-motion (OS setting) suppresses transform animations while keeping opacity fades.
