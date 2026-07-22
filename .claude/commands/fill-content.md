---
description: Walk through the placeholder fields in src/content.ts and fill them in with real details
---

## Task

Find every remaining placeholder in `src/content.ts` — bracketed slots like `[Your current title]` or `[Project name]`, `href: "#"` social links, and `TODO(afnan)` comments — and help replace them with real content.

1. Read `src/content.ts` and list every placeholder found, grouped by section (`roles`, `projects`, `socials`, `email`).
2. Ask for the real values per group (job titles/dates/impact, project names/descriptions/stacks, social profile URLs, contact email) — batch related questions together rather than one at a time.
3. Edit `src/content.ts` in place. Keep the existing `Role`/`Project`/`Skill`/`SocialLink` structure — only replace values, don't restructure.
4. If a `skills` entry is added or changed, confirm the `slug` exists on simpleicons.org.
5. Don't touch any component file — all content changes belong in `content.ts` per this repo's convention (see CLAUDE.md).
