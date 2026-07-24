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

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div
      style={{ color: "var(--glow-bright)", fontSize: 13, marginBottom: 14 }}
    >
      guest@afnan:~$ <span style={{ color: "#fff" }}>{cmd}</span>
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
    <div
      id={`sec-${id}`}
      style={{ marginTop: 34, animation: "tpFade .5s ease both" }}
    >
      <Prompt cmd={cmd} />
      {children}
    </div>
  );
}

const panelStyle = {
  border: "1px solid var(--line)",
  borderRadius: 10,
  padding: 22,
  background:
    "linear-gradient(180deg,rgba(var(--glow-rgb),.05),rgba(var(--glow-rgb),.01))",
};

export const Banner = memo(function Banner() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 26,
        alignItems: "center",
      }}
    >
      <pre
        style={{
          margin: 0,
          color: "var(--glow)",
          textShadow: "0 0 16px var(--glow-dim)",
          fontSize: "clamp(11px,2.4vw,17px)",
          lineHeight: 1.12,
          fontWeight: 700,
        }}
      >
        {content.banner}
      </pre>
      <div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: ".28em",
            color: "var(--glow-bright)",
            marginBottom: 8,
          }}
        >
          {content.eyebrow}
        </div>
        <div style={{ fontSize: 22, color: "#fff", letterSpacing: ".02em" }}>
          {content.name.toUpperCase()}
        </div>
        <div style={{ color: "var(--dim)", fontSize: 12.5, marginTop: 3 }}>
          {content.tagline}
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--accent)" }}>
          {content.status}
        </div>
      </div>
    </div>
  );
});

export const Intro = memo(function Intro() {
  return (
    <>
      <div
        style={{
          marginTop: 22,
          color: "#c9cce0",
          fontSize: 13.5,
          lineHeight: 1.7,
          maxWidth: 660,
        }}
      >
        {content.intro}
      </div>
      <div style={{ marginTop: 12, color: "#c9cce0", fontSize: 13.5 }}>
        Type a command or click one above —{" "}
        <span style={{ color: "var(--glow-bright)", fontWeight: 500 }}>
          help
        </span>{" "}
        lists them all.
      </div>
    </>
  );
});

