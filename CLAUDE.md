# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build
```

There is no test suite and no linter configured in this repo. `npm run build` (which runs `tsc -b` in strict mode) is the only automated check — run it after making changes to catch type errors.

## Architecture

This is a single-page, static portfolio site: Vite + React 19 + TypeScript + Tailwind CSS v4. No router, no state management, no backend/API calls.

**Content/component split is the key convention:** every piece of copy (name, intro text, skills list, work history, projects, social links) lives in [src/content.ts](src/content.ts) as one typed `content` object, imported by components. Components never hardcode copy — when asked to change text, update `content.ts`, not the component JSX. `content.ts` also exports an `options` object (`showCodeMotif`, `sectionNumbers`) that toggles decorative features from one place.

**Component structure:** [src/App.tsx](src/App.tsx) composes six presentational components in a fixed order — `Header`, `Hero`, `Skills`, `Experience`, `Projects` (inside `<main>`), then `Contact` (as a footer, outside `<main>`). Each lives in `src/components/` as a single default-export function component with no props — they all pull directly from `content.ts`. Sections are wired to the header nav via anchor IDs (`#work`, `#experience`, `#contact`).

**Styling:** Tailwind v4 is configured via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 uses CSS-based config). All design tokens (colors, fonts) are defined once in [src/index.css](src/index.css) under `@theme` as CSS custom properties (`--color-bg`, `--color-primary`, `--font-display`, etc.), which Tailwind exposes as `bg-*`/`text-*`/`border-*`/`font-*` utility classes. Restyling the whole site means editing tokens in this one file. Components mix Tailwind utility classes with inline `style` objects (used for `clamp()`-based fluid sizing and one-off values not worth a utility class).

**Custom cursors:** `index.css` sets custom cursor images (`/cursors/default.png`, `/cursors/pointer.png` in `public/cursors/`) globally and on all interactive elements.

**Skill icons:** entries in `content.skills[].slug` must match a valid slug from [simpleicons.org](https://simpleicons.org); icons are tinted via `ICON_TINT` in the `Skills` component.
