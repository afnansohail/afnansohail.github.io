import { content, options } from "../content";

export default function Projects() {
  return (
    <section
      id="work"
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "0 clamp(20px,5vw,64px) clamp(64px,9vw,128px)",
      }}
    >
      <div
        className="flex items-baseline"
        style={{ gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}
      >
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
            03
          </span>
        )}
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(30px,5vw,60px)",
            letterSpacing: "-0.02em",
          }}
        >
          Selected work
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        {content.projects.map((p) => (
          <div
            key={p.no}
            className="flex flex-col overflow-hidden rounded-[18px] border border-white/9 bg-panel transition-all hover:-translate-y-1 hover:border-primary/60"
          >
            <div
              className="stripes relative flex items-center justify-center border-b border-white/9"
              style={{ aspectRatio: "16 / 10" }}
            >
              <span
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontSize: 88,
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1,
                }}
              >
                {p.no}
              </span>
              <span
                className="font-mono"
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 14,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "oklch(0.55 0.01 250)",
                }}
              >
                [ project shot ]
              </span>
            </div>

            <div
              className="flex flex-col"
              style={{ gap: 14, padding: "clamp(20px,2.5vw,28px)" }}
            >
              <div
                className="flex items-baseline justify-between"
                style={{ gap: 12 }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(22px,2.6vw,28px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </h3>
                <span
                  className="whitespace-nowrap font-mono text-secondary"
                  style={{ fontSize: 12 }}
                >
                  {p.tag}
                </span>
              </div>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "oklch(0.78 0.008 250)",
                  textWrap: "pretty",
                }}
              >
                {p.desc}
              </p>

              <div className="flex flex-wrap" style={{ gap: 8, marginTop: 2 }}>
                {p.stack.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      color: "oklch(0.82 0.008 250)",
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                className="flex border-t border-white/[0.07] font-mono"
                style={{ gap: 18, marginTop: 8, paddingTop: 16, fontSize: 13 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center text-primary"
                  style={{ gap: 6 }}
                >
                  ↗ live demo
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-ink"
                  style={{ color: "oklch(0.78 0.008 250)" }}
                >
                  ↗ repo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
