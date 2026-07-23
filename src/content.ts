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
  image?: string;
  link?: string;
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

  loader: {
    label: "initializing portfolio",
    logs: [
      "> booting kernel…",
      "> compiling components…",
      "> hydrating experience…",
      "> ready.",
    ],
  },

  sections: {
    experience: { number: "02", heading: "Where I've built" },
    projects: { number: "03", heading: "Selected work" },
    contact: { number: "04" },
  },

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
      years: "NOV 2024 — Present",
      title: "Software Engineer II",
      company: "Emumba",
      impact:
        "Crafted modern web experiences with React and Next.js, and wasn't afraid to venture into the backend with Node.js, Express, FastAPI, and PostgreSQL when the project needed it. Always aiming for clean code, thoughtful UX, and solid performance.",
    },
    {
      years: "JUN 2025 — AUG 2025",
      title: "Software Engineer",
      company: "InterWiz AI",
      impact:
        "Built and refined the company's marketing website with modern UI, smooth animations, and SEO improvements to boost performance and visibility. Integrated Contentful CMS to give the team an easy, flexible way to manage content while keeping the experience fast and polished.",
    },
    {
      years: "SEP 2020 — NOV 2024",
      title: "Graphic Design & UI/UX",
      company: "Multiple Engagements",
      impact:
        "Worked as a graphic designer for TFC Marketing and Multan Sultans, creating social media assets and marketing campaigns, and led the Multan Sultans website's UX redesign through PSL seasons 6–8. Also designed wireframes and UI mockups in Figma as a UI/UX designer for The Office Web Inc and IdeaGist.",
    },
  ] as Role[],

  projects: [
    {
      no: "01",
      name: "AdFlux Partners",
      desc: "A modern, responsive website for an e-commerce agency specializing in Amazon advertising and marketplace optimization.",
      stack: ["Next.js", "Contentful", "Tailwind"],
      image: "/images/projects/adflux.png",
      link: "https://www.adfluxpartners.com/",
    },
    {
      no: "02",
      name: "Curated by Saima",
      desc: "A visually rich, SEO friendly website that highlights interior design expertise and personalized home styling services.",
      stack: ["Next.js", "Contentful", "Sass"],
      image: "/images/projects/cbs.png",
      link: "https://curatedbysaima.com/",
    },
    {
      no: "03",
      name: "Equinox",
      desc: "A mobile application that helps users track their PSX portfolio, monitor stock performance, and make informed decisions.",
      stack: ["React Native", "Supabase", "Tailwind"],
      image: "/images/projects/equinox.png",
    },
  ] as Project[],

  projectsPrivacyNote:
    "There's more where that came from — locked behind client NDAs & private repositories.",

  socials: [
    { label: "GitHub ↗", href: "https://github.com/afnansohail" },
    { label: "GitHub (Emumba) ↗", href: "https://github.com/afnan-emumba" },
    { label: "GitLab ↗", href: "https://gitlab.com/afnan-emumba" },
    { label: "LinkedIn ↗", href: "https://linkedin.com/in/afnansohail99" },
  ] as SocialLink[],

  footerTagline: "Handcrafted, overthought, and shipped anyway.",
};
