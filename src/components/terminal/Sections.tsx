import { memo, type ComponentType, type ReactNode } from "react";
import { content } from "@/content";
import GameSection from "./Game";
import ResumeLink from "./ResumeLink";

export type SectionKey =
  | "about"
  | "work"
  | "projects"
  | "tools"
  | "resume"
  | "contact"
  | "help"
  | "game";

const shellClass = "mt-8.5 animate-[tpFade_.5s_ease_both]";
const panelClass =
  "rounded-[10px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(var(--glow-rgb),.05),rgba(var(--glow-rgb),.01))]";
const panelSoftClass =
  "rounded-[10px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(var(--glow-rgb),.04),rgba(var(--glow-rgb),.01))]";
const panelStrongClass =
  "rounded-[10px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(var(--glow-rgb),.06),rgba(var(--glow-rgb),.01))]";

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div className="mb-3.5 text-[13px] text-(--glow-bright)">
      guest@afnan:~$ <span className="text-white">{cmd}</span>
    </div>
  );
}

export function SectionShell({
  id,
  cmd,
  children,
}: {
  id: SectionKey;
  cmd: string;
  children: ReactNode;
}) {
  return (
    <div id={`sec-${id}`} className={shellClass}>
      <Prompt cmd={cmd} />
      {children}
    </div>
  );
}

export const Banner = memo(function Banner() {
  return (
    <div className="flex flex-wrap items-center gap-6.5">
      <pre className="tp-ascii m-0 max-w-full text-[clamp(11px,2.4vw,17px)] font-bold leading-[1.12] text-(--glow)">
        {content.banner}
      </pre>
      <div>
        <div className="mb-2 text-[11px] tracking-[.28em] text-(--glow-bright)">
          {content.eyebrow}
        </div>
        <div className="text-[22px] tracking-[.02em] text-white">
          {content.name.toUpperCase()}
        </div>
        <div className="mt-0.75 text-[12.5px] text-(--dim)">
          {content.tagline}
        </div>
        <div className="mt-3 text-[12px] text-(--accent)">{content.status}</div>
      </div>
    </div>
  );
});

export const Intro = memo(function Intro() {
  return (
    <>
      <div className="mt-5.5 max-w-165 text-[13.5px] leading-[1.7] text-[#c9cce0]">
        {content.intro}
      </div>
      <div className="mt-3 text-[13.5px] text-[#c9cce0]">
        Type a command or click one above —{" "}
        <span className="font-medium text-(--glow-bright)">help</span> lists
        them all.
      </div>
    </>
  );
});

