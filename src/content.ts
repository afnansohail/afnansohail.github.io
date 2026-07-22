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
  initials: "AS",
  eyebrow: "Full-Stack Engineer · Powered by Curiosity",

  email: "afnansohail1999@gmail.com",

  intro: {
    lead: "I build web stuff that's fast, sturdy, and ",
    highlight: "obsessed with the tiny details",
    tail: " everyone else skips — from gnarly database schemas to that one pixel that's off by exactly one. Currently building things at Emumba.",
  },

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
      tag: "OPEN SOURCE",
      desc: "[What it does, plus the one stat that makes people go 'whoa'.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "02",
      name: "[Project name]",
      tag: "SIDE PROJECT",
      desc: "[The problem it solves and how — keep it snappy.]",
      stack: ["Tech", "Tech", "Tech"],
    },
    {
      no: "03",
      name: "[Project name]",
      tag: "WORK",
      desc: "[What you built and the impact it had — numbers welcome.]",
      stack: ["Tech", "Tech", "Tech"],
    },
  ] as Project[],

  socials: [
    { label: "GitHub ↗", href: "#" },
    { label: "LinkedIn ↗", href: "#" },
    { label: "X / Twitter ↗", href: "#" },
    { label: "Read.cv ↗", href: "#" },
  ] as SocialLink[],
};