export const AboutSection = memo(function AboutSection() {
  return (
    <SectionShell id="about" cmd="about">
      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]"
        style={{ ...panelStyle, gap: 22 }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".28em",
              color: "var(--dim)",
              marginBottom: 10,
            }}
          >
            // IDENTITY
          </div>
          {content.about.identity.map((p, i) => (
            <p
              key={i}
              style={{
                margin:
                  i === content.about.identity.length - 1 ? 0 : "0 0 12px",
                fontSize: 14,
                lineHeight: 1.75,
                color: "#d6d8e6",
                textWrap: "pretty",
              }}
            >
              {p}
            </p>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {content.about.facts.map((f) => (
            <div key={f.label}>
              <div
                style={{
                  color: "var(--dim)",
                  fontSize: 11,
                  letterSpacing: ".2em",
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  color: f.accent ? "var(--accent)" : "var(--glow-bright)",
                  fontSize: 14,
                }}
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
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {content.roles.map((role, i) => (
          <div
            key={role.company}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr]"
            style={{
              gap: 20,
              padding: "18px 16px",
              borderLeft: `2px solid ${i === 0 ? "var(--glow)" : "var(--glow-dim)"}`,
              background: i === 0 ? "rgba(var(--glow-rgb),.05)" : undefined,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <div style={{ color: "var(--glow-bright)", fontSize: 12.5 }}>
              {role.years}
              <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>
                {role.span}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, color: "#fff" }}>
                {role.title}{" "}
                <span style={{ color: "var(--dim)" }}>@ {role.company}</span>
              </div>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#c4c7d8",
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
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
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {content.projects.map((project) => (
          <div
            key={project.no}
            className="tp-card grid grid-cols-1 md:grid-cols-[52px_1fr_300px]"
            style={{
              gap: 20,
              alignItems: "center",
              padding: 18,
              border: "1px solid var(--line)",
              borderRadius: 12,
              background:
                "linear-gradient(180deg,rgba(var(--glow-rgb),.05),rgba(var(--glow-rgb),.01))",
            }}
          >
            <div
              style={{
                fontSize: 34,
                color: "rgba(var(--glow-rgb),.35)",
                fontWeight: 700,
              }}
            >
              {project.no}
            </div>
            <div>
              <div style={{ fontSize: 18, color: "#fff", fontWeight: 500 }}>
                {project.name}
              </div>
              <p
                style={{
                  margin: "8px 0 12px",
                  color: "#b9bccd",
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                {project.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginBottom: project.link ? 12 : 0,
                }}
              >
                {project.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 10.5,
                      color: "var(--glow-bright)",
                      background: "rgba(var(--glow-rgb),.1)",
                      borderRadius: 4,
                      padding: "2px 8px",
                    }}
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
                  style={{ fontSize: 12.5, textDecoration: "none" }}
                >
                  ↗ live demo
                </a>
              )}
            </div>
            <div style={{ width: "100%", aspectRatio: "16/10" }}>
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                    display: "block",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, color: "var(--dim)", fontSize: 11.5 }}>
        // {content.projectsPrivacyNote}
      </div>
    </SectionShell>
  );
});

export const ToolsSection = memo(function ToolsSection() {
  return (
    <SectionShell id="tools" cmd="toolbox --list">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 16 }}
      >
        {content.toolGroups.map((group) => (
          <div
            key={group.heading}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 18,
              background:
                "linear-gradient(180deg,rgba(var(--glow-rgb),.04),rgba(var(--glow-rgb),.01))",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".24em",
                color: "var(--dim)",
                marginBottom: 14,
              }}
            >
              {group.heading}
            </div>
            <div className="grid grid-cols-2" style={{ gap: 8 }}>
              {group.tools.map((tool, i) => (
                <div
                  key={`${tool.slug}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "8px 10px",
                    border: "1px solid var(--line)",
                    borderRadius: 7,
                    background: "rgba(var(--glow-rgb),.05)",
                  }}
                >
                  <span
                    style={{
                      width: 19,
                      height: 19,
                      flex: "none",
                      background: "var(--glow-bright)",
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
                  <span style={{ fontSize: 12, color: "#dcdcec" }}>
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
        className="flex flex-wrap items-center justify-between"
        style={{
          gap: 18,
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: 22,
          background:
            "linear-gradient(180deg,rgba(var(--glow-rgb),.06),rgba(var(--glow-rgb),.01))",
        }}
      >
        <div>
          <div style={{ fontSize: 15, color: "#fff", marginBottom: 6 }}>
            {content.resume.heading}
          </div>
          <div style={{ color: "#b9bccd", fontSize: 12.5 }}>
            {content.resume.blurb}
          </div>
        </div>
        <ResumeLink
          label="↗ open résumé.pdf"
          style={{
            fontSize: 13,
            borderRadius: 22,
            padding: "10px 20px",
            whiteSpace: "nowrap",
          }}
        />
      </div>
      <div style={{ marginTop: 10, color: "var(--dim)", fontSize: 11 }}>
        // link points at your résumé — drop a new file into public/docs to
        update it.
      </div>
    </SectionShell>
  );
});

function IconBadge({ slug }: { slug: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
        width: 34,
        height: 34,
        borderRadius: 8,
        background: "rgba(var(--glow-rgb),.12)",
      }}
    >
      <span
        style={{
          width: 17,
          height: 17,
          background: "var(--glow-bright)",
          WebkitMaskImage: `url(https://cdn.simpleicons.org/${slug})`,
          maskImage: `url(https://cdn.simpleicons.org/${slug})`,
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
  return (
    <SectionShell id="contact" cmd="./say-hi.sh">
      <div
        style={{
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: 24,
          background:
            "linear-gradient(180deg,rgba(var(--glow-rgb),.06),rgba(var(--glow-rgb),.01))",
        }}
      >
        <div
          style={{
            fontSize: "clamp(20px,4vw,30px)",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Let's build something.
        </div>
        <a
          href={`mailto:${content.email}`}
          className="tp-social"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            margin: "16px 0 20px",
            padding: "10px 16px 10px 10px",
            border: "1px solid var(--line)",
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          <IconBadge slug="gmail" />
          <span style={{ fontSize: 15, color: "var(--glow-bright)" }}>
            {content.email}
          </span>
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
          {content.socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-social"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                border: "1px solid var(--line)",
                borderRadius: 10,
              }}
            >
              <IconBadge slug={s.icon} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    color: "var(--dim)",
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                  }}
                >
                  {s.key}
                </span>
                <span style={{ color: "#fff", fontSize: 13.5 }}>{s.value}</span>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--dim)",
                  fontSize: 14,
                }}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 20, color: "var(--dim)", fontSize: 11 }}>
          {content.footerLine}
        </div>
      </div>
    </SectionShell>
  );
});

export const HelpSection = memo(function HelpSection() {
  return (
    <SectionShell id="help" cmd="help">
      <div
        className="p-4 sm:p-5"
        style={{
          border: "1px solid var(--line)",
          borderRadius: 10,
          fontSize: 13,
          lineHeight: 1.7,
          color: "#c4c7d8",
        }}
      >
        {content.help.map((h) => (
          <div key={h.cmd} className="flex gap-2" style={{ marginBottom: 4 }}>
            <span
              className="w-23 sm:w-32.5"
              style={{
                color: "var(--glow-bright)",
                flexShrink: 0,
              }}
            >
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
