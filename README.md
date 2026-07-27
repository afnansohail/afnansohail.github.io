# Afnan Sohail — Portfolio

A dark, code-flavored software-engineer portfolio, built from the "Engineer
portfolio" design concept with **Vite + React + Tailwind CSS v4**.

## Run it

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
```

## Make it yours

**All content lives in one file: [`src/content.ts`](src/content.ts).** No need to
touch the components. Slots written as `[ ... ]` are placeholders waiting for
your real details:

- `name`, `initials`, `eyebrow`, `email`, `intro` — the hero.
- `skills` — the tech-logo strip. Each `slug` must match one on
  [simpleicons.org](https://simpleicons.org); the logos are tinted via
  `ICON_TINT`.
- `roles` — the "Where I've built" timeline (newest first). Your current role is
  pre-filled with **Emumba**; fill in the title, dates, and impact.
- `projects` — the "Selected work" cards.
- `socials` — footer links.

`options` at the top of the same file toggles the two decorative signatures
(`showCodeMotif`, `sectionNumbers`).

## Design tokens

Colors and fonts are defined once as Tailwind theme tokens in
[`src/index.css`](src/index.css) (`bg-*` / `text-*` / `border-*` / `font-*`
utilities), so restyling is a one-place change.
