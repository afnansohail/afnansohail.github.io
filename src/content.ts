// ---------------------------------------------------------------------------
// EDIT THIS FILE to make the portfolio yours.
// Everything the site renders lives here — copy, roles, projects, links.
// Slots written as [ ... ] are placeholders waiting for your real details.
// ---------------------------------------------------------------------------

export interface Role {
  years: string;
  title: string;
  company: string;
  impact: string;
}

export interface Project {
  no: string;
  name: string;
  tag: string;
  desc: string;
  stack: string[];
}

export interface Skill {
  /** simpleicons.org slug — browse the full list at https://simpleicons.org */
  slug: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/** Single tint applied to every tech logo (matches the primary accent). */
export const ICON_TINT = "a540ff";

/** Toggle the decorative signatures carried over from the original concept. */
export const options = {
  showCodeMotif: true,
  sectionNumbers: true,
};

export const content = {
  name: "Afnan Sohail",
  initials: "AS",
  eyebrow: "Software Engineer · Full-Stack",

  // TODO(afnan): your public contact email + domain.
  email: "hello@afnansohail.dev",

  intro: {
    lead: "I build fast, resilient web systems and ",
    highlight: "sweat the details",
    tail: " others skip — from database schema to the last pixel. Currently building software at Emumba.",
  },

  // Edit to your actual stack. Each slug must exist on simpleicons.org.
  skills: [
    { slug: "typescript", label: "TypeScript" },
    { slug: "react", label: "React" },
    { slug: "nextdotjs", label: "Next.js" },
    { slug: "nodedotjs", label: "Node.js" },
    { slug: "go", label: "Go" },
    { slug: "postgresql", label: "PostgreSQL" },
    { slug: "docker", label: "Docker" },
    { slug: "graphql", label: "GraphQL" },
    { slug: "redis", label: "Redis" },
  ] as Skill[],

  // TODO(afnan): replace with your real roles, newest first.
  roles: [
    {
      years: "20XX — Now",
      title: "[Your current title]",
      company: "Emumba",
      impact:
        "[One or two sentences on your biggest impact here — what you own, what you shipped, and what got better because of you.]",
    },
    {
      years: "20XX — 20XX",
      title: "[Previous role]",
      company: "[Company]",
      impact: "[What you built or owned end-to-end, and the outcome it drove.]",
    },
    {
      years: "20XX — 20XX",
      title: "[Earlier role]",
      company: "[Company]",
      impact: "[A concrete accomplishment worth highlighting.]",
    },
  ] as Role[],

  // TODO(afnan): your best 2–4 projects.
  projects: [
    {
      no: "01",
      name: "[Project name]",
      tag: "OPEN SOURCE",
      desc: "[What it does, plus the one metric or detail that makes it impressive.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "02",
      name: "[Project name]",
      tag: "SIDE PROJECT",
      desc: "[The problem it solves and how — kept to a crisp line or two.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "03",
      name: "[Project name]",
      tag: "WORK",
      desc: "[What you built and the result it drove for users or the business.]",
      stack: ["Tech", "Tech", "Tech"],
    },
  ] as Project[],

  // TODO(afnan): drop in your real profile URLs.
  socials: [
    { label: "GitHub ↗", href: "#" },
    { label: "LinkedIn ↗", href: "#" },
    { label: "X / Twitter ↗", href: "#" },
    { label: "Read.cv ↗", href: "#" },
  ] as SocialLink[],
};
