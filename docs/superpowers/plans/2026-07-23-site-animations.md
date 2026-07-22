# Site-Wide Animation Pass (Motion) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle, consistent Motion-powered animations (section entrances, hover/tap feedback, nav polish) across the six presentational components of this portfolio site, without touching the Skills marquee's internal drag/loop logic.

**Architecture:** A single shared animation vocabulary (`src/lib/motion.ts`: shared ease, duration, and two `Variants` objects) is consumed by every component via `motion.*` elements and `whileInView`/`whileHover`/`whileTap` props. `App.tsx` wraps the tree in `MotionConfig` once, giving every animation the same default transition and automatic `prefers-reduced-motion` handling.

**Tech Stack:** React 19, TypeScript (strict, via `tsc -b`), Vite, Tailwind CSS v4, `motion` (npm package, imported as `motion/react` — the current name for what was previously published as `framer-motion`).

## Global Constraints

- No test suite or linter exists in this repo. The only automated check is `npm run build` (`tsc -b` + `vite build`). Every task's verification step is: (1) `npm run build` passes with no type errors, (2) a manual check in the running dev server (`npm run dev`), per this repo's CLAUDE.md requirement to verify UI changes in a browser before calling them done.
- Every piece of copy already lives in `src/content.ts` — no task in this plan changes any copy or adds new strings.
- Components remain prop-less default-export functions pulling from `content.ts`, per the existing convention — animation state (e.g. hovered nav index) is local `useState`, not lifted.
- Animations only touch `opacity`/`transform` — never properties that trigger layout reflow.
- The Skills component's drag-to-scroll marquee, pixel-measured loop distance, pause-on-hover, and tooltip logic are **not modified** — only the outer `<section>` wrapper gains an entrance animation.
- Durations stay short: single-element transitions ~0.25–0.4s, full-page stagger sequences ~0.3–0.5s total.

---

### Task 1: Install Motion and add shared animation primitives

**Files:**

- Modify: `package.json` (add `motion` dependency)
- Create: `src/lib/motion.ts`
- Modify: `src/App.tsx`

**Interfaces:**

- Produces (consumed by every later task): from `src/lib/motion.ts` —
  - `EASE: [number, number, number, number]`
  - `DURATION: number`
  - `fadeUp: Variants` — variant labels `"hidden"` and `"visible"`, animating `opacity` and `y`
  - `staggerContainer: Variants` — variant labels `"hidden"` and `"visible"`, staggers children by `0.08`s
  - `viewport: { once: true; margin: string }` — shared `whileInView`/`viewport` config object

- [ ] **Step 1: Install the `motion` package**

Run:

```bash
npm install motion
```

Expected: `package.json` gains a `"motion": "^..."` entry under `dependencies`, `package-lock.json` updates, install completes with no errors.

- [ ] **Step 2: Create `src/lib/motion.ts`**

```ts
import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DURATION = 0.35;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const viewport = { once: true, margin: "-80px 0px" };
```

- [ ] **Step 3: Wrap `App` in `MotionConfig`**

Replace the full contents of `src/App.tsx` with:

```tsx
import { MotionConfig } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { DURATION, EASE } from "./lib/motion";

export default function App() {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION, ease: EASE }}
    >
      <div className="relative min-h-screen">
        <div className="flex flex-col" style={{ minHeight: "100dvh" }}>
          <Header />
          <Hero />
        </div>
        <main>
          <Skills />
          <Experience />
          <Projects />
        </main>
        <Contact />
      </div>
    </MotionConfig>
  );
}
```

