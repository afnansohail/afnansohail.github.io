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

**Do not install, run, or drive Playwright/browser automation (or any other browser tool) to verify UI changes in this repo.** Running `npm run build` once is sufficient verification — the user reviews visual/UI changes themselves in their own browser.

## Architecture

This is a single-page, static portfolio site: Vite + React 19 + TypeScript + Tailwind CSS v4. No router, no state management, no backend/API calls. The whole site is a full-viewport CRT-styled terminal emulator — content is revealed by typing (or clicking) commands like `whoami`, `projects`, `contact`, rather than by scrolling through sections.

**Content/component split is the key convention:** every piece of copy (name, boot sequence lines, work history, projects, tool groups, social links, help text) lives in [src/content.ts](src/content.ts) as one typed `content` object, imported by components. Components never hardcode copy — when asked to change text, update `content.ts`, not the component JSX. `content.ts` also exports an `options` object (`scanlines`, `crtFlicker`, `starfield`, `bootSpeedMs`) that toggles decorative CRT/boot behavior from one place.

**Component structure:** [src/App.tsx](src/App.tsx) renders a single stateful root, [src/components/Terminal.tsx](src/components/Terminal.tsx), which owns the remaining app state — the ordered list of revealed sections, and the command input/prompt message — and composes everything else. Boot-sequence state and theme-application state are lifted into two hooks:

- [src/hooks/useBootSequence.ts](src/hooks/useBootSequence.ts) — sessionStorage-gated boot timer; returns `{ booting, lineIdx, progress, ready }`.
- [src/hooks/useTerminalTheme.ts](src/hooks/useTerminalTheme.ts) — theme state plus the effect that writes `--glow`/`--line`/etc CSS vars onto the root ref; returns `[theme, setTheme]`.

Presentational pieces live in `src/components/terminal/`:

- [TerminalCanvas.tsx](src/components/terminal/TerminalCanvas.tsx) — the animated background grid + starfield (imperative `requestAnimationFrame` canvas loop; reads the current theme's colors from a ref so it never restarts on theme change).
- [CRTEffects.tsx](src/components/terminal/CRTEffects.tsx) — the scanline/flicker/vignette overlay layers, gated by `options.scanlines`/`options.crtFlicker`.
- [BootScreen.tsx](src/components/terminal/BootScreen.tsx) — the boot overlay (typed lines + progress bar), driven by `useBootSequence`'s output.
- [HeaderBar.tsx](src/components/terminal/HeaderBar.tsx) — window dots, session label, theme-switcher dots, mute button, résumé pill, ONLINE indicator.
- [CommandBar.tsx](src/components/terminal/CommandBar.tsx) — the row of `content.menuCommands` buttons.
- [CommandInput.tsx](src/components/terminal/CommandInput.tsx) — the footer status message + prompt input row.
- [ResumeLink.tsx](src/components/terminal/ResumeLink.tsx) — shared "résumé pill" link (used by both `HeaderBar` and `ResumeSection`); takes `label`/`style`/`stopPropagation` since the two call sites size it differently.
- [Sections.tsx](src/components/terminal/Sections.tsx) — `Banner`/`Intro` plus the seven revealable, prop-less sections (`AboutSection`, `WorkSection`, `ProjectsSection`, `ToolsSection`, `ResumeSection`, `ContactSection`, `HelpSection`), each pulling directly from `content.ts`, and a `SECTION_COMPONENTS` lookup map keyed by `SectionKey`.
- [themes.ts](src/components/terminal/themes.ts) — `THEMES` map, `ThemeKey`/`ThemeDef` types, `DEFAULT_THEME`.
- [commands.ts](src/components/terminal/commands.ts) — the `ALIASES` map from typed command → `SectionKey`.

Typing a command (or clicking one of the persistent command-bar buttons) resolves it through `ALIASES` (in `commands.ts`) to a `SectionKey`, appends that key to the `order` array (moving it to the end if already present), and smooth-scrolls the feed to it; `clear`/`cls`/`reset` empties `order` back to nothing. Sections render in `order` sequence — no manual DOM/CSS-order manipulation needed.

**Styling:** Tailwind v4 is configured via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 uses CSS-based config). Given how much of this design is one-off, per-element visual detail, most components use inline `style` objects rather than utility classes; Tailwind classes are reserved for structural/responsive concerns (flex-wrap, responsive grid columns via arbitrary values like `md:grid-cols-[52px_1fr_300px]`). Theme colors (`--glow`, `--glow-bright`, `--glow-dim`, `--glow-rgb`, `--line`, `--dim`, `--mono`) are plain CSS custom properties — defaulted at `:root` in [src/index.css](src/index.css) (nocturne theme) and overridden at runtime on the root element by the `useTerminalTheme` hook when the user switches themes. Hover states that would otherwise need per-element JS state are done as real CSS classes in `index.css` (`.tp-cmd`, `.tp-pill`, `.tp-card`, `.tp-social`).

**Custom cursors:** `index.css` sets custom cursor images (`/cursors/default.png`, `/cursors/pointer.png` in `public/cursors/`) globally and on all interactive elements.

**Tool icons:** entries in `content.toolGroups[].tools[].slug` must match a valid slug from [simpleicons.org](https://simpleicons.org); icons are rendered as a `mask-image` off `cdn.simpleicons.org` and tinted via `background: var(--glow-bright)`, matching the same technique everywhere icons appear.

**Unused dependencies:** `gsap`, `@gsap/react`, `lenis`, `three`, `@react-three/*`, and `zustand` remain in `package.json` from the previous scroll-driven design but are no longer imported anywhere — safe to remove in a follow-up if desired.
