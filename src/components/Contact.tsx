import { content, options } from "../content";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/8 bg-panel-deep"
    >
      {options.showCodeMotif && (
        <div
          aria-hidden="true"
          className="pointer-events-none select-none font-mono"
          style={{
            position: "absolute",
            right: "clamp(-20px,2vw,40px)",
            bottom: -80,
            fontWeight: 500,
            fontSize: "clamp(200px,26vw,380px)",
            lineHeight: 0.8,
            color: "rgba(129,242,7,0.07)",
          }}
        >
          {"{ }"}
        </div>
      )}

      <div
        className="relative mx-auto flex flex-col"
        style={{
          maxWidth: 1280,
          padding: "clamp(64px,9vw,120px) clamp(20px,5vw,64px)",
          gap: "clamp(28px,4vw,44px)",
        }}
      >
        <div className="flex items-baseline" style={{ gap: 20 }}>
          {options.sectionNumbers && (
            <span
              className="font-display text-secondary"
              style={{
                fontWeight: 800,
                fontSize: "clamp(40px,6vw,76px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              04
            </span>
          )}
          <h2
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "clamp(34px,7vw,84px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              textWrap: "balance",
            }}
          >
            Let's build
            <br />
            something.
          </h2>
        </div>

        <a
          href={`mailto:${content.email}`}
          className="w-fit border-b-2 border-transparent font-display text-primary transition-colors hover:border-primary"
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px,4vw,44px)",
            letterSpacing: "-0.02em",
          }}
        >
          {content.email}
        </a>

        <div
          className="flex flex-wrap font-mono"
          style={{
            gap: "16px 28px",
            fontSize: 14,
            color: "oklch(0.70 0.01 250)",
            paddingTop: 8,
          }}
        >
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="transition-colors hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between border-t border-white/[0.07] font-mono"
          style={{
            gap: 12,
            marginTop: "clamp(24px,4vw,48px)",
            paddingTop: 24,
            fontSize: 12,
            color: "oklch(0.52 0.01 250)",
          }}
        >
          <span>© 2026 {content.name}</span>
          <span>Built with React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