export const AboutSection = memo(function AboutSection() {
  return (
    <SectionShell id="about" cmd="about">
      <div
        className={`${panelClass} grid gap-5.5 p-5.5 md:grid-cols-[1.5fr_1fr]`}
      >
        <div>
          <div className="mb-2.5 text-[12px] tracking-[.28em] text-(--dim)">
            // IDENTITY
          </div>
          {content.about.identity.map((p, i) => (
            <p
              key={i}
              className={`text-pretty text-[14px] leading-[1.75] text-[#d6d8e6] ${
                i === content.about.identity.length - 1 ? "mb-0" : "mb-3"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          {content.about.facts.map((f) => (
            <div key={f.label}>
              <div className="text-[11px] tracking-[.2em] text-(--dim)">
                {f.label}
              </div>
              <div
                className={`text-[14px] ${
                  f.accent ? "text-(--accent)" : "text-(--glow-bright)"
                }`}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
});

export const WorkSection = memo(function WorkSection() {
  return (
    <SectionShell id="work" cmd="cat experience.log">
      <div className="flex flex-col gap-0.5">
        {content.roles.map((role, i) => (
          <div
            key={role.company}
            className={`grid gap-5 rounded-r-lg px-4 py-4.5 md:grid-cols-[180px_1fr] ${
              i === 0
                ? "border-l-2 border-l-(--glow) bg-[rgba(var(--glow-rgb),.05)]"
                : "border-l-2 border-l-(--glow-dim)"
            }`}
          >
            <div className="text-[12.5px] text-(--glow-bright)">
              {role.years}
              <div className="mt-1 text-[11px] text-(--dim)">{role.span}</div>
            </div>
            <div>
              <div className="text-[15px] text-white">
                <span className="block sm:inline">{role.title}</span>
                <span className="block text-(--dim) sm:ml-1 sm:inline">
                  @ {role.company}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-[1.7] text-[#c4c7d8]">
                {role.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
});

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <SectionShell id="projects" cmd="ls ~/selected-work">
      <div className="flex flex-col gap-5.5">
        {content.projects.map((project) => (
          <div
            key={project.no}
            className={`${panelClass} grid items-center gap-5 p-4.5 md:grid-cols-[52px_1fr_300px]`}
          >
            <div className="text-[34px] font-bold text-[rgba(var(--glow-rgb),.35)]">
              {project.no}
            </div>
            <div>
              <div className="text-[18px] font-medium text-white">
                {project.name}
              </div>
              <p className="mb-3 mt-2 text-[13px] leading-[1.65] text-[#b9bccd]">
                {project.desc}
              </p>
              <div
                className={`flex flex-wrap gap-1.5 ${
                  project.link ? "mb-3" : "mb-0"
                }`}
              >
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm bg-[rgba(var(--glow-rgb),.1)] px-2 py-0.5 text-[10.5px] text-(--glow-bright)"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12.5px] no-underline"
                >
                  ↗ live demo
                </a>
              )}
            </div>
            <div className="aspect-16/10 w-full">
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  className="block h-full w-full rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3.5 text-[11.5px] text-(--dim)">
        // {content.projectsPrivacyNote}
      </div>
    </SectionShell>
  );
});

export const ToolsSection = memo(function ToolsSection() {
  return (
    <SectionShell id="tools" cmd="toolbox --list">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.toolGroups.map((group) => (
          <div key={group.heading} className={`${panelSoftClass} p-4.5`}>
            <div className="mb-3.5 text-[12px] tracking-[.24em] text-(--dim)">
              {group.heading}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.tools.map((tool, i) => (
                <div
                  key={`${tool.slug}-${i}`}
                  className="flex items-center gap-2.25 rounded-[7px] border border-(--line) bg-[rgba(var(--glow-rgb),.05)] px-2.5 py-2"
                >
                  <span
                    className="size-4.75 shrink-0 bg-(--glow-bright)"
                    style={{
                      WebkitMaskImage: `url(https://cdn.simpleicons.org/${tool.slug})`,
                      maskImage: `url(https://cdn.simpleicons.org/${tool.slug})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                  <span className="text-[12px] text-[#dcdcec]">
                    {tool.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
});

export const ResumeSection = memo(function ResumeSection() {
  return (
    <SectionShell id="resume" cmd="open résumé.pdf">
      <div
        className={`${panelStrongClass} flex flex-wrap items-center justify-between gap-4.5 p-5.5`}
      >
        <div>
          <div className="mb-1.5 text-[15px] text-white">
            {content.resume.heading}
          </div>
          <div className="text-[12.5px] text-[#b9bccd]">
            {content.resume.blurb}
          </div>
        </div>
        <ResumeLink
          label="↗ open résumé.pdf"
          className="rounded-3xl px-5 py-2.5 text-[13px] whitespace-nowrap"
        />
      </div>
      <div className="mt-2.5 text-[11px] text-(--dim)">
        // link points at your résumé — drop a new file into public/docs to
        update it.
      </div>
    </SectionShell>
  );
});

function IconBadge({ slug }: { slug: string }) {
  const iconUrl = slug.includes(":")
    ? `https://api.iconify.design/${slug}.svg`
    : `https://cdn.simpleicons.org/${slug}`;
  return (
    <span className="flex size-8.5 shrink-0 items-center justify-center rounded-lg bg-[rgba(var(--glow-rgb),.12)]">
      <span
        className="size-4.25 bg-(--glow-bright)"
        style={{
          WebkitMaskImage: `url(${iconUrl})`,
          maskImage: `url(${iconUrl})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
}

export const ContactSection = memo(function ContactSection() {
  const contactCardClass =
    "tp-social flex items-center gap-3 rounded-[10px] border border-(--line) px-3.5 py-3 no-underline";

  return (
    <SectionShell id="contact" cmd="./say-hi.sh">
      <div className={`${panelStrongClass} p-6`}>
        <div className="text-[clamp(20px,4vw,30px)] font-medium text-white">
          Let's build something.
        </div>
        <a
          href={`mailto:${content.email}`}
          className={`${contactCardClass} mt-4 mb-5 w-full justify-center sm:justify-start`}
        >
          <span className="hidden sm:flex">
            <IconBadge slug="gmail" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5 text-center sm:text-left">
            <span className="text-[10.5px] tracking-[.14em] text-(--dim)">
              GET IN TOUCH
            </span>
            <span className="break-all text-[13.5px] text-white">
              {content.email}
            </span>
          </div>
        </a>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {content.socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={contactCardClass}
            >
              <IconBadge slug={s.icon} />
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[10.5px] tracking-[.14em] text-(--dim)">
                  {s.key}
                </span>
                <span className="text-[13.5px] text-white">{s.value}</span>
              </div>
              <span className="ml-auto text-[14px] text-(--dim)">↗</span>
            </a>
          ))}
        </div>
        <div className="mt-5 text-[11px] text-(--dim)">
          {content.footerLine}
        </div>
      </div>
    </SectionShell>
  );
});

export const HelpSection = memo(function HelpSection() {
  return (
    <SectionShell id="help" cmd="help">
      <div className="rounded-[10px] border border-(--line) p-4 text-[13px] leading-[1.7] text-[#c4c7d8] sm:p-5">
        {content.help.map((h) => (
          <div key={h.cmd} className="mb-1 flex gap-2">
            <span className="w-23 shrink-0 text-(--glow-bright) sm:w-32.5">
              {h.cmd}
            </span>
            <span>{h.desc}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
});

export const SECTION_COMPONENTS: Record<SectionKey, ComponentType> = {
  about: AboutSection,
  work: WorkSection,
  projects: ProjectsSection,
  tools: ToolsSection,
  resume: ResumeSection,
  contact: ContactSection,
  help: HelpSection,
  game: GameSection,
};
