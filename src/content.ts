export interface Role {
  years: string;
  title: string;
  company: string;
  impact: string;
}

export interface Project {
  no: string;
  name: string;
  desc: string;
  stack: string[];
}

export interface Skill {
  slug: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const options = {
  showCodeMotif: true,
  sectionNumbers: true,
};

export const content = {
  name: "Afnan Sohail",
  initials: "AfnanSohail",
  eyebrow: "Full-Stack Engineer · Powered by Curiosity",

  email: "afnansohail1999@gmail.com",

  intro: {
    lead: "I build web stuff that's fast, sturdy, and ",
    highlight: "obsessed with the tiny details",
    tail: " everyone else skips — from gnarly database schemas to that one pixel that's off by exactly one. Currently building things at Emumba.",
  },

  skills: [
    { slug: "react", label: "React" },
    { slug: "nextdotjs", label: "Next.js" },
    { slug: "typescript", label: "TypeScript" },
    { slug: "javascript", label: "JavaScript" },
    { slug: "tailwindcss", label: "Tailwind CSS" },
    { slug: "python", label: "Python" },
    { slug: "fastapi", label: "FastAPI" },
    { slug: "graphql", label: "GraphQL" },
    { slug: "mongodb", label: "MongoDB" },
    { slug: "postgresql", label: "PostgreSQL" },
    { slug: "temporal", label: "Temporal" },
    { slug: "grafana", label: "Grafana" },
    { slug: "figma", label: "Figma" },
    { slug: "git", label: "Git" },
    { slug: "github", label: "GitHub" },
  ] as Skill[],

  roles: [
    {
      years: "20XX — Now",
      title: "[Your current title]",
      company: "Emumba",
      impact:
        "[Tell them what you own, what you shipped, and what got better because you showed up. Humble-brag encouraged.]",
    },
    {
      years: "20XX — 20XX",
      title: "[Previous role]",
      company: "[Company]",
      impact: "[What you built end-to-end, and the win it drove.]",
    },
    {
      years: "20XX — 20XX",
      title: "[Earlier role]",
      company: "[Company]",
      impact: "[One accomplishment worth bragging about.]",
    },
  ] as Role[],

  projects: [
    {
      no: "01",
      name: "[Project name]",
      desc: "[What it does, plus the one stat that makes people go 'whoa'.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "02",
      name: "[Project name]",
      desc: "[The problem it solves and how — keep it snappy.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "03",
      name: "[Project name]",
      desc: "[What you built and the impact it had — numbers welcome.]",
      stack: ["Tech", "Tech", "Tech"],
    },
  ] as Project[],

  projectsPrivacyNote:
    "There's more where that came from — locked behind client NDAs tighter than my git commit history.",

  socials: [
    { label: "GitHub (personal) ↗", href: "https://github.com/afnansohail" },
    { label: "GitHub (Emumba) ↗", href: "https://github.com/afnan-emumba" },
    { label: "GitLab ↗", href: "https://gitlab.com/afnan-emumba" },
    { label: "LinkedIn ↗", href: "https://linkedin.com/in/afnansohail99" },
  ] as SocialLink[],

  footerTagline: "Handcrafted, overthought, and shipped anyway.",
};