- [ ] **Step 4: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors. (The site's visual output is unchanged at this point — `MotionConfig` only sets defaults, no component uses `motion.*` elements yet.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/motion.ts src/App.tsx
git commit -m "Add Motion library and shared animation primitives"
```

---

### Task 2: Header entrance, hover-underline nav, and button feedback

**Files:**

- Modify: `src/components/Header.tsx`

**Interfaces:**

- Consumes: none from other components (uses `motion` directly, not the shared variants, since the header animates once on mount rather than on scroll).

- [ ] **Step 1: Replace the full contents of `src/components/Header.tsx`**

```tsx
import { useState } from "react";
import { motion } from "motion/react";
import { content } from "../content";

const NAV_LINKS = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "say hi" },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/6 bg-bg/72 backdrop-blur-[10px]"
      style={{
        padding: "18px clamp(20px,5vw,64px)",
      }}
    >
      <div
        className="font-mono text-ink"
        style={{ fontSize: 14, letterSpacing: "0.04em" }}
      >
        <span className="text-primary">&lt;</span>
        {content.initials}
        <span className="text-primary">/&gt;</span>
      </div>

      <nav
        className="flex font-mono"
        style={{
          gap: "clamp(14px,2.5vw,32px)",
          fontSize: 13,
          letterSpacing: "0.02em",
          color: "oklch(0.66 0.01 250)",
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="relative transition-colors hover:text-ink"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            {link.label}
            {hoveredIndex === i && (
              <motion.span
                layoutId="nav-underline"
                className="absolute right-0 left-0 h-px bg-primary"
                style={{ bottom: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </a>
        ))}
      </nav>

      <motion.a
        href="/docs/Afnan%20Sohail%20-%20Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full border border-primary font-mono text-primary transition-colors hover:bg-primary hover:text-black"
        style={{ fontSize: 13, padding: "8px 16px" }}
      >
        grab my résumé ↓
      </motion.a>
    </motion.header>
  );
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Manually verify in the browser**

Run:

```bash
npm run dev
```

Open the printed local URL and confirm:

- On page load, the header fades/slides down from slightly above.
- Hovering across `work` / `experience` / `say hi` shows a yellow underline that glides smoothly from one link to the next (not an instant jump), and disappears when the mouse leaves the nav.
- Hovering/clicking the résumé button scales it up slightly on hover and down slightly on click, in addition to its existing color change.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "Animate header entrance, nav hover indicator, and resume button"
```

---

### Task 3: Hero staggered reveal and CTA feedback

**Files:**

- Modify: `src/components/Hero.tsx`

**Interfaces:**

- Consumes: `fadeUp`, `staggerContainer` from `src/lib/motion.ts` (Task 1). Hero triggers them with `animate="visible"` on mount rather than `whileInView`, since it's the first thing visible on load — the `viewport` config from Task 1 is not used here (nothing to scroll into view), but the same variant objects are reused so the motion values stay identical to every other section.

- [ ] **Step 1: Replace the full contents of `src/components/Hero.tsx`**

```tsx
import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Hero() {
  return (
    <section
      className="relative mx-auto flex w-full flex-1 flex-col justify-center"
      style={{
        padding: "clamp(28px,5vw,56px) clamp(20px,5vw,64px)",
        maxWidth: 1280,
      }}
    >
      {/* code motif: dot-grid + oversized glyph (decorative) */}
      {options.showCodeMotif && (
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="select-none font-mono text-primary/8"
            style={{
              position: "absolute",
              right: "clamp(-40px,-2vw,-20px)",
              top: "50%",
              transform: "translateY(-50%)",
              fontWeight: 500,
              fontSize: "clamp(180px,30vw,420px)",
              lineHeight: 0.8,
            }}
          >
            &lt;/&gt;
          </div>
        </div>
      )}

      <motion.div
        className="relative flex flex-col"
        style={{ gap: "clamp(20px,3vw,34px)", maxWidth: 900 }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="font-mono uppercase text-secondary"
          style={{
            fontSize: "clamp(12px,1.4vw,14px)",
            letterSpacing: "0.22em",
          }}
        >
          {content.eyebrow}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(52px,11vw,132px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textWrap: "balance",
          }}
        >
          {content.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(18px,2.4vw,28px)",
            lineHeight: 1.4,
            maxWidth: 660,
            color: "oklch(0.82 0.008 250)",
            textWrap: "pretty",
          }}
        >
          {content.intro.lead}
          <span className="text-primary" style={{ fontWeight: 600 }}>
            {content.intro.highlight}
          </span>
          {content.intro.tail}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap"
          style={{ gap: 14, marginTop: 8 }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-primary font-mono text-black transition-colors hover:text-black"
            style={{ fontSize: 15, fontWeight: 500, padding: "15px 28px" }}
          >
            Check out my work →
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/18 font-mono text-ink transition-colors hover:border-secondary hover:text-secondary"
            style={{ fontSize: 15, padding: "15px 28px" }}
          >
            Let's chat
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Manually verify in the browser**

With `npm run dev` running, reload the page and confirm:

- The eyebrow, name, intro paragraph, and CTA row fade/rise in sequence (a quick cascade, not simultaneous, not sluggish).
- Hovering/clicking either CTA button scales it up/down like the header's résumé button.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "Add staggered entrance animation to Hero section"
```

---

### Task 4: Skills section entrance wrapper (no internal changes)

**Files:**

- Modify: `src/components/Skills.tsx`

**Interfaces:**

- Consumes: `fadeUp`, `viewport` from `src/lib/motion.ts` (Task 1).

- [ ] **Step 1: Add the `motion` import**

In `src/components/Skills.tsx`, add to the top of the import block (after the existing `react` import, before the `content` import):

```ts
import { motion } from "motion/react";
```

and add a second import line for the shared variants:

```ts
import { fadeUp, viewport } from "../lib/motion";
```

- [ ] **Step 2: Change the outer `<section>` to an animated `motion.section`**

Find this block near the end of the file (the component's `return` statement):

```tsx
  return (
    <section
      className="bg-panel"
      style={{ borderBlock: "1px solid rgba(255,255,255,0.07)" }}
    >
```

Replace it with:

```tsx
  return (
    <motion.section
      className="bg-panel"
      style={{ borderBlock: "1px solid rgba(255,255,255,0.07)" }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
```

Then find the matching closing tag at the very end of the returned JSX:

```tsx
    </section>
  );
}
```

Replace it with:

```tsx
    </motion.section>
  );
}
```

Do not change anything else in this file — the marquee, drag handlers, tooltip, and loop-distance measurement logic stay exactly as they are.

- [ ] **Step 3: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Manually verify in the browser**

With `npm run dev` running, scroll down to the skills row and confirm:

- The whole section fades/rises in once as it enters the viewport.
- Dragging the icon row, hovering an icon (tooltip + pause), and the continuous marquee loop all behave exactly as before — no regressions.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "Add scroll entrance animation to Skills section wrapper"
```

---

### Task 5: Experience section staggered row reveal

**Files:**

- Modify: `src/components/Experience.tsx`

**Interfaces:**

- Consumes: `fadeUp`, `staggerContainer`, `viewport` from `src/lib/motion.ts` (Task 1).

- [ ] **Step 1: Replace the full contents of `src/components/Experience.tsx`**

```tsx
import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer, viewport } from "../lib/motion";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "clamp(64px,9vw,128px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        className="flex items-baseline"
        style={{ gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}
      >
        {options.sectionNumbers && (
          <span
            className="font-display text-secondary"
            style={{
              fontWeight: 800,
              fontSize: "clamp(40px,6vw,76px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            02
          </span>
        )}
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(30px,5vw,60px)",
            letterSpacing: "-0.02em",
          }}
        >
          The journey so far
        </h2>
      </div>

      <motion.div
        className="flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {content.roles.map((role, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="border-t border-white/9 transition-colors hover:bg-white/1.5"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px,180px) 1fr",
              gap: "clamp(16px,4vw,56px)",
              padding: "clamp(24px,3vw,36px) 0",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 14,
                color: "oklch(0.62 0.01 250)",
                paddingTop: 6,
              }}
            >
              {role.years}
            </div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              <div
                className="flex flex-wrap items-baseline"
                style={{ gap: "8px 14px" }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(22px,2.8vw,32px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {role.title}
                </h3>
                <span
                  className="text-primary"
                  style={{ fontSize: 17, fontWeight: 500 }}
                >
                  {role.company}
                </span>
              </div>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "oklch(0.78 0.008 250)",
                  maxWidth: 640,
                  textWrap: "pretty",
                }}
              >
                {role.impact}
              </p>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-white/9" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Manually verify in the browser**

With `npm run dev` running, scroll to the "journey so far" section and confirm the role rows cascade in one after another (a quick stagger, not a single simultaneous pop), and that scrolling back up and down again does not replay the animation.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "Add staggered row entrance animation to Experience section"
```

---

### Task 6: Projects grid staggered reveal and card hover lift

**Files:**

- Modify: `src/components/Projects.tsx`

**Interfaces:**

- Consumes: `fadeUp`, `staggerContainer`, `viewport` from `src/lib/motion.ts` (Task 1).

- [ ] **Step 1: Replace the full contents of `src/components/Projects.tsx`**

```tsx
import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer, viewport } from "../lib/motion";

export default function Projects() {
  return (
    <section
      id="work"
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "0 clamp(20px,5vw,64px) clamp(64px,9vw,128px)",
      }}
    >
      <div
        className="flex items-baseline"
        style={{ gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}
      >
        {options.sectionNumbers && (
          <span
            className="font-display text-secondary"
            style={{
              fontWeight: 800,
              fontSize: "clamp(40px,6vw,76px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            03
          </span>
        )}
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(30px,5vw,60px)",
            letterSpacing: "-0.02em",
          }}
        >
          Stuff I've built
        </h2>
      </div>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(18px,2.5vw,28px)",
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {content.projects.map((p) => {
          const CardTag = p.link ? motion.a : motion.div;
          return (
            <CardTag
              key={p.no}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              {...(p.link
                ? { href: p.link, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex flex-col overflow-hidden rounded-[18px] border border-white/9 bg-panel transition-colors hover:border-primary/60"
              style={p.link ? { cursor: "pointer" } : undefined}
            >
              {p.image ? (
                <div
                  className="relative overflow-hidden border-b border-white/9"
                  style={{ aspectRatio: "16 / 11" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="stripes relative flex items-center justify-center border-b border-white/9"
                  style={{ aspectRatio: "16 / 11" }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontWeight: 800,
                      fontSize: 88,
                      color: "rgba(255,255,255,0.06)",
                      lineHeight: 1,
                    }}
                  >
                    {p.no}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 14,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "oklch(0.55 0.01 250)",
                    }}
                  >
                    [ project shot ]
                  </span>
                </div>
              )}

              <div
                className="flex flex-col"
                style={{ gap: 14, padding: "clamp(20px,2.5vw,28px)" }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(22px,2.6vw,28px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "oklch(0.78 0.008 250)",
                    textWrap: "pretty",
                  }}
                >
                  {p.desc}
                </p>

                <div
                  className="flex flex-wrap"
                  style={{ gap: 8, marginTop: 2 }}
                >
                  {p.stack.map((t, i) => (
                    <span
                      key={i}
                      className="font-mono"
                      style={{
                        fontSize: 12,
                        color: "oklch(0.82 0.008 250)",
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </CardTag>
          );
        })}
      </motion.div>

      <p
        className="font-mono"
        style={{
          marginTop: "clamp(20px,3vw,32px)",
          fontSize: 13,
          color: "oklch(0.55 0.01 250)",
        }}
      >
        {content.projectsPrivacyNote}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Manually verify in the browser**

With `npm run dev` running, scroll to "Stuff I've built" and confirm:

- The project cards cascade in together as the grid enters the viewport (not one-by-one down the page — they're siblings in one grid, so the stagger is fast/simultaneous-feeling).
- Hovering a card lifts it with a slightly springy feel (vs. the previous linear CSS transition), and the border-color hover still works.
- Cards that link out still open in a new tab; cards without a link are still plain (non-clickable) divs.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "Add staggered grid entrance and spring hover lift to Projects section"
```

---

### Task 7: Contact section staggered reveal and link underline hover

**Files:**

- Modify: `src/components/Contact.tsx`

**Interfaces:**

- Consumes: `fadeUp`, `staggerContainer`, `viewport` from `src/lib/motion.ts` (Task 1).

- [ ] **Step 1: Replace the full contents of `src/components/Contact.tsx`**

```tsx
import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer, viewport } from "../lib/motion";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/8 bg-panel-deep"
    >
      <motion.div
        className="relative mx-auto flex flex-col"
        style={{
          maxWidth: 1280,
          padding: "clamp(64px,9vw,120px) clamp(20px,5vw,64px)",
          gap: "clamp(28px,4vw,44px)",
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div
          variants={fadeUp}
          className="flex items-baseline"
          style={{ gap: 20 }}
        >
          {options.sectionNumbers && (
            <span
              className="font-display text-secondary"
              style={{
                fontWeight: 800,
                fontSize: "clamp(40px,6vw,76px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              04
            </span>
          )}
          <h2
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "clamp(22px,4.2vw,56px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Let's build something awesome
          </h2>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={`mailto:${content.email}`}
          className="group relative w-fit font-display text-primary"
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px,4vw,44px)",
            letterSpacing: "-0.02em",
          }}
        >
          {content.email}
          <span
            className="absolute right-0 left-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
            style={{ bottom: -4, height: 2 }}
          />
        </motion.a>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap font-mono"
          style={{
            gap: "16px 28px",
            fontSize: 14,
            color: "oklch(0.70 0.01 250)",
            paddingTop: 8,
          }}
        >
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              className="group relative transition-colors hover:text-primary"
            >
              {s.label}
              <span
                className="absolute right-0 left-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ bottom: -3 }}
              />
            </a>
          ))}
        </motion.div>

        <div
          className="flex flex-wrap items-center justify-between border-t border-white/[0.07] font-mono"
          style={{
            gap: 12,
            marginTop: "clamp(24px,4vw,48px)",
            paddingTop: 24,
            fontSize: 12,
            color: "oklch(0.52 0.01 250)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {content.name}
          </span>
          <span>{content.footerTagline}</span>
        </div>
      </motion.div>
    </footer>
  );
}
```

- [ ] **Step 2: Type-check**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Manually verify in the browser**

With `npm run dev` running, scroll to the footer and confirm:

- The heading, email link, and social row cascade in as the footer enters the viewport.
- Hovering the email address and each social link reveals an underline that grows in from the left rather than appearing instantly.
- The copyright/tagline bottom bar is unchanged (no animation, always visible).

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "Add staggered entrance and underline hover to Contact section"
```

---

### Task 8: Full-site verification pass

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Full production build**

Run:

```bash
npm run build
```

Expected: type-check and production build both succeed with no errors or warnings introduced by this plan.

- [ ] **Step 2: Full manual walkthrough**

Run:

```bash
npm run preview
```

Open the printed local URL and, scrolling from top to bottom, confirm every animation from Tasks 2–7 fires once, in order, and that nothing double-fires or feels sluggish. Specifically re-check:

- Header entrance + nav underline glide + résumé button hover/tap.
- Hero staggered reveal + CTA hover/tap.
- Skills section entrance fade only (marquee drag/hover/tooltip behavior identical to before this plan).
- Experience row stagger.
- Projects grid stagger + card hover lift.
- Contact stagger + underline hovers.

- [ ] **Step 3: Reduced-motion check**

In your OS accessibility settings, enable "Reduce motion" (macOS: System Settings → Accessibility → Display → Reduce Motion; Windows: Settings → Accessibility → Visual effects → Animation effects, off). Reload the preview and confirm transform-based animations (slides, scales, the nav underline glide) no longer play, while content still appears (opacity fades may still play per Motion's `reducedMotion="user"` behavior). Turn the OS setting back off afterward.

- [ ] **Step 4: Final confirmation**

No commit needed for this task — it is verification-only. If any check in Steps 2–3 fails, fix the relevant component from Tasks 2–7, re-run its task's build/manual-check steps, and commit the fix separately before considering the plan complete.
