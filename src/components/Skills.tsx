import { content } from "../content";

export default function Skills() {
  return (
    <section
      className="bg-panel"
      style={{ borderBlock: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="mx-auto flex flex-wrap items-center"
        style={{
          maxWidth: 1280,
          padding: "24px clamp(20px,5vw,64px)",
          gap: "clamp(16px,3vw,44px)",
        }}
      >
        <span
          className="whitespace-nowrap font-mono uppercase"
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "oklch(0.60 0.01 250)",
          }}
        >
          My toolbox ·
        </span>
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "clamp(20px,3vw,38px)" }}
        >
          {content.skills.map((skill) => (
            <span
              key={skill.slug}
              role="img"
              aria-label={skill.label}
              title={skill.label}
              className="inline-block bg-current text-primary opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100"
              style={{
                height: 30,
                width: 30,
                WebkitMaskImage: `url(https://cdn.simpleicons.org/${skill.slug})`,
                maskImage: `url(https://cdn.simpleicons.org/${skill.slug})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
