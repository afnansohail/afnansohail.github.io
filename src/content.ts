export interface Role {
  years: string;
  span: string;
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

export interface Tool {
  slug: string;
  label: string;
}

export interface ToolGroup {
  heading: string;
  tools: Tool[];
}

export interface SocialLink {
  key: string;
  value: string;
  href: string;
  icon: string;
}

export const options = {
  scanlines: true,
  crtFlicker: true,
  starfield: true,
  bootSpeedMs: 350,
};

export const content = {
  name: "Afnan Sohail",
  initials: "AS",
  eyebrow: "FULL-STACK ENGINEER · POWERED BY CURIOSITY",
  status: "STATUS: open to interesting problems",
  tagline: "building things at Emumba",
  email: "afnansohail1999@gmail.com",
  resumeHref: "/docs/Afnan Sohail - Resume.pdf",
  sessionLabel: "afnan://portfolio — session #AS1099",

  banner: `
   __      ___   
  /__\\    / __)  
 /(__)\\   \\__ \\  
(__)(__)()(___/()
  `,

  intro:
    "I build web stuff that's fast, sturdy, and obsessed with the tiny details everyone else skips — from gnarly database schemas to that one pixel that's off by exactly one.",

  bootLines: [
    "[ 0.00 ] kernel v6.7.0 — booting personal OS…",
    "[ 0.14 ] initializing quantum core .............. OK",
    "[ 0.29 ] mounting /dev/portfolio ................ OK",
    "[ 0.46 ] loading persona: AFNAN_SOHAIL .......... OK",
    "[ 0.61 ] decrypting experience.log (2020–2026) .. OK",
    "[ 0.77 ] indexing projects & 15 tools ......... OK",
    "[ 0.88 ] calibrating neural display ............. OK",
    "[ 1.00 ] establishing visitor uplink ............ OK",
    "",
    "welcome, visitor. connection secure. type `help` to begin.",
  ],

  about: {
    identity: [
      "I build web stuff that's fast, sturdy, and obsessed with the tiny details everyone else skips — from gnarly database schemas to that one pixel that's off by exactly one.",
      "Currently building things at Emumba, working across the stack with React, Next.js and a backend I'm not afraid to get into. I care about clean code, thoughtful UX, and solid performance.",
    ],
    facts: [
      { label: "ROLE", value: "Full-stack Engineer" },
      { label: "CURRENTLY", value: "Software Engineer II @ Emumba" },
      { label: "FOCUS", value: "Web · Backend · UI/UX" },
      { label: "MINDSET", value: "details, obsessively", accent: true },
    ],
  },

  roles: [
    {
      years: "NOV 2024 — NOW",
      span: "present",
      title: "Software Engineer II",
      company: "Emumba",
      impact:
        "Crafted modern web experiences with React and Next.js, and wasn't afraid to venture into the backend with Node.js, Express, FastAPI, and PostgreSQL when the project needed it. Always aiming for clean code, thoughtful UX, and solid performance.",
    },
    {
      years: "JUN 2025 — AUG 2025",
      span: "part-time",
      title: "Software Engineer",
      company: "InterWiz AI",
      impact:
        "Built and refined the company's marketing website with modern UI, smooth animations, and SEO improvements to boost performance and visibility. Integrated Contentful CMS to give the team an easy, flexible way to manage content while keeping the experience fast and polished.",
    },
    {
      years: "SEP 2020 — NOV 2024",
      span: "multiple",
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
      desc: "A visually rich, SEO-friendly website that highlights interior design expertise and personalized home styling services.",
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
    "there's more where that came from — locked behind client NDAs & private repos.",

  toolGroups: [
    {
      heading: "// FRONTEND",
      tools: [
        { slug: "react", label: "React" },
        { slug: "nextdotjs", label: "Next.js" },
        { slug: "typescript", label: "TypeScript" },
        { slug: "javascript", label: "JavaScript" },
        { slug: "tailwindcss", label: "Tailwind" },
      ],
    },
    {
      heading: "// BACKEND & DATA",
      tools: [
        { slug: "python", label: "Python" },
        { slug: "fastapi", label: "FastAPI" },
        { slug: "graphql", label: "GraphQL" },
        { slug: "mongodb", label: "MongoDB" },
        { slug: "postgresql", label: "PostgreSQL" },
        { slug: "temporal", label: "Temporal" },
      ],
    },
    {
      heading: "// DESIGN & OPS",
      tools: [
        { slug: "grafana", label: "Grafana" },
        { slug: "figma", label: "Figma" },
        { slug: "git", label: "Git" },
        { slug: "github", label: "GitHub" },
      ],
    },
  ] as ToolGroup[],

  resume: {
    heading: "Afnan Sohail — résumé",
    blurb:
      "The full document: experience, education, and the details that don't fit on one screen.",
  },

  socials: [
    {
      key: "GITHUB",
      value: "@afnansohail",
      href: "https://github.com/afnansohail",
      icon: "github",
    },
    {
      key: "GITHUB · EMUMBA",
      value: "@afnan-emumba",
      href: "https://github.com/afnan-emumba",
      icon: "github",
    },
    {
      key: "GITLAB",
      value: "@afnan-emumba",
      href: "https://gitlab.com/afnan-emumba",
      icon: "gitlab",
    },
    {
      key: "LINKEDIN",
      value: "in/afnansohail99",
      href: "https://linkedin.com/in/afnansohail99",
      icon: "simple-icons:linkedin",
    },
  ] as SocialLink[],

  footerLine:
    "© 2026 Afnan Sohail — handcrafted, overthought, and shipped anyway.",

  menuCommands: [
    "about",
    "experience",
    "projects",
    "tools",
    "resume",
    "contact",
    "surprise",
    "help",
    "clear",
  ],

  help: [
    { cmd: "about", desc: "who I am & what I do" },
    { cmd: "experience", desc: "where I've built" },
    { cmd: "projects", desc: "selected work" },
    { cmd: "tools", desc: "my toolbox" },
    { cmd: "resume", desc: "grab my résumé" },
    { cmd: "contact", desc: "say hi" },
    { cmd: "surprise", desc: "run this at your own risk" },
    { cmd: "clear", desc: "reset the session" },
  ],
};
